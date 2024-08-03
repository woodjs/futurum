import {Typography} from "@/shared/ui";
import Link from "next/link";

const FooterCategories = () => {
    return <div className={'flex flex-col'}>
        <Link href={'#'}><Typography content={'Категории'} className={'text-white font-semibold mb-[15px]'}/></Link>
        <Link href={'#'}><Typography content={'Купить NFT'} className={'text-white font-semibold text-opacity-50 mb-[5px]'}/></Link>
        <Link href={'#'}><Typography content={'Купить токен х100'} className={'text-white font-semibold text-opacity-50 mb-[5px]'}/></Link>
        <Link href={'#'}><Typography content={'Цифровая барахолка'} className={'text-white font-semibold text-opacity-50 mb-[5px]'}/></Link>
        <Link href={'#'}><Typography content={'Помощь животным'} className={'text-white font-semibold text-opacity-50 mb-[5px]'}/></Link>
        <Link href={'#'}><Typography content={'Помощь людям'} className={'text-white font-semibold text-opacity-50 mb-[5px]'}/></Link>
        <Link href={'#'}><Typography content={'Книги и музыка'} className={'text-white font-semibold text-opacity-50 mb-[5px]'}/></Link>
        <Link href={'#'}><Typography content={'Билеты на мероприятия'} className={'text-white font-semibold text-opacity-50 mb-[5px]'}/></Link>
        <Link href={'#'}><Typography content={'Обучающие курсы'} className={'text-white font-semibold text-opacity-50 mb-[5px]'}/></Link>
        <Link href={'#'}><Typography content={'Искусство в NFT'} className={'text-white font-semibold text-opacity-50 mb-[5px]'}/></Link>
        <Link href={'#'}><Typography content={'Реферальные программы'} className={'text-white font-semibold text-opacity-50 mb-[5px]'}/></Link>
    </div>
};

export default FooterCategories;