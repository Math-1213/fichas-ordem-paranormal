import { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  ProgressBar,
  Button,
  Image,
  Stack,
  Badge,
  Form,
} from "react-bootstrap";
import { CharacterService } from "../../data/characters_service";

/**
 * Aba de Status e Combate.
 * Gerencia PV, SAN, PE e exibe as defesas calculadas (Passiva, Esquiva, Bloqueio).
 */
export default function StatusEdit({ character }) {
  const { status, infos, id } = character;

  // Estados locais para controle imediato da UI
  const [vida, setVida] = useState(status.vida);
  const [sanidade, setSanidade] = useState(status.sanidade);
  const [esforco, setEsforco] = useState(status.esforco);

  // Cálculos de Defesa derivados
  // getFullPericia soma o bônus de treinamento + bônus de itens/poderes
  const reflexos = character.getFullPericia("reflexos") ?? 0;
  const fortitude = character.getFullPericia("fortitude") ?? 0;

  const passiva = status.defesas.passiva;
  const esquiva = passiva + reflexos + (status.defesas.bonusReflexos || 0);
  const bloqueio = fortitude + (status.defesas.bonusFortitude || 0);

  // Efeito de Debounce: Salva no CharacterService após 1 segundo de inatividade nos inputs
  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        vida !== status.vida ||
        sanidade !== status.sanidade ||
        esforco !== status.esforco
      ) {
        CharacterService.updateStatus(id, { vida, sanidade, esforco });
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [vida, sanidade, esforco, id, status]);

  /**
   * Componente interno para as barras de progresso interativas
   */
  function StatBar({ label, value, max, onChange, color }) {
    const [inputValue, setInputValue] = useState(String(value));

    useEffect(() => {
      setInputValue(String(value));
    }, [value]);

    const adjust = (delta, e) => {
      const step = e.shiftKey ? 5 : 1;
      const next = Math.max(0, Math.min(max, value + delta * step));
      onChange(next);
    };

    const handleBlur = () => {
      const num = Number(inputValue);
      if (!isNaN(num)) {
        onChange(Math.max(0, Math.min(max, num)));
      } else {
        setInputValue(String(value));
      }
    };

    return (
      <div className="mb-3">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <strong style={{ fontSize: "0.85rem", color: "#fff" }}>{label}</strong>
          <div className="d-flex gap-1 align-items-center">
            <Form.Control
              size="sm"
              className="bg-dark text-white border-secondary text-center"
              style={{ width: "50px", fontSize: "0.8rem", padding: "2px" }}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onBlur={handleBlur}
            />
            <span style={{ color: "#9aa0b3", fontSize: "0.8rem" }}>/ {max}</span>
          </div>
        </div>

        <Row className="align-items-center g-2">
          <Col xs="auto">
            <Button size="sm" variant="outline-danger" onClick={(e) => adjust(-1, e)} style={{ width: "30px" }}>-</Button>
          </Col>
          <Col>
            <ProgressBar 
              now={(value / max) * 100} 
              variant={color} 
              style={{ height: "12px", backgroundColor: "#0f1220" }} 
            />
          </Col>
          <Col xs="auto">
            <Button size="sm" variant="outline-success" onClick={(e) => adjust(1, e)} style={{ width: "30px" }}>+</Button>
          </Col>
        </Row>
      </div>
    );
  }

  // Filtros de Resistência
  const resistElementos = Object.entries(status.resistencias?.elementos || {}).filter(([, v]) => v > 0);
  const resistOutras = Object.entries(status.resistencias?.outras || {}).filter(([, v]) => v > 0);

  return (
    <Card style={{ backgroundColor: "#161a22", border: "1px solid #2a2f3e" }}>
      <Card.Body>
        <Row className="g-3">
          {/* Portrait e Barras */}
          <Col xs={12} lg={6}>
            <div className="d-flex gap-3 align-items-start mb-4">
              {infos.portrait && (
                <Image
                  src={infos.portrait}
                  style={{ width: "100px", height: "100px", objectFit: "cover", border: "2px solid #2a2f3e" }}
                  rounded
                />
              )}
              <div className="flex-grow-1">
                <StatBar label="VIDA" value={vida} max={status.vidaMax} onChange={setVida} color="danger" />
                <StatBar label="SANIDADE" value={sanidade} max={status.sanidadeMax} onChange={setSanidade} color="info" />
                <StatBar label="ESFORÇO" value={esforco} max={status.esforcoMax} onChange={setEsforco} color="warning" />
              </div>
            </div>
          </Col>

          {/* Defesas */}
          <Col xs={12} lg={6}>
            <div className="p-3 rounded" style={{ backgroundColor: "#1e2330", border: "1px solid #2a2f3e" }}>
              <div className="text-center text-muted fw-bold mb-3" style={{ fontSize: "0.7rem", letterSpacing: "1px" }}>DEFESAS ATUAIS</div>
              <Row className="text-center">
                <Col>
                  <div className="h4 mb-0 fw-bold">{passiva}</div>
                  <Badge bg="secondary" style={{ fontSize: "0.6rem" }}>PASSIVA</Badge>
                </Col>
                <Col style={{ borderLeft: "1px solid #2a2f3e", borderRight: "1px solid #2a2f3e" }}>
                  <div className="h4 mb-0 fw-bold text-primary">{esquiva}</div>
                  <Badge bg="primary" style={{ fontSize: "0.6rem" }}>ESQUIVA</Badge>
                </Col>
                <Col>
                  <div className="h4 mb-0 fw-bold text-success">{bloqueio}</div>
                  <Badge bg="success" style={{ fontSize: "0.6rem" }}>BLOQUEIO</Badge>
                </Col>
              </Row>
            </div>

            {/* Resistências */}
            {(resistElementos.length > 0 || resistOutras.length > 0) && (
              <div className="mt-3 p-2 rounded" style={{ backgroundColor: "#0b0e14", border: "1px solid #2a2f3e" }}>
                <div style={{ fontSize: "0.7rem", color: "#9aa0b3" }} className="mb-2 fw-bold">RESISTÊNCIAS</div>
                <div className="d-flex flex-wrap gap-1">
                  {resistElementos.map(([k, v]) => (
                    <Badge key={k} bg="dark" className="border border-info text-info">{k} {v}</Badge>
                  ))}
                  {resistOutras.map(([k, v]) => (
                    <Badge key={k} bg="dark" className="border border-secondary">{k} {v}</Badge>
                  ))}
                </div>
              </div>
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}