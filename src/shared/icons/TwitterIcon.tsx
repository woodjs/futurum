import {IconProps} from "@/shared/icons/type";
import config from "../../../tailwind.config";
import {FC} from "react";

interface IProps extends IconProps {
    mainColor?: string;
    bgColor?: string;
}

const TwitterIcon:FC<IProps> = ({mainColor = config.theme.extend.colors.primary.DEFAULT, bgColor = config.theme.extend.colors.white, props}) => {
    return <svg width="34" height="33" viewBox="0 0 34 33" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <g clipPath="url(#clip0_202_1756)">
            <path
                d="M17 0C12.6249 0 8.42516 1.73946 5.33398 4.8327C2.23962 7.92716 0.500857 12.1238 0.5 16.5C0.5 20.8743 2.24023 25.0741 5.33398 28.1673C8.42516 31.2605 12.6249 33 17 33C21.3751 33 25.5748 31.2605 28.666 28.1673C31.7598 25.0741 33.5 20.8743 33.5 16.5C33.5 12.1257 31.7598 7.92593 28.666 4.8327C25.5748 1.73946 21.3751 0 17 0Z"
                fill={bgColor}/>
            <path
                d="M28.0007 9.67691C27.1739 10.0356 26.2995 10.2727 25.4047 10.3809C26.3487 9.81696 27.0561 8.92977 27.3957 7.88391C26.5086 8.41198 25.5376 8.78404 24.5247 8.98391C23.8477 8.24974 22.9462 7.76104 21.9615 7.59445C20.9768 7.42786 19.9647 7.5928 19.0839 8.06342C18.2031 8.53403 17.5034 9.28369 17.0945 10.1948C16.6856 11.106 16.5908 12.127 16.8247 13.0979C15.0311 13.0072 13.2766 12.5402 11.6753 11.7272C10.0739 10.9142 8.66146 9.77337 7.52973 8.37891C7.13278 9.0721 6.9242 9.85711 6.92473 10.6559C6.92332 11.3977 7.10537 12.1284 7.45466 12.7828C7.80395 13.4373 8.30965 13.9952 8.92673 14.4069C8.20951 14.3874 7.50761 14.1949 6.88073 13.8459V13.9009C6.88611 14.9403 7.25033 15.9459 7.91178 16.7477C8.57323 17.5494 9.49131 18.0981 10.5107 18.3009C10.1183 18.4203 9.71089 18.4833 9.30073 18.4879C9.01681 18.4846 8.7336 18.4588 8.45373 18.4109C8.74403 19.305 9.30582 20.0864 10.0609 20.6463C10.816 21.2062 11.7269 21.5168 12.6667 21.5349C11.0797 22.7837 9.1202 23.4653 7.10073 23.4709C6.73304 23.4721 6.36564 23.4501 6.00073 23.4049C8.0626 24.7362 10.4654 25.4429 12.9197 25.4399C14.6134 25.4575 16.2936 25.1374 17.8622 24.4984C19.4307 23.8594 20.8563 22.9142 22.0555 21.7181C23.2547 20.5219 24.2035 19.0988 24.8465 17.5319C25.4896 15.965 25.814 14.2856 25.8007 12.5919C25.8007 12.4049 25.8007 12.2069 25.8007 12.0089C26.6639 11.3652 27.4084 10.5761 28.0007 9.67691Z"
                fill={mainColor}/>
            <g clipPath="url(#clip1_202_1756)">
                <path
                    d="M17 -0.000976562C12.6249 -0.000976562 8.42516 1.73848 5.33398 4.83172C2.23962 7.92618 0.500857 12.1229 0.5 16.499C0.5 20.8733 2.24023 25.0731 5.33398 28.1663C8.42516 31.2596 12.6249 32.999 17 32.999C21.3751 32.999 25.5748 31.2596 28.666 28.1663C31.7598 25.0731 33.5 20.8733 33.5 16.499C33.5 12.1247 31.7598 7.92495 28.666 4.83172C25.5748 1.73848 21.3751 -0.000976562 17 -0.000976562Z"
                    fill={bgColor}/>
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M14.2018 8.79354C14.0442 8.56433 13.8382 8.26476 13.6387 7.97744L13.0237 7.08345L10.3107 7.0763C8.14368 7.07153 7.60014 7.0763 7.60968 7.10014C7.61444 7.11683 8.11269 7.84394 8.71107 8.71647C9.3247 9.608 9.82023 10.328 10.2184 10.9067C11.2482 12.4029 11.6272 12.9536 11.7149 13.0791C11.7475 13.1253 11.9174 13.3725 12.1689 13.7385C12.4499 14.1475 12.833 14.7049 13.2406 15.2962C14.0106 16.4167 14.6734 17.3798 14.7139 17.4346L14.7854 17.5347L14.3563 18.0306C14.2808 18.1185 14.1716 18.2457 14.0433 18.3952C13.7749 18.708 13.4231 19.1181 13.1214 19.4681C12.7996 19.8425 12.4734 20.2223 12.1393 20.6113C11.5946 21.2455 11.0289 21.9041 10.4275 22.603C10.2954 22.7572 10.0864 23.0008 9.84395 23.2834C9.50881 23.6741 9.10969 24.1393 8.76113 24.546C8.15799 25.2469 7.64544 25.8452 7.61921 25.8762L7.57153 25.9287H9.14733L9.7767 25.1944C10.1248 24.7915 10.7446 24.0716 11.1546 23.5924C12.8615 21.6089 13.3884 20.9963 14.3706 19.8496L14.4086 19.8054C14.9616 19.1621 15.4225 18.6261 15.4458 18.6028C15.4839 18.5598 15.5054 18.5861 15.9345 19.2107C16.194 19.5855 17.3376 21.2473 18.2891 22.6299C18.911 23.5336 19.4508 24.318 19.6082 24.546C19.6793 24.6519 19.8251 24.8634 19.9778 25.085C20.0451 25.1826 20.1137 25.2822 20.1779 25.3756L20.557 25.9287H23.2699C24.7623 25.9287 25.9829 25.9239 25.9829 25.9191C25.9829 25.9144 25.8375 25.6998 25.661 25.4423C24.5056 23.7658 23.1465 21.7907 21.9177 20.005C21.1791 18.9316 20.4876 17.9267 19.9157 17.0961C19.4635 16.4364 19.0401 15.8222 18.8075 15.4847C18.7114 15.3454 18.6479 15.2533 18.6284 15.2247L18.502 15.0459L18.7809 14.7217C18.9335 14.5429 19.4437 13.9493 19.9157 13.401C20.3604 12.8832 20.8102 12.3599 21.2924 11.7989C21.8492 11.151 22.4492 10.453 23.134 9.65575C23.6061 9.10744 24.2283 8.38271 24.5144 8.04896L24.5456 8.01282C24.8244 7.69028 25.1086 7.36141 25.189 7.27179C25.2725 7.17643 25.3392 7.09299 25.3392 7.08584C25.3392 7.07869 24.9888 7.07153 24.5597 7.07153H23.7777L23.3724 7.54117C23.2694 7.66194 23.016 7.95625 22.6842 8.34153C22.3022 8.78523 21.8163 9.34957 21.3365 9.90845C20.9135 10.4002 20.4325 10.9598 19.9879 11.4772C19.4905 12.056 19.0387 12.5818 18.7642 12.9003C18.2469 13.5035 17.813 13.9969 17.8035 13.9969C17.7844 13.9969 17.6867 13.8587 15.9869 11.3865C15.8051 11.1226 15.6276 10.8648 15.4666 10.631C15.1041 10.1045 14.8256 9.69996 14.7711 9.62237C14.7321 9.56515 14.6745 9.48119 14.6138 9.39272C14.5557 9.30796 14.4947 9.21907 14.4445 9.14558C14.401 9.08326 14.3135 8.95609 14.2018 8.79354ZM10.961 9.80262C10.4914 9.11925 10.072 8.50905 10.0127 8.42324L9.93642 8.31119L11.157 8.31596L12.3776 8.32311L13.3789 9.77733C13.9296 10.576 15.1478 12.3472 16.0847 13.7109L16.3535 14.1011C17.1829 15.3052 17.8954 16.3395 17.9966 16.4882C18.111 16.6527 18.7261 17.5467 19.3674 18.4788C20.0087 19.4085 20.8049 20.5671 21.1387 21.0535C23.0125 23.7736 23.6228 24.6628 23.6228 24.6747C23.6228 24.6819 23.0792 24.689 22.4141 24.689H21.203L20.9313 24.2885C20.7811 24.0692 20.1636 23.1704 19.5581 22.2931C18.9526 21.4135 17.8202 19.7685 17.0382 18.6338C16.2587 17.499 15.2884 16.0877 14.8808 15.4988C14.4755 14.9076 13.8008 13.9278 13.3789 13.3175C12.9593 12.7072 12.3919 11.8824 12.1154 11.4819C11.836 11.0757 11.3786 10.4102 10.961 9.80262Z"
                      fill={mainColor}/>
            </g>
        </g>
        <defs>
            <clipPath id="clip0_202_1756">
                <rect width="33" height="33" fill={bgColor} transform="translate(0.5)"/>
            </clipPath>
            <clipPath id="clip1_202_1756">
                <rect width="33" height="33" fill={bgColor} transform="translate(0.5)"/>
            </clipPath>
        </defs>
    </svg>

};

export default TwitterIcon;