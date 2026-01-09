import { Card, Stack, Badge, Alert, Button } from "react-bootstrap";
import { useState } from "react";
import Dice from "../../models/Dice";
import RollTooltip from "../ui/RollTooltip";
import { ATRIBUTOS_MAP, PERICIAS_MAP } from "../../configs/dice";
import { TREINO_BONUS } from "../../configs/skills";

function resolveTeste({ atributo, pericias }, character) {
  const attrKey = atributo.toUpperCase();
  const perKey = pericias.toUpperCase();

  const attrName = ATRIBUTOS_MAP[attrKey];
  const perName = PERICIAS_MAP[perKey];

  const attrValue = character.atributos?.[attrName] ?? 0;
  const perData = character.pericias?.[perName] ?? { treino: 0, bonus: 0 };

  const skillValue = TREINO_BONUS[perData.treino] + perData.bonus;

  return {
    expression: `/${attrKey}/d20 + /${perKey}/`,
    display: `${attrValue}d20 + ${skillValue}`,
  };
}

function calcPeso(item) {
  const qtd = item.quantidade ?? 1;
  return item.peso * qtd;
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

  function ItemCard({ item }) {
    return (
      <Card style={{ backgroundColor: "#1e2330", border: "1px solid #2a2f3e" }}>
        <Card.Body>
          <div className="d-flex justify-content-between">
            <strong>{item.nome}</strong>
            <div>
              {item.paranormal && (
                <Badge bg="danger" className="me-1">
                  Paranormal
                </Badge>
              )}
              <Badge bg="secondary">Cat. {item.categoria}</Badge>
            </div>
          </div>

          <div style={{ fontSize: "0.85rem", color: "#9aa0b3" }}>
            Peso: {item.peso}
            {item.quantidade != null && ` × ${item.quantidade}`}
          </div>

          <div style={{ marginTop: "0.4rem", whiteSpace: "pre-wrap" }}>
            {item.descricao}
          </div>

          {item.efeito && (
            <div style={{ marginTop: "0.4rem", color: "#c7d2fe" }}>
              {item.efeito}
            </div>
          )}
        </Card.Body>
      </Card>
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
            Crítico: ≥ {arma.critico} | Peso: {item.peso}
          </div>

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
                    <span style={{ color: "#9aa0b3" }}>{display}</span>
                    <RollTooltip
                      roll={rolls.rolls}
                      rollType="teste"
                      critico={arma.critico}
                      bonus={rolls?.bonus ?? 0}
                    >
                      <Button
                        size="sm"
                        variant="outline-light"
                        onClick={() => handleRoll(key, expression, "teste")}
                      >
                        Testar
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
                    • <strong>{d.titulo}</strong>
                    <RollTooltip
                      roll={rolls[key]}
                      rollType="soma"
                      bonus={rolls[key]?.baseBonus ?? 0}
                    >
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => handleRoll(key, d.dados, "soma")}
                      >
                        Dano
                      </Button>
                    </RollTooltip>
                  </div>
                );
              })}
            </div>
          )}

          {/* ESPECIAIS */}
          {arma.especiais?.length > 0 && (
            <div style={{ marginTop: "0.6rem" }}>
              <strong>Especiais</strong>
              {arma.especiais.map((e, i) => (
                <div key={i} style={{ fontSize: "0.85rem" }}>
                  • {e.descricao}{" "}
                  {e.paranormal && <Badge bg="danger">Paranormal</Badge>}
                </div>
              ))}
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

          <Section title="Equipamentos">
            {equipamentos.map((i) => (
              <ItemCard key={i.nome} item={i} />
            ))}
          </Section>

          <Section title="Itens">
            {itens.map((i) => (
              <ItemCard key={i.nome} item={i} />
            ))}
          </Section>
        </Stack>
      </Card.Body>
    </Card>
  );
}
