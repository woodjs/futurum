import { Button, Container, Input } from '@/shared/ui'
import React from 'react'
import ScrollToTop from '@/shared/ui/scroll-to-top'
import { OrganizationCard } from '@/entities/organization'
import { getFakeBusinessData } from '@/entities/organization/lib/get-fake-business-data'
import MyOrganizationList from '@/widgets/my-organization-list/ui/my-organization-list'

const fakeCards = [
  {
    title: 'Бизнес',
    image: '/images/svg/Hand_drawn_businessman.svg',
    link: '/profile/organizations/create/business',
  },
  {
    title: 'Стартап',
    image: '/images/svg/light_bulbs_curly_lines.svg',
    link: '/profile/organizations/create/startup',
  },
  {
    title: 'Благотворительность',
    image: '/images/svg/Thin_Line_Calligraphy_Heart_2.svg',
    link: '/profile/organizations/create/charity',
  },
]
const businessDataList = new Array(10)
  .fill(0)
  .map((_, index) => getFakeBusinessData(index))

export default function Home() {
  return (
    <div className={'relative'}>
      <Container>
        <MyOrganizationList />
        {/* <FeatureSection />
        <CarouselHeader />
        <CarouselTop />
        <Exchange />
        <Stories />
        <CarouselProfit />
        <JoinUs />
        <CarouselDigital />
        <CommunitySection />
        <CarouselToday />
        <GameSection /> */}
      </Container>
      <ScrollToTop />
    </div>
  )
}
