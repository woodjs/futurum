'use client'
import { Button } from "@/shared/ui";
import { useLocale } from "next-intl";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ActiveDataIdProps } from "../typea";
import { API_URL_FILE } from "@/shared/api/config";
import { IActiveDN2, IActiveIdDN2 } from "@/entities/actives";




const ActivePageBottom: React.FC<IActiveIdDN2> = (data) => {

    return (
        <>
            <div className="flex flex-col mt-[30px] w-full">
                <div className="flex flex-col">
                    <span className="text-lg font-semibold">Галерея</span>
                    <div className="flex mt-[16px] gap-4">
                        {data?.data?.galeryImages?.map((img, index) => (
                            <div className="w-[140px] bg-slate-400 h-[140px] rounded-lg">
                                <Image
                                    src={API_URL_FILE+img}
                                    alt={'Картинка'}
                                    objectFit="cover"
                                    width={140}
                                    height={140}
                                    className="rounded-t-2xl w-[140px] h-[140px]"
                                >
                                </Image>
                            </div>
                        ))}
                        
                    </div>

                </div>
                <div className="flex mt-[26px] flex-col">
                    <span className="text-lg font-semibold">Комментарии</span>
                    <textarea className="mt-6px border-1 border-[#333333] rounded-xl bg-slate-100 border-collapse"></textarea>
                    <Button className="mt-[6px]">Отправить</Button>
                </div>
            </div >
        </>
    )
}
export default ActivePageBottom;