'use client'
import { Tabs, TabsContent } from '@/shared/ui/tabs'
import { TabsTariffsList, TabsTariffsTrigger } from '@/shared/ui/tariffs-tabs'
import { Button, GradientTypography, Typography } from '@/shared/ui'
import { useTranslations } from 'next-intl'
import { TariffCard } from '@/entities/tariff-card'
import { ButtonName } from '@/entities/tariff-card/lib/buttonName'
import { Tariff } from '@/shared/api/types'

const Tariffs = () => {
  const t = useTranslations('default.Tariffs')
  const tariff = 'Premium'
  const expireDate = '21.12.2025'

  const onTariffClick = (variant: string) => {
    switch (variant) {
      case Tariff.BASIC:
        console.log('basic')
        break
      case Tariff.STANDARD:
        console.log('standard')
        break
      case Tariff.PREMIUM:
        console.log('premium')
        break
      case Tariff.BLACK:
        console.log('black')
        break
    }
  }

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
              buttonName={ButtonName.Activate}
              onButtonClick={onTariffClick}
            />
            <TariffCard
              variant={Tariff.STANDARD}
              buttonName={ButtonName.Buy}
              onButtonClick={onTariffClick}
            />
          </div>
          <div className={'flex justify-evenly'}>
            <TariffCard
              variant={Tariff.PREMIUM}
              buttonName={ButtonName.Extend}
              onButtonClick={onTariffClick}
            />
            <TariffCard
              variant={Tariff.BLACK}
              buttonName={ButtonName.Buy}
              onButtonClick={onTariffClick}
            />
          </div>
        </TabsContent>
        <TabsContent value='year' className={'mt-0 flex flex-col'}>
          <div className={'my-16 flex justify-evenly'}>
            <TariffCard
              buttonName={ButtonName.Activate}
              onButtonClick={onTariffClick}
              mode={'Year'}
            />
            <TariffCard
              variant={Tariff.STANDARD}
              buttonName={ButtonName.Buy}
              onButtonClick={onTariffClick}
              mode={'Year'}
            />
          </div>
          <div className={'flex justify-evenly'}>
            <TariffCard
              variant={Tariff.PREMIUM}
              buttonName={ButtonName.Extend}
              onButtonClick={onTariffClick}
              mode={'Year'}
            />
            <TariffCard
              variant={Tariff.BLACK}
              buttonName={ButtonName.Buy}
              onButtonClick={onTariffClick}
              mode={'Year'}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Tariffs
