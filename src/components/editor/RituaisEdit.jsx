import { useState, useMemo } from "react";
import { Card, Row, Col, Button, Form, InputGroup } from "react-bootstrap";
import { PERICIAS_MAP, ATRIBUTOS_MAP } from "../../configs/dice";
import { TREINO_BONUS, TREINO_LABELS } from "../../configs/skills";
import { handleRoll } from "../../configs/dice";
import RollTooltip from "../ui/RollTooltip";

/**
 * Aba de Perícias
 * Exibe a lista de perícias, bônus totais e permite rolagens rápidas.
 */
export default function PericiasTab({ character }) {
  const [search, setSearch] = useState("");
  const [rolls, setRolls] = useState({});

  const periciasLista = useMemo(() => {
    return Object.entries(PERICIAS_MAP).map(([key, name]) => {
      const data = character.pericias?.[name] || { treino: "destreinado", bonus: 0 };
      const attrBase = character.pericias_base?.[name] || "FOR"; // Mapeamento base (ex: Atletismo -> FOR)
      const attrValue = character.atributos?.[ATRIBUTOS_MAP[attrBase]] || 0;
      const treinoBonus = TREINO_BONUS[data.treino] || 0;
      const totalBonus = treinoBonus + data.bonus;

      return {
        key,
        name,
        attrBase,
        attrValue,
        treino: data.treino,
        totalBonus,
        searchable: name.toLowerCase()
      };
    });
  }, [character]);

  const filtradas = periciasLista.filter(p => p.searchable.includes(search.toLowerCase()));

  return (
    <Card style={{ backgroundColor: "#161a22", border: "1px solid #2a2f3e" }}>
      <Card.Header className="bg-dark text-white border-bottom border-secondary">
        <InputGroup size="sm">
          <InputGroup.Text className="bg-dark border-secondary text-muted">🔍</InputGroup.Text>
          <Form.Control
            className="bg-dark text-white border-secondary shadow-none"
            placeholder="Buscar perícia..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>
      </Card.Header>
      <Card.Body className="p-2">
        <Row className="g-1">
          {filtradas.map((p) => (
            <Col xs={12} key={p.key}>
              <PericiaRow 
                pericia={p} 
                character={character} 
                rollState={[rolls, setRolls]} 
              />
            </Col>
          ))}
        </Row>
      </Card.Body>
    </Card>
  );
}

function PericiaRow({ pericia, character, rollState }) {
  const [rolls, setRolls] = rollState;
  const rollKey = `skill-${pericia.key}`;
  const currentRoll = rolls[rollKey] || { rolls: [], bonus: 0 };

  const expression = `/${pericia.attrBase}/d20 + ${pericia.totalBonus}`;

  return (
    <div 
      className="d-flex align-items-center p-2 rounded mb-1"
      style={{ backgroundColor: "#1e2330", border: "1px solid #2a2f3e" }}
    >
      {/* NOME E TREINO */}
      <div className="flex-grow-1">
        <div className="fw-bold text-white" style={{ fontSize: "0.9rem" }}>{pericia.name}</div>
        <div style={{ fontSize: "0.7rem", color: "#9aa0b3", textTransform: "uppercase" }}>
          {TREINO_LABELS[pericia.treino]} ({pericia.attrBase})
        </div>
      </div>

      {/* BÔNUS TOTAL */}
      <div className="me-3 text-center" style={{ minWidth: "40px" }}>
        <div className="fw-bold" style={{ color: "#3b82f6" }}>
          {pericia.totalBonus >= 0 ? `+${pericia.totalBonus}` : pericia.totalBonus}
        </div>
      </div>

      {/* BOTÃO DE ROLAGEM */}
      <RollTooltip
        rolls={currentRoll.rolls}
        rollType="teste"
        bonus={currentRoll.bonus}
      >
        <Button
          variant="outline-primary"
          size="sm"
          className="py-0 px-2 fw-bold"
          style={{ height: "32px" }}
          onClick={() => handleRoll(rollKey, expression, "teste", setRolls, character)}
        >
          {pericia.attrValue}d20
        </Button>
      </RollTooltip>
    </div>
  );
}