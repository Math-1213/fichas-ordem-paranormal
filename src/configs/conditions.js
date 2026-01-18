export const CONDITIONS_DATA = {
  abalado: {
    nome: "Abalado",
    cor: "#ff8800",
    descricao:
      "O personagem sofre -d20 em testes. Se ficar abalado novamente, em vez disso fica Apavorado. Condição de medo.",
  },
  agarrado: {
    nome: "Agarrado",
    cor: "#aa00ff",
    descricao:
      "O personagem fica desprevenido e imóvel, sofre -d20 em testes de ataque e só pode atacar com armas leves. Ataques à distância têm 50% de chance de acertar o alvo errado. Condição de paralisia.",
  },
  alquebrado: {
    nome: "Alquebrado",
    cor: "#ff00aa",
    descricao:
      "O custo em PE de habilidades e rituais aumenta em +1. Condição mental.",
  },
  apavorado: {
    nome: "Apavorado",
    cor: "#ff4400",
    descricao:
      "Sofre -2d20 em testes de perícia e deve fugir da fonte do medo da maneira mais eficiente possível. Condição de medo.",
  },
  asfixiado: {
    nome: "Asfixiado",
    cor: "#555555",
    descricao:
      "Não pode respirar. Pode prender a respiração por Vigor rodadas. Depois disso, deve testar Fortitude (DT 5 + 5 por teste anterior) por rodada. Falha → inconsciente e perde 1d6 PV/rodada.",
  },
  atordoado: {
    nome: "Atordoado",
    cor: "#ff00ff",
    descricao: "Fica desprevenido e não pode realizar ações. Condição mental.",
  },
  caido: {
    nome: "Caído",
    cor: "#888888",
    descricao:
      "Deitado no chão: -2d20 em ataques corpo a corpo, deslocamento 1,5m, -5 na Defesa corpo a corpo, +5 na Defesa à distância.",
  },
  cego: {
    nome: "Cego",
    cor: "#444444",
    descricao:
      "Fica desprevenido e lento. Não pode fazer testes de Percepção e sofre -2d20 em testes de Agilidade ou Força. Todos os alvos de seus ataques recebem camuflagem total.",
  },
  confuso: {
    nome: "Confuso",
    cor: "#ff66cc",
    descricao:
      "Comporta-se aleatoriamente: role 1d6 no início do turno para determinar ação. Condição mental.",
  },
  debilitado: {
    nome: "Debilitado",
    cor: "#ff5555",
    descricao:
      "-2d20 em testes de Agilidade, Força e Vigor. Se ficar debilitado novamente, fica inconsciente.",
  },
  desprevenido: {
    nome: "Desprevenido",
    cor: "#ffaa00",
    descricao:
      "-5 na Defesa e -d20 em Reflexos. Considerado desprevenido contra inimigos não percebidos.",
  },
  doente: {
    nome: "Doente",
    cor: "#88cc88",
    descricao: "Sob efeito de uma doença. Siga regras específicas do efeito.",
  },
  em_chamas: {
    nome: "Em Chamas",
    cor: "#ff2200",
    descricao:
      "Sofre 1d6 de dano de fogo no início do turno. Pode gastar ação padrão para apagar ou entrar na água.",
  },
  enjoado: {
    nome: "Enjoado",
    cor: "#ffaa88",
    descricao: "Só pode realizar uma ação padrão ou de movimento por rodada.",
  },
  enlouquecendo: {
    nome: "Enlouquecendo",
    cor: "#aa00ff",
    descricao:
      "Após 3 turnos enlouquecendo na mesma cena, fica insano (NPC). Pode ser curado com Diplomacia ou efeitos de Sanidade.",
  },
  enredado: {
    nome: "Enredado",
    cor: "#aa00ff",
    descricao:
      "Fica lento, vulnerável e sofre -d20 em ataques. Condição de paralisia.",
  },
  envenenado: {
    nome: "Envenenado",
    cor: "#00aa00",
    descricao:
      "Dano recorrente de veneno varia; segue regras do veneno. Pode acumular com outros efeitos.",
  },
  esmorecido: {
    nome: "Esmorecido",
    cor: "#ff00aa",
    descricao: "-2d20 em testes de Intelecto e Presença. Condição mental.",
  },
  exausto: {
    nome: "Exausto",
    cor: "#ff8800",
    descricao:
      "Debilitado, lento e vulnerável. Se ficar exausto novamente, fica inconsciente.",
  },
  fascinado: {
    nome: "Fascinado",
    cor: "#ffaaee",
    descricao:
      "-2d20 em Percepção e só pode observar o que o fascinou. Qualquer ação hostil termina a condição.",
  },
  fatigado: {
    nome: "Fatigado",
    cor: "#ffaa88",
    descricao: "Fraco e vulnerável. Se ficar fatigado novamente, fica exausto.",
  },
  fraco: {
    nome: "Fraco",
    cor: "#ff8844",
    descricao:
      "-d20 em testes de Agilidade, Força e Vigor. Se ficar fraco novamente, torna-se debilitado.",
  },
  frustrado: {
    nome: "Frustrado",
    cor: "#ff00aa",
    descricao:
      "-d20 em testes de Intelecto e Presença. Se ficar frustrado novamente, torna-se esmorecido. Condição mental.",
  },
  imovel: {
    nome: "Imóvel",
    cor: "#aa00ff",
    descricao: "Deslocamento reduzido a 0m. Condição de paralisia.",
  },
  inconsciente: {
    nome: "Inconsciente",
    cor: "#555555",
    descricao:
      "Fica indefeso e não pode fazer ações. Levantar exige ação padrão.",
  },
  indefeso: {
    nome: "Indefeso",
    cor: "#555555",
    descricao:
      "Desprevenido, -10 na Defesa, falha automática em Reflexos e pode sofrer golpes de misericórdia.",
  },
  lento: {
    nome: "Lento",
    cor: "#888888",
    descricao:
      "Deslocamento reduzido à metade e não pode correr ou investir. Condição de paralisia.",
  },
  machucado: {
    nome: "Machucado",
    cor: "#ff4444",
    descricao: "PV ≤ metade do máximo.",
  },
  morrendo: {
    nome: "Morrendo",
    cor: "#ff0000",
    descricao:
      "0 PV. Após 3 turnos, o personagem morre, salvo estabilização por Medicina ou efeitos específicos.",
  },
  ofuscado: {
    nome: "Ofuscado",
    cor: "#888888",
    descricao: "-d20 em testes de ataque e Percepção. Condição de sentidos.",
  },
  paralisado: {
    nome: "Paralisado",
    cor: "#aa00ff",
    descricao:
      "Imóvel e indefeso, só pode realizar ações mentais. Condição de paralisia.",
  },
  pasmo: {
    nome: "Pasmo",
    cor: "#ff00ff",
    descricao: "Não pode realizar ações. Condição mental.",
  },
  perturbado: {
    nome: "Perturbado",
    cor: "#ff00ff",
    descricao: "Primeira vez na cena → efeito de insanidade.",
  },
  petrificado: {
    nome: "Petrificado",
    cor: "#555555",
    descricao: "Fica inconsciente e recebe resistência a dano 10.",
  },
  sangrando: {
    nome: "Sangrando",
    cor: "#ff4444",
    descricao:
      "Com ferimento aberto. No início do turno, teste de Vigor (DT 20) para estabilizar. Falha → perde 1d6 PV.",
  },
  surdo: {
    nome: "Surdo",
    cor: "#888888",
    descricao:
      "Não pode ouvir, -2d20 em Iniciativa. Considerado ruim para rituais. Condição de sentidos.",
  },
  surpreendido: {
    nome: "Surpreendido",
    cor: "#ffaa00",
    descricao: "Não ciente de inimigos. Fica desprevenido e não pode agir.",
  },
  vulneravel: {
    nome: "Vulnerável",
    cor: "#ffaa00",
    descricao: "Sofre -2 na Defesa.",
  },
};
