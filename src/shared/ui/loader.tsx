import { cn } from '@/shared/lib/utils'

const Loader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        `h-[25px] w-[25px] animate-spin rounded-full border-2 border-r-2 border-[#c3c3ce]
        border-r-indigo-500`,
        className,
      )}
      {...props}
    />
  )
}

export default Loader
