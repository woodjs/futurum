import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'
import { NormalButton } from '@/shared/ui/normal-button'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { FC } from 'react'

interface IMenuProps {
  id: string
}
const Menu: FC<IMenuProps> = ({ id }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <NormalButton size='icon' variant='ghost'>
          <EllipsisVerticalIcon />
        </NormalButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Что-то еще</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Menu
