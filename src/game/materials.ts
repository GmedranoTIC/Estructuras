import { MaterialProperties, MaterialType } from '../types';

export const MATERIALS: Record<MaterialType, MaterialProperties> = {
  walkway: {
    type: 'walkway',
    name: 'Pasarela',
    costPerMeter: 14,
    maxSpan: 120,
    strength: 1.0,
    density: 1.0,
    isWalkable: true,
    color: '#d97706', // warm wooden amber
    testColor: '#854d0e',
    strokeWidth: 9,
  },
  wood: {
    type: 'wood',
    name: 'Viga Madera',
    costPerMeter: 8,
    maxSpan: 140,
    strength: 0.9,
    density: 0.6,
    isWalkable: false,
    color: '#b45309', // darker brown
    testColor: '#78350f',
    strokeWidth: 6,
  },
  steel: {
    type: 'steel',
    name: 'Viga Acero',
    costPerMeter: 24,
    maxSpan: 150,
    strength: 2.3,
    density: 1.8,
    isWalkable: false,
    color: '#475569', // slate steel
    testColor: '#334155',
    strokeWidth: 7,
  },
  cable: {
    type: 'cable',
    name: 'Cable Acero',
    costPerMeter: 10,
    maxSpan: 220,
    strength: 1.7,
    density: 0.4,
    isWalkable: false,
    color: '#94a3b8', // light steel cable
    testColor: '#64748b',
    strokeWidth: 3,
  },
};

export function calculateBeamCost(material: MaterialType, length: number): number {
  const props = MATERIALS[material];
  // 1 meter = 10 canvas units
  const meters = length / 10;
  return Math.round(meters * props.costPerMeter);
}
