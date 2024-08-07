import { Typography } from '@/shared/ui';
import Link from 'next/link';

const FooterCategories = () => {
	return (
		<div className={'flex flex-col items-center md:items-start'}>
			<Link href={'#'}>
				<Typography className={'text-white font-semibold mb-[15px]'}>
					Категория
				</Typography>
			</Link>
			<Link href={'#'}>
				<Typography
					className={'text-white font-semibold text-opacity-50 mb-[5px]'}
				>
					Купить NFT
				</Typography>
			</Link>
			<Link href={'#'}>
				<Typography
					className={'text-white font-semibold text-opacity-50 mb-[5px]'}
				>
					Купить токен х100
				</Typography>
			</Link>
			<Link href={'#'}>
				<Typography
					className={'text-white font-semibold text-opacity-50 mb-[5px]'}
				>
					Цифровая барахолка
				</Typography>
			</Link>
			<Link href={'#'}>
				<Typography
					className={'text-white font-semibold text-opacity-50 mb-[5px]'}
				>
					Помощь животным
				</Typography>
			</Link>
			<Link href={'#'}>
				<Typography
					className={'text-white font-semibold text-opacity-50 mb-[5px]'}
				>
					Помощь людям
				</Typography>
			</Link>
			<Link href={'#'}>
				<Typography
					className={'text-white font-semibold text-opacity-50 mb-[5px]'}
				>
					Книги и музыка
				</Typography>
			</Link>
			<Link href={'#'}>
				<Typography
					className={'text-white font-semibold text-opacity-50 mb-[5px]'}
				>
					Билеты на мероприятия
				</Typography>
			</Link>
			<Link href={'#'}>
				<Typography
					className={'text-white font-semibold text-opacity-50 mb-[5px]'}
				>
					Обучающие курсы
				</Typography>
			</Link>
			<Link href={'#'}>
				<Typography
					className={'text-white font-semibold text-opacity-50 mb-[5px]'}
				>
					Искусство в NFT
				</Typography>
			</Link>
			<Link href={'#'}>
				<Typography
					className={'text-white font-semibold text-opacity-50 mb-[5px]'}
				>
					Реферальные программы
				</Typography>
			</Link>
		</div>
	);
};

export default FooterCategories;
