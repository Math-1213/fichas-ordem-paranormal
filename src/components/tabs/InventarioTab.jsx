import {
  Card,
  Stack,
  Badge,
  Alert,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useState } from "react";
import styled from "styled-components";
import Dice from "../../models/Dice";
import RollTooltip from "../ui/RollTooltip";
import { ATRIBUTOS_MAP, PERICIAS_MAP } from "../../configs/dice";
import { TREINO_BONUS } from "../../configs/skills";
import { toRoman } from "../../configs/number";

const WideTooltip = styled(Tooltip)`
  .tooltip-inner {
    width: 40vw;
    max-width: 500px;
    min-width: 320px;
    white-space: normal;
    text-align: left;
  }
`;

function resolveTeste({ atributo, pericias, bonus = 0 }, character) {
  const attrKey = atributo.toUpperCase();
  const perKey = pericias.toUpperCase();

  const attrName = ATRIBUTOS_MAP[attrKey];
  const perName = PERICIAS_MAP[perKey];

  const attrValue = character.atributos?.[attrName] ?? 0;
  const perData = character.pericias?.[perName] ?? {
    treino: "destreinado",
    bonus: 0,
  };

  const skillValue = TREINO_BONUS[perData.treino] + perData.bonus + bonus;

  return {
    expression: `/${attrKey}/d20 + /${perKey}/ + ${bonus}`,
    display: `${attrValue}d20 + ${skillValue}`,
  };
}

function calcPeso(item) {
  const qtd = item.quantidade ?? 1;
  return item.peso * qtd;
}

function getDamageDisplay(damage, character) {
  const { atributos } = character;
  const expr = damage.dados;

  const diceMatch = expr.match(/^(\d+d\d+)/);
  if (!diceMatch) return expr;

  const dice = diceMatch[1];
  const rest = expr.slice(dice.length);

  let bonusTotal = 0;

  const attrRegex = /([+-]?)(\d*)\*?\/([A-Z]{3})\//g;
  let match;

  while ((match = attrRegex.exec(rest)) !== null) {
    const sign = match[1] === "-" ? -1 : 1;
    const multiplier = match[2] ? Number(match[2]) : 1;
    const attrKey = ATRIBUTOS_MAP[match[3]];
    const attrValue = atributos[attrKey] || 0;

    bonusTotal += sign * multiplier * attrValue;
  }

  const numericPart = rest.replace(attrRegex, "").match(/[+-]?\d+/g);

  if (numericPart) {
    bonusTotal += numericPart.reduce((sum, n) => sum + Number(n), 0);
  }

  return bonusTotal !== 0 ? `${dice} + ${bonusTotal}` : dice;
}

export default function InventarioTab({ character }) {
  const inventario = character.inventario ?? [];
  const cargaMax = character.infos.carga ?? 0;

  const pesoTotal = inventario.reduce((s, i) => s + calcPeso(i), 0);

  const sobrecarregado = pesoTotal > cargaMax;
  const limiteExcedido = pesoTotal > cargaMax * 2;

  const armas = inventario.filter((i) => i.tipo === "arma");
  const equipamentos = inventario.filter((i) => i.tipo === "equipamento");
  const itens = inventario.filter((i) => i.tipo === "item");

  const [rolls, setRolls] = useState({});

  function handleRoll(key, expression, rollType) {
    const result = Dice.parseRollExpression(
      expression,
      {
        atributos: character.atributos,
        pericias: character.pericias,
      },
      rollType
    );

    setRolls((prev) => ({
      ...prev,
      [key]: result,
    }));
  }

  function EspecialBadge({ especial }) {
    return (
      <OverlayTrigger
        placement="top"
        overlay={
          <WideTooltip id={`tooltip-${especial.nome}`}>
            <strong>{especial.nome}</strong>
            <div style={{ fontSize: "0.9rem", marginTop: "0.4rem" }}>
              {especial.descricao}
            </div>
          </WideTooltip>
        }
      >
        <Badge
          bg={especial.paranormal ? "danger" : "secondary"}
          style={{ cursor: "help" }}
        >
          {especial.nome}
        </Badge>
      </OverlayTrigger>
    );
  }

  function ArmaCard({ item }) {
    const arma = item.arma;

    return (
      <Card style={{ backgroundColor: "#1e2330", border: "1px solid #2a2f3e" }}>
        <Card.Body>
          <div className="d-flex justify-content-between">
            <strong>{item.nome}</strong>
            <div>
              <Badge bg="warning" className="me-1">
                {arma.tipo}
              </Badge>
              {item.paranormal && <Badge bg="danger">Paranormal</Badge>}
            </div>
          </div>

          <div style={{ fontSize: "0.8rem", color: "#9aa0b3" }}>
            Crítico: ≥ {arma.critico} | Peso: {item.peso} | Alcance:{" "}
            {item.alcance} | Categoria: {toRoman(item.categoria)}
          </div>

          {/* ESPECIAIS / MALDIÇÕES */}
          {arma.especiais?.length > 0 && (
            <div style={{ marginTop: "0.6rem" }}>
              <strong>Modificações</strong>
              <div
                style={{
                  display: "flex",
                  gap: "0.4rem",
                  flexWrap: "wrap",
                  marginTop: "0.3rem",
                }}
              >
                {arma.especiais.map((e, i) => (
                  <EspecialBadge key={`esp-${item.nome}-${i}`} especial={e} />
                ))}
              </div>
            </div>
          )}

          <div style={{ marginTop: "0.4rem" }}>{item.descricao}</div>

          {/* ATAQUES */}
          {arma.ataques?.length > 0 && (
            <div style={{ marginTop: "0.6rem" }}>
              <strong>Ataques</strong>

              {arma.ataques.map((a, i) => {
                const key = `atk-${item.nome}-${i}`;
                const { expression, display } = resolveTeste(a, character);

                return (
                  <div
                    key={key}
                    style={{
                      fontSize: "0.85rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      flexWrap: "wrap",
                    }}
                  >
                    • <strong>{a.titulo}</strong>
                    <RollTooltip
                      rolls={rolls[key]?.rolls ?? []}
                      rollType="teste"
                      critico={arma.critico}
                      bonus={rolls[key]?.bonus ?? 0}
                    >
                      <Button
                        size="sm"
                        variant="outline-light"
                        onClick={() => handleRoll(key, expression, "teste")}
                      >
                        {display}
                      </Button>
                    </RollTooltip>
                  </div>
                );
              })}
            </div>
          )}

          {/* DANOS */}
          {arma.danos?.length > 0 && (
            <div style={{ marginTop: "0.6rem" }}>
              <strong>Danos</strong>
              {arma.danos.map((d, i) => {
                const key = `dmg-${item.nome}-${i}`;
                const display = getDamageDisplay(d, character);

                return (
                  <div
                    key={key}
                    style={{
                      fontSize: "0.85rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    • <strong>{d.titulo} </strong>
                    <RollTooltip
                      rolls={rolls[key]?.rolls ?? []}
                      rollType="soma"
                      bonus={rolls[key]?.bonus ?? 0}
                    >
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => handleRoll(key, d.dados, "soma")}
                        style={{ margin: "1px" }}
                      >
                        {display}
                      </Button>
                    </RollTooltip>
                  </div>
                );
              })}
            </div>
          )}
        </Card.Body>
      </Card>
    );
  }

  function Section({ title, children }) {
    if (!children.length) return null;

    return (
      <div>
        <strong>{title}</strong>
        <Stack gap={2} className="mt-2">
          {children}
        </Stack>
      </div>
    );
  }

  return (
    <Card style={{ backgroundColor: "#161a22", border: "1px solid #2a2f3e" }}>
      <Card.Header
        style={{
          backgroundColor: "#1e2330",
          borderBottom: "1px solid #2a2f3e",
          fontWeight: 600,
        }}
      >
        Inventário
      </Card.Header>

      <Card.Body>
        <div style={{ marginBottom: "1rem" }}>
          <strong>Peso</strong>: {pesoTotal} / {cargaMax}
        </div>

        {limiteExcedido && (
          <Alert variant="danger">Limite de carga máximo atingido.</Alert>
        )}

        {!limiteExcedido && sobrecarregado && (
          <Alert variant="warning">Personagem sobrecarregado.</Alert>
        )}

        <Stack gap={4}>
          <Section title="Armas">
            {armas.map((i) => (
              <ArmaCard key={i.nome} item={i} />
            ))}
          </Section>
        </Stack>
      </Card.Body>
    </Card>
  );
}
