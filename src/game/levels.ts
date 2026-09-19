import { LevelDef, LevelProgress } from '../types';

export const LEVELS: LevelDef[] = [
  {
    id: 1,
    title: 'Nivel 1: Paso de Iniciación',
    subtitle: 'Vano: 180 px | Carga: 50 kg',
    description: 'Une los anclajes con pasarelas de madera y vigas de soporte para que el trabajador recoja la primera carga.',
    budget: 450,
    threeStarBudget: 180,
    twoStarBudget: 90,
    leftStation: { x: 140, y: 320 },
    rightPlatform: { x: 530, y: 320 },
    anchors: [
      { id: 'a1', x: 250, y: 320, cliff: 'left', label: 'A1' },
      { id: 'a2', x: 250, y: 390, cliff: 'left', label: 'A2' },
      { id: 'a3', x: 430, y: 320, cliff: 'right', label: 'A3' },
      { id: 'a4', x: 430, y: 390, cliff: 'right', label: 'A4' },
    ],
    terrain: {
      leftEdge: [
        { x: 0, y: 320 },
        { x: 250, y: 320 },
        { x: 250, y: 560 },
        { x: 0, y: 560 },
      ],
      rightEdge: [
        { x: 430, y: 320 },
        { x: 800, y: 320 },
        { x: 800, y: 560 },
        { x: 430, y: 560 },
      ],
      waterY: 530,
    },
    cargos: [
      { id: 'c1', name: 'Caja Ligera', type: 'crate', x: 490, y: 320, weight: 50, color: '#b45309' },
    ],
    workersCount: 1,
    tips: 'Conecta una pasarela horizontal para caminar, y añade vigas triangulares debajo para evitar que se curve.',
  },
  {
    id: 2,
    title: 'Nivel 2: Desfiladero Rocoso',
    subtitle: 'Vano: 200 px | Carga: 70 kg',
    description: 'El abismo se hace más ancho. Necesitarás una estructura triangular resistente para soportar el peso.',
    budget: 560,
    threeStarBudget: 200,
    twoStarBudget: 100,
    leftStation: { x: 130, y: 310 },
    rightPlatform: { x: 540, y: 310 },
    anchors: [
      { id: 'a1', x: 240, y: 310, cliff: 'left', label: 'A1' },
      { id: 'a2', x: 240, y: 390, cliff: 'left', label: 'A2' },
      { id: 'a3', x: 225, y: 450, cliff: 'left', label: 'A3' },
      { id: 'a4', x: 440, y: 310, cliff: 'right', label: 'A4' },
      { id: 'a5', x: 440, y: 390, cliff: 'right', label: 'A5' },
      { id: 'a6', x: 455, y: 450, cliff: 'right', label: 'A6' },
    ],
    terrain: {
      leftEdge: [
        { x: 0, y: 310 },
        { x: 240, y: 310 },
        { x: 240, y: 400 },
        { x: 190, y: 560 },
        { x: 0, y: 560 },
      ],
      rightEdge: [
        { x: 440, y: 310 },
        { x: 800, y: 310 },
        { x: 800, y: 560 },
        { x: 490, y: 560 },
        { x: 440, y: 400 },
      ],
      waterY: 530,
    },
    cargos: [
      { id: 'c1', name: 'Barril de Combustible', type: 'barrel', x: 500, y: 310, weight: 70, color: '#0284c7' },
    ],
    workersCount: 1,
    tips: 'Aprovecha los anclajes inferiores para formar celosías triangulares. Los triángulos no se deforman.',
  },
  {
    id: 3,
    title: 'Nivel 3: El Cofre de Acero',
    subtitle: 'Vano: 220 px | Carga: 90 kg',
    description: 'La carga sigue aumentando. Una pasarela simple de madera crujirá si no distribuyes las tensiones.',
    budget: 680,
    threeStarBudget: 220,
    twoStarBudget: 110,
    leftStation: { x: 120, y: 310 },
    rightPlatform: { x: 550, y: 310 },
    anchors: [
      { id: 'a1', x: 230, y: 310, cliff: 'left', label: 'A1' },
      { id: 'a2', x: 230, y: 390, cliff: 'left', label: 'A2' },
      { id: 'a3', x: 230, y: 230, cliff: 'left', label: 'A3' },
      { id: 'a4', x: 450, y: 310, cliff: 'right', label: 'A4' },
      { id: 'a5', x: 450, y: 390, cliff: 'right', label: 'A5' },
      { id: 'a6', x: 450, y: 230, cliff: 'right', label: 'A6' },
    ],
    terrain: {
      leftEdge: [
        { x: 0, y: 310 },
        { x: 230, y: 310 },
        { x: 230, y: 560 },
        { x: 0, y: 560 },
      ],
      rightEdge: [
        { x: 450, y: 310 },
        { x: 800, y: 310 },
        { x: 800, y: 560 },
        { x: 450, y: 560 },
      ],
      waterY: 530,
    },
    cargos: [
      { id: 'c1', name: 'Cofre Fuerte', type: 'safe', x: 510, y: 310, weight: 90, color: '#475569' },
    ],
    workersCount: 1,
    tips: 'Usa vigas de soporte superiores o celosías inferiores en X para soportar los 90 kg.',
  },
  {
    id: 4,
    title: 'Nivel 4: Puente de Suspensión',
    subtitle: 'Vano: 240 px | Carga: 115 kg',
    description: 'Los anclajes en torres altas te permiten crear un sistema colgante con cables para sostener 115 kg.',
    budget: 820,
    threeStarBudget: 250,
    twoStarBudget: 120,
    leftStation: { x: 110, y: 320 },
    rightPlatform: { x: 560, y: 320 },
    anchors: [
      { id: 'a1', x: 220, y: 320, cliff: 'left', label: 'A1' },
      { id: 'a2', x: 220, y: 220, cliff: 'left', label: 'Torre Izq' },
      { id: 'a3', x: 220, y: 410, cliff: 'left', label: 'A3' },
      { id: 'a4', x: 460, y: 320, cliff: 'right', label: 'A4' },
      { id: 'a5', x: 460, y: 220, cliff: 'right', label: 'Torre Der' },
      { id: 'a6', x: 460, y: 410, cliff: 'right', label: 'A6' },
    ],
    terrain: {
      leftEdge: [
        { x: 0, y: 320 },
        { x: 220, y: 320 },
        { x: 220, y: 560 },
        { x: 0, y: 560 },
      ],
      rightEdge: [
        { x: 460, y: 320 },
        { x: 800, y: 320 },
        { x: 800, y: 560 },
        { x: 460, y: 560 },
      ],
      waterY: 530,
    },
    cargos: [
      { id: 'c1', name: 'Reliquia Dorada', type: 'gold', x: 520, y: 320, weight: 115, color: '#eab308' },
    ],
    workersCount: 1,
    tips: 'Los cables de acero son baratos y soportan enormes fuerzas de tracción colgados de las torres.',
  },
  {
    id: 5,
    title: 'Nivel 5: El Pilar de Roca',
    subtitle: 'Vano: 265 px | Carga: 135 kg',
    description: 'Un pilar intermedio divide este vano de 265 px para cruzar una pieza maciza de 135 kg.',
    budget: 920,
    threeStarBudget: 270,
    twoStarBudget: 130,
    leftStation: { x: 100, y: 310 },
    rightPlatform: { x: 570, y: 310 },
    anchors: [
      { id: 'a1', x: 210, y: 310, cliff: 'left', label: 'Izq 1' },
      { id: 'a2', x: 210, y: 380, cliff: 'left', label: 'Izq 2' },
      { id: 'a3', x: 342, y: 310, cliff: 'pillar', label: 'Pilar Sup' },
      { id: 'a4', x: 342, y: 380, cliff: 'pillar', label: 'Pilar Inf' },
      { id: 'a5', x: 475, y: 310, cliff: 'right', label: 'Der 1' },
      { id: 'a6', x: 475, y: 380, cliff: 'right', label: 'Der 2' },
    ],
    terrain: {
      leftEdge: [
        { x: 0, y: 310 },
        { x: 210, y: 310 },
        { x: 210, y: 560 },
        { x: 0, y: 560 },
      ],
      rightEdge: [
        { x: 475, y: 310 },
        { x: 800, y: 310 },
        { x: 800, y: 560 },
        { x: 475, y: 560 },
      ],
      waterY: 530,
      pillars: [
        { x: 325, y: 310, width: 35, height: 250 },
      ],
    },
    cargos: [
      { id: 'c1', name: 'Yunque Industrial', type: 'anvil', x: 530, y: 310, weight: 135, color: '#334155' },
    ],
    workersCount: 1,
    tips: 'Construye dos arcos o cerchas continuas apoyados en la cabeza del pilar central.',
  },
  {
    id: 6,
    title: 'Nivel 6: El Desnivel Ascendente',
    subtitle: 'Vano: 290 px | Carga: 155 kg',
    description: 'La ladera contraria se eleva 80 px. La tracción en la pendiente aumentará con 155 kg.',
    budget: 1020,
    threeStarBudget: 280,
    twoStarBudget: 140,
    leftStation: { x: 95, y: 350 },
    rightPlatform: { x: 580, y: 270 },
    anchors: [
      { id: 'a1', x: 200, y: 350, cliff: 'left', label: 'A1' },
      { id: 'a2', x: 200, y: 430, cliff: 'left', label: 'A2' },
      { id: 'a3', x: 490, y: 270, cliff: 'right', label: 'A3' },
      { id: 'a4', x: 490, y: 350, cliff: 'right', label: 'A4' },
      { id: 'a5', x: 490, y: 430, cliff: 'right', label: 'A5' },
    ],
    terrain: {
      leftEdge: [
        { x: 0, y: 350 },
        { x: 200, y: 350 },
        { x: 200, y: 560 },
        { x: 0, y: 560 },
      ],
      rightEdge: [
        { x: 490, y: 270 },
        { x: 800, y: 270 },
        { x: 800, y: 560 },
        { x: 490, y: 560 },
      ],
      waterY: 530,
    },
    cargos: [
      { id: 'c1', name: 'Caja Fuerte Doble', type: 'safe', x: 545, y: 270, weight: 155, color: '#475569' },
    ],
    workersCount: 1,
    tips: 'Diseña una rampa uniforme sin cambios bruscos para no concentrar esfuerzos en un único nudo.',
  },
  {
    id: 7,
    title: 'Nivel 7: Doble Cargador',
    subtitle: 'Vano: 315 px | Carga: 175 kg',
    description: 'Dos trabajadores cruzan a la vez para trasladar 175 kg combinados a través de 315 px.',
    budget: 1180,
    threeStarBudget: 320,
    twoStarBudget: 160,
    leftStation: { x: 90, y: 310 },
    rightPlatform: { x: 595, y: 310 },
    anchors: [
      { id: 'a1', x: 190, y: 310, cliff: 'left', label: 'A1' },
      { id: 'a2', x: 190, y: 200, cliff: 'left', label: 'Torre 1' },
      { id: 'a3', x: 190, y: 410, cliff: 'left', label: 'A3' },
      { id: 'a4', x: 505, y: 310, cliff: 'right', label: 'A4' },
      { id: 'a5', x: 505, y: 200, cliff: 'right', label: 'Torre 2' },
      { id: 'a6', x: 505, y: 410, cliff: 'right', label: 'A6' },
    ],
    terrain: {
      leftEdge: [
        { x: 0, y: 310 },
        { x: 190, y: 310 },
        { x: 190, y: 560 },
        { x: 0, y: 560 },
      ],
      rightEdge: [
        { x: 505, y: 310 },
        { x: 800, y: 310 },
        { x: 800, y: 560 },
        { x: 505, y: 560 },
      ],
      waterY: 530,
    },
    cargos: [
      { id: 'c1', name: 'Caja de Repuestos', type: 'crate', x: 545, y: 310, weight: 85, color: '#b45309' },
      { id: 'c2', name: 'Barril Químico', type: 'barrel', x: 580, y: 310, weight: 90, color: '#0284c7' },
    ],
    workersCount: 2,
    tips: 'Cuando ambos obreros se crucen en el medio, la flexión máxima partirá las uniones débiles.',
  },
  {
    id: 8,
    title: 'Nivel 8: El Gran Desfiladero',
    subtitle: 'Vano: 340 px | Carga: 195 kg',
    description: 'Un vano de 340 px con dos cargas pesadas que suman casi 200 kg en movimiento.',
    budget: 1300,
    threeStarBudget: 350,
    twoStarBudget: 170,
    leftStation: { x: 85, y: 310 },
    rightPlatform: { x: 610, y: 310 },
    anchors: [
      { id: 'a1', x: 180, y: 310, cliff: 'left', label: 'A1' },
      { id: 'a2', x: 180, y: 170, cliff: 'left', label: 'Torre 1' },
      { id: 'a3', x: 180, y: 430, cliff: 'left', label: 'Base 1' },
      { id: 'a4', x: 520, y: 310, cliff: 'right', label: 'A2' },
      { id: 'a5', x: 520, y: 170, cliff: 'right', label: 'Torre 2' },
      { id: 'a6', x: 520, y: 430, cliff: 'right', label: 'Base 2' },
    ],
    terrain: {
      leftEdge: [
        { x: 0, y: 310 },
        { x: 180, y: 310 },
        { x: 180, y: 560 },
        { x: 0, y: 560 },
      ],
      rightEdge: [
        { x: 520, y: 310 },
        { x: 800, y: 310 },
        { x: 800, y: 560 },
        { x: 520, y: 560 },
      ],
      waterY: 530,
    },
    cargos: [
      { id: 'c1', name: 'Caja Fuerte Real', type: 'safe', x: 560, y: 310, weight: 105, color: '#475569' },
      { id: 'c2', name: 'Tesoro Sagrado', type: 'gold', x: 595, y: 310, weight: 90, color: '#eab308' },
    ],
    workersCount: 2,
    tips: 'Combina tirantes superiores de cable con una viga reticular de acero inferior.',
  },
  {
    id: 9,
    title: 'Nivel 9: El Elefante Joven',
    subtitle: 'Vano: 365 px | Carga: 215 kg',
    description: '¡La primera gran carga viva! Un elefante joven de 215 kg pondrá a prueba la resistencia a tracción del suelo.',
    budget: 1420,
    threeStarBudget: 380,
    twoStarBudget: 190,
    leftStation: { x: 80, y: 310 },
    rightPlatform: { x: 625, y: 310 },
    anchors: [
      { id: 'a1', x: 170, y: 310, cliff: 'left', label: 'A1' },
      { id: 'a2', x: 170, y: 170, cliff: 'left', label: 'Torre 1' },
      { id: 'a3', x: 170, y: 430, cliff: 'left', label: 'Base 1' },
      { id: 'a4', x: 535, y: 310, cliff: 'right', label: 'A2' },
      { id: 'a5', x: 535, y: 170, cliff: 'right', label: 'Torre 2' },
      { id: 'a6', x: 535, y: 430, cliff: 'right', label: 'Base 2' },
    ],
    terrain: {
      leftEdge: [
        { x: 0, y: 310 },
        { x: 170, y: 310 },
        { x: 170, y: 560 },
        { x: 0, y: 560 },
      ],
      rightEdge: [
        { x: 535, y: 310 },
        { x: 800, y: 310 },
        { x: 800, y: 560 },
        { x: 535, y: 560 },
      ],
      waterY: 530,
    },
    cargos: [
      { id: 'c1', name: 'Elefante Joven', type: 'elephant', x: 580, y: 310, weight: 215, color: '#64748b' },
    ],
    workersCount: 1,
    tips: 'Las barras del suelo sufrirán gran tracción. Refuerza cada unión con barras de acero inferiores.',
  },
  {
    id: 10,
    title: 'Nivel 10: Cañón con Pilares Gemelos',
    subtitle: 'Vano: 390 px | Carga: 235 kg',
    description: 'Un vano de 390 px con dos pilares de roca intermedia para transportar 235 kg de maquinaria.',
    budget: 1520,
    threeStarBudget: 400,
    twoStarBudget: 200,
    leftStation: { x: 75, y: 310 },
    rightPlatform: { x: 640, y: 310 },
    anchors: [
      { id: 'a1', x: 160, y: 310, cliff: 'left', label: 'Izq' },
      { id: 'a2', x: 160, y: 400, cliff: 'left', label: 'Izq Inf' },
      { id: 'a3', x: 285, y: 310, cliff: 'pillar', label: 'Pilar 1' },
      { id: 'a4', x: 420, y: 310, cliff: 'pillar', label: 'Pilar 2' },
      { id: 'a5', x: 550, y: 310, cliff: 'right', label: 'Der' },
      { id: 'a6', x: 550, y: 400, cliff: 'right', label: 'Der Inf' },
    ],
    terrain: {
      leftEdge: [
        { x: 0, y: 310 },
        { x: 160, y: 310 },
        { x: 160, y: 560 },
        { x: 0, y: 560 },
      ],
      rightEdge: [
        { x: 550, y: 310 },
        { x: 800, y: 310 },
        { x: 800, y: 560 },
        { x: 550, y: 560 },
      ],
      waterY: 530,
      pillars: [
        { x: 270, y: 310, width: 30, height: 250 },
        { x: 405, y: 310, width: 30, height: 250 },
      ],
    },
    cargos: [
      { id: 'c1', name: 'Maquinaria Pesada', type: 'safe', x: 595, y: 310, weight: 235, color: '#334155' },
    ],
    workersCount: 1,
    tips: 'Apóyate en los dos pilares creando cerchas segmentadas continuas.',
  },
  {
    id: 11,
    title: 'Nivel 11: La Gran Caravana',
    subtitle: 'Vano: 410 px | Carga: 255 kg',
    description: 'Tres trabajadores cruzan un vano de 410 px con 255 kg de cargamento repartido.',
    budget: 1650,
    threeStarBudget: 420,
    twoStarBudget: 210,
    leftStation: { x: 70, y: 320 },
    rightPlatform: { x: 650, y: 320 },
    anchors: [
      { id: 'a1', x: 155, y: 320, cliff: 'left', label: 'A1' },
      { id: 'a2', x: 155, y: 190, cliff: 'left', label: 'Torre 1' },
      { id: 'a3', x: 155, y: 440, cliff: 'left', label: 'Base 1' },
      { id: 'a4', x: 565, y: 320, cliff: 'right', label: 'A2' },
      { id: 'a5', x: 565, y: 190, cliff: 'right', label: 'Torre 2' },
      { id: 'a6', x: 565, y: 440, cliff: 'right', label: 'Base 2' },
    ],
    terrain: {
      leftEdge: [
        { x: 0, y: 320 },
        { x: 155, y: 320 },
        { x: 155, y: 560 },
        { x: 0, y: 560 },
      ],
      rightEdge: [
        { x: 565, y: 320 },
        { x: 800, y: 320 },
        { x: 800, y: 560 },
        { x: 565, y: 560 },
      ],
      waterY: 530,
    },
    cargos: [
      { id: 'c1', name: 'Minerales', type: 'crate', x: 600, y: 320, weight: 80, color: '#b45309' },
      { id: 'c2', name: 'Presurizado', type: 'barrel', x: 630, y: 320, weight: 85, color: '#0284c7' },
      { id: 'c3', name: 'Yunque Maestro', type: 'anvil', x: 660, y: 320, weight: 90, color: '#1e293b' },
    ],
    workersCount: 3,
    tips: 'La sobrecarga dinámica de tres operarios exige una celosía en X de acero.',
  },
  {
    id: 12,
    title: 'Nivel 12: El Elefante Sagrado',
    subtitle: 'Vano: 430 px | Carga: 270 kg',
    description: 'Un majestuoso paquidermo de 270 kg debe atravesar un cañón de 430 px de anchura.',
    budget: 1750,
    threeStarBudget: 440,
    twoStarBudget: 220,
    leftStation: { x: 65, y: 310 },
    rightPlatform: { x: 665, y: 310 },
    anchors: [
      { id: 'a1', x: 150, y: 310, cliff: 'left', label: 'A1' },
      { id: 'a2', x: 150, y: 160, cliff: 'left', label: 'Torre Izq' },
      { id: 'a3', x: 150, y: 440, cliff: 'left', label: 'Base Izq' },
      { id: 'a4', x: 580, y: 310, cliff: 'right', label: 'A2' },
      { id: 'a5', x: 580, y: 160, cliff: 'right', label: 'Torre Der' },
      { id: 'a6', x: 580, y: 440, cliff: 'right', label: 'Base Der' },
    ],
    terrain: {
      leftEdge: [
        { x: 0, y: 310 },
        { x: 150, y: 310 },
        { x: 150, y: 560 },
        { x: 0, y: 560 },
      ],
      rightEdge: [
        { x: 580, y: 310 },
        { x: 800, y: 310 },
        { x: 800, y: 560 },
        { x: 580, y: 560 },
      ],
      waterY: 530,
    },
    cargos: [
      { id: 'c1', name: 'Elefante Sagrado', type: 'elephant', x: 625, y: 310, weight: 270, color: '#64748b' },
    ],
    workersCount: 1,
    tips: 'Usa una doble red de cables desde ambas torres para repartir los 270 kg.',
  },
  {
    id: 13,
    title: 'Nivel 13: El Paso Inclinado',
    subtitle: 'Vano: 450 px | Carga: 285 kg',
    description: 'Un vano de 450 px con fuerte desnivel ascendente de 110 px para llevar 285 kg de oro.',
    budget: 1850,
    threeStarBudget: 460,
    twoStarBudget: 230,
    leftStation: { x: 65, y: 370 },
    rightPlatform: { x: 675, y: 260 },
    anchors: [
      { id: 'a1', x: 145, y: 370, cliff: 'left', label: 'Izq Base' },
      { id: 'a2', x: 145, y: 450, cliff: 'left', label: 'Izq Inf' },
      { id: 'a3', x: 145, y: 260, cliff: 'left', label: 'Izq Sup' },
      { id: 'a4', x: 595, y: 260, cliff: 'right', label: 'Der Alto' },
      { id: 'a5', x: 595, y: 370, cliff: 'right', label: 'Der Inf' },
      { id: 'a6', x: 595, y: 160, cliff: 'right', label: 'Torre Der' },
    ],
    terrain: {
      leftEdge: [
        { x: 0, y: 370 },
        { x: 145, y: 370 },
        { x: 145, y: 560 },
        { x: 0, y: 560 },
      ],
      rightEdge: [
        { x: 595, y: 260 },
        { x: 800, y: 260 },
        { x: 800, y: 560 },
        { x: 595, y: 560 },
      ],
      waterY: 530,
    },
    cargos: [
      { id: 'c1', name: 'Cofre Macizo de Oro', type: 'safe', x: 635, y: 260, weight: 285, color: '#ca8a04' },
    ],
    workersCount: 1,
    tips: 'La inclinación somete el suelo a enorme tracción axial longitudinal. Refuerza la subida.',
  },
  {
    id: 14,
    title: 'Nivel 14: La Manada de Elefantes',
    subtitle: 'Vano: 470 px | Carga: 300 kg',
    description: '¡Dos elefantes cruzando simultáneamente un abismo de 470 px! 300 kg en total sobre la estructura.',
    budget: 2000,
    threeStarBudget: 480,
    twoStarBudget: 240,
    leftStation: { x: 60, y: 310 },
    rightPlatform: { x: 690, y: 310 },
    anchors: [
      { id: 'a1', x: 140, y: 310, cliff: 'left', label: 'A1' },
      { id: 'a2', x: 140, y: 160, cliff: 'left', label: 'Torre 1' },
      { id: 'a3', x: 140, y: 440, cliff: 'left', label: 'Base 1' },
      { id: 'a4', x: 610, y: 310, cliff: 'right', label: 'A2' },
      { id: 'a5', x: 610, y: 160, cliff: 'right', label: 'Torre 2' },
      { id: 'a6', x: 610, y: 440, cliff: 'right', label: 'Base 2' },
    ],
    terrain: {
      leftEdge: [
        { x: 0, y: 310 },
        { x: 140, y: 310 },
        { x: 140, y: 560 },
        { x: 0, y: 560 },
      ],
      rightEdge: [
        { x: 610, y: 310 },
        { x: 800, y: 310 },
        { x: 800, y: 560 },
        { x: 610, y: 560 },
      ],
      waterY: 530,
    },
    cargos: [
      { id: 'c1', name: 'Elefante Alfa', type: 'elephant', x: 645, y: 310, weight: 150, color: '#64748b' },
      { id: 'c2', name: 'Elefante Beta', type: 'elephant', x: 685, y: 310, weight: 150, color: '#475569' },
    ],
    workersCount: 2,
    tips: 'Usa una cercha invertida de acero con cables colgantes de apoyo.',
  },
  {
    id: 15,
    title: 'Nivel 15: Los Tres Pilares',
    subtitle: 'Vano: 485 px | Carga: 315 kg',
    description: 'Un vano de 485 px dividido por tres columnas de roca viva para soportar 315 kg de oro puro.',
    budget: 2100,
    threeStarBudget: 500,
    twoStarBudget: 250,
    leftStation: { x: 55, y: 300 },
    rightPlatform: { x: 700, y: 300 },
    anchors: [
      { id: 'a1', x: 135, y: 300, cliff: 'left', label: 'Izq' },
      { id: 'a2', x: 135, y: 400, cliff: 'left', label: 'Izq Inf' },
      { id: 'a3', x: 250, y: 300, cliff: 'pillar', label: 'Pilar 1' },
      { id: 'a4', x: 375, y: 300, cliff: 'pillar', label: 'Pilar 2' },
      { id: 'a5', x: 500, y: 300, cliff: 'pillar', label: 'Pilar 3' },
      { id: 'a6', x: 620, y: 300, cliff: 'right', label: 'Der' },
      { id: 'a7', x: 620, y: 400, cliff: 'right', label: 'Der Inf' },
    ],
    terrain: {
      leftEdge: [
        { x: 0, y: 300 },
        { x: 135, y: 300 },
        { x: 135, y: 560 },
        { x: 0, y: 560 },
      ],
      rightEdge: [
        { x: 620, y: 300 },
        { x: 800, y: 300 },
        { x: 800, y: 560 },
        { x: 620, y: 560 },
      ],
      waterY: 530,
      pillars: [
        { x: 235, y: 300, width: 30, height: 260 },
        { x: 360, y: 300, width: 30, height: 260 },
        { x: 485, y: 300, width: 30, height: 260 },
      ],
    },
    cargos: [
      { id: 'c1', name: 'Lingotes de Oro Puro', type: 'gold', x: 660, y: 300, weight: 315, color: '#eab308' },
    ],
    workersCount: 1,
    tips: 'Apóyate sólidamente en los 3 pilares para no depender de cables excesivamente largos.',
  },
  {
    id: 16,
    title: 'Nivel 16: El Gran Salto',
    subtitle: 'Vano: 500 px | Carga: 330 kg',
    description: 'Medio kilómetro a escala de abismo (500 px) para transportar un yunque de titanio de 330 kg.',
    budget: 2250,
    threeStarBudget: 520,
    twoStarBudget: 260,
    leftStation: { x: 55, y: 310 },
    rightPlatform: { x: 710, y: 310 },
    anchors: [
      { id: 'a1', x: 130, y: 310, cliff: 'left', label: 'A1' },
      { id: 'a2', x: 130, y: 150, cliff: 'left', label: 'Torre Izq' },
      { id: 'a3', x: 130, y: 450, cliff: 'left', label: 'Base Izq' },
      { id: 'a4', x: 630, y: 310, cliff: 'right', label: 'A2' },
      { id: 'a5', x: 630, y: 150, cliff: 'right', label: 'Torre Der' },
      { id: 'a6', x: 630, y: 450, cliff: 'right', label: 'Base Der' },
    ],
    terrain: {
      leftEdge: [
        { x: 0, y: 310 },
        { x: 130, y: 310 },
        { x: 130, y: 560 },
        { x: 0, y: 560 },
      ],
      rightEdge: [
        { x: 630, y: 310 },
        { x: 800, y: 310 },
        { x: 800, y: 560 },
        { x: 630, y: 560 },
      ],
      waterY: 530,
    },
    cargos: [
      { id: 'c1', name: 'Gran Yunque de Titanio', type: 'anvil', x: 670, y: 310, weight: 330, color: '#334155' },
    ],
    workersCount: 1,
    tips: 'Crea una catenaria de cables que cuelgue de ambas torres sosteniendo los nudos del puente.',
  },
  {
    id: 17,
    title: 'Nivel 17: El Valle de los Gigantes',
    subtitle: 'Vano: 515 px | Carga: 345 kg',
    description: 'Un vano de 515 px donde un imponente Elefante Imperial de 345 kg debe cruzar sin que las uniones cedan.',
    budget: 2350,
    threeStarBudget: 540,
    twoStarBudget: 270,
    leftStation: { x: 50, y: 310 },
    rightPlatform: { x: 720, y: 310 },
    anchors: [
      { id: 'a1', x: 125, y: 310, cliff: 'left', label: 'A1' },
      { id: 'a2', x: 125, y: 150, cliff: 'left', label: 'Torre Izq' },
      { id: 'a3', x: 125, y: 440, cliff: 'left', label: 'Base Izq' },
      { id: 'a4', x: 640, y: 310, cliff: 'right', label: 'A2' },
      { id: 'a5', x: 640, y: 150, cliff: 'right', label: 'Torre Der' },
      { id: 'a6', x: 640, y: 440, cliff: 'right', label: 'Base Der' },
    ],
    terrain: {
      leftEdge: [
        { x: 0, y: 310 },
        { x: 125, y: 310 },
        { x: 125, y: 560 },
        { x: 0, y: 560 },
      ],
      rightEdge: [
        { x: 640, y: 310 },
        { x: 800, y: 310 },
        { x: 800, y: 560 },
        { x: 640, y: 560 },
      ],
      waterY: 530,
    },
    cargos: [
      { id: 'c1', name: 'Elefante Imperial', type: 'elephant', x: 680, y: 310, weight: 345, color: '#475569' },
    ],
    workersCount: 1,
    tips: 'Las uniones del suelo se romperán si la pasarela se comba en exceso. Refuerza cada unión con acero.',
  },
  {
    id: 18,
    title: 'Nivel 18: Cuatro Rutas de Carga',
    subtitle: 'Vano: 530 px | Carga: 360 kg',
    description: 'Vano colosal de 530 px con 3 trabajadores acarreando 360 kg simultáneamente.',
    budget: 2500,
    threeStarBudget: 560,
    twoStarBudget: 280,
    leftStation: { x: 45, y: 310 },
    rightPlatform: { x: 730, y: 310 },
    anchors: [
      { id: 'a1', x: 120, y: 310, cliff: 'left', label: 'A1' },
      { id: 'a2', x: 120, y: 160, cliff: 'left', label: 'Torre Izq' },
      { id: 'a3', x: 120, y: 440, cliff: 'left', label: 'Base Izq' },
      { id: 'a4', x: 650, y: 310, cliff: 'right', label: 'A2' },
      { id: 'a5', x: 650, y: 160, cliff: 'right', label: 'Torre Der' },
      { id: 'a6', x: 650, y: 440, cliff: 'right', label: 'Base Der' },
    ],
    terrain: {
      leftEdge: [
        { x: 0, y: 310 },
        { x: 120, y: 310 },
        { x: 120, y: 560 },
        { x: 0, y: 560 },
      ],
      rightEdge: [
        { x: 650, y: 310 },
        { x: 800, y: 310 },
        { x: 800, y: 560 },
        { x: 650, y: 560 },
      ],
      waterY: 530,
    },
    cargos: [
      { id: 'c1', name: 'Oro de Ofir', type: 'gold', x: 685, y: 310, weight: 115, color: '#eab308' },
      { id: 'c2', name: 'Caja Fuerte Blindada', type: 'safe', x: 715, y: 310, weight: 135, color: '#334155' },
      { id: 'c3', name: 'Barril Reforzado', type: 'barrel', x: 745, y: 310, weight: 110, color: '#0284c7' },
    ],
    workersCount: 3,
    tips: 'La resonancia de tres operarios al mismo tiempo requiere cerchas rígidas triangulares.',
  },
  {
    id: 19,
    title: 'Nivel 19: El Abismo del Eco',
    subtitle: 'Vano: 545 px | Carga: 475 kg',
    description: 'Vano de 545 px sin torres superiores en la roca lisa. Transporta al Elefante Titán de 375 kg.',
    budget: 2600,
    threeStarBudget: 580,
    twoStarBudget: 290,
    leftStation: { x: 45, y: 320 },
    rightPlatform: { x: 735, y: 320 },
    anchors: [
      { id: 'a1', x: 115, y: 320, cliff: 'left', label: 'A1' },
      { id: 'a2', x: 115, y: 430, cliff: 'left', label: 'A2' },
      { id: 'a3', x: 660, y: 320, cliff: 'right', label: 'A3' },
      { id: 'a4', x: 660, y: 430, cliff: 'right', label: 'A4' },
    ],
    terrain: {
      leftEdge: [
        { x: 0, y: 320 },
        { x: 115, y: 320 },
        { x: 115, y: 560 },
        { x: 0, y: 560 },
      ],
      rightEdge: [
        { x: 660, y: 320 },
        { x: 800, y: 320 },
        { x: 800, y: 560 },
        { x: 660, y: 560 },
      ],
      waterY: 530,
    },
    cargos: [
      { id: 'c1', name: 'Elefante Titán', type: 'elephant', x: 700, y: 320, weight: 475, color: '#64748b' },
    ],
    workersCount: 1,
    tips: 'Sin anclajes superiores, debes construir una cercha inferior parabólica para distribuir el esfuerzo cortante.',
  },
  {
    id: 20,
    title: 'Nivel 20: La Prueba Maestra',
    subtitle: 'Vano: 560 px | Carga: 600 kg',
    description: 'El desafío definitivo de Cargo Bridge: 560 px de abismo y 400 kg de carga (Mamut Legendario + Corona Sagrada).',
    budget: 2850,
    threeStarBudget: 600,
    twoStarBudget: 300,
    leftStation: { x: 40, y: 310 },
    rightPlatform: { x: 745, y: 310 },
    anchors: [
      { id: 'a1', x: 110, y: 310, cliff: 'left', label: 'A1' },
      { id: 'a2', x: 110, y: 140, cliff: 'left', label: 'Gran Torre 1' },
      { id: 'a3', x: 110, y: 440, cliff: 'left', label: 'Base Roca 1' },
      { id: 'a4', x: 670, y: 310, cliff: 'right', label: 'A2' },
      { id: 'a5', x: 670, y: 140, cliff: 'right', label: 'Gran Torre 2' },
      { id: 'a6', x: 670, y: 440, cliff: 'right', label: 'Base Roca 2' },
    ],
    terrain: {
      leftEdge: [
        { x: 0, y: 310 },
        { x: 110, y: 310 },
        { x: 110, y: 560 },
        { x: 0, y: 560 },
      ],
      rightEdge: [
        { x: 670, y: 310 },
        { x: 800, y: 310 },
        { x: 800, y: 560 },
        { x: 670, y: 560 },
      ],
      waterY: 530,
    },
    cargos: [
      { id: 'c1', name: 'Mamut Legendario', type: 'elephant', x: 705, y: 310, weight: 370, color: '#334155' },
      { id: 'c2', name: 'Corona Sagrada', type: 'gold', x: 740, y: 310, weight: 230, color: '#eab308' },
    ],
    workersCount: 2,
    tips: 'Aplica toda tu maestría: refuerza el suelo con acero, arriostra en triángulo invertido y suspende con cables desde las torres.',
  },
  {
    id: 21,
    title: 'Nivel 21: La Grieta Sísmica',
    subtitle: 'Vano: 570 px | Carga: 640 kg | Desnivel 50 px',
    description: 'El terreno se ha quebrado dejando un desnivel abrupto. Dos operarios trasladan un Mamut Titánico y un Cofre de Plomo que suman 640 kg.',
    budget: 2950,
    threeStarBudget: 620,
    twoStarBudget: 310,
    leftStation: { x: 35, y: 340 },
    rightPlatform: { x: 745, y: 290 },
    anchors: [
      { id: 'a1', x: 105, y: 340, cliff: 'left', label: 'Rampa Izq' },
      { id: 'a2', x: 105, y: 210, cliff: 'left', label: 'Torre Izq' },
      { id: 'a3', x: 105, y: 450, cliff: 'left', label: 'Roca Izq Inf' },
      { id: 'a4', x: 675, y: 290, cliff: 'right', label: 'Plat Der' },
      { id: 'a5', x: 675, y: 150, cliff: 'right', label: 'Torre Der' },
      { id: 'a6', x: 675, y: 420, cliff: 'right', label: 'Roca Der Inf' },
    ],
    terrain: {
      leftEdge: [
        { x: 0, y: 340 },
        { x: 105, y: 340 },
        { x: 105, y: 560 },
        { x: 0, y: 560 },
      ],
      rightEdge: [
        { x: 675, y: 290 },
        { x: 800, y: 290 },
        { x: 800, y: 560 },
        { x: 675, y: 560 },
      ],
      waterY: 530,
    },
    cargos: [
      { id: 'c1', name: 'Mamut Titánico', type: 'elephant', x: 710, y: 290, weight: 420, color: '#475569' },
      { id: 'c2', name: 'Cofre de Plomo', type: 'safe', x: 745, y: 290, weight: 220, color: '#64748b' },
    ],
    workersCount: 2,
    tips: 'Diseña una rampa continua con pendiente uniforme. Los tirantes superiores deben absorber la tracción en la bajada.',
  },
  {
    id: 22,
    title: 'Nivel 22: El Cañón de los Vientos',
    subtitle: 'Vano: 585 px | Carga: 660 kg | 3 Operarios Concurrentes',
    description: 'Tres operarios cruzan simultáneamente transportando maquinaria pesada. El cruce simultáneo en el centro produce una sobretensión extrema.',
    budget: 3100,
    threeStarBudget: 650,
    twoStarBudget: 325,
    leftStation: { x: 30, y: 310 },
    rightPlatform: { x: 755, y: 310 },
    anchors: [
      { id: 'a1', x: 100, y: 310, cliff: 'left', label: 'Izq' },
      { id: 'a2', x: 100, y: 150, cliff: 'left', label: 'Torre Izq' },
      { id: 'a3', x: 100, y: 440, cliff: 'left', label: 'Base Izq' },
      { id: 'a4', x: 685, y: 310, cliff: 'right', label: 'Der' },
      { id: 'a5', x: 685, y: 150, cliff: 'right', label: 'Torre Der' },
      { id: 'a6', x: 685, y: 440, cliff: 'right', label: 'Base Der' },
    ],
    terrain: {
      leftEdge: [
        { x: 0, y: 310 },
        { x: 100, y: 310 },
        { x: 100, y: 560 },
        { x: 0, y: 560 },
      ],
      rightEdge: [
        { x: 685, y: 310 },
        { x: 800, y: 310 },
        { x: 800, y: 560 },
        { x: 685, y: 560 },
      ],
      waterY: 530,
    },
    cargos: [
      { id: 'c1', name: 'Yunque de Acero', type: 'anvil', x: 710, y: 310, weight: 220, color: '#1e293b' },
      { id: 'c2', name: 'Caja de Repuestos', type: 'crate', x: 740, y: 310, weight: 220, color: '#b45309' },
      { id: 'c3', name: 'Cilindro Hidráulico', type: 'barrel', x: 770, y: 310, weight: 220, color: '#0284c7' },
    ],
    workersCount: 3,
    tips: 'La celosía tipo Pratt o Warren doble con nudos triangulados resistirá la oscilación causada por los 3 operarios.',
  },
  {
    id: 23,
    title: 'Nivel 23: La Garganta del Coloso',
    subtitle: 'Vano: 600 px | Carga: 720 kg | Bloque Monumental',
    description: 'Un único operario debe arrastrar un monolito de 720 kg a través de 600 px de abismo. Un puente ordinario colapsaría por flexión pura.',
    budget: 3300,
    threeStarBudget: 700,
    twoStarBudget: 350,
    leftStation: { x: 25, y: 310 },
    rightPlatform: { x: 760, y: 310 },
    anchors: [
      { id: 'a1', x: 95, y: 310, cliff: 'left', label: 'Base A1' },
      { id: 'a2', x: 95, y: 130, cliff: 'left', label: 'Torre Izq Alta' },
      { id: 'a3', x: 95, y: 450, cliff: 'left', label: 'Roca Inf A3' },
      { id: 'a4', x: 695, y: 310, cliff: 'right', label: 'Base A4' },
      { id: 'a5', x: 695, y: 130, cliff: 'right', label: 'Torre Der Alta' },
      { id: 'a6', x: 695, y: 450, cliff: 'right', label: 'Roca Inf A6' },
    ],
    terrain: {
      leftEdge: [
        { x: 0, y: 310 },
        { x: 95, y: 310 },
        { x: 95, y: 560 },
        { x: 0, y: 560 },
      ],
      rightEdge: [
        { x: 695, y: 310 },
        { x: 800, y: 310 },
        { x: 800, y: 560 },
        { x: 695, y: 560 },
      ],
      waterY: 530,
    },
    cargos: [
      { id: 'c1', name: 'Monolito de Granito', type: 'safe', x: 730, y: 310, weight: 720, color: '#334155' },
    ],
    workersCount: 1,
    tips: 'Construye un sistema de suspensión parabólico con cables tensores hacia las torres para transferir la carga directamente al terreno.',
  },
  {
    id: 24,
    title: 'Nivel 24: La Isla de Basalto',
    subtitle: 'Vano: 610 px | Carga: 780 kg | Pilar Central Estrecho',
    description: 'Una aguja de basalto emerge en el centro del torrente. Debes equilibrar dos tramos continuos para dos Elefantes de 390 kg cada uno.',
    budget: 3450,
    threeStarBudget: 720,
    twoStarBudget: 360,
    leftStation: { x: 45, y: 310 },
    rightPlatform: { x: 760, y: 310 },
    anchors: [
      { id: 'a1', x: 90, y: 310, cliff: 'left', label: 'Izq' },
      { id: 'a2', x: 90, y: 420, cliff: 'left', label: 'Izq Inf' },
      { id: 'a3', x: 395, y: 310, cliff: 'pillar', label: 'Pilar Sup' },
      { id: 'a4', x: 395, y: 430, cliff: 'pillar', label: 'Pilar Inf' },
      { id: 'a5', x: 700, y: 310, cliff: 'right', label: 'Der' },
      { id: 'a6', x: 700, y: 420, cliff: 'right', label: 'Der Inf' },
    ],
    terrain: {
      leftEdge: [
        { x: 0, y: 310 },
        { x: 90, y: 310 },
        { x: 90, y: 560 },
        { x: 0, y: 560 },
      ],
      rightEdge: [
        { x: 700, y: 310 },
        { x: 800, y: 310 },
        { x: 800, y: 560 },
        { x: 700, y: 560 },
      ],
      waterY: 530,
      pillars: [{ x: 380, y: 310, width: 30, height: 250 }],
    },
    cargos: [
      { id: 'c1', name: 'Elefante Acorazado 1', type: 'elephant', x: 725, y: 310, weight: 390, color: '#64748b' },
      { id: 'c2', name: 'Elefante Acorazado 2', type: 'elephant', x: 760, y: 310, weight: 390, color: '#475569' },
    ],
    workersCount: 2,
    tips: 'En el apoyo central se produce un momento flector negativo: refuerza la parte superior con acero para evitar que se parta.',
  },
  {
    id: 25,
    title: 'Nivel 25: El Risco del Sacrificio',
    subtitle: 'Vano: 620 px | Carga: 820 kg | Pendiente Pronunciada',
    description: 'Desnivel pronunciado: salida a Y=360 y plataforma elevada a Y=270. Subir 820 kg pondrá a prueba la física de resistencia en pendiente.',
    budget: 3600,
    threeStarBudget: 750,
    twoStarBudget: 375,
    leftStation: { x: 45, y: 360 },
    rightPlatform: { x: 740, y: 270 },
    anchors: [
      { id: 'a1', x: 85, y: 360, cliff: 'left', label: 'Salida' },
      { id: 'a2', x: 85, y: 460, cliff: 'left', label: 'Base Roca' },
      { id: 'a3', x: 705, y: 270, cliff: 'right', label: 'Llegada' },
      { id: 'a4', x: 705, y: 140, cliff: 'right', label: 'Torre Alta' },
      { id: 'a5', x: 705, y: 440, cliff: 'right', label: 'Base Roca' },
    ],
    terrain: {
      leftEdge: [
        { x: 0, y: 360 },
        { x: 85, y: 360 },
        { x: 85, y: 560 },
        { x: 0, y: 560 },
      ],
      rightEdge: [
        { x: 705, y: 270 },
        { x: 800, y: 270 },
        { x: 800, y: 560 },
        { x: 705, y: 560 },
      ],
      waterY: 530,
    },
    cargos: [
      { id: 'c1', name: 'Caja Fuerte de Wolframio', type: 'safe', x: 740, y: 270, weight: 820, color: '#334155' },
    ],
    workersCount: 1,
    tips: 'La inclinación excesiva provocará que el obrero no pueda empujar la carga. Construye una rampa suave y firme.',
  },
  {
    id: 26,
    title: 'Nivel 26: El Arco del Vacío',
    subtitle: 'Vano: 630 px | Carga: 860 kg | Sin Anclajes Elevados',
    description: 'Paredes verticales de roca lisa sin anclajes superiores. No hay torres para cables: debes construir un arco inferior a compresión.',
    budget: 3750,
    threeStarBudget: 780,
    twoStarBudget: 390,
    leftStation: { x: 45, y: 310 },
    rightPlatform: { x: 760, y: 310 },
    anchors: [
      { id: 'a1', x: 80, y: 310, cliff: 'left', label: 'Tablero Izq' },
      { id: 'a2', x: 80, y: 420, cliff: 'left', label: 'Apoyo Izq 1' },
      { id: 'a3', x: 80, y: 500, cliff: 'left', label: 'Apoyo Izq 2' },
      { id: 'a4', x: 710, y: 310, cliff: 'right', label: 'Tablero Der' },
      { id: 'a5', x: 710, y: 420, cliff: 'right', label: 'Apoyo Der 1' },
      { id: 'a6', x: 710, y: 500, cliff: 'right', label: 'Apoyo Der 2' },
    ],
    terrain: {
      leftEdge: [
        { x: 0, y: 310 },
        { x: 80, y: 310 },
        { x: 80, y: 560 },
        { x: 0, y: 560 },
      ],
      rightEdge: [
        { x: 710, y: 310 },
        { x: 800, y: 310 },
        { x: 800, y: 560 },
        { x: 710, y: 560 },
      ],
      waterY: 530,
    },
    cargos: [
      { id: 'c1', name: 'Mamut Blindado', type: 'elephant', x: 730, y: 310, weight: 500, color: '#475569' },
      { id: 'c2', name: 'Yunque de Titanio', type: 'anvil', x: 760, y: 310, weight: 360, color: '#1e293b' },
    ],
    workersCount: 2,
    tips: 'Un arco invertido de acero con montantes verticales transfiere el esfuerzo cortante hacia los apoyos inferiores de roca.',
  },
  {
    id: 27,
    title: 'Nivel 27: La Gran Caravana',
    subtitle: 'Vano: 640 px | Carga: 900 kg | 4 Operarios en Marcha',
    description: 'Cuatro operarios cruzándose en simultáneo con 225 kg cada uno. La carga distribuida móvil provoca flexión y pandeo continuos.',
    budget: 3950,
    threeStarBudget: 800,
    twoStarBudget: 400,
    leftStation: { x: 45, y: 310 },
    rightPlatform: { x: 760, y: 310 },
    anchors: [
      { id: 'a1', x: 75, y: 310, cliff: 'left', label: 'Tablero' },
      { id: 'a2', x: 75, y: 130, cliff: 'left', label: 'Torre Izq' },
      { id: 'a3', x: 75, y: 450, cliff: 'left', label: 'Zapata Izq' },
      { id: 'a4', x: 715, y: 310, cliff: 'right', label: 'Tablero' },
      { id: 'a5', x: 715, y: 130, cliff: 'right', label: 'Torre Der' },
      { id: 'a6', x: 715, y: 450, cliff: 'right', label: 'Zapata Der' },
    ],
    terrain: {
      leftEdge: [
        { x: 0, y: 310 },
        { x: 75, y: 310 },
        { x: 75, y: 560 },
        { x: 0, y: 560 },
      ],
      rightEdge: [
        { x: 715, y: 310 },
        { x: 800, y: 310 },
        { x: 800, y: 560 },
        { x: 715, y: 560 },
      ],
      waterY: 530,
    },
    cargos: [
      { id: 'c1', name: 'Oro Imperial', type: 'gold', x: 730, y: 310, weight: 225, color: '#eab308' },
      { id: 'c2', name: 'Caja Blindada', type: 'safe', x: 750, y: 310, weight: 225, color: '#334155' },
      { id: 'c3', name: 'Cilindro de Gas', type: 'barrel', x: 770, y: 310, weight: 225, color: '#0284c7' },
      { id: 'c4', name: 'Bloque de Forja', type: 'anvil', x: 790, y: 310, weight: 225, color: '#1e293b' },
    ],
    workersCount: 4,
    tips: 'La sobrecarga dinámica de 4 operarios exige un cordón inferior de acero continuo y tirantes cruzados para rigidizar.',
  },
  {
    id: 28,
    title: 'Nivel 28: La Falla de los Dos Pilares',
    subtitle: 'Vano: 650 px | Carga: 950 kg | 2 Pilares Sumergidos',
    description: 'Dos pilares emergen de las aguas turbulentas. Un operario debe trasladar un Generador Magnético de 950 kg.',
    budget: 4200,
    threeStarBudget: 850,
    twoStarBudget: 425,
    leftStation: { x: 45, y: 310 },
    rightPlatform: { x: 760, y: 310 },
    anchors: [
      { id: 'a1', x: 70, y: 310, cliff: 'left', label: 'Estación Izq' },
      { id: 'a2', x: 70, y: 430, cliff: 'left', label: 'Cimiento Izq' },
      { id: 'a3', x: 270, y: 310, cliff: 'pillar', label: 'Pilar 1 Sup' },
      { id: 'a4', x: 270, y: 430, cliff: 'pillar', label: 'Pilar 1 Inf' },
      { id: 'a5', x: 520, y: 310, cliff: 'pillar', label: 'Pilar 2 Sup' },
      { id: 'a6', x: 520, y: 430, cliff: 'pillar', label: 'Pilar 2 Inf' },
      { id: 'a7', x: 720, y: 310, cliff: 'right', label: 'Estación Der' },
      { id: 'a8', x: 720, y: 430, cliff: 'right', label: 'Cimiento Der' },
    ],
    terrain: {
      leftEdge: [
        { x: 0, y: 310 },
        { x: 70, y: 310 },
        { x: 70, y: 560 },
        { x: 0, y: 560 },
      ],
      rightEdge: [
        { x: 720, y: 310 },
        { x: 800, y: 310 },
        { x: 800, y: 560 },
        { x: 720, y: 560 },
      ],
      waterY: 530,
      pillars: [
        { x: 255, y: 310, width: 30, height: 250 },
        { x: 505, y: 310, width: 30, height: 250 },
      ],
    },
    cargos: [
      { id: 'c1', name: 'Generador Magnético Industrial', type: 'safe', x: 750, y: 310, weight: 950, color: '#334155' },
    ],
    workersCount: 1,
    tips: 'Une los tres tramos creando cerchas independientes sobre cada pilar para amortiguar la flecha y evitar el pandeo.',
  },
  {
    id: 29,
    title: 'Nivel 29: El Desfiladero del Titán',
    subtitle: 'Vano: 660 px | Carga: 1.050 kg | Catenaria Mixta',
    description: 'Vano colosal de 660 px sobre un abismo sin fondo. Dos operarios trasladan una carga conjunta de 1.050 kg (Elefante Ancestral + Cofre de Oro).',
    budget: 4500,
    threeStarBudget: 900,
    twoStarBudget: 450,
    leftStation: { x: 50, y: 310 },
    rightPlatform: { x: 760, y: 310 },
    anchors: [
      { id: 'a1', x: 65, y: 310, cliff: 'left', label: 'Tablero' },
      { id: 'a2', x: 65, y: 120, cliff: 'left', label: 'Torre Alta Izq' },
      { id: 'a3', x: 65, y: 460, cliff: 'left', label: 'Roca Profunda' },
      { id: 'a4', x: 725, y: 310, cliff: 'right', label: 'Tablero' },
      { id: 'a5', x: 725, y: 120, cliff: 'right', label: 'Torre Alta Der' },
      { id: 'a6', x: 725, y: 460, cliff: 'right', label: 'Roca Profunda' },
    ],
    terrain: {
      leftEdge: [
        { x: 0, y: 310 },
        { x: 65, y: 310 },
        { x: 65, y: 560 },
        { x: 0, y: 560 },
      ],
      rightEdge: [
        { x: 725, y: 310 },
        { x: 800, y: 310 },
        { x: 800, y: 560 },
        { x: 725, y: 560 },
      ],
      waterY: 530,
    },
    cargos: [
      { id: 'c1', name: 'Mega-Elefante Ancestral', type: 'elephant', x: 745, y: 310, weight: 700, color: '#475569' },
      { id: 'c2', name: 'Cofre del Faraón', type: 'gold', x: 775, y: 310, weight: 350, color: '#eab308' },
    ],
    workersCount: 2,
    tips: 'Diseña una catenaria de cables superior unida con péndolas a una cercha inferior de acero tipo Warren.',
  },
  {
    id: 30,
    title: 'Nivel 30: El Desafío Definitivo de Estructuras ESO',
    subtitle: 'Vano: 675 px | Carga: 1.200 kg | Máxima Dificultad',
    description: 'La prueba maestra final: 675 px de abismo y 1.200 kg de carga (Coloso Blindado 700 kg + Reactor de Uranio 500 kg). ¡Aplica todos los principios de la ESO!',
    budget: 4900,
    threeStarBudget: 1000,
    twoStarBudget: 500,
    leftStation: { x: 50, y: 310 },
    rightPlatform: { x: 760, y: 310 },
    anchors: [
      { id: 'a1', x: 60, y: 310, cliff: 'left', label: 'Tablero' },
      { id: 'a2', x: 60, y: 110, cliff: 'left', label: 'Gran Torre Izq' },
      { id: 'a3', x: 60, y: 470, cliff: 'left', label: 'Base Roca Izq' },
      { id: 'a4', x: 735, y: 310, cliff: 'right', label: 'Tablero' },
      { id: 'a5', x: 735, y: 110, cliff: 'right', label: 'Gran Torre Der' },
      { id: 'a6', x: 735, y: 470, cliff: 'right', label: 'Base Roca Der' },
    ],
    terrain: {
      leftEdge: [
        { x: 0, y: 310 },
        { x: 60, y: 310 },
        { x: 60, y: 560 },
        { x: 0, y: 560 },
      ],
      rightEdge: [
        { x: 735, y: 310 },
        { x: 800, y: 310 },
        { x: 800, y: 560 },
        { x: 735, y: 560 },
      ],
      waterY: 530,
    },
    cargos: [
      { id: 'c1', name: 'Coloso Blindado', type: 'elephant', x: 750, y: 310, weight: 700, color: '#334155' },
      { id: 'c2', name: 'Reactor de Uranio', type: 'safe', x: 780, y: 310, weight: 500, color: '#1e293b' },
    ],
    workersCount: 2,
    tips: 'La obra maestra de la ESO: triangula estrictamente sin barras superfluas, aprovecha los cables para tracción y el acero para compresión.',
  },
  {
    id: 31,
    title: 'Nivel 31: La Garganta de Titanio',
    subtitle: 'Vano: 685 px | Carga: 1.350 kg | Presupuesto Ajustado',
    description: 'Vano colosal de 685 px y 1.350 kg de carga con presupuesto muy austero ($3.500). El uso de acero innecesario agotará tus fondos de inmediato.',
    budget: 3500,
    threeStarBudget: 750,
    twoStarBudget: 350,
    leftStation: { x: 50, y: 310 },
    rightPlatform: { x: 760, y: 310 },
    anchors: [
      { id: 'a1', x: 55, y: 310, cliff: 'left', label: 'Tablero Izq' },
      { id: 'a2', x: 55, y: 100, cliff: 'left', label: 'Torre Izq' },
      { id: 'a3', x: 55, y: 470, cliff: 'left', label: 'Zapata Izq' },
      { id: 'a4', x: 740, y: 310, cliff: 'right', label: 'Tablero Der' },
      { id: 'a5', x: 740, y: 100, cliff: 'right', label: 'Torre Der' },
      { id: 'a6', x: 740, y: 470, cliff: 'right', label: 'Zapata Der' },
    ],
    terrain: {
      leftEdge: [
        { x: 0, y: 310 },
        { x: 55, y: 310 },
        { x: 55, y: 560 },
        { x: 0, y: 560 },
      ],
      rightEdge: [
        { x: 740, y: 310 },
        { x: 800, y: 310 },
        { x: 800, y: 560 },
        { x: 740, y: 560 },
      ],
      waterY: 530,
    },
    cargos: [
      { id: 'c1', name: 'Mamut Titán', type: 'elephant', x: 755, y: 310, weight: 800, color: '#475569' },
      { id: 'c2', name: 'Lingotes de Tungsteno', type: 'safe', x: 785, y: 310, weight: 550, color: '#1e293b' },
    ],
    workersCount: 2,
    tips: 'Los cables de suspensión son 2,7 veces más baratos que el acero por metro: úsalos para absorber tracción y reserva el acero solo para el cordón comprimido.',
  },
  {
    id: 32,
    title: 'Nivel 32: El Cañón de las Tres Turbinas',
    subtitle: 'Vano: 690 px | Carga: 1.500 kg | 3 Operarios Concurrentes',
    description: 'Tres operarios cruzan simultáneamente transportando turbinas industriales pesadas (1.500 kg en movimiento total). Presupuesto estricto de $3.650.',
    budget: 3650,
    threeStarBudget: 800,
    twoStarBudget: 400,
    leftStation: { x: 50, y: 310 },
    rightPlatform: { x: 760, y: 310 },
    anchors: [
      { id: 'a1', x: 55, y: 310, cliff: 'left', label: 'Tablero Izq' },
      { id: 'a2', x: 55, y: 95, cliff: 'left', label: 'Torre Alta Izq' },
      { id: 'a3', x: 55, y: 470, cliff: 'left', label: 'Roca Inf Izq' },
      { id: 'a4', x: 745, y: 310, cliff: 'right', label: 'Tablero Der' },
      { id: 'a5', x: 745, y: 95, cliff: 'right', label: 'Torre Alta Der' },
      { id: 'a6', x: 745, y: 470, cliff: 'right', label: 'Roca Inf Der' },
    ],
    terrain: {
      leftEdge: [
        { x: 0, y: 310 },
        { x: 55, y: 310 },
        { x: 55, y: 560 },
        { x: 0, y: 560 },
      ],
      rightEdge: [
        { x: 745, y: 310 },
        { x: 800, y: 310 },
        { x: 800, y: 560 },
        { x: 745, y: 560 },
      ],
      waterY: 530,
    },
    cargos: [
      { id: 'c1', name: 'Turbina Hidráulica Alfa', type: 'barrel', x: 750, y: 310, weight: 500, color: '#0284c7' },
      { id: 'c2', name: 'Turbina Hidráulica Beta', type: 'barrel', x: 770, y: 310, weight: 500, color: '#0369a1' },
      { id: 'c3', name: 'Turbina Hidráulica Gamma', type: 'barrel', x: 790, y: 310, weight: 500, color: '#075985' },
    ],
    workersCount: 3,
    tips: 'La carga móvil simultánea exige una viga Warren con montantes verticales que impida la rotura cuando los 3 obreros coincidan.',
  },
  {
    id: 33,
    title: 'Nivel 33: El Monolito Megalítico',
    subtitle: 'Vano: 695 px | Carga: 1.650 kg | Carga Puntual Concentrada',
    description: 'Un único operario debe cruzar con un bloque monumental de 1.650 kg. El momento flector en el centro del vano superará cualquier límite sin cables tensores.',
    budget: 3750,
    threeStarBudget: 850,
    twoStarBudget: 425,
    leftStation: { x: 50, y: 310 },
    rightPlatform: { x: 760, y: 310 },
    anchors: [
      { id: 'a1', x: 50, y: 310, cliff: 'left', label: 'Tablero Izq' },
      { id: 'a2', x: 50, y: 90, cliff: 'left', label: 'Pilón Izq Alto' },
      { id: 'a3', x: 50, y: 480, cliff: 'left', label: 'Cimiento Izq' },
      { id: 'a4', x: 745, y: 310, cliff: 'right', label: 'Tablero Der' },
      { id: 'a5', x: 745, y: 90, cliff: 'right', label: 'Pilón Der Alto' },
      { id: 'a6', x: 745, y: 480, cliff: 'right', label: 'Cimiento Der' },
    ],
    terrain: {
      leftEdge: [
        { x: 0, y: 310 },
        { x: 50, y: 310 },
        { x: 50, y: 560 },
        { x: 0, y: 560 },
      ],
      rightEdge: [
        { x: 745, y: 310 },
        { x: 800, y: 310 },
        { x: 800, y: 560 },
        { x: 745, y: 560 },
      ],
      waterY: 530,
    },
    cargos: [
      { id: 'c1', name: 'Monolito Megalítico de Basalto', type: 'safe', x: 755, y: 310, weight: 1650, color: '#334155' },
    ],
    workersCount: 1,
    tips: 'Transfiere la carga concentrada del centro mediante una red en abanico de cables hacia las torres elevadas de ambos extremos.',
  },
  {
    id: 34,
    title: 'Nivel 34: El Estrecho de los Dos Colosos',
    subtitle: 'Vano: 700 px | Carga: 1.800 kg | Pilar Central Estrecho',
    description: 'Vano colosal de 700 px dividido por una aguja de roca central (x: 400). Dos Mamuts de 900 kg generarán un violento momento flector negativo.',
    budget: 3850,
    threeStarBudget: 900,
    twoStarBudget: 450,
    leftStation: { x: 50, y: 310 },
    rightPlatform: { x: 760, y: 310 },
    anchors: [
      { id: 'a1', x: 50, y: 310, cliff: 'left', label: 'Tablero Izq' },
      { id: 'a2', x: 50, y: 440, cliff: 'left', label: 'Base Izq' },
      { id: 'a3', x: 400, y: 310, cliff: 'pillar', label: 'Pilar Sup' },
      { id: 'a4', x: 400, y: 440, cliff: 'pillar', label: 'Pilar Inf' },
      { id: 'a5', x: 750, y: 310, cliff: 'right', label: 'Tablero Der' },
      { id: 'a6', x: 750, y: 440, cliff: 'right', label: 'Base Der' },
    ],
    terrain: {
      leftEdge: [
        { x: 0, y: 310 },
        { x: 50, y: 310 },
        { x: 50, y: 560 },
        { x: 0, y: 560 },
      ],
      rightEdge: [
        { x: 750, y: 310 },
        { x: 800, y: 310 },
        { x: 800, y: 560 },
        { x: 750, y: 560 },
      ],
      waterY: 530,
      pillars: [{ x: 385, y: 310, width: 30, height: 250 }],
    },
    cargos: [
      { id: 'c1', name: 'Mamut de Asedio 1', type: 'elephant', x: 755, y: 310, weight: 900, color: '#475569' },
      { id: 'c2', name: 'Mamut de Asedio 2', type: 'elephant', x: 785, y: 310, weight: 900, color: '#334155' },
    ],
    workersCount: 2,
    tips: 'Sobre el pilar central la fibra superior sufre tracción y la inferior compresión: triangula sólidamente para soportar los momentos negativos.',
  },
  {
    id: 35,
    title: 'Nivel 35: El Risco del Osmio',
    subtitle: 'Vano: 700 px | Carga: 1.950 kg | Gran Desnivel (90 px)',
    description: 'Desnivel ascendente extremo: partida a Y=350 y plataforma a Y=260. Remontar 1.950 kg exige rigidez total frente al rozamiento y la gravedad.',
    budget: 3950,
    threeStarBudget: 950,
    twoStarBudget: 475,
    leftStation: { x: 50, y: 350 },
    rightPlatform: { x: 760, y: 260 },
    anchors: [
      { id: 'a1', x: 50, y: 350, cliff: 'left', label: 'Salida' },
      { id: 'a2', x: 50, y: 460, cliff: 'left', label: 'Base Roca' },
      { id: 'a3', x: 750, y: 260, cliff: 'right', label: 'Llegada' },
      { id: 'a4', x: 750, y: 90, cliff: 'right', label: 'Torre Alta' },
      { id: 'a5', x: 750, y: 440, cliff: 'right', label: 'Base Roca' },
    ],
    terrain: {
      leftEdge: [
        { x: 0, y: 350 },
        { x: 50, y: 350 },
        { x: 50, y: 560 },
        { x: 0, y: 560 },
      ],
      rightEdge: [
        { x: 750, y: 260 },
        { x: 800, y: 260 },
        { x: 800, y: 560 },
        { x: 750, y: 560 },
      ],
      waterY: 530,
    },
    cargos: [
      { id: 'c1', name: 'Caja Fuerte de Osmio', type: 'safe', x: 755, y: 260, weight: 1950, color: '#1e293b' },
    ],
    workersCount: 1,
    tips: 'Una pendiente rectilínea y uniforme sin irregularidades evitará que la sobrecarga de 1.950 kg detenga al operario en la subida.',
  },
  {
    id: 36,
    title: 'Nivel 36: El Abismo Sin Torres',
    subtitle: 'Vano: 705 px | Carga: 2.100 kg | Cero Anclajes Altos',
    description: 'Paredes verticales de roca lisa sin anclajes superiores ni torres para cables. Debes construir un arco inferior a compresión pura de 705 px para 2.100 kg.',
    budget: 4050,
    threeStarBudget: 950,
    twoStarBudget: 475,
    leftStation: { x: 50, y: 310 },
    rightPlatform: { x: 760, y: 310 },
    anchors: [
      { id: 'a1', x: 45, y: 310, cliff: 'left', label: 'Tablero Izq' },
      { id: 'a2', x: 45, y: 410, cliff: 'left', label: 'Zapata 1' },
      { id: 'a3', x: 45, y: 500, cliff: 'left', label: 'Zapata 2' },
      { id: 'a4', x: 750, y: 310, cliff: 'right', label: 'Tablero Der' },
      { id: 'a5', x: 750, y: 410, cliff: 'right', label: 'Zapata 1' },
      { id: 'a6', x: 750, y: 500, cliff: 'right', label: 'Zapata 2' },
    ],
    terrain: {
      leftEdge: [
        { x: 0, y: 310 },
        { x: 45, y: 310 },
        { x: 45, y: 560 },
        { x: 0, y: 560 },
      ],
      rightEdge: [
        { x: 750, y: 310 },
        { x: 800, y: 310 },
        { x: 800, y: 560 },
        { x: 750, y: 560 },
      ],
      waterY: 530,
    },
    cargos: [
      { id: 'c1', name: 'Mamut Blindado Supremo', type: 'elephant', x: 755, y: 310, weight: 1200, color: '#475569' },
      { id: 'c2', name: 'Yunque de Forja Gigante', type: 'anvil', x: 785, y: 310, weight: 900, color: '#1e293b' },
    ],
    workersCount: 2,
    tips: 'Sin torres para cables, la única solución es un arco inferior parabólico de acero que transmita la compresión a los anclajes de roca profunda.',
  },
  {
    id: 37,
    title: 'Nivel 37: La Caravana Pesada Industrial',
    subtitle: 'Vano: 705 px | Carga: 2.250 kg | 4 Operarios en Marcha',
    description: 'Cuatro operarios en marcha continua transportando 2.250 kg. El riesgo de pandeo lateral y deformación ondulante es extremo con presupuesto de $4.150.',
    budget: 4150,
    threeStarBudget: 1000,
    twoStarBudget: 500,
    leftStation: { x: 50, y: 310 },
    rightPlatform: { x: 760, y: 310 },
    anchors: [
      { id: 'a1', x: 45, y: 310, cliff: 'left', label: 'Tablero' },
      { id: 'a2', x: 45, y: 90, cliff: 'left', label: 'Torre Izq' },
      { id: 'a3', x: 45, y: 460, cliff: 'left', label: 'Base Izq' },
      { id: 'a4', x: 750, y: 310, cliff: 'right', label: 'Tablero' },
      { id: 'a5', x: 750, y: 90, cliff: 'right', label: 'Torre Der' },
      { id: 'a6', x: 750, y: 460, cliff: 'right', label: 'Base Der' },
    ],
    terrain: {
      leftEdge: [
        { x: 0, y: 310 },
        { x: 45, y: 310 },
        { x: 45, y: 560 },
        { x: 0, y: 560 },
      ],
      rightEdge: [
        { x: 750, y: 310 },
        { x: 800, y: 310 },
        { x: 800, y: 560 },
        { x: 750, y: 560 },
      ],
      waterY: 530,
    },
    cargos: [
      { id: 'c1', name: 'Caja Blindada 1', type: 'safe', x: 750, y: 310, weight: 562, color: '#334155' },
      { id: 'c2', name: 'Caja Blindada 2', type: 'safe', x: 765, y: 310, weight: 562, color: '#475569' },
      { id: 'c3', name: 'Caja Blindada 3', type: 'safe', x: 780, y: 310, weight: 562, color: '#64748b' },
      { id: 'c4', name: 'Caja Blindada 4', type: 'safe', x: 795, y: 310, weight: 564, color: '#94a3b8' },
    ],
    workersCount: 4,
    tips: 'Triangulación estricta sin barras superfluas: el cruce de San Andrés central absorbe la inversión de esfuerzos cortantes.',
  },
  {
    id: 38,
    title: 'Nivel 38: La Garganta del Reactor Nuclear',
    subtitle: 'Vano: 710 px | Carga: 2.400 kg | 2 Pilares Sumergidos',
    description: 'Dos pilares en aguas profundas soportan un puente de tres tramos continuo para una masa colosal de 2.400 kg. Presupuesto ajustado de $4.200.',
    budget: 4200,
    threeStarBudget: 1050,
    twoStarBudget: 525,
    leftStation: { x: 50, y: 310 },
    rightPlatform: { x: 760, y: 310 },
    anchors: [
      { id: 'a1', x: 45, y: 310, cliff: 'left', label: 'Estación Izq' },
      { id: 'a2', x: 45, y: 440, cliff: 'left', label: 'Cimiento Izq' },
      { id: 'a3', x: 275, y: 310, cliff: 'pillar', label: 'Pilar 1 Sup' },
      { id: 'a4', x: 275, y: 440, cliff: 'pillar', label: 'Pilar 1 Inf' },
      { id: 'a5', x: 525, y: 310, cliff: 'pillar', label: 'Pilar 2 Sup' },
      { id: 'a6', x: 525, y: 440, cliff: 'pillar', label: 'Pilar 2 Inf' },
      { id: 'a7', x: 755, y: 310, cliff: 'right', label: 'Estación Der' },
      { id: 'a8', x: 755, y: 440, cliff: 'right', label: 'Cimiento Der' },
    ],
    terrain: {
      leftEdge: [
        { x: 0, y: 310 },
        { x: 45, y: 310 },
        { x: 45, y: 560 },
        { x: 0, y: 560 },
      ],
      rightEdge: [
        { x: 755, y: 310 },
        { x: 800, y: 310 },
        { x: 800, y: 560 },
        { x: 755, y: 560 },
      ],
      waterY: 530,
      pillars: [
        { x: 260, y: 310, width: 30, height: 250 },
        { x: 510, y: 310, width: 30, height: 250 },
      ],
    },
    cargos: [
      { id: 'c1', name: 'Reactor Nuclear Blindado', type: 'safe', x: 755, y: 310, weight: 2400, color: '#1e293b' },
    ],
    workersCount: 1,
    tips: 'Convierte los dos pilares en apoyos triangulares ménsula para acortar el tramo central suspendido y reducir la flexión.',
  },
  {
    id: 39,
    title: 'Nivel 39: El Vano de los Dos Titanes',
    subtitle: 'Vano: 710 px | Carga: 2.600 kg | Catenaria Mixta',
    description: '710 px de abismo total sin apoyos intermedios y 2,6 toneladas de carga (Mega-Mamut 1.600 kg + Arca de Oro 1.000 kg). Presupuesto rígido de $4.250.',
    budget: 4250,
    threeStarBudget: 1100,
    twoStarBudget: 550,
    leftStation: { x: 50, y: 310 },
    rightPlatform: { x: 760, y: 310 },
    anchors: [
      { id: 'a1', x: 45, y: 310, cliff: 'left', label: 'Tablero' },
      { id: 'a2', x: 45, y: 85, cliff: 'left', label: 'Torre Alta Izq' },
      { id: 'a3', x: 45, y: 470, cliff: 'left', label: 'Roca Profunda' },
      { id: 'a4', x: 755, y: 310, cliff: 'right', label: 'Tablero' },
      { id: 'a5', x: 755, y: 85, cliff: 'right', label: 'Torre Alta Der' },
      { id: 'a6', x: 755, y: 470, cliff: 'right', label: 'Roca Profunda' },
    ],
    terrain: {
      leftEdge: [
        { x: 0, y: 310 },
        { x: 45, y: 310 },
        { x: 45, y: 560 },
        { x: 0, y: 560 },
      ],
      rightEdge: [
        { x: 755, y: 310 },
        { x: 800, y: 310 },
        { x: 800, y: 560 },
        { x: 755, y: 560 },
      ],
      waterY: 530,
    },
    cargos: [
      { id: 'c1', name: 'Mega-Mamut Ancestral', type: 'elephant', x: 755, y: 310, weight: 1600, color: '#475569' },
      { id: 'c2', name: 'Arca de Oro Macizo', type: 'gold', x: 785, y: 310, weight: 1000, color: '#eab308' },
    ],
    workersCount: 2,
    tips: 'Sistema mixto arpa/catenaria: los cables principales transmiten toda la tracción a los pilones y el acero asegura la indeformabilidad.',
  },
  {
    id: 40,
    title: 'Nivel 40: La Cima de la Ingeniería Estructural ESO',
    subtitle: 'Vano: 715 px | Carga: 2.800 kg | Máxima Dificultad y Presupuesto Crítico',
    description: 'La prueba legendaria definitiva: 715 px de luz libre, 2.800 kg de carga (Coloso Imperial 1.700 kg + Generador de Neutrones 1.100 kg) y presupuesto implacable ($4.350). Solo la ingeniería perfecta triunfará.',
    budget: 4350,
    threeStarBudget: 1150,
    twoStarBudget: 575,
    leftStation: { x: 45, y: 310 },
    rightPlatform: { x: 760, y: 310 },
    anchors: [
      { id: 'a1', x: 40, y: 310, cliff: 'left', label: 'Tablero' },
      { id: 'a2', x: 40, y: 80, cliff: 'left', label: 'Cima Torre Izq' },
      { id: 'a3', x: 40, y: 480, cliff: 'left', label: 'Base Roca Izq' },
      { id: 'a4', x: 755, y: 310, cliff: 'right', label: 'Tablero' },
      { id: 'a5', x: 755, y: 80, cliff: 'right', label: 'Cima Torre Der' },
      { id: 'a6', x: 755, y: 480, cliff: 'right', label: 'Base Roca Der' },
    ],
    terrain: {
      leftEdge: [
        { x: 0, y: 310 },
        { x: 40, y: 310 },
        { x: 40, y: 560 },
        { x: 0, y: 560 },
      ],
      rightEdge: [
        { x: 755, y: 310 },
        { x: 800, y: 310 },
        { x: 800, y: 560 },
        { x: 755, y: 560 },
      ],
      waterY: 530,
    },
    cargos: [
      { id: 'c1', name: 'Coloso Imperial de Combate', type: 'elephant', x: 755, y: 310, weight: 1700, color: '#334155' },
      { id: 'c2', name: 'Generador de Neutrones', type: 'safe', x: 785, y: 310, weight: 1100, color: '#1e293b' },
    ],
    workersCount: 2,
    tips: 'La cumbre de la ESO: ni un céntimo de desperdicio. Cada barra de acero a compresión pura en los cordones y cada cable tenso a tracción pura en la catenaria.',
  },
];

const STORAGE_KEY = 'cargo_bridge_progress_v1';

// Strict rule: Level 1 is always unlocked. Level k (k > 1) is unlocked IF AND ONLY IF level k-1 was completed!
export function isLevelUnlocked(levelId: number, progress: Record<number, LevelProgress>): boolean {
  if (levelId <= 1) return true;
  // All prior levels 1..(levelId-1) must be completed
  for (let i = 1; i < levelId; i++) {
    if (!progress[i]?.completed) {
      return false;
    }
  }
  return true;
}

export function loadLevelProgress(): Record<number, LevelProgress> {
  const result: Record<number, LevelProgress> = {};

  // Initialize all levels
  LEVELS.forEach((lvl, idx) => {
    result[lvl.id] = {
      unlocked: idx === 0,
      completed: false,
      bestBudgetRemaining: 0,
      stars: 0,
    };
  });

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (typeof parsed === 'object' && parsed !== null) {
        LEVELS.forEach((lvl) => {
          const item = parsed[lvl.id] || parsed[String(lvl.id)];
          if (item) {
            result[lvl.id].completed = Boolean(item.completed);
            result[lvl.id].bestBudgetRemaining = typeof item.bestBudgetRemaining === 'number' ? Math.max(0, item.bestBudgetRemaining) : 0;
            result[lvl.id].stars = typeof item.stars === 'number' ? Math.min(3, Math.max(0, item.stars)) : (item.completed ? 1 : 0);
          }
        });
      }
    }
  } catch {
    // fallback
  }

  // Re-enforce strictly calculated sequential unlocks
  result[1].unlocked = true;
  for (let i = 2; i <= LEVELS.length; i++) {
    result[i].unlocked = isLevelUnlocked(i, result);
  }

  return result;
}

export function saveLevelProgress(
  levelId: number,
  budgetRemaining: number,
  threeStarBudget: number,
  twoStarBudget: number
): { stars: number; isNewRecord: boolean; nextProgress: Record<number, LevelProgress> } {
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

  // Re-calculate unlocks sequentially for all levels
  current[1].unlocked = true;
  for (let i = 2; i <= LEVELS.length; i++) {
    current[i].unlocked = isLevelUnlocked(i, current);
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch {
    // ignore
  }

  return { stars, isNewRecord, nextProgress: current };
}

// Export progress to downloadable JSON string
export function exportProgressAsJSON(progress: Record<number, LevelProgress>): string {
  let completedCount = 0;
  let totalStars = 0;
  let totalSaved = 0;

  Object.entries(progress).forEach(([_, p]) => {
    if (p.completed) {
      completedCount++;
      totalStars += p.stars || 0;
      totalSaved += p.bestBudgetRemaining || 0;
    }
  });

  const payload = {
    game: 'Cargo Bridge Master',
    version: 1,
    savedAt: new Date().toISOString(),
    stats: {
      completedLevels: completedCount,
      totalLevels: LEVELS.length,
      totalStars,
      totalBudgetSaved: totalSaved,
    },
    progress,
  };

  return JSON.stringify(payload, null, 2);
}

// Import progress from uploaded JSON string
export function importProgressFromJSON(jsonString: string): {
  success: boolean;
  progress?: Record<number, LevelProgress>;
  error?: string;
  completedCount?: number;
  totalStars?: number;
} {
  try {
    const data = JSON.parse(jsonString);
    const raw = data.progress || data;
    if (typeof raw !== 'object' || raw === null) {
      return { success: false, error: 'El archivo JSON no tiene una estructura de progreso válida.' };
    }

    const clean: Record<number, LevelProgress> = {};
    let completedCount = 0;
    let totalStars = 0;

    LEVELS.forEach((lvl, idx) => {
      const item = raw[lvl.id] || raw[String(lvl.id)];
      const completed = Boolean(item?.completed);
      const stars = typeof item?.stars === 'number' ? Math.min(3, Math.max(0, item.stars)) : (completed ? 1 : 0);
      const bestBudgetRemaining = typeof item?.bestBudgetRemaining === 'number' ? Math.max(0, item.bestBudgetRemaining) : 0;

      if (completed) {
        completedCount++;
        totalStars += stars;
      }

      clean[lvl.id] = {
        unlocked: idx === 0,
        completed,
        bestBudgetRemaining,
        stars,
      };
    });

    // Enforce strict sequential unlocking
    clean[1].unlocked = true;
    for (let i = 2; i <= LEVELS.length; i++) {
      clean[i].unlocked = isLevelUnlocked(i, clean);
    }

    // Persist to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clean));

    return {
      success: true,
      progress: clean,
      completedCount,
      totalStars,
    };
  } catch {
    return {
      success: false,
      error: 'No se pudo leer el archivo. Asegúrate de que sea un archivo .json válido.',
    };
  }
}
