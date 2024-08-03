import * as React from "react";
import {FC} from "react";
import {cn} from "@/shared/lib/utils";

export interface TypographyProps extends React.ComponentPropsWithoutRef<"p"> {
    content: string;
    variant?: keyof typeof textVariants;
    className?: string;
}

const textVariants = {
    'h2': 'font-bold text-[42px] leading-[44px]',//42 700
    'subtitle-1': 'font-bold text-[20px] leading-[26px]',//20 700
    'p-large': 'font-normal text-[20px] leading-[26px]', //20 400
    'p': 'font-normal text-[16px] leading-[20px]', //16 400
    'p-small': 'font-normal text-[12px] leading-[16px]', //12 400
    'p-small2': 'font-bold text-[12px] leading-[16px]', //12 700
};

const Typography: FC<TypographyProps> = ({content, variant = 'p', className, ...props}) => {
    return <p className={cn(
        textVariants[variant],
        className,
    )}{...props}>
        {content}
    </p>
};

export { Typography };