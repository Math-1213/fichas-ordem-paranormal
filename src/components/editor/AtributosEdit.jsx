import { useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { Save, Shield, Zap, Brain, Eye, Heart } from "lucide-react";

/**
 * Mapeamento de estilo e ícones para cada atributo.
 */
const ATTR_CONFIG = {
  forca: { label: "Força", icon: <Shield size={20} />, color: "#ff3b3b" },
  agilidade: { label: "Agilidade", icon: <Zap size={20} />, color: "#ffee58" },
  intelecto: { label: "Intelecto", icon: <Brain size={20} />, color: "#3b82f6" },
  presenca: { label: "Presença", icon: <Eye size={20} />, color: "#a855f7" },
  vigor: { label: "Vigor", icon: <Heart size={20} />, color: "#22c55e" },
};

export default function AtributosEdit({ data, onSave }) {
  const [atributos, setAtributos] = useState(data);

  const handleAdjust = (nome, delta) => {
    setAtributos((prev) => ({
      ...prev,
      // Garante que o atributo não seja menor que 0
      [nome]: Math.max(0, (prev[nome] || 0) + delta),
    }));
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card
        style={{
          backgroundColor: "#161a22",
          border: "1px solid #2a2f3e",
          maxWidth: "420px",
          width: "100%",
        }}
      >
        <Card.Header
          style={{
            backgroundColor: "#1e2330",
            borderBottom: "1px solid #2a2f3e",
            fontWeight: 600,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>Definir Atributos</span>
        </Card.Header>

        <Card.Body style={{ padding: "1rem" }}>
          {Object.entries(ATTR_CONFIG).map(([key, config]) => (
            <Row
              key={key}
              style={{
                padding: "0.6rem 0.5rem",
                borderRadius: "6px",
                marginBottom: "0.5rem",
                backgroundColor: "#1e233044",
                border: "1px solid #2a2f3e",
              }}
              className="align-items-center"
            >
              <Col xs="auto">
                <div style={{ color: config.color }}>{config.icon}</div>
              </Col>
              
              <Col style={{ color: "#9aa0b3", fontSize: "0.9rem", fontWeight: 500 }}>
                {config.label}
              </Col>

              <Col xs="auto" className="d-flex align-items-center gap-3">
                <Button
                  variant="outline-danger"
                  size="sm"
                  style={{ width: "28px", height: "28px", padding: 0, lineHeight: 1 }}
                  onClick={() => handleAdjust(key, -1)}
                >
                  -
                </Button>

                <span
                  style={{
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    minWidth: "20px",
                    textAlign: "center",
                  }}
                >
                  {atributos[key]}
                </span>

                <Button
                  variant="outline-success"
                  size="sm"
                  style={{ width: "28px", height: "28px", padding: 0, lineHeight: 1 }}
                  onClick={() => handleAdjust(key, 1)}
                >
                  +
                </Button>
              </Col>
            </Row>
          ))}

          <div className="d-grid mt-4">
            <Button 
              variant="info" 
              className="fw-bold d-flex align-items-center justify-content-center gap-2"
              onClick={() => onSave(atributos)}
            >
              <Save size={18} /> SALVAR ATRIBUTOS
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}