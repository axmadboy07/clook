import React from 'react';
import { HeroSection } from '../components/home/HeroSection.jsx';
import { FeaturedCollection } from '../components/home/FeaturedCollection.jsx';
import { CraftsmanshipSection } from '../components/home/CraftsmanshipSection.jsx';
import { InteractiveCustomizerBanner } from '../components/home/InteractiveCustomizerBanner.jsx';
import { HorologyFeatures } from '../components/home/HorologyFeatures.jsx';
import { TestimonialsSection } from '../components/home/TestimonialsSection.jsx';

export const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedCollection />
      <CraftsmanshipSection />
      <InteractiveCustomizerBanner />
      <HorologyFeatures />
      <TestimonialsSection />
    </div>
  );
};

export default HomePage;
