export type Fuse = {
  id: string;
  name: string;
  color: string; // hex
  icon: string;  // path to small image
};

export type Champion = {
  id: string;
  name: string;
  thumbnail: string; // pequeña
  image: string;     // grande
  archetype: string; // tipo de luchador
  // Los fuses ahora se seleccionan por equipo, no por campeón
};


// Helper para obtener un fuse por ID
export const getFuseById = (id: string): Fuse | undefined => {
  return FUSES.find(fuse => fuse.id === id);
};

// Helper para generar placeholder images
const generatePlaceholder = (name: string, width: number = 400, height: number = 400) => {
  // Usar picsum.photos con un seed basado en el nombre para consistencia
  const seed = name.toLowerCase().replace(/\s+/g, '');
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
};

// Fuses oficiales de 2XKO
export const FUSES: Fuse[] = [
  { id: '2xassist', name: '2XAssist', color: '#4CAF50', icon: generatePlaceholder('2xassist', 64, 64) },
  { id: 'double-down', name: 'Double Down', color: '#FF5722', icon: generatePlaceholder('double-down', 64, 64) },
  { id: 'freestyle', name: 'Freestyle', color: '#9C27B0', icon: generatePlaceholder('freestyle', 64, 64) },
  { id: 'sidekick', name: 'Sidekick', color: '#2196F3', icon: generatePlaceholder('sidekick', 64, 64) },
  { id: 'juggernaut', name: 'Juggernaut', color: '#FF9800', icon: generatePlaceholder('juggernaut', 64, 64) },
];

export const PL_CHARACTERS = [
  {
    id: 'ahri',
    name: "Ahri",
    archetype: "Rushdown",
    thumbnail: generatePlaceholder("ahri", 200, 200),
    image: generatePlaceholder("ahri", 600, 600)
  },
  {
    id: 'darius',
    name: "Darius",
    archetype: "Striker",
    thumbnail: generatePlaceholder("darius", 200, 200),
    image: generatePlaceholder("darius", 600, 600)
  },
  {
    id: 'ekko',
    name: "Ekko",
    archetype: "Mixup",
    thumbnail: generatePlaceholder("ekko", 200, 200),
    image: generatePlaceholder("ekko", 600, 600)
  },
  {
    id: 'illaoi',
    name: "Illaoi",
    archetype: "Bruiser",
    thumbnail: generatePlaceholder("illaoi", 200, 200),
    image: generatePlaceholder("illaoi", 600, 600)
  },
  {
    id: 'yasuo',
    name: "Yasuo",
    archetype: "All-Rounder",
    thumbnail: generatePlaceholder("yasuo", 200, 200),
    image: generatePlaceholder("yasuo", 600, 600)
  },
  {
    id: 'braum',
    name: "Braum",
    archetype: "Bruiser",
    thumbnail: generatePlaceholder("braum", 200, 200),
    image: generatePlaceholder("braum", 600, 600)
  },
  {
    id: 'jinx',
    name: "Jinx",
    archetype: "Zoner",
    thumbnail: generatePlaceholder("jinx", 200, 200),
    image: generatePlaceholder("jinx", 600, 600)
  },
  {
    id: 'vi',
    name: "Vi",
    archetype: "Rushdown",
    thumbnail: generatePlaceholder("vi", 200, 200),
    image: generatePlaceholder("vi", 600, 600)
  },
  {
    id: 'blitzcrank',
    name: "Blitzcrank",
    archetype: "Grappler",
    thumbnail: generatePlaceholder("blitzcrank", 200, 200),
    image: generatePlaceholder("blitzcrank", 600, 600)
  },
  {
    id: 'teemo',
    name: "Teemo",
    archetype: "Traps",
    thumbnail: generatePlaceholder("teemo", 200, 200),
    image: generatePlaceholder("teemo", 600, 600)
  },
  {
    id: 'warwick',
    name: "Warwick",
    archetype: "Rushdown",
    thumbnail: generatePlaceholder("warwick", 200, 200),
    image: generatePlaceholder("warwick", 600, 600)
  }
];