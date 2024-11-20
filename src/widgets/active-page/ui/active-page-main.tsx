'use client'
import { IActiveByIdResponse, IActiveDN2, IActiveIdDN2, IActiveIdTag, IActiveListDocLink } from "@/entities/actives";
import { Button } from "@/shared/ui";
import { useLocale } from "next-intl";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ActiveDataIdProps } from "../typea";


import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale'; // Локализация для русского языка
import ShareIcon from "@/shared/icons/ShareIcon";
import LikeIcon from "@/shared/icons/LikeIcon";
import { activePayoutFrequencyList, activeRefundList } from "@/features/create-active/ui/create-active-form";



const ActivePageMainSide: React.FC<IActiveIdDN2> = (data) => {
    const date = parseISO(data.data.endingDate);
    const formattedDate = format(date, "d MMMM yyyy", { locale: ru });

    const [isExpanded, setIsExpanded] = useState(false);
    const maxCharacters = 200; // Максимальное количество символов для отображения
    const [height, setHeight] = useState('auto');
    const contentRef = useRef<HTMLDivElement>(null);

    const text = data.data.description

    const frequencyItem = activePayoutFrequencyList.find((item) => item.value === data.data.payoutFrequency);
    const refundItem = activeRefundList.find((item) => item.value === data.data.refund);

    
    const handleToggleExpand = () => {
        setIsExpanded(!isExpanded);
    }

    const displayText = isExpanded ? text : text.slice(0, maxCharacters) + (text.length > maxCharacters ? '...' : '');

    useEffect(() => {
        // Устанавливаем начальную высоту
        if (contentRef.current) {
            setHeight(isExpanded ? `${contentRef.current.scrollHeight}px` : `${maxCharacters * 0.2}px`);
        }
    }, [isExpanded, text]);
    return (
        <>
            <div className="flex ml-[30px] flex-col w-full">
                <div className="flex justify-between">
                    <div className="flex tracking-wider flex-col">
                        <span className="flex text-xl font-semibold">Параметры актива:</span>
                        <span className="flex text-base mt-2 font-light">Стоимость {data.data.price} USDT</span>
                        <span className="flex text-base font-light">Доходность {data.data.profitability}%</span>
                        <span className="flex text-base font-light">Частота выплат: {frequencyItem?.label}</span>
                        <span className="flex text-base font-light">Возврат средств: {refundItem?.label}</span>
                        <span className="flex text-base font-light">Срок активности: до {formattedDate} </span>
                        <div className="flex mt-[16px] gap-6">
                            <Button
                                className="w-[160px] border-slate-400"
                                variant={"outline"}>В корзину</Button>
                            <Button className="w-[160px]">Купить</Button>
                        </div>
                    </div>
                    <div className="flex flex-col items-end justify-start	 gap-2">
                        <div className="flex gap-2 cursor-pointer">
                            <span className="text-[14px] text-[#A0AEC0E5] font-[700]">В избранное</span>
                            <LikeIcon />
                        </div>
                        <div className="flex gap-2 cursor-pointer">
                            <span className="text-[14px] text-[#A0AEC0E5] font-[700]">Поделиться</span>
                            <ShareIcon />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col mt-[32px]">
                    <span className="text-lg font-semibold">Описание</span>
                    <div ref={contentRef}
                        className="overflow-hidden transition-height duration-500 ease-in-out"
                        style={{ height }}                    >
                        <p
                            className="custom-content"
                            dangerouslySetInnerHTML={{
                                __html: displayText,
                            }}
                        />
                    </div>
                    {text.length > maxCharacters && (
                        <div className="flex justify-start">
                            <Button
                                onClick={handleToggleExpand}
                                variant={"outline"}
                                className="mt-2 hover:underline border-slate-400"
                            >
                                {isExpanded ? 'Свернуть' : 'Развернуть описание'}
                            </Button>
                        </div>
                    )}

                </div>
                <div className="flex mt-[20px] flex-col">
                    <span className="text-lg font-semibold">Коллекция</span>
                    <span className="text-sm text-cyan-600 underline font-light">{data.data.collection.name}</span>
                </div>
                <div className="flex mt-[20px] flex-col">
                    <span className="text-lg font-semibold">Теги</span>
                    <div className="flex">
                        {data?.data?.tags?.map((tag, index) => (
                            <span key={index} className="text-sm ml-1 text-cyan-600 font-light">
                                #{tag}
                            </span>
                        ))}
                    </div>

                    {/* <span className="text-sm text-blue-500 font-light"></span> */}
                </div>
                <div className="flex">
                    <Button className="mt-[20px] border-slate-400"
                        variant={"outline"}>
                        Документы компании
                    </Button>

                </div>
            </div >
        </>
    )
}

export default ActivePageMainSide;