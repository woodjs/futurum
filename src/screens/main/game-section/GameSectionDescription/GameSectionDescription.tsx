import { Button, GradientTypography, Typography } from '@/shared/ui';

const GameSectionDescription = () => {
	return (
		<div className={'lg:w-[42%] w-full'}>
			<div className={'flex flex-col mb-[24px] lg:flex-row'}>
				<Typography
					variant={'h2'}
					className={'text-black mr-2.5 text-center lg:text-left'}
				>
					Играй и{' '}
					<GradientTypography
						variant={'h2'}
						className={'text-center lg:text-left'}
					>
						зарабатывай
					</GradientTypography>
				</Typography>
			</div>
			<Typography
				variant={'p-large'}
				className={'text-black text-center lg:text-left'}
			>
				Ты готов к приключению, которое откроет перед тобой двери в мир больших
				возможностей и успеха?  Играя, ты не только проводишь время с интересом,
				обучаясь основам криптоиндустрии и финансового мира, но и зарабатываешь
				реальные деньги, которые сможешь потратить по своему усмотрению!
			</Typography>
			<Typography
				variant={'subtitle-1'}
				className={'text-black mr-2.5 mt-[24px] text-center lg:text-left'}
			>
				Присоединяйся к нам сегодня
			</Typography>

			<GradientTypography
				variant={'subtitle-1'}
				className={'w-full text-center lg:text-left lg:w-auto'}
			>
				и стань лидером завтрашнего дня!
			</GradientTypography>
			<div className={'mt-[24px]'}>
				<Button
					variant={'outline'}
					className={'w-full lg:w-[150px] lg:mr-[24px]'}
				>
					Подробнее
				</Button>
				<Button
					className={'w-full lg:w-[150px] mt-[24px] mb-[24px] lg:mt-0 lg:mb-0'}
				>
					Играть
				</Button>
			</div>
		</div>
	);
};

export default GameSectionDescription;
