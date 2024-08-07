import {GradientTypography, Typography} from "@/shared/ui";
import CommunityCart from "@/shared/ui/community-cart";
import TelegramGradient from "@/shared/icons/TelegramGradient";
import DiscordGradient from "@/shared/icons/DiscordGradient";
import TwitterGradient from "@/shared/icons/TwitterGradient";

const CommunitySection = () => {
    return <div className={'my-[64px]'}>
        <div className={'flex flex-col mb-[24px] lg:flex-row'}>
            <Typography content={'Стань частью'} variant={'h2'}
                        className={'text-black mr-2.5 text-center lg:text-left'}/>
            <GradientTypography content={'комьюнити'} variant={'h2'} className={'text-center lg:text-left'}/>
            <Typography content={'Futurum'} variant={'h2'} className={'text-black ml-2.5 text-center lg:text-left'}/>
        </div>
        <div className={'flex-col flex gap-[16px] xl:gap-[24px] xl:flex-row 2xl:gap-[32px]'}>
            <CommunityCart>
                <div className={'flex items-center gap-2'}>
                    <TelegramGradient/>
                    <Typography content={'Telegram'} className={'text-black font-bold text-[20px]'}/>
                </div>
            </CommunityCart>
            <CommunityCart>
                <div className={'flex items-center gap-2'}>
                    <TwitterGradient/>
                    <Typography content={'Twitter'} className={'text-black font-bold text-[20px]'}/>
                </div>
            </CommunityCart>
            <CommunityCart>
                <div className={'flex items-center gap-2'}>
                    <DiscordGradient/>
                    <Typography content={'Discord'} className={'text-black font-bold text-[20px]'}/>
                </div>
            </CommunityCart>
        </div>
    </div>
};

export default CommunitySection;