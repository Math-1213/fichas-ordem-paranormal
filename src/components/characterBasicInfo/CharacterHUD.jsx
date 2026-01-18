import { useState } from "react";
import {
  Container,
  Row,
  Col,
  ProgressBar,
  Collapse,
  Button,
} from "react-bootstrap";
import {
  Heart,
  Brain,
  Zap,
  Shield,
  ChevronUp,
  ChevronDown,
  ShieldAlert,
} from "lucide-react";
import { ELEMENT_DATA } from "../../configs/paranormal";
import { TREINO_BONUS } from "../../configs/skills";

export default function CharacterHUD({ char }) {
  const [showHUD, setShowHUD] = useState(true);

  if (!char) return null;

  // --- Lógica de Dados ---
  const elementData =
    ELEMENT_DATA[char.infos?.afinidade?.toLowerCase()] || ELEMENT_DATA["medo"];
  const elementColor = elementData.color;

  // Ícone Tingido
  const ElementIcon = () => (
    <img
      src={elementData.icon}
      width={18}
      alt="E"
      style={{
        filter: `drop-shadow(0 0 2px ${elementColor}) brightness(1.5)`,
        transition: "all 0.3s ease",
      }}
    />
  );

  // --- Cálculos de Defesa ---
  const defPassiva = char.status?.defesas?.passiva || 10;
  const reflexos = char.pericias?.reflexos || { bonus: 0, treino: "nenhum" };
  const desvioTotal =
    defPassiva + reflexos.bonus + (TREINO_BONUS[reflexos.treino] || 0);
  const fortitude = char.pericias?.fortitude || { bonus: 0, treino: "nenhum" };
  const bloqueioBonus = fortitude.bonus + (TREINO_BONUS[fortitude.treino] || 0);

  const renderBar = (label, current, max, color, Icon) => (
    <div className="flex-grow-1 px-3">
      <div
        className="d-flex justify-content-between fw-bold mb-1"
        style={{ fontSize: "0.85rem" }}
      >
        <span
          style={{ color: color, letterSpacing: "1px" }}
          className="d-flex align-items-center"
        >
          <Icon size={16} className="me-2" /> {label}
        </span>
        <span className="text-light">
          {current} <span style={{ opacity: 0.3 }}>/ {max}</span>
        </span>
      </div>
      <ProgressBar
        now={(current / max) * 100}
        style={{
          height: "10px",
          backgroundColor: "#000",
          border: "1px solid #ffffff15",
          borderRadius: "5px",
        }}
        children={
          <div
            style={{
              backgroundColor: color,
              width: `${(current / max) * 100}%`,
              height: "100%",
              boxShadow: `0 0 15px ${color}60`,
              transition: "width 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            }}
          />
        }
      />
    </div>
  );

  return (
    <div style={{ position: "sticky", top: 0, zIndex: 1050, width: "100%" }}>
      <Collapse in={showHUD}>
        <div
          style={{
            backgroundColor: "#080a0dfc",
            backdropFilter: "blur(20px)",
            borderBottom: `4px solid ${elementColor}`,
            padding: "15px 0", // Aumentado o respiro
            boxShadow: "0 10px 40px rgba(0,0,0,0.8)",
          }}
        >
          <Container fluid="lg">
            <Row className="align-items-center g-0">
              {/* AVATAR GIGANTE E ELEMENTO TINGIDO */}
              <Col
                xs="auto"
                className="d-flex align-items-center pe-4 border-end border-white border-opacity-10"
              >
                <div style={{ position: "relative" }}>
                  <img
                    src={char.infos.portrait}
                    alt="Agente"
                    style={{
                      width: "80px", // Aumentado de 60px para 80px
                      height: "80px",
                      borderRadius: "15px",
                      border: `3px solid ${elementColor}`,
                      objectFit: "cover",
                      objectPosition: "top",
                      boxShadow: `0 0 20px ${elementColor}30`,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: -8,
                      right: -8,
                      backgroundColor: "#000",
                      border: `2px solid ${elementColor}`,
                      borderRadius: "50%",
                      width: "32px",
                      height: "32px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: `0 0 15px ${elementColor}80`,
                    }}
                  >
                    <ElementIcon />
                  </div>
                </div>

                <div className="ms-4">
                  <h5
                    className="mb-1 text-light fw-bold"
                    style={{ fontSize: "1.4rem", letterSpacing: "-0.5px" }}
                  >
                    {char.infos.nome?.split(" ")[0].toUpperCase()}
                  </h5>
                  <div
                    style={{
                      color: elementColor,
                      fontSize: "0.8rem",
                      fontWeight: "900",
                      letterSpacing: "1px",
                    }}
                  >
                    NEX {char.infos.nex}% • {char.infos.classe?.toUpperCase()}
                  </div>
                </div>
              </Col>

              {/* BARRAS VITAIS */}
              <Col className="d-flex px-3">
                {renderBar(
                  "PV",
                  char.status.vida,
                  char.status.vidaMax,
                  "#ff1744",
                  Heart,
                )}
                {renderBar(
                  "SAN",
                  char.status.sanidade,
                  char.status.sanidadeMax,
                  "#00e5ff",
                  Brain,
                )}
                {renderBar(
                  "PE",
                  char.status.esforco,
                  char.status.esforcoMax,
                  "#ffea00",
                  Zap,
                )}
              </Col>

              {/* TRINDADE DE DEFESAS */}
              <Col
                xs="auto"
                className="ps-4 d-flex gap-4 border-start border-white border-opacity-10 align-items-center"
              >
                <div className="text-center">
                  <div
                    className="text-secondary fw-bold mb-1"
                    style={{ fontSize: "0.65rem" }}
                  >
                    PASSIVA
                  </div>
                  <div className="text-light fw-bold h3 mb-0">{defPassiva}</div>
                </div>

                <div className="text-center">
                  <div
                    style={{
                      color: "#4ade80",
                      fontSize: "0.65rem",
                      fontWeight: "bold",
                    }}
                    className="mb-1"
                  >
                    ESQUIVA
                  </div>
                  <div className="d-flex align-items-center justify-content-center">
                    <Shield
                      size={18}
                      className="me-1 text-success opacity-75"
                    />
                    <span className="text-light fw-bold h3 mb-0">
                      {desvioTotal}
                    </span>
                  </div>
                </div>

                <div className="text-center">
                  <div
                    style={{
                      color: "#fb923c",
                      fontSize: "0.65rem",
                      fontWeight: "bold",
                    }}
                    className="mb-1"
                  >
                    BLOQUEIO
                  </div>
                  <div className="d-flex align-items-center justify-content-center">
                    <ShieldAlert
                      size={18}
                      className="me-1 text-warning opacity-75"
                    />
                    <span className="text-light fw-bold h3 mb-0">
                      +{bloqueioBonus}
                    </span>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </Collapse>

      {/* BOTÃO DE COLAPSAR MELHORADO */}
      <div
        className="d-flex justify-content-center"
        style={{ marginTop: "-1px" }}
      >
        <Button
          variant="none"
          onClick={() => setShowHUD(!showHUD)}
          style={{
            backgroundColor: "#080a0d",
            border: `2px solid ${elementColor}`,
            borderTop: "none",
            borderRadius: "0 0 12px 12px",
            color: elementColor,
            padding: "2px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 5px 15px rgba(0,0,0,0.5)`,
            zIndex: 1100,
          }}
        >
          {showHUD ? (
            <ChevronUp size={18} strokeWidth={3} />
          ) : (
            <ChevronDown size={18} strokeWidth={3} />
          )}
        </Button>
      </div>
    </div>
  );
}
