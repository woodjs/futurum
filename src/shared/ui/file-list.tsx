import Link from 'next/link'
import { cn } from '../lib/utils'

export interface IFile {
  id: string
  name: string
  type: string
  url: string
}

interface IFileListProps {
  files: IFile[]
}

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

const FileList: React.FC<IFileListProps> = ({ files }) => {
  return (
    <div
      className={cn(
        `flex flex-wrap gap-4 rounded-xl border-2 border-dashed border-slate-300 p-4
        text-center`,
      )}
    >
      {files.map((file, index) => (
        <Link
          href={file.url}
          target='_blank'
          key={index}
          className='flex flex-col items-center justify-center'
        >
          {file.type.includes('image') ? (
            <img
              src={file.url}
              alt={file.name}
              className='size-40 rounded-md object-cover'
            />
          ) : (
            <div className='flex size-40 items-center justify-center rounded-md bg-slate-200 text-black'>
              {/* @ts-ignore */}
              {shortTypes[file.type] || file.type || 'Файл'}
            </div>
          )}
          <span className='w-40 truncate text-black'>{file.name}</span>
        </Link>
      ))}
    </div>
  )
}

export default FileList
