'use client'
import { IActiveByIdResponse, IActiveByIdResponseData, IActiveDN2, IActiveIdDN2, IActiveIdOrganization } from "@/entities/actives";
import { API_URL_FILE } from "@/shared/api/config";
import { Button } from "@/shared/ui";
import { useLocale } from "next-intl";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { ActiveDataIdProps } from "../typea";
import { ru } from "date-fns/locale";
import { differenceInMinutes, format, parseISO } from 'date-fns';
import { useState, useEffect } from "react";
import CheckMarkIcon from "@/shared/icons/CheckMarkIcon";
import StarIcon from "@/shared/icons/StarIcon";



const ActivePageLeftSide: React.FC<IActiveIdDN2> = (data) => {
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
    
    return (
        <>
            <div className="flex w-[300px] flex-col">
                <div className="flex relative flex-col w-[280px] h-[344px] border-2 border-slate-200 rounded-2xl bg-slate-100">
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
                        <div className="flex flex-col text-sm w-[243px] backdrop-blur-[4px] bg-white bg-opacity-40 rounded-lg absolute left-1/2 -translate-x-1/2 bottom-[26px] p-[4px] pl-[8px] pr-[8px]">
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
                                <Button className="w-[120px] h-[38px] text-xs m-2 ">Купить</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex mt-[16px] justify-start">
                    <div className="w-[110px] h-[110px] rounded-full mr-[16px]">
                        <Image
                            src={API_URL_FILE + data.data.nft}
                            alt={'Картинка'}
                            width={110}
                            height={110}
                            layout="fixed"
                            // objectFit="cover"
                            className="relative box-border flex size-[100px] shrink-0 items-center justify-center
                            overflow-hidden rounded-full bg-gradient-to-r from-gradient-accent-start
                            to-gradient-accent-end p-[4px]"
                        >
                        </Image>
                    </div>
                    <div className="flex flex-col ">
                        <div className="flex items-center">
                            <span className="text-2xl font-semibold pr-2">{data.data.organization.companyName}</span><CheckMarkIcon />
                        </div>
                        <div className="text-[#A0AEC0E5] text-[12px] font-[700] mt-[8px]"><span>деятельность компании</span></div>
                        <div className="text-[#A0AEC0E5] text-[12px] font-[400] mt-[8px]" ><span className="Text-transparent-gray text-xs">{data.data.organization.country}, {data.data.organization.city}</span></div>
                        <div className="flex items-center gap-[4px] mt-[10px]">
                            <span className="text-[12px] text-[#2D3748] font-[700]">157</span>
                            <div className="w-[10px] h-[10px] bg-[#A0AEC0E5] rounded-full"></div>
                            <div className="w-[10px] h-[10px] bg-[#A0AEC0E5] rounded-full"></div>
                            <div className="w-[10px] h-[10px] bg-[#A0AEC0E5] rounded-full"></div>
                            <div className="w-[10px] h-[10px] bg-[#A0AEC0E5] rounded-full"></div>
                            <div className="w-[10px] h-[10px] bg-[#A0AEC0E5] rounded-full"></div>
                        </div>
                        <div className="flex items-center ">
                            <span className="text-[12px] text-[#2D3748] font-[700] mr-[4px]">5.0</span>
                            <StarIcon />
                            <StarIcon />
                            <StarIcon />
                            <StarIcon />
                            <StarIcon />
                        </div>
                    </div>
                </div>

                <div className="">

                    <div className="">
                        <div className="flex flex-col mt-6 text-sm gap-3">
                            <Button className="w-fullt text-sm">Написать сообщение</Button>
                            <Button 
                            className="w-fullt border-slate-400 text-sm"
                            variant={'outline'}>Другие активы пользователя</Button>
                            <Button 
                            className="w-fullt border-slate-400 text-sm"
                            variant={'outline'}>Перейти в профиль</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default ActivePageLeftSide;