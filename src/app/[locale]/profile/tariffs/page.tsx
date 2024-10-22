import { Container } from '@/shared/ui'
import ScrollToTop from '@/shared/ui/scroll-to-top'
import { Tariffs } from '@/widgets/tariffs2'

export default function Page() {
  return (
    <div className={'relative'}>
      <Container>
        {/* <Tariffs /> */}
        <Tariffs />
        <div></div>
      </Container>
      <ScrollToTop />
    </div>
  )
}
