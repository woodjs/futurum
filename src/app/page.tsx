import CarouselHeader from '@/screens/main/header/Carousel';
import FeatureSection from '@/screens/main/header/FeatureSection';
import IconLabelBadge from '@/screens/main/header/IconLabelBadge';
import Menu from '@/screens/main/header/Menu';
import {Button, Container, Input} from '@/shared/ui';
import {Heart, Search, ShoppingCart, UserRound} from 'lucide-react';
import Footer from "@/screens/main/footer";
import GameSection from "@/screens/main/game-section";
import Nftcard from "@/shared/ui/nftcard";
import NftInnerContent from "@/shared/ui/nft-inner-content";
import NftcardHeader from "@/shared/ui/nftcard-header";
import React from "react";
import NftFooter from "@/shared/ui/nft-footer";
import {landingImages} from "@/shared/images";
import NftImage from "@/shared/ui/nft-image";
import CommunitySection from "@/screens/main/community-section";

export default function Home() {
    return (
        <>
            <Menu/>
            <Container className="mt-[24px]">
                <div className="flex items-center w-full gap-[28px]">
                    <div className="logo">
                        <svg
                            width="148"
                            height="34"
                            viewBox="0 0 148 34"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g clipPath="url(#clip0_100_918)">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M18.747 12.4606C20.9224 12.3106 23.9272 10.6899 25.2275 8.8419C26.9832 6.34645 27.1125 4.05509 26.9459 0.500732C25.9126 1.00843 24.0749 3.42891 19.5278 3.45529L-0.000488281 3.49047L0.0330987 12.537C1.44145 12.7073 18.3909 12.6166 18.7466 12.4606H18.747ZM17.9741 14.1336C17.8163 13.9184 18.1199 13.9643 17.467 13.949L0.00043191 13.9929L0.0174554 23.0098C0.943168 23.1547 9.54972 23.0723 10.0411 22.889C12.1387 22.6178 14.8979 21.0017 15.6579 20.0682C16.3232 19.2514 16.7856 18.6571 17.289 17.4746C17.716 16.4717 17.9722 15.3254 17.9741 14.1336ZM0.85943 29.2887C0.962492 31.6944 3.0435 33.5896 5.56299 33.4966C7.96699 33.4077 9.9707 31.3126 9.82623 28.7556C9.68775 26.3087 7.63434 24.2932 5.03986 24.4755C2.59675 24.6472 0.747627 26.6665 0.859891 29.2883L0.85943 29.2887Z"
                                    fill="#046EB5"
                                />
                            </g>
                            <path
                                d="M42.904 21.052H37.504V26.5C36.064 26.5 34.6 26.5 33.136 26.5V9.7C36.568 9.7 40.168 9.7 43.6 9.7C43.6 11.116 43.6 12.1 43.6 13.54H37.504V17.212H42.904C42.904 18.652 42.904 19.564 42.904 21.052ZM53.4213 22.876C54.6693 22.876 55.9653 22.204 55.9653 20.836V9.7C57.3333 9.7 58.7253 9.7 60.0693 9.7V20.908C60.0693 24.604 56.8773 26.74 53.4213 26.74C49.9893 26.74 46.7493 24.604 46.7493 20.908V9.7C48.0933 9.7 49.5093 9.7 50.8533 9.7V20.836C50.8533 22.204 52.1733 22.876 53.4213 22.876ZM66.7096 13.54H62.5816C62.5816 12.244 62.5816 10.972 62.5816 9.7H75.0616C75.0616 10.972 75.0616 12.244 75.0616 13.54H70.9576V26.5C69.5416 26.5 68.1256 26.5 66.7096 26.5V13.54ZM84.2181 22.876C85.4661 22.876 86.7621 22.204 86.7621 20.836V9.7C88.1301 9.7 89.5221 9.7 90.8661 9.7V20.908C90.8661 24.604 87.6741 26.74 84.2181 26.74C80.7861 26.74 77.5461 24.604 77.5461 20.908V9.7C78.8901 9.7 80.3061 9.7 81.6501 9.7V20.836C81.6501 22.204 82.9701 22.876 84.2181 22.876ZM105.93 20.548L109.218 25.876V26.5H104.418L101.538 21.556H99.3064V26.5C97.8664 26.5 96.4024 26.5 95.0104 26.5C95.0104 20.908 95.0104 15.316 95.0104 9.7C97.4344 9.7 99.9304 9.7 102.378 9.7C108.978 9.724 110.178 17.668 105.93 20.548ZM102.378 17.74C104.706 17.74 104.826 13.564 102.378 13.54C101.37 13.516 100.314 13.54 99.3064 13.54C99.3064 14.908 99.3064 16.396 99.3064 17.74H102.378ZM118.32 22.876C119.568 22.876 120.864 22.204 120.864 20.836V9.7C122.232 9.7 123.624 9.7 124.968 9.7V20.908C124.968 24.604 121.776 26.74 118.32 26.74C114.888 26.74 111.648 24.604 111.648 20.908V9.7C112.992 9.7 114.408 9.7 115.752 9.7V20.836C115.752 22.204 117.072 22.876 118.32 22.876ZM137.272 16.948L143.968 9.652H145.504V26.5C144.04 26.5 142.576 26.5 141.112 26.5V19.012L137.536 22.756H137.056L133.504 19.012V26.5C132.04 26.5 130.576 26.5 129.112 26.5V9.652H130.696L137.272 16.948Z"
                                fill="#2D3748"
                            />
                            <defs>
                                <clipPath id="clip0_100_918">
                                    <rect
                                        width="27"
                                        height="33"
                                        fill="white"
                                        transform="translate(0 0.5)"
                                    />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    <Button size="lg">Регистрация</Button>
                    {/* <div className="bg-gray-light px-[26px] py-[13px] rounded-full"> */}

                    <Input
                        placeholder="Поиск по названию..."
                        leftSection={<Search/>}
                        className="flex-1"
                    />
                    {/* </div> */}
                    <div className="flex items-center gap-[26px]">
                        <IconLabelBadge
                            icon={<UserRound width={25} height={25}/>}
                            label="Войти"
                        />
                        <IconLabelBadge
                            icon={<Heart width={25} height={25}/>}
                            label="Избранное"
                            badgeCount={1}
                        />
                        <IconLabelBadge
                            icon={<ShoppingCart width={25} height={25}/>}
                            label="Корзина"
                            badgeCount={2}
                        />
                    </div>
                </div>

                <div className="my-[64px]">
                    <FeatureSection/>
                </div>
                <CommunitySection />
                <div className={'flex gap-1'}>
                    <Nftcard
                        Content={<NftInnerContent content={[{title: 'Цель', value: '3 000 USDT'}, {title: 'Собрано', value: '13%'}]}/>}
                        Header={<NftcardHeader content={'#digital'} />}
                        Footer={<NftFooter price={'От 1 USDT'} />}
                        Image={<NftImage imageSrc={landingImages.nftdog} />}
                    />
                    <Nftcard
                        height={'h-[418px]'}
                        Header={<NftcardHeader content={'#digital'} bgColor={'bg-primary'} textColor={'text-white'}/>}
                        Image={<NftImage imageSrc={landingImages.nft2} />}
                        Footer={<NftFooter
                            borderColor={'border-primary'}
                            price={'700 USDT'}
                            priceColor={'text-white'}
                            bgColor={'bg-primary'}
                            height={'h-[149px]'}
                            description={'Чат-бот «Виртуальный Гений» — умный и дружелюбный ассистент для быстрого поиска информации и решения повседневных задач.'}
                        />}
                    />
                </div>
                <CarouselHeader/>
                <GameSection/>
            </Container>
            <Footer/>
        </>
    );
}
