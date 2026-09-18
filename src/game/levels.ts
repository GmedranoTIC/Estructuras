import { LevelDef, LevelProgress } from '../types';

export const LEVELS: LevelDef[] = [
  {
    id: 1,
    title: 'Nivel 1: Paso de Iniciación',
    subtitle: 'Aprende los fundamentos del puente',
    description: 'Une los anclajes con pasarelas de madera y vigas de soporte para que el trabajador recoja la caja.',
    budget: 360,
    threeStarBudget: 150,
    twoStarBudget: 80,
    leftStation: { x: 120, y: 320 },
    rightPlatform: { x: 580, y: 320 },
    anchors: [
      { id: 'a1', x: 220, y: 320, cliff: 'left', label: 'A1' },
      { id: 'a2', x: 220, y: 390, cliff: 'left', label: 'A2' },
      { id: 'a3', x: 480, y: 320, cliff: 'right', label: 'A3' },
      { id: 'a4', x: 480, y: 390, cliff: 'right', label: 'A4' },
    ],
    terrain: {
      leftEdge: [
        { x: 0, y: 320 },
        { x: 220, y: 320 },
        { x: 220, y: 560 },
        { x: 0, y: 560 },
      ],
      rightEdge: [
        { x: 480, y: 320 },
        { x: 800, y: 320 },
        { x: 800, y: 560 },
        { x: 480, y: 560 },
      ],
      waterY: 530,
    },
    cargos: [
      { id: 'c1', name: 'Caja Ligera', type: 'crate', x: 540, y: 300, weight: 60, color: '#b45309' },
    ],
    workersCount: 1,
    tips: 'Conecta una pasarela horizontal para caminar, y añade vigas triangulares debajo para evitar que se curve.',
  },
  {
    id: 2,
    title: 'Nivel 2: Desfiladero Rocoso',
    subtitle: 'El abismo se hace más ancho',
    description: 'La distancia es mayor. Necesitarás una estructura triangular resistente para soportar el peso.',
    budget: 520,
    threeStarBudget: 180,
    twoStarBudget: 90,
    leftStation: { x: 100, y: 300 },
    rightPlatform: { x: 620, y: 300 },
    anchors: [
      { id: 'a1', x: 180, y: 300, cliff: 'left', label: 'A1' },
      { id: 'a2', x: 180, y: 380, cliff: 'left', label: 'A2' },
      { id: 'a3', x: 140, y: 440, cliff: 'left', label: 'A3' },
      { id: 'a4', x: 520, y: 300, cliff: 'right', label: 'A4' },
      { id: 'a5', x: 520, y: 380, cliff: 'right', label: 'A5' },
      { id: 'a6', x: 560, y: 440, cliff: 'right', label: 'A6' },
    ],
    terrain: {
      leftEdge: [
        { x: 0, y: 300 },
        { x: 180, y: 300 },
        { x: 180, y: 390 },
        { x: 130, y: 560 },
        { x: 0, y: 560 },
      ],
      rightEdge: [
        { x: 520, y: 300 },
        { x: 800, y: 300 },
        { x: 800, y: 560 },
        { x: 570, y: 560 },
        { x: 520, y: 390 },
      ],
      waterY: 530,
    },
    cargos: [
      { id: 'c1', name: 'Barril Pesado', type: 'barrel', x: 580, y: 280, weight: 85, color: '#0284c7' },
    ],
    workersCount: 1,
    tips: 'Aprovecha los anclajes inferiores para formar celosías triangulares. Los triángulos no se deforman.',
  },
  {
    id: 3,
    title: 'Nivel 3: Caja Fuerte de Acero',
    subtitle: 'Carga pesada de 150 kg',
    description: 'La caja fuerte es extremadamente pesada. Una pasarela simple de madera crujirá y se partirá al instante.',
    budget: 680,
    threeStarBudget: 190,
    twoStarBudget: 100,
    leftStation: { x: 100, y: 310 },
    rightPlatform: { x: 600, y: 310 },
    anchors: [
      { id: 'a1', x: 190, y: 310, cliff: 'left', label: 'A1' },
      { id: 'a2', x: 190, y: 390, cliff: 'left', label: 'A2' },
      { id: 'a3', x: 190, y: 240, cliff: 'left', label: 'A3' },
      { id: 'a4', x: 510, y: 310, cliff: 'right', label: 'A4' },
      { id: 'a5', x: 510, y: 390, cliff: 'right', label: 'A5' },
      { id: 'a6', x: 510, y: 240, cliff: 'right', label: 'A6' },
    ],
    terrain: {
      leftEdge: [
        { x: 0, y: 230 },
        { x: 190, y: 230 },
        { x: 190, y: 560 },
        { x: 0, y: 560 },
      ],
      rightEdge: [
        { x: 510, y: 230 },
        { x: 800, y: 230 },
        { x: 800, y: 560 },
        { x: 510, y: 560 },
      ],
      waterY: 530,
    },
    cargos: [
      { id: 'c1', name: 'Caja Fuerte', type: 'safe', x: 570, y: 290, weight: 155, color: '#475569' },
    ],
    workersCount: 1,
    tips: 'Usa vigas de acero en los puntos con mayor tensión o suspensión por arriba con cables.',
  },
  {
    id: 4,
    title: 'Nivel 4: Puente Colgante',
    subtitle: 'El barranco profundo con torres',
    description: 'Los anclajes superiores te permiten construir un auténtico puente colgante con cables de acero.',
    budget: 820,
    threeStarBudget: 240,
    twoStarBudget: 120,
    leftStation: { x: 80, y: 330 },
    rightPlatform: { x: 640, y: 330 },
    anchors: [
      { id: 'a1', x: 170, y: 330, cliff: 'left', label: 'A1' },
      { id: 'a2', x: 170, y: 190, cliff: 'left', label: 'Torre Izq' },
      { id: 'a3', x: 170, y: 410, cliff: 'left', label: 'A3' },
      { id: 'a4', x: 550, y: 330, cliff: 'right', label: 'A4' },
      { id: 'a5', x: 550, y: 190, cliff: 'right', label: 'Torre Der' },
      { id: 'a6', x: 550, y: 410, cliff: 'right', label: 'A6' },
    ],
    terrain: {
      leftEdge: [
        { x: 0, y: 180 },
        { x: 170, y: 180 },
        { x: 170, y: 560 },
        { x: 0, y: 560 },
      ],
      rightEdge: [
        { x: 550, y: 180 },
        { x: 800, y: 180 },
        { x: 800, y: 560 },
        { x: 550, y: 560 },
      ],
      waterY: 530,
    },
    cargos: [
      { id: 'c1', name: 'Reliquia Dorada', type: 'gold', x: 600, y: 310, weight: 110, color: '#eab308' },
    ],
    workersCount: 1,
    tips: 'Los cables de acero son baratos y soportan enormes fuerzas de tracción colgados de las torres.',
  },
  {
    id: 5,
    title: 'Nivel 5: El Pilar Central',
    subtitle: 'Apoyo rocoso intermedio',
    description: 'Un pilar de piedra natural en medio del cañón ofrece anclajes clave para dividir el vano.',
    budget: 850,
    threeStarBudget: 260,
    twoStarBudget: 140,
    leftStation: { x: 80, y: 300 },
    rightPlatform: { x: 640, y: 300 },
    anchors: [
      { id: 'a1', x: 160, y: 300, cliff: 'left', label: 'Izq 1' },
      { id: 'a2', x: 160, y: 380, cliff: 'left', label: 'Izq 2' },
      { id: 'a3', x: 350, y: 320, cliff: 'pillar', label: 'Pilar Sup' },
      { id: 'a4', x: 350, y: 420, cliff: 'pillar', label: 'Pilar Inf' },
      { id: 'a5', x: 540, y: 300, cliff: 'right', label: 'Der 1' },
      { id: 'a6', x: 540, y: 380, cliff: 'right', label: 'Der 2' },
    ],
    terrain: {
      leftEdge: [
        { x: 0, y: 300 },
        { x: 160, y: 300 },
        { x: 160, y: 560 },
        { x: 0, y: 560 },
      ],
      rightEdge: [
        { x: 540, y: 300 },
        { x: 800, y: 300 },
        { x: 800, y: 560 },
        { x: 540, y: 560 },
      ],
      waterY: 530,
      pillars: [
        { x: 330, y: 310, width: 40, height: 250 },
      ],
    },
    cargos: [
      { id: 'c1', name: 'Yunque Industrial', type: 'anvil', x: 600, y: 280, weight: 135, color: '#334155' },
    ],
    workersCount: 1,
    tips: 'Construye dos arcos o cerchas apoyados sobre el pilar central.',
  },
  {
    id: 6,
    title: 'Nivel 6: El Desnivel',
    subtitle: 'Puente con pendiente ascendente',
    description: 'La plataforma derecha está 80 píxeles más alta que la estación. El puente debe subir con suavidad.',
    budget: 800,
    threeStarBudget: 220,
    twoStarBudget: 110,
    leftStation: { x: 80, y: 350 },
    rightPlatform: { x: 620, y: 260 },
    anchors: [
      { id: 'a1', x: 170, y: 350, cliff: 'left', label: 'A1' },
      { id: 'a2', x: 170, y: 430, cliff: 'left', label: 'A2' },
      { id: 'a3', x: 530, y: 260, cliff: 'right', label: 'A3' },
      { id: 'a4', x: 530, y: 340, cliff: 'right', label: 'A4' },
      { id: 'a5', x: 530, y: 430, cliff: 'right', label: 'A5' },
    ],
    terrain: {
      leftEdge: [
        { x: 0, y: 350 },
        { x: 170, y: 350 },
        { x: 170, y: 560 },
        { x: 0, y: 560 },
      ],
      rightEdge: [
        { x: 530, y: 260 },
        { x: 800, y: 260 },
        { x: 800, y: 560 },
        { x: 530, y: 560 },
      ],
      waterY: 530,
    },
    cargos: [
      { id: 'c1', name: 'Caja Fuerte', type: 'safe', x: 590, y: 240, weight: 140, color: '#475569' },
    ],
    workersCount: 1,
    tips: 'Mantén una pendiente uniforme para que el trabajador pueda subir y bajar cómodamente.',
  },
  {
    id: 7,
    title: 'Nivel 7: Doble Cargador',
    subtitle: 'Dos trabajadores simultáneos',
    description: 'Dos trabajadores cruzan a la vez para traer dos cargas pesadas. ¡La masa en el centro se duplica!',
    budget: 1050,
    threeStarBudget: 280,
    twoStarBudget: 140,
    leftStation: { x: 80, y: 310 },
    rightPlatform: { x: 640, y: 310 },
    anchors: [
      { id: 'a1', x: 170, y: 310, cliff: 'left', label: 'A1' },
      { id: 'a2', x: 170, y: 210, cliff: 'left', label: 'A2' },
      { id: 'a3', x: 170, y: 410, cliff: 'left', label: 'A3' },
      { id: 'a4', x: 530, y: 310, cliff: 'right', label: 'A4' },
      { id: 'a5', x: 530, y: 210, cliff: 'right', label: 'A5' },
      { id: 'a6', x: 530, y: 410, cliff: 'right', label: 'A6' },
    ],
    terrain: {
      leftEdge: [
        { x: 0, y: 200 },
        { x: 170, y: 200 },
        { x: 170, y: 560 },
        { x: 0, y: 560 },
      ],
      rightEdge: [
        { x: 530, y: 200 },
        { x: 800, y: 200 },
        { x: 800, y: 560 },
        { x: 530, y: 560 },
      ],
      waterY: 530,
    },
    cargos: [
      { id: 'c1', name: 'Caja A', type: 'crate', x: 570, y: 290, weight: 80, color: '#b45309' },
      { id: 'c2', name: 'Barril B', type: 'barrel', x: 610, y: 290, weight: 90, color: '#0284c7' },
    ],
    workersCount: 2,
    tips: 'Refuerza bien la sección central con acero o cerchas dobles arriba y abajo.',
  },
  {
    id: 8,
    title: 'Nivel 8: El Gran Abismo',
    subtitle: 'El desafío de ingeniería definitivo',
    description: 'Un cañón gigantesco con dos anclajes lejanos. Pon a prueba todo lo aprendido.',
    budget: 1300,
    threeStarBudget: 350,
    twoStarBudget: 170,
    leftStation: { x: 70, y: 300 },
    rightPlatform: { x: 670, y: 300 },
    anchors: [
      { id: 'a1', x: 150, y: 300, cliff: 'left', label: 'A1' },
      { id: 'a2', x: 150, y: 170, cliff: 'left', label: 'Torre 1' },
      { id: 'a3', x: 150, y: 430, cliff: 'left', label: 'Base 1' },
      { id: 'a4', x: 570, y: 300, cliff: 'right', label: 'A2' },
      { id: 'a5', x: 570, y: 170, cliff: 'right', label: 'Torre 2' },
      { id: 'a6', x: 570, y: 430, cliff: 'right', label: 'Base 2' },
    ],
    terrain: {
      leftEdge: [
        { x: 0, y: 160 },
        { x: 150, y: 160 },
        { x: 150, y: 560 },
        { x: 0, y: 560 },
      ],
      rightEdge: [
        { x: 570, y: 160 },
        { x: 800, y: 160 },
        { x: 800, y: 560 },
        { x: 570, y: 560 },
      ],
      waterY: 540,
    },
    cargos: [
      { id: 'c1', name: 'Caja Fuerte Real', type: 'safe', x: 610, y: 280, weight: 160, color: '#475569' },
      { id: 'c2', name: 'Tesoro Sagrado', type: 'gold', x: 650, y: 280, weight: 120, color: '#eab308' },
    ],
    workersCount: 2,
    tips: 'Combina cables de suspensión desde las torres con una cercha de acero inferior.',
  },
];

const STORAGE_KEY = 'cargo_bridge_progress_v1';

export function loadLevelProgress(): Record<number, LevelProgress> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // fallback
  }

  // Default: level 1 is unlocked
  const initial: Record<number, LevelProgress> = {};
  LEVELS.forEach((lvl, idx) => {
    initial[lvl.id] = {
      unlocked: idx === 0,
      completed: false,
      bestBudgetRemaining: 0,
      stars: 0,
    };
  });
  return initial;
}

export function saveLevelProgress(
  levelId: number,
  budgetRemaining: number,
  threeStarBudget: number,
  twoStarBudget: number
): { stars: number; isNewRecord: boolean } {
  const current = loadLevelProgress();
  let stars = 1;
  if (budgetRemaining >= threeStarBudget) {
    stars = 3;
  } else if (budgetRemaining >= twoStarBudget) {
    stars = 2;
  }

  const existing = current[levelId] || {
    unlocked: true,
    completed: false,
    bestBudgetRemaining: 0,
    stars: 0,
  };

  const isNewRecord = !existing.completed || budgetRemaining > existing.bestBudgetRemaining;

  current[levelId] = {
    unlocked: true,
    completed: true,
    bestBudgetRemaining: Math.max(existing.bestBudgetRemaining, budgetRemaining),
    stars: Math.max(existing.stars, stars),
  };

  // Unlock next level if available
  const nextLvl = LEVELS.find((l) => l.id === levelId + 1);
  if (nextLvl) {
    if (!current[nextLvl.id]) {
      current[nextLvl.id] = {
        unlocked: true,
        completed: false,
        bestBudgetRemaining: 0,
        stars: 0,
      };
    } else {
      current[nextLvl.id].unlocked = true;
    }
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch {
    // ignore
  }

  return { stars, isNewRecord };
}
