import { Tariff } from '@/shared/api/types'
import { tariffsImages } from '@/shared/images/tariffs'

export const tariffs = {
  [Tariff.BASIC]: {
    card: tariffsImages.basic,
    gradient: 'bg-gradient-to-r from-[#03CBAF] via-[#C3F9B0] to-[#E7E310]',
  },
  [Tariff.STANDARD]: {
    card: tariffsImages.standard,
    gradient: 'bg-gradient-to-r from-[#0B97EA] via-[#9BF8FB] to-[#0AEBE0]',
  },
  [Tariff.PREMIUM]: {
    card: tariffsImages.premium,
    gradient: 'bg-gradient-to-r from-[#D4A107] via-[#F2E493] to-[#CDB113]',
  },

  [Tariff.BLACK]: {
    card: tariffsImages.black,
    gradient: 'bg-gradient-to-r from-[#131311] via-[#0F2446] to-[#04193E]',
  },
}
