import { useState, useEffect } from "react";
import { Card, Row, Col, Form, Badge } from "react-bootstrap";
import { Search, Award } from "lucide-react";
import { PERICIAS, TREINO_LABELS, TREINO_COLORS } from "../../configs/skills";
import InfoTooltip from "../ui/InfoTooltip";

export default function PericiasEdit({ data, onChange }) {
  const [pericias, setPericias] = useState(data || {});
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (data) setPericias(data);
  }, [data]);

  const handleUpdate = (nome, field, value) => {
    const newPericias = {
      ...pericias,
      [nome]: {
        ...(pericias[nome] || {
          treino: "destreinado",
          bonus: 0,
          dadosExtras: 0,
        }),
        [field]: value,
      },
    };
    setPericias(newPericias);
    if (onChange) onChange(newPericias);
  };

  const filteredSkills = Object.keys(PERICIAS)
    .sort((a, b) => PERICIAS[a].label.localeCompare(PERICIAS[b].label))
    .filter((nome) =>
      PERICIAS[nome].label.toLowerCase().includes(filter.toLowerCase())
    );

  const inputStyle = {
    backgroundColor: "#0d1117",
    color: "#fff",
    borderColor: "#2a2f3e",
  };

  return (
    <Card style={{ backgroundColor: "#161a22", border: "1px solid #2a2f3e" }}>
      <Card.Header className="bg-dark border-secondary p-3">
        <Row className="align-items-center">
          <Col>
            <h5 className="mb-0 text-white d-flex align-items-center gap-2">
              <Award size={20} className="text-info" /> Treinamento de Perícias
            </h5>
          </Col>
          <Col xs="auto">
            <div className="position-relative">
              <Search
                size={16}
                className="position-absolute"
                style={{ left: "10px", top: "10px", color: "#9aa0b3" }}
              />
              <Form.Control
                placeholder="Buscar perícia..."
                size="sm"
                className="ps-5"
                style={{ ...inputStyle, width: "200px" }}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>
          </Col>
        </Row>
      </Card.Header>

      <Card.Body style={{ padding: "1rem" }}>
        {/* HEADER DA TABELA */}
        <Row className="mb-2 px-2 text-info small fw-bold d-none d-md-flex">
          <Col md={3}>PERÍCIA / ATRIBUTO</Col>
          <Col md={3}>TREINAMENTO</Col>
          <Col md={2}>BÔNUS FIXO</Col>
          <Col md={2}>DADOS EXTRAS</Col>
          <Col md={2} className="text-end">
            REGRAS
          </Col>
        </Row>

        {filteredSkills.map((nome) => {
          const config = PERICIAS[nome];
          const skillData = pericias[nome] ?? {
            treino: "destreinado",
            bonus: 0,
            dadosExtras: 0,
          };

          return (
            <div
              key={nome}
              className="mb-2 p-2 rounded"
              style={{
                backgroundColor: "#1e233044",
                border: "1px solid #2a2f3e",
              }}
            >
              <Row className="align-items-center g-2">
                {/* NOME E ATRIBUTO */}
                <Col xs={12} md={3}>
                  <div
                    className="fw-bold text-white"
                    style={{ fontSize: "0.95rem" }}
                  >
                    {config.label}
                  </div>
                  <div
                    className="small text-uppercase"
                    style={{ fontSize: "0.65rem", color: "gray" }}
                  >
                    {config.atributo}
                  </div>
                </Col>

                {/* SELETOR DE TREINO */}
                <Col xs={12} md={3}>
                  <Form.Select
                    size="sm"
                    value={skillData.treino}
                    onChange={(e) =>
                      handleUpdate(nome, "treino", e.target.value)
                    }
                    style={{
                      ...inputStyle,
                      borderColor:
                        skillData.treino !== "destreinado"
                          ? `var(--bs-${TREINO_COLORS[skillData.treino]})`
                          : "#2a2f3e",
                    }}
                  >
                    {Object.keys(TREINO_LABELS).map((key) => (
                      <option key={key} value={key}>
                        {TREINO_LABELS[key]}
                      </option>
                    ))}
                  </Form.Select>
                </Col>

                {/* BÔNUS FIXO (+) */}
                <Col xs={6} md={2}>
                  <div className="input-group input-group-sm">
                    <span
                      className="input-group-text"
                      style={{
                        backgroundColor: "#1e2330",
                        color: "#9aa0b3",
                        border: "1px solid #2a2f3e",
                      }}
                    >
                      +
                    </span>
                    <Form.Control
                      type="number"
                      value={skillData.bonus}
                      onChange={(e) =>
                        handleUpdate(
                          nome,
                          "bonus",
                          parseInt(e.target.value) || 0
                        )
                      }
                      style={inputStyle}
                    />
                  </div>
                </Col>

                {/* DADOS EXTRAS (D) */}
                <Col xs={6} md={2}>
                  <div className="input-group input-group-sm">
                    <span
                      className="input-group-text"
                      style={{
                        backgroundColor: "#1e2330",
                        color: "#3b82f6",
                        border: "1px solid #2a2f3e",
                      }}
                    >
                      D
                    </span>
                    <Form.Control
                      type="number"
                      placeholder="0"
                      value={skillData.dadosExtras || 0}
                      onChange={(e) =>
                        handleUpdate(
                          nome,
                          "dadosExtras",
                          parseInt(e.target.value) || 0
                        )
                      }
                      style={{
                        ...inputStyle,
                        borderColor:
                          skillData.dadosExtras > 0 ? "#3b82f6" : "#2a2f3e",
                      }}
                    />
                  </div>
                </Col>

                {/* PROFISSÃO E BADGES COMPLETAS */}
                {/* PROFISSÃO, BADGES E INFO */}
                <Col
                  xs={12}
                  md={2}
                  className="d-flex align-items-center justify-content-md-end gap-2"
                >
                  {nome === "profissao" && (
                    <Form.Control
                      size="sm"
                      placeholder="Ex: Advogado"
                      value={skillData.type || ""}
                      onChange={(e) =>
                        handleUpdate(nome, "type", e.target.value)
                      }
                      style={{
                        ...inputStyle,
                        width: "100px",
                        fontSize: "0.75rem",
                      }}
                    />
                  )}

                  <div className="d-flex gap-1 align-items-center">
                    {config.somenteTreinada && (
                      <Badge bg="danger" style={{ fontSize: "0.6rem" }}>
                        TREINADA
                      </Badge>
                    )}
                    {config.kit && (
                      <Badge
                        bg="warning"
                        text="dark"
                        style={{ fontSize: "0.6rem" }}
                      >
                        KIT
                      </Badge>
                    )}

                    {/* Ícone de Informação com o Tooltip das Regras */}
                    <InfoTooltip
                      title={config.label}
                      content={config.description}
                      placement="left"
                    >
                      <div style={{ cursor: "help", color: "#9aa0b3" }}>
                        <Award size={16} />
                      </div>
                    </InfoTooltip>
                  </div>
                </Col>
              </Row>
            </div>
          );
        })}
      </Card.Body>
    </Card>
  );
}
