import Link from 'next/link';
import { Typography } from '@/shared/ui';
import { useTranslations } from 'next-intl';

const FooterInfo = () => {
	const t = useTranslations('Home.Footer');

	return (
		<div className={'flex flex-col items-center md:items-start'}>
			<Link href={'#'}>
				<Typography className={'text-white font-semibold mb-[15px]'}>
					{t('LegalInformation')}
				</Typography>
			</Link>
			<Link href={'#'}>
				<Typography
					className={'text-white font-semibold text-opacity-50 mb-[5px]'}
				>
					{t('Roadmap')}
				</Typography>
			</Link>
			<Link href={'#'}>
				<Typography
					className={'text-white font-semibold text-opacity-50 mb-[5px]'}
				>
					{t('WhitePaper')}
				</Typography>
			</Link>
			<Link href={'#'}>
				<Typography
					className={'text-white font-semibold text-opacity-50 mb-[5px]'}
				>
				{t('UserAgreement')}
				</Typography>
			</Link>
			<Link href={'#'}>
				<Typography
					className={'text-white font-semibold text-opacity-50 mb-[5px]'}
				>
					{t('PrivacyPolicy')}
				</Typography>
			</Link>
			<Link href={'#'}>
				<Typography
					className={'text-white font-semibold text-opacity-50 mb-[5px]'}
				>
					{t('PublicOffer')}
				</Typography>
			</Link>
			<Link href={'#'}>
				<Typography className={'text-white font-semibold mt-[27px]'}>
				{t('ContactInformation')}
				</Typography>
			</Link>
		</div>
	);
};

export default FooterInfo;
