'use client'
import { Button } from "@/shared/ui";
import { useLocale } from "next-intl";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ActiveDataIdProps } from "../typea";
import { API_URL_FILE } from "@/shared/api/config";
import { IActiveDN2, IActiveIdDN2 } from "@/entities/actives";
import ArrowIcon from "@/shared/icons/ArrowIcon";




const ActivePageBottom: React.FC<IActiveIdDN2> = (data) => {

    const [isExpanded, setIsExpanded] = useState(false);
    const initialImageCount = 6; // Number of images to show initially
  
    // Toggle between showing initial count and all images
    const toggleGallery = () => {
      setIsExpanded(!isExpanded);
    };

    return (
        <>
            <div className="flex flex-col mt-[30px] w-full">
                <div className="flex flex-col">
                    <span className="text-lg font-semibold">Галерея</span>
                    <div>
                        <div className="flex mt-[16px] gap-[20px] flex-wrap items-center">
                            {data.data.galeryImages.slice(0, isExpanded ? data.data.galeryImages.length : initialImageCount).map((img, index) => (
                            <div key={index} className="w-[140px] bg-slate-400 h-[140px] rounded-lg">
                                <Image
                                src={img.path}
                                alt={'Картинка'}
                                objectFit="cover"
                                width={140}
                                height={140}
                                className="rounded-2xl w-[140px] h-[140px]"
                                />
                            </div>
                            ))}
                            {data.data.galeryImages.length > initialImageCount && (
                                <div
                                    onClick={toggleGallery}
                                    className="w-[96px] h-[96px] rounded-full border flex items-center justify-center cursor-pointer"
                                >
                                {isExpanded ? <div className="rotate-180"><ArrowIcon /></div> : <div><ArrowIcon /></div>}
                                </div>
                            )}
                        </div>
                        </div>
                </div>
                <div className="flex mt-[26px] flex-col">
                    <span className="text-lg font-semibold">Комментарии</span>
                    <textarea className="min-h-[170px] mt-[8px] border-solid border-[1px] border-[#A0AEC0E5] rounded-xl pt-[8px] pl-[12px] pb-[8px] pr-[12px]" placeholder="Написать комментарий"></textarea>
                </div>
                <Button className="mt-[16px] w-[160px]">Отправить</Button>
            </div >
        </>
    )
}
export default ActivePageBottom;