import {
  Card,
  Stack,
  Badge,
  Alert,
  Button,
  OverlayTrigger,
  Tooltip,
  Form,
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

function CollapsibleSection({ title, count, children }) {
  const [open, setOpen] = useState(false);

  return (
    <Card
      style={{
        backgroundColor: "#1e2330",
        border: "1px solid #2a2f3e",
      }}
    >
      <Card.Header
        onClick={() => setOpen((o) => !o)}
        style={{
          cursor: "pointer",
          userSelect: "none",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: 600,
        }}
      >
        <span>
          {title}{" "}
          <span style={{ color: "#9aa0b3", fontWeight: 400 }}>({count})</span>
        </span>
        <span style={{ fontSize: "0.9rem" }}>{open ? "▲" : "▼"}</span>
      </Card.Header>

      {open && (
        <Card.Body>
          <Stack gap={2}>{children}</Stack>
        </Card.Body>
      )}
    </Card>
  );
}

function formatExpression(expr, character) {
  if (!expr) return "";

  // Substitui /XXX/ pelo valor do Atributo ou bônus da Perícia
  return expr.replace(/\/([A-Z]{3,})\//g, (match, key) => {
    const upperKey = key.toUpperCase();

    // Tenta Atributo
    if (ATRIBUTOS_MAP[upperKey]) {
      return character.atributos?.[ATRIBUTOS_MAP[upperKey]] ?? 0;
    }

    // Tenta Perícia
    if (PERICIAS_MAP[upperKey]) {
      const perData = character.pericias?.[PERICIAS_MAP[upperKey]] ?? {
        treino: "destreinado",
        bonus: 0,
      };
      return TREINO_BONUS[perData.treino] + perData.bonus;
    }

    return "0";
  });
}

export default function InventarioTab({ character, onUpdateInventory }) {
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

  function updateQuantity(itemName, delta) {
    const novoInventario = character.inventario.map((item) => {
      if (item.nome === itemName) {
        const novaQtd = Math.max(0, (item.quantidade ?? 1) + delta);
        return { ...item, quantidade: novaQtd };
      }
      return item;
    });

    onUpdateInventory(novoInventario);
  }

  function QtdControl({ item }) {
    return (
      <div
        className="d-flex align-items-center gap-1"
        style={{
          backgroundColor: "#0f1220",
          borderRadius: "4px",
          padding: "2px 4px",
          border: "1px solid #2a2f3e",
        }}
      >
        <Button
          variant="link"
          size="sm"
          className="p-0 text-decoration-none shadow-none"
          style={{ color: "#ef4444", fontWeight: "bold", width: "20px" }}
          onClick={() => updateQuantity(item.nome, -1)}
        >
          -
        </Button>

        <Form.Control
          type="text"
          size="sm"
          value={item.quantidade ?? 1}
          onChange={(e) => {
            // Remove qualquer coisa que não seja número
            const val = e.target.value.replace(/\D/g, "");
            // Se o campo estiver vazio, mandamos 0 ou 1,
            // ou tratamos para não quebrar a lógica
            const num = val === "" ? 0 : parseInt(val);

            // Calculamos o delta para a função updateQuantity
            // delta = novo valor - valor atual
            const delta = num - (item.quantidade ?? 1);
            updateQuantity(item.nome, delta);
          }}
          style={{
            width: "35px",
            height: "24px",
            padding: "0",
            fontSize: "0.85rem",
            textAlign: "center",
            backgroundColor: "transparent",
            border: "none",
            color: "white",
            boxShadow: "none",
          }}
        />

        <Button
          variant="link"
          size="sm"
          className="p-0 text-decoration-none shadow-none"
          style={{ color: "#22c55e", fontWeight: "bold", width: "20px" }}
          onClick={() => updateQuantity(item.nome, 1)}
        >
          +
        </Button>
      </div>
    );
  }

  function ArmaCard({ item }) {
    const arma = item.arma;

    return (
      <Card
        style={{
          backgroundColor: "#1e2330",
          border: "1px solid #2a2f3e",
          overflow: "hidden",
        }}
      >
        <Card.Body>
          {/* Container Principal Flex */}
          <div style={{ display: "flex", gap: "1rem", alignItems: "start" }}>
            {/* Lado Esquerdo: Conteúdo */}
            <div style={{ flex: 1 }}>
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

              {/* MODIFICAÇÕES */}
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
                      <EspecialBadge
                        key={`esp-${item.nome}-${i}`}
                        especial={e}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div style={{ marginTop: "0.4rem" }}>{item.descricao}</div>
            </div>

            {/* Lado Direito: Imagem com Borda */}
            {item.imagem && (
              <div style={{ flexShrink: 0 }}>
                <img
                  src={item.imagem}
                  alt={item.nome}
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "contain",
                    backgroundColor: "#0f1220",
                    border: "2px solid #2a2f3e",
                    borderRadius: "8px",
                    padding: "4px",
                  }}
                />
              </div>
            )}
          </div>

          {/* Seção de Ataques e Danos (fora do flex principal para ocupar a largura total ou dentro, você escolhe) */}
          <div
            style={{
              marginTop: "1rem",
              borderTop: "1px solid #2a2f3e",
              paddingTop: "0.5rem",
            }}
          >
            {/* ATAQUES */}
            {arma.ataques?.length > 0 && (
              <div style={{ marginBottom: "0.6rem" }}>
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
                        marginTop: "0.2rem",
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
              <div>
                <strong>Danos</strong>
                <div className="d-flex flex-wrap gap-2 mt-1">
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
                        <RollTooltip
                          rolls={rolls[key]?.rolls ?? []}
                          rollType="soma"
                          bonus={rolls[key]?.bonus ?? 0}
                        >
                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={() => handleRoll(key, d.dados, "soma")}
                          >
                            {d.titulo}: {display}
                          </Button>
                        </RollTooltip>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
    );
  }

  function EquipamentoCard({ item }) {
    const keyTeste = `eqp-test-${item.nome}`;
    const keyDado = `eqp-dado-${item.nome}`;

    return (
      <Card style={{ backgroundColor: "#1e2330", border: "1px solid #2a2f3e" }}>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <strong>{item.nome}</strong>
              <div style={{ fontSize: "0.8rem", color: "#9aa0b3" }}>
                Peso: {item.peso} | Categoria: {toRoman(item.categoria)}
              </div>
            </div>
            <div className="d-flex align-items-center gap-2">
              {item.paranormal && <Badge bg="danger">Paranormal</Badge>}
              <QtdControl item={item} />
            </div>
          </div>

          <div style={{ marginTop: "0.4rem", fontSize: "0.9rem" }}>
            {item.descricao}
          </div>

          {item.efeito && (
            <div
              style={{
                marginTop: "0.5rem",
                color: "#8b5cf6",
                fontSize: "0.85rem",
                fontStyle: "italic",
              }}
            >
              <strong>Efeito:</strong> {item.efeito}
            </div>
          )}

          <div
            className="d-flex gap-2 mt-3 pt-2"
            style={{ borderTop: "1px solid #2a2f3e" }}
          >
            {item.teste && (
              <RollTooltip
                rolls={rolls[keyTeste]?.rolls ?? []}
                rollType="teste"
                bonus={rolls[keyTeste]?.bonus ?? 0}
              >
                <Button
                  size="sm"
                  variant="outline-info"
                  onClick={() => handleRoll(keyTeste, item.teste, "teste")}
                >
                  Teste: {formatExpression(item.teste, character)}
                </Button>
              </RollTooltip>
            )}

            {item.dado && (
              <RollTooltip
                rolls={rolls[keyDado]?.rolls ?? []}
                rollType="soma"
                bonus={rolls[keyDado]?.bonus ?? 0}
              >
                <Button
                  size="sm"
                  variant="outline-warning"
                  onClick={() => handleRoll(keyDado, item.dado, "soma")}
                >
                  Rolar: {formatExpression(item.dado, character)}
                </Button>
              </RollTooltip>
            )}
          </div>
        </Card.Body>
      </Card>
    );
  }

  function ItemCard({ item }) {
    return (
      <Card style={{ backgroundColor: "#1e2330", border: "1px solid #2a2f3e" }}>
        <Card.Body
          style={{ padding: "0.75rem 1rem" }}
          className="d-flex justify-content-between align-items-center"
        >
          <div>
            <strong style={{ color: "#e6e6e6" }}>{item.nome}</strong>
            <div style={{ fontSize: "0.8rem", color: "#9aa0b3" }}>
              {item.descricao}
            </div>
          </div>
          <QtdControl item={item} />
        </Card.Body>
      </Card>
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

        <Stack gap={3}>
          <CollapsibleSection title="Armas" count={armas.length}>
            {armas.map((i) => (
              <ArmaCard key={i.nome} item={i} />
            ))}
          </CollapsibleSection>

          <CollapsibleSection title="Equipamentos" count={equipamentos.length}>
            {equipamentos.map((i, idx) => (
              <EquipamentoCard key={idx} item={i} />
            ))}
          </CollapsibleSection>

          <CollapsibleSection title="Itens e Pistas" count={itens.length}>
            {itens.map((i, idx) => (
              <ItemCard key={idx} item={i} />
            ))}
          </CollapsibleSection>
        </Stack>
      </Card.Body>
    </Card>
  );
}
