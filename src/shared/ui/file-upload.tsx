import React, { useState, useRef, useEffect } from 'react'
import { NormalButton } from '@/shared/ui/normal-button'
import { cn } from '../lib/utils'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import {
  createFileSchema,
  createMultipleFilesSchema,
} from '../lib/create-file-schema'
import { z } from 'zod'
import { Progress } from './progress'
import { protectedAPI } from '../api'

const shortTypes = {
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    '.docx',
  'application/msword': '.doc',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
  'application/vnd.ms-excel': '.xls',
  'application/pdf': '.pdf',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation':
    '.pptx',
  'image/png': '.png',
  'image/jpeg': '.jpg',
  'image/jpg': '.jpg',
  'image/webp': '.webp',
  'text/plain': '.txt',
  'text/csv': '.csv',
  'text/html': '.html',
  'text/xml': '.xml',
}

interface FileUploadProps {
  name: string
  label?: string
  accept: string
  multiple?: boolean
  maxFiles?: number
  maxSizeMB?: number
  required?: boolean
  placeholder?: string
  value?: IFile[]
  onChange?: (files: IFile[]) => void
  error?: string
}

interface IFile {
  id: string
  name: string
  type: string
  url: string
}

interface FileItem {
  id: string
  file?: File
  iFile?: IFile
  status: 'uploading' | 'uploaded' | 'failed'
  progress: number
  error?: string
}

const FileUpload: React.FC<FileUploadProps> = ({
  name,
  label,
  accept,
  multiple = false,
  maxFiles = 10,
  maxSizeMB = 2,
  required = false,
  placeholder = 'Добавить файлы',
  value,
  onChange,
  error,
}) => {
  const [fileList, setFileList] = useState<FileItem[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [validationError, setValidationError] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)

  // Создаем схему валидации в зависимости от того, multiple или нет
  const fileValidationSchema = multiple
    ? createMultipleFilesSchema(
        accept.split(',').map(type => type.trim()),
        maxSizeMB,
        maxFiles,
        required,
        'Необходимо выбрать файлы.',
        'Неверный тип файла.',
        `Размер файла не должен превышать ${maxSizeMB} МБ.`,
        `Можно загрузить не более ${maxFiles} файлов.`,
      )
    : createFileSchema(
        accept.split(',').map(type => type.trim()),
        maxSizeMB,
        required,
        'Необходимо выбрать файл.',
        'Неверный тип файла.',
        `Размер файла не должен превышать ${maxSizeMB} МБ.`,
      )

  useEffect(() => {
    // Инициализируем состояние при получении значения из props
    if (value && value.length > 0 && fileList.length === 0) {
      const initialFileItems = value.map(iFile => ({
        id: iFile.id,
        iFile,
        status: 'uploaded' as const,
        progress: 100,
      }))
      setFileList(initialFileItems)
    }
  }, [value])

  const handleFileChange = (filesList: FileList | null) => {
    if (filesList) {
      const fileArray = Array.from(filesList)

      // Выполняем валидацию
      try {
        fileValidationSchema.parse(filesList)
      } catch (validationError) {
        if (validationError instanceof z.ZodError) {
          // Показываем ошибку пользователю
          setValidationError(validationError.errors[0].message)
          return
        }
      }

      // Очищаем предыдущую ошибку
      setValidationError('')

      const newFileItems = fileArray.map(file => ({
        id: uuidv4(),
        file,
        status: 'uploading' as const,
        progress: 0,
      }))

      setFileList(prevList => {
        const combinedList = [...prevList, ...newFileItems].slice(0, maxFiles)
        return combinedList
      })

      // Начинаем загрузку файлов
      newFileItems.forEach(fileItem => {
        uploadFile(fileItem)
      })

      if (inputRef.current) {
        inputRef.current.value = ''
      }
    }
  }

  const uploadFile = async (fileItem: FileItem) => {
    const formData = new FormData()
    formData.append('file', fileItem.file!)

    try {
      const response = await protectedAPI.post<IFile>(
        '/v11/files/upload',
        formData,
        {
          onUploadProgress: progressEvent => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1),
            )
            setFileList(prevList =>
              prevList.map(item =>
                item.id === fileItem.id ? { ...item, progress } : item,
              ),
            )
          },
        },
      )

      const iFile = response.data
      // @ts-ignore
      setFileList(prevList => {
        const newList = prevList.map(item =>
          item.id === fileItem.id
            ? { ...item, status: 'uploaded', iFile }
            : item,
        )

        const uploadedFiles = newList
          .filter(item => item.status === 'uploaded')
          .map(item => item.iFile!)
        onChange?.(uploadedFiles)

        return newList
      })
    } catch (error: any) {
      // Удаляем файл из списка при ошибке
      setFileList(prevList => {
        const newList = prevList.filter(item => item.id !== fileItem.id)
        const uploadedFiles = newList
          .filter(item => item.status === 'uploaded')
          .map(item => item.iFile!)
        onChange?.(uploadedFiles)

        // Отображаем сообщение об ошибке
        setValidationError(
          `Ошибка загрузки файла "${fileItem.file?.name}": ${error.message}`,
        )

        return newList
      })
    }
  }

  const removeFile = (id: string) => {
    protectedAPI.delete(`/v11/files/${id}`)
    setFileList(prevList => {
      const newList = prevList.filter(item => item.id !== id)
      const uploadedFiles = newList
        .filter(item => item.status === 'uploaded')
        .map(item => item.iFile!)
      onChange?.(uploadedFiles)
      return newList
    })
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)
    handleFileChange(e.dataTransfer.files)
  }

  return (
    <div className='form-item'>
      {label && (
        <label className='mb-3 block text-base font-semibold text-slate-800'>
          {label}
        </label>
      )}

      <div
        className={cn(
          'drop-zone rounded-xl border-2 border-dashed p-4 text-center',
          isDragOver ? 'border-blue-500 bg-blue-100' : 'border-slate-300',
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {fileList.length === 0 ? (
          <p>{placeholder}</p>
        ) : (
          <div className='flex flex-wrap gap-8'>
            {fileList.map(fileItem => (
              <div
                key={fileItem.id}
                className='flex flex-col items-center justify-center'
              >
                {fileItem.status === 'uploading' && (
                  <div className='flex flex-col items-center'>
                    <div className='size-40 rounded-md bg-slate-100 text-black'>
                      Загрузка...
                    </div>
                    <Progress
                      value={fileItem.progress}
                      className='mt-2 w-full'
                    />
                  </div>
                )}
                {fileItem.status === 'uploaded' && fileItem.iFile && (
                  <>
                    {fileItem.iFile.type.includes('image') ? (
                      <img
                        src={fileItem.iFile.url}
                        alt={fileItem.iFile.name}
                        className='size-40 rounded-md object-cover'
                      />
                    ) : (
                      <div className='flex size-40 items-center justify-center rounded-md bg-slate-200 text-black'>
                        {/* @ts-ignore */}
                        {shortTypes[fileItem.iFile.type] ||
                          fileItem.iFile.type ||
                          'Файл'}
                      </div>
                    )}
                    <span className='w-40 truncate text-black'>
                      {fileItem.iFile.name}
                    </span>
                    <button
                      type='button'
                      onClick={() => removeFile(fileItem.id)}
                      className='text-sm text-red-600 underline'
                    >
                      Удалить
                    </button>
                  </>
                )}
              </div>
            ))}
            {fileList.length < maxFiles && (
              <button
                type='button'
                className='size-40 rounded-md bg-slate-50 text-black hover:bg-slate-100'
                onClick={() => inputRef.current?.click()}
              >
                Добавить файл
              </button>
            )}
          </div>
        )}

        {fileList.length === 0 && (
          <NormalButton
            type='button'
            onClick={() => inputRef.current?.click()}
            className='mt-2'
          >
            Добавить файл
          </NormalButton>
        )}

        <input
          ref={inputRef}
          type='file'
          accept={accept}
          multiple={multiple}
          onChange={e => handleFileChange(e.target.files)}
          style={{ display: 'none' }}
        />
      </div>

      {validationError && (
        <span className='mt-2 block text-sm font-medium text-red-600'>
          {validationError}
        </span>
      )}

      {error && (
        <span className='mt-2 block text-sm font-medium text-red-600'>
          {error}
        </span>
      )}
    </div>
  )
}

export default FileUpload
