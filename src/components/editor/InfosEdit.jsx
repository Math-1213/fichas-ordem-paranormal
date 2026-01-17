import { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Form,
  Badge,
  Button,
  Modal,
  InputGroup,
  Tabs,
  Tab,
} from "react-bootstrap";
import {
  User,
  BookOpen,
  Shield,
  MapPin,
  Ghost,
  Plus,
  FileJson,
  Edit3,
} from "lucide-react";
import InfoTooltip from "../ui/InfoTooltip";
import { classes, trails, origins, patent } from "../../models/Rules";
import { PERICIAS } from "../../configs/skills";
import { ELEMENTS, ELEMENT_DATA } from "../../configs/paranormal";

export default function InfosEdit({ data, onChange }) {
  // Estado local para o formulário
  const [infos, setInfos] = useState(data || {});
  const [showOriginModal, setShowOriginModal] = useState(false);
  const [jsonInput, setJsonInput] = useState("");
  const [customOrigin, setCustomOrigin] = useState({
    name: "",
    description: "",
    skills: ["", ""],
    power: { name: "", description: "" },
  });

  // Sincroniza o estado local se o dado vindo do pai mudar (ex: carregamento do banco)
  useEffect(() => {
    if (data) setInfos(data);
  }, [data]);

  const handleSaveCustomOrigin = (originData) => {
    const data = originData || customOrigin;

    if (!data.name) {
      alert("A origem precisa de um nome!");
      return;
    }

    // Criamos o novo estado de uma vez só, garantindo a integridade
    const newInfos = {
      ...infos,
      origem: data.name,
      origemDetalhes: data, // Detalhes completos (descrição, perícias, poder)
    };

    // Atualiza o estado local
    setInfos(newInfos);

    // Notifica o componente pai uma única vez com o objeto completo
    onChange(newInfos);

    setShowOriginModal(false);
  };

  const handleImportJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      if (parsed.name) {
        handleSaveCustomOrigin(parsed);
      } else {
        alert("JSON inválido: O campo 'name' é obrigatório.");
      }
    } catch (e) {
      alert("Erro ao ler JSON. Verifique a formatação.");
    }
  };

  // Handler que atualiza localmente e notifica o pai
  const handleChange = (path, value) => {
    const keys = path.split(".");
    let newInfos;

    if (keys.length > 1) {
      newInfos = {
        ...infos,
        [keys[0]]: { ...(infos[keys[0]] || {}), [keys[1]]: value },
      };
    } else {
      newInfos = { ...infos, [path]: value };
    }

    // Lógica adicional: Se mudar a classe, reseta a trilha para evitar incompatibilidade
    if (path === "classe") {
      newInfos.trilha = "";
    }

    setInfos(newInfos);
    onChange(newInfos);
  };

  const sectionStyle = {
    borderBottom: "1px solid #2a2f3e",
    paddingBottom: "1.5rem",
    marginBottom: "1.5rem",
  };

  const labelStyle = {
    color: "#9aa0b3",
    fontSize: "0.75rem",
    fontWeight: "bold",
    textTransform: "uppercase",
  };
  const inputStyle = {
    backgroundColor: "#0d1117",
    color: "#e6e6e6",
    borderColor: "#2a2f3e",
  };

  return (
    <>
      {/* MODAL DE ORIGEM PERSONALIZADA */}
      <Modal
        show={showOriginModal}
        onHide={() => setShowOriginModal(false)}
        centered
        size="lg"
        contentClassName="bg-dark text-light border-secondary"
      >
        <Modal.Header
          closeButton
          closeVariant="white"
          className="border-secondary"
        >
          <Modal.Title className="text-info fs-5">
            Configurar Origem Única
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs defaultActiveKey="manual" className="mb-3 custom-tabs">
            <Tab
              eventKey="manual"
              title={
                <span>
                  <Edit3 size={16} className="me-1" /> Criar Manual
                </span>
              }
            >
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label style={labelStyle}>Nome da Origem</Form.Label>
                    <Form.Control
                      style={inputStyle}
                      value={customOrigin.name}
                      onChange={(e) =>
                        setCustomOrigin({
                          ...customOrigin,
                          name: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label style={labelStyle}>Perícias</Form.Label>
                    <div className="d-flex gap-2">
                      {[0, 1].map((i) => (
                        <Form.Select
                          key={i}
                          style={inputStyle}
                          value={customOrigin.skills[i]}
                          onChange={(e) => {
                            const s = [...customOrigin.skills];
                            s[i] = e.target.value;
                            setCustomOrigin({ ...customOrigin, skills: s });
                          }}
                        >
                          <option value="">Escolha...</option>
                          {Object.values(PERICIAS).map((p) => (
                            <option key={p.label} value={p.label}>
                              {p.label}
                            </option>
                          ))}
                        </Form.Select>
                      ))}
                    </div>
                  </Form.Group>
                </Col>
                <Col md={12} className="mb-3">
                  <Form.Label style={labelStyle}>Descrição</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    style={inputStyle}
                    value={customOrigin.description}
                    onChange={(e) =>
                      setCustomOrigin({
                        ...customOrigin,
                        description: e.target.value,
                      })
                    }
                  />
                </Col>
                <h6 className="text-info opacity-75">Poder da Origem</h6>
                <Col md={4}>
                  <Form.Control
                    placeholder="Nome do Poder"
                    className="mb-2"
                    style={inputStyle}
                    value={customOrigin.power.name}
                    onChange={(e) =>
                      setCustomOrigin({
                        ...customOrigin,
                        power: { ...customOrigin.power, name: e.target.value },
                      })
                    }
                  />
                </Col>
                <Col md={8}>
                  <Form.Control
                    placeholder="Descrição do Poder"
                    className="mb-2"
                    style={inputStyle}
                    value={customOrigin.power.description}
                    onChange={(e) =>
                      setCustomOrigin({
                        ...customOrigin,
                        power: {
                          ...customOrigin.power,
                          description: e.target.value,
                        },
                      })
                    }
                  />
                </Col>
              </Row>
              <div className="d-flex justify-content-end mt-3">
                <Button variant="info" onClick={() => handleSaveCustomOrigin()}>
                  Aplicar Origem
                </Button>
              </div>
            </Tab>

            <Tab
              eventKey="import"
              title={
                <span>
                  <FileJson size={16} className="me-1" /> Importar JSON
                </span>
              }
            >
              <Form.Group className="mb-3">
                <Form.Label style={labelStyle}>
                  Cole o código JSON da origem abaixo
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={8}
                  style={{
                    ...inputStyle,
                    fontFamily: "monospace",
                    fontSize: "0.85rem",
                  }}
                  placeholder='{ "name": "...", "description": "...", "skills": ["...", "..."], "power": { ... } }'
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                />
              </Form.Group>
              <div className="d-flex justify-content-end">
                <Button variant="info" onClick={handleImportJson}>
                  Validar e Importar
                </Button>
              </div>
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
      <Card
        style={{
          backgroundColor: "#161a22",
          border: "1px solid #2a2f3e",
          color: "#e6e6e6",
        }}
      >
        <Card.Header
          style={{
            backgroundColor: "#1e2330",
            borderBottom: "1px solid #2a2f3e",
            fontWeight: 600,
          }}
        >
          <User size={18} className="me-2 text-info" /> Identidade do
          Investigador
        </Card.Header>

        <Card.Body>
          {/* IDENTIFICAÇÃO BÁSICA */}
          <Row style={sectionStyle}>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label style={labelStyle}>Nome do Personagem</Form.Label>
                <Form.Control
                  type="text"
                  value={infos.nome || ""}
                  onChange={(e) => handleChange("nome", e.target.value)}
                  style={{
                    ...inputStyle,
                    color: "#8b5cf6",
                    fontWeight: "bold",
                  }}
                  placeholder="Ex: Arthur Cervero"
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label style={labelStyle}>Jogador</Form.Label>
                <Form.Control
                  type="text"
                  value={infos.jogador || ""}
                  onChange={(e) => handleChange("jogador", e.target.value)}
                  style={inputStyle}
                />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Label style={labelStyle}>Idade</Form.Label>
              <Form.Control
                type="number"
                value={infos.idade || ""}
                onChange={(e) => handleChange("idade", e.target.value)}
                style={inputStyle}
              />
            </Col>
            <Col md={3}>
              <Form.Label style={labelStyle}>Nacionalidade</Form.Label>
              <Form.Control
                type="text"
                value={infos.nacionalidade || ""}
                onChange={(e) => handleChange("nacionalidade", e.target.value)}
                style={inputStyle}
              />
            </Col>
          </Row>

          {/* ORIGEM E CARREIRA */}
          <Row style={sectionStyle}>
            <Col md={3}>
              <Form.Label
                style={labelStyle}
                className="d-flex align-items-center"
              >
                Classe{" "}
                <InfoTooltip
                  content={`
                  **Classe**
                  Representa seu treinamento e papel no grupo. Existem três arquétipos principais:

                  - #**Combatente**#ff1744: A linha de frente. Especialista em combate, durão e perigoso.
                  - #**Especialista**#0dcaf0: O mestre das perícias. Focado em resolver problemas com inteligência e lábia.
                  - #**Ocultista**#9D00FF: O mestre do paranormal. Manipula rituais e mistérios, mas paga um preço alto.
                  `}
                />
              </Form.Label>
              <Form.Select
                value={infos.classe || ""}
                onChange={(e) => handleChange("classe", e.target.value)}
                style={inputStyle}
              >
                <option value="">Selecione...</option>
                {classes.map((cls) => (
                  <option key={cls.name} value={cls.name}>
                    {cls.name}
                  </option>
                ))}
              </Form.Select>
            </Col>

            <Col md={3}>
              <Form.Label
                style={labelStyle}
                className="d-flex align-items-center"
              >
                Trilha{" "}
                <InfoTooltip
                  content={`
                **Trilha**
                Habilidades especializadas dentro da sua classe.

                - Você escolhe sua Trilha ao atingir **Nível 2**.
                - Conforme você sobe de nível, recebe novos poderes exclusivos da sua especialização escolhida.  
                `}
                />
              </Form.Label>
              <Form.Select
                value={infos.trilha || ""}
                onChange={(e) => handleChange("trilha", e.target.value)}
                style={inputStyle}
                disabled={!infos.classe}
              >
                {/* Lógica dinâmica para o placeholder */}
                {!infos.classe ? (
                  <option value="">Selecione uma classe primeiro...</option>
                ) : (
                  <option value="">Selecione uma trilha...</option>
                )}

                {infos.classe &&
                  trails[infos.classe]?.map((t) => (
                    <option key={t.name} value={t.name}>
                      {t.name}
                    </option>
                  ))}
              </Form.Select>
            </Col>
            <Col md={3}>
              <Form.Label
                style={labelStyle}
                className="d-flex align-items-center"
              >
                Origem{" "}
                <InfoTooltip
                  content={`
                **Origem**
                O que você fazia antes do Paranormal. Define sua vida pregressa e como ela influencia sua carreira.

                - Concede duas **Perícias Treinadas** específicas.
                - Concede um **Poder de Origem** único (ex: bônus em itens, contatos ou habilidades especiais).  
                `}
                />
              </Form.Label>
              <InputGroup>
                <Form.Select
                  value={infos.origem || ""}
                  onChange={(e) => handleChange("origem", e.target.value)}
                  style={inputStyle}
                >
                  <option value="">Selecione...</option>
                  {origins.map((ori) => (
                    <option key={ori.name} value={ori.name}>
                      {ori.name}
                    </option>
                  ))}
                  {/* Exibe a origem customizada se ela não estiver na lista padrão */}
                  {infos.origem &&
                    !origins.some((o) => o.name === infos.origem) && (
                      <option value={infos.origem}>
                        {infos.origem} (Custom)
                      </option>
                    )}
                </Form.Select>
                <Button
                  variant="outline-info"
                  onClick={() => setShowOriginModal(true)}
                  style={{ borderColor: "#2a2f3e", backgroundColor: "#1e2330" }}
                >
                  <Plus size={18} />
                </Button>
              </InputGroup>
            </Col>
            <Col md={3}>
              <Form.Label
                style={labelStyle}
                className="d-flex align-items-center"
              >
                Patente{" "}
                <InfoTooltip
                  content={`
                **Patente**
                Sua posição hierárquica na Ordem (Recruta, Operador, Agente Especial, etc.).

                - **Recursos**: Define quantos itens de cada categoria você pode levar por missão.
                - **Crédito**: Determina seu limite para gastos gerais e prestígio na organização.
                - **Promoção**: Aumenta conforme você acumula **Pontos de Prestígio (PP)** em missões.  
                `}
                />
              </Form.Label>
              <Form.Select
                value={infos.patente || ""}
                onChange={(e) => {
                  const selectedPatent = patent.find(
                    (p) => p.name === e.target.value
                  );
                  handleChange("patente", e.target.value);
                }}
                style={inputStyle}
              >
                <option value="">Selecione...</option>
                {patent.map((p) => (
                  <option key={p.name} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>

          {/* MECÂNICAS ORDEM */}
          <Row style={sectionStyle}>
            <Col md={2} xs={6}>
              <Form.Label
                style={labelStyle}
                className="d-flex align-items-center"
              >
                NEX (%){" "}
                <InfoTooltip
                  content={`
                **NEX (Exposição Paranormal)**
                Mede o quanto da sua humanidade foi substituída pelo Paranormal.

                - **Conexão**: Quanto maior o NEX, mais rituais e poderes você pode manifestar.
                - **Preço**: A exposição altera sua mente e aparência, muitas vezes de forma debilitante.
                - **Afinidade**: Ao atingir **NEX 50%**, a exposição é tão alta que você se conecta permanentemente a um Elemento.
                - **Limite**: Personagens com NEX muito alto correm o risco de perder totalmente o vínculo com a Realidade.
                `}
                  placement="top"
                />
              </Form.Label>
              <Form.Control
                type="number"
                value={infos.nex || 0}
                onChange={(e) =>
                  handleChange("nex", parseInt(e.target.value) || 0)
                }
                style={inputStyle}
              />
            </Col>
            <Col md={2} xs={6}>
              <Form.Label
                style={labelStyle}
                className="d-flex align-items-center"
              >
                Nível{" "}
                <InfoTooltip
                  content={`
                **Nível de Experiência**
                Representa seu treinamento técnico, saber acadêmico e capacidades físicas mundanas.

                - **Escala**: Cada **1 Nível** equivale a **5% de NEX**.
                - **Mecânica**: Substitui o NEX como pré-requisito para habilidades de classe e benefícios de Origem.
                - **Exemplo**: Se uma habilidade exige NEX 35%, agora ela exige **Nível 7**.
                - **Progressão**: Você sobe de nível ao concluir missões e treinar suas capacidades na Realidade.
                `}
                />
              </Form.Label>
              <Form.Control
                type="number"
                value={infos.nivel || 0}
                onChange={(e) =>
                  handleChange("nivel", parseInt(e.target.value) || 0)
                }
                style={inputStyle}
              />
            </Col>
            <Col md={2} xs={6}>
              <Form.Label
                style={labelStyle}
                className="d-flex align-items-center"
              >
                PE / Rodada{" "}
                <InfoTooltip
                  content={`
                **Limite de PE por Rodada**
                O máximo de Pontos de Esforço que você pode gastar em um único turno.

                - **Cálculo**: Atualmente igual ao seu **Nível** (equivalente a 1 PE a cada 5% de NEX).
                - **Flexibilidade**: Você sempre pode usar pelo menos uma habilidade em seu custo mínimo, mesmo que ultrapasse o limite.
                - **Combos**: Você pode somar várias habilidades, desde que o total não ultrapasse este valor.
                `}
                />
              </Form.Label>
              <Form.Control
                type="number"
                value={infos.peRodada || 0}
                onChange={(e) =>
                  handleChange("peRodada", parseInt(e.target.value) || 0)
                }
                style={inputStyle}
              />
            </Col>
            <Col md={2} xs={6}>
              <Form.Label
                style={labelStyle}
                className="d-flex align-items-center"
              >
                DT Ritual{" "}
                <InfoTooltip
                  content={`
                **DT Ritual (Dificuldade)**
                O quão difícil é para um alvo resistir aos seus efeitos paranormais.

                - **Cálculo**: 10 + #**Limite de PE**#0dcaf0 + #**Presença**#ffea00.
                - **Resistência**: O alvo deve rolar um dado e igualar ou superar este valor para reduzir ou anular o efeito do ritual.  
                `}
                />
              </Form.Label>
              <Form.Control
                type="number"
                value={infos.dtRitual || 0}
                onChange={(e) =>
                  handleChange("dtRitual", parseInt(e.target.value) || 0)
                }
                style={inputStyle}
              />
            </Col>
            <Col md={3}>
              <Form.Label
                className="d-flex align-items-center"
                style={labelStyle}
              >
                Afinidade{" "}
                <InfoTooltip
                  content={`
                    **AFINIDADE (NEX 50%)**
                    Ao atingir 50%, você se conecta a uma entidade. Isso permite conjurar rituais sem componentes e aprender rituais exclusivos.

                    **Escolha seu Elemento:**
                    - #**Sangue**#ff1744: Instinto e Fome. Causa hipertrofia, sentidos aguçados e instabilidade emocional.
                    - #**Morte**#757575: Tempo e Entropia. Resulta em apatia, pele acinzentada e envelhecimento precoce.
                    - #**Conhecimento**#ffea00: Lógica e Verdade. Traz personalidade estratégica, inscrições na pele e aura dourada.
                    - #**Energia**#9D00FF: Caos e Mudança. Gera hiperatividade, olhos multicoloridos e tiques incontroláveis.
                    - #**Medo**#ffffff: O Infinito e o Paranormal em sua forma mais pura.

                    **Nota**: Uma vez escolhida, a afinidade não pode ser alterada.`}
                />
              </Form.Label>
              <InputGroup>
                {/* Mostra o símbolo do elemento antes do Select se houver um selecionado */}
                {infos.afinidade && infos.afinidade !== "Nenhum" && (
                  <InputGroup.Text
                    style={{
                      backgroundColor: "#1e2330",
                      borderColor:
                        ELEMENT_DATA[infos.afinidade.toLowerCase()]?.color ||
                        "#2a2f3e",
                      padding: "5px",
                    }}
                  >
                    <img
                      src={ELEMENT_DATA[infos.afinidade.toLowerCase()]?.icon}
                      alt={infos.afinidade}
                      style={{
                        width: "20px",
                        height: "20px",
                        objectFit: "contain",
                      }}
                      // Caso a imagem falhe, não quebra o layout
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  </InputGroup.Text>
                )}

                <Form.Select
                  value={infos.afinidade || ""}
                  onChange={(e) => handleChange("afinidade", e.target.value)}
                  style={{
                    ...inputStyle,
                    borderColor: infos.afinidade
                      ? ELEMENT_DATA[infos.afinidade.toLowerCase()]?.color
                      : "#2a2f3e",
                  }}
                >
                  <option value="">Selecione...</option>
                  {Object.entries(ELEMENTS).map(([key, label]) => (
                    <option key={key} value={label}>
                      {label}
                    </option>
                  ))}
                </Form.Select>
              </InputGroup>
            </Col>
          </Row>

          {/* LOGÍSTICA E PORTRAIT */}
          <Row style={sectionStyle}>
            <Col md={2}>
              <Form.Label
                style={labelStyle}
                className="d-flex align-items-center"
              >
                Carga Max{" "}
                <InfoTooltip
                  content={`
                  **Carga Máxima**
                  Capacidade de carregar equipamentos (em espaços).

                  - **Cálculo**: 5 espaços por cada ponto de #**Força**#ff1744. (Mínimo de 2 se Força for 0).
                  - **Sobrecarregado**: Se passar do limite, sofre **-5 em Defesa**, penalidade em perícias e **-3m de Deslocamento**.
                  - **Limite Absoluto**: Você não pode carregar mais que o dobro da sua carga máxima.
                  `}
                />
              </Form.Label>
              <Form.Control
                type="number"
                value={infos.carga || 0}
                onChange={(e) =>
                  handleChange("carga", parseInt(e.target.value) || 0)
                }
                style={inputStyle}
              />
            </Col>
            <Col md={2}>
              <Form.Label
                style={labelStyle}
                className="d-flex align-items-center"
              >
                Deslocamento{" "}
                <InfoTooltip
                  content={`**Deslocamento**
                    Sua velocidade em combate.

                    - **Padrão**: 9 metros por ação de movimento (6 quadrados).
                    - **Terreno**: Algumas condições ou habilidades podem aumentar ou reduzir essa distância.`}
                />
              </Form.Label>
              <Form.Control
                type="number"
                value={infos.deslocamento || 0}
                onChange={(e) =>
                  handleChange("deslocamento", parseInt(e.target.value) || 0)
                }
                style={inputStyle}
              />
            </Col>
            <Col md={8}>
              <Form.Label style={labelStyle}>
                URL do Portrait (Imagem)
              </Form.Label>
              <Form.Control
                type="text"
                value={infos.portrait || ""}
                onChange={(e) => handleChange("portrait", e.target.value)}
                style={inputStyle}
                placeholder="https://link-da-imagem.com/foto.png"
              />
            </Col>
          </Row>

          {/* NARRATIVA COMPLEXA */}
          <div className="mt-4">
            <h5 className="text-info mb-4 d-flex align-items-center">
              <BookOpen size={18} className="me-2" /> Detalhes Psicológicos &
              Narrativos
            </h5>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label style={labelStyle}>Aparência</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    style={inputStyle}
                    value={infos.narrativa?.aparencia || ""}
                    onChange={(e) =>
                      handleChange("narrativa.aparencia", e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label style={labelStyle}>Personalidade</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    style={inputStyle}
                    value={infos.narrativa?.personalidade || ""}
                    onChange={(e) =>
                      handleChange("narrativa.personalidade", e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label style={labelStyle}>Fobias / Traumas</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    style={inputStyle}
                    value={infos.narrativa?.fobias || ""}
                    onChange={(e) =>
                      handleChange("narrativa.fobias", e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label style={labelStyle}>Pior Pesadelo</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    style={inputStyle}
                    value={infos.narrativa?.piorPesadelo || ""}
                    onChange={(e) =>
                      handleChange("narrativa.piorPesadelo", e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label style={labelStyle}>
                    Primeiro Encontro com o Paranormal
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    style={inputStyle}
                    value={infos.narrativa?.primeiroEncontro || ""}
                    onChange={(e) =>
                      handleChange("narrativa.primeiroEncontro", e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label style={labelStyle}>História de Vida</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    style={inputStyle}
                    value={infos.narrativa?.historia || ""}
                    onChange={(e) =>
                      handleChange("narrativa.historia", e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
