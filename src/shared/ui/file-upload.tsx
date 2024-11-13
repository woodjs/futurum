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
import { useTranslations } from 'next-intl'
import DeleteFileIcon from '../icons/DeleteFileIcon'
import AddFileIcon from '../icons/AddFileIcon'

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
  placeholder,
  value,
  onChange,
  error,
}) => {
  const t = useTranslations('fileUpload')
  const [fileList, setFileList] = useState<FileItem[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [validationError, setValidationError] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)

  // Создаем схему валидации в зависимости от того, multiple или нет
  const fileValidationSchema = multiple
    ? createMultipleFilesSchema(
        accept ? accept.split(',').map(type => type.trim()) : [],
        maxSizeMB,
        maxFiles,
        required,
        t('multiple.fileSelection'),
        t('multiple.invalidFileType'),
        t('multiple.fileSizeLimit', { maxSizeMB }),
        t('multiple.maxFilesLimit', { maxFiles }),
      )
    : createFileSchema(
        accept ? accept.split(',').map(type => type.trim()) : [],
        maxSizeMB,
        required,
        t('single.fileSelection'),
        t('single.invalidFileType'),
        t('single.fileSizeLimit', { maxSizeMB }),
      )
  useEffect(() => {
    // Инициализируем состояние при получении значения из props
    if (value && value.length > 0 && fileList.length === 0) {
      const initialFileItems = value
        .map(
          iFile =>
            iFile && {
              id: iFile.id,
              iFile,
              status: 'uploaded' as const,
              progress: 100,
            },
        )
        .filter(file => file)
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
      const response = await protectedAPI.post<{
        file: {
          id: string
          name: string
          type: string
          path: string
        }
      }>('/v1/files/upload', formData, {
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
      })

      const iFile = {
        id: response.data.file.id,
        name: response.data.file.name,
        type: response.data.file.type,
        url: response.data.file.path,
      }
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
          t('errors.uploadError', {
            fileName: fileItem.file?.name,
            errorMessage: error.message,
          }),
        )

        return newList
      })
    }
  }

  const removeFile = (id: string) => {
    // protectedAPI.delete(`/v1/files/${id}`)
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
        <label className='block text-[14px] font-[700] text-slate-800 mb-[8px]'>
          {label}
        </label>
      )}

      <div
        className={cn(
          'drop-zone rounded-xl',
          isDragOver ? 'border-blue-500 bg-blue-100 p-4' : 'border-slate-300',
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {fileList.length !== 0 && (
          <div className='flex flex-wrap gap-[16px]'>
            {fileList.map(fileItem => (
              <div
                key={fileItem.id}
                className='flex flex-col items-center justify-center'
              >
                {fileItem.status === 'uploading' && (
                  <div className='flex flex-col items-center'>
                    <div className='size-[140px] rounded-md bg-slate-100 text-black'>
                      {t('labels.loading')}
                    </div>
                    <Progress
                      value={fileItem.progress}
                      className='mt-2 w-full'
                    />
                  </div>
                )}
                {fileItem.status === 'uploaded' && fileItem.iFile && (
                  <>
                    <div className='relative flex size-[140px] items-center justify-center rounded-md bg-[#D9D9D9] text-black'>
                      {fileItem.iFile.type.includes('image') ? (
                        <img
                          src={fileItem.iFile.url}
                          alt={fileItem.iFile.name}
                          className='size-[140px] rounded-md object-cover'
                        />
                      ) : (
                        <div className='flex size-[140px] items-center justify-center rounded-md bg-[#D9D9D9] text-black'>
                          {/* @ts-ignore */}
                          {shortTypes[fileItem.iFile.type] ||
                            fileItem.iFile.type ||
                            t('labels.file')}
                        </div>
                      )}
                      <button
                        type='button'
                        onClick={() => removeFile(fileItem.id)}
                        className='absolute top-0 right-0 text-sm text-red-600 underline p-1'
                      >
                        <DeleteFileIcon />
                      </button>
                    </div>
                      <span className='text-[14px] font-[700] truncate max-w-[140px]'>
                        {fileItem.iFile.name}
                      </span>
                  </>
                )}
              </div>
            ))}
            {fileList.length < maxFiles && (
              <button
                type='button'
                className='size-[140px] rounded-md bg-[#DFF1FF] text-black flex items-center justify-center'
                onClick={() => inputRef.current?.click()}
              >
                <AddFileIcon />
              </button>
            )}
          </div>
        )}

        {fileList.length === 0 && (
          <NormalButton
            type='button'
            onClick={() => inputRef.current?.click()}
            className=''
          >
            {t('labels.addFile')}
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
        <span className='mt-2 block text-[14px] text-red-500'>
          {validationError}
        </span>
      )}

      {error && (
        <span className='mt-2 block text-[14px] text-red-500'>
          {error}
        </span>
      )}
    </div>
  )
}

export default FileUpload
