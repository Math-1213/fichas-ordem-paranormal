import { useMemo, useState } from "react";
import { Card, Stack, Badge, Form, Button } from "react-bootstrap";
import styled from "styled-components";
import RollTooltip from "../ui/RollTooltip";
import { handleRoll, formatExpression } from "../../configs/dice";

/**
 * Cores temáticas para cada elemento do Outro Lado.
 */
const ELEMENTO_COLORS = {
  SANGUE: "#ef4444",
  MORTE: "#7c3aed",
  ENERGIA: "#3b82f6",
  CONHECIMENTO: "#eab308",
  MEDO: "#9ca3af",
};

const RitualCard = styled(Card)`
  border-left: 4px solid ${(props) => props.color || "#2a2f3e"} !important;
  background-color: #1e2330;
  border: 1px solid #2a2f3e;
  transition: transform 0.2s ease;

  &:hover {
    border-color: ${(props) => props.color || "#2a2f3e"};
  }
`;

/**
 * Aba de Rituais.
 * Organiza rituais por círculo e permite rolagens de dano/cura.
 */
export default function RituaisTab({ character }) {
  const [rolls, setRolls] = useState({});
  const rituais = character.rituais ?? [];

  // Agrupa rituais por Círculo (1, 2, 3, 4)
  const circulos = useMemo(() => {
    const groups = {};
    rituais.forEach((rit) => {
      const c = rit.circulo || 1;
      if (!groups[c]) groups[c] = [];
      groups[c].push(rit);
    });
    return Object.entries(groups).sort(([a], [b]) => a - b);
  }, [rituais]);

  function RitualItem({ rit }) {
    const color = ELEMENTO_COLORS[rit.elemento?.toUpperCase()] || "#9aa0b3";
    const keyDano = `rit-dano-${rit.nome}`;

    return (
      <RitualCard color={color} className="mb-3">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <div className="d-flex align-items-center gap-2 mb-1">
                <strong style={{ fontSize: "1.1rem", color: "#fff" }}>{rit.nome}</strong>
                <Badge style={{ backgroundColor: color, fontSize: "0.65rem" }}>
                  {rit.elemento}
                </Badge>
              </div>
              <div style={{ fontSize: "0.75rem", color: "#9aa0b3" }} className="mb-2">
                {rit.execucao} • {rit.alcance} • {rit.duracao} • Res: {rit.resistencia || "N/A"}
              </div>
            </div>
            <div className="text-end">
              <div style={{ fontSize: "0.85rem", fontWeight: "bold", color: "#8b5cf6" }}>
                {rit.custo} PE
              </div>
            </div>
          </div>

          <div style={{ fontSize: "0.9rem", color: "#d0d3e0", marginBottom: "1rem" }}>
            {rit.descricao}
          </div>

          {/* Ações do Ritual */}
          {(rit.dano || rit.efeito_dados) && (
            <div className="d-flex gap-2 pt-2" style={{ borderTop: "1px solid #2a2f3e" }}>
              <RollTooltip
                rolls={rolls[keyDano]?.rolls ?? []}
                rollType="soma"
                bonus={rolls[keyDano]?.bonus ?? 0}
              >
                <Button
                  size="sm"
                  variant="outline-light"
                  style={{ borderColor: color, color: "#fff" }}
                  onClick={() =>
                    handleRoll(
                      keyDano,
                      rit.dano || rit.efeito_dados,
                      "soma",
                      setRolls,
                      character
                    )
                  }
                >
                  Rolar: {formatExpression(rit.dano || rit.efeito_dados, character)}
                </Button>
              </RollTooltip>
            </div>
          )}
        </Card.Body>
      </RitualCard>
    );
  }

  return (
    <Card style={{ backgroundColor: "#161a22", border: "1px solid #2a2f3e" }}>
      <Card.Header style={{ backgroundColor: "#1e2330", color: "#fff", fontWeight: 600 }}>
        Grimório Paranormal
      </Card.Header>
      <Card.Body>
        {rituais.length === 0 ? (
          <div className="text-center py-4 text-muted">Este personagem não possui rituais.</div>
        ) : (
          circulos.map(([circulo, lista]) => (
            <div key={circulo} className="mb-4">
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "#9aa0b3",
                  letterSpacing: "1px",
                  marginBottom: "0.75rem",
                  borderBottom: "1px solid #2a2f3e",
                  paddingBottom: "0.25rem",
                }}
              >
                {circulo}º CÍRCULO
              </div>
              {lista
                .sort((a, b) => a.nome.localeCompare(b.nome))
                .map((rit, idx) => (
                  <RitualItem key={idx} rit={rit} />
                ))}
            </div>
          ))
        )}
      </Card.Body>
    </Card>
  );
}