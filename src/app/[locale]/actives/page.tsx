'use client'
import React from 'react'

import { Button, Container, GradientTypography } from '@/shared/ui'
import { useRouter } from '@/i18n/routing'
import { Routes } from '@/shared/model/routes'
import { Sidebar } from '@/widgets/sidebar'
import ActivesList from '@/widgets/active-list/ui/actives-list'
import { useGetActivesList } from '@/entities/actives/api/hooks/use-get-actives-list'
import { getActivesList } from '@/entities/actives/api/services'

export default function MyActivesPage() {
    const { push } = useRouter()
    const { data: activelist, isLoading, isSuccess, refetch } = useGetActivesList({});

    const handleButtonClick = () => push(Routes.CREATE_ASSET)

    return (
        <>
            <div className='hidden xl:block'>
                <Sidebar />
            </div>
            <div className='w-full'>
                <div className={'relative'}>
                    <Container>
                        <div className='flex flex-col gap-6'>
                            <GradientTypography>Мои активы</GradientTypography>
                            <Button onClick={handleButtonClick} className='max-w-40' size='sm'>
                                Создать актив
                            </Button>
                        </div>
                        <div className="flex border-b-[2px] border-gray-300 mt-[32px] mb-[32px]">
                            <div className="flex gap-[42px] mx-auto">
                                <a href="#" className="relative pb-2 text-[#046EB5E5] font-semibold text-[24px]">
                                Все
                                    <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 text-[8px] bg-[#046EB5E5] text-white rounded-full px-[2px]">{activelist?.data.length}</span>
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#046EB5E5]"></span>
                                </a>
                                <a href="#" className="relative pb-2 text-[#A0AEC0E5] font-semibold hover:text-[#046EB5E5] text-[24px]">
                                Активные
                                    <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 text-[8px] bg-gray-300 text-white rounded-full px-[2px] bg-[#A0AEC0E5]">0</span>
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-transparent group-hover:bg-[#046EB5E5]"></span>
                                </a>
                                <a href="#" className="relative pb-2 text-[#A0AEC0E5] font-semibold hover:text-[#046EB5E5] text-[24px]">
                                На модерации
                                    <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 text-[8px] bg-gray-300 text-white rounded-full px-[2px] bg-[#A0AEC0E5]">0</span>
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-transparent group-hover:bg-[#046EB5E5]"></span>
                                </a>
                                <a href="#" className="relative pb-2 text-[#A0AEC0E5] font-semibold hover:text-[#046EB5E5] text-[24px]">
                                Черновик
                                    <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 text-[8px] bg-gray-300 text-white rounded-full px-[2px] bg-[#A0AEC0E5]">0</span>
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-transparent group-hover:bg-[#046EB5E5]"></span>
                                </a>
                                <a href="#" className="relative pb-2 text-[#A0AEC0E5] font-semibold hover:text-[#046EB5E5] text-[24px]">
                                Архив
                                    <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 text-[8px] bg-gray-300 text-white rounded-full px-[2px] bg-[#A0AEC0E5]">0</span>
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-transparent group-hover:bg-[#046EB5E5]"></span>
                                </a>
                                <a href="#" className="relative pb-2 text-[#A0AEC0E5] font-semibold hover:text-[#046EB5E5] text-[24px]">
                                Коллекции
                                    <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 text-[8px] bg-gray-300 text-white rounded-full px-[2px] bg-[#A0AEC0E5]">0</span>
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-transparent group-hover:bg-[#046EB5E5]"></span>
                                </a>
                            </div>
                        </div>

                        <ActivesList activelist={activelist} isSuccess={isSuccess} onDelete={refetch} />
                    </Container>
                </div>
            </div>
        </>

    )
}

