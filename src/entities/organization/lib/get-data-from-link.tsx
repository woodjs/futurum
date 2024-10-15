import { ISocialMediaLinks } from '../model'
import { getIdFromLink } from './get-id-from-link'

interface ISocialData {
  link: string
  key: keyof ISocialMediaLinks
  label: string
  icon?: string
}

export const getDataFromLink = (link: string, key: keyof ISocialMediaLinks) => {
  switch (key) {
    case 'website':
      return {
        link: link,
        key: key,
        label: 'Сайт',
      }
    case 'phone':
      return {
        link: 'tel:' + link,
        key: key,
        label: link,
      }
    case 'reddit':
      return {
        link: link,
        key: key,
        label: `@${getIdFromLink(link, key)}`,
        icon: '/images/social/reddit.png',
      }
    case 'tiktok':
      return {
        link: link,
        key: key,

        label: `@${getIdFromLink(link, key)}`,
        icon: '/images/social/tiktok.png',
      }
    case 'telegram':
      return {
        link: link,
        key: key,
        label: `@${getIdFromLink(link, key)}`,
        icon: '/images/social/telegram.svg',
      }
    case 'facebook':
      return {
        link: link,
        key: key,
        label: `@${getIdFromLink(link, key)}`,
        icon: '/images/social/facebook.png',
      }
    case 'instagram':
      return {
        link: link,
        key: key,
        label: `@${getIdFromLink(link, key)}`,
        icon: '/images/social/instagram.png',
      }
    case 'vk':
      return {
        link: link,
        key: key,
        label: `@${getIdFromLink(link, key)}`,
        icon: '/images/social/vk.svg',
      }
    case 'youtube':
      return {
        link: link,
        key: key,
        label: `@${getIdFromLink(link, key)}`,
        icon: '/images/social/youtube.png',
      }
    case 'twitter':
      return {
        link: link,
        key: key,

        label: `@${getIdFromLink(link, key)}`,
        icon: '/images/social/x.png',
      }
    case 'whatsapp':
      return {
        link: link,
        key: key,
        label: `@${getIdFromLink(link, key)}`,
        icon: '/images/social/whatsapp.png',
      }
    case 'wechat':
      return {
        link: link,
        key: key,
        label: `@${getIdFromLink(link, key)}`,
        icon: '/images/social/wechat.png',
      }
    default:
      return {
        link: link,
        key: key,
        label: 'Сайт',
      }
  }
}
