import * as React from "react";
import {FC} from "react";
import {cn} from "@/shared/lib/utils";

export interface TypographyProps extends React.ComponentPropsWithoutRef<"p"> {
    content: string;
    variant?: keyof typeof textVariants;
    className?: string;
}

const gradientStyles = 'bg-gradient-to-r from-gradient-accent-start to-gradient-accent-end inline-block text-transparent bg-clip-text'

const textVariants = {
    'h1': `font-bold text-[64px] leading-[77.45px] ${gradientStyles}`, //12 400
    'h2': `font-bold text-[42px] leading-[44px] ${gradientStyles}`, //16 400
    'subtitle-1': `font-bold text-[20px] leading-[26px] ${gradientStyles}`, //20 400
};

const GradientTypography: FC<TypographyProps> = ({content, variant = 'h1', className, ...props}) => {
    return <p className={cn(
        textVariants[variant],
        className,
    )}{...props}>
        {content}
    </p>
};

export { GradientTypography };