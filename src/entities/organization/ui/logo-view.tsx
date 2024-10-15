import Image from 'next/image'
import { FC } from 'react'

interface ILogoViewProps {
  id: string
  logo: string
  edit?: FC<{ id: string }>
}

const LogoView: FC<ILogoViewProps> = ({ logo, edit, id }) => {
  return (
    <div className='relative w-full overflow-hidden rounded-xl md:h-[300px] md:p-4'>
      <Image
        src={logo}
        alt='logo'
        className='hidden max-h-[300px] w-full -scale-y-110 rounded-xl object-cover blur-xl
          md:absolute md:block'
        width={1000}
        height={1000}
      />
      <Image
        src={logo}
        alt='logo'
        className='bottom-4 left-4 aspect-square w-full rounded-lg object-cover ring-white
          ring-offset-4 ring-offset-transparent md:absolute md:max-w-[200px] md:ring-2'
        width={1000}
        height={1000}
      />

      {edit && edit({ id })}
    </div>
  )
}

export default LogoView
