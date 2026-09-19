export type MaterialType = 'walkway' | 'wood' | 'steel' | 'cable';

export interface MaterialProperties {
  type: MaterialType;
  name: string;
  costPerMeter: number; // Cost per 10 pixels / meter
  maxSpan: number; // Max distance in world coords
  strength: number; // Max stress before breaking
  tensileStrength: number; // Resistance under traction/tension
  density: number; // Weight/mass factor
  isWalkable: boolean; // Can workers walk on it?
  color: string;
  testColor: string;
  strokeWidth: number;
}

export interface Joint {
  id: string;
  x: number;
  y: number;
  oldX: number;
  oldY: number;
  fixed: boolean; // Cannot move (anchor)
  anchorId?: string; // If attached to a cliff anchor
  radius: number;
  tensionStress?: number; // Tension experienced at walkway joint union
}

export interface Beam {
  id: string;
  nodeA: string; // Joint id
  nodeB: string; // Joint id
  material: MaterialType;
  length: number; // Rest length
  stress: number; // Normalized (0.0 to 1.0+), tension or compression
  broken: boolean;
  cost: number;
}

export interface CargoItem {
  id: string;
  name: string;
  type: 'crate' | 'safe' | 'barrel' | 'gold' | 'anvil' | 'elephant';
  x: number;
  y: number;
  weight: number; // Heavy loads stress the bridge more!
  color: string;
  carriedBy?: string; // Worker ID
  collected: boolean;
}

export interface WorkerActor {
  id: string;
  name: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  state: 'exiting_base' | 'to_cargo' | 'picking_up' | 'returning' | 'deposited' | 'falling';
  facing: 1 | -1;
  cargoId?: string;
  walkCycle: number;
  assignedCargoId: string;
  targetX: number;
  onGround: boolean;
  hasSplashed?: boolean;
  isStruggling?: boolean;
  slope?: number;
  incline?: number;
  stuckTimer?: number;
}

export interface CliffTerrain {
  leftEdge: { x: number; y: number }[];
  rightEdge: { x: number; y: number }[];
  waterY: number;
  pillars?: { x: number; y: number; width: number; height: number }[];
}

export interface AnchorPoint {
  id: string;
  x: number;
  y: number;
  cliff: 'left' | 'right' | 'pillar';
  label?: string;
}

export interface LevelDef {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  budget: number;
  threeStarBudget: number; // Remaining budget for 3 stars
  twoStarBudget: number; // Remaining budget for 2 stars
  leftStation: { x: number; y: number };
  rightPlatform: { x: number; y: number };
  anchors: AnchorPoint[];
  terrain: CliffTerrain;
  cargos: Omit<CargoItem, 'collected' | 'carriedBy'>[];
  workersCount: number;
  tips: string;
}

export type ToolType = MaterialType | 'erase' | 'pan';

export interface LevelProgress {
  unlocked: boolean;
  completed: boolean;
  bestBudgetRemaining: number;
  stars: number;
}

export interface GameStats {
  moneySpent: number;
  budgetRemaining: number;
  cargosSaved: number;
  totalCargos: number;
  maxStressObserved: number;
}
