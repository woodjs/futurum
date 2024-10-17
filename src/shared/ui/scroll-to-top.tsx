'use client'
import React, { useLayoutEffect, useState } from 'react'
import ArrowTopIcon from '@/shared/icons/ArrowTopIcon'
import { cn } from '@/shared/lib/utils'

const ScrollToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const [visibleFooterHeight, setVisibleFooterHeight] = useState(0)
  const [scrollPosition, setScrollPosition] = useState(0)

  const updateVisibleFooterHeight = () => {
    const footerElement = document.getElementById('footer')
    if (footerElement) {
      const { top, bottom } = footerElement.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const visibleHeight = Math.max(
        0,
        Math.min(bottom, windowHeight) - Math.max(top, 0),
      )
      setVisibleFooterHeight(visibleHeight)
    }
  }

  useLayoutEffect(() => {
    updateVisibleFooterHeight()
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset)
      updateVisibleFooterHeight()
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <button
      className={cn(
        `sticky left-[calc(100vw-140px)] hidden items-center justify-center rounded-[50%]
        bg-gray duration-200 lg:flex lg:h-[96px] lg:w-[96px]`,
        scrollPosition ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
      style={{ bottom: `${40}px` }}
      onClick={scrollToTop}
    >
      <ArrowTopIcon />
    </button>
  )
}

export default ScrollToTop
