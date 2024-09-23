import { Tariff } from '@/shared/api/types'
import { tariffsImages } from '@/shared/images/tariffs'

export const tariffs = {
  [Tariff.BASIC]: {
    card: tariffsImages.basic,
    gradient:
      'bg-gradient-to-r from-gradient-accent-start to-gradient-accent-end',
    description: 'до 5 активных NFT <br /> комиссия до 5%',
    title: { month: 'Бесплатно', year: 'Бесплатно' },
  },
  [Tariff.PREMIUM]: {
    card: tariffsImages.premium,
    gradient: 'bg-gradient-to-r from-[#D4A107] via-[#E8CC31] to-[#CDB113]',
    description:
      'до 50 активных NFT <br /> комиссия до 2,5% <br /> размещение в топе 3 NFT',
    title: { month: '105 TON/мес.', year: '85 TON/мес.' },
  },
  [Tariff.STANDARD]: {
    card: tariffsImages.standard,
    gradient: 'bg-gradient-to-r from-[#03CBAF] to-[#E7E310]',
    description: 'до 20 активных NFT <br /> комиссия до 2,5%',
    title: { month: '65 TON/мес.', year: '44 TON/мес.' },
  },
  [Tariff.BLACK]: {
    card: tariffsImages.black,
    gradient: 'bg-gradient-to-r from-[#131311] via-[#0F2446] to-[#04193E]',
    description:
      'без ограничений <br /> комиссия до 2,5% <br /> личный менеджер <br /> размещение в топе 10 NFT',
    title: { month: '150 TON/мес.', year: '100 TON/мес.' },
  },
}
