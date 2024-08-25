import Image from 'next/image';
import { landingImages } from '@/shared/images';
import { useTranslations } from 'next-intl';

const GameSectionImage = () => {
	const t = useTranslations('Home.Categories');
	return (
		// <Image
		// 	src={landingImages.gameImg}
		// 	alt={'game'}
		// 	className="rounded-[15px] object-cover max-h-[350px]"
		// />
		<div className="bg-gradient-to-r from-gradient-accent-start to-gradient-accent-end rounded-[15px] h-full flex justify-center items-center text-2xl font-bold text-white">
			{t('ComingSoon')}
		</div>
	);
};

export default GameSectionImage;
