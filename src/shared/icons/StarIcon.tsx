import {FC} from "react";
import {IconProps} from "@/shared/icons/type";

const StarIcon:FC<IconProps> = ({props}) => {
    return <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M6.81312 0L5.36466 4.4579H0.677353L4.46947 7.21303L3.02101 11.6709L6.81312 8.91579L10.6052 11.6709L9.15678 7.21303L12.9489 4.4579H8.26158L6.81312 0Z" fill="url(#paint0_linear_3093_54349)"/>
    <defs>
    <linearGradient id="paint0_linear_3093_54349" x1="6.81312" y1="0" x2="6.81312" y2="12.9031" gradientUnits="userSpaceOnUse">
    <stop stop-color="#FED65D"/>
    <stop offset="1" stop-color="#FBE35B"/>
    </linearGradient>
    </defs>
    </svg>
};

export default StarIcon;