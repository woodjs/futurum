import Link from "next/link";
import {Typography} from "@/shared/ui";

const FooterAddress = () => {
    return <div className={'flex flex-col items-center md:items-start'}>
        <Link href={'#'}><Typography content={'Arch. Makarios Ave 41, Office 88'} className={'text-white font-semibold mb-[15px]'}/></Link>
        <Link href={'#'}><Typography content={'1061, Nicosia, Cyprus'} className={'text-white font-semibold text-opacity-50 mb-[5px]'}/></Link>
        <Link href={'#'}><Typography content={'2024 Futurum, LTD.'} className={'text-white font-semibold text-opacity-50 mb-[5px]'}/></Link>
    </div>
};

export default FooterAddress;