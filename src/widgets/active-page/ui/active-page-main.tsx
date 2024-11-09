'use client'
import { IActiveByIdResponse, IActiveIdTag, IActiveListDocLink } from "@/entities/actives";
import { Button } from "@/shared/ui";
import { useLocale } from "next-intl";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ActiveDataIdProps } from "../typea";


import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale'; // Локализация для русского языка



const ActivePageMainSide: React.FC<ActiveDataIdProps> = (data) => {
    const date = parseISO(data.data.endingDate);
    const formattedDate = format(date, "d MMMM yyyy", { locale: ru });

    const [isExpanded, setIsExpanded] = useState(false);
    const maxCharacters = 200; // Максимальное количество символов для отображения
    const [height, setHeight] = useState('auto');
    const contentRef = useRef<HTMLDivElement>(null);

    const text = data.data.description

    const handleToggleExpand = () => {
        setIsExpanded(!isExpanded);
    }
    useEffect(() => {
        // Устанавливаем начальную высоту
        if (contentRef.current) {
            setHeight(isExpanded ? `${contentRef.current.scrollHeight}px` : `${maxCharacters * 0.2}px`);
        }
    }, [isExpanded, text]);
    return (
        <>
            <div className="flex ml-[30px] flex-col w-[640px]">
                <div className="flex justify-between">
                    <div className="flex tracking-wider flex-col">
                        <span className="flex text-xl font-semibold">Параметры актива:</span>
                        <span className="flex text-base mt-2 font-light">Стоимость {data.data.headline} USDT</span>
                        <span className="flex text-base font-light">Доходность {data.data.purposeCollection}%</span>
                        <span className="flex text-base font-light">Частота выплат: раз в месяц</span>
                        <span className="flex text-base font-light">Возврат средств: через год</span>
                        <span className="flex text-base font-light">Срок активности: до {formattedDate} </span>
                        <div className="flex mt-[16px] gap-6">
                            <Button
                                className="w-[160px]"
                                variant={"secondary"}>В корзину</Button>
                            <Button className="w-[160px]">Купить</Button>
                        </div>
                    </div>
                    <div className="flex flex-col items-end justify-start	 gap-2">
                        <div className="flex gap-2">
                            <span className="text-sm text-transparent-gray">В избранное</span>
                            <div className="flex w-[18px] h-[18px] rounded-full bg-slate-400"></div>
                        </div>
                        <div className="flex gap-2">
                            <span className="text-sm text-transparent-gray">Поделиться</span>
                            <div className="flex w-[18px] h-[18px] rounded-full bg-slate-400"></div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col mt-[32px]">
                    <span className="text-lg font-semibold">Описание</span>
                    <div ref={contentRef}
                        className="overflow-hidden transition-height duration-500 ease-in-out"
                        style={{ height }}                    >
                        <p>
                            {isExpanded ? text : text.slice(0, maxCharacters) + (text.length > maxCharacters ? '...' : '')}
                        </p>
                    </div>
                    {text.length > maxCharacters && (
                        <div className="flex justify-start">
                            <Button
                                onClick={handleToggleExpand}
                                variant={"secondary"}
                                className="mt-2 w-[160px] hover:underline"
                            >
                                {isExpanded ? 'Свернуть' : 'Развернуть'}
                            </Button>
                        </div>
                    )}

                </div>
                <div className="flex mt-[20px] flex-col">
                    <span className="text-lg font-semibold">Коллекция</span>
                    <span className="text-sm text-blue-500 font-light">{data.data.collection.name}</span>
                </div>
                <div className="flex mt-[20px] flex-col">
                    <span className="text-lg font-semibold">Теги</span>
                    <div className="flex">
                        {data?.data?.tags?.map((tag, index) => (
                            <span key={index} className="text-sm ml-1 text-blue-500 font-light">
                                #{tag}
                            </span>
                        ))}
                    </div>

                    <span className="text-sm text-blue-500 font-light"></span>
                </div>
                <div className="flex">
                    <Button className="mt-[20px]"
                        variant={"secondary"}>
                        Документы компании
                    </Button>

                </div>
            </div >
        </>
    )
}

export default ActivePageMainSide;