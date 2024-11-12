'use client'
import { IActiveByIdResponse, IActiveByIdResponseData, IActiveDN2, IActiveIdDN2, IActiveIdOrganization } from "@/entities/actives";
import { API_URL_FILE } from "@/shared/api/config";
import { Button } from "@/shared/ui";
import { useLocale } from "next-intl";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { ActiveDataIdProps } from "../typea";
import { ru } from "date-fns/locale";
import { format, parseISO } from 'date-fns';
import TextWrapper from "@/shared/ui/text-wrapper";



const ActivePageLeftSide: React.FC<IActiveIdDN2> = (data) => {

    const date = parseISO(data.data.endingDate);
const formattedDate = format(date, "d MMMM yyyy", { locale: ru });
    return (
        <>
            <div className="flex w-[300px] flex-col">
                <div className="flex w-[300px] justify-center">
                    <div className="flex relative flex-col w-[260px] h-[400px] border-2 border-slate-200 rounded-2xl bg-slate-100">
                        <div className="flex z-10 justify-center border-2 border-slate-200 items-center w-[118px] h-[26px] bg-white rounded-[13px] absolute left-1/2 -translate-x-1/2 -top-[10px]">
                            <span className="text-xs text-slate-500">#{data.data.tags[0]}</span>
                        </div>
                        <div className="flex w-full h-[310px] relative rounded-t-2xl   rt-[8px]">
                            <Image
                                src={API_URL_FILE + data.data.nft}
                                alt={'Картинка'}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-t-2xl"
                            >
                            </Image>
                            <div className="flex flex-col text-sm w-[235px] border-2 border-slate-200 bg-opacity-50 bg-white-transparent rounded-lg  absolute left-1/2 -translate-x-1/2 bottom-[26px]">
                                <div className="flex pt-2 justify-between">
                                    <span className="flex text-sm pl-2">Доходность</span><span className="flex text-sm pr-2">{data.data.purposeOfCollection}%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="flex text-sm p-2">Доход за год</span><span className="flex text-sm p-2">{data.data.minimumContribution} USDT</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="flex text-sm pl-2">Доход за период</span><span className="flex text-sm pr-2">{data.data.minimumContribution} USDT</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex relative w-full h-[87px] rounded-b-2xl">
                            <div className="flex z-10 justify-center items-center w-[118px] h-[26px] bg-white border-2 border-slate-200 rounded-[13px] absolute left-1/2 -translate-x-1/2 -top-[10px]">
                                <span className="text-xs  text-slate-500">{formattedDate}</span>
                            </div>
                            <div className="flex justify-between border-t-2 border-slate-200 mt-4 items-center w-full ">
                                <div className="flex flex-col place-items-start font-semibold p-4">
                                    <span className="text-sm text-slate-600">Цена</span>
                                    <span className="flex text-lg ">{data.data.price}&nbsp;SDT</span>
                                </div>
                                <div className="flex">
                                    <Button className="w-[115px] h-[38px] text-xs m-4 ">Купить</Button>
                                </div>
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
                            className="rounded-full w-[110px] h-[110px]"
                        >
                        </Image>
                    </div>
                    <div className="flex flex-col ">
                        <div className="flex items-center">
                            <span className="text-2xl font-semibold pr-2">{data.data.organization.companyName}</span><div className="w-[20px] h-[20px] rounded-full bg-blue-800"></div>
                        </div>
                        <div className="text-transparent-gray font-semibold  text-xs"><span><TextWrapper maxLength={20} placeholder="..">деятельность компании</TextWrapper></span></div>
                        <div className="">
                            <div className="mr-[6px] w-[13px] h-[10px] bg-slate-400"></div>
                            <div className="text-slate-400" ><span className="Text-transparent-gray text-xs">{data.data.organization.country}, {data.data.organization.city}</span></div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span>157</span>
                            <div className="w-[10px] h-[10px] bg-black rounded-full"></div>
                            <div className="w-[10px] h-[10px] bg-black rounded-full"></div>
                            <div className="w-[10px] h-[10px] bg-black rounded-full"></div>
                            <div className="w-[10px] h-[10px] bg-black rounded-full"></div>
                            <div className="w-[10px] h-[10px] bg-black rounded-full"></div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span>5.0</span>
                            <div className="w-[10px] h-[10px] bg-yellow-300 rounded-full"></div>
                            <div className="w-[10px] h-[10px] bg-yellow-300 rounded-full"></div>
                            <div className="w-[10px] h-[10px] bg-yellow-300 rounded-full"></div>
                            <div className="w-[10px] h-[10px] bg-yellow-300 rounded-full"></div>
                            <div className="w-[10px] h-[10px] bg-yellow-300 rounded-full"></div>
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