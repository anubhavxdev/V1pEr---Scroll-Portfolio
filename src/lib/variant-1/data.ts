import type { Perspective } from './types';

export const images = [
  './img/portfolio/01.jpg',
  './img/portfolio/02.jpg',
  './img/portfolio/03.jpg',
  './img/portfolio/04.jpg',
  './img/portfolio/05.jpg',
  './img/portfolio/01.jpg', // Duplicate to fill cylinder
  './img/portfolio/02.jpg',
  './img/portfolio/03.jpg',
  './img/portfolio/04.jpg',
  './img/portfolio/05.jpg',
  './img/portfolio/01.jpg',
  './img/portfolio/02.jpg',
];

export const perspectives: Perspective[] = [
  {
    title: 'Tech Lead',
    description: 'AWS Cloud Community',
    position: 'top',
  },
  {
    title: 'Web Dev Lead',
    description: 'EncryptedEdge',
    position: 'center',
  },
  {
    title: 'Technical Team',
    description: 'GDG Jalandhar Groups',
    position: 'center',
  },
  {
    title: "Let's Collaborate",
    description: 'Reach out on LinkedIn',
    position: 'bottom',
  },
];

export const cylinderConfig = {
  radius: window.innerWidth > 768 ? 2.5 : 2.2,
  height: window.innerWidth > 768 ? 2 : 1.2,
  radialSegments: 64,
  heightSegments: 1,
};

export const particleConfig = {
  numParticles: 12,
  particleRadius: 3.3, // cylinderRadius + 0.8
  segments: 20,
  angleSpan: 0.3,
};

export const imageConfig = {
  width: 1024,
  height: 1024,
};
