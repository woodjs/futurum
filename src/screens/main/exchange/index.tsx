import { cn } from '@/shared/lib/utils';
import { useTranslations } from 'next-intl';
import { Button, GradientTypography, Typography } from '@/shared/ui';
import Image from 'next/image';
import Section from '../section';

const data = [
	{
		id: 1,
		name: 'QuantSteel',
		code: 'QSL',
		image: '/images/coins/coin-1.png',
		percent: 59.1,
		isProfit: false,
	},
	{
		id: 2,
		name: 'StellarFractal',
		code: 'STFR',
		image: '/images/coins/stfr.png',
		percent: 192,
		isProfit: true,
	},
	{
		id: 3,
		name: 'EtherDream',
		code: 'ETDR',
		image: '/images/coins/etdr.png',
		percent: 192,
		isProfit: true,
	},
	{
		id: 4,
		name: 'InfinitoCoin',
		code: 'INFC',
		image: '/images/coins/infc.png',
		percent: 192,
		isProfit: true,
	},
	{
		id: 5,
		name: 'InfinitoCoin',
		code: 'GLAL',
		image: '/images/coins/glal.png',
		percent: 192,
		isProfit: true,
	},
];

export default function Exchange() {
	const t = useTranslations('default.Home.Categories');
	
	return (
		<Section
			Title={
				<Typography variant="h2">
					{t('FUTURUMСryptoExchangeOne')} <GradientTypography variant="h2">{t('FUTURUMСryptoExchangeTwo')}</GradientTypography>
				</Typography>
			}
		>
			<div className="flex flex-col lg:flex-row gap-[30px]">
				<div className="bg-gray px-[16px] rounded-[15px] w-full flex-1">
					<div className="w-full flex justify-between border-b border-gray2 py-[14px]">
						<p className="flex-1 text-[#4F4F4F] text-[12px] uppercase font-semibold">
							{t("Name")}
						</p>
						<p className="lg:flex-1 text-[#4F4F4F] text-[12px] uppercase font-semibold">
						{t("Price")}
						</p>
						<p className="flex-1 text-[#4F4F4F] text-[12px] uppercase font-semibold hidden lg:block">
						{t("Chart")}
						</p>
					</div>
					{data.map((item) => (
						<div
							key={item.id}
							className="w-full flex justify-between border-b border-gray2 py-[14px]"
						>
							<div className="flex-1">
								<div className="flex gap-[6px] items-center">
									<Image src={item.image} alt="" width={26} height={26} />
									<div className="font-bold">
										<p className="mb-[2px] text-[14px]">{item.name}</p>
										<p className="text-[#4F4F4F] text-[12px]">{item.code}</p>
									</div>
								</div>
							</div>
							<div className="md:hidden block">
								<p className="flex-1 text-[14px] uppercase font-bold">
									0,00 USDT
								</p>
								<div className="flex-1 flex items-center gap-[6px]">
									{item.isProfit ? (
										<svg
											width="10"
											height="6"
											viewBox="0 0 10 6"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M5 0.666626L10 5.66663H0L5 0.666626Z"
												fill="#19BBBB"
											/>
										</svg>
									) : (
										<svg
											width="10"
											height="6"
											viewBox="0 0 10 6"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M5 5.66663L10 0.666626H0L5 5.66663Z"
												fill="#FB5757"
											/>
										</svg>
									)}

									<div
										className={cn(
											'py-[6px] px-[4px] rounded-[8px]',
											item.isProfit ? 'bg-[#19BBBB]' : 'bg-[#FB5757]'
										)}
									>
										<span className="text-white">
											{item.isProfit ? '+' : '-'}
											{item.percent}%
										</span>
									</div>
								</div>
							</div>
							<p className="flex-1 text-[14px] uppercase font-bold hidden md:block">
								0,00 USDT
							</p>
							<div className="flex-1 items-center gap-[6px] hidden md:flex">
								{item.isProfit ? (
									<svg
										width="10"
										height="6"
										viewBox="0 0 10 6"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M5 0.666626L10 5.66663H0L5 0.666626Z"
											fill="#19BBBB"
										/>
									</svg>
								) : (
									<svg
										width="10"
										height="6"
										viewBox="0 0 10 6"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M5 5.66663L10 0.666626H0L5 5.66663Z"
											fill="#FB5757"
										/>
									</svg>
								)}
								<div
									className={cn(
										'py-[6px] px-[4px] rounded-[8px]',
										item.isProfit ? 'bg-[#19BBBB]' : 'bg-[#FB5757]'
									)}
								>
									<span className="text-white">
										{item.isProfit ? '+' : '-'}
										{item.percent}%
									</span>
								</div>
							</div>
						</div>
					))}
				</div>
				<div className="flex flex-col gap-[22px] flex-1 ">
					<div className="rounded-[15px] bg-gray p-[18px]">
						<div className="flex justify-center gap-[10px] lg:gap-0 lg:justify-between items-center border-b border-gray2 pb-[14px]">
							<div className="flex gap-[8px]">
								<Image
									width={44}
									height={44}
									src="/images/coins/ton.png"
									alt=""
								/>
								<div className="font-bold">
									<p className="text-[#4F4F4F] text-[12px] mb-[1px]">
										Toncoin (TON)
									</p>
									<p className="text-[18px]">7,48 $</p>
								</div>
							</div>
							<div className="flex items-center gap-[6px]">
								<svg
									width="10"
									height="6"
									viewBox="0 0 10 6"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M5 0.666626L10 5.66663H0L5 0.666626Z"
										fill="#19BBBB"
									/>
								</svg>

								<div className="py-[6px] px-[4px] bg-[#19BBBB] rounded-[8px]">
									<span className="text-white">+192.93%</span>
								</div>
							</div>
						</div>
						<div className="flex justify-center mt-[14px]">
							<div className="pr-[16px] lg:pr-[44px] pt-[20px] flex flex-col justify-center items-center text-[12px] font-bold">
								Rank
								<span className="text-[18px]">#8</span>
							</div>
							<div className="border-l border-r border-gray2 px-[16px] lg:px-[44px] pt-[20px] flex flex-col justify-center items-center text-[12px] text-[#4F4F4F] font-bold">
								Market Cap
								<span className="text-[18px]">18.38B $</span>
							</div>
							<div className="pl-[16px] lg:pl-[44px] pt-[20px] flex flex-col justify-center items-center text-[12px] text-[#4F4F4F] font-bold">
								Volume
								<span className="text-[18px]">266.63M $</span>
							</div>
						</div>
					</div>

					<div className="bg-gray flex flex-col justify-center items-center rounded-[15px] h-full py-[28px] lg:py-0">
						<div>
							<div className="flex items-center gap-[10px]">
								<Image
									src="/images/logo-x100.png"
									alt=""
									width={64}
									height={64}
								/>
								<span className="font-bold text-[18px] text-[#4F4F4F]">
									{t('FuturumToken')}
								</span>
							</div>
							<Button className="w-full mt-[12px]">
								{t('GetInPresale')}
							</Button>
						</div>
					</div>
				</div>
			</div>
		</Section>
	);
}
