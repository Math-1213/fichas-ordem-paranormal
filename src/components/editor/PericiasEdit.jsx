import { useState } from "react";
import { Card, Row, Col, Form, Button, Badge } from "react-bootstrap";
import { Save, Search, Info } from "lucide-react";
import {
  PERICIAS,
  TREINO_LABELS,
  TREINO_COLORS,
} from "../../configs/skills";

export default function PericiasEdit({ data, onSave }) {
  // 'data' aqui é o objeto character.pericias
  const [pericias, setPericias] = useState(data || {});
  const [filter, setFilter] = useState("");

  const handleUpdate = (nome, field, value) => {
    setPericias(prev => ({
      ...prev,
      [nome]: {
        ...(prev[nome] || { treino: "destreinado", bonus: 0 }),
        [field]: value
      }
    }));
  };

  // Filtra as perícias conforme a busca
  const filteredSkills = Object.keys(PERICIAS)
    .sort((a, b) => a.localeCompare(b))
    .filter(nome => 
        PERICIAS[nome].label.toLowerCase().includes(filter.toLowerCase())
    );

  return (
    <Card style={{ backgroundColor: "#161a22", border: "1px solid #2a2f3e" }}>
      <Card.Header className="d-flex justify-content-between align-items-center bg-dark border-secondary p-3">
        <h5 className="mb-0 text-white">Treinamento de Perícias</h5>
        <div className="d-flex gap-2">
            <div className="position-relative">
                <Search size={16} className="position-absolute" style={{ left: '10px', top: '10px', color: '#9aa0b3' }} />
                <Form.Control 
                    placeholder="Buscar perícia..." 
                    size="sm"
                    className="ps-5"
                    style={{ backgroundColor: "#0d1117", borderColor: "#2a2f3e", color: "#fff", width: "200px" }}
                    onChange={(e) => setFilter(e.target.value)}
                />
            </div>
            <Button variant="info" size="sm" onClick={() => onSave(pericias)}>
                <Save size={16} className="me-1" /> Salvar
            </Button>
        </div>
      </Card.Header>

      <Card.Body style={{ maxHeight: "60vh", overflowY: "auto", padding: "0.75rem" }}>
        {filteredSkills.map((nome) => {
          const config = PERICIAS[nome];
          const skillData = pericias[nome] ?? { treino: "destreinado", bonus: 0 };

          return (
            <Row
              key={nome}
              className="align-items-center mb-2 g-2 p-2 rounded"
              style={{ backgroundColor: "#1e233044", border: "1px solid #2a2f3e" }}
            >
              {/* NOME E INFO */}
              <Col md={3}>
                <div className="fw-bold text-white" style={{ fontSize: "0.95rem" }}>{config.label}</div>
                <div className="text-muted small text-uppercase">{config.atributo.substring(0,3)}</div>
              </Col>

              {/* SELETOR DE TREINO */}
              <Col md={3}>
                <Form.Select
                  size="sm"
                  value={skillData.treino}
                  onChange={(e) => handleUpdate(nome, "treino", e.target.value)}
                  style={{ 
                    backgroundColor: "#0d1117", 
                    color: "#fff", 
                    borderColor: TREINO_COLORS[skillData.treino] ? `var(--bs-${TREINO_COLORS[skillData.treino]})` : "#2a2f3e" 
                  }}
                >
                  {Object.keys(TREINO_LABELS).map(key => (
                    <option key={key} value={key}>{TREINO_LABELS[key]}</option>
                  ))}
                </Form.Select>
              </Col>

              {/* BÔNUS EXTRA */}
              <Col md={3} className="d-flex align-items-center">
                <span className="text-muted small me-2">BÔNUS:</span>
                <Form.Control
                  type="number"
                  size="sm"
                  value={skillData.bonus}
                  onChange={(e) => handleUpdate(nome, "bonus", parseInt(e.target.value) || 0)}
                  style={{ backgroundColor: "#0d1117", color: "#fff", borderColor: "#2a2f3e" }}
                />
              </Col>

              {/* BADGES DE REGRAS (Visual apenas) */}
              <Col md={3} className="text-end">
                {config.somenteTreinada && <Badge bg="danger" className="ms-1" style={{fontSize: '0.6rem'}}>TREINADA</Badge>}
                {config.kit && <Badge bg="warning" text="dark" className="ms-1" style={{fontSize: '0.6rem'}}>KIT</Badge>}
                {config.carga && <Badge bg="secondary" className="ms-1" style={{fontSize: '0.6rem'}}>CARGA</Badge>}
              </Col>
            </Row>
          );
        })}
      </Card.Body>

      <Card.Footer className="bg-dark border-secondary p-3 text-center">
        <Button variant="info" className="w-50 fw-bold" onClick={() => onSave(pericias)}>
          <Save size={18} className="me-2" /> ATUALIZAR TODAS AS PERÍCIAS
        </Button>
      </Card.Footer>
    </Card>
  );
}