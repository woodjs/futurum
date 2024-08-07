import Link from 'next/link';
import { Typography } from '@/shared/ui';

const FooterInfo = () => {
	return (
		<div className={'flex flex-col items-center md:items-start'}>
			<Link href={'#'}>
				<Typography className={'text-white font-semibold mb-[15px]'}>
					Юридическая информация
				</Typography>
			</Link>
			<Link href={'#'}>
				<Typography
					className={'text-white font-semibold text-opacity-50 mb-[5px]'}
				>
					Roadmap
				</Typography>
			</Link>
			<Link href={'#'}>
				<Typography
					className={'text-white font-semibold text-opacity-50 mb-[5px]'}
				>
					White paper
				</Typography>
			</Link>
			<Link href={'#'}>
				<Typography
					className={'text-white font-semibold text-opacity-50 mb-[5px]'}
				>
					Пользовательское соглашение
				</Typography>
			</Link>
			<Link href={'#'}>
				<Typography
					className={'text-white font-semibold text-opacity-50 mb-[5px]'}
				>
					Политика конфиденциальности
				</Typography>
			</Link>
			<Link href={'#'}>
				<Typography
					className={'text-white font-semibold text-opacity-50 mb-[5px]'}
				>
					Публичная оферта
				</Typography>
			</Link>
			<Link href={'#'}>
				<Typography className={'text-white font-semibold mt-[27px]'}>
					Контактная информация
				</Typography>
			</Link>
		</div>
	);
};

export default FooterInfo;
