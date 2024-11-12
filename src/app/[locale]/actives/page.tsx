'use client'
import React from 'react'

import { Button, Container, GradientTypography } from '@/shared/ui'
import { useRouter } from '@/i18n/routing'
import { Routes } from '@/shared/model/routes'
import { Sidebar } from '@/widgets/sidebar'
import ActivesList from '@/widgets/active-list/ui/actives-list'

export default function MyActivesPage() {
    const { push } = useRouter()

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
                        <ActivesList />
                    </Container>
                </div>
            </div>
        </>

    )
}

