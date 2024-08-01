import { cn } from '../lib/utils';

export const Container = ({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) => {
	return (
		<div
			className={cn(
				// Общие стили
				'w-full mx-auto',
				// Адаптивные стили
				'xs:px-4', // Отступы по бокам для небольших экранов
				'max-w-[95%] xl:max-w-[1110px] 2xl:max-w-[1296px] border-red-700 border-solid border',
				className
			)}
		>
			{children}
		</div>
	);
};
