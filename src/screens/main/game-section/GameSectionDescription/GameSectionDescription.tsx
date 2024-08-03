import {Button, GradientTypography, Typography} from "@/shared/ui";

const GameSectionDescription = () => {
    return <div className={'lg:w-[42%] w-full'}>
        <div className={'flex flex-col mb-[24px] lg:flex-row'}>
            <Typography content={'Играй и '} variant={'h2'} className={'text-black mr-2.5 text-center lg:text-left'}/>
            <GradientTypography content={'зарабатывай'} variant={'h2'} className={'text-center lg:text-left'}/>
        </div>
        <Typography content={'Ты готов к приключению, которое откроет перед тобой \n' +
            'двери в мир больших возможностей и успеха? Играя, ты не только проводишь время с интересом, \n' +
            'обучаясь основам криптоиндустрии и финансового мира,\n' +
            'но и зарабатываешь реальные деньги, которые сможешь потратить по своему усмотрению!'} variant={'p-large'} className={'text-black text-center lg:text-left'}/>
        <Typography content={'Присоединяйся к нам сегодня'} variant={'subtitle-1'} className={'text-black mr-2.5 mt-[24px] text-center lg:text-left'}/>
        <GradientTypography content={'и стань лидером завтрашнего дня!'} variant={'subtitle-1'} className={'w-full text-center lg:text-left lg:w-auto'}/>
        <div className={'mt-[24px]'}>
            <Button variant={'outline'} className={'w-full lg:w-[150px] mr-[24px]'}>Подробнее</Button>
            <Button className={'w-full lg:w-[150px] mt-[24px] mb-[24px] lg:mt-0 lg:mb-0'}>Играть</Button>
        </div>
    </div>
};

export default GameSectionDescription;