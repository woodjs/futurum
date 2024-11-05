'use client'
import { Button, Container, GradientTypography } from '@/shared/ui'
import { useRouter } from '@/i18n/routing'
import { Routes } from '@/shared/model/routes'
import ScrollToTop from '@/shared/ui/scroll-to-top'
import { StatusFilter } from '@/features/actives-filter/ui/status-filter'
import { ActiveCard } from '@/widgets/active-list'


const ActivePage = ({ params }: { params: { uuid: string } }) => {
  console.log(params)
  return (
    <div className={'relative'}>
    <Container>
      <div className='flex flex-col gap-6'>
        
        <ActiveCard id={params.uuid}/>
      </div>
    </Container>
    <ScrollToTop />
  </div>
    
  )
}

export default ActivePage
