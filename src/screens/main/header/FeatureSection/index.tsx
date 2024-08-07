import { FC } from 'react';
import FeatureCard from './FeatureCard';

import IncomeIcon from './icons/income.png';
import CoinIcon from './icons/coin.png';
import ComputerCoin from './icons/computer.png';
import AnimalCoin from './icons/animal.png';
import HelpIcon from './icons/help.png';
import BookIcon from './icons/book.png';
import TicketIcon from './icons/ticket.png';
import BlogIcon from './icons/blog.png';
import YetiIcon from './icons/yeti.png';
import MessageIcon from './icons/message.png';
import { GradientTypography } from '@/shared/ui';

interface FeatureSectionProps {}

const FeatureSection: FC<FeatureSectionProps> = () => {
	return (
		<div>
			<div className="hidden lg:block">
				<GradientTypography content={'Маркетплейс цифровых активов'} />
				<p className="text-[22px] font-normal mt-[8px]">
					Масштабируй бизнес, совершай покупки и зарабатывай вместе с FUTURUM
				</p>
			</div>

			<div className="mt-0 lg:mt-[55px]">
				<div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-[8px] lg:gap-[24px] mb-[8px] lg:mb-[24px]">
					<FeatureCard
						isActive
						Title={
							<span className="block font-bold lg:text-[18px] xl:text-[20px]">
								Получай доход
							</span>
						}
						subtitle="от действующих бизнесов"
						// image={<img src={IncomeIcon.src} alt="" />}
						Image={
							<div className="absolute right-0 top-0 z-1 w-[120px] hidden lg:block">
								<img
									src={IncomeIcon.src}
									alt=""
									className="object-contain w-full h-full"
								/>
							</div>
						}
					/>
					<FeatureCard
						Title={
							<span className="block font-bold lg:text-[18px] xl:text-[20px]">
								Стань сооснователем
							</span>
						}
						subtitle="инновационного стартапа"
						Image={
							<div className="absolute right-[26px] bottom-0 z-1 w-[74px] h-[74px] hidden lg:block">
								<img
									src="/images/features/coin.png"
									alt=""
									className="object-contain w-full h-full"
								/>
							</div>
						}
					/>
					<FeatureCard
						Title={
							<span className="block font-bold lg:text-[18px] xl:text-[20px] max-w-[171px]">
								Цифровая барахолка
							</span>
						}
						Image={
							<>
								<div className="absolute right-0 top-0 z-1 w-[160px] hidden lg:block">
									<img
										src={ComputerCoin.src}
										alt=""
										className="object-contain w-full h-full"
									/>
								</div>
								<img
									src="/images/features/sell-mobile.png"
									alt=""
									className="w-[60px] h-[48px] lg:hidden"
								/>
							</>
						}
					/>
					<FeatureCard
						Title={
							<span className="block font-bold lg:text-[18px] xl:text-[20px] max-w-[171px]">
								Помощь животным
							</span>
						}
						Image={
							<>
								<div className="absolute right-[-8px] top-[12px] z-1 w-[80px] hidden lg:block">
									<img
										src={AnimalCoin.src}
										alt=""
										className="object-contain w-full h-full"
									/>
								</div>
								<img
									src="/images/features/animal-mobile.png"
									alt=""
									className="w-[48px] h-[48px] lg:hidden"
								/>
							</>
						}
						className="lg:col-span-1 lg:col-start-4" // Последний элемент занимает одну колонку
					/>
				</div>

				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-[8px] lg:gap-[24px]">
					<FeatureCard
						Title={
							<span className="block font-bold lg:text-[18px] xl:text-[20px] max-w-[105px]">
								Помощь людям
							</span>
						}
						Image={
							<>
								<div className="absolute right-0 top-0 z-1 w-[90px] hidden lg:block">
									<img
										src={HelpIcon.src}
										alt=""
										className="object-contain w-full h-full"
									/>
								</div>
								<img
									src="/images/features/heart-mobile.png"
									alt=""
									className="block lg:hidden"
								/>
							</>
						}
					/>
					<FeatureCard
						Title={
							<span className="block font-bold lg:text-[18px] xl:text-[20px] max-w-[105px]">
								Книги и музыка
							</span>
						}
						Image={
							<>
								<div className="absolute right-0 top-0 z-1 w-[90px] hidden lg:block">
									<img
										src={BookIcon.src}
										alt=""
										className="object-contain w-full h-full"
									/>
								</div>
								<img
									src="/images/features/book-mobile.png"
									alt=""
									className="w-[48px] h-[48px] block lg:hidden"
								/>
							</>
						}
					/>
					<FeatureCard
						className="pb-0 justify-end"
						Title={
							<span className="block font-bold lg:text-[18px] xl:text-[20px] max-w-[179px]">
								Билеты на мероприятия
							</span>
						}
						Image={
							<>
								<div className="absolute right-0 top-0 z-1 w-[90px] hidden lg:block">
									<img
										src={TicketIcon.src}
										alt=""
										className="object-contain w-full h-full"
									/>
								</div>
								<img
									src="/images/features/movie-mobile.png"
									alt=""
									className="w-[48px] h-[48px] lg:hidden block"
								/>
							</>
						}
					/>
					<FeatureCard
						Title={
							<span className="block font-bold lg:text-[18px] xl:text-[20px] max-w-[156]">
								Обучающие курсы
							</span>
						}
						Image={
							<>
								<div className="absolute right-0 top-0 z-1 w-[120px] hidden lg:block">
									<img
										src={BlogIcon.src}
										alt=""
										className="object-contain w-full h-full"
									/>
								</div>
								<img
									src="/images/features/blog-mobile.png"
									alt=""
									className="w-[72px] h-[48px block lg:hidden"
								/>
							</>
						}
					/>
					<FeatureCard
						className="pb-0 justify-end"
						Title={
							<span className="block font-bold lg:text-[18px] xl:text-[20px] max-w-[115px]">
								Искусство в NFT
							</span>
						}
						Image={
							<>
								<div className="absolute right-0 top-0 z-1 w-[90px] hidden lg:block">
									<img
										src={YetiIcon.src}
										alt=""
										className="object-contain w-full h-full"
									/>
								</div>
								<img
									src="/images/features/nft-mobile.png"
									alt=""
									className="w-[48px] h-[48px] block lg:hidden"
								/>
							</>
						}
					/>
					<FeatureCard
						Title={
							<span className="block font-bold lg:text-[18px] xl:text-[20px] max-w-[141px]">
								Реферальные программы
							</span>
						}
						Image={
							<>
								<div className="absolute right-0 top-0 z-1 w-[90px] hidden lg:block">
									<img
										src={MessageIcon.src}
										alt=""
										className="object-contain w-full h-full"
									/>
								</div>
								<img
									src="/images/features/message-mobile.png"
									alt=""
									className="w-[60px] h-[48px] block lg:hidden"
								/>
							</>
						}
					/>
				</div>
			</div>
		</div>
	);
};

export default FeatureSection;
