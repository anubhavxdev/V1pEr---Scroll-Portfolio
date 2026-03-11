'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CodropsFrame } from '@/components/codrops-frame';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SkillEntry {
  left: string;
  right: string;
  image: string;
  category: string;
  description: string;
}

interface SkillsShowcaseProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
  triggerAfterRef?: React.RefObject<HTMLDivElement | null>;
}

const skillEntries: SkillEntry[] = [
  {
    left: 'Frontend',
    right: 'Mastery',
    image: 'https://moussamamadou.github.io/flip-plugin-horizontal-scroll/images/photo-9.jpg',
    category: 'React & TypeScript',
    description: 'Building responsive, performance-optimized UIs with React, TypeScript, and modern frameworks like Next.js.',
  },
  {
    left: 'Backend',
    right: 'Systems',
    image: 'https://moussamamadou.github.io/flip-plugin-horizontal-scroll/images/photo-6.jpg',
    category: 'Node.js & APIs',
    description: 'RESTful and GraphQL APIs, microservices architecture, and scalable server solutions with Express, NestJS.',
  },
  {
    left: 'Cloud',
    right: 'Computing',
    image: 'https://moussamamadou.github.io/flip-plugin-horizontal-scroll/images/photo-8.jpg',
    category: 'AWS & Firebase',
    description: 'Cloud deployment, serverless functions, databases, and infrastructure management on AWS, Firebase, and GCP.',
  },
  {
    left: 'Flutter',
    right: 'Mobile',
    image: 'https://moussamamadou.github.io/flip-plugin-horizontal-scroll/images/photo-12.jpg',
    category: 'Cross-Platform',
    description: 'Native-like mobile applications for iOS and Android using Flutter, with seamless platform integration.',
  },
  {
    left: 'Full',
    right: 'Stack',
    image: 'https://moussamamadou.github.io/flip-plugin-horizontal-scroll/images/photo-5.jpg',
    category: 'MERN & Beyond',
    description: 'End-to-end development combining frontend, backend, databases, and deployment into production-ready systems.',
  },
  {
    left: 'DevOps',
    right: 'Pipeline',
    image: 'https://moussamamadou.github.io/flip-plugin-horizontal-scroll/images/photo-10.jpg',
    category: 'Docker & CI/CD',
    description: 'Containerization, automated testing, CI/CD pipelines, and continuous deployment workflows using GitHub Actions and Docker.',
  },
  {
    left: 'Performance',
    right: 'Optimization',
    image: 'https://moussamamadou.github.io/flip-plugin-horizontal-scroll/images/photo-4.jpg',
    category: 'Speed & Scale',
    description: 'Web vitals optimization, caching strategies, database indexing, and architectural decisions for high-traffic applications.',
  },
];

export default function SkillsShowcase({ containerRef, triggerAfterRef }: SkillsShowcaseProps) {
  const fallbackRef = useRef<HTMLDivElement>(null);
  const actualContainerRef = containerRef || fallbackRef;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);
  const leftRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rightRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeIndexRef = useRef(0);

  const [isVisible, setIsVisible] = useState(false);
  const [isAllowedByOrder, setIsAllowedByOrder] = useState(!triggerAfterRef);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeEntry = useMemo(() => skillEntries[activeIndex], [activeIndex]);

  useEffect(() => {
    if (!actualContainerRef.current) return;

    const ctx = gsap.context(() => {
      const updateWave = (progress: number) => {
        const amplitude = window.innerWidth < 1024 ? Math.min(window.innerWidth * 0.015, 12) : Math.min(window.innerWidth * 0.03, 28);
        const nextIndex = Math.round(progress * (skillEntries.length - 1));

        if (nextIndex !== activeIndexRef.current) {
          activeIndexRef.current = nextIndex;
          setActiveIndex(nextIndex);
        }

        leftRefs.current.forEach((node, index) => {
          if (!node) return;
          const x = Math.sin(progress * Math.PI * 2 + index * 0.8) * amplitude;
          const isActive = index === nextIndex;

          gsap.set(node, {
            x,
            opacity: isActive ? 1 : 0.32,
            scale: isActive ? 1 : 0.94,
            color: isActive ? '#ffffff' : 'rgba(255,255,255,0.32)',
          });
        });

        rightRefs.current.forEach((node, index) => {
          if (!node) return;
          const x = -Math.sin(progress * Math.PI * 2 + index * 0.8) * amplitude;
          const isActive = index === nextIndex;

          gsap.set(node, {
            x,
            opacity: isActive ? 1 : 0.32,
            scale: isActive ? 1 : 0.94,
            color: isActive ? '#ffffff' : 'rgba(255,255,255,0.32)',
          });
        });
      };

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

      ScrollTrigger.create({
        trigger: actualContainerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8,
        onUpdate: (self) => updateWave(self.progress),
        onRefresh: (self) => updateWave(self.progress),
      });

      updateWave(0);
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [actualContainerRef, triggerAfterRef]);

  useEffect(() => {
    if (!imageCardRef.current) return;

    gsap.fromTo(
      imageCardRef.current,
      { autoAlpha: 0, y: 28, scale: 0.97 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.4, ease: 'power3.out', overwrite: 'auto' }
    );
  }, [activeIndex]);

  const showLayer = isVisible && isAllowedByOrder;

  return (
    <div
      ref={sectionRef}
      className="fixed inset-0 z-20 overflow-hidden bg-black"
      style={{
        opacity: showLayer ? 1 : 0,
        pointerEvents: showLayer ? 'auto' : 'none',
        transition: 'opacity 0.45s ease',
      }}
    >
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
      <div className="absolute inset-0 bg-black" />

      <div className="absolute left-0 top-0 z-20 flex w-full items-center justify-end px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-5 text-white/70">
        {/* <span className="text-[11px] tracking-[0.35em] uppercase">Capabilities</span> */}
        <span className="text-sm sm:text-xl md:text-2xl tracking-[0.25em] uppercase">Skillset</span>
      </div>

      <div className="absolute inset-0 z-10 overflow-hidden px-2 sm:px-4 md:px-6 lg:px-8 py-12 sm:py-14 md:py-16 lg:py-18">
        <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-center px-1 sm:px-2">
          <div className="grid w-full grid-cols-1 items-center gap-2 sm:gap-3 md:gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(200px,280px)_minmax(0,1fr)] lg:gap-4 xl:gap-5">
          <div className="order-2 min-w-0 pr-2 sm:pr-3 max-lg:hidden lg:order-1">
            <div className="flex flex-col gap-1.5 sm:gap-2 md:gap-3">
            {skillEntries.map((entry, index) => (
              <div
                key={`${entry.left}-${index}`}
                ref={(node) => {
                  leftRefs.current[index] = node;
                }}
                className="max-w-full text-left text-[clamp(0.75rem,1.8vw,2.2rem)] font-medium uppercase leading-[0.92] tracking-[-0.03em] wrap-break-word will-change-transform"
              >
                {entry.left}
              </div>
            ))}
            </div>
          </div>

          <div className="order-1 flex min-w-0 flex-col items-center justify-center gap-2 sm:gap-3 px-1 md:px-2 lg:order-2">
            <div className="text-center lg:hidden">
              <div className="text-[8px] sm:text-[9px] uppercase tracking-[0.28em] text-white/45">{activeEntry.category}</div>
              <div className="mt-1.5 sm:mt-2 text-[clamp(1.1rem,5.5vw,2rem)] font-semibold uppercase leading-[0.9] tracking-[-0.04em] text-white">
                {activeEntry.left}
              </div>
              <div className="text-[clamp(1.1rem,5.5vw,2rem)] font-semibold uppercase leading-[0.9] tracking-[-0.04em] text-white/70">
                {activeEntry.right}
              </div>
            </div>

            <div ref={imageCardRef} className="relative w-full max-w-[clamp(140px,40vw,280px)] sm:max-w-[clamp(140px,40vw,320px)] md:max-w-80 lg:max-w-72 xl:max-w-80">
              <div className="absolute -inset-3 sm:-inset-4 rounded-full bg-cyan-300/12 blur-2xl sm:blur-3xl" />
              <div className="relative overflow-hidden border border-white/15 bg-black/30 p-2 sm:p-3 backdrop-blur-sm">
                <div className="relative aspect-4/5 overflow-hidden">
                  <img src={activeEntry.image} alt={activeEntry.category} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent" />
                </div>
                <div className="mt-2 sm:mt-3 text-white">
                  <div className="text-[8px] sm:text-[9px] uppercase tracking-[0.28em] text-white/45">{activeEntry.category}</div>
                  <div className="mt-1.5 sm:mt-2 hidden text-base sm:text-lg md:text-2xl lg:text-3xl font-semibold tracking-[-0.04em] lg:block">
                    {activeEntry.left} {activeEntry.right}
                  </div>
                  {/* <p className="mt-2 max-w-md text-sm leading-relaxed text-white/68 md:text-base text-center lg:text-left">
                    {activeEntry.description}
                  </p> */}
                </div>
              </div>
            </div>

            <div className="grid w-full max-w-xs sm:max-w-sm grid-cols-2 gap-x-2 sm:gap-x-3 gap-y-1 sm:gap-y-1.5 lg:hidden">
              {skillEntries.map((entry, index) => (
                <div
                  key={`${entry.category}-${index}`}
                  className={`text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.18em] line-clamp-1 ${index === activeIndex ? 'text-white' : 'text-white/35'}`}
                >
                  {entry.left} {entry.right}
                </div>
              ))}
            </div>
          </div>

          <div className="order-3 min-w-0 pl-2 sm:pl-3 max-lg:hidden lg:order-3">
            <div className="flex flex-col items-end gap-1.5 sm:gap-2 text-right md:gap-3">
            {skillEntries.map((entry, index) => (
              <div
                key={`${entry.right}-${index}`}
                ref={(node) => {
                  rightRefs.current[index] = node;
                }}
                className="max-w-full text-right text-[clamp(0.75rem,1.8vw,2.2rem)] font-medium uppercase leading-[0.92] tracking-[-0.03em] wrap-break-word will-change-transform"
              >
                {entry.right}
              </div>
            ))}
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
