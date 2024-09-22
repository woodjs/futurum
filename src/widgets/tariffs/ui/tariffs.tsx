import { Tabs, TabsContent, TabsTrigger } from '@/shared/ui/tabs'
import { TabsTariffsList, TabsTariffsTrigger } from '@/shared/ui/tariffs-tabs'
import { Button, GradientTypography, TariffCard, Typography } from '@/shared/ui'
import { useTranslations } from 'next-intl'

const Tariffs = () => {
  const t = useTranslations('Tariffs')
  const tariff = 'Premium'
  const expireDate = '21.12.2025'
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
        <TabsContent value='month' className={'flex'}>
          <TariffCard />
        </TabsContent>
        <TabsContent value='year'>
          <div>TestTwo</div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Tariffs
