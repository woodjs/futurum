import CarouselHeader from '@/screens/main/header/Carousel'
import FeatureSection from '@/screens/main/header/FeatureSection'
import IconLabelBadge from '@/screens/main/header/IconLabelBadge'
import { useTranslations } from 'next-intl'
import Menu from '@/screens/main/header/Menu'
import { Link } from '@/i18n/routing'
import { Button, Container, Input } from '@/shared/ui'
import { Heart, Search, ShoppingCart, UserRound } from 'lucide-react'
import Footer from '@/screens/main/footer'
import GameSection from '@/screens/main/game-section'
import React from 'react'
import CommunitySection from '@/screens/main/community-section'
import Exchange from '@/screens/main/exchange'
import Stories from '@/screens/main/stories'
import JoinUs from '@/screens/main/join'
import CarouselToday from '@/screens/main/carousel-today'
import CarouselDigital from '@/screens/main/carousel-digital'
import CarouselTop from '@/screens/main/carousel-top'
import CarouselProfit from '@/screens/main/carousel-profit'
import ScrollToTop from '@/shared/ui/scroll-to-top'
import { Sidebar } from '@/widgets/sidebar'
import Editor from '@/shared/ui/editor'
import { LogoFull } from '@/shared/ui/logo'
import { CreateBusinessForm } from '@/features/create-organization'

export default function Home() {
  return (
    <div className={'relative'}>
      <Container>
        123
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
