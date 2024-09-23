'use client'
import { Tabs, TabsContent } from '@/shared/ui/tabs'
import { TabsTariffsList, TabsTariffsTrigger } from '@/shared/ui/tariffs-tabs'
import { Button, GradientTypography, Typography } from '@/shared/ui'
import { useTranslations } from 'next-intl'
import { TariffCard } from '@/entities/tariff-card'
import { ButtonName } from '@/entities/tariff-card/lib/buttonName'
import { Tariff } from '@/shared/api/types'

const Tariffs = () => {
  const t = useTranslations('Tariffs')
  const tariff = 'Premium'
  const expireDate = '21.12.2025'

  const onActivate = () => {}
  const onExtend = () => {}
  const onBuy = () => {}

  return (
    <div className={'ml-[8px] mt-[27px]'}>
      <GradientTypography>{t('Tariffs')}</GradientTypography>
      <div className={'mb-12 flex'}>
        <Typography className={'text-[36px] text-black'}>
          {t('YourTariff', { tariff, expireDate })}
        </Typography>
        <Button variant={'ghost'} className={'ml-4 border border-gray2'}>
          {t('Extend')}
        </Button>
      </div>
      <Tabs defaultValue='month'>
        <TabsTariffsList className='ml-auto mr-auto flex w-full items-center justify-center'>
          <TabsTariffsTrigger value='month' className={'bg-transparent'}>
            {t('ExtendMonth')}
          </TabsTariffsTrigger>
          <TabsTariffsTrigger
            value='year'
            className={'bg-transparent'}
            badge={t('Cheaper')}
          >
            {t('ExtendYear')}
          </TabsTariffsTrigger>
        </TabsTariffsList>
        <TabsContent value='month' className={'flex flex-col'}>
          <div className={'my-16 flex justify-evenly'}>
            <TariffCard
              buttonName={ButtonName.ACTIVATE}
              onButtonClick={onActivate}
            />
            <TariffCard
              variant={Tariff.STANDARD}
              buttonName={ButtonName.BUY}
              onButtonClick={onBuy}
            />
          </div>
          <div className={'flex justify-evenly'}>
            <TariffCard
              variant={Tariff.PREMIUM}
              buttonName={ButtonName.EXTEND}
              onButtonClick={onExtend}
            />
            <TariffCard
              variant={Tariff.BLACK}
              buttonName={ButtonName.BUY}
              onButtonClick={onBuy}
            />
          </div>
        </TabsContent>
        <TabsContent value='year' className={'mt-0 flex flex-col'}>
          <div className={'my-16 flex justify-evenly'}>
            <TariffCard
              buttonName={ButtonName.ACTIVATE}
              onButtonClick={onActivate}
              mode={'year'}
            />
            <TariffCard
              variant={Tariff.STANDARD}
              buttonName={ButtonName.BUY}
              onButtonClick={onBuy}
              mode={'year'}
            />
          </div>
          <div className={'flex justify-evenly'}>
            <TariffCard
              variant={Tariff.PREMIUM}
              buttonName={ButtonName.EXTEND}
              onButtonClick={onExtend}
              mode={'year'}
            />
            <TariffCard
              variant={Tariff.BLACK}
              buttonName={ButtonName.BUY}
              onButtonClick={onBuy}
              mode={'year'}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Tariffs
