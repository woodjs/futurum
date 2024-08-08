'use client';
import React, { useLayoutEffect, useState } from 'react';
import ArrowTopIcon from "@/shared/icons/ArrowTopIcon";
import {cn} from "@/shared/lib/utils";

const ScrollToTop = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const [visibleFooterHeight, setVisibleFooterHeight] = useState(0);
    const [scrollPosition, setScrollPosition] = useState(0);

    const updateVisibleFooterHeight = () => {
        const footerElement = document.getElementById('footer');
        if (footerElement) {
            const { top, bottom } = footerElement.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const visibleHeight = Math.max(
                0,
                Math.min(bottom, windowHeight) - Math.max(top, 0)
            );
            setVisibleFooterHeight(visibleHeight);
        }
    };

    useLayoutEffect(() => {
        updateVisibleFooterHeight();
        const handleScroll = (e) => {
            setScrollPosition(window.pageYOffset)
            updateVisibleFooterHeight();
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (

            <div
                className={cn('w-[96px] h-[96px] bg-gray rounded-[50%] justify-center items-center right-[44px] left-auto fixed', scrollPosition ? 'flex' : 'hidden')}
                style={{ bottom: `${40 + visibleFooterHeight}px` }}
                onClick={scrollToTop}
            >
                <ArrowTopIcon />
            </div>
    );
};

export default ScrollToTop;
