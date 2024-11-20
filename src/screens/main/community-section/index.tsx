import { GradientTypography, Typography } from '@/shared/ui';
import CommunityCart from '@/shared/ui/community-cart';
import TelegramGradient from '@/shared/icons/TelegramGradient';
import DiscordGradient from '@/shared/icons/DiscordGradient';
import TwitterGradient from '@/shared/icons/TwitterGradient';
import Section from '../section';
import { useTranslations } from 'next-intl';

const CommunitySection = () => {
	const t = useTranslations('default.Home.Categories');

	return (
		<Section
			Title={
				<Typography variant={'h2'}>
					{t('BecomePartOfTheFuturumCommunityOne')}{' '}
					<GradientTypography variant={'h2'}>{t('BecomePartOfTheFuturumCommunityTwo')}</GradientTypography>{' '}
					{t('BecomePartOfTheFuturumCommunityThree')}
				</Typography>
			}
		>
			<div
				className={
					'flex-col flex gap-[16px] xl:gap-[24px] md:flex-row 2xl:gap-[32px]'
				}
			>
				<CommunityCart>
					<div className={'flex items-center gap-2'}>
						<TelegramGradient />
						<Typography
							content={'Telegram'}
							className={'text-black font-bold text-[20px]'}
						/>
					</div>
				</CommunityCart>
				<CommunityCart>
					<div className={'flex items-center gap-2'}>
						<TwitterGradient />
						<Typography
							content={'Twitter'}
							className={'text-black font-bold text-[20px]'}
						/>
					</div>
				</CommunityCart>
				<CommunityCart>
					<div className={'flex items-center gap-2'}>
						<DiscordGradient />
						<Typography
							content={'Discord'}
							className={'text-black font-bold text-[20px]'}
						/>
					</div>
				</CommunityCart>
			</div>
		</Section>
	);
};

export default CommunitySection;
