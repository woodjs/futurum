import { FC } from 'react'
import { ISocialMediaLinks } from '../model'
import { Badge } from '@/shared/ui/badge'
import { getIdFromLink } from '../lib'
import { getDataFromLink } from '../lib/get-data-from-link'
import Image from 'next/image'

interface ISocialLinkProps {
  link: string
  id: keyof ISocialMediaLinks
}

const SocialLink: FC<ISocialLinkProps> = ({ link, id }) => {
  const data = getDataFromLink(link, id)
  return (
    <a href={data.link} target='_blank' rel='noreferrer'>
      <Badge variant='secondary' size='lg' className='flex h-7 gap-2 px-2'>
        {data.icon ? (
          <Image
            alt={data.label || 'link'}
            width={20}
            height={20}
            src={data.icon}
          />
        ) : null}
        <div>{data.label}</div>
      </Badge>
    </a>
  )
}

interface ISocialListProps {
  links: ISocialMediaLinks
  id: string
  edit?: FC<{ id: string }>
}
const SocialList: FC<ISocialListProps> = ({ links, id, edit }) => {
  return (
    <div className='mt-6'>
      <div className='mb-4 flex items-center justify-between'>
        <div className='text-xl font-bold'>Социальные сети</div>
        {edit && edit({ id })}
      </div>
      <div className='flex flex-wrap items-center gap-2'>
        {Object.keys(links).map(key => {
          const link = links[key as keyof ISocialMediaLinks]
          if (link) {
            return (
              <SocialLink
                key={key}
                link={link}
                id={key as keyof ISocialMediaLinks}
              />
            )
          }
        })}
      </div>
    </div>
  )
}

export default SocialList
