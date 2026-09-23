export const WATCH_COLLECTIONS = [
  'All Timepieces',
  'Tourbillon Haute',
  'Grand Chronograph',
  'Celestial Perpetual',
  'Oceanic Diver',
  'Atelier Skeleton',
  'Minimalist Platinum'
];

export const BRANDS = [
  'All Brands',
  'Rolex',
  'Tissot',
  'Seiko',
  'G-Shock',
  'Patek Philippe',
  'Audemars Piguet',
  'Omega',
  'Cartier',
  'Vacheron Constantin',
  'Richard Mille',
  'Breitling',
  'Hublot',
  'IWC Schaffhausen',
  'Jaeger-LeCoultre',
  'A. Lange & Söhne',
  'Tudor',
  'Casio'
];

export const CATEGORIES = [
  'Luxury Tourbillon',
  'Grand Complication',
  'Chronograph',
  'Perpetual Calendar',
  'Diver 300M',
  'Skeleton Atelier',
  'Dress Classic'
];

export const MATERIALS = [
  '18K Yellow Gold',
  '18K Rose Gold',
  '950 Pure Platinum',
  'Grade 5 Titanium',
  'Midnight Ceramic',
  'Stainless Steel 904L',
  'Alligator Leather',
  'Rubber Strap'
];

export const WATCHES = [
  {
    id: 'rolex-submariner-gold',
    name: 'Rolex Cosmograph Daytona Gold',
    collection: 'Tourbillon Haute',
    brand: 'Rolex',
    category: 'Luxury Tourbillon',
    tagline: 'Hand-Finished Flying Tourbillon in 18K Solid Gold',
    price: 34500,
    originalPrice: 38000,
    rating: 4.98,
    reviewsCount: 42,
    description: 'The pinnacle of fine Swiss watchmaking. Featuring an unhindered 60-second flying tourbillon cage floating over a skeletonized gold mainplate, with hand-chamfered bridges and anti-reflective sapphire crystal.',
    story: 'Conceived in the Vallée de Joux, the Royal Tourbillon represents 380 hours of master craftsman engraving. Each wheel and pinion is mirror-polished by hand with gentian wood paste to achieve an unyielding luster.',
    images: [
      'https://images.unsplash.com/photo-1548169874-53e85f753f1e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=1200&q=80'
    ],
    caseMaterial: '18K Yellow Gold',
    strapMaterial: 'Alligator Leather',
    movement: 'Automatic',
    dialColor: 'Midnight Sun Gold',
    gender: 'Men',
    limitedEdition: true,
    editionCount: 50,
    inStock: true,
    stockCount: 5,
    isNewArrival: true,
    isBestseller: true,
    specs: {
      caseDiameter: '40.0 mm',
      caseThickness: '12.4 mm',
      waterResistance: '100 m (10 ATM)',
      powerReserve: '72 Hours',
      frequency: '28,800 vph (4 Hz)',
      jewels: 44,
      caliber: 'Calibre 4131 Superlative Chronometer',
      crystal: 'Scratch-Resistant Sapphire'
    },
    reviews: [
      {
        id: 'rev-1',
        author: 'Julian V. Rothschild',
        rating: 5,
        date: '2026-07-14',
        comment: 'The tourbillon movement under the loupe is nothing short of transcendent. Pure haute horlogerie.',
        verifiedBuyer: true
      }
    ],
    threeDConfig: {
      caseColor: '#d4af37',
      bezelColor: '#b89228',
      dialColor: '#0a0b0e',
      handColor: '#f7edbf',
      strapColor: '#b89228',
      isSkeleton: true,
      hasTourbillon: true,
      roughness: 0.15,
      metalness: 0.95
    }
  },
  {
    id: 'tissot-prx-rosegold',
    name: 'Tissot PRX Powermatic 80',
    collection: 'Dress Classic',
    brand: 'Tissot',
    category: 'Dress Classic',
    tagline: 'Swiss Automatic with 80-Hour Power Reserve in Rose Gold PVD',
    price: 950,
    originalPrice: 1100,
    rating: 4.92,
    reviewsCount: 68,
    description: 'Iconic 1978 integrated bracelet design equipped with modern Nivachron anti-magnetic balance spring.',
    story: 'Manufactured in Le Locle, Switzerland. The waffle tapisserie dial reflects light with exceptional brilliance.',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=80'
    ],
    caseMaterial: '18K Rose Gold',
    strapMaterial: 'Titanium Link',
    movement: 'Automatic',
    dialColor: 'Deep Ocean Blue',
    gender: 'Unisex',
    limitedEdition: false,
    inStock: true,
    stockCount: 14,
    isBestseller: true,
    specs: {
      caseDiameter: '40.0 mm',
      caseThickness: '10.9 mm',
      waterResistance: '100 m (10 ATM)',
      powerReserve: '80 Hours',
      frequency: '21,600 vph (3 Hz)',
      jewels: 23,
      caliber: 'Powermatic 80.111',
      crystal: 'Sapphire Crystal with Anti-Reflective Coating'
    },
    reviews: [],
    threeDConfig: {
      caseColor: '#b76e79',
      bezelColor: '#d9949a',
      dialColor: '#0a1931',
      handColor: '#fce7e9',
      strapColor: '#b76e79',
      isSkeleton: false,
      hasTourbillon: false,
      roughness: 0.18,
      metalness: 0.9
    }
  },
  {
    id: 'seiko-prospex-master-diver',
    name: 'Seiko Prospex Master Diver 200M',
    collection: 'Oceanic Diver',
    brand: 'Seiko',
    category: 'Diver 1000M',
    tagline: 'Automatic 6R35 Mechanical Diver with Rotating Compass Ring',
    price: 1250,
    rating: 4.89,
    reviewsCount: 35,
    description: 'Legendary Japanese high-precision diving tool watch with Lumibrite hands and 200-meter water resistance.',
    story: 'Engineered in Shizukuishi Watch Studio. Built to withstand extreme mountain and deep ocean conditions.',
    images: [
      'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=1200&q=80'
    ],
    caseMaterial: 'Titanium Grade 5',
    strapMaterial: 'Rubber Sport',
    movement: 'Automatic',
    dialColor: 'Royal Emerald',
    gender: 'Men',
    limitedEdition: false,
    inStock: true,
    stockCount: 9,
    isBestseller: false,
    specs: {
      caseDiameter: '39.5 mm',
      caseThickness: '13.2 mm',
      waterResistance: '200 m (20 ATM)',
      powerReserve: '70 Hours',
      frequency: '21,600 vph (3 Hz)',
      jewels: 24,
      caliber: 'Calibre 6R35 Automatic',
      crystal: 'Curved Sapphire with Magnifier Lens'
    },
    reviews: [],
    threeDConfig: {
      caseColor: '#8a929e',
      bezelColor: '#0b3b2c',
      dialColor: '#06261c',
      handColor: '#4ade80',
      strapColor: '#1c130d',
      isSkeleton: false,
      hasTourbillon: false,
      roughness: 0.25,
      metalness: 0.85
    }
  },
  {
    id: 'gshock-mtg-carbon',
    name: 'Casio G-Shock MT-G Carbon Titanium',
    collection: 'Solar Tactical',
    brand: 'G-Shock',
    category: 'Solar Tactical',
    tagline: 'Triple G Resist Dual-Core Guard in Monolithic Carbon',
    price: 1450,
    originalPrice: 1650,
    rating: 4.95,
    reviewsCount: 51,
    description: 'Virtually indestructible tactical timepiece featuring Tough Solar power, Multi-Band 6 atomic timekeeping, and Bluetooth smartphone sync.',
    story: 'Forged in Yamagata Premium Production line in Japan from layers of carbon fiber and polished titanium.',
    images: [
      'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1547996160-71dfabbce5ed?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80'
    ],
    caseMaterial: 'Forged Carbon',
    strapMaterial: 'Rubber Sport',
    movement: 'Automatic',
    dialColor: 'Obsidian Black',
    gender: 'Men',
    limitedEdition: true,
    inStock: true,
    stockCount: 7,
    isBestseller: true,
    specs: {
      caseDiameter: '45.3 mm',
      caseThickness: '14.5 mm',
      waterResistance: '200 m (20 ATM)',
      powerReserve: 'Solar Powered (18 Months)',
      frequency: 'Atomic Quartz Calibration',
      jewels: 0,
      caliber: 'Tough Solar Module 5672',
      crystal: 'Non-Reflective Coated Sapphire Glass'
    },
    reviews: [],
    threeDConfig: {
      caseColor: '#1a1c22',
      bezelColor: '#0a0b0e',
      dialColor: '#0e1118',
      handColor: '#ef4444',
      strapColor: '#12141a',
      isSkeleton: false,
      hasTourbillon: false,
      roughness: 0.35,
      metalness: 0.5
    }
  }
];
