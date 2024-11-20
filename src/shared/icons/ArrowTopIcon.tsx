import {FC} from "react";
import {IconProps} from "@/shared/icons/type";

const ArrowTopIcon:FC<IconProps> = ({props}) => {
    return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12 15V1" stroke="#2D3748" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M19 8L12 1L5 8" stroke="#2D3748" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
};

export default ArrowTopIcon;