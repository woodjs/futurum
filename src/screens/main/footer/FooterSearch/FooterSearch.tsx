import LogoIcon from '@/shared/icons/LogoIcon';
import { Input, Typography } from '@/shared/ui';
import { Search } from 'lucide-react';
import TelegramIcon from '@/shared/icons/TelegramIcon';
import TwitterIcon from '@/shared/icons/TwitterIcon';
import DiscordIcon from '@/shared/icons/DiscordIcon';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const FooterSearch = () => {
	const t = useTranslations('default.Home.Footer');

	return (
		<div className={'flex flex-col items-center'}>
			<div className={'mb-[20px]'}>
				<LogoIcon />
			</div>
			<div className={'mb-[26px]'}>
				<Input
					className={'bg-primary border border-solid border-white'}
					placeholder={t('SearchByName')}
					leftSection={<Search color={'white'} />}
				/>
			</div>
			<div className={'w-[147px] flex justify-between mb-[40px]'}>
				<Link href={'#'}>
					<TelegramIcon />
				</Link>
				<Link href={'#'}>
					<TwitterIcon />
				</Link>
				<Link href={'#'}>
					<DiscordIcon />
				</Link>
			</div>
			<Typography variant={'p-small2'} className={'text-white'}>
				{t('AllRightsReserved')}
			</Typography>
		</div>
	);
};

export default FooterSearch;
