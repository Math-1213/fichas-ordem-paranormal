export const classes = [
  {
    name: "Combatente",
    description:
      "Treinado para lutar com todo tipo de armas, o combatente encara os perigos de frente com força e coragem. Prefere abordagens diretas, lidera aliados em batalha e mantém seu equipamento sempre pronto. Essencial em missões de extermínio, assume a linha de frente quando a situação fica crítica.",
    powers: [
      {
        name: "Ataque Especial",
        tags: ["classe", "combate", "suporte"],
        description:
          "Quando faz um ataque, você pode gastar 2 PE para receber +5 no teste de ataque ou na rolagem de dano. Conforme avança de NEX, pode gastar +1 PE adicional para receber outro bônus de +5. Você pode dividir os bônus entre ataque e dano. Por exemplo, em NEX 55%, pode gastar 4 PE para receber +5 no ataque e +10 no dano.",
      },
    ],
  },
  {
    name: "Especialista",
    description:
      "Um agente que confia mais em esperteza do que em força bruta. Especialistas usam conhecimento técnico, raciocínio rápido e até lábia para resolver mistérios e enfrentar o paranormal. Sua maior força está na capacidade de aprender, improvisar e tirar o grupo das mais diversas enrascadas.",
    powers: [
      {
        name: "Eclético",
        tags: ["classe", "exploracao", "investigacao", "suporte"],
        description:
          "Quando faz um teste de uma perícia, você pode gastar 2 PE para receber os benefícios de ser treinado nessa perícia.",
      },
      {
        name: "Perito",
        tags: ["classe", "exploracao", "investigacao", "suporte"],
        description:
          "Escolha duas perícias nas quais você é treinado (exceto Luta e Pontaria). Quando faz um teste de uma dessas perícias, você pode gastar 2 PE para somar +1d6 no resultado. Conforme avança de NEX, pode gastar +1 PE para aumentar o dado de bônus. Por exemplo, em NEX 55%, pode gastar 4 PE para receber +1d10.",
      },
    ],
  },
  {
    name: "Ocultista",
    description:
      "Estudioso dos mistérios do Outro Lado, o ocultista busca compreender e dominar o paranormal para combatê-lo. Capaz de conjurar rituais e lidar com forças além da compreensão humana, aplica seu conhecimento acadêmico e arcano em missões onde armas convencionais não são suficientes.",
    powers: [
      {
        name: "Escolhido pelo Outro Lado",
        tags: ["classe", "ritual", "transcender"],
        description:
          "Você teve uma experiência paranormal e foi marcado pelo Outro Lado, adquirindo a capacidade de conjurar rituais. Você pode lançar rituais de 1º círculo. Conforme aumenta seu NEX, pode lançar rituais de círculos maiores (2º círculo em NEX 25%, 3º círculo em NEX 55% e 4º círculo em NEX 85%). Você começa com três rituais de 1º círculo e, sempre que avança de NEX, aprende um ritual de qualquer círculo que possa lançar. Esses rituais não contam no limite de rituais conhecidos.",
      },
    ],
  },
  {
    name: "Mundano",
    description:
      "Você é uma pessoa comum, definida principalmente por sua origem e experiências de vida. Sem treinamento especial ou poderes sobrenaturais, enfrenta o paranormal com esperteza, tenacidade e coragem. Sobreviver, proteger outros e tomar atitudes nobres em situações extremas já é, por si só, uma vitória.",
    powers: [
      {
        name: "Empenho",
        tags: ["classe", "exploracao", "investigacao", "suporte"],
        description:
          "Quando faz um teste de perícia, você pode gastar 1 PE para receber +2 nesse teste.",
      },
    ],
  },
];

export const statusParams = {
  Combatente: {
    vida: {
      base: "20 + Vigor",
      perLevel: "4 + Vigor",
      calc: "20+/VIG/+(/LEVEL/-1)*(4+/VIG/)",
    },
    sanidade: {
      base: "12",
      perLevel: "3",
      calc: "12+(/LEVEL/-1)*(3)",
    },
    esforco: {
      base: "2 + Presença",
      perLevel: "2 + Presença",
      calc: "2+/PRE/+(/LEVEL/-1)*(2+/PRE/)",
    },
    pericias: {
      base: "3 + Intelecto",
      default: ["Luta || Pontaria ", " Fortitude || Reflexos"],
      calc: "3+/INT/",
    },
  },
  Especialista: {
    vida: {
      base: "16 + Vigor",
      perLevel: "3 + Vigor",
      calc: "16+/VIG/+(/LEVEL/-1)*(3+/VIG/)",
    },
    sanidade: {
      base: "16",
      perLevel: "4",
      calc: "16+(/LEVEL/-1)*(4)",
    },
    esforco: {
      base: "3 + Presença",
      perLevel: "3 + Presença",
      calc: "3+/PRE/+(/LEVEL/-1)*(3+/PRE/)",
    },
    pericias: {
      base: "9 + Intelecto",
      default: [],
      calc: "9+/INT/",
    },
  },
  Ocultista: {
    vida: {
      base: "12 + Vigor",
      perLevel: "2 + Vigor",
      calc: "12+/VIG/+(/LEVEL/-1)*(2+/VIG/)",
    },
    sanidade: {
      base: "20",
      perLevel: "5",
      calc: "20+(/LEVEL/-1)*(5)",
    },
    esforco: {
      base: "4 + Presença",
      perLevel: "4 + Presença",
      calc: "12+/PRE/+(/LEVEL/-1)*(2+/PRE/)",
    },
    pericias: {
      base: "5 + Intelecto",
      default: ["Ocultismo", "Vontade"],
      calc: "5+/INT/",
    },
  },
  Mundano: {
    vida: {
      base: "8 + Vigor",
      perLevel: "+2",
      calc: "8+/VIG/+(/LEVEL/-1)*(2)",
    },
    sanidade: {
      base: "8",
      perLevel: "+2",
      calc: "8+(/LEVEL/-1)*2",
    },
    esforco: {
      base: "2 + Presença",
      perLevel: "+1",
      calc: "2+/PRE/+(/LEVEL/-1)*(1)",
    },
    pericias: {
      base: "1 + Intelecto",
      calc: "1+/INT/",
    },
  },
};

export const trails = {
  Combatente: [
    {
      name: "Aniquilador",
      description:
        "Você é treinado para abater alvos com eficiência e velocidade. Suas armas são suas melhores amigas e você cuida tão bem delas quanto de seus companheiros de equipe. Talvez até melhor.",
      powers: {
        nex10: {
          title: "A Favorita",
          tags: ["trilha", "combate", "passivo"],
          description:
            "Escolha uma arma para ser sua favorita, como katana ou fuzil de assalto. A categoria da arma escolhida é reduzida em I.",
        },
        nex40: {
          title: "Técnica Secreta",
          tags: ["trilha", "combate"],
          description:
            "A categoria da arma favorita passa a ser reduzida em II. Quando faz um ataque com ela, você pode gastar 2 PE para executar um dos efeitos abaixo como parte do ataque. Você pode adicionar mais efeitos gastando +2 PE por efeito adicional.\n - Amplo: O ataque pode atingir um alvo adicional em seu alcance e adjacente ao original (use o mesmo teste de ataque para ambos). \n - Destruidor: Aumenta o multiplicador de crítico da arma em +1.",
        },
        nex65: {
          title: "Técnica Sublime",
          tags: ["trilha", "combate"],
          description:
            "Você adiciona os seguintes efeitos à lista de sua Técnica Secreta:\n - Letal: Aumenta a margem de ameaça em +2. Você pode escolher este efeito duas vezes para aumentar a margem de ameaça em +5. \n - Perfurante: Ignora até 5 pontos de resistência a dano de qualquer tipo do alvo.",
        },
        nex99: {
          title: "Máquina de Matar",
          tags: ["trilha", "combate", "passivo"],
          description:
            "A categoria da arma favorita passa a ser reduzida em III, ela recebe +2 na margem de ameaça e seu dano aumenta em um dado do mesmo tipo.",
        },
      },
    },
    {
      name: "Comandante de Campo",
      description:
        "Sem um oficial uma batalha não passa de uma briga de bar. Você é treinado para coordenar e auxiliar seus companheiros em combate, tomando decisões rápidas e tirando melhor proveito da situação e do talento de seus aliados.",
      powers: {
        nex10: {
          title: "Inspirar Confiança",
          tags: ["trilha", "suporte", "reacao"],
          description:
            "Sua liderança inspira seus aliados. Você pode gastar uma reação e 2 PE para fazer um aliado em alcance curto rolar novamente um teste recém realizado.",
        },
        nex40: {
          title: "Estrategista",
          tags: ["trilha", "suporte"],
          description:
            "Você pode direcionar aliados em alcance curto. Gaste uma ação padrão e 1 PE por aliado que quiser direcionar (limitado pelo seu Intelecto). No próximo turno dos aliados afetados, eles ganham uma ação de movimento adicional.",
        },
        nex65: {
          title: "Brecha na Guarda",
          tags: ["trilha", "suporte", "combate", "reacao"],
          description:
            "Uma vez por rodada, quando um aliado causar dano em um inimigo que esteja em seu alcance curto, você pode gastar uma reação e 2 PE para que você ou outro aliado em alcance curto faça um ataque adicional contra o mesmo inimigo. Além disso, o alcance de inspirar confiança e estrategista aumenta para médio.",
        },
        nex99: {
          title: "Oficial Comandante",
          tags: ["trilha", "suporte"],
          description:
            "Você pode gastar uma ação padrão e 5 PE para que cada aliado que você possa ver em alcance médio receba uma ação padrão adicional no próximo turno dele.",
        },
      },
    },
    {
      name: "Guerreiro",
      description:
        "Você treinou sua musculatura e movimentos a ponto de transformar seu corpo em uma verdadeira arma. Com golpes corpo a corpo tão poderosos quanto uma bala, você enfrenta inimigos sem medo",
      powers: {
        nex10: {
          title: "Técnica Letal",
          tags: ["trilha", "combate", "passivo"],
          description:
            "Você recebe um aumento de +2 na margem de ameaça com todos os seus ataques corpo a corpo.",
        },
        nex40: {
          title: "Revidar",
          tags: ["trilha", "combate", "reacao"],
          description:
            "Sempre que bloquear um ataque, você pode gastar uma reação e 2 PE para fazer um ataque corpo a corpo no inimigo que o atacou.",
        },
        nex65: {
          title: "Força Opressora",
          tags: ["trilha", "combate"],
          description:
            "Quando acerta um ataque corpo a corpo, você pode gastar 1 PE para realizar uma manobra derrubar ou empurrar contra o alvo do ataque como ação livre. Se escolher empurrar, recebe um bônus de +5 para cada 10 pontos de dano que causou no alvo. Se escolher derrubar e vencer no teste oposto, você pode gastar 1 PE para fazer um ataque adicional contra o alvo caído.",
        },
        nex99: {
          title: "Potência Máxima",
          tags: ["trilha", "combate", "passivo"],
          description:
            "Quando usa seu Ataque Especial com armas corpo a corpo, todos os bônus numéricos são dobrados. Por exemplo, se usar 5 PE para receber +5 no ataque e +15 no dano, você recebe +10 no ataque e +30 no dano.",
        },
      },
    },
    {
      name: "Operações Especiais",
      description:
        "Você é um combatente eficaz. Suas ações são calculadas e otimizadas, sempre antevendo os movimentos inimigos e se posicionando da maneira mais inteligente no campo de batalha.",
      powers: {
        nex10: {
          title: "Iniciativa Aprimorada",
          tags: ["trilha", "combate", "passivo"],
          description: "",
        },
        nex40: {
          title: "Ataque Extra",
          tags: ["trilha", "combate"],
          description: "",
        },
        nex65: {
          title: "Surto de Adrenalina",
          tags: ["trilha", "combate"],
          description: "",
        },
        nex99: {
          title: "Sempre Alerta",
          tags: ["trilha", "combate", "passivo"],
          description:
            "Você recebe uma ação padrão adicional no início de cada cena de combate.",
        },
      },
    },
    {
      name: "Tropa de Choque",
      description:
        "Você é duro na queda. Treinou seu corpo para resistir a traumas f ísicos, tornando-o praticamente inquebrável, e por isso não teme se colocar entre seus aliados e o perigo.",
      powers: {
        nex10: {
          title: "Casca Grossa",
          tags: ["trilha", "combate", "passivo"],
          description:
            "Você recebe +1 PV para cada 5% de NEX e, quando faz um bloqueio, soma seu Vigor na resistência a dano recebida.",
        },
        nex40: {
          title: "Cai Dentro",
          tags: ["trilha", "combate", "suporte", "reacao"],
          description:
            "Sempre que um oponente em alcance curto ataca um de seus aliados, você pode gastar uma reação e 1 PE para fazer com que esse oponente faça um teste de Vontade (DT Vig). Se falhar, o oponente deve atacar você em vez de seu aliado. Este poder só funciona se você puder ser efetivamente atacado e estiver no alcance do ataque (por exemplo, adjacente a um oponente atacando em corpo a corpo ou dentro do alcance de uma arma de ataque à distância). Um oponente que passe no teste de Vontade não pode ser afetado por seu poder Cai Dentro até o final da cena.",
        },
        nex65: {
          title: "Duro de Matar",
          tags: ["trilha", "combate", "reacao"],
          description:
            "Ao sofrer dano não paranormal, você pode gastar uma reação e 2 PE para reduzir esse dano à metade. Em NEX 85%, você pode usar esta habilidade para reduzir dano paranormal. ",
        },
        nex99: {
          title: "Inquebrável",
          tags: ["trilha", "combate", "passivo"],
          description:
            "Enquanto estiver machucado, você recebe +5 na Defesa e resistência a dano 5. Enquanto estiver morrendo, em vez do normal, você não fica indefeso e ainda pode realizar ações. Você ainda segue as regras de morte normalmente.",
        },
      },
    },
    {
      name: "Agente Secreto",
      description:
        "Às vezes, um governo precisa lidar com um problema de forma discreta — por precisar operar fora de sua jurisdição, para não assustar a população ou por vários outros motivos. Quando esse é o caso, usam-se agentes secretos, indivíduos treinados para trabalhar sozinhos ou em pequenos grupos, que contam apenas com suas próprias habilidades, determinação e sorrisos carismáticos. Você se tornou um desses agentes e, por suas capacidades, foi escolhido para a missão mais confidencial de todas — trabalhar com a Ordo Realitas para proteger a humanidade contra o Outro Lado.",
      powers: {
        nex10: {
          title: "Carteirada",
          tags: ["trilha", "social", "investigacao"],
          description:
            "Escolha uma perícia entre Diplomacia ou Enganação. Você recebe treinamento na perícia escolhida ou, se já for treinado, recebe +2 nela. Como parte do esforço conjunto da sua agência e da Ordem, no início de cada missão você recebe documentos que lhe fornecem privilégios jurídicos especiais. Esses documentos podem incluir a sua identidade verdadeira ou não, e podem ser individuais ou incluir os demais membros da sua equipe (conforme apropriado à missão). Os benefícios específicos desses documentos ficam a critério do mestre, mas em geral incluem acesso a locais restritos ou proibidos, permissão para portar armas de fogo e autoridade para assumir a jurisdição de investigações da polícia. Pessoas comuns não conseguem perceber que seus documentos são falsos, mas membros de agências de segurança ou indivíduos veteranos em Crime podem desconfiar de sua veracidade. Os documentos contam como itens operacionais que não ocupam espaço — mas cuidado para não perdê-los em locais onde novos não podem ser fornecidos!",
        },
        nex40: {
          title: "O Sorriso",
          tags: ["trilha", "social", "suporte"],
          description:
            "Em seu trabalho como agente, você aprendeu que se manter contido com um sorriso “sincero” e palavras gentis são ferramentas muito eficientes em uma investigação. Você recebe +2 em Diplomacia e Enganação e, quando falha em um teste de uma dessas perícias, pode gastar 2 PE para repetir a rolagem (apenas uma vez por teste), mas deve aceitar o novo resultado, mesmo que seja pior que o primeiro. Por fim, uma vez por cena, você pode fazer um teste de Diplomacia para acalmar a si mesmo.",
        },
        nex65: {
          title: "Método Investigativo",
          tags: ["trilha", "investigacao"],
          description:
            "Acostumado a vasculhar locais em segredo, você aprendeu a ser rápido ou “controlar a situação” antes que coisas ruins aconteçam. A urgência de qualquer cena de investigação em que você esteja presente aumenta em 1 rodada. Além disso, quando o mestre faz uma rolagem na tabela de eventos de investigação, você pode gastar 2 PE para transformar o resultado em “sem evento”. Você pode usar este efeito mais de uma vez na mesma cena, mas a cada uso adicional seu custo aumenta em +2 PE.",
        },
        nex99: {
          title: "Multifacetado",
          tags: ["trilha", "outros", "transcender"],
          description:
            "Viver sob vários disfarces tem sido útil, mas você faz isso há tanto tempo que talvez nem se lembre mais quem é de verdade. Essas habilidades que surgem quando você precisa foram aprendidas em disfarces anteriores, ou são apenas sua mente buscando uma saída? Uma vez por cena, você pode gastar 5 pontos de Sanidade para receber todas as habilidades de até NEX 65% de uma trilha de combatente ou especialista à sua escolha (você deve cumprir quaisquer pré-requisitos específicos da trilha). Você pode usar essas habilidades até o fim da cena, mas não pode escolher a mesma trilha mais de uma vez na mesma missão. Os pontos de Sanidade gastos para ativar essa habilidade só podem ser recuperados ao fim da missão.",
        },
      },
    },
    {
      name: "Caçador",
      description:
        "Em um mundo cheio de predadores sobrenaturais, você decidiu não ser mais uma presa. Valendo-se de relatos de segunda mão, notícias de jornais e relatórios de incidentes inexplicáveis, você reúne informações sobre como caçar as coisas que espreitam na escuridão.",
      powers: {
        nex10: {
          title: "Rastrear o Paranormal",
          tags: ["trilha", "investigacao", "exploracao"],
          description:
            "Você recebe treinamento em Sobrevivência ou, se já for treinado nesta perícia, recebe +2 nela. Além disso, pode usar essa perícia no lugar de Ocultismo para identificar criaturas e no lugar de Investigação e Percepção para perceber e encontrar rastros, pistas e criaturas que tenham traços paranormais.",
        },
        nex40: {
          title: "Estudar Fraquezas",
          tags: ["trilha", "investigacao"],
          description:
            "Você pode gastar uma ação de interlúdio estudando as fraquezas de um ser específico, como uma criatura paranormal ou um membro de um culto. Para isso, você precisa de uma pista diretamente ligada ao ser. Ao fim dos estudos, você recebe uma informação útil sobre o ser. Além disso, para cada pista você recebe +1 em testes de perícia contra a criatura até o fim da missão. Cada pista fornece apenas uma informação e, a critério do mestre, informações diferentes podem exigir pistas específicas.",
        },
        nex65: {
          title: "Atacar das Sombras",
          tags: ["trilha", "combate", "exploracao"],
          description:
            "Você não sofre a penalidade de –d20 em testes de Furtividade por se mover ao seu deslocamento normal e, se estiver usando uma arma que não faça barulho, a penalidade em Furtividade por atacar na mesma rodada é reduzida para –O. Além disso, sua visibilidade inicial em cenas de furtividade é sempre 1 ponto abaixo da inicial.",
        },
        nex99: {
          title: "Estudar a Presa",
          tags: ["trilha", "combate", "investigacao", "passivo"],
          description:
            "Quando usa Estudar Fraquezas contra uma criatura paranormal ou um cultista, você pode transformar o tipo desse ser em sua presa. Contra seres desse tipo, você recebe +d20 em testes de perícia, +1 na margem de ameaça e no multiplicador de crítico e resistência a dano 5. Você só pode ter um tipo de ser como presa ao mesmo tempo.",
        },
      },
    },
    {
      name: "Monstruoso",
      description:
        "Muito se fala sobre os ocultistas escolherem o caminho de tornarem sua mente uma porta para o paranormal, na tentativa de usá-lo contra ele mesmo, mas de vez em quando, um combatente é corajoso ou insano o bastante para fazer o mesmo com seu corpo. Você propositalmente desfigura e altera seu corpo para que as Entidades o invadam com maior intensidade; contudo, para sua infelicidade, os métodos para isso costumam ser brutais. Combatentes dessa trilha que chegam aos níveis mais altos de exposição inevitavelmente perdem o controle e se tornam inimigos da Ordem.",
      special:
        "Esta trilha usa a “Progressão de NEX” apresentada na regra opcional Nível de Experiência e Nível de Exposição (p. 98), mesmo que esta regra em si não esteja sendo usada. O personagem recebe todas as alterações apropriadas ao seu NEX descritas na progressão e, se a regra de Nível de Experiência estiver em uso, recebe o dobro de NEX sempre que se expõe ao paranormal.",
      powers: {
        nex10: {
          title: "Ser Amaldiçoado",
          tags: ["trilha", "transcender", "ritual"],
          description:
            "Você se torna treinado em Ocultismo ou, se já for treinado, recebe +2 nessa perícia. Escolha um elemento paranormal entre Sangue, Morte, Conhecimento ou Energia. Uma vez por dia, você precisa executar uma etapa ritualística desse elemento. Se fizer isso, até o fim do dia você recebe os efeitos do elemento escolhido. Caso contrário, você sofre de fome e sede nesse dia. Se adquirir afinidade com um elemento, deverá escolher aquele selecionado para esta habilidade. \n - Sangue: você recebe resistência a balístico e Sangue 5 e faro e, quando faz um contra-ataque bem-sucedido, soma seu Vigor na rolagem de dano, mas sofre –d20 em Ciências e Intuição. \n - Morte: você recebe resistência a perfuração e Morte 5 e imunidade a fadiga e soma sua Força em seu total de pontos de vida, mas sofre –d20 em Diplomacia e Enganação. \n - Conhecimento: você recebe resistência a balístico e Conhecimento 5 e visão no escuro e soma seu Intelecto na Defesa, mas sofre –d20 em Atletismo e Acrobacia. \n - Energia: você recebe resistência a corte, eletricidade, fogo e Energia 5 e soma sua Agilidade na RD recebida por um bloqueio bem-sucedido, mas sofre –d20 em Investigação e Percepção.",
        },
        nex40: {
          title: "Ser Macabro",
          tags: ["trilha", "transcender", "ritual"],
          description:
            "A resistência a dano que você recebe por executar a etapa ritualística de seu elemento aumenta para 10, enquanto a penalidade em perícias aumenta para –2d20. Além disso, quando executa sua etapa ritualística, você recebe efeitos adicionais conforme o elemento. \n - Sangue: você pode usar Força para calcular seus pontos de esforço em vez de Presença e pode gastar uma ação de movimento e 1 ou mais PE, limitado por sua Força, para recuperar 1d8 PV por PE gasto. \n - Morte: você recebe +d20 em Intimidação, pode usar Vigor para calcular seus pontos de esforço em vez de Presença, morre apenas se iniciar quatro turnos morrendo na mesma cena e não precisa mais comer ou beber para viver, mas ainda sofre da fome paranormal. \n - Conhecimento: seu Intelecto aumenta em +1 e você pode usar Intelecto como atributo-chave para Enganação e para calcular seus pontos de esforço em vez de Presença. \n - Energia: você pode usar Agilidade como atributo-chave para calcular seus pontos de esforço em vez de Presença e, quando acerta um ataque corpo a corpo, pode gastar 1 ou mais PE, limitado por sua Agilidade, para causar +1d6 pontos de dano de Energia por PE gasto.",
        },
        nex65: {
          title: "Ser Assustador",
          tags: ["trilha", "transcender", "ritual"],
          description:
            "A resistência a dano que você recebe por executar a etapa ritualística de seu elemento aumenta para 15, mas sua Presença é reduzida permanentemente em 1. Além disso, quando executa sua etapa ritualística, você recebe efeitos adicionais conforme o elemento. \n - Sangue: você tem 50% de chance de ignorar o dano adicional de um acerto crítico ou ataque furtivo e recebe uma arma natural de mordida (dano 1d8, crítico x2, perfuração). Uma vez por rodada, ao usar a ação agredir para atacar com outra arma, você pode gastar 1 PE para fazer um ataque corpo a corpo extra com a mordida. \n - Morte: no início de cada turno em que estiver morrendo, você pode fazer um teste de Vigor (DT 15); se passar, encerra a condição morrendo e acorda com 1 PV. Além disso, sempre que faz um acerto crítico em combate ou reduz um inimigo a 0 PV, você recupera 2 PE. \n - Conhecimento: você pode deixar de ser treinado em uma de suas perícias para receber um número de dados de bônus igual ao seu Intelecto. Até o fim da cena, sempre que fizer um teste, você pode gastar um desses dados de bônus para receber +d20 nesse teste. Você recupera todas as perícias treinadas perdidas dessa forma ao final de seu próximo interlúdio. \n - Energia: sua resistência a dano passa a se aplicar também a dano químico e você pode extrair energia de fontes elétricas gastando uma ação de movimento e tocando a fonte. Você recupera 1d4 PE de um dispositivo portátil, 2d4 PE de um dispositivo grande ou 4d4 PE de uma fonte do tamanho de uma casa; a fonte é descarregada e sobrecarregada.",
        },
        nex99: {
          title: "Ser Aterrorizante",
          tags: ["trilha", "transcender", "ritual", "passivo"],
          description:
            "Os efeitos por executar sua etapa ritualística se tornam permanentes, mas você ainda precisa executá-la para evitar fome e sede, e você passa a ser considerado uma criatura paranormal para efeitos de habilidades e itens. A resistência a dano dessa trilha aumenta para 20. Além disso, você recebe efeitos adicionais conforme o elemento. \n - Sangue: seu Intelecto diminui em –1 e sua Força aumenta em +1. Sempre que causa dano com sua mordida, você recupera 5 PV, multiplicado em um acerto crítico. Você aprende o ritual Forma Monstruosa; sempre que sofre dano, deve fazer um teste de Vontade (DT 10 + o dano sofrido) e, se falhar e não estiver sob efeito do ritual, sua próxima ação padrão deve ser conjurá-lo ou você perde a ação. \n - Morte: sua Presença diminui em –1 e seu Vigor aumenta em +1. Você recebe imunidade a dano de Morte e se torna imortal, retornando à vida no dia seguinte se morrer, exceto se for reduzido a 0 PV por dano de fogo ou Energia. Você aprende o ritual Fim Inevitável. \n - Conhecimento: sua Força diminui em –1 e seu Intelecto aumenta em +1. Você recebe Percepção às Cegas e aprende um ritual de Conhecimento de 4º círculo à sua escolha; sempre que conjura esse ritual, perde a memória de tudo que vivenciou desde o início da cena. \n - Energia: sua Força diminui em –1 e sua Agilidade aumenta em +1. Você pode pairar a 1,5m do chão com deslocamento 12m, ignorar terreno difícil, é imune a dano por queda, pode passar por espaços de criaturas Minúsculas e se torna imune a condições de paralisia de origem física. Você aprende o ritual Deflagração de Energia; não pode se beneficiar de itens vestidos e só pode manipular um objeto por vez com a mente, desde que pudesse manipulá-lo com as duas mãos.",
        },
      },
    },
  ],
  Especialista: [
    {
      name: "Atirador de Elite",
      description:
        "Um tiro, uma morte. Ao contrário dos combatentes, você é perito em neutralizar ameaças de longe, terminando uma briga antes mesmo que ela comece. Você trata sua arma como uma ferramenta de precisão, sendo capaz de executar façanhas incríveis.",
      powers: {
        nex10: {
          title: "Mira de Elite",
          tags: ["trilha", "combate", "passivo"],
          description:
            "Você recebe proficiência com armas de fogo que usam balas longas e soma seu Intelecto em rolagens de dano com essas armas.",
        },
        nex40: {
          title: "Disparo Letal",
          tags: ["trilha", "combate"],
          description:
            "Quando faz a ação mirar, você pode gastar 1 PE para aumentar em +2 a margem de ameaça do próximo ataque que fizer até o final de seu próximo turno.",
        },
        nex65: {
          title: "Disparo Impactante",
          tags: ["trilha", "combate"],
          description:
            "Quando ataca com uma arma de fogo, você pode gastar 2 PE e, em vez de causar dano, fazer uma manobra entre derrubar, desarmar, empurrar ou quebrar.",
        },
        nex99: {
          title: "Atirar para Matar",
          tags: ["trilha", "combate", "passivo"],
          description:
            "Quando faz um acerto crítico com uma arma de fogo, você causa dano máximo, sem precisar rolar dados.",
        },
      },
    },
    {
      name: "Infiltrador",
      description:
        "Você é um perito em infiltração e sabe neutralizar alvos desprevenidos sem causar alarde. Combinando talento acrobático, destreza manual e conhecimento técnico você é capaz de superar qualquer barreira de defesa, mesmo quando a missão parece impossível.",
      powers: {
        nex10: {
          title: "Ataque Furtivo",
          tags: ["trilha", "combate", "exploracao"],
          description:
            "Uma vez por rodada, quando atinge um alvo desprevenido com um ataque corpo a corpo ou em alcance curto, ou um alvo que você esteja flanqueando, você pode gastar 1 PE para causar +1d6 pontos de dano do mesmo tipo da arma. Em NEX 40% o dano adicional aumenta para +2d6, em NEX 65% aumenta para +3d6 e em NEX 99% aumenta para +4d6.",
        },
        nex40: {
          title: "Gatuno",
          tags: ["trilha", "exploracao", "investigacao", "passivo"],
          description:
            "Você recebe +5 em Atletismo e Crime e pode percorrer seu deslocamento normal quando se esconder sem penalidade.",
        },
        nex65: {
          title: "Assassinar",
          tags: ["trilha", "combate", "exploracao"],
          description:
            "Você pode gastar uma ação de movimento e 3 PE para analisar um alvo em alcance curto. Até o fim de seu próximo turno, seu primeiro Ataque Furtivo que causar dano a ele tem seus dados de dano extras dessa habilidade dobrados. Além disso, se sofrer dano de seu ataque, o alvo fica inconsciente ou morrendo, à sua escolha, evitando com um teste de Fortitude (DT Agi).",
        },
        nex99: {
          title: "Sombra Fugaz",
          tags: ["trilha", "exploracao"],
          description:
            "Quando faz um teste de Furtividade após atacar ou fazer outra ação chamativa, você pode gastar 3 PE para não sofrer a penalidade de –3d20 no teste.",
        },
      },
    },

    {
      name: "Médico de Campo",
      description:
        "Você é treinado em técnicas de primeiros socorros e tratamento de emergência, o que torna você um membro valioso para qualquer grupo de agentes. Ao contrário dos profissionais de saúde convencionais, você está acostumado com o campo de batalha e sabe tomar decisões rápidas no meio do caos.",
      special:
        "Para escolher esta trilha, você precisa ser treinado em Medicina. Para usar as habilidades desta trilha, você precisa possuir um kit de medicina.",
      powers: {
        nex10: {
          title: "Paramédico",
          tags: ["trilha", "suporte"],
          description:
            "Você pode usar uma ação padrão e 2 PE para curar 2d10 pontos de vida de si mesmo ou de um aliado adjacente. Você pode curar +1d10 PV respectivamente em NEX 40%, 65% e 99%, gastando +1 PE por dado adicional de cura.",
        },
        nex40: {
          title: "Equipe de Trauma",
          tags: ["trilha", "suporte"],
          description:
            "Você pode usar uma ação padrão e 2 PE para remover uma condição negativa (exceto morrendo) de um aliado adjacente.",
        },
        nex65: {
          title: "Resgate",
          tags: ["trilha", "suporte", "exploracao", "passivo"],
          description:
            "Uma vez por rodada, se estiver em alcance curto de um aliado machucado ou morrendo, você pode se aproximar do aliado com uma ação livre (desde que seja capaz de fazê-lo usando seu deslocamento normal). Além disso, sempre que curar PV ou remover condições do aliado, você e o aliado recebem +5 na Defesa até o início de seu próximo turno. Por fim, para você, o total de espaços ocupados por carregar um personagem é reduzido pela metade.",
        },
        nex99: {
          title: "Reanimação",
          tags: ["trilha", "suporte"],
          description:
            "Uma vez por cena, você pode gastar uma ação completa e 10 PE para trazer de volta à vida um personagem que tenha morrido na mesma cena (exceto morte por dano massivo).",
        },
      },
    },
    {
      name: "Negociador",
      description:
        "Você é um diplomata habilidoso e consegue influenciar outras pessoas, seja por lábia ou intimidação. Sua capacidade de avaliar situações com rapidez e eficiência pode tirar o grupo de apuros que nem a mais poderosa das armas poderia resolver.",
      powers: {
        nex10: {
          title: "Eloquência",
          tags: ["trilha", "social"],
          description:
            "Você pode usar uma ação completa e 1 PE por alvo em alcance curto para afetar outras pessoas com sua fala. Faça um teste de Diplomacia, Enganação ou Intimidação contra a Vontade dos alvos. Se você vencer, os alvos ficam fascinados enquanto você se concentrar (uma ação padrão por rodada). Um alvo hostil ou que esteja envolvido em combate recebe +5 em seu teste de resistência e tem direito a um novo teste por rodada, sempre que você se concentrar. Uma pessoa que passar no teste fica imune a este efeito por um dia.",
        },
        nex40: {
          title: "Discurso Motivador",
          tags: ["trilha", "social", "suporte"],
          description:
            "Você pode gastar uma ação padrão e 4 PE para inspirar seus aliados com suas palavras. Você e todos os seus aliados em alcance curto ganham +1d20 em testes de perícia até o fim da cena. A partir de NEX 65%, você pode gastar 8 PE para fornecer um bônus total de +2d20.",
        },
        nex65: {
          title: "Eu Conheço um Cara",
          tags: ["trilha", "social", "investigacao"],
          description:
            "Uma vez por missão, você pode ativar sua rede de contatos para pedir um favor, como por exemplo trocar todo o equipamento do seu grupo (como se tivesse uma segunda fase de preparação de missão), conseguir um local de descanso ou mesmo ser resgatado de uma cena. O mestre tem a palavra final de quando é possível usar essa habilidade e quais favores podem ser obtidos.",
        },
        nex99: {
          title: "Truque de Mestre",
          tags: ["trilha", "social", "outros"],
          description:
            "Acostumado a uma vida de fingimento e manipulação, você pode gastar 5 PE para simular o efeito de qualquer habilidade que você tenha visto um de seus aliados usar durante a cena. Você ignora os pré-requisitos da habilidade, mas ainda precisa pagar todos os seus custos, incluindo ações, PE e materiais, e ela usa os seus parâmetros de jogo, como se você estivesse usando a habilidade em questão.",
        },
      },
    },
    {
      name: "Técnico",
      description:
        "Sua principal habilidade é a manutenção e reparo do valioso equipamento que seu time carrega em missão. Seu conhecimento técnico também permite que improvise ferramentas com o que tiver à disposição e sabote os itens usados por seus inimigos.",
      powers: {
        nex10: {
          title: "Inventário Otimizado",
          tags: ["trilha", "exploracao", "passivo"],
          description:
            "Você soma seu Intelecto à sua Força para calcular sua capacidade de carga. Por exemplo, se você tem Força 1 e Intelecto 3, seu inventário tem 20 espaços.",
        },
        nex40: {
          title: "Remendão",
          tags: ["trilha", "exploracao", "suporte"],
          description:
            "Você pode gastar uma ação completa e 1 PE para remover a condição quebrado de um equipamento adjacente até o final da cena. Além disso, qualquer equipamento geral tem sua categoria reduzida em I para você.",
        },
        nex65: {
          title: "Improvisar",
          tags: ["trilha", "exploracao"],
          description:
            "Você pode improvisar equipamentos com materiais ao seu redor. Escolha um equipamento geral e gaste uma ação completa e 2 PE, mais 2 PE por categoria do item escolhido. Você cria uma versão funcional do equipamento, que segue suas regras de espaço e categoria como normal. Ao final da cena, seu equipamento improvisado se torna inútil.",
        },
        nex99: {
          title: "Preparado para Tudo",
          tags: ["trilha", "exploracao"],
          description:
            "Você sempre tem o que precisa para qualquer situação. Sempre que precisar de um item qualquer (exceto armas), pode gastar uma ação de movimento e 3 PE por categoria do item para lembrar que colocou ele no fundo da bolsa. Depois de encontrado, o item segue normalmente as regras de inventário.",
        },
      },
    },
    {
      name: "Bibliotecário",
      description:
        "Poucas pessoas lêem tanto quanto você, mas diferente do que imaginam, passar a vida cercado de conhecimento não o torna menos apto. Na verdade, seu vasto conhecimento é muitas vezes a única solução para situações desesperadoras. Alguém precisa ser a chave dos segredos. Alguém precisa saber, mesmo que isso signifique perder.",
      powers: {
        nex10: {
          title: "Conhecimento Prático",
          tags: ["trilha", "investigacao"],
          description:
            "Quando faz um teste de perícia (exceto Luta e Pontaria), você pode gastar 2 PE para mudar o atributo-base da perícia para Intelecto. Se possuir o poder Conhecimento Aplicado, em vez disso o custo é reduzido em –1 PE.",
        },
        nex40: {
          title: "Leitor Contumaz",
          tags: ["trilha", "investigacao"],
          description:
            "Cada dado de bônus recebido pela ação de interlúdio ler aumenta para 1d8 e você pode aplicar esse bônus em testes de qualquer perícia. Além disso, quando usa esse bônus em um teste, pode gastar 2 PE para aumentá-lo em +1 dado (de 1d8 para 2d8).",
        },
        nex65: {
          title: "Rato de Biblioteca",
          tags: ["trilha", "investigacao", "exploracao"],
          description:
            "Se estiver em um ambiente com muitos livros, você pode gastar alguns minutos (ou uma rodada, em cena de investigação) para receber os benefícios de uma ação de interlúdio à sua escolha entre ler e revisar caso. Você só pode usar essa habilidade uma vez por cena.",
        },
        nex99: {
          title: "A Força do Saber",
          tags: ["trilha", "investigacao", "passivo"],
          description:
            "Seu Intelecto aumenta em +1 e você soma o valor desse atributo em seu total de PE. Além disso, escolha uma perícia qualquer: você troca o atributo-base dessa perícia para Intelecto.",
        },
      },
    },
    {
      name: "Perseverante",
      description:
        "Você sabe que é um sobrevivente. Talvez tenha sido o único a escapar com vida de uma grande tragédia, ou simplesmente possua o espírito necessário para perseverar onde todos os outros caíram. Em filmes de terror, os monstros e assassinos costumam pegar suas vítimas isoladas uma a uma com facilidade, até se depararem com uma protagonista resiliente e que parece nunca desistir. Seja por experiência ou instinto, você tem certeza que se estivesse em um desses filmes, seria o último sobrevivente a sair vivo no final.",
      powers: {
        nex10: {
          title: "Soluções Improvisadas",
          tags: ["trilha", "suporte"],
          description:
            "Você pode gastar 2 PE para rolar novamente 1 dos dados de um teste recém-realizado (apenas uma vez por teste) e ficar com o melhor resultado entre as duas rolagens.",
        },
        nex40: {
          title: "Fuga Obstinada",
          tags: ["trilha", "exploracao", "passivo"],
          description:
            "Você recebe +5 em testes de perícia para fugir de um inimigo (em perseguições ou não). Além disso, em cenas de perseguição, se você for a presa, pode acumular até 4 falhas antes de ser pego.",
        },
        nex65: {
          title: "Determinação Inquestionável",
          tags: ["trilha", "suporte"],
          description:
            "Uma vez por cena, você pode gastar 5 PE e uma ação padrão para remover uma condição de medo, mental ou de paralisia que esteja lhe afligindo. A critério do mestre, certas condições não podem ser removidas por essa habilidade.",
        },
        nex99: {
          title: "Só Mais um Passo...",
          tags: ["trilha", "suporte", "passivo"],
          description:
            "Uma vez por rodada, quando sofre dano que reduziria seus PV a 0, você pode gastar 5 PE para, em vez disso, ficar com 1 PV. Esta habilidade não funciona contra dano massivo.",
        },
      },
    },
    {
      name: "Muambeiro",
      description:
        "Você sempre foi bom em lidar com equipamentos, e aprendeu como produzir ou encontrar, os itens certos em qualquer ocasião. Esse talento pode ser fundamental para manter todos em sua equipe vivos.",
      powers: {
        nex10: {
          title: "Mascate",
          tags: ["trilha", "exploracao", "passivo"],
          description:
            "Você recebe treinamento em uma Profissão à sua escolha entre armeiro, engenheiro ou químico, e recebe +5 em sua capacidade de carga. Além disso, quando fabrica um item improvisado, a DT é reduzida em –10 (em vez de –5).",
        },
        nex40: {
          title: "Fabricação Própria",
          tags: ["trilha", "exploracao"],
          description:
            "Você leva apenas metade do tempo para fabricar itens mundanos. Com uma ação de manutenção pode fabricar duas munições, explosivos e demais consumíveis, e precisa de apenas uma ação de manutenção para armas, proteções e demais equipamentos gerais. Itens modificados ou paranormais não são afetados.",
        },
        nex65: {
          title: "Laboratório de Campo",
          tags: ["trilha", "exploracao", "investigacao"],
          description:
            "Você recebe treinamento em uma Profissão à sua escolha entre armeiro, engenheiro ou químico ou, se já for treinado em uma dessas perícias, recebe +5 nela. Além disso, você pode usar fabricação em campo para fabricar e consertar itens paranormais (fabricar um item paranormal exige três ações de interlúdio que não precisam ser consecutivas).",
        },
        nex99: {
          title: "Achado Conveniente",
          tags: ["trilha", "exploracao"],
          description:
            "Você pode gastar uma ação completa e 5 PE para produzir um item de até categoria III (exceto itens paranormais). O item permanece em funcionamento até o fim da cena e então deixa de funcionar permanentemente.",
        },
      },
    },
  ],
  Ocultista: [
    {
      name: "Conduíte",
      description:
        "Você domina os aspectos fundamentais da conjuração de rituais e é capaz de aumentar o alcance e velocidade de suas conjurações. Conforme sua conexão com as entidades paranormais aumenta você se torna capaz de interferir com os rituais de outros ocultistas.",
      powers: {
        nex10: {
          title: "Ampliar Ritual",
          tags: ["trilha", "ritual"],
          description:
            "Quando lança um ritual, você pode gastar +2 PE para aumentar seu alcance em um passo (de curto para médio, de médio para longo ou de longo para extremo) ou dobrar sua área de efeito.",
        },
        nex40: {
          title: "Acelerar Ritual",
          tags: ["trilha", "ritual"],
          description:
            "Uma vez por rodada, você pode aumentar o custo de um ritual em 4 PE para conjurá-lo como uma ação livre.",
        },
        nex65: {
          title: "Anular Ritual",
          tags: ["trilha", "ritual", "reacao"],
          description:
            "Quando for alvo de um ritual, você pode gastar uma quantidade de PE igual ao custo pago por esse ritual e fazer um teste oposto de Ocultismo contra o conjurador. Se vencer, você anula o ritual, cancelando todos os seus efeitos.",
        },
        nex99: {
          title: "Canalizar o Medo",
          tags: ["trilha", "ritual", "passivo"],
          description: "Você aprende o ritual Canalizar o Medo.",
        },
      },
    },
    {
      name: "Flagelador",
      description:
        "Dor é um poderoso catalisador paranormal e você aprendeu a transformá-la em poder para seus rituais. Quando se torna especialmente poderoso, consegue usar a dor e o sofrimento de seus inimigos como instrumento de seus rituais ocultistas.",
      powers: {
        nex10: {
          title: "Poder do Flagelo",
          tags: ["trilha", "ritual", "passivo"],
          description:
            "Ao conjurar um ritual, você pode gastar seus próprios pontos de vida para pagar o custo em pontos de esforço, à taxa de 2 PV por PE pago. Pontos de vida gastos dessa forma só podem ser recuperados com descanso.",
        },
        nex40: {
          title: "Abraçar a Dor",
          tags: ["trilha", "reacao", "passivo"],
          description:
            "Sempre que sofrer dano não paranormal, você pode gastar uma reação e 2 PE para reduzir esse dano à metade.",
        },
        nex65: {
          title: "Absorver Agonia",
          tags: ["trilha", "ritual", "passivo"],
          description:
            "Sempre que reduz um ou mais inimigos a 0 PV com um ritual, você recebe uma quantidade de PE temporários igual ao círculo do ritual utilizado. Por exemplo, se ativar esse poder com um ritual de 2º círculo, receberá 2 PE.",
        },
        nex99: {
          title: "Medo Tangível",
          tags: ["trilha", "ritual", "passivo"],
          description: "Você aprende o ritual Medo Tangível.",
        },
      },
    },
    {
      name: "Graduado",
      description:
        "Você foca seus estudos em se tornar um conjurador versátil e poderoso, conhecendo mais rituais que os outros ocultistas e sendo capaz de torná-los mais dif íceis de serem resistidos. Seu objetivo é desvendar e dominar os segredos do Outro Lado, custe o que custar.",
      powers: {
        nex10: {
          title: "Saber Ampliado",
          tags: ["trilha", "ritual", "passivo"],
          description:
            "Você aprende um ritual de 1º círculo. Toda vez que ganha acesso a um novo círculo, aprende um ritual adicional daquele círculo. Esses rituais não contam no seu limite de rituais.",
        },
        nex40: {
          title: "Grimório Ritualístico",
          tags: ["trilha", "ritual", "passivo"],
          description:
            "Você cria um grimório especial que armazena rituais que sua mente não seria capaz de guardar. Você aprende uma quantidade de rituais de 1º ou 2º círculos igual ao seu Intelecto. Quando ganha acesso a um novo círculo, pode incluir um novo ritual desse círculo em seu grimório. Esses rituais não contam em seu limite de rituais conhecidos. Para conjurar um ritual armazenado em seu grimório, você precisa empunhá-lo e gastar uma ação completa folheando para relembrar o ritual. O grimório ocupa 1 espaço no inventário. Se perdê-lo, você pode replicá-lo com duas ações de interlúdio.",
        },
        nex65: {
          title: "Rituais Eficientes",
          tags: ["trilha", "ritual", "passivo"],
          description:
            "A DT para resistir a todos os seus rituais aumenta em +5.",
        },
        nex99: {
          title: "Conhecendo o Medo",
          tags: ["trilha", "ritual", "passivo"],
          description: "Você aprende o ritual Conhecendo o Medo.",
        },
      },
    },
    {
      name: "Intuitivo",
      description:
        "Assim como combatentes treinam seus corpos para resistir a traumas f ísicos, você preparou sua mente para resistir aos efeitos do Outro Lado. Seu foco e força de vontade fazem com que você expanda os limites de suas capacidades paranormais.",
      powers: {
        nex10: {
          title: "Mente Sã",
          tags: ["trilha", "passivo"],
          description:
            "Você compreende melhor as entidades do Outro Lado e passa a ser menos abalado por seus efeitos. Você recebe resistência paranormal +5 (+5 em testes de resistência contra efeitos paranormais).",
        },
        nex40: {
          title: "Presença Poderosa",
          tags: ["trilha", "ritual", "passivo"],
          description:
            "Sua resiliência mental faz com que você possa extrair mais do Outro Lado. Você adiciona sua Presença ao seu limite de PE por turno, mas apenas para conjurar rituais (não para DT).",
        },
        nex65: {
          title: "Inabalável",
          tags: ["trilha", "passivo"],
          description:
            "Você recebe resistência a dano mental e paranormal 10. Além disso, quando é alvo de um efeito paranormal que permite um teste de Vontade para reduzir o dano à metade, você não sofre dano algum se passar.",
        },
        nex99: {
          title: "Presença do Medo",
          tags: ["trilha", "ritual", "passivo"],
          description: "Você aprende o ritual Presença do Medo.",
        },
      },
    },
    {
      name: "Lâmina Paranormal",
      description:
        "Alguns ocultistas preferem ficar fechados em suas bibliotecas estudando livros e rituais. Outros preferem investigar fenômenos paranormais em sua fonte. Já você, prefere usar o paranormal como uma arma. Você aprendeu e dominou técnicas de luta mesclando suas habilidades de conjuração com suas capacidades de combate",
      powers: {
        nex10: {
          title: "Lâmina Maldita",
          tags: ["trilha", "combate", "ritual"],
          description:
            "Você aprende o ritual Amaldiçoar Arma. Se já o conhece, pode gastar +1 PE quando o lança para reduzir seu tempo de conjuração para movimento. Além disso, quando conjura esse ritual, você pode usar Ocultismo, em vez de Luta ou Pontaria, para testes de ataque com a arma amaldiçoada.",
        },
        nex40: {
          title: "Gladiador Paranormal",
          tags: ["trilha", "combate", "passivo"],
          description:
            "Sempre que acerta um ataque corpo a corpo em um inimigo, você recebe 2 PE temporários. Você pode ganhar um máximo de PE temporários por cena igual ao seu limite de PE. PE temporários desaparecem no final da cena.",
        },
        nex65: {
          title: "Conjuração Marcial",
          tags: ["trilha", "combate", "ritual"],
          description:
            "Uma vez por rodada, quando você lança um ritual com execução de uma ação padrão, pode gastar 2 PE para fazer um ataque corpo a corpo como uma ação livre.",
        },
        nex99: {
          title: "Lâmina do Medo",
          tags: ["trilha", "ritual", "combate"],
          description: "Você aprende o ritual Lâmina do Medo.",
        },
      },
    },
    {
      name: "Exorcista",
      description:
        "Da escuridão da noite, quando as sombras se tornam mais densas, emerge um chamado desesperado. Um grito sufocado pela presença maligna que assola uma alma atormentada. É então que o exorcista se ergue para enfrentar o paranormal. Com sua fé como escudo e suas palavras como espada, independente de sua religião ou crença, você mergulha na escuridão, onde a Realidade e o Outro Lado travam uma batalha pelo medo humano.",
      powers: {
        nex10: {
          title: "Revelação do Mal",
          tags: ["trilha", "investigacao", "ritual", "passivo"],
          description:
            "Você recebe treinamento em Religião ou, se já for treinado nesta perícia, recebe +2 nela. Além disso, pode usar Religião no lugar de Investigação e Percepção para notar e encontrar seres, rastros ou pistas com traços paranormais e no lugar de Ocultismo.",
        },
        nex40: {
          title: "Poder da Fé",
          tags: ["trilha", "reacao", "ritual"],
          description:
            "Você se torna veterano em Religião ou, se já for veterano, recebe +d20 nessa perícia. Quando falha em um teste de resistência, pode gastar 2 PE para repetir o teste usando Religião, mas deve aceitar o resultado da segunda rolagem, mesmo que seja menor.",
        },
        nex65: {
          title: "Parareligiosidade",
          tags: ["trilha", "ritual"],
          description:
            "Quando conjura um ritual, você pode gastar +2 PE para adicionar a ele um efeito equivalente ao de um catalisador ritualístico à sua escolha.",
        },
        nex99: {
          title: "Chagas da Resistência",
          tags: ["trilha", "passivo"],
          description:
            "Quando sua Sanidade é reduzida a 0, você pode gastar 10 PV para, em vez disso, ficar com SAN 1.",
        },
      },
    },
    {
      name: "Possuído",
      description:
        "Você nunca quis contato com o Outro Lado, mas ele parece ter especialmente escolhido você para perseguir. Desde que consegue lembrar, você estava predestinado a essa maldição, como se o paranormal estivesse crescendo em seu interior antes mesmo de seu nascimento… E assim, você foi empurrado para uma batalha sem fim… Sem opção, só lhe resta lutar, enquanto o paranormal dentro de você aflora cada vez mais.",
      powers: {
        nex10: {
          title: "Poder Não Desejado",
          tags: ["trilha", "transcender", "passivo"],
          description:
            "Sempre que receber um novo poder de ocultista, você recebe o poder Transcender em vez disso. Você possui pontos de possessão (PP): total igual a 3 + 2 para cada poder Transcender que possui. O limite de PP gastos por turno é igual à sua Presença. Para cada PP gasto, você recupera 10 PV ou 2 PE. Você recupera 1 PP a cada ação de interlúdio dormir.",
        },
        nex40: {
          title: "As Sombras Dentro de Mim",
          tags: ["trilha", "transcender", "passivo"],
          description:
            "Sua recuperação de PP aumenta para 2 por ação dormir. Além disso, pode gastar 2 PE para permitir que a Entidade controle temporariamente seus músculos, recebendo +O em Acrobacia, Atletismo e Furtividade por uma rodada. Em cenas de furtividade, nessa rodada, o aumento de visibilidade por qualquer ação é reduzido em –1.",
        },
        nex65: {
          title: "Ele Me Ensina",
          tags: ["trilha", "transcender"],
          description:
            "Escolha entre transcender ou receber o primeiro poder de uma trilha de ocultista que não a sua. Você deve atender os pré-requisitos do poder escolhido.",
        },
        nex99: {
          title: "Tornamo-nos Um",
          tags: ["trilha", "transcender", "passivo"],
          description:
            "Com base no elemento de afinidade, você recebe um poder especial. Sangue: Presente da Obsessão, uma vez por rodada, gaste 6 PE para recuperar 50 PV; até o início do próximo turno, bônus de treinamento em perícias baseadas em Força, Vigor e Intimidação tornam-se +35, demais perícias baseadas em Presença tornam-se –10; pode ser usado mesmo inconsciente. Morte: Presente do Tempo, uma vez por rodada, gaste 6 PE para receber um turno adicional na última contagem de iniciativa da rodada; pode ser usado mesmo inconsciente. Conhecimento: Presente do Saber, uma vez por cena, gaste 6 PE para receber um poder qualquer até o fim da cena, cumprindo pré-requisitos e exceto poderes de trilha NEX 99%; a cada uso faça um teste de Vontade (DT 15 + 5 por uso na missão), falha causa perda de 1d6 SAN por uso na missão. Energia: Presente do Espaço, uma vez por rodada, gaste 6 PE para se teletransportar para um ponto em alcance médio; não precisa ver ou conhecer o local, e se o espaço estiver ocupado você é arremessado para o espaço disponível mais próximo.",
        },
      },
    },
    {
      name: "Parapsicólogo",
      description:
        "Você esteve em um meio de pessoas dedicadas a cuidar da mente humana… Mas, quando descobriu a maior ameaça para a nossa psique, descobriu também que seus colegas não passavam de tolos céticos. Quando você falou sobre o paranormal, eles apenas riram. Desprezado pela academia, você decidiu perseguir a verdade sozinho. Afinal, a diferença entre o remédio e o veneno é a dosagem. Se o paranormal pode ser usado para perturbar, também pode ser usado para sanar. Ele só precisa ser estudado, analisado e aplicado por alguém competente como você, mesmo que isso custe sua vida.",
      special:
        "Para escolher esta trilha, você precisa ser treinado em Profissão (psicólogo).",
      powers: {
        nex10: {
          title: "Terapia",
          tags: ["trilha", "social", "suporte"],
          description:
            "Você pode usar Profissão (psicólogo) no lugar de Diplomacia. Uma vez por rodada, quando você ou um aliado em alcance curto falha em um teste de resistência contra um efeito que causa dano mental, você pode gastar 2 PE para fazer um teste de Profissão (psicólogo) e usar o resultado no lugar do teste de resistência falho. Se já possuir esta habilidade, o custo é reduzido em –1 PE e você recebe +2 em Profissão (psicólogo).",
        },
        nex40: {
          title: "Palavras-chave",
          tags: ["trilha", "social", "suporte"],
          description:
            "Quando passa em um teste de perícia para acalmar, você pode gastar pontos de esforço até seu limite de PE. Para cada 1 PE gasto, a pessoa tratada recupera 1 ponto de Sanidade ou 1 PE, caso esteja usando a regra Jogando sem Sanidade.",
        },
        nex65: {
          title: "Reprogramação Mental",
          tags: ["trilha", "outros"],
          description:
            "Você pode gastar 5 PE e uma ação de interlúdio para manipular o cérebro de uma pessoa voluntária em alcance curto, que também gasta uma ação de interlúdio. Até o próximo interlúdio, a pessoa recebe, à escolha dela, um poder geral, um poder da própria classe ou o primeiro poder de uma trilha diferente da dela, acreditando que sempre o teve. A pessoa deve cumprir os pré-requisitos do poder escolhido.",
        },
        nex99: {
          title: "A Sanidade Está Lá Fora",
          tags: ["trilha", "suporte"],
          description:
            "Você pode gastar uma ação de movimento e 5 PE para remover todas as condições de medo ou mentais de uma pessoa adjacente, incluindo você mesmo.",
        },
      },
    },
  ],
  Mundano: [
    {
      name: "Durão",
      description:
        "Você é um indivíduo resistente, que consegue defender a si mesmo ou aos outros em situações de perigo. Pode ser um atleta, segurança, trabalhador da construção civil etc.",
      powers: {},
      stages: {
        stage2: {
          title: "Durão",
          tags: ["origem", "passivo"],
          description:
            "Você recebe +4 PV. Ao subir para o 3º estágio, recebe +2 PV adicionais.",
        },
        stage4: {
          title: "Pancada Forte",
          tags: ["origem", "combate"],
          description:
            "Quando faz um ataque, você pode gastar 1 PE para receber +O no teste de ataque. Se você se tornar um combatente, perde esta habilidade, mas reduz o custo de ativação de Ataque Especial em –1 PE.",
        },
      },
    },
    {
      name: "Esperto",
      description:
        "Você é um estudante, técnico, engenheiro ou outra pessoa equipada com conhecimento, inteligência e persuasão.",
      powers: {},
      stages: {
        stage2: {
          title: "Esperto",
          tags: ["origem", "passivo"],
          description:
            "Você se torna treinado em uma perícia adicional à sua escolha.",
        },
        stage4: {
          title: "Entendido",
          tags: ["origem", "investigacao"],
          description:
            "Escolha duas perícias nas quais você é treinado, exceto Luta e Pontaria. Quando faz um teste de uma dessas perícias, você pode gastar 1 PE para somar +1d4 ao resultado. Se você se tornar um especialista, perde esta habilidade, mas reduz o custo de ativação de Perito em –1 PE.",
        },
      },
    },
    {
      name: "Esotérico",
      description:
        " Você é uma pessoa ligada a aspectos espirituais do mundo, como religiões, astrologia e cartomancia, ou apenas possui um sexto sentido em relação ao paranormal e ao Outro Lado.",
      powers: {},
      stages: {
        stage2: {
          title: "Esotérico",
          tags: ["origem", "investigacao", "passivo"],
          description:
            "Você pode gastar uma ação padrão e 1 PE para sentir energias paranormais em alcance curto, obtendo pistas em investigações ou sendo alertado de perigos iminentes, a critério do mestre.",
        },
        stage4: {
          title: "Iniciado",
          tags: ["origem", "ritual"],
          description:
            "Você aprende e pode conjurar um ritual de 1º círculo à sua escolha. Se você se tornar um ocultista, soma este ritual aos três rituais aprendidos com Escolhido pelo Outro Lado.",
        },
      },
    },
  ],
};

export const origins = [
  {
    name: "Acadêmico",
    description:
      "Você era um pesquisador ou professor universitário. De forma proposital ou não, seus estudos tocaram em assuntos misteriosos e chamaram a atenção da Ordo Realitas.",
    skills: ["Ciências", "Investigação"],
    power: {
      name: "Saber é Poder",
      description:
        "Quando faz um teste usando Intelecto, você pode gastar 2 PE para receber +5 nesse teste.",
      tags: ["origem", "investigacao", "suporte"],
    },
  },
  {
    name: "Agente de Saúde",
    description:
      "Você era um profissional da saúde, como um enfermeiro, farmacêutico, médico, psicólogo ou socorrista, treinado no atendimento e cuidado de pessoas. Você pode ter sido surpreendido por um evento paranormal durante o trabalho ou mesmo cuidado de um agente da Ordem em uma emergência, que ficou surpreso com o quão bem você lidou com a situação.",
    skills: ["Intuição", "Medicina"],
    power: {
      name: "Técnica Medicinal",
      description:
        "Sempre que cura um personagem, você adiciona seu Intelecto no total de PV curados.",
      tags: ["origem", "suporte", "passivo"],
    },
  },
  {
    name: "Amnésico",
    description:
      "Você perdeu a maior parte da memória. Sabe apenas o próprio nome, ou nem isso. Sua amnésia pode ser resultado de um trauma paranormal ou mesmo de um ritual. Talvez você tenha sido vítima de cultistas ou até mesmo um deles. Hoje, a Ordem é a única família que conhece, e talvez cumprindo missões você descubra algo sobre seu passado.",
    skills: ["Duas à escolha do mestre"],
    power: {
      name: "Vislumbres do Passado",
      description:
        "Uma vez por sessão, você pode fazer um teste de Intelecto (DT 10) para reconhecer pessoas ou lugares familiares encontrados antes de perder a memória. Se passar, recebe 1d4 PE temporários e, a critério do mestre, uma informação útil.",
      tags: ["origem", "investigacao"],
    },
  },
  {
    name: "Artista",
    description:
      "Você era um ator, músico, escritor, dançarino ou influenciador. Seu trabalho pode ter sido inspirado por uma experiência paranormal do passado e o que o público acha que é pura criatividade, a Ordem sabe que tem um lado mais sombrio.",
    skills: ["Artes", "Enganação"],
    power: {
      name: "Magnum Opus",
      description:
        "Uma vez por missão, pode determinar que uma pessoa envolvida em uma cena de interação o reconheça. Você recebe +5 em testes de Presença e de perícias baseadas em Presença contra aquela pessoa. A critério do mestre, pode receber esse bônus em outras situações nas quais seria reconhecido.",
      tags: ["origem", "social", "passivo"],
    },
  },
  {
    name: "Atleta",
    description:
      "Você competia em um esporte individual ou coletivo, como natação ou futebol. Seu desempenho pode ser fruto de uma influência paranormal que nem mesmo você conhecia ou você pode ter se envolvido em algum evento relacionado ao Outro Lado em uma de suas competições.",
    skills: ["Acrobacia", "Atletismo"],
    power: {
      name: "110%",
      description:
        "Quando faz um teste de perícia usando Força ou Agilidade (exceto Luta e Pontaria), você pode gastar 2 PE para receber +5 nesse teste.",
      tags: ["origem", "exploracao", "suporte"],
    },
  },
  {
    name: "Chef",
    description:
      "Você é um cozinheiro amador ou profissional. Talvez trabalhasse em um restaurante ou simplesmente gostasse de cozinhar para a família e amigos. Como sua comida fez com que você se envolvesse com o paranormal? Ninguém sabe, mas os outros agentes adoram quando você vai para a missão.",
    skills: ["Fortitude", "Profissão (Cozinheiro)"],
    power: {
      name: "Ingrediente Secreto",
      description:
        "Em cenas de interlúdio, você pode fazer a ação alimentar-se para cozinhar um prato especial. Você e todos os membros do grupo que fizeram a ação alimentar-se recebem o benefício de dois pratos. Caso o mesmo benefício seja escolhido duas vezes, seus efeitos se acumulam.",
      tags: ["origem", "suporte", "passivo"],
    },
  },
  {
    name: "Criminoso",
    description:
      "Você vivia uma vida fora da lei, seja como batedor de carteiras ou membro de uma facção criminosa. Em algum momento, se envolveu em um assunto da Ordem, talvez ao roubar um item amaldiçoado. A organização achou melhor recrutar seus talentos do que ter você como estorvo.",
    skills: ["Crime", "Furtividade"],
    power: {
      name: "O Crime Compensa",
      description:
        "No final de uma missão, escolha um item encontrado na missão. Em sua próxima missão, você pode incluir esse item em seu inventário sem que ele conte em seu limite de itens por patente.",
      tags: ["origem", "investigacao", "passivo"],
    },
  },
  {
    name: "Cultista Arrependido",
    description:
      "Você fez parte de um culto paranormal. Talvez fossem ignorantes iludidos ou talvez soubessem exatamente o que faziam. Algo abriu seus olhos e agora você luta pelo lado certo, embora carregue traços de sua vida pregressa e precise conquistar a confiança da Ordem.",
    skills: ["Ocultismo", "Religião"],
    power: {
      name: "Traços do Outro Lado",
      description:
        "Você possui um poder paranormal à sua escolha. Porém, começa o jogo com metade da Sanidade normal para sua classe.",
      tags: ["origem", "ritual", "passivo"],
    },
  },
  {
    name: "Desgarrado",
    description:
      "Você não vivia de acordo com as normas da sociedade. Podia ser um eremita, uma pessoa em situação de rua ou alguém que abandonou a rotina após descobrir o paranormal. A vida sem confortos modernos o deixou mais forte.",
    skills: ["Fortitude", "Sobrevivência"],
    power: {
      name: "Calejado",
      description: "Você recebe +1 PV para cada 5% de NEX.",
      tags: ["origem", "passivo", "exploracao"],
    },
  },
  {
    name: "Engenheiro",
    description:
      "Enquanto os acadêmicos se preocupam com teorias, você coloca a mão na massa, seja como engenheiro profissional ou inventor de garagem. Provavelmente criou algum dispositivo paranormal que chamou a atenção da Ordem.",
    skills: ["Profissão(Engenheiro)", "Tecnologia"],
    power: {
      name: "Ferramenta Favorita",
      description:
        "Um item a sua escolha, exceto armas, conta como uma categoria abaixo para você.",
      tags: ["origem", "suporte", "passivo"],
    },
  },
  {
    name: "Executivo",
    description:
      "Você trabalhava em uma grande empresa, banco ou corporação, lidando com papelada e burocracia. Sua vida mudou quando descobriu algo que não devia, talvez um ritual ou um culto corporativo. Após isso, foi recrutado pela Ordem.",
    skills: ["Diplomacia", "Profissão(Executivo)"],
    power: {
      name: "Processo Otimizado",
      description:
        "Sempre que faz um teste de perícia durante um teste estendido ou uma ação para revisar documentos físicos ou digitais, pode gastar 2 PE para receber +5 nesse teste.",
      tags: ["origem", "investigacao", "social"],
    },
  },
  {
    name: "Investigador",
    description:
      "Você era um investigador do governo, como um perito forense ou policial federal, ou privado, como um detetive particular. Pode ter tido contato com o paranormal em algum caso ou ter sido recrutado pela Ordem por suas habilidades de resolução de mistérios.",
    skills: ["Investigação", "Percepção"],
    power: {
      name: "Faro para Pistas",
      description:
        "Uma vez por cena, quando fizer um teste para procurar pistas, você pode gastar 1 PE para receber +5 nesse teste.",
      tags: ["origem", "investigacao", "reacao"],
    },
  },
  {
    name: "Lutador",
    description:
      "Você pratica uma arte marcial ou esporte de luta, ou cresceu em um bairro perigoso onde aprendeu briga de rua. Já quebrou muitos ossos, tanto seus quanto dos outros. Pode ter conhecido a Ordem após um torneio secreto envolvendo entidades do Outro Lado ou ter sido recrutado por sua capacidade de luta.",
    skills: ["Luta", "Reflexos"],
    power: {
      name: "Mão Pesada",
      description:
        "Você recebe +2 em rolagens de dano com ataques corpo a corpo.",
      tags: ["origem", "combate", "passivo"],
    },
  },
  {
    name: "Magnata",
    description:
      "Você possui muito dinheiro ou patrimônio. Pode ser herdeiro de uma família antiga ligada ao oculto, ter criado e vendido uma empresa ou ter ganho uma loteria após escolher números amaldiçoados que formavam um ritual.",
    skills: ["Diplomacia", "Pilotagem"],
    power: {
      name: "Patrocinador da Ordem",
      description:
        "Seu limite de crédito é sempre considerado um acima do atual.",
      tags: ["origem", "social", "passivo"],
    },
  },
  {
    name: "Mercenário",
    description:
      "Você é um soldado de aluguel, que trabalha sozinho ou como parte de uma organização que vende serviços militares. Escoltas e assassinatos fizeram parte de sua rotina por tempo o suficiente para você se envolver em alguma situação com o paranormal.",
    skills: ["Iniciativa", "Intimidação"],
    power: {
      name: "Posição de Combate",
      description:
        "No primeiro turno de cada cena de ação, você pode gastar 2 PE para receber uma ação de movimento adicional.",
      tags: ["origem", "combate", "reacao"],
    },
  },
  {
    name: "Militar",
    description:
      "Você serviu em uma força militar, como o exército ou a marinha. Passou muito tempo treinando com armas de fogo, até se tornar um perito no uso delas. Acostumado a obedecer ordens e partir em missões, está em casa na Ordo Realitas.",
    skills: ["Pontaria", "Tática"],
    power: {
      name: "Para Bellum",
      description: "Você recebe +2 em rolagens de dano com armas de fogo.",
      tags: ["origem", "combate", "passivo"],
    },
  },
  {
    name: "Operário",
    description:
      "Pedreiro, industriário ou operador de máquinas em fábrica. Você passou parte da vida em um emprego braçal, desenvolvendo uma visão pragmática do mundo. Sua rotina mundana foi confrontada pelo paranormal, e você não consegue mais esquecer o que viu.",
    skills: ["Fortitude", "Profissão(Operário)"],
    power: {
      name: "Ferramenta de Trabalho",
      description:
        "Escolha uma arma simples ou tática que, a critério do mestre, poderia ser usada como ferramenta em sua profissão. Você sabe usar a arma escolhida e recebe +1 em testes de ataque, rolagens de dano e margem de ameaça com ela.",
      tags: ["origem", "combate", "passivo"],
    },
  },
  {
    name: "Policial",
    description:
      "Você fez parte de uma força de segurança pública, civil ou militar. Em alguma patrulha ou chamado se deparou com um caso paranormal e sobreviveu para contar a história.",
    skills: ["Percepção", "Pontaria"],
    power: {
      name: "Patrulha",
      description: "Você recebe +2 em Defesa.",
      tags: ["origem", "combate", "passivo"],
    },
  },
  {
    name: "Religioso",
    description:
      "Você é devoto ou sacerdote de uma fé. Independentemente da religião, dedica-se a auxiliar pessoas com problemas espirituais. Esse caminho o levou ao contato com o paranormal e à convocação pela Ordem.",
    skills: ["Religião", "Vontade"],
    power: {
      name: "Acalentar",
      description:
        "Você recebe +5 em testes de Religião para acalmar. Além disso, quando acalma uma pessoa, ela recupera pontos de Sanidade iguais a 1d6 + a sua Presença.",
      tags: ["origem", "suporte", "ritual"],
    },
  },
  {
    name: "Servidor Público",
    description:
      "Você possuía carreira em um órgão do governo, lidando com burocracia e atendimento ao público. Sua rotina mudou ao descobrir cultos e rituais entre os próprios representantes do povo. Hoje, você sabe onde reside a esperança: na Ordo Realitas.",
    skills: ["Intuição", "Vontade"],
    power: {
      name: "Espírito Cívico",
      description:
        "Sempre que faz um teste para ajudar, você pode gastar 1 PE para aumentar o bônus concedido em +2.",
      tags: ["origem", "social", "suporte"],
    },
  },
  {
    name: "Teórico da Conspiração",
    description:
      "A humanidade nunca pisou na lua. Reptilianos ocupam cargos públicos. A Terra é plana e governada pelos Illuminati. Você investigou essas teorias a fundo e, ao esbarrar no paranormal real, acabou recrutado pela Ordem.",
    skills: ["Investigação", "Ocultismo"],
    power: {
      name: "Eu Já Sabia",
      description:
        "Você recebe resistência a dano mental igual ao seu Intelecto.",
      tags: ["origem", "exploracao", "passivo"],
    },
  },
  {
    name: "T.I.",
    description:
      "Programador, engenheiro de software ou simplesmente o cara da T.I., você tem treinamento e experiência para lidar com sistemas informatizados. Seu talento ou curiosidade chamou a atenção da Ordem.",
    skills: ["Investigação", "Tecnologia"],
    power: {
      name: "Motor de Busca",
      description:
        "A critério do mestre, sempre que tiver acesso à internet, você pode gastar 2 PE para substituir um teste de perícia qualquer por um teste de Tecnologia.",
      tags: ["origem", "investigacao", "suporte"],
    },
  },
  {
    name: "Trabalhador Rural",
    description:
      "Você trabalhava no campo ou em áreas isoladas, convivendo com a natureza e ouvindo histórias ao redor da fogueira. Em algum momento, descobriu que muitas dessas histórias eram verdadeiras.",
    skills: ["Adestramento", "Sobrevivência"],
    power: {
      name: "Desbravador",
      description:
        "Quando faz um teste de Adestramento ou Sobrevivência, você pode gastar 2 PE para receber +5 nesse teste. Além disso, você não sofre penalidade de deslocamento por terreno difícil.",
      tags: ["origem", "exploracao", "suporte"],
    },
  },
  {
    name: "Trambiqueiro",
    description:
      "Você vivia de pequenos golpes, jogatina ilegal e falcatruas. Um dia enganou a pessoa errada e acabou servindo à Ordem, usando agora sua lábia para algo maior.",
    skills: ["Crime", "Enganação"],
    power: {
      name: "Impostor",
      description:
        "Uma vez por cena, você pode gastar 2 PE para substituir um teste de perícia qualquer por um teste de Enganação.",
      tags: ["origem", "social", "reacao"],
    },
  },
  {
    name: "Universitário",
    description:
      "Você era aluno de uma faculdade e, entre provas e festas, acabou descobrindo algo que não devia. Recrutado pela Ordem, agora estuda sabendo que as provas podem ser mortais.",
    skills: ["Atualidades", "Investigação"],
    power: {
      name: "Dedicação",
      description:
        "Você recebe +1 PE, e mais 1 PE adicional a cada NEX ímpar. Além disso, seu limite de PE por turno aumenta em 1, sem afetar a DT de seus efeitos.",
      tags: ["origem", "passivo", "suporte"],
    },
  },
  {
    name: "Vítima",
    description:
      "Em algum momento da sua vida você encontrou o paranormal e sobreviveu a uma experiência traumática. Em vez de se abater, decidiu lutar para impedir que outros passem pelo mesmo.",
    skills: ["Reflexos", "Vontade"],
    power: {
      name: "Cicatrizes Psicológicas",
      description: "Você recebe +1 ponto de Sanidade para cada 5% de NEX.",
      tags: ["origem", "passivo", "suporte"],
    },
  },
  {
    name: "Amigo dos Animais",
    description:
      "Você desenvolveu uma conexão muito forte com os animais, preferindo muitas vezes sua companhia à dos humanos. Ao lado de um companheiro fiel, aprendeu a observar e compreender a natureza através deles.",
    skills: ["Adestramento", "Percepção"],
    power: {
      name: "Companheiro Animal",
      description:
        "Você consegue entender as intenções e sentimentos de animais e pode usar Adestramento para mudar a atitude deles. Além disso, possui um animal companheiro que fornece +2 em uma perícia à sua escolha (aprovada pelo mestre). Em NEX 35%, ele também fornece o bônus de um tipo de aliado à escolha. Em NEX 70%, concede a habilidade desse tipo de aliado. Se o companheiro morrer, você perde 10 pontos de Sanidade permanentemente e fica perturbado até o fim da cena.",
      tags: ["origem", "suporte", "exploracao", "passivo"],
    },
  },
  {
    name: "Astronauta",
    description:
      "Explorador espacial acostumado à pressão extrema e à responsabilidade por vidas humanas, foi na escuridão do espaço que você descobriu que não estamos sozinhos.",
    skills: ["Ciências", "Fortitude"],
    power: {
      name: "Acostumado ao Extremo",
      description:
        "Quando sofre dano de fogo, frio ou mental, você pode gastar 1 PE para reduzir esse dano em 5. Cada uso adicional na mesma cena aumenta o custo em +1 PE.",
      tags: ["origem", "reacao", "suporte"],
    },
  },
  {
    name: "Chef do Outro Lado",
    description:
      "Após sobreviver ao paranormal, você descobriu um talento proibido: cozinhar e ingerir entidades do Outro Lado, misturando ingredientes da Realidade com aquilo que não deveria existir.",
    skills: ["Ocultismo", "Profissão(Cozinheiro)"],
    power: {
      name: "Fome do Outro Lado",
      description:
        "Você pode usar partes de criaturas do Outro Lado como ingredientes culinários. No início de cada missão, pode solicitar essas partes como itens de Categoria I (0,5 espaço). Com uma ação de interlúdio e 1 ingrediente, prepara um prato especial com um teste de Profissão (cozinheiro) DT 15 +1d20 (resultado oculto). Em sucesso, o prato concede RD 10 contra o tipo de dano do elemento da criatura; em falha, causa vulnerabilidade. Os efeitos duram até o fim da próxima cena. Cada refeição consumida reduz permanentemente 1 ponto de Sanidade. Além disso, para cada parte diferente ingerida, o NEX aumenta em 3%, conforme as regras descritas.",
      tags: ["origem", "ritual", "reacao", "suporte"],
    },
  },
  {
    name: "Colegial",
    description:
      "Você era um estudante do colegial até que um encontro com o paranormal mudou sua vida. Jovem e inexperiente, descobriu que sua maior força está nas amizades.",
    skills: ["Atualidades", "Tecnologia"],
    power: {
      name: "Poder da Amizade",
      description:
        "Escolha um personagem como seu melhor amigo. Enquanto estiver em alcance médio e puderem trocar olhares, você recebe +2 em todos os testes de perícia. Se ele morrer, seu total de PE é reduzido em –1 para cada 5% de NEX até o fim da missão.",
      tags: ["origem", "suporte", "social"],
    },
  },
  {
    name: "Cosplayer",
    description:
      "Apaixonado pela arte do cosplay, você transformou sua criatividade e resiliência em ferramentas contra o paranormal, colocando sua arte a serviço da Ordem.",
    skills: ["Artes", "Vontade"],
    power: {
      name: "Não É Fantasia, É Cosplay!",
      description:
        "Você pode usar Artes em vez de Enganação para testes de disfarce. Além disso, se estiver usando um cosplay relacionado ao teste de perícia realizado, recebe +2 nesse teste.",
      tags: ["origem", "social", "passivo"],
    },
  },
  {
    name: "Diplomata",
    description:
      "Você atuava em ambientes políticos e sociais onde negociação era essencial, até descobrir que nem todas as entidades podem ser convencidas com palavras.",
    skills: ["Atualidades", "Diplomacia"],
    power: {
      name: "Conexões",
      description:
        "Você recebe +2 em Diplomacia. Além disso, se puder contatar um NPC capaz de ajudar, pode gastar 10 minutos e 2 PE para substituir um teste de perícia relacionado ao conhecimento desse NPC por um teste de Diplomacia até o fim da cena.",
      tags: ["origem", "social", "suporte"],
    },
  },
  {
    name: "Explorador",
    description:
      "Interessado em história e geografia, você passou anos em trilhas e expedições. Um encontro trágico com o paranormal marcou definitivamente sua jornada.",
    skills: ["Fortitude", "Sobrevivência"],
    power: {
      name: "Manual do Sobrevivente",
      description:
        "Ao resistir a armadilhas, clima, doenças, fome, sede, fumaça, sono, sufocamento ou veneno, incluindo fontes paranormais, você pode gastar 2 PE para receber +5 no teste. Além disso, em cenas de interlúdio, condições de sono precárias contam como normais para você.",
      tags: ["origem", "exploracao", "suporte", "passivo"],
    },
  },
  {
    name: "Experimento",
    description:
      "Você foi uma cobaia em um experimento físico ou paranormal, voluntário ou não. O processo deixou marcas permanentes e antinaturais em seu corpo, concedendo habilidades extraordinárias, mas também um estigma social.",
    skills: ["Atletismo", "Fortitude"],
    power: {
      name: "Mutação",
      description:
        "Você recebe resistência a dano 2 e +2 em uma perícia à sua escolha baseada originalmente em Força, Agilidade ou Vigor. Entretanto, sofre −1d20 em testes de Diplomacia.",
      tags: ["origem", "passivo", "combate"],
    },
  },
  {
    name: "Fanático por Criaturas",
    description:
      "Obcecado pelo sobrenatural desde sempre, você se tornou um caçador de monstros, investigando rumores e lendas. Essa obsessão acabou levando você a um encontro real com o paranormal.",
    skills: ["Investigação", "Ocultismo"],
    power: {
      name: "Conhecimento Oculto",
      description:
        "Você pode fazer testes de Ocultismo para identificar criaturas a partir de imagens, rastros ou indícios. Se passar, descobre as características da criatura, mas não sua identidade ou tipo específico. Além disso, ao passar nesse teste, recebe +2 em todos os testes contra a criatura até o fim da missão.",
      tags: ["origem", "investigacao", "combate"],
    },
  },
  {
    name: "Fotógrafo",
    description:
      "Artista visual que registra histórias através de imagens, você descobriu o paranormal ao observá-lo através de sua lente, capturando detalhes que olhos comuns não percebem.",
    skills: ["Artes", "Percepção"],
    power: {
      name: "Através da Lente",
      description:
        "Quando faz um teste de Investigação ou Percepção para adquirir pistas olhando através de uma câmera ou analisando fotos, você pode gastar 2 PE para receber +5 nesse teste. Um personagem que se move olhando através de uma lente anda à metade do deslocamento.",
      tags: ["origem", "investigacao", "suporte"],
    },
  },
  {
    name: "Inventor Paranormal",
    description:
      "Criativo e curioso, você passou a usar o paranormal como fonte de inspiração para suas invenções. Suas pesquisas chamaram atenção da Ordem por desafiar limites perigosos.",
    skills: ["Profissão (Engenheiro)", "Vontade"],
    power: {
      name: "Invenção Paranormal",
      description:
        "Escolha um ritual de 1º círculo. Você possui um invento paranormal de categoria 0 que ocupa 1 espaço e reproduz o efeito do ritual escolhido. Para ativá-lo, gasta uma ação padrão (ou a ação do ritual, o que for maior) e faz um teste de Profissão (engenheiro) DT 15 +5 por ativação na mesma missão. Em sucesso, o ritual é conjurado sem custo de PE. Em falha, o item enguiça. Uma ação de interlúdio permite consertá-lo e redefinir a DT para 15. Você pode trocar o ritual armazenado no início de cada missão.",
      tags: ["origem", "suporte", "ritual"],
    },
  },
  {
    name: "Jovem Místico",
    description:
      "Sua espiritualidade e conexão com o universo moldaram uma visão de mundo peculiar, tornando você mais sensível ao paranormal e aos seus presságios.",
    skills: ["Ocultismo", "Religião"],
    power: {
      name: "A Culpa é das Estrelas",
      description:
        "Escolha um número da sorte entre 1 e 6. No início de cada cena, você pode gastar 1 PE e rolar 1d6. Se cair em um de seus números da sorte, recebe +2 em testes de perícia até o fim da cena. Caso contrário, na próxima vez que usar esta habilidade, adicione mais um número da sorte. Quando obtiver sucesso, a quantidade de números volta a 1.",
      tags: ["origem", "suporte"],
    },
  },
  {
    name: "Legista do Turno da Noite",
    description:
      "Trabalhando em necrotérios durante a madrugada, você aprendeu que a morte nem sempre é o fim. Sons e sombras revelaram verdades que poucos suportariam encarar.",
    skills: ["Ciências", "Medicina"],
    power: {
      name: "Luto Habitual",
      description:
        "Você sofre apenas metade do dano mental ao presenciar cenas relacionadas à rotina de um legista, a critério do mestre. Além disso, ao fazer testes de Medicina para primeiros socorros ou necropsia, pode gastar 2 PE para receber +5 no teste.",
      tags: ["origem", "suporte"],
    },
  },
  {
    name: "Mateiro",
    description:
      "Você conhece áreas rurais e selvagens, seja como guia, biólogo de campo ou entusiasta da natureza. Foi através desse contato que você acabou encontrando o Outro Lado.",
    skills: ["Percepção", "Sobrevivência"],
    power: {
      name: "Mapa Celeste",
      description:
        "Desde que possa ver o céu, você sempre sabe a direção dos pontos cardeais e consegue chegar sem se perder a qualquer local que já tenha visitado ao menos uma vez. Ao fazer um teste de Sobrevivência, pode gastar 2 PE para rolar novamente e escolher o melhor resultado. Além disso, em cenas de interlúdio, você considera condições de sono precárias como normais.",
      tags: ["origem", "suporte", "exploracao"],
    },
  },
  {
    name: "Mergulhador",
    description:
      "Aventureiro do mundo submerso, você explorou profundezas desconhecidas até o dia em que encarou algo que não deveria existir sob as águas.",
    skills: ["Atletismo", "Fortitude"],
    power: {
      name: "Fôlego de Nadador",
      description:
        "Você recebe +5 PV e pode prender a respiração por um número de rodadas igual ao dobro do seu Vigor. Além disso, ao passar em um teste de Atletismo para natação, você se desloca sua distância normal, em vez da metade.",
      tags: ["origem", "exploracao", "suporte"],
    },
  },
  {
    name: "Motorista",
    description:
      "Condutor profissional de qualquer tipo de veículo, suas viagens acabaram cruzando o caminho do Outro Lado, transformando sua rotina em algo muito mais perigoso.",
    skills: ["Pilotagem", "Reflexos"],
    power: {
      name: "Mãos no Volante",
      description:
        "Você não sofre penalidades em testes de ataque por estar em um veículo em movimento. Além disso, sempre que estiver pilotando e precisar fazer um teste de Pilotagem ou de resistência, pode gastar 2 PE para receber +5 nesse teste.",
      tags: ["origem", "combate", "suporte"],
    },
  },
  {
    name: "Nerd Entusiasta",
    description:
      "Seu mergulho profundo em videogames, RPGs, ficção científica ou outros temas considerados nerds desenvolveu uma mente analítica e curiosa, chamando a atenção de organizações paranormais.",
    skills: ["Ciências", "Tecnologia"],
    power: {
      name: "O Inteligentão",
      description:
        "O bônus concedido pela ação de interlúdio ler aumenta em +1 dado, passando de +1d6 para +2d6.",
      tags: ["origem", "suporte"],
    },
  },
  {
    name: "Psicólogo",
    description:
      "Especialista na mente humana, você descobriu que algumas aflições psicológicas têm origens paranormais e passou a usar seus conhecimentos contra o Outro Lado.",
    skills: ["Intuição", "Profissão (Psicólogo)"],
    power: {
      name: "Terapia",
      description:
        "Você pode usar Profissão (psicólogo) no lugar de Diplomacia. Além disso, uma vez por rodada, quando você ou um aliado em alcance curto falha em um teste de resistência contra dano mental, pode gastar 2 PE para fazer um teste de Profissão (psicólogo) e usar esse resultado no lugar do teste falho.",
      tags: ["origem", "social"],
    },
  },
  {
    name: "Profetizado",
    description:
      "Você conhece fragmentos do seu próprio destino final. Por meio de visões, sonhos ou presságios, sabe como morrerá — e vive tentando evitar ou compreender esse fim inevitável.",
    skills: ["Vontade", "Escolha relacionada à premonição"],
    power: {
      name: "Luta ou Fuga",
      description:
        "Você recebe +2 em Vontade. Sempre que surge uma referência direta à sua premonição, além desse bônus, você recebe +2 PE temporários que duram até o fim da cena.",
      tags: ["origem", "passivo", "suporte"],
    },
  },
  {
    name: "Repórter Investigativo",
    description:
      "Obcecado pela verdade, você investiga fatos, coleta dados e entrevista fontes até descobrir o que está escondido. Essa busca acabou revelando horrores paranormais.",
    skills: ["Atualidades", "Investigação"],
    power: {
      name: "Encontrar a Verdade",
      description:
        "Você pode usar Investigação no lugar de Diplomacia para persuadir ou mudar atitudes. Além disso, ao fazer um teste de Investigação, pode gastar 2 PE para receber +5 nesse teste.",
      tags: ["origem", "social", "investigacao", "suporte"],
    },
  },
];

export const patent = [
  {
    name: "Sem Patente",
    credit: "Individual",
    prestige: 0,
    items: {
      tier1: 0,
      tier2: 0,
      tier3: 0,
      tier4: 0,
    },
    description: "Pessoas Normais, que não fazem parte da Ordem",
  },
  {
    name: "Recruta",
    credit: "Baixo",
    prestige: 0,
    items: {
      tier1: 2,
      tier2: 0,
      tier3: 0,
      tier4: 0,
    },
    description: "Agente novato, ainda sem experiência em missões.",
  },
  {
    name: "Operador",
    credit: "Médio",
    prestige: 20,
    items: {
      tier1: 3,
      tier2: 1,
      tier3: 0,
      tier4: 0,
    },
    description:
      ". Já possui alguma experiência e resolveu alguns casos paranormais. Patente da maioria dos membros da Ordem.",
  },
  {
    name: "Agente especial",
    credit: "Médio",
    prestige: 50,
    items: {
      tier1: 3,
      tier2: 2,
      tier3: 1,
      tier4: 0,
    },
    description:
      "Agente experiente, chamado para resolver casos difíceis e complexos, que exigem grande conhecimento e capacidade. Um agente especial já pode indicar novos recrutas para a Ordem.",
  },
  {
    name: "Oficial de operações",
    credit: "Alto",
    prestige: 100,
    items: {
      tier1: 3,
      tier2: 3,
      tier3: 2,
      tier4: 1,
    },
    description:
      "Com dezenas de casos resolvidos, esses agentes são acionados para missões de alta importância e perigo. Têm acesso à maioria dos arquivos confidenciais, além de prisioneiros e objetos amaldiçoados mantidos dentro da Ordem.",
  },
  {
    name: "Agente de elite",
    credit: "Ilimitado",
    prestige: 200,
    items: {
      tier1: 3,
      tier2: 3,
      tier3: 3,
      tier4: 2,
    },
    description:
      "As grandes lendas da Ordem, os raros agentes que sobreviveram à guerra contra o Outro Lado por muitos anos. Os melhores entre os melhores, chamados pela Ordem para resolver casos que envolvem perigos de escala global.",
  },
];

export const calculateStatus = (formula, attributes, level) => {
  let finalFormula = formula
    .replace(/\/LEVEL\//g, level)
    .replace(/\/VIG\//g, attributes.vigor)
    .replace(/\/PRE\//g, attributes.presenca)
    .replace(/\/INT\//g, attributes.intelecto)
    .replace(/\/AGI\//g, attributes.agilidade)
    .replace(/\/FOR\//g, attributes.forca);

  // Usa Function em vez de eval por segurança
  return new Function(`return ${finalFormula}`)();
};
