import {FC} from "react";
import {IconProps} from "@/shared/icons/type";

const ShareIcon:FC<IconProps> = ({props}) => {
    return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M3 6C3 4.34315 4.34315 3 6 3H7C7.55228 3 8 3.44772 8 4C8 4.55228 7.55228 5 7 5H6C5.44772 5 5 5.44772 5 6V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V17C19 16.4477 19.4477 16 20 16C20.5523 16 21 16.4477 21 17V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V6Z" fill="#A0AEC0" fill-opacity="0.9"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.0002 5C12.4479 5 12.0002 4.55228 12.0002 4C12.0002 3.44772 12.4479 3 13.0002 3H20.0712C20.6235 3 21.0712 3.44772 21.0712 4L21.0712 11.0711C21.0712 11.6234 20.6235 12.0711 20.0712 12.0711C19.5189 12.0711 19.0712 11.6234 19.0712 11.0711L19.0712 6.34315L11.7071 13.7073C11.3166 14.0978 10.6834 14.0978 10.2929 13.7073C9.90237 13.3167 9.90237 12.6836 10.2929 12.293L17.5859 5H13.0002Z" fill="#A0AEC0" fill-opacity="0.9"/>
    </svg>
};

export default ShareIcon;