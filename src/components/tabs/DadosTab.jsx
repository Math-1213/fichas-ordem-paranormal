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
import { formatExpression } from "../../configs/dice";
import Dice from "../../models/Dice";
import { Dice6 } from "lucide-react";

export default function DadosTab({ character }) {
  const [customExpr, setCustomExpr] = useState("");
  const [history, setHistory] = useState([]);
  const [rollMode, setRollMode] = useState("teste"); // 'teste' ou 'soma'

  /**
   * Processa a rolagem usando a lógica da classe Dice
   */
  const executeRoll = (expr, label = "Rolagem Livre", mode = rollMode) => {
    if (!expr) return;

    try {
      // 1. Resolve a expressão e executa a rolagem via classe Dice
      const result = Dice.parseRollExpression(
        expr,
        { atributos: character.atributos, pericias: character.pericias },
        mode
      );

      // 2. Calcula o total baseado no modo
      // Se for teste, a classe Dice.roll já retorna o maior (ou menor se for desvantagem)
      // Se houver múltiplos dados na string (ex: 1d20 + 1d20), somamos os resultados dos objetos de rolagem
      const diceResultBase = result.rolls.reduce(
        (acc, curr) => acc + curr.total,
        0
      );
      const finalTotal = diceResultBase + result.bonus;

      // 3. Formata os detalhes para o histórico
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
      console.error("Erro na rolagem:", error);
      alert("Erro na fórmula: " + error.message);
    }
  };

  return (
    <Stack gap={4}>
      {/* SEÇÃO 1: CALCULADORA LIVRE */}
      <Card style={{ backgroundColor: "#161a22", border: "1px solid #2a2f3e" }}>
        <Card.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              executeRoll(customExpr);
            }}
          >
            <Form.Group>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <Form.Label className="text-light m-0">
                  Calculadora de Dados
                </Form.Label>

                {/* Seletor de Modo: Teste vs Soma */}
                <ToggleButtonGroup
                  type="radio"
                  name="rollMode"
                  defaultValue="teste"
                  size="sm"
                  onChange={(val) => setRollMode(val)}
                >
                  <ToggleButton
                    id="tbg-btn-1"
                    value="teste"
                    variant="outline-info"
                    style={{ fontSize: "0.65rem" }}
                  >
                    MODO TESTE
                  </ToggleButton>
                  <ToggleButton
                    id="tbg-btn-2"
                    value="soma"
                    variant="outline-warning"
                    style={{ fontSize: "0.65rem" }}
                  >
                    MODO SOMA
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>

              <div className="d-flex gap-2">
                <Form.Control
                  placeholder="Ex: /INT/d20 + 5"
                  value={customExpr}
                  onChange={(e) => setCustomExpr(e.target.value)}
                  style={{
                    backgroundColor: "#0f1220",
                    color: "#fff",
                    border: "1px solid #2a2f3e",
                    fontFamily: "monospace",
                  }}
                />
                <Button variant="danger" type="submit" className="px-4">
                  Rolar
                </Button>
              </div>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>

      {/* SEÇÃO 2: DADOS DA FICHA */}
      <div>
        <h6
          className="text-uppercase text-muted mb-3"
          style={{ fontSize: "0.75rem", letterSpacing: "1px", color: "lightgray"}}
        >
          Dados da Ficha
        </h6>
        <Row xs={1} md={2} className="g-2">
          {character.dados?.map((dado, idx) => (
            <Col key={idx}>
              <Button
                variant="outline-light"
                className="w-100 text-start d-flex justify-content-between align-items-center p-2"
                style={{
                  backgroundColor: "#1e2330",
                  borderColor: dado.tipo === "soma" ? "#854d0e" : "#0e7490",
                }}
                onClick={() =>
                  executeRoll(dado.valor, dado.nome, dado.tipo || "teste")
                }
              >
                <div>
                  <div style={{ fontSize: "0.85rem", fontWeight: "bold" }}>
                    {dado.nome}
                  </div>
                  <div style={{ fontSize: "0.7rem", color: "#9aa0b3" }}>
                    {dado.valor}{" "}
                    <Badge bg="dark" className="ms-1">
                      {dado.tipo || "teste"}
                    </Badge>
                  </div>
                </div>
                <Dice6
                  size={16}
                  className={
                    dado.tipo === "soma" ? "text-warning" : "text-info"
                  }
                />
              </Button>
            </Col>
          ))}
        </Row>
      </div>

      {/* SEÇÃO 3: HISTÓRICO LOCAL */}
      <Card style={{ backgroundColor: "#161a22", border: "1px solid #2a2f3e" }}>
        <Card.Header
          style={{
            backgroundColor: "#1e2330",
            borderBottom: "1px solid #2a2f3e",
            fontSize: "0.85rem",
            color: "#aaa",
          }}
        >
          Histórico Recente
        </Card.Header>
        <ListGroup variant="flush">
          {history.map((roll, i) => (
            <ListGroup.Item
              key={i}
              style={{
                backgroundColor: "transparent",
                borderBottom: "1px solid #2a2f3e",
                padding: "0.75rem",
              }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div className="flex-grow-1">
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <span style={{ fontSize: "0.7rem", color: "#666" }}>
                      [{roll.timestamp}]
                    </span>
                    <Badge
                      bg={roll.modo === "soma" ? "warning" : "info"}
                      text="dark"
                      style={{ fontSize: "0.6rem" }}
                    >
                      {roll.modo.toUpperCase()}
                    </Badge>
                    <strong style={{ color: "#eee", fontSize: "0.9rem" }}>
                      {roll.nome}
                    </strong>
                  </div>
                  <div className="d-flex align-items-baseline gap-2">
                    <span
                      className="text-light"
                      style={{ fontSize: "1.2rem", fontWeight: "900" }}
                    >
                      {roll.total}
                    </span>
                    <small
                      className="text-muted"
                      style={{ fontSize: "0.75rem" }}
                    >
                      ({roll.detalhes})
                    </small>
                  </div>
                </div>
                <Badge
                  bg="dark"
                  style={{ border: "1px solid #333", color: "#8b5cf6" }}
                >
                  {roll.expressao}
                </Badge>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </Stack>
  );
}
