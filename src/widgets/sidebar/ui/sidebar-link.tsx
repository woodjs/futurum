import { Link } from '@/i18n/routing'
import { cn } from '@/shared/lib/utils'
import { Badge } from '@/shared/ui/badge'

interface ISidebarLinkProps {
  href: string
  name: string
  notification?: number
  label?: string
  active?: boolean
}

const SidebarLink: React.FC<ISidebarLinkProps> = ({
  href,
  name,
  notification,
  label,
  active = false,
}) => {
  return (
    <Link
      href={href}
      className={cn(
        `flex items-center gap-[8px] rounded-lg px-[12px] py-[8px] text-slate-600
        duration-200 hover:bg-slate-100/80 hover:text-slate-700`,
        active && 'bg-slate-100 text-black hover:bg-slate-200',
      )}
    >
      {name}
      <span className='ml-auto' />
      {label && <Badge variant='outline'>{label}</Badge>}
      {notification && <Badge variant='destructive'>{notification}</Badge>}
    </Link>
  )
}

export default SidebarLink
