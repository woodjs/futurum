import { Button, GradientTypography, Typography } from '@/shared/ui';
import { useTranslations } from 'next-intl';

const GameSectionDescription = () => {
	const t = useTranslations('default.Home.Categories');

	return (
		<div className={'lg:w-[42%] w-full'}>
			<div className={'flex flex-col mb-[24px] lg:flex-row'}>
				<Typography
					variant={'h2'}
					className={'text-black mr-2.5 text-center lg:text-left'}
				>
					{t('PlayAndEarnOne')}{' '}
					<GradientTypography
						variant={'h2'}
						className={'text-center lg:text-left'}
					>
						{t('PlayAndEarnTwo')}
					</GradientTypography>
				</Typography>
			</div>
			<Typography
				variant={'p-large'}
				className={'text-black text-center lg:text-left'}
			>
				{t('AreYouReadyForAnAdventure')}
			</Typography>
			<Typography
				variant={'subtitle-1'}
				className={'text-black mr-2.5 mt-[24px] text-center lg:text-left'}
			>
				{t('JoinUsTodayOne')}
			</Typography>

			<GradientTypography
				variant={'subtitle-1'}
				className={'w-full text-center lg:text-left lg:w-auto'}
			>
				{t('JoinUsTodayTwo')}
			</GradientTypography>
			<div className={'mt-[24px]'}>
				<Button
					variant={'outline'}
					className={'w-full lg:w-[150px] lg:mr-[24px]'}
				>
					{t('ReadMore')}
				</Button>
				<Button
					className={'w-full lg:w-[150px] mt-[24px] mb-[24px] lg:mt-0 lg:mb-0'}
				>
					{t('Play')}
				</Button>
			</div>
		</div>
	);
};

export default GameSectionDescription;
