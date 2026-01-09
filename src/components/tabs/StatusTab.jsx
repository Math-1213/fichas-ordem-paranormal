import { useState, useEffect, useRef } from "react";
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

export default function StatusTab({ character }) {
  const { status, infos } = character;

  const [vida, setVida] = useState(status.vida);
  const [sanidade, setSanidade] = useState(status.sanidade);
  const [esforco, setEsforco] = useState(status.esforco);

  const reflexos = character.getFullPericia("reflexos") ?? 0;
  const fortitude = character.getFullPericia("fortitude") ?? 0;

  const passiva = status.defesas.passiva;
  const esquiva = passiva + reflexos + status.defesas.bonusReflexos;
  const bloqueio = fortitude + status.defesas.bonusFortitude;

  function StatBar({ label, value, max, onChange, color }) {
    const [inputValue, setInputValue] = useState(String(value));

    // sincroniza quando o valor externo muda
    useEffect(() => {
      setInputValue(String(value));
    }, [value]);

    function adjust(delta, e) {
      const step = e.shiftKey ? 5 : 1;
      onChange(value + delta * step);
    }

    function handleBlur() {
      const num = Number(inputValue);
      if (!isNaN(num)) {
        onChange(Math.max(0, Math.min(max, num)));
      } else {
        setInputValue(String(value));
      }
    }

    return (
      <div>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "0.85rem",
            marginBottom: "0.35rem",
          }}
        >
          <strong>{label}</strong>

          <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
            <Form.Control
              size="sm"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onBlur={handleBlur}
              style={{
                width: "70px",
                backgroundColor: "#161a22",
                color: "#e6e6e6",
                border: "1px solid #2a2f3e",
                textAlign: "center",
              }}
            />
            <span style={{ color: "#9aa0b3" }}>/ {max}</span>
          </div>
        </div>

        {/* Barra */}
        <Row className="align-items-center g-2">
          <Col xs="auto">
            <Button
              size="sm"
              variant="outline-danger"
              onClick={(e) => adjust(-1, e)}
            >
              &lt;
            </Button>
          </Col>

          <Col>
            <ProgressBar
              now={Math.min(value, max)}
              max={max}
              variant={color}
              style={{
                height: "24px",
                transition: "width 0.9s ease",
              }}
            />
          </Col>

          <Col xs="auto">
            <Button
              size="sm"
              variant="outline-success"
              onClick={(e) => adjust(1, e)}
            >
              &gt;
            </Button>
          </Col>
        </Row>
      </div>
    );
  }

  const resistElementos = Object.entries(status.resistencias.elementos).filter(
    ([, v]) => v > 0
  );

  const resistOutras = Object.entries(status.resistencias.outras).filter(
    ([, v]) => v > 0
  );

  return (
    <Card
      style={{
        backgroundColor: "#161a22",
        border: "1px solid #2a2f3e",
      }}
    >
      <Card.Header
        style={{
          backgroundColor: "#1e2330",
          borderBottom: "1px solid #2a2f3e",
          fontWeight: 600,
        }}
      >
        Status
      </Card.Header>

      <Card.Body>
        <Row className="mb-4">
          {infos.portrait && (
            <Col md="auto">
              <Image
                src={infos.portrait}
                rounded
                style={{
                  width: "120px",
                  border: "1px solid #2a2f3e",
                }}
              />
            </Col>
          )}

          <Col>
            <Stack gap={3}>
              <StatBar
                label="Vida"
                value={vida}
                max={status.vida}
                onChange={setVida}
                color="danger"
              />

              <StatBar
                label="Sanidade"
                value={sanidade}
                max={status.sanidade}
                onChange={setSanidade}
                color="info"
              />

              <StatBar
                label="Esforço"
                value={esforco}
                max={status.esforco}
                onChange={setEsforco}
                color="warning"
              />
            </Stack>
          </Col>
        </Row>

        {/* DEFESAS */}
        <Row className="mb-3">
          <Col>
            <strong>Defesas</strong>
            <div className="mt-2">
              <Badge bg="secondary" className="me-2">
                Passiva: {passiva}
              </Badge>
              <Badge bg="primary" className="me-2">
                Esquiva: {esquiva}
              </Badge>
              <Badge bg="success">Bloqueio: {bloqueio}</Badge>
            </div>
          </Col>
        </Row>

        {/* RESISTÊNCIAS */}
        {(resistElementos.length > 0 || resistOutras.length > 0) && (
          <Row>
            <Col>
              <strong>Resistências</strong>

              {resistElementos.length > 0 && (
                <div className="mt-2">
                  <div style={{ fontSize: "0.8rem", color: "#9aa0b3" }}>
                    Elementos
                  </div>
                  {resistElementos.map(([k, v]) => (
                    <Badge key={k} bg="info" className="me-1">
                      {k}: {v}
                    </Badge>
                  ))}
                </div>
              )}

              {resistOutras.length > 0 && (
                <div className="mt-2">
                  <div style={{ fontSize: "0.8rem", color: "#9aa0b3" }}>
                    Outras
                  </div>
                  {resistOutras.map(([k, v]) => (
                    <Badge key={k} bg="secondary" className="me-1">
                      {k}: {v}
                    </Badge>
                  ))}
                </div>
              )}
            </Col>
          </Row>
        )}
      </Card.Body>
    </Card>
  );
}
