import {FC} from "react";
import {IconProps} from "@/shared/icons/type";

const MainMenuIcon:FC<IconProps> = ({props}) => {
    return <svg width="4" height="18" viewBox="0 0 4 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="2" cy="2" r="2" fill="#A0AEC0" fill-opacity="0.9"/>
    <circle cx="2" cy="9" r="2" fill="#A0AEC0" fill-opacity="0.9"/>
    <circle cx="2" cy="16" r="2" fill="#A0AEC0" fill-opacity="0.9"/>
    </svg>
};

export default MainMenuIcon;