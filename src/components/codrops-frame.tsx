'use client';

import { Link } from 'react-router-dom';

interface CodropsFrameProps {
  demoTitle?: string;
  articleUrl?: string;
  githubUrl?: string;
  hubUrl?: string;
  demos?: Array<{
    label: string;
    href: string;
    current?: boolean;
  }>;
  tags?: string[];
  tagsLink?: string[];
}

export function CodropsFrame({
  demoTitle = '',
  articleUrl = 'https://tympanus.net/codrops/?p=103299',
  githubUrl = 'https://github.com/JosephASG/codrops-cinematic-scroll-animations',
  hubUrl = 'https://tympanus.net/codrops/hub',
  demos = [
    { label: 'Developer by DAY', href: '/', current: true },
    { label: 'Gamer by NIGHT', href: '/', current: false },
  ],
  // tags = ['gsap', 'scrolltrigger', 'ogl', 'webgl', '3d'],
  // tagsLink = [],
}: CodropsFrameProps) {
  return (
    <>
      {/* Codrops Frame Header */}
      <header className="frame fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 py-3 sm:py-6 pointer-events-none">
        {/* Left side - Title and links */}
        <div className="flex flex-col gap-2 sm:gap-3 pointer-events-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full">
            <h1 className="text-xs sm:text-sm md:text-base max-w-xs sm:max-w-sm leading-tight break-words">{demoTitle}</h1>
            {/* Demos navigation */}
            <nav className="flex flex-wrap gap-2 sm:gap-4 pointer-events-auto">
              {demos.map((demo, index) => (
                <Link
                  key={index}
                  to={demo.href}
                  className={`text-xs sm:text-sm hover:underline whitespace-nowrap ${demo.current ? 'underline' : ''}`}
                >
                  {demo.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm font-mono">
            {articleUrl && (
              <a href={articleUrl} target="_blank" className="hover:underline whitespace-nowrap">
                [GH]
              </a>
            )}
            {githubUrl && (
              <a href={githubUrl} target="_blank" className="hover:underline whitespace-nowrap">
                [IN]
              </a>
            )}
            {hubUrl && (
              <a href={hubUrl} target="_blank" className="hover:underline whitespace-nowrap">
                [X]
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Tags at bottom-left */}
      {/* {tags && tags.length > 0 && (
        <div className="frame fixed bottom-6 max-md:left-1/2 max-md:-translate-x-1/2 left-6 z-50 flex gap-2 pointer-events-auto max-md:w-full max-md:px-6">
          {tags.map((tag, index) => (
            <a href={tagsLink[index]} target="_blank" key={index} className="text-s">
              #{tag}
            </a>
          ))}
        </div>
      )} */}
    </>
  );
}
