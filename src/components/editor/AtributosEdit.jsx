import { useState, useEffect } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { Shield, Zap, Brain, Eye, Heart } from "lucide-react";

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

export default function AtributosEdit({ data, onChange }) {
  // Inicializa com os dados vindos do pai ou tudo em 0
  const [atributos, setAtributos] = useState({
    forca: 0,
    agilidade: 0,
    intelecto: 0,
    presenca: 0,
    vigor: 0,
    ...data // Sobrescreve se houver dados persistidos
  });

  // Sincroniza se o objeto data mudar externamente
  useEffect(() => {
    if (data) {
      setAtributos(prev => ({ ...prev, ...data }));
    }
  }, [data]);

  const handleAdjust = (nome, delta) => {
    const newVal = Math.max(0, (atributos[nome] || 0) + delta);
    const newAtributos = {
      ...atributos,
      [nome]: newVal,
    };
    
    setAtributos(newAtributos);
    // Notifica o pai para que o estado global do personagem seja atualizado
    if (onChange) onChange(newAtributos);
  };

  return (
    <div className="d-flex justify-content-center">
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
            color: "#fff",
            textAlign: "center"
          }}
        >
          Definir Atributos Base
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
              className="align-items-center g-0"
            >
              <Col xs="auto" className="pe-3">
                <div style={{ color: config.color }}>{config.icon}</div>
              </Col>
              
              <Col style={{ color: "#e6e6e6", fontSize: "0.95rem", fontWeight: 600 }}>
                {config.label}
              </Col>

              <Col xs="auto" className="d-flex align-items-center gap-2">
                <Button
                  variant="outline-danger"
                  size="sm"
                  style={{ width: "32px", height: "32px", padding: 0, borderOpacity: 0.5 }}
                  onClick={() => handleAdjust(key, -1)}
                >
                  -
                </Button>

                <div
                  style={{
                    color: config.color,
                    fontWeight: 800,
                    fontSize: "1.2rem",
                    minWidth: "30px",
                    textAlign: "center",
                    textShadow: `0 0 10px ${config.color}44`
                  }}
                >
                  {atributos[key] || 0}
                </div>

                <Button
                  variant="outline-success"
                  size="sm"
                  style={{ width: "32px", height: "32px", padding: 0 }}
                  onClick={() => handleAdjust(key, 1)}
                >
                  +
                </Button>
              </Col>
            </Row>
          ))}
          
          <div className="text-center mt-3 small text-muted">
            Estes valores definem a base para todos os seus testes.
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}