import {FC} from "react";
import {IconProps} from "@/shared/icons/type";

const ArrowIcon:FC<IconProps> = ({props}) => {
    return <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clip-path="url(#clip0_3093_54041)">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M24.2246 12.7695C24.2246 12.2172 23.7769 11.7695 23.2246 11.7695H9.22461C8.67232 11.7695 8.22461 12.2172 8.22461 12.7695C8.22461 13.3218 8.67232 13.7695 9.22461 13.7695H23.2246C23.7769 13.7695 24.2246 13.3218 24.2246 12.7695Z" fill="#2D3748"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.5175 5.06242C15.127 5.45295 15.127 6.08611 15.5175 6.47664L21.8104 12.7695L15.5175 19.0624C15.127 19.4529 15.127 20.0861 15.5175 20.4766C15.908 20.8672 16.5412 20.8672 16.9317 20.4766L23.9317 13.4766C24.3222 13.0861 24.3222 12.4529 23.9317 12.0624L16.9317 5.06242C16.5412 4.6719 15.908 4.6719 15.5175 5.06242Z" fill="#2D3748"/>
    </g>
    <defs>
    <clipPath id="clip0_3093_54041">
    <rect width="24" height="24" fill="white" transform="matrix(-1 0 0 1 24.2246 0.769531)"/>
    </clipPath>
    </defs>
    </svg>
};

export default ArrowIcon;