import { useMemo, useState } from "react";
import {
  Card,
  Stack,
  Badge,
  Row,
  Col,
  Accordion,
  Form,
  Button,
} from "react-bootstrap";
import { formatExpression, handleRoll } from "../../configs/dice";
import { getElementText, ELEMENT_DATA } from "../../configs/paranormal";
import RollTooltip from "../ui/RollTooltip";

function getElementos(lista = []) {
  return lista.map(getElementText).join(" | ");
}

export default function RitualTab({ character }) {
  const rituais = character.rituais ?? [];
  const dtRitual = character.infos?.dtRitual ?? "-";

  const [rolls, setRolls] = useState({});

  const [nome, setNome] = useState("");
  const [elemento, setElemento] = useState("");
  const [circulo, setCirculo] = useState("");

  const rituaisFiltrados = useMemo(() => {
    return rituais.filter((r) => {
      const matchNome = r.nome?.toLowerCase().includes(nome.toLowerCase());
      const matchElemento =
        !elemento ||
        r.elementos?.some((e) => e.toLowerCase() === elemento.toLowerCase());
      const matchCirculo = !circulo || String(r.circulo) === circulo;
      return matchNome && matchElemento && matchCirculo;
    });
  }, [rituais, nome, elemento, circulo]);

  return (
    <Stack gap={3}>
      {/* CARD DE DT */}
      <Card style={{ backgroundColor: "#1e2330", border: "1px solid #2a2f3e" }}>
        <Card.Body className="d-flex justify-content-between align-items-center py-2">
          <span
            style={{ color: "#9aa0b3", fontWeight: "bold", fontSize: "0.9rem" }}
          >
            DT DOS RITUAIS
          </span>
          <Badge bg="primary" style={{ fontSize: "1.1rem" }}>
            {dtRitual}
          </Badge>
        </Card.Body>
      </Card>

      {/* FILTROS */}
      <Card style={{ backgroundColor: "#161a22", border: "1px solid #2a2f3e" }}>
        <Card.Body className="p-2">
          <Row className="g-2">
            <Col xs={12} md={5}>
              <Form.Control
                size="sm"
                className="bg-dark text-white border-secondary"
                placeholder="Nome do ritual..."
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </Col>
            <Col xs={6} md={4}>
              <Form.Select
                size="sm"
                className="bg-dark text-white border-secondary"
                value={elemento}
                onChange={(e) => setElemento(e.target.value)}
              >
                <option value="">Todos Elementos</option>
                <option value="morte">Morte</option>
                <option value="conhecimento">Conhecimento</option>
                <option value="energia">Energia</option>
                <option value="sangue">Sangue</option>
                <option value="medo">Medo</option>
              </Form.Select>
            </Col>
            <Col xs={6} md={3}>
              <Form.Select
                size="sm"
                className="bg-dark text-white border-secondary"
                value={circulo}
                onChange={(e) => setCirculo(e.target.value)}
              >
                <option value="">Círculos</option>
                {[1, 2, 3, 4].map((c) => (
                  <option key={c} value={c}>
                    {c}º Círculo
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* LISTA DE RITUAIS */}
      <Accordion className="custom-ritual-accordion">
        {rituaisFiltrados
          .sort((a, b) => a.nome.localeCompare(b.nome))
          .map((ritual, i) => (
            <RitualCard
              key={ritual.nome + i}
              ritual={ritual}
              character={character}
              rolls={rolls}
              setRolls={setRolls}
            />
          ))}
      </Accordion>
    </Stack>
  );
}

function RitualCard({ ritual, character, rolls, setRolls }) {
  const primaryElement =
    (ritual.elementos?.length > 0) ? ritual.elementos[0]?.toLowerCase() : "vazio";
  const styleData = ELEMENT_DATA[primaryElement] || ELEMENT_DATA.vazio;

  return (
    <Accordion.Item
      eventKey={ritual.nome}
      className="mb-3 overflow-hidden"
      style={{
        backgroundColor: "#161a22",
        border: `1px solid #2a2f3e`,
        borderLeft: `5px solid ${styleData.color}`, // Borda colorida lateral
        borderRadius: "8px",
      }}
    >
      <Accordion.Header className="ritual-header">
        <div className="d-flex justify-content-between w-100 pe-3 align-items-center">
          <div className="d-flex align-items-center gap-3">
            {/* ÍCONE DO ELEMENTO */}
            {styleData.icon && (
              <img
                src={styleData.icon}
                alt={primaryElement}
                style={{
                  width: "32px",
                  height: "32px",
                  filter: `drop-shadow(0 0 5px ${styleData.color}55)`,
                }}
              />
            )}
            <div>
              <div
                className="fw-bold text-white"
                style={{ fontSize: "1.1rem" }}
              >
                {ritual.nome}
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: styleData.color,
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                {getElementos(ritual.elementos)} • {ritual.circulo}º Círculo
              </div>
            </div>
          </div>
          <Badge
            bg="dark"
            className="border border-secondary"
            style={{ color: "#9aa0b3" }}
          >
            {ritual.execucao}
          </Badge>
        </div>
      </Accordion.Header>

      <Accordion.Body style={{ backgroundColor: "#0b0e14", color: "#e6e6e6" }}>
        <div
          className="p-2 mb-3 rounded"
          style={{
            backgroundColor: "#1a1d26",
            fontSize: "0.85rem",
            border: "1px solid #2a2f3e",
          }}
        >
          <strong>Alcance:</strong> {ritual.alcance} | <strong>Duração:</strong>{" "}
          {ritual.duracao}
          {ritual.resistencia && (
            <>
              {" "}
              | <strong>Resistência:</strong> {ritual.resistencia}
            </>
          )}
        </div>

        <Accordion flush>
          <RitualVersion
            name="Normal"
            data={ritual.normal}
            character={character}
            setRolls={setRolls}
            rollKey={`rit-${ritual.nome}-norm`}
            rolls={rolls}
          />
          {ritual.discente && (
            <RitualVersion
              name="Discente"
              data={ritual.discente}
              character={character}
              setRolls={setRolls}
              rollKey={`rit-${ritual.nome}-disc`}
              rolls={rolls}
              color={styleData.color}
            />
          )}
          {ritual.verdadeiro && (
            <RitualVersion
              name="Verdadeiro"
              data={ritual.verdadeiro}
              character={character}
              setRolls={setRolls}
              rollKey={`rit-${ritual.nome}-verd`}
              rolls={rolls}
              color={styleData.color}
            />
          )}
        </Accordion>
      </Accordion.Body>
    </Accordion.Item>
  );
}

function RitualVersion({
  name,
  data,
  character,
  rollKey,
  rolls,
  setRolls,
  color,
}) {
  const { custo, efeito, dados } = data;
  const rollData = rolls[rollKey] || { rolls: [], bonus: 0 };

  return (
    <Accordion.Item eventKey={name} className="bg-transparent border-0 mb-1">
      <Accordion.Header className="ritual-version-header">
        <div className="d-flex justify-content-between w-100 pe-3">
          <span
            className="fw-bold"
            style={{ color: name === "Normal" ? "#fff" : color }}
          >
            {name}
          </span>
          <Badge
            bg="dark"
            style={{
              color: color || "#00e5ff",
              border: `1px solid ${color || "#00e5ff"}55`,
            }}
          >
            {custo} PE
          </Badge>
        </div>
      </Accordion.Header>
      <Accordion.Body
        className="pt-0 pb-3"
        style={{ fontSize: "0.95rem", lineHeight: "1.4" }}
      >
        <p style={{ color: "#adb5bd" }}>
          {formatExpression(efeito, character)}
        </p>
        {dados && (
          <RollTooltip
            rolls={rollData.rolls}
            rollType="soma"
            bonus={rollData.bonus}
          >
            <Button
              variant="outline-light"
              size="sm"
              className="fw-bold mt-2"
              style={{ borderColor: color, color: color }}
              onClick={() =>
                handleRoll(rollKey, dados, "soma", setRolls, character)
              }
            >
              Rolar {formatExpression(dados, character)}
            </Button>
          </RollTooltip>
        )}
      </Accordion.Body>
    </Accordion.Item>
  );
}
