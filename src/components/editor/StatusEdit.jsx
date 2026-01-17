import { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Form,
  InputGroup,
  Stack,
  Button,
} from "react-bootstrap";
import {
  Heart,
  Brain,
  Zap,
  Shield,
  Flame,
  ShieldAlert,
  ShieldCheck,
  Activity,
  Wand2,
} from "lucide-react";
import { ELEMENT_DATA } from "../../configs/paranormal";
import { statusParams, calculateStatus } from "../../models/Rules";
import InfoTooltip from "../ui/InfoTooltip";

export default function StatusEdit({ data, onChange, character }) {
  const [status, setStatus] = useState({
    vidaMax: 0,
    sanidadeMax: 0,
    esforcoMax: 0,
    defesas: { passiva: 0, bonusReflexos: 0, bonusFortitude: 0 },
    resistencias: {
      elementos: {
        Mental: 0,
        Morte: 0,
        Conhecimento: 0,
        Sangue: 0,
        Energia: 0,
      },
      outras: {
        Dano: 0,
        Fisica: 0,
        Balistica: 0,
        Corte: 0,
        Impacto: 0,
        Perfuracao: 0,
        Eletricidade: 0,
        Fogo: 0,
        Frio: 0,
        Quimica: 0,
      },
    },
    ...data,
  });

  useEffect(() => {
    if (data) setStatus((prev) => ({ ...prev, ...data }));
  }, [data]);

  const handleUpdate = (path, value) => {
    const keys = path.split(".");
    const newStatus = { ...status };
    let current = newStatus;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;

    if (path === "vidaMax") newStatus.vida = value;
    if (path === "sanidadeMax") newStatus.sanidade = value;
    if (path === "esforcoMax") newStatus.esforco = value;

    setStatus(newStatus);
    if (onChange) onChange(newStatus);
  };

  const autoCalculate = () => {
    if (!character?.classe || !character?.atributos) {
      alert("Selecione a classe e defina os atributos primeiro!");
      return;
    }

    const params = statusParams[character.classe];
    if (!params) return;

    const newVida = calculateStatus(
      params.vida.calc,
      character.atributos,
      character.nivel
    );
    const newSan = calculateStatus(
      params.sanidade.calc,
      character.atributos,
      character.nivel
    );
    const newPe = calculateStatus(
      params.esforco.calc,
      character.atributos,
      character.nivel
    );

    const updated = {
      ...status,
      vidaMax: newVida,
      vida: newVida,
      sanidadeMax: newSan,
      sanidade: newSan,
      esforcoMax: newPe,
      esforco: newPe,
      defesas: {
        ...status.defesas,
        passiva: 10 + (character?.atributos?.agilidade || 0),
      },
    };

    setStatus(updated);
    if (onChange) onChange(updated);
  };

  const inputStyle = {
    backgroundColor: "#0d1117",
    color: "#fff",
    borderColor: "#2a2f3e",
  };
  const labelStyle = {
    color: "#f8f9fa",
    fontWeight: "700",
    letterSpacing: "0.5px",
  };

  return (
    <div className="pb-4">
      {/* BOTÃO DE CÁLCULO MÁGICO */}
      <div className="d-flex justify-content-end mb-3">
        <Button
          variant="outline-info"
          size="sm"
          onClick={autoCalculate}
          className="d-flex align-items-center gap-2"
        >
          <Wand2 size={16} /> Calcular por Classe e Nível
        </Button>
      </div>

      <Row className="g-3">
        {/* 1. ATRIBUTOS VITAIS */}
        <Col xs={12}>
          <Card
            style={{ backgroundColor: "#161a22", border: "1px solid #2a2f3e" }}
          >
            <Card.Body className="p-4">
              <Row className="g-4 text-center">
                <Col md={4}>
                  <InfoTooltip
                    title="Vida (PV)"
                    content="Sua saúde física. Quando chega a 0, você fica Morrendo."
                  >
                    <div
                      className="d-flex flex-column align-items-center mb-2"
                      style={{ cursor: "help" }}
                    >
                      <Heart
                        className="text-danger mb-2"
                        fill="#ff3b3b"
                        size={32}
                      />
                      <span style={labelStyle}>VIDA MÁXIMA</span>
                    </div>
                  </InfoTooltip>
                  <Form.Control
                    type="number"
                    className="form-control-lg text-center fw-bold text-danger"
                    style={{
                      ...inputStyle,
                      fontSize: "1.8rem",
                      borderBottom: "3px solid #ff3b3b",
                    }}
                    value={status.vidaMax}
                    onChange={(e) =>
                      handleUpdate("vidaMax", parseInt(e.target.value) || 0)
                    }
                  />
                </Col>

                <Col md={4}>
                  <InfoTooltip
                    title="Sanidade (SAN)"
                    content="Sua saúde mental. Quando chega a 0, você enlouquece."
                  >
                    <div
                      className="d-flex flex-column align-items-center mb-2"
                      style={{ cursor: "help" }}
                    >
                      <Brain
                        className="text-info mb-2"
                        fill="#3b82f6"
                        size={32}
                      />
                      <span style={labelStyle}>SANIDADE MÁXIMA</span>
                    </div>
                  </InfoTooltip>
                  <Form.Control
                    type="number"
                    className="form-control-lg text-center fw-bold text-info"
                    style={{
                      ...inputStyle,
                      fontSize: "1.8rem",
                      borderBottom: "3px solid #3b82f6",
                    }}
                    value={status.sanidadeMax}
                    onChange={(e) =>
                      handleUpdate("sanidadeMax", parseInt(e.target.value) || 0)
                    }
                  />
                </Col>

                <Col md={4}>
                  <InfoTooltip
                    title="Pontos de Esforço (PE)"
                    content="Usados para rituais e habilidades especiais."
                  >
                    <div
                      className="d-flex flex-column align-items-center mb-2"
                      style={{ cursor: "help" }}
                    >
                      <Zap
                        className="text-warning mb-2"
                        fill="#ffee58"
                        size={32}
                      />
                      <span style={labelStyle}>ESFORÇO (PE) MÁX.</span>
                    </div>
                  </InfoTooltip>
                  <Form.Control
                    type="number"
                    className="form-control-lg text-center fw-bold text-warning"
                    style={{
                      ...inputStyle,
                      fontSize: "1.8rem",
                      borderBottom: "3px solid #ffee58",
                    }}
                    value={status.esforcoMax}
                    onChange={(e) =>
                      handleUpdate("esforcoMax", parseInt(e.target.value) || 0)
                    }
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        {/* 2. DEFESAS */}
        <Col xs={12}>
          <Card
            style={{ backgroundColor: "#1c212b", border: "1px solid #3b82f6" }}
          >
            <Card.Header className="bg-primary bg-opacity-10 border-bottom border-primary py-3 d-flex justify-content-between">
              <div className="text-white fw-bold">
                <ShieldCheck size={20} className="me-2 text-primary" />{" "}
                CONFIGURAÇÃO DE DEFESAS
              </div>
              <InfoTooltip
                title="Defesas"
                content={`**Passiva:** 10 + Agilidade + Equipamento. \n   #A calculadora desconsidera Equipamento!#DC143C  \n**Esquiva:** Reação que soma Reflexos. \n**Bloqueio:** Reação que soma Fortitude à Resistência a Dano.`}
              />
            </Card.Header>
            <Card.Body className="p-4">
              <Row className="g-3">
                <Col md={4}>
                  <Form.Label className="small text-white-50 fw-bold">
                    DEFESA PASSIVA
                  </Form.Label>
                  <InputGroup>
                    <InputGroup.Text className="bg-dark border-secondary text-white">
                      <Shield size={16} />
                    </InputGroup.Text>
                    <Form.Control
                      type="number"
                      style={{ ...inputStyle, fontSize: "1.2rem" }}
                      value={status.defesas.passiva}
                      onChange={(e) =>
                        handleUpdate(
                          "defesas.passiva",
                          parseInt(e.target.value) || 0
                        )
                      }
                    />
                  </InputGroup>
                </Col>
                <Col md={4}>
                  <Form.Label className="small text-white-50 fw-bold">
                    BÔNUS ESQUIVA (REFLEXOS)
                  </Form.Label>
                  <InputGroup>
                    <InputGroup.Text className="bg-dark border-secondary text-primary">
                      <Activity size={16} />
                    </InputGroup.Text>
                    <Form.Control
                      type="number"
                      style={{ ...inputStyle, fontSize: "1.2rem" }}
                      value={status.defesas.bonusReflexos}
                      onChange={(e) =>
                        handleUpdate(
                          "defesas.bonusReflexos",
                          parseInt(e.target.value) || 0
                        )
                      }
                    />
                  </InputGroup>
                </Col>
                <Col md={4}>
                  <Form.Label className="small text-white-50 fw-bold">
                    BÔNUS BLOQUEIO (FORTITUDE)
                  </Form.Label>
                  <InputGroup>
                    <InputGroup.Text className="bg-dark border-secondary text-success">
                      <ShieldAlert size={16} />
                    </InputGroup.Text>
                    <Form.Control
                      type="number"
                      style={{ ...inputStyle, fontSize: "1.2rem" }}
                      value={status.defesas.bonusFortitude}
                      onChange={(e) =>
                        handleUpdate(
                          "defesas.bonusFortitude",
                          parseInt(e.target.value) || 0
                        )
                      }
                    />
                  </InputGroup>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        {/* 3. RESISTÊNCIAS ELEMENTAIS */}
        <Col xs={12}>
          <Card
            style={{ backgroundColor: "#161a22", border: "1px solid #2a2f3e" }}
          >
            <Card.Header className="bg-dark border-secondary py-3 text-white fw-bold d-flex justify-content-between">
              <div>
                <Flame size={18} className="me-2 text-danger" /> RESISTÊNCIAS
                PARANORMAIS
              </div>
              <InfoTooltip
                title="Resistências"
                content="Valor subtraído do dano recebido daquele tipo específico."
              />
            </Card.Header>
            <Card.Body>
              <Row className="g-3 justify-content-center">
                {Object.entries(status.resistencias.elementos)
                  .sort((a, b) => a[0].localeCompare(b[0]))
                  .map(([elem, val]) => {
                    const keyBusca =
                      elem.toLowerCase() === "mental"
                        ? "medo"
                        : elem.toLowerCase();
                    const elementoInfo = ELEMENT_DATA[keyBusca];
                    return (
                      <Col xs={6} md={4} lg={2} key={elem}>
                        <div className="text-center mb-2">
                          {elementoInfo?.icon && (
                            <img
                              src={elementoInfo.icon}
                              alt={elem}
                              style={{
                                width: "28px",
                                height: "28px",
                                objectFit: "contain",
                              }}
                            />
                          )}
                          <div
                            className="small mt-1 fw-bold"
                            style={{ color: elementoInfo?.color || "#adb5bd" }}
                          >
                            {elem.toUpperCase()}
                          </div>
                        </div>
                        <Form.Control
                          type="number"
                          size="sm"
                          className="text-center fw-bold"
                          style={inputStyle}
                          value={val}
                          onChange={(e) =>
                            handleUpdate(
                              `resistencias.elementos.${elem}`,
                              parseInt(e.target.value) || 0
                            )
                          }
                        />
                      </Col>
                    );
                  })}
              </Row>
            </Card.Body>
          </Card>
        </Col>

        {/* 4. OUTRAS RESISTÊNCIAS (Resumido para o exemplo) */}
        <Col xs={12}>
          <Card
            style={{ backgroundColor: "#161a22", border: "1px solid #2a2f3e" }}
          >
            <Card.Header className="bg-dark border-secondary py-2 small text-white fw-bold">
              RESISTÊNCIAS GERAIS E FÍSICAS
            </Card.Header>
            <Card.Body className="py-2">
              <Row className="g-2">
                {Object.entries(status.resistencias.outras).map(
                  ([res, val]) => (
                    <Col xs={6} md={3} lg={2} key={res}>
                      <InputGroup size="sm">
                        <InputGroup.Text
                          style={{ width: "85px", fontSize: "0.65rem" }}
                          className="bg-dark border-secondary text-white-50 fw-bold"
                        >
                          {res.toUpperCase()}
                        </InputGroup.Text>
                        <Form.Control
                          type="number"
                          style={inputStyle}
                          value={val}
                          onChange={(e) =>
                            handleUpdate(
                              `resistencias.outras.${res}`,
                              parseInt(e.target.value) || 0
                            )
                          }
                        />
                      </InputGroup>
                    </Col>
                  )
                )}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
