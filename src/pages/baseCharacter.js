export const baseCharacter = {
  infos: {
    nome: "Novo Investigador",
    jogador: "",
    ocupacao: "",
    portrait: "",
    nivel: 1,
    deslocamento: 9,
  },
  atributos: {
    forca: 1,
    agilidade: 1,
    intelecto: 1,
    presenca: 1,
    vigor: 1,
  },
  status: {
    vida: 10,
    vidaMax: 10,
    sanidade: 10,
    sanidadeMax: 10,
    esforco: 10,
    esforcoMax: 10,
  },
  pericias: {
    acrobacia: {
      bonus: 0,
      treino: "destreinado",
    },
    adestramento: {
      bonus: 0,
      treino: "destreinado",
    },
    artes: {
      bonus: 0,
      treino: "destreinado",
    },
    atletismo: {
      bonus: 0,
      treino: "destreinado",
    },
    atualidades: {
      bonus: 0,
      treino: "destreinado",
    },
    ciencias: {
      bonus: 0,
      treino: "destreinado",
    },
    crime: {
      bonus: 0,
      treino: "destreinado",
    },
    diplomacia: {
      bonus: 0,
      treino: "destreinado",
    },
    enganacao: {
      bonus: 0,
      treino: "destreinado",
    },
    fortitude: {
      bonus: 0,
      treino: "destreinado",
    },
    furtividade: {
      bonus: 0,
      treino: "destreinado",
    },
    iniciativa: {
      bonus: 0,
      treino: "destreinado",
    },
    intimidacao: {
      bonus: 0,
      treino: "destreinado",
    },
    intuicao: {
      bonus: 0,
      treino: "destreinado",
    },
    investigacao: {
      bonus: 0,
      treino: "destreinado",
    },
    luta: {
      bonus: 0,
      treino: "destreinado",
    },
    medicina: {
      bonus: 0,
      treino: "destreinado",
    },
    ocultismo: {
      bonus: 0,
      treino: "destreinado",
    },
    percepcao: {
      bonus: 0,
      treino: "destreinado",
    },
    pilotagem: {
      bonus: 0,
      treino: "destreinado",
    },
    pontaria: {
      bonus: 0,
      treino: "destreinado",
    },
    profissao: {
      bonus: 0,
      treino: "destreinado",
      type: "",
    },
    reflexos: {
      bonus: 0,
      treino: "destreinado",
    },
    religiao: {
      bonus: 0,
      treino: "destreinado",
    },
    sobrevivencia: {
      bonus: 0,
      treino: "destreinado",
    },
    tatica: {
      bonus: 0,
      treino: "destreinado",
    },
    tecnologia: {
      bonus: 0,
      treino: "destreinado",
    },
    vontade: {
      bonus: 0,
      treino: "destreinado",
    },
  },
  inventario: [],
  poderes: [],
  rituais: [],
  dados: [],
};

export const baseCreature = {
  id: null,
  name: "Nova Entidade",
  description: "",
  element: null, // Principal
  secondaryElements: [], // Outros selecionados
  type: "", // Creature, Animal, Human, etc
  size: "medio", // Small, Medium, Large, Colossal, etc
  vd: 0,
  displacement: "9m",
  stats: {
    pv: 0,
    defesa: 0,
  },
  attributes: {
    AGI: 1,
    FOR: 1,
    INT: 1,
    PRE: 1,
    VIG: 1,
  },
  presence: {
    dt: 0,
    immune: "",
    damage: "",
  },
  actions: [], // Type, Name, Description, Dices
  image: "",
  enigma: "",
  skills: {
    acrobacia: {
      dados: 0,
      bonus: 0,
    },
    adestramento: {
      dados: 0,
      bonus: 0,
    },
    artes: {
      dados: 0,
      bonus: 0,
    },
    atletismo: {
      dados: 0,
      bonus: 0,
    },
    atualidades: {
      dados: 0,
      bonus: 0,
    },
    ciencias: {
      dados: 0,
      bonus: 0,
    },
    crime: {
      dados: 0,
      bonus: 0,
    },
    diplomacia: {
      dados: 0,
      bonus: 0,
    },
    enganacao: {
      dados: 0,
      bonus: 0,
    },
    fortitude: {
      dados: 0,
      bonus: 0,
    },
    furtividade: {
      dados: 0,
      bonus: 0,
    },
    iniciativa: {
      dados: 0,
      bonus: 0,
    },
    intimidacao: {
      dados: 0,
      bonus: 0,
    },
    intuicao: {
      dados: 0,
      bonus: 0,
    },
    investigacao: {
      dados: 0,
      bonus: 0,
    },
    luta: {
      dados: 0,
      bonus: 0,
    },
    medicina: {
      dados: 0,
      bonus: 0,
    },
    ocultismo: {
      dados: 0,
      bonus: 0,
    },
    percepcao: {
      dados: 0,
      bonus: 0,
      type: "",
    },
    pilotagem: {
      dados: 0,
      bonus: 0,
    },
    pontaria: {
      dados: 0,
      bonus: 0,
    },
    profissao: {
      dados: 0,
      bonus: 0,
      type: "",
    },
    reflexos: {
      dados: 0,
      bonus: 0,
    },
    religiao: {
      dados: 0,
      bonus: 0,
    },
    sobrevivencia: {
      dados: 0,
      bonus: 0,
    },
    tatica: {
      dados: 0,
      bonus: 0,
    },
    tecnologia: {
      dados: 0,
      bonus: 0,
    },
    vontade: {
      dados: 0,
      bonus: 0,
    },
  },
  immunities: [],
  resistances: [],
  vulnerabilities: [],
};
