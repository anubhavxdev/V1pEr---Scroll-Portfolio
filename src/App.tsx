import './App.css';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import { useEffect } from 'react';
// import { CylinderCarousel } from './components/pages/variant-1/cylinder-carousel';
import CinematicSceneShowcase from './components/pages/variant-2/cinematic-scene-showcase';
import { CombinedExperience } from './components/CombinedExperience';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function BodyClassSetter() {
  const location = useLocation();

  useEffect(() => {
    document.body.classList.remove('demo-1', 'demo-2');

    if (location.pathname === '/') {
      // Combined experience starts with what was demo-2 style (cinematic scenes)
      // but essentially we can just set a base class or both?
      // Variant 2 uses .demo-2, Variant 1 uses .demo-1 or default?
      // Checking css might be wise, but for now let's assume demo-2 is a good start as it's the first view
      document.body.classList.add('demo-2');
    } else if (location.pathname === '/variant-2') {
      document.body.classList.add('demo-2');
    }
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <BodyClassSetter />
      <main id="main-content" className="" role="main">
        <Routes>
          <Route path="/" element={<CombinedExperience />} />
          <Route path="/variant-2" element={<CinematicSceneShowcase containerRef={{ current: null }} />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
