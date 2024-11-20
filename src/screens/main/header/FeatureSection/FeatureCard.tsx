import { cn } from '@/shared/lib/utils';
import { FC } from 'react';

interface IFeatureCardProps {
	isActive?: boolean;
	Title: React.ReactNode;
	subtitle?: string;
	Image: React.ReactNode;
	className?: string;
}

const FeatureCard: FC<IFeatureCardProps> = ({
	isActive,
	Title,
	subtitle,
	Image,
	className,
}) => {
	return (
		<div
			className={cn(
				'bg-secondary flex lg:pl-[12px] py-[12px] box-border rounded-2xl relative min-h-[120px] flex-col lg:flex-row justify-center items-center lg:items-start lg:justify-between text-center lg:text-left overflow-hidden',
				isActive &&
					'bg-gradient-to-r from-[#0052D4] via-[#4364F7] to-[#6FB1FC] text-white',
				className
			)}
		>
			<div className="z-10">
				{Title}
				{subtitle && (
					<span className="block font-bold max-w-[174px] mx-auto lg:mx-0 text-[12px] lg:text-[16px]">
						{subtitle}
					</span>
				)}
			</div>
			{Image}
		</div>
	);
};

export default FeatureCard;
