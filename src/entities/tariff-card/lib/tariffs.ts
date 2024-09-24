import { Tariff } from '@/shared/api/types'
import { tariffsImages } from '@/shared/images/tariffs'

export const tariffs = {
  [Tariff.BASIC]: {
    card: tariffsImages.basic,
    gradient:
      'bg-gradient-to-r from-gradient-accent-start to-gradient-accent-end',
  },
  [Tariff.PREMIUM]: {
    card: tariffsImages.premium,
    gradient: 'bg-gradient-to-r from-[#D4A107] via-[#E8CC31] to-[#CDB113]',
  },
  [Tariff.STANDARD]: {
    card: tariffsImages.standard,
    gradient: 'bg-gradient-to-r from-[#03CBAF] to-[#E7E310]',
  },
  [Tariff.BLACK]: {
    card: tariffsImages.black,
    gradient: 'bg-gradient-to-r from-[#131311] via-[#0F2446] to-[#04193E]',
  },
}
