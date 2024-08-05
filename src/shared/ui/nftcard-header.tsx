import {FC} from "react";
import {cn} from "@/shared/lib/utils";

interface IProps {
    content: string;
    textColor?: string;
    bgColor?: string;
    borderColor?: string;
}

const NftcardHeader:FC<IProps> = ({content, textColor = 'text-black', bgColor = 'text-gray', borderColor = 'text-gray2'}) => {
    return <div className={'rounded-[14px] bg-white w-[122px] h-[30px] flex justify-center align-middle'}>
        <div className={cn('rounded-[14px] border-solid border w-[118px] h-[26px]', bgColor, borderColor)}>
            <p className={cn('font-semibold text-[10px] h-full w-full text-center leading-6', textColor)}>{content}</p>
        </div>
    </div>
};

export default NftcardHeader;