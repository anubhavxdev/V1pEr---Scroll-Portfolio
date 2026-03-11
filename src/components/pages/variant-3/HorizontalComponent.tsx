'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { images, perspectives, cylinderConfig, particleConfig, imageConfig } from '@/lib/variant-1/data';
import { CodropsFrame } from '@/components/codrops-frame';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface GalleryItem {
  titleTop: string;
  titleBottom: string;
  leftLabel: string;
  leftText: string;
  rightLabel: string;
  rightText: string;
  image: string;
  alt: string;
}

interface HorizontalGalleryProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
  triggerAfterRef?: React.RefObject<HTMLDivElement | null>;
}

const galleryItems: GalleryItem[] = [
  {
    titleTop: 'CONFIDENCE',
    titleBottom: 'CHARISMA',
    leftLabel: 'CHARM',
    leftText: 'Sharp wit and a warm smile with magnetic presence.',
    rightLabel: 'PRESENCE',
    rightText: 'A timeless blend of poise and presence, effortlessly charismatic.',
    image: 'https://moussamamadou.github.io/flip-plugin-horizontal-scroll/images/photo-9.jpg',
    alt: 'Photo 9',
  },
  {
    titleTop: 'WISDOM',
    titleBottom: 'INTELLECT',
    leftLabel: 'BRILLIANCE',
    leftText: 'Quick mind and deep thoughts guided by penetrating insight.',
    rightLabel: 'KNOWLEDGE',
    rightText: 'Thoughtful clarity and intuition in every word.',
    image: 'https://moussamamadou.github.io/flip-plugin-horizontal-scroll/images/photo-6.jpg',
    alt: 'Photo 6',
  },
  {
    titleTop: 'KINDNESS',
    titleBottom: 'GENEROSITY',
    leftLabel: 'GIVING',
    leftText: 'Open heart and helping hands with a benevolent force.',
    rightLabel: 'COMPASSION',
    rightText: 'A gentle spirit and warmth in every action.',
    image: 'https://moussamamadou.github.io/flip-plugin-horizontal-scroll/images/photo-8.jpg',
    alt: 'Photo 8',
  },
  {
    titleTop: 'CREATIVITY',
    titleBottom: 'ARTISTRY',
    leftLabel: 'EXPRESSION',
    leftText: 'Fluid style and bold vision with a creative soul.',
    rightLabel: 'INNOVATION',
    rightText: 'Originality and skill fused into inspiring creation.',
    image: 'https://moussamamadou.github.io/flip-plugin-horizontal-scroll/images/photo-12.jpg',
    alt: 'Photo 12',
  },
  {
    titleTop: 'LEADERSHIP',
    titleBottom: 'INFLUENCE',
    leftLabel: 'IMPACT',
    leftText: 'Strong presence and clear purpose that guide the path forward.',
    rightLabel: 'GUIDANCE',
    rightText: 'A powerful combination of vision and direction.',
    image: 'https://moussamamadou.github.io/flip-plugin-horizontal-scroll/images/photo-5.jpg',
    alt: 'Photo 5',
  },
  {
    titleTop: 'GRACE',
    titleBottom: 'ELEGANCE',
    leftLabel: 'SOPHISTICATION',
    leftText: 'Refined taste and smooth demeanor with natural elegance.',
    rightLabel: 'POLISH',
    rightText: 'Poise and dignity in every movement.',
    image: 'https://moussamamadou.github.io/flip-plugin-horizontal-scroll/images/photo-10.jpg',
    alt: 'Photo 10',
  },
  {
    titleTop: 'PASSION',
    titleBottom: 'INTENSITY',
    leftLabel: 'DRIVE',
    leftText: 'Fierce determination and endless energy.',
    rightLabel: 'ENTHUSIASM',
    rightText: 'Fire, focus, and dedication that motivates others.',
    image: 'https://moussamamadou.github.io/flip-plugin-horizontal-scroll/images/photo-4.jpg',
    alt: 'Photo 4',
  },
];

export default function HorizontalGallery({ containerRef, triggerAfterRef }: HorizontalGalleryProps) {
  const fallbackRef = useRef<HTMLDivElement>(null);
  const actualContainerRef = containerRef || fallbackRef;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalCardRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isAllowedByOrder, setIsAllowedByOrder] = useState(!triggerAfterRef);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activeItem = useMemo(() => {
    if (activeIndex === null) return null;
    return galleryItems[activeIndex];
  }, [activeIndex]);

  useEffect(() => {
    if (!actualContainerRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: actualContainerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onEnter: () => setIsVisible(true),
        onEnterBack: () => setIsVisible(true),
        onLeave: () => setIsVisible(false),
        onLeaveBack: () => setIsVisible(false),
      });

      if (triggerAfterRef?.current) {
        ScrollTrigger.create({
          trigger: triggerAfterRef.current,
          start: 'bottom top',
          onEnter: () => setIsAllowedByOrder(true),
          onLeaveBack: () => setIsAllowedByOrder(false),
        });
      }

      gsap.to(trackRef.current, {
        x: () => {
          if (!trackRef.current) return 0;
          return -(trackRef.current.scrollWidth - window.innerWidth);
        },
        ease: 'none',
        scrollTrigger: {
          trigger: actualContainerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [actualContainerRef, triggerAfterRef]);

  useEffect(() => {
    if (activeIndex === null || !overlayRef.current || !modalCardRef.current) return;

    const tl = gsap.timeline();
    tl.set(overlayRef.current, { pointerEvents: 'auto' })
      .fromTo(overlayRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.28, ease: 'power2.out' })
      .fromTo(
        modalCardRef.current,
        { y: 36, autoAlpha: 0, scale: 0.96 },
        { y: 0, autoAlpha: 1, scale: 1, duration: 0.34, ease: 'power3.out' },
        0.06
      );
  }, [activeIndex]);

  const closeOverlay = () => {
    if (!overlayRef.current || !modalCardRef.current) {
      setActiveIndex(null);
      return;
    }

    gsap.timeline({
      onComplete: () => {
        setActiveIndex(null);
      },
    })
      .to(modalCardRef.current, {
        y: 28,
        autoAlpha: 0,
        scale: 0.97,
        duration: 0.24,
        ease: 'power2.inOut',
      })
      .to(
        overlayRef.current,
        {
          autoAlpha: 0,
          duration: 0.2,
          ease: 'power2.inOut',
          onComplete: () => {
            if (overlayRef.current) {
              overlayRef.current.style.pointerEvents = 'none';
            }
          },
        },
        '-=0.14'
      );
  };

  const showLayer = isVisible && isAllowedByOrder;

  return (
    <div
      ref={sectionRef}
      style={{
        opacity: showLayer ? 1 : 0,
        pointerEvents: 'auto',
        transition: 'opacity 0.45s ease',
      }}
      className="fixed inset-0 z-20 text-white"
    >
        {/* <Loader isLoading={isLoading} className="bg-[#000]" classNameLoader="bg-[#fff]" /> */}
        
              {/* CodropsFrame removed mainly because we probably only want one frame in the top or we want both? 
                  The user said: "first variant 2 will come then as soon as variant 2 end it will start scrolling variant 1"
                  Probably want to remove this frame from here or keep it.
                  Let's keep it but maybe it will overlap. 
                  Actually, let's keep it. V2 frame will disappear when V2 disappears (since I wrapped V2 in a div that fades out).
                  V1 frame will appear when V1 appears.
              */}
              <CodropsFrame
                demoTitle="ANUBHAV.JSX // V1pEr"
                articleUrl="https://github.com/anubhavxdev"
                githubUrl="https://www.linkedin.com/in/anubhavxdev/"
                hubUrl="https://x.com/Anubhavjai68749"
                demos={[
                  { label: '{ DEV_MODE }', href: '#', current: true },
                  { label: '{ GAMER_ARC }', href: '#', current: false },
                ]}
                tags={['creative_dev', 'web3', 'immersion', 'future']}
                tagsLink={[
                  'https://greensock.com/gsap/',
                  'https://github.com/oframe/ogl',
                  'https://tympanus.net/codrops/hub/tag/webgl/',
                  'https://tympanus.net/codrops/hub/tag/scroll/',
                ]}
              />
        
              <div className="fixed inset-0 w-full h-screen z-0">
                <canvas ref={canvasRef} className="w-full h-full" style={{ display: 'block' }} />
              </div>

      <div className="absolute left-0 top-0 z-30 w-full px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 flex items-center justify-end">
        {/* <span className="text-xs tracking-[0.35em] text-white/60">V1PER</span> */}
        <span className="text-sm sm:text-xl md:text-2xl tracking-[0.25em] text-white/85">Projects</span>
      </div>

      <div className="absolute inset-0 bg-black" />

      <div className="absolute inset-0 overflow-hidden">
        <div ref={trackRef} className="h-full flex items-center gap-[8vw] px-[35vw] will-change-transform">
          {galleryItems.map((item, index) => (
            <button
              key={item.alt}
              onClick={() => setActiveIndex(index)}
              className="relative h-[clamp(180px,30vw,480px)] w-[clamp(180px,30vw,480px)] overflow-hidden rounded-sm border border-white/10 bg-black/40 flex-shrink-0"
              style={{
                transform: index % 2 === 0 ? 'translateY(18%)' : 'translateY(-18%)',
              }}
              aria-label={`Open ${item.alt}`}
            >
              <img src={item.image} alt={item.alt} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
            </button>
          ))}
        </div>
      </div>

      <div ref={overlayRef} className="absolute inset-0 z-40 bg-black/75 opacity-0 pointer-events-none">
        {activeItem && (
          <div className="h-full w-full flex items-center justify-center p-6" onClick={closeOverlay}>
            <div
              ref={modalCardRef}
              className="relative w-full max-w-[clamp(320px,90vw,1000px)] grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-3 sm:gap-4 md:gap-5 bg-[#101015] border border-white/15 p-3 sm:p-4 md:p-5 lg:p-7 max-h-[90vh] overflow-y-auto"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative h-[clamp(200px,50vh,60vh)] overflow-hidden">
                <img src={activeItem.image} alt={activeItem.alt} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-black/45 to-transparent" />
              </div>

              <div className="flex flex-col justify-between gap-6">
                <div>
                  <div className="text-[clamp(2rem,5vw,5rem)] leading-[0.82] font-semibold tracking-tight">
                    {activeItem.titleTop}
                  </div>
                  <div className="text-[clamp(2rem,5vw,5rem)] leading-[0.82] font-semibold tracking-tight text-white/70">
                    {activeItem.titleBottom}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-white/80">
                  <div>
                    <div className="text-[11px] tracking-[0.2em] text-white/45 mb-2">{activeItem.leftLabel}</div>
                    <p className="leading-relaxed">{activeItem.leftText}</p>
                  </div>
                  <div>
                    <div className="text-[11px] tracking-[0.2em] text-white/45 mb-2">{activeItem.rightLabel}</div>
                    <p className="leading-relaxed">{activeItem.rightText}</p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={closeOverlay}
                    className="border border-white/25 px-4 py-2 text-xs tracking-[0.25em] text-white/80 hover:bg-white hover:text-black transition-colors"
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
