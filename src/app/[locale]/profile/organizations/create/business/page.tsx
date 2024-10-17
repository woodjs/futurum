import { Container } from '@/shared/ui'
import React from 'react'
import ScrollToTop from '@/shared/ui/scroll-to-top'
import { CreateBusinessForm } from '@/features/create-organization'

export default function Home() {
  return (
    <div className={'relative'}>
      <Container>
        <CreateBusinessForm />
      </Container>
      <ScrollToTop />
    </div>
  )
}
