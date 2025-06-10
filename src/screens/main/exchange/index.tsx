import { cn } from '@/shared/lib/utils'
import { useTranslations } from 'next-intl'
import { Button, GradientTypography, Typography } from '@/shared/ui'
import Image from 'next/image'
import Section from '../section'

const data = [
  {
    id: 1,
    name: 'QuantSteel',
    code: 'QSL',
    image: '/images/coins/coin-1.png',
    percent: 59.1,
    isProfit: false,
  },
  {
    id: 2,
    name: 'StellarFractal',
    code: 'STFR',
    image: '/images/coins/stfr.png',
    percent: 192,
    isProfit: true,
  },
  {
    id: 3,
    name: 'EtherDream',
    code: 'ETDR',
    image: '/images/coins/etdr.png',
    percent: 192,
    isProfit: true,
  },
  {
    id: 4,
    name: 'InfinitoCoin',
    code: 'INFC',
    image: '/images/coins/infc.png',
    percent: 192,
    isProfit: true,
  },
  {
    id: 5,
    name: 'InfinitoCoin',
    code: 'GLAL',
    image: '/images/coins/glal.png',
    percent: 192,
    isProfit: true,
  },
]

export default function Exchange() {
  const t = useTranslations('default.Home.Categories')

  return (
    <Section
      Title={
        <Typography variant='h2'>
          {t('FUTURUMСryptoExchangeOne')}{' '}
          <GradientTypography variant='h2'>
            {t('FUTURUMСryptoExchangeTwo')}
          </GradientTypography>
        </Typography>
      }
    >
      <div className='flex flex-col gap-[30px] lg:flex-row'>
        <div className='w-full flex-1 rounded-[15px] bg-gray px-[16px]'>
          <div className='flex w-full justify-between border-b border-gray2 py-[14px]'>
            <p className='flex-1 text-[12px] font-semibold uppercase text-[#4F4F4F]'>
              {t('Name')}
            </p>
            <p className='text-[12px] font-semibold uppercase text-[#4F4F4F] lg:flex-1'>
              {t('Price')}
            </p>
            <p className='hidden flex-1 text-[12px] font-semibold uppercase text-[#4F4F4F] lg:block'>
              {t('Chart')}
            </p>
          </div>
          {data.map(item => (
            <div
              key={item.id}
              className='flex w-full justify-between border-b border-gray2 py-[14px]'
            >
              <div className='flex-1'>
                <div className='flex items-center gap-[6px]'>
                  <Image src={item.image} alt='' width={26} height={26} />
                  <div className='font-bold'>
                    <p className='mb-[2px] text-[14px]'>{item.name}</p>
                    <p className='text-[12px] text-[#4F4F4F]'>{item.code}</p>
                  </div>
                </div>
              </div>
              <div className='block md:hidden'>
                <p className='flex-1 text-[14px] font-bold uppercase'>
                  0,00 USDT
                </p>
                <div className='flex flex-1 items-center gap-[6px]'>
                  {item.isProfit ? (
                    <svg
                      width='10'
                      height='6'
                      viewBox='0 0 10 6'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M5 0.666626L10 5.66663H0L5 0.666626Z'
                        fill='#19BBBB'
                      />
                    </svg>
                  ) : (
                    <svg
                      width='10'
                      height='6'
                      viewBox='0 0 10 6'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M5 5.66663L10 0.666626H0L5 5.66663Z'
                        fill='#FB5757'
                      />
                    </svg>
                  )}

                  <div
                    className={cn(
                      'rounded-[8px] px-[4px] py-[6px]',
                      item.isProfit ? 'bg-[#19BBBB]' : 'bg-[#FB5757]',
                    )}
                  >
                    <span className='text-white'>
                      {item.isProfit ? '+' : '-'}
                      {item.percent}%
                    </span>
                  </div>
                </div>
              </div>
              <p className='hidden flex-1 text-[14px] font-bold uppercase md:block'>
                0,00 USDT
              </p>
              <div className='hidden flex-1 items-center gap-[6px] md:flex'>
                {item.isProfit ? (
                  <svg
                    width='10'
                    height='6'
                    viewBox='0 0 10 6'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M5 0.666626L10 5.66663H0L5 0.666626Z'
                      fill='#19BBBB'
                    />
                  </svg>
                ) : (
                  <svg
                    width='10'
                    height='6'
                    viewBox='0 0 10 6'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M5 5.66663L10 0.666626H0L5 5.66663Z'
                      fill='#FB5757'
                    />
                  </svg>
                )}
                <div
                  className={cn(
                    'rounded-[8px] px-[4px] py-[6px]',
                    item.isProfit ? 'bg-[#19BBBB]' : 'bg-[#FB5757]',
                  )}
                >
                  <span className='text-white'>
                    {item.isProfit ? '+' : '-'}
                    {item.percent}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='flex flex-1 flex-col gap-[22px]'>
          <div className='rounded-[15px] bg-gray p-[18px]'>
            <div
              className='flex items-center justify-center gap-[10px] border-b border-gray2 pb-[14px]
                lg:justify-between lg:gap-0'
            >
              <div className='flex gap-[8px]'>
                {/* <Image
                  width={44}
                  height={44}
                  src='/images/coins/ton.png'
                  alt=''
                /> */}
                <div className='flex h-[44px] w-[44px] items-center justify-center rounded-full bg-black'>
                  <svg
                    width='28'
                    height='24'
                    viewBox='0 0 28 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <g clip-path='url(#clip0_2324_2089)'>
                      <path
                        d='M27.8558 18.9223L23.2336 23.6731C23.1331 23.7763 23.0115 23.8586 22.8764 23.9149C22.7413 23.9711 22.5956 24.0001 22.4483 24H0.53661C0.432057 24 0.329782 23.9707 0.242353 23.9158C0.154923 23.8608 0.0861457 23.7826 0.0444718 23.6907C0.00279787 23.5988 -0.00995749 23.4973 0.00777297 23.3985C0.0255034 23.2997 0.0729472 23.2081 0.144275 23.1349L4.77001 18.384C4.87023 18.2811 4.9914 18.199 5.12605 18.1427C5.26073 18.0865 5.406 18.0574 5.5529 18.0571H27.4634C27.5679 18.0571 27.6702 18.0864 27.7577 18.1414C27.845 18.1963 27.9138 18.2746 27.9556 18.3664C27.9972 18.4583 28.01 18.5599 27.9922 18.6586C27.9745 18.7574 27.9271 18.849 27.8558 18.9223ZM23.2336 9.35542C23.1331 9.25222 23.0115 9.16994 22.8764 9.1137C22.7413 9.05749 22.5956 9.0285 22.4483 9.02858H0.53661C0.432057 9.02858 0.329782 9.05785 0.242353 9.1128C0.154923 9.16776 0.0861457 9.24597 0.0444718 9.33785C0.00279787 9.42976 -0.00995749 9.53133 0.00777297 9.63008C0.0255034 9.72881 0.0729472 9.82045 0.144275 9.89373L4.77001 14.6446C4.87023 14.7475 4.9914 14.8296 5.12605 14.8858C5.26073 14.942 5.406 14.9712 5.5529 14.9714H27.4634C27.5679 14.9714 27.6702 14.9422 27.7577 14.8872C27.845 14.8322 27.9138 14.754 27.9556 14.6621C27.9972 14.5702 28.01 14.4687 27.9922 14.3699C27.9745 14.2712 27.9271 14.1796 27.8558 14.1063L23.2336 9.35542ZM0.53661 5.94286H22.4483C22.5956 5.94292 22.7413 5.91395 22.8764 5.85772C23.0115 5.80148 23.1331 5.7192 23.2336 5.616L27.8558 0.865143C27.9271 0.791883 27.9745 0.700249 27.9922 0.6015C28.01 0.502751 27.9972 0.40119 27.9556 0.309295C27.9138 0.217399 27.845 0.139172 27.7577 0.0842245C27.6702 0.029277 27.5679 3.38384e-06 27.4634 0H5.5529C5.406 0.000239563 5.26073 0.0293725 5.12605 0.0855949C4.9914 0.141818 4.87023 0.223933 4.77001 0.326858L0.145468 5.07772C0.0742086 5.15089 0.0267857 5.24245 0.00901503 5.34106C-0.00875566 5.43971 0.00389849 5.54119 0.0454254 5.63305C0.0869525 5.7249 0.155547 5.80312 0.242797 5.85815C0.330048 5.91319 0.432159 5.94262 0.53661 5.94286Z'
                        fill='url(#paint0_linear_2324_2089)'
                      />
                    </g>
                    <defs>
                      <linearGradient
                        id='paint0_linear_2324_2089'
                        x1='2.36353'
                        y1='24.572'
                        x2='24.2544'
                        y2='-1.17713'
                        gradientUnits='userSpaceOnUse'
                      >
                        <stop offset='0.08' stop-color='#9945FF' />
                        <stop offset='0.3' stop-color='#8752F3' />
                        <stop offset='0.5' stop-color='#5497D5' />
                        <stop offset='0.6' stop-color='#43B4CA' />
                        <stop offset='0.72' stop-color='#28E0B9' />
                        <stop offset='0.97' stop-color='#19FB9B' />
                      </linearGradient>
                      <clipPath id='clip0_2324_2089'>
                        <rect width='28' height='24' fill='white' />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className='font-bold'>
                  <p className='mb-[1px] text-[12px] text-[#4F4F4F]'>
                    Solana (SOL)
                  </p>
                  <p className='text-[18px]'>170,48 $</p>
                </div>
              </div>
              <div className='flex items-center gap-[6px]'>
                <svg
                  width='10'
                  height='6'
                  viewBox='0 0 10 6'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M5 0.666626L10 5.66663H0L5 0.666626Z'
                    fill='#19BBBB'
                  />
                </svg>

                <div className='rounded-[8px] bg-[#19BBBB] px-[4px] py-[6px]'>
                  <span className='text-white'>+192.93%</span>
                </div>
              </div>
            </div>
            <div className='mt-[14px] flex justify-center'>
              <div
                className='flex flex-col items-center justify-center pr-[16px] pt-[20px] text-[12px]
                  font-bold lg:pr-[44px]'
              >
                Rank
                <span className='text-[18px]'>#6</span>
              </div>
              <div
                className='flex flex-col items-center justify-center border-l border-r border-gray2
                  px-[16px] pt-[20px] text-[12px] font-bold text-[#4F4F4F] lg:px-[44px]'
              >
                Market Cap
                <span className='text-[18px]'>90B $</span>
              </div>
              <div
                className='flex flex-col items-center justify-center pl-[16px] pt-[20px] text-[12px]
                  font-bold text-[#4F4F4F] lg:pl-[44px]'
              >
                Volume
                <span className='text-[18px]'>3.7B $</span>
              </div>
            </div>
          </div>

          {/* <div className="bg-gray flex flex-col justify-center items-center rounded-[15px] h-full py-[28px] lg:py-0">
						<div>
							<div className="flex items-center gap-[10px]">
								<Image
									src="/images/logo-x100.png"
									alt=""
									width={64}
									height={64}
								/>
								<span className="font-bold text-[18px] text-[#4F4F4F]">
									{t('FuturumToken')}
								</span>
							</div>
							<Button className="w-full mt-[12px]">
								{t('GetInPresale')}
							</Button>
						</div>
					</div> */}
        </div>
      </div>
    </Section>
  )
}
