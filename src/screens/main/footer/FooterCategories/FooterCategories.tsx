import { Typography } from '@/shared/ui';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const FooterCategories = () => {
	const t = useTranslations('default.Home.Footer');

	return (
		<div className={'flex flex-col items-center md:items-start'}>
			<Link href={'#'}>
				<Typography className={'text-white font-semibold mb-[15px]'}>
					{t('Category')}
				</Typography>
			</Link>
			<Link href={'#'}>
				<Typography
					className={'text-white font-semibold text-opacity-50 mb-[5px]'}
				>
					{t('BuyNFT')}
				</Typography>
			</Link>
			<Link href={'#'}>
				<Typography
					className={'text-white font-semibold text-opacity-50 mb-[5px]'}
				>
				{t('BuyToken')}
				</Typography>
			</Link>
			<Link href={'#'}>
				<Typography
					className={'text-white font-semibold text-opacity-50 mb-[5px]'}
				>
					{t('DigitalJunk')}
				</Typography>
			</Link>
			<Link href={'#'}>
				<Typography
					className={'text-white font-semibold text-opacity-50 mb-[5px]'}
				>
					{t('HelpAnimals')}
				</Typography>
			</Link>
			<Link href={'#'}>
				<Typography
					className={'text-white font-semibold text-opacity-50 mb-[5px]'}
				>
					{t('HelpPeople')}
				</Typography>
			</Link>
			<Link href={'#'}>
				<Typography
					className={'text-white font-semibold text-opacity-50 mb-[5px]'}
				>
					{t('BooksAndMusic')}
				</Typography>
			</Link>
			<Link href={'#'}>
				<Typography
					className={'text-white font-semibold text-opacity-50 mb-[5px]'}
				>
					{t('EventTickets')}
				</Typography>
			</Link>
			<Link href={'#'}>
				<Typography
					className={'text-white font-semibold text-opacity-50 mb-[5px]'}
				>
					{t('TrainingCourses')}
				</Typography>
			</Link>
			<Link href={'#'}>
				<Typography
					className={'text-white font-semibold text-opacity-50 mb-[5px]'}
				>
					{t('ArtsAtNFT')}
				</Typography>
			</Link>
			<Link href={'#'}>
				<Typography
					className={'text-white font-semibold text-opacity-50 mb-[5px]'}
				>
					{t('ReferralPrograms')}
				</Typography>
			</Link>
		</div>
	);
};

export default FooterCategories;
