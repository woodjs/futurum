import { FC } from 'react'

interface ICompanyCardProps {
  image: string
  title: string
  onClick?: () => void
}
export const CreateCompanyCard: FC<ICompanyCardProps> = ({
  image,
  title,
  onClick,
}) => {
  return (
    <button
      className='group/card grid gap-1 overflow-hidden rounded-xl border border-slate-200
        ring-slate-200 duration-200 hover:border-slate-200 hover:ring-2'
      onClick={onClick}
    >
      <img
        src={image}
        className='h-[400px] w-full object-cover grayscale duration-200
          group-hover/card:grayscale-0'
      />
      <div className='mb-2 grid gap-1'>
        <div
          className='-translate-y-2 text-2xl font-medium text-slate-600
            group-hover/card:text-blue-600'
        >
          {title}
        </div>
      </div>
    </button>
  )
}
