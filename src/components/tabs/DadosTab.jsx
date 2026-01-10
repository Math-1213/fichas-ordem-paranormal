import { useState, useMemo } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Form,
  Stack,
  Badge,
  ListGroup,
} from "react-bootstrap";
import { formatExpression } from "../../configs/dice";

/**
 * Aba de Dados Personalizados.
 * Permite rolagens livres, criação de expressões complexas e acesso rápido
 * aos atalhos de atributos e perícias do personagem.
 */
export default function DadosTab({ character }) {
  const [customExpr, setCustomExpr] = useState("");
  const [history, setHistory] = useState([]);

  /**
   * Executa a rolagem.
   * Transforma expressões como "2d20 + /LUTA/" em "2d20 + 5" e processa o resultado.
   */
  const handleManualRoll = (e) => {
    e.preventDefault();
    if (!customExpr) return;

    // 1. Converte a expressão customizada usando a lógica do personagem
    const finalExpr = formatExpression(customExpr, character);

    // 2. Aqui chamamos o motor de dados (ex: Dice.roll)
    // Simulando um resultado para a estrutura:
    const rollResult = {
      timestamp: new Date().toLocaleTimeString(),
      original: customExpr,
      translated: finalExpr,
      total: 18, // Resultado fictício da soma
      details: "[10, 3] + 5",
    };

    setHistory([rollResult, ...history].slice(0, 10)); // Mantém os últimos 10
    setCustomExpr("");
  };

  /**
   * Atalhos rápidos baseados nos atributos reais
   */
  const quickAttributes = useMemo(() => {
    return Object.entries(character.atributos || {}).map(([name, value]) => ({
      label: name.substring(0, 3).toUpperCase(),
      expr: `${value}d20`,
      color: "outline-primary",
    }));
  }, [character.atributos]);

  return (
    <Stack gap={3}>
      {/* SEÇÃO: CALCULADORA DE DADOS */}
      <Card style={{ backgroundColor: "#161a22", border: "1px solid #2a2f3e" }}>
        <Card.Body>
          <Form onSubmit={handleManualRoll}>
            <Form.Group>
              <Form.Label className="text-light">Expressão de Dado</Form.Label>
              <div className="d-flex gap-2">
                <Form.Control
                  placeholder="Ex: 2d10 + /FOR/ + 5"
                  value={customExpr}
                  onChange={(e) => setCustomExpr(e.target.value)}
                  style={{
                    backgroundColor: "#0f1220",
                    color: "#fff",
                    border: "1px solid #2a2f3e",
                  }}
                />
                <Button variant="danger" type="submit">
                  Rolar
                </Button>
              </div>
              <Form.Text className="text-muted">
                Dica: Use /NOME/ para usar bônus do personagem.
              </Form.Text>
            </Form.Group>
          </Form>

          {/* ATALHOS RÁPIDOS */}
          <div className="mt-4">
            <div
              style={{
                fontSize: "0.75rem",
                color: "#9aa0b3",
                marginBottom: "0.5rem",
              }}
            >
              ATALHOS DE ATRIBUTOS
            </div>
            <div className="d-flex flex-wrap gap-2">
              {quickAttributes.map((attr) => (
                <Button
                  key={attr.label}
                  size="sm"
                  variant={attr.color}
                  onClick={() =>
                    setCustomExpr(
                      (prev) => prev + (prev ? " + " : "") + attr.expr
                    )
                  }
                >
                  {attr.label}
                </Button>
              ))}
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* SEÇÃO: HISTÓRICO DE ROLAGENS */}
      <Card style={{ backgroundColor: "#161a22", border: "1px solid #2a2f3e" }}>
        <Card.Header style={{ backgroundColor: "#1e2330", color: "#eee" }}>
          Últimos Resultados
        </Card.Header>
        <ListGroup variant="flush">
          {history.length === 0 && (
            <ListGroup.Item
              style={{
                backgroundColor: "transparent",
                color: "#555",
                textAlign: "center",
              }}
            >
              Nenhuma rolagem realizada nesta sessão.
            </ListGroup.Item>
          )}
          {history.map((roll, i) => (
            <ListGroup.Item
              key={i}
              style={{
                backgroundColor: "transparent",
                borderBottom: "1px solid #2a2f3e",
                color: "#e6e6e6",
              }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <small className="text-muted d-block">
                    {roll.timestamp} - {roll.original}
                  </small>
                  <strong style={{ fontSize: "1.1rem" }}>{roll.total}</strong>
                  <span
                    className="ms-2"
                    style={{ fontSize: "0.85rem", color: "#9aa0b3" }}
                  >
                    ({roll.details})
                  </span>
                </div>
                <Badge bg="dark" style={{ border: "1px solid #444" }}>
                  {roll.translated}
                </Badge>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </Stack>
  );
}
