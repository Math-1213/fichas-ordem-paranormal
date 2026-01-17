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
    description: `**ACROBACIA**
Permite realizar proezas físicas e coordenação extrema.

- **Usos**: Equilibrar-se em superfícies estreitas, amortecer quedas, escapar de amarras e passar por espaços apertados.
- **Combate**: Pode ser usada para levantar-se rapidamente ou passar por um espaço ocupado por inimigo.`,
  },
  adestramento: {
    label: "Adestramento",
    atributo: "presenca",
    somenteTreinada: true,
    carga: false,
    kit: false,
    description: `**ADESTRAMENTO**
Capacidade de lidar, acalmar e manejar animais.

- **Usos**: Convencer animais agressivos a não atacar, cavalgar em terrenos ruins e galopar.
- **Tarefa**: Permite fazer animais realizarem tarefas treinadas ou puxar veículos.`,
  },
  artes: {
    label: "Artes",
    atributo: "presenca",
    somenteTreinada: true,
    carga: false,
    kit: false,
    description: `**ARTES**
Expressão através de música, dança, escrita ou atuação.

- **Impressão**: Permite impressionar uma plateia. Se bem sucedido, concede bônus em perícias de Presença contra as pessoas que assistiram.`,
  },
  atletismo: {
    label: "Atletismo",
    atributo: "forca",
    somenteTreinada: false,
    carga: false,
    kit: false,
    description: `**ATLETISMO**
Representa sua potência muscular e fôlego.

- **Ações**: Correr em alta velocidade, escalar paredes/árvores, nadar em águas agitadas e saltar sobre buracos ou obstáculos.`,
  },
  atualidades: {
    label: "Atualidades",
    atributo: "intelecto",
    somenteTreinada: false,
    carga: false,
    kit: false,
    description: `**ATUALIDADES**
Conhecimento sobre política, esportes, entretenimento e cultura geral.

- **Informação**: Use para lembrar de nomes de figuras públicas, histórias de empresas ou lendas urbanas recentes.`,
  },
  ciencias: {
    label: "Ciências",
    atributo: "intelecto",
    somenteTreinada: true,
    carga: false,
    kit: false,
    description: `**CIÊNCIAS**
Conhecimento acadêmico em matemática, física, química e biologia.

- **Análise**: Avaliar substâncias, entender procedimentos científicos e analisar materiais experimentais.`,
  },
  crime: {
    label: "Crime",
    atributo: "agilidade",
    somenteTreinada: true,
    carga: true,
    kit: true,
    description: `**CRIME**
Prática de atividades ilícitas e furtivas.

- **Ações**: Arrombar fechaduras e cofres, furtar objetos sem ser notado, ocultar itens no corpo e sabotar dispositivos mecânicos ou eletrônicos.`,
  },
  diplomacia: {
    label: "Diplomacia",
    atributo: "presenca",
    somenteTreinada: false,
    carga: false,
    kit: false,
    description: `**DIPLOMACIA**
Uso da lábia e argumentação para convencer pessoas.

- **Ações**: Mudar a atitude de NPCs (amigável/hostil), persuadir alguém a prestar um favor ou responder perguntas.
- **Estabilizar**: Pode ser usada para #**Acalmar**#a855f7 um aliado enlouquecendo, trazendo-o de volta à sanidade.`,
  },
  enganacao: {
    label: "Enganação",
    atributo: "presenca",
    somenteTreinada: false,
    kit: true,
    description: `**ENGANAÇÃO**
Manipulação de pessoas através de blefes, trapaças e disfarces.

- **Disfarce**: Muda sua aparência ou a de outro (exige Kit).
- **Mentir**: Faz alguém acreditar em algo falso (oposto à Intuição).
- **Combate**: Permite #**Fintar**#a855f7 para deixar um inimigo desprevenido.`,
  },
  fortitude: {
    label: "Fortitude",
    atributo: "vigor",
    somenteTreinada: false,
    carga: false,
    kit: false,
    description: `**FORTITUDE**
Sua resistência física pura e vitalidade.

- **Resistência**: Testes contra venenos, doenças e efeitos biológicos.
- **Fôlego**: Usada para manter o fôlego ao correr ou prender a respiração.`,
  },
  furtividade: {
    label: "Furtividade",
    atributo: "agilidade",
    somenteTreinada: false,
    carga: true,
    kit: false,
    description: `**FURTIVIDADE**
Capacidade de ser discreto, sorrateiro e evitar detecção.

- **Ações**: Esconder-se de inimigos (oposto à Percepção) e seguir pessoas sem ser notado.
- **Penalidade**: Mover-se rápido ou atacar enquanto se esconde impõe penalidades pesadas no teste.`,
  },
  iniciativa: {
    label: "Iniciativa",
    atributo: "agilidade",
    somenteTreinada: false,
    carga: false,
    kit: false,
    description: `**INICIATIVA**
Velocidade de reação e prontidão.

- **Combate**: Define a ordem de agir quando uma cena de ação começa. Resultados maiores agem primeiro.`,
  },
  intimidacao: {
    label: "Intimidação",
    atributo: "presenca",
    somenteTreinada: false,
    carga: false,
    kit: false,
    description: `**INTIMIDAÇÃO**
Uso de medo, coação ou força para dobrar a vontade de outros.

- **Assustar**: Deixa um inimigo abalado ou apavorado.
- **Coagir**: Obriga um NPC a obedecer uma ordem curta. Deixa o alvo hostil contra você após o uso.`,
  },
  intuicao: {
    label: "Intuição",
    atributo: "presenca",
    somenteTreinada: false,
    carga: false,
    kit: false,
    description: `**INTUIÇÃO**
Empatia, "sexto sentido" e percepção de intenções.

- **Mentiras**: Percebe se alguém está mentindo (oposto à Enganação).
- **Pressentimento**: Analisa uma situação ou pessoa para notar se algo está fora do normal ou estranho.`,
  },
  investigacao: {
    label: "Investigação",
    atributo: "intelecto",
    somenteTreinada: false,
    carga: false,
    kit: false,
    description: `**INVESTIGAÇÃO**
Capacidade de descobrir pistas e informações ocultas.

- **Procurar**: Examinar locais em busca de itens escondidos, cofres ou passagens secretas.
- **Interrogar**: Obter informações confidenciais ou rumores em locais movimentados.`,
  },
  luta: {
    label: "Luta",
    atributo: "forca",
    somenteTreinada: false,
    carga: false,
    kit: false,
    description: `**LUTA**
Combate corpo a corpo e uso de armas brancas.

- **Ataque**: Teste contra a Defesa do alvo para causar dano.
- **Manobras**: Usada para agarrar, empurrar ou derrubar oponentes.`,
  },
  medicina: {
    label: "Medicina",
    atributo: "intelecto",
    somenteTreinada: false,
    carga: false,
    kit: true,
    description: `**MEDICINA**
Tratamento de ferimentos, doenças e condições biológicas.

- **Socorro**: Estabiliza personagens morrendo para 1 PV.
- **Análise**: Realiza necropsias para descobrir causas de morte.
- **Tratamento**: Ajuda na recuperação de PV durante o descanso e combate efeitos de venenos.`,
  },
  ocultismo: {
    label: "Ocultismo",
    atributo: "intelecto",
    somenteTreinada: true,
    carga: false,
    kit: false,
    description: `**OCULTISMO**
Estudo teórico e prático do Paranormal e do Outro Lado.

- **Identificar**: Descobrir poderes de criaturas, rituais sendo conjurados ou propriedades de itens amaldiçoados.
- **Informação**: Responder dúvidas sobre fenômenos paranormais, runas e profecias.
- **Rituais**: Essencial para compreender e manipular o Medo.`,
  },
  percepcao: {
    label: "Percepção",
    atributo: "presenca",
    somenteTreinada: false,
    carga: false,
    kit: false,
    description: `**PERCEPÇÃO**
Sua capacidade de notar detalhes através dos sentidos.

- **Ações**: Observar coisas escondidas, ler lábios, ouvir sussurros ou notar inimigos furtivos.
- **Combate**: Usada para localizar seres invisíveis ou camuflados. Você pode tentar ouvir algo mesmo dormindo.`,
  },
  pilotagem: {
    label: "Pilotagem",
    atributo: "agilidade",
    somenteTreinada: true,
    carga: false,
    kit: false,
    description: `**PILOTAGEM**
Operação de veículos terrestres, aquáticos e aéreos.

- **Uso**: Necessária para manobras em situações ruins (chuva, perseguição) ou terrenos acidentados.
- **Veterano**: Permite pilotar veículos aéreos (aviões e helicópteros).`,
  },
  pontaria: {
    label: "Pontaria",
    atributo: "agilidade",
    somenteTreinada: false,
    carga: false,
    kit: false,
    description: `**PONTARIA**
Uso de armas de fogo, arcos e arremessos.

- **Combate**: Teste de ataque à distância contra a Defesa do alvo.
- **Dano**: O sucesso determina se você atinge o alvo com seu projétil.`,
  },
  profissao: {
    label: "Profissão",
    atributo: "intelecto",
    somenteTreinada: true,
    carga: false,
    kit: false,
    description: `**PROFISSÃO**
Conhecimento especializado em uma área mundana (Advogado, Engenheiro, etc.).

- **Rendimentos**: Concede um item adicional da Ordem por missão (Categoria I a III conforme o treino).
- **Versatilidade**: Pode substituir outras perícias em contextos específicos da sua área.`,
  },
  reflexos: {
    label: "Reflexos",
    atributo: "agilidade",
    somenteTreinada: false,
    carga: false,
    kit: false,
    description: `**REFLEXOS**
Sua velocidade de reação instintiva.

- **Resistência**: Usada para evitar dano de explosões, armadilhas e efeitos de área.
- **Defesa**: Atributo usado para evitar ser enganado por fintas em combate.`,
  },
  religiao: {
    label: "Religião",
    atributo: "presenca",
    somenteTreinada: true,
    carga: false,
    kit: false,
    description: `**RELIGIÃO**
Conhecimento sobre teologia, mitos e ritos sagrados.

- **Suporte**: Pode ser usada para #**Acalmar**#a855f7 aliados em choque.
- **Rito**: Permite realizar cerimônias oficiais (batizados, funerais, etc.).`,
  },
  sobrevivencia: {
    label: "Sobrevivência",
    atributo: "intelecto",
    somenteTreinada: false,
    carga: false,
    kit: false,
    description: `**SOBREVIVÊNCIA**
Capacidade de guiar-se e sobreviver em ambientes selvagens.

- **Ermos**: Encontrar abrigo/comida, rastrear criaturas e orientar-se para não se perder em florestas ou desertos.
- **Animais**: Identificar animais exóticos e perigos naturais.`,
  },
  tatica: {
    label: "Tática",
    atributo: "intelecto",
    somenteTreinada: true,
    carga: false,
    kit: false,
    description: `**TÁTICA**
Conhecimento de estratégia e educação militar.

- **Campo**: Analisar o terreno para encontrar coberturas e vantagens.
- **Liderança**: Criar planos de ação que aumentam a Iniciativa de seus aliados.`,
  },
  tecnologia: {
    label: "Tecnologia",
    atributo: "intelecto",
    somenteTreinada: true,
    kit: true,
    description: `**TECNOLOGIA**
Conhecimentos avançados de eletrônica e informática.

- **Hackear**: Invadir servidores e sistemas protegidos para localizar arquivos.
- **Dispositivos**: Operar câmeras, travas eletrônicas e desativar alarmes.
- **Digital**: Falsificar documentos eletrônicos e rastrear acessos.`,
  },
  vontade: {
    label: "Vontade",
    atributo: "presenca",
    somenteTreinada: false,
    carga: false,
    kit: false,
    description: `**VONTADE**
Sua determinação mental e força de espírito.

- **Resistência**: Principal defesa contra rituais que afetam a mente e efeitos de medo ou intimidação.
- **Concentração**: Usada para conjurar rituais em condições adversas ou sob dano.`,
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
  treinado: "success", // verde
  veterano: "primary", // azul
  expert: "warning", // dourado
};
