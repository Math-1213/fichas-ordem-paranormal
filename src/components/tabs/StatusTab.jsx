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
 * Gerencia os recursos vitais (Vida, Sanidade, Esforço) e exibe as defesas calculadas.
 * * @component
 * @param {Object} props
 * @param {Character} props.character - Instância do personagem para cálculo de perícias e resistências.
 */
export default function StatusTab({ character }) {
  const { status, infos, id } = character;

  // Estados locais para controle imediato da UI antes de uma persistência global
  const [vida, setVida] = useState(status.vida);
  const [sanidade, setSanidade] = useState(status.sanidade);
  const [esforco, setEsforco] = useState(status.esforco);

  // Cálculos de Defesa derivados de Perícias e Bônus de Itens
  const reflexos = character.getFullPericia("reflexos") ?? 0;
  const fortitude = character.getFullPericia("fortitude") ?? 0;

  const passiva = status.defesas.passiva;
  const esquiva = passiva + reflexos + status.defesas.bonusReflexos;
  const bloqueio = fortitude + status.defesas.bonusFortitude;

  useEffect(() => {
    const timer = setTimeout(() => {
      // Só salva se houver alguma diferença real do que veio do character
      if (
        vida !== status.vida ||
        sanidade !== status.sanidade ||
        esforco !== status.esforco
      ) {
        CharacterService.updateStatus(id, { vida, sanidade, esforco });
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [vida, sanidade, esforco, id]);

  /**
   * Componente interno para renderizar barras de recursos com controles de ajuste.
   * * @param {Object} p
   * @param {string} p.label - Nome do recurso (Vida, Sanidade, etc).
   * @param {number} p.value - Valor atual.
   * @param {number} p.max - Valor máximo permitido.
   * @param {Function} p.onChange - Callback para atualizar o estado.
   * @param {string} p.color - Variante de cor do Bootstrap (danger, info, warning).
   */
  function StatBar({ label, value, max, onChange, color }) {
    const [inputValue, setInputValue] = useState(String(value));

    // Sincroniza o input textual se o valor numérico mudar via botões
    useEffect(() => {
      setInputValue(String(value));
    }, [value]);

    /**
     * Ajusta o valor via botões de incremento/decremento.
     * @tip Segurar SHIFT ajusta em 5 unidades em vez de 1.
     */
    function adjust(delta, e) {
      const step = e.shiftKey ? 5 : 1;
      onChange(value + delta * step);
    }

    /**
     * Valida a entrada manual do usuário ao perder o foco do input.
     */
    function handleBlur() {
      const num = Number(inputValue);
      if (!isNaN(num)) {
        onChange(Math.max(0, Math.min(max, num)));
      } else {
        setInputValue(String(value));
      }
    }

    return (
      <div className="mb-3">
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
                width: "60px",
                backgroundColor: "#161a22",
                color: "#e6e6e6",
                border: "1px solid #2a2f3e",
                textAlign: "center",
              }}
            />
            <span style={{ color: "#9aa0b3" }}>/ {max}</span>
          </div>
        </div>

        <Row className="align-items-center g-2">
          <Col xs="auto">
            <Button
              size="sm"
              variant="outline-danger"
              onClick={(e) => adjust(-1, e)}
            >
              -
            </Button>
          </Col>
          <Col>
            <ProgressBar
              now={Math.min(value, max)}
              max={max}
              variant={color}
              style={{ height: "18px", borderRadius: "4px" }}
            />
          </Col>
          <Col xs="auto">
            <Button
              size="sm"
              variant="outline-success"
              onClick={(e) => adjust(1, e)}
            >
              +
            </Button>
          </Col>
        </Row>
      </div>
    );
  }

  // Filtragem dinâmica de resistências (só exibe o que o personagem de fato possui)
  const resistElementos = Object.entries(status.resistencias.elementos).filter(
    ([, v]) => v > 0
  );

  const resistOutras = Object.entries(status.resistencias.outras).filter(
    ([, v]) => v > 0
  );

  return (
    <Card style={{ backgroundColor: "#161a22", border: "1px solid #2a2f3e" }}>
      <Card.Header
        style={{
          backgroundColor: "#1e2330",
          borderBottom: "1px solid #2a2f3e",
          fontWeight: 600,
        }}
      >
        Status Vital & Defesas
      </Card.Header>

      <Card.Body>
        <Row className="mb-4">
          {/* Retrato do Personagem */}
          {infos.portrait && (
            <Col md="auto" className="d-none d-md-block">
              <Image
                src={infos.portrait}
                rounded
                style={{
                  width: "120px",
                  border: "1px solid #2a2f3e",
                  objectFit: "cover",
                }}
              />
            </Col>
          )}

          {/* Barras Principais */}
          <Col>
            <Stack>
              <StatBar
                label="Vida (PV)"
                value={vida}
                max={status.vidaMax}
                onChange={setVida}
                color="danger"
              />
              <StatBar
                label="Sanidade (SAN)"
                value={sanidade}
                max={status.sanidadeMax}
                onChange={setSanidade}
                color="info"
              />
              <StatBar
                label="Esforço (PE)"
                value={esforco}
                max={status.esforcoMax}
                onChange={setEsforco}
                color="warning"
              />
            </Stack>
          </Col>
        </Row>

        {/* Painel de Defesas: Valores fixos e derivados */}
        <Row className="mb-4 text-center">
          <Col>
            <div
              className="p-2"
              style={{
                backgroundColor: "#1e2330",
                borderRadius: "8px",
                border: "1px solid #2a2f3e",
              }}
            >
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "#9aa0b3",
                  textTransform: "uppercase",
                }}
              >
                Defesas
              </div>
              <div className="d-flex justify-content-around mt-2">
                <div>
                  <div style={{ fontSize: "1.2rem", fontWeight: 700 }}>
                    {passiva}
                  </div>
                  <Badge bg="secondary">Passiva</Badge>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      color: "#3b82f6",
                    }}
                  >
                    {esquiva}
                  </div>
                  <Badge bg="primary">Esquiva</Badge>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      color: "#22c55e",
                    }}
                  >
                    {bloqueio}
                  </div>
                  <Badge bg="success">Bloqueio</Badge>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/* Painel de Resistências: Renderização condicional */}
        {(resistElementos.length > 0 || resistOutras.length > 0) && (
          <Row>
            <Col>
              <strong style={{ fontSize: "0.9rem" }}>
                Resistências Ativas
              </strong>
              {/* Elementais (Sangue, Morte, Conhecimento, Energia) */}
              {resistElementos.length > 0 && (
                <div className="mt-2">
                  <div
                    style={{
                      fontSize: "0.7rem",
                      color: "#9aa0b3",
                      textTransform: "uppercase",
                    }}
                  >
                    Elementos
                  </div>
                  {resistElementos.map(([k, v]) => (
                    <Badge key={k} bg="info" className="me-1">
                      {k}: {v}
                    </Badge>
                  ))}
                </div>
              )}
              {/* Gerais (Corte, Impacto, Balística, etc) */}
              {resistOutras.length > 0 && (
                <div className="mt-2">
                  <div
                    style={{
                      fontSize: "0.7rem",
                      color: "#9aa0b3",
                      textTransform: "uppercase",
                    }}
                  >
                    Gerais
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
