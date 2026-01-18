import { useState } from "react";
import {
  Container,
  Row,
  Col,
  ProgressBar,
  Collapse,
  Button,
  Badge,
  Modal,
  Form,
} from "react-bootstrap";
import {
  Heart,
  Brain,
  Zap,
  Shield,
  ChevronUp,
  ChevronDown,
  ShieldAlert,
  Info,
  Plus,
  X,
} from "lucide-react";
import { ELEMENT_DATA } from "../../configs/paranormal";
import { TREINO_BONUS } from "../../configs/skills";
import { CONDITIONS_DATA } from "../../configs/conditions";

export default function CharacterHUD({ char, onUpdateConditions }) {
  const [showHUD, setShowHUD] = useState(true);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  if (!char) return null;

  // --- Lógica de Dados ---
  const elementData =
    ELEMENT_DATA[char.infos?.afinidade?.toLowerCase()] || ELEMENT_DATA["medo"];
  const elementColor = elementData.color;

  // Pegar as condições do personagem (assumindo char.status.conditions como array de chaves)
  const activeConditions = char.status?.conditions || [];

  const addCondition = (key) => {
    if (!activeConditions.includes(key)) {
      onUpdateConditions([...activeConditions, key]);
    }
    setShowAddModal(false);
    setSearchTerm("");
  };

  const removeCondition = (e, key) => {
    e.stopPropagation(); // Evita que clique no 'X' abra o modal de info
    onUpdateConditions(activeConditions.filter((c) => c !== key));
  };

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
      <style>
        {`
            .hover-red:hover { color: #ff4444 !important; transform: scale(1.2); }
            .badge-condition:hover { filter: brightness(1.3); }
            `}
      </style>
      <Collapse in={showHUD}>
        <div
          style={{
            backgroundColor: "#080a0dfc",
            backdropFilter: "blur(20px)",
            borderBottom: `4px solid ${elementColor}`,
            padding: "15px 0",
            boxShadow: "0 10px 40px rgba(0,0,0,0.8)",
          }}
        >
          <Container fluid="lg">
            <Row className="align-items-center g-0">
              {/* AVATAR, INFO E BADGES */}
              <Col
                xs="auto"
                className="d-flex align-items-center pe-4 border-end border-white border-opacity-10"
              >
                <div style={{ position: "relative" }}>
                  <img
                    src={char.infos.portrait}
                    alt="Agente"
                    style={{
                      width: "85px",
                      height: "85px",
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
                    className="mb-0 text-light fw-bold"
                    style={{ fontSize: "1.4rem", letterSpacing: "-0.5px" }}
                  >
                    {char.infos.nome?.split(" ")[0].toUpperCase()}
                  </h5>
                  <div
                    style={{
                      color: elementColor,
                      fontSize: "0.75rem",
                      fontWeight: "900",
                      letterSpacing: "1px",
                      marginBottom: "5px",
                    }}
                  >
                    NEX {char.infos.nex}% • {char.infos.classe?.toUpperCase()}
                  </div>

                  {/* CONTAINER DE BADGES DE STATUS */}
                  <div
                    className="d-flex flex-wrap gap-1 align-items-center"
                    style={{ maxWidth: "250px" }}
                  >
                    {activeConditions.map((key) => {
                      const data = CONDITIONS_DATA[key];
                      if (!data) return null;
                      return (
                        <Badge
                          key={key}
                          onClick={() => setSelectedCondition(data)}
                          style={{
                            fontSize: "0.6rem",
                            cursor: "pointer",
                            backgroundColor: `${data.cor}25`,
                            color: data.cor,
                            border: `1px solid ${data.cor}60`,
                            padding: "3px 6px",
                          }}
                          className="d-flex align-items-center gap-1 badge-condition"
                        >
                          {data.nome.toUpperCase()}
                          <X
                            size={10}
                            onClick={(e) => removeCondition(e, key)}
                            className="hover-red"
                          />
                        </Badge>
                      );
                    })}
                    <Button
                      variant="outline-light"
                      onClick={() => setShowAddModal(true)}
                      style={{
                        padding: "0 4px",
                        fontSize: "0.6rem",
                        height: "18px",
                        opacity: 0.5,
                        borderStyle: "dashed",
                      }}
                    >
                      <Plus size={12} />
                    </Button>
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

              {/* DEFESAS */}
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

      {/* BOTÃO COLAPSAR */}
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

      {/* MODAL DE DESCRIÇÃO DA CONDIÇÃO */}
      <Modal
        show={!!selectedCondition}
        onHide={() => setSelectedCondition(null)}
        centered
        contentClassName="bg-dark text-light border-secondary"
      >
        <Modal.Header
          closeButton
          closeVariant="white"
          className="border-secondary"
        >
          <Modal.Title
            className="d-flex align-items-center"
            style={{ color: selectedCondition?.color }}
          >
            <Info size={20} className="me-2" />
            {selectedCondition?.nome.toUpperCase()}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
            {selectedCondition?.descricao}
          </p>
        </Modal.Body>
      </Modal>
      {/* MODAL ADICIONAR CONDIÇÃO */}
      <Modal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        centered
        contentClassName="bg-dark text-light border-secondary"
      >
        <Modal.Header
          closeButton
          closeVariant="white"
          className="border-secondary"
        >
          <Modal.Title className="text-uppercase" style={{ fontSize: "1rem" }}>
            Adicionar Condição
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Buscar condição..."
            className="bg-black text-white border-secondary mb-3 shadow-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div
            className="d-flex flex-wrap gap-2"
            style={{
              maxHeight: "300px",
              overflowY: "auto",
              paddingRight: "5px",
            }}
          >
            {Object.keys(CONDITIONS_DATA)
              .filter((key) =>
                CONDITIONS_DATA[key].nome
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()),
              )
              .map((key) => (
                <Button
                  key={key}
                  variant="none"
                  size="sm"
                  onClick={() => addCondition(key)}
                  disabled={activeConditions.includes(key)}
                  style={{
                    fontSize: "0.7rem",
                    color: CONDITIONS_DATA[key].cor,
                    border: `1px solid ${CONDITIONS_DATA[key].cor}40`,
                    backgroundColor: activeConditions.includes(key)
                      ? "#222"
                      : "transparent",
                    opacity: activeConditions.includes(key) ? 0.3 : 1,
                  }}
                >
                  {CONDITIONS_DATA[key].nome.toUpperCase()}
                </Button>
              ))}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
