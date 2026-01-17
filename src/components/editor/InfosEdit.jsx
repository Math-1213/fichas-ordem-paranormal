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
              <Form.Label style={labelStyle}>Classe</Form.Label>
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
              <Form.Label style={labelStyle}>Trilha</Form.Label>
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
              <Form.Label style={labelStyle}>Origem</Form.Label>
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
              <Form.Label style={labelStyle}>Patente</Form.Label>
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
              <Form.Label style={labelStyle}>NEX (%)</Form.Label>
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
              <Form.Label style={labelStyle}>Nível</Form.Label>
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
              <Form.Label style={labelStyle}>PE / Rodada</Form.Label>
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
              <Form.Label style={labelStyle}>DT Ritual</Form.Label>
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
              <Form.Label style={labelStyle}>Afinidade</Form.Label>
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
              <Form.Label style={labelStyle}>Carga Max</Form.Label>
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
              <Form.Label style={labelStyle}>Deslocamento</Form.Label>
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
