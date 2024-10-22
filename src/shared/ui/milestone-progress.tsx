import { Progress } from './progress'
import { Checkbox } from './checkbox'
import { useTranslations } from 'next-intl'

interface IMilestoneProgress {
  progressValue: number | null | undefined
  checked: boolean
}

export const MilestoneProgress = ({
  progressValue,
  checked,
}: IMilestoneProgress) => {
  const t = useTranslations('profile')
  return (
    <div className='w-full rounded-[15px] bg-[#F8F9FB] px-[14.5px] py-[16px]'>
      <span className='mb-5 text-[14px] font-bold leading-[18px] text-[#2D3748]'>
        {t('informationCompleteBy')}
      </span>
      <Progress
        value={progressValue}
        className='mt-[4px] h-[25px] w-full'
        indicatorClassName='bg-[#19BBBB]'
        color='#19BBBB'
        showIndicatorValue
      />

      {checked ? (
        <div className='mt-[16px] flex items-center gap-1'>
          <Checkbox
            checked={checked}
            className='rounded-full bg-[#19BBBB] checked:border-[#19BBBB] checked:bg-[#19BBBB]
              data-[state=checked]:border-[#19BBBB] data-[state=checked]:bg-[#19BBBB]
              data-[state=checked]:text-[#fff]'
          />
          <span className='text-[14px] font-bold leading-[18px] text-[#2D3748]'>
            {t('verificationComplete')}
          </span>
        </div>
      ) : null}
    </div>
  )
}
