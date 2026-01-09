import { useState } from "react";
import { Card, Row, Col, Badge } from "react-bootstrap";
import Dice from "../../models/Dice";
import RollTooltip from "../ui/RollTooltip";
import {
  PERICIAS,
  TREINO_BONUS,
  TREINO_LABELS,
  TREINO_COLORS,
} from "../../configs/skills";

export default function PericiasTab({ character }) {
  const pericias = character.pericias;

  const [lastRoll, setLastRoll] = useState(null);
  const [active, setActive] = useState(null);

  function handleRoll(nome) {
    const config = PERICIAS[nome];
    const data = pericias[nome] ?? { treino: "destreinado", bonus: 0 };

    const treinoBonus = TREINO_BONUS[data.treino] ?? 0;

    const atributoValor = character.getAtributo(config.atributo);

    const roll = Dice.roll(
      "d20",
      atributoValor,
      "teste",
      treinoBonus + data.bonus,
      0
    );

    setLastRoll(roll);
    setActive(nome);
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card
        style={{
          backgroundColor: "#161a22",
          border: "1px solid #2a2f3e",
          width: "75%",
          marginBottom: "20px",
        }}
      >
        <Card.Header
          style={{
            backgroundColor: "#1e2330",
            borderBottom: "1px solid #2a2f3e",
            fontWeight: 600,
          }}
        >
          Perícias
        </Card.Header>

        <Card.Body style={{ padding: "0.75rem" }}>
          {/* CABEÇALHO DAS COLUNAS */}
          <Row
            style={{
              padding: "0.35rem 0.5rem",
              marginBottom: "0.5rem",
              borderBottom: "1px solid #2a2f3e",
              fontSize: "0.75rem",
              color: "#9aa0b3",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            <Col md={4}>Perícia</Col>

            <Col md={2}>Atributo</Col>

            <Col md={2}>Treino</Col>

            <Col md={2}>Bônus</Col>

            <Col
              md={2}
              style={{ color: "#8b5cf6", fontWeight: 700, textAlign: "right" }}
            >
              Total
            </Col>
          </Row>

          {/* LISTA DAS PERÍCIAS */}
          {Object.keys(PERICIAS).map((nome) => {
            const config = PERICIAS[nome];
            const data = pericias[nome] ?? { treino: "destreinado", bonus: 0 };

            const treinoBonus = TREINO_BONUS[data.treino] ?? 0;
            const totalBonus = treinoBonus + data.bonus;

            const isActive = active === nome;

            return (
              <RollTooltip
                key={nome}
                rolls={isActive ? [lastRoll] : null}
                rollType="teste"
                critico={20}
                bonus={totalBonus}
                >
                <Row
                  onClick={() => handleRoll(nome)}
                  className="align-items-center"
                  style={{
                    padding: "0.5rem",
                    cursor: "pointer",
                    opacity: 1,
                    backgroundColor: isActive ? "#1e2330" : "transparent",
                    borderRadius: "6px",
                    marginBottom: "0.3rem",
                    height: "60px",
                  }}
                >
                  {/* Nome + Tags */}
                  <Col md={4}>
                    <div>
                      {config.label} <span />
                      {data.type && (
                        <Badge bg="success" className="me-1">
                          {data.type}
                        </Badge>
                      )}
                    </div>

                    <div style={{ marginTop: "0.15rem" }}>
                      {config.somenteTreinada && (
                        <Badge bg="danger" className="me-1">
                          Somente Treinada
                        </Badge>
                      )}

                      {config.kit && (
                        <Badge bg="warning" className="me-1">
                          Kit
                        </Badge>
                      )}

                      {config.carga && <Badge bg="secondary">Carga</Badge>}
                    </div>
                  </Col>

                  {/* Atributo base */}
                  <Col md={2} style={{ color: "#9aa0b3" }}>
                    {config.atributo.toUpperCase()}
                  </Col>

                  {/* Estado */}
                  <Col md={2}>
                    <Badge
                      bg={TREINO_COLORS[data.treino] ?? "secondary"}
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        letterSpacing: "0.03em",
                      }}
                    >
                      {TREINO_LABELS[data.treino]}
                    </Badge>
                  </Col>

                  {/* Bônus extra */}
                  <Col md={2} style={{ color: "#9aa0b3" }}>
                    Extra: {data.bonus >= 0 ? `+${data.bonus}` : data.bonus}
                  </Col>

                  {/* Bônus total */}
                  <Col
                    md={2}
                    style={{
                      color: "#8b5cf6",
                      fontWeight: 700,
                      textAlign: "right",
                    }}
                  >
                    +{totalBonus}
                  </Col>
                </Row>
              </RollTooltip>
            );
          })}
        </Card.Body>
      </Card>
    </div>
  );
}
