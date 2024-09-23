import { Container } from '@/shared/ui'
import ScrollToTop from '@/shared/ui/scroll-to-top'
import Tariffs from '@/widgets/tariffs/ui/tariffs'

export default function Page() {
  return (
    <div className={'relative'}>
      <Container>
        <Tariffs />
      </Container>
      <ScrollToTop />
    </div>
  )
}
