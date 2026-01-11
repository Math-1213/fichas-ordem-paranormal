import { useState } from "react";
import {
  Card,
  Button,
  Form,
  Stack,
  Badge,
  ListGroup,
  Row,
  Col,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import Dice from "../../models/Dice";
import { Dice6, History, Calculator } from "lucide-react";

export default function DadosTab({ character }) {
  const [customExpr, setCustomExpr] = useState("");
  const [history, setHistory] = useState([]);
  const [rollMode, setRollMode] = useState("teste");

  const executeRoll = (expr, label = "Rolagem Livre", mode = rollMode) => {
    if (!expr) return;
    try {
      const result = Dice.parseRollExpression(
        expr,
        { atributos: character.atributos, pericias: character.pericias },
        mode
      );

      const diceResultBase = result.rolls.reduce(
        (acc, curr) => acc + curr.total,
        0
      );
      const finalTotal = diceResultBase + result.bonus;

      const details =
        result.rolls
          .map((r) => {
            const rollList = r.rolls.join(", ");
            return r.forcedWorst ? `[pior de ${rollList}]` : `[${rollList}]`;
          })
          .join(" + ") + (result.bonus !== 0 ? ` + ${result.bonus}` : "");

      const rollEntry = {
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        nome: label,
        expressao: expr,
        total: finalTotal,
        detalhes: details,
        modo: mode,
      };

      setHistory((prev) => [rollEntry, ...prev].slice(0, 10));
      setCustomExpr("");
    } catch (error) {
      alert("Erro na fórmula: " + error.message);
    }
  };

  // Estilos reutilizáveis para facilitar a leitura no Dark Mode
  const cardStyle = {
    backgroundColor: "#1a1d26",
    border: "1px solid #343a40",
    boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
  };
  const inputStyle = {
    backgroundColor: "#0b0e14",
    color: "#f8f9fa",
    border: "1px solid #495057",
    fontSize: "1.1rem",
    padding: "0.75rem",
  };

  return (
    <Stack gap={4} className="p-2">
      {/* SEÇÃO 1: CALCULADORA */}
      <Card style={cardStyle}>
        <Card.Body className="p-4">
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              executeRoll(customExpr);
            }}
          >
            <Form.Group>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center gap-2 text-light">
                  <Calculator size={20} className="text-danger" />
                  <span
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "600",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Calculadora de Dados
                  </span>
                </div>

                <ToggleButtonGroup
                  type="radio"
                  name="rollMode"
                  defaultValue="teste"
                  size="md"
                  onChange={(val) => setRollMode(val)}
                >
                  <ToggleButton
                    id="tbg-btn-1"
                    value="teste"
                    variant="outline-info"
                    style={{ fontWeight: "bold" }}
                  >
                    TESTE
                  </ToggleButton>
                  <ToggleButton
                    id="tbg-btn-2"
                    value="soma"
                    variant="outline-warning"
                    style={{ fontWeight: "bold" }}
                  >
                    SOMA
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>

              <div className="d-flex gap-2">
                <Form.Control
                  placeholder="Ex: /INT/d20 + 5"
                  value={customExpr}
                  onChange={(e) => setCustomExpr(e.target.value)}
                  style={inputStyle}
                />
                <Button
                  variant="danger"
                  type="submit"
                  className="px-4 fw-bold"
                  style={{ fontSize: "1.1rem" }}
                >
                  ROLAR
                </Button>
              </div>
              <Form.Text
                className="text-secondary mt-2 d-block"
                style={{ fontSize: "0.9rem" }}
              >
                Dica: Use <b className="text-info">/FOR/</b> para atributos ou{" "}
                <b className="text-info">/LUTA/</b> para perícias.
              </Form.Text>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>

      {/* SEÇÃO 2: DADOS DA FICHA */}
      <div>
        <h6
          className="text-uppercase mb-3"
          style={{
            fontSize: "1rem",
            letterSpacing: "2px",
            color: "#adb5bd",
            fontWeight: "700",
          }}
        >
          <Dice6 size={18} className="me-2" /> DADOS DA FICHA
        </h6>
        <Row xs={1} md={2} className="g-3">
          {character.dados?.map((dado, idx) => (
            <Col key={idx}>
              <Button
                variant="dark"
                className="w-100 text-start d-flex justify-content-between align-items-center p-3"
                style={{
                  backgroundColor: "#212529",
                  borderLeft: `5px solid ${
                    dado.tipo === "soma" ? "#ffc107" : "#0dcaf0"
                  }`,
                  transition: "transform 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.02)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
                onClick={() =>
                  executeRoll(dado.valor, dado.nome, dado.tipo || "teste")
                }
              >
                <div>
                  <div
                    style={{
                      fontSize: "1.15rem",
                      fontWeight: "bold",
                      color: "#f8f9fa",
                    }}
                  >
                    {dado.nome}
                  </div>
                  <div
                    style={{
                      fontSize: "0.9rem",
                      color: "#adb5bd",
                      fontFamily: "monospace",
                    }}
                  >
                    {dado.valor}
                  </div>
                </div>
                <Badge
                  bg="secondary"
                  style={{ fontSize: "0.75rem", opacity: 0.8 }}
                >
                  {dado.tipo || "teste"}
                </Badge>
              </Button>
            </Col>
          ))}
        </Row>
      </div>

      {/* SEÇÃO 3: HISTÓRICO */}
      <Card style={cardStyle}>
        <Card.Header
          className="py-3"
          style={{
            backgroundColor: "#14161d",
            borderBottom: "2px solid #343a40",
          }}
        >
          <div className="d-flex align-items-center gap-2 text-secondary">
            <History size={18} />
            <span style={{ fontWeight: "700", fontSize: "1rem" }}>
              ÚLTIMAS ROLAGENS
            </span>
          </div>
        </Card.Header>
        <ListGroup variant="flush">
          {history.length === 0 ? (
            <div className="p-4 text-center text-muted fs-5">
              Nenhuma rolagem nesta sessão.
            </div>
          ) : (
            history.map((roll, i) => (
              <ListGroup.Item
                key={i}
                style={{
                  backgroundColor: "transparent",
                  borderBottom: "1px solid #2d3238",
                  padding: "1rem",
                }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <span
                        className="text-muted"
                        style={{ fontSize: "0.8rem" }}
                      >
                        {roll.timestamp}
                      </span>
                      <Badge
                        bg={roll.modo === "soma" ? "warning" : "info"}
                        text="dark"
                        className="fw-bold"
                      >
                        {roll.modo.toUpperCase()}
                      </Badge>
                      <span
                        style={{
                          color: "#e9ecef",
                          fontWeight: "600",
                          fontSize: "1.1rem",
                        }}
                      >
                        {roll.nome}
                      </span>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <span
                        style={{
                          fontSize: "2rem",
                          fontWeight: "900",
                          color: "#ffffff",
                          textShadow: "0 0 10px rgba(255,255,255,0.2)",
                        }}
                      >
                        {roll.total}
                      </span>
                      <span
                        style={{
                          color: "#adb5bd",
                          fontSize: "1rem",
                          fontStyle: "italic",
                        }}
                      >
                        {roll.detalhes}
                      </span>
                    </div>
                  </div>
                  <Badge
                    bg="dark"
                    className="p-2"
                    style={{
                      border: "1px solid #495057",
                      color: "#d63384",
                      fontSize: "0.9rem",
                      fontFamily: "monospace",
                    }}
                  >
                    {roll.expressao}
                  </Badge>
                </div>
              </ListGroup.Item>
            ))
          )}
        </ListGroup>
      </Card>
    </Stack>
  );
}
