'use client'
import { Button } from "@/shared/ui";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IActiveData } from "../types";
import { API_URL_FILE } from "@/shared/api/config";
import { format, parseISO, differenceInMinutes } from 'date-fns';
import { ru } from 'date-fns/locale'; // Локализация для русского языка
import { IActiveDN2 } from "@/entities/actives";
import { useEffect, useState } from "react";

const ActiveItemLeftSide: React.FC<IActiveDN2> = (data) => {
    const locale = useLocale();
    const router = useRouter();
    const date = parseISO(data.data.endingDate);
    const formattedDate = format(date, "d MMMM yyyy", { locale: ru });

    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

    useEffect(() => {
        const updateCountdown = () => {
            const now = new Date();
            const minutesDifference = differenceInMinutes(date, now);
            
            if (minutesDifference > 0) {
                const days = Math.floor(minutesDifference / (24 * 60));
                const hours = Math.floor((minutesDifference % (24 * 60)) / 60);
                const minutes = minutesDifference % 60;
                setTimeLeft({ days, hours, minutes });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0 });
            }
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 60000); 

        return () => clearInterval(interval); 
    }, []);

    const handleClick = () => {
        router.push(`actives/${data.data.id}`);
    };

    return (
        <div className="flex relative flex-col w-[220px] h-[344px] border-2 border-slate-200 rounded-2xl bg-slate-100">
            <div className="flex z-10 justify-center items-center w-[118px] h-[26px] border-2 border-slate-200 bg-slate-100 border-gray-800 rounded-[13px] absolute left-1/2 -translate-x-1/2 -top-[10px]">
                <span className="text-xs text-[#2D3748] font-[600]">#{data.data.tags[0]}</span>
            </div>
            <div className="flex w-full h-[260px] rounded-t-2xl relative rt-[8px]">
                <Image
                    src={API_URL_FILE + data.data.nft}
                    alt={'Картинка'}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-2xl"
                />
                <div className="flex flex-col text-sm w-[180px] backdrop-blur-[4px] bg-white bg-opacity-40 rounded-lg absolute left-1/2 -translate-x-1/2 bottom-[26px] p-[4px] pl-[8px] pr-[8px]">
                    <div className="flex justify-between mb-[2px]">
                        <span className="flex text-start text-[10px] font-[700] text-[#2D3748]">Доходность</span><span className="flex text-end text-[12px] font-[700] text-[#2D3748]">{data.data.purposeOfCollection}%</span>
                    </div>
                    <div className="flex justify-between mb-[2px]">
                        <span className="flex text-start text-[10px] font-[700] text-[#2D3748]">Доход за год</span><span className="flex text-end text-[12px] font-[700] text-[#2D3748]">{data.data.minimumContribution} USDT</span>
                    </div>
                    <div className="flex justify-between mb-[2px]">
                        <span className="flex text-start text-[10px] font-[700] text-[#2D3748]">Доход за период</span><span className="flex text-end text-[12px] font-[700] text-[#2D3748]">{data.data.minimumContribution} USDT</span>
                    </div>
                </div>
            </div>
            <div className="flex relative w-full h-[75px] rounded-b-2xl">
                <div className="flex z-10 justify-center items-center w-[118px] h-[26px] bg-slate-100 border-2 border-slate-200 rounded-[13px] absolute left-1/2 -translate-x-1/2 -top-[10px]">
                    <span className="text-xs text-slate-500">
                        {timeLeft.days}d:{timeLeft.hours}h:{timeLeft.minutes}m
                    </span>
                </div>
                <div className="flex w-full border-t-2 border-slate-200 justify-between items-end">
                    <div className="flex flex-col font-semibold p-2">
                        <span className="text-sm text-slate-400">Цена</span>
                        <span className="flex text-sm ">{data.data.price}&nbsp;USDT</span>
                    </div>
                    <div className="flex">
                        <Button onClick={handleClick} className="w-[120px] h-[38px] text-xs m-2 ">Редактировать</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActiveItemLeftSide;
