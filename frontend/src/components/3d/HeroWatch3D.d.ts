import React from 'react';

export interface HeroWatch3DProps {
  materialConfig?: any;
  onSelectMaterial?: (material: string) => void;
  activeMaterial?: string;
}

export declare const HeroWatch3D: React.FC<HeroWatch3DProps>;
export default HeroWatch3D;
