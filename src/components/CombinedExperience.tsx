'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import CinematicSceneShowcase from './pages/variant-2/cinematic-scene-showcase';
import { CylinderCarousel } from './pages/variant-1/cylinder-carousel';
import HorizontalGallery from './pages/variant-3/HorizontalComponent.tsx';
import SkillsShowcase from './pages/variant-4/skills.tsx';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

export function CombinedExperience() {
    const smoothWrapperRef = useRef<HTMLDivElement>(null);
    const smoothContentRef = useRef<HTMLDivElement>(null);
    const v3ContainerRef = useRef<HTMLDivElement>(null);
    const v4ContainerRef = useRef<HTMLDivElement>(null);
    const v2ContainerRef = useRef<HTMLDivElement>(null);
    const v1ContainerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!smoothWrapperRef.current || !smoothContentRef.current) return;

        const smoother = ScrollSmoother.create({
            wrapper: smoothWrapperRef.current,
            content: smoothContentRef.current,
            smooth: 4,
            effects: false,
            smoothTouch: 0.1, // or 2, balancing from both configs
        });

        return () => {
            smoother.kill();
        };
    }, []);

    return (
        <>
            <CinematicSceneShowcase containerRef={v3ContainerRef} />

            <SkillsShowcase containerRef={v4ContainerRef} triggerAfterRef={v3ContainerRef} />

            <HorizontalGallery containerRef={v2ContainerRef} triggerAfterRef={v4ContainerRef} />

            <CylinderCarousel containerRef={v1ContainerRef} />

            <div ref={smoothWrapperRef} id="smooth-wrapper" className="relative z-20">
                <div ref={smoothContentRef} id="smooth-content">
                    {/* Variant 3 Scroll Area: 900vh */}
                    <div ref={v3ContainerRef} style={{ height: '900vh', width: '100%' }} />

                    {/* Variant 4 Scroll Area: 320vh */}
                    <div ref={v4ContainerRef} style={{ height: '320vh', width: '100%' }} />

                    {/* Variant 2 Scroll Area: 400vh */}
                    <div ref={v2ContainerRef} style={{ height: '400vh', width: '100%' }} />

                    {/* Variant 1 Scroll Area: 500vh */}
                    <div ref={v1ContainerRef} style={{ height: '500vh', width: '100%' }} />
                </div>
            </div>
        </>
    );
}
