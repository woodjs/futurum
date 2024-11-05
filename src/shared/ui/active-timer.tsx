'use client'
import {FC} from "react";
import {cn} from "@/shared/lib/utils";
import { format } from 'date-fns'
import { getDateLocale } from '@/shared/lib/get-date-locale'
import { useLocale } from 'next-intl'


interface IProps {
    content: string;
    textColor?: string;
    bgColor?: string;
    borderColor?: string;
}

const ActiveCardTimer:FC<IProps> = ({content, textColor = 'text-black', bgColor = 'bg-gray', borderColor = 'text-gray2'}) => {
    const locale = useLocale()
    return (
        <div className={cn('rounded-[14px] border-solid border w-[88px] h-[20px] flex justify-center items-center', bgColor, borderColor)}>
            <p className={cn('font-semibold text-[10px]', textColor)}>
            {format(content, 'dd MMMM HH:MM', {
              locale: getDateLocale(locale),
            })}
            </p>
        </div>
    )
};

export default ActiveCardTimer;