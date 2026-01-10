/**
 * PERICIAS
 * ----------
 * Define todas as perícias do sistema.
 *
 * Cada chave representa o ID interno da perícia.
 * O valor descreve como ela funciona mecanicamente.
 *
 * Campos:
 * - label: Nome exibido na interface
 * - atributo: Atributo base usado nos testes dessa perícia
 * - somenteTreinada: Se true, só pode ser usada se o personagem tiver treino
 * - carga: Se sofre penalidade quando o personagem está sobrecarregado
 * - kit: Se exige um kit apropriado
 */
export const PERICIAS = {
  acrobacia: {
    label: "Acrobacia",
    atributo: "agilidade",
    somenteTreinada: false,
    carga: true,
    kit: false,
  },
  adestramento: {
    label: "Adestramento",
    atributo: "presenca",
    somenteTreinada: true,
    carga: false,
    kit: false,
  },
  artes: {
    label: "Artes",
    atributo: "presenca",
    somenteTreinada: true,
    carga: false,
    kit: false,
  },
  atletismo: {
    label: "Atletismo",
    atributo: "forca",
    somenteTreinada: false,
    carga: false,
    kit: false,
  },
  atualidades: {
    label: "Atualidades",
    atributo: "intelecto",
    somenteTreinada: false,
    carga: false,
    kit: false,
  },
  ciencias: {
    label: "Ciências",
    atributo: "intelecto",
    somenteTreinada: true,
    carga: false,
    kit: false,
  },
  crime: {
    label: "Crime",
    atributo: "agilidade",
    somenteTreinada: true,
    carga: true,
    kit: true,
  },
  diplomacia: {
    label: "Diplomacia",
    atributo: "presenca",
    somenteTreinada: false,
    carga: false,
    kit: false,
  },
  enganacao: {
    label: "Enganação",
    atributo: "presenca",
    somenteTreinada: false,
    carga: false,
    kit: true,
  },
  fortitude: {
    label: "Fortitude",
    atributo: "vigor",
    somenteTreinada: false,
    carga: false,
    kit: false,
  },
  furtividade: {
    label: "Furtividade",
    atributo: "agilidade",
    somenteTreinada: false,
    carga: true,
    kit: false,
  },
  iniciativa: {
    label: "Iniciativa",
    atributo: "agilidade",
    somenteTreinada: false,
    carga: false,
    kit: false,
  },
  intimidacao: {
    label: "Intimidação",
    atributo: "presenca",
    somenteTreinada: false,
    carga: false,
    kit: false,
  },
  intuicao: {
    label: "Intuição",
    atributo: "presenca",
    somenteTreinada: false,
    carga: false,
    kit: false,
  },
  investigacao: {
    label: "Investigação",
    atributo: "intelecto",
    somenteTreinada: false,
    carga: false,
    kit: false,
  },
  luta: {
    label: "Luta",
    atributo: "forca",
    somenteTreinada: false,
    carga: false,
    kit: false,
  },
  medicina: {
    label: "Medicina",
    atributo: "intelecto",
    somenteTreinada: false,
    carga: false,
    kit: true,
  },
  ocultismo: {
    label: "Ocultismo",
    atributo: "intelecto",
    somenteTreinada: true,
    carga: false,
    kit: false,
  },
  percepcao: {
    label: "Percepção",
    atributo: "presenca",
    somenteTreinada: false,
    carga: false,
    kit: false,
  },
  pilotagem: {
    label: "Pilotagem",
    atributo: "agilidade",
    somenteTreinada: true,
    carga: false,
    kit: false,
  },
  pontaria: {
    label: "Pontaria",
    atributo: "agilidade",
    somenteTreinada: false,
    carga: false,
    kit: false,
  },
  profissao: {
    label: "Profissão",
    atributo: "intelecto",
    somenteTreinada: true,
    carga: false,
    kit: false,
  },
  reflexos: {
    label: "Reflexos",
    atributo: "agilidade",
    somenteTreinada: false,
    carga: false,
    kit: false,
  },
  religiao: {
    label: "Religião",
    atributo: "presenca",
    somenteTreinada: true,
    carga: false,
    kit: false,
  },
  sobrevivencia: {
    label: "Sobrevivência",
    atributo: "intelecto",
    somenteTreinada: false,
    carga: false,
    kit: false,
  },
  tatica: {
    label: "Tática",
    atributo: "intelecto",
    somenteTreinada: true,
    carga: false,
    kit: false,
  },
  tecnologia: {
    label: "Tecnologia",
    atributo: "intelecto",
    somenteTreinada: true,
    carga: false,
    kit: true,
  },
  vontade: {
    label: "Vontade",
    atributo: "presenca",
    somenteTreinada: false,
    carga: false,
    kit: false,
  },
};

/**
 * TREINO_BONUS
 * ------------
 * Define o bônus numérico aplicado às perícias
 * de acordo com o nível de treino do personagem.
 *
 * Esses valores são somados diretamente no teste.
 */
export const TREINO_BONUS = {
  destreinado: 0,
  treinado: 5,
  veterano: 10,
  expert: 15,
};

/**
 * TREINO_LABELS
 * -------------
 * Versão legível dos níveis de treino.
 * Usado para exibição na interface.
 */
export const TREINO_LABELS = {
  destreinado: "Destreinado",
  treinado: "Treinado",
  veterano: "Veterano",
  expert: "Expert",
};

/**
 * TREINO_COLORS
 * -------------
 * Define a cor visual associada a cada nível de treino.
 * Geralmente usado em Badges e indicadores visuais.
 */
export const TREINO_COLORS = {
  destreinado: "secondary", // cinza
  treinado: "success",      // verde
  veterano: "primary",      // azul
  expert: "warning",        // dourado
};