'use client'
import { Button } from "@/shared/ui";
import { useLocale } from "next-intl";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { IActiveData } from "../types";
import { API_URL_FILE } from "@/shared/api/config";
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale'; // Локализация для русского языка
import { IActiveDN2 } from "@/entities/actives";


const ActiveItemLeftSide:  React.FC<IActiveDN2> = (data) => {
    data.data.id 

const date = parseISO(data.data.endingDate);
const formattedDate = format(date, "d MMMM yyyy", { locale: ru });

    const locale = useLocale()
    const router = useRouter();
    if (data.data.id) {
        console.log("uuid")
        console.log(data.data.id)
    }
    const handleClick = () => {
        router.push(`actives/${data.data.id}`);
    };
    return (
        <div className="flex relative flex-col w-[220px] h-[344px]  border-2 border-slate-200 rounded-2xl bg-slate-100">
            <div className="flex z-10 justify-center items-center w-[118px] h-[26px] border-2 border-slate-200 bg-slate-100  border-gray-800 rounded-[13px] absolute left-1/2 -translate-x-1/2 -top-[10px]">
                <span className="text-xs text-slate-500">#{data.data.tags[0]}</span>
            </div>
            <div className="flex w-full h-[260px] rounded-t-2xl  relative rt-[8px]">
                <Image
                    src={API_URL_FILE+data.data.nft}
                    alt={'Картинка'}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-2xl"
                >
                </Image>
                <div className="flex flex-col text-sm w-[180px] bg-opacity-50 bg-white-transparent rounded-lg  absolute left-1/2 -translate-x-1/2 bottom-[26px]">
                    <div className="flex pt-2 justify-between">
                        <span className="flex text-start text-xs pl-2">Доходность</span><span className="flex text-end text-xs pr-2">{data.data.purposeOfCollection}%</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="flex text-start text-xs p-2">Доход за год</span><span className="flex text-end text-xs p-2">{data.data.minimumContribution} USDT</span>
                    </div>
                    <div className="flex pb-2 justify-between">
                        <span className="flex text-start text-xs pl-2  ">Доход за период</span><span className="flex text-end text-xs pr-2">{data.data.minimumContribution} USDT</span>
                    </div>
                </div>
            </div>
            <div className="flex relative w-full h-[75px] rounded-b-2xl">
                <div className="flex z-10 justify-center items-center w-[118px] h-[26px] bg-slate-100 border-2 border-slate-200 rounded-[13px] absolute left-1/2 -translate-x-1/2 -top-[10px]">
                    <span className="text-xs text-slate-500">{formattedDate}</span>
                </div>
                <div className="flex w-full border-t-2 border-slate-200 justify-between items-end">
                    <div className="flex flex-col font-semibold p-2">
                        <span className="text-sm text-slate-400">Цена</span>
                        <span className="flex text-sm ">{data.data.price}&nbsp;SDT</span>
                    </div>
                    <div className="flex">
                        <Button onClick={handleClick} className="w-[120px] h-[38px] text-xs m-2 ">Редактировать</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActiveItemLeftSide;