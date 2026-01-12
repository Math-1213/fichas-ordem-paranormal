import { Card, Row, Col, Form, Button, Stack } from "react-bootstrap";
import { Plus, Trash2, Dices, Info, Type, Sparkles } from "lucide-react";

export default function DadosEdit({ data = [], onChange }) {
  // Garante que 'dados' sempre seja um array para evitar erro de .map
  const dados = Array.isArray(data) ? data : [];

  const handleUpdate = (newList) => {
    if (onChange) onChange(newList);
  };

  const addItem = () => {
    const newItem = {
      nome: "",
      valor: "",
      tipo: "teste",
      extra: "",
    };
    handleUpdate([...dados, newItem]);
  };

  const removeItem = (index) => {
    const newList = dados.filter((_, i) => i !== index);
    handleUpdate(newList);
  };

  const handleChange = (index, field, value) => {
    const newList = dados.map((item, i) => {
      if (i === index) return { ...item, [field]: value };
      return item;
    });
    handleUpdate(newList);
  };

  const inputStyle = {
    backgroundColor: "#0d1117",
    color: "#fff",
    borderColor: "#2a2f3e",
  };

  return (
    <div className="pb-4">
      <Card style={{ backgroundColor: "#161a22", border: "1px solid #2a2f3e" }}>
        <Card.Header className="bg-dark border-secondary py-3 d-flex justify-content-between align-items-center">
          <div className="text-white fw-bold d-flex align-items-center">
            <Dices size={20} className="me-2 text-warning" />
            DADOS E ROLAGENS CUSTOMIZADAS
          </div>
          <Button
            variant="outline-primary"
            size="sm"
            onClick={addItem}
            className="d-flex align-items-center gap-1"
          >
            <Plus size={16} /> Adicionar Dado
          </Button>
        </Card.Header>

        <Card.Body className="p-3">
          <Stack gap={3}>
            {dados.length === 0 ? (
              <div className="text-center py-5 border border-dashed border-secondary rounded opacity-50">
                <Dices size={40} className="text-muted mb-2" />
                <div className="text-muted small">
                  Nenhum dado customizado. Clique em adicionar para começar.
                </div>
              </div>
            ) : (
              dados.map((item, index) => (
                <Card
                  key={index}
                  style={{
                    backgroundColor: "#0d1117",
                    border: "1px solid #30363d",
                  }}
                  className="p-3"
                >
                  <Row className="g-2">
                    {/* Linha 1: Nome e Tipo */}
                    <Col md={8}>
                      <Form.Label className="small text-white-50 fw-bold d-flex align-items-center gap-1">
                        <Type size={14} /> NOME DO DADO
                      </Form.Label>
                      <Form.Control
                        style={inputStyle}
                        placeholder="Ex: Ataque Katana"
                        value={item.nome || ""}
                        onChange={(e) =>
                          handleChange(index, "nome", e.target.value)
                        }
                      />
                    </Col>
                    <Col md={4}>
                      <Form.Label className="small text-white-50 fw-bold">
                        MODO
                      </Form.Label>
                      <Form.Select
                        style={inputStyle}
                        value={item.tipo || "teste"}
                        onChange={(e) =>
                          handleChange(index, "tipo", e.target.value)
                        }
                      >
                        <option value="teste">Teste (Pega o Maior)</option>
                        <option value="soma">Soma (Soma tudo)</option>
                      </Form.Select>
                    </Col>

                    {/* Linha 2: Fórmula e Extra */}
                    <Col md={6}>
                      <Form.Label className="small text-white-50 fw-bold d-flex align-items-center gap-1">
                        <Dices size={14} /> FÓRMULA
                      </Form.Label>
                      <Form.Control
                        style={{
                          ...inputStyle,
                          fontFamily: "monospace",
                          color: "#58a6ff",
                        }}
                        placeholder="Ex: /FOR/d20 + 5"
                        value={item.valor || ""}
                        onChange={(e) =>
                          handleChange(index, "valor", e.target.value)
                        }
                      />
                    </Col>
                    <Col md={5}>
                      <Form.Label className="small text-white-50 fw-bold d-flex align-items-center gap-1">
                        <Sparkles size={14} className="text-warning" /> INFO
                        EXTRA / DANO
                      </Form.Label>
                      <Form.Control
                        style={{ ...inputStyle, color: "#9dff9d" }}
                        placeholder="Ex: 2d10 + 5 Corte"
                        value={item.extra || ""}
                        onChange={(e) =>
                          handleChange(index, "extra", e.target.value)
                        }
                      />
                    </Col>

                    {/* Lixo */}
                    <Col md={1} className="d-flex align-items-end">
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => removeItem(index)}
                        className="w-100"
                        style={{ height: "38px" }}
                      >
                        <Trash2 size={18} />
                      </Button>
                    </Col>
                  </Row>
                </Card>
              ))
            )}
          </Stack>
        </Card.Body>

        <Card.Footer className="bg-dark border-secondary py-2">
          <div
            className="d-flex align-items-center gap-2"
            style={{ fontSize: "0.75rem" }}
          >
            <Info size={14} className="text-info" />
            <span style={{ color: "#adb5bd" }}>
              {" "}
              {/* Cor cinza clara (Bootstrap gray-500) */}
              Dica: Use <strong>/SIGLA/</strong> para atributos (ex:{" "}
              <strong>/FOR/</strong>, <strong>/AGI/</strong>).
            </span>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
}
