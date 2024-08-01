import * as React from 'react';

export interface IconLabelBadgeProps {
	icon: React.ReactNode;
	label: string;
	badgeCount?: number;
}

const IconLabelBadge: React.FC<IconLabelBadgeProps> = ({
	icon,
	label,
	badgeCount,
}) => {
	return (
		<div className="flex flex-col items-center cursor-pointer">
			<div className="relative">
				{icon}
				{badgeCount && (
					<span className="absolute top-[-10px] right-[-10px] flex items-center justify-center rounded-full w-[20px] h-[20px] text-[10px] bg-primary-red text-white">
						{badgeCount}
					</span>
				)}
			</div>

			<span>{label}</span>
		</div>
	);
};

export default IconLabelBadge;
