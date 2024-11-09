import {FC} from "react";
import {cn} from "@/shared/lib/utils";

interface IProps {
    content: string;
    textColor?: string;
    bgColor?: string;
    borderColor?: string;
}

const NftcardTimer:FC<IProps> = ({content, textColor = 'text-black', bgColor = 'bg-gray', borderColor = 'text-gray2'}) => {
    return (
        <div className={cn('rounded-[14px] border-solid border w-[88px] h-[20px] flex justify-center items-center', bgColor, borderColor)}>
            <p className={cn('font-semibold text-[10px]', textColor)}>{content}</p>
        </div>
    )
};

export default NftcardTimer;