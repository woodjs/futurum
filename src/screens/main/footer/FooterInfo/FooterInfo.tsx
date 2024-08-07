import Link from "next/link";
import {Typography} from "@/shared/ui";

const FooterInfo = () => {
    return <div className={'flex flex-col items-center md:items-start'}>
        <Link href={'#'}><Typography content={'Юридическая информация'} className={'text-white font-semibold mb-[15px]'}/></Link>
        <Link href={'#'}><Typography content={'Roadmap'} className={'text-white font-semibold text-opacity-50 mb-[5px]'}/></Link>
        <Link href={'#'}><Typography content={'White paper'} className={'text-white font-semibold text-opacity-50 mb-[5px]'}/></Link>
        <Link href={'#'}><Typography content={'Пользовательское соглашение'} className={'text-white font-semibold text-opacity-50 mb-[5px]'}/></Link>
        <Link href={'#'}><Typography content={'Политика конфиденциальности'} className={'text-white font-semibold text-opacity-50 mb-[5px]'}/></Link>
        <Link href={'#'}><Typography content={'Публичная оферта'} className={'text-white font-semibold text-opacity-50 mb-[5px]'}/></Link>
        <Link href={'#'}><Typography content={'Контактная информация'} className={'text-white font-semibold mt-[27px]'}/></Link>
    </div>
};

export default FooterInfo;