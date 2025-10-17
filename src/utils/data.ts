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
  fuses?: Fuse[];    // fuses opcionales
};


export const PL_CHARACTERS = [
  {
    id: 'ahri',
    name: "Ahri",
    archetype: "Rushdown",
    thumbnail: "/img/frames/project-l/ahri-frame-2.png",
    image: ""
  },
  {
    id: 'darius',
    name: "Darius",
    archetype: "All-Rounder",
    thumbnail: "/img/frames/project-l/darius-frame-2.png",
    image: ""
  },
  {
    id: 'ekko',
    name: "Ekko",
    archetype: "Rushdown",
    thumbnail: "/img/frames/project-l/ekko-frame-2.png",
    image: ""
  },
  {
    id: 'illaoi',
    name: "Illaoi",
    archetype: "Power",
    thumbnail: "/img/frames/project-l/Illaoi-frame-2.png",
    image: ""
  },
  {
    id: 'yasuo',
    name: "Yasuo",
    archetype: "Midrange",
    thumbnail: "/img/frames/project-l/yasuo-frame-2.png",
    image: ""
  },
  {
    id: 'braum',
    name: "Braum",
    archetype: "Power",
    thumbnail: "/img/frames/project-l/braum-frame-2.png",
    image: ""
  },
  {
    id: 'jinx',
    name: "Jinx",
    archetype: "Zoner",
    thumbnail: "/img/frames/project-l/jinx-frame-2.png",
    image: ""
  },
  {
    id: 'vi',
    name: " Vi ",
    archetype: "Rushdown",
    thumbnail: "/img/frames/project-l/vi-frame-2.png",
    image: ""
  },
  {
    id: 'blitzcrank',
    name: "Blitzcrank",
    archetype: "Grappler",
    thumbnail: "/img/frames/project-l/blitz-frame-2.png",
    image: ""
  },
  {
    id: 'teemo',
    name: "Teemo",
    archetype: "Traps",
    thumbnail: "/img/frames/project-l/teemo-frame-2.png",
    image: ""
  },
  {
    id: 'warwick',
    name: "Warwick",
    archetype: "Rushdown",
    thumbnail: "/img/frames/project-l/warwick-frame-2.png",
    image: ""
  }
];