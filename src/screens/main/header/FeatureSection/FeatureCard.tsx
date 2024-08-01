import { cn } from '@/shared/lib/utils';
import { FC } from 'react';

interface IFeatureCardProps {
	Title: React.ReactNode;
	subtitle?: string;
	Image: React.ReactNode;
	className?: string;
}

const FeatureCard: FC<IFeatureCardProps> = ({
	Title,
	subtitle,
	Image,
	className,
}) => {
	return (
		<div
			className={cn(
				'bg-secondary flex justify-between pl-[12px] py-[12px] box-border rounded-2xl relative min-h-[120px]',
				className
			)}
		>
			<div className="z-10">
				{Title}
				{subtitle && (
					<span className="block font-bold max-w-[174px]">{subtitle}</span>
				)}
			</div>
			{Image}
		</div>
	);
};

export default FeatureCard;
