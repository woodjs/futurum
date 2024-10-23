import Image from 'next/image'
import { landingImages } from '@/shared/images'
import { useTranslations } from 'next-intl'

const GameSectionImage = () => {
  const t = useTranslations('default.Home.Categories')
  return (
    <div
      className='flex h-full items-center justify-center rounded-[15px] bg-gradient-to-r
        from-gradient-accent-start to-gradient-accent-end text-2xl font-bold text-white'
    >
      <Image
        src={landingImages.gameImg}
        alt={'game'}
        className='h-full rounded-[15px] object-cover'
      />
    </div>
  )
}

export default GameSectionImage
