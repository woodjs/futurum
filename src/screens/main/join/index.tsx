import { Button, GradientTypography, Typography } from '@/shared/ui';
import Section from '../section';
import { useTranslations } from 'next-intl';

export default function JoinUs() {
  const t = useTranslations('Home.Categories');

	return (
		<Section>
			<div className="w-full bg-[#F8F9FB] py-[34px] rounded-[15px] flex flex-col justify-center items-center text-center">
				<Typography variant="h2">
					{t('StartEarningIncomeTodayOne')}{' '}
					<GradientTypography variant="h2">{t('StartEarningIncomeTodayTwo')}</GradientTypography> {t('StartEarningIncomeTodayThree')}
				</Typography>
				<Typography variant="h5" className="my-[16px]">
					{t('RegisterAndBuyNFT')}
				</Typography>
				<Button size="sm">{t('Registration')}</Button>
			</div>
		</Section>
	);
}
