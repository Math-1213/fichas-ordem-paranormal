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
import { formatExpression, handleRoll } from "../../configs/dice";

const WideTooltip = styled(Tooltip)`
  .tooltip-inner {
    width: 40vw;
    max-width: 500px;
    min-width: 320px;
    white-space: normal;
    text-align: left;
  }
`;

/**
 * Resolve a lógica de um teste de perícia baseado em chaves de tradução.
 * @param {Object} config - Objeto contendo { atributo, pericias, bonus }.
 * @param {Character} character - Instância do personagem.
 * @returns {Object} { expression: string, display: string }
 */
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

/**
 * Calcula o peso total de um item considerando sua pilha.
 * * @param {Object} item - Objeto do item do inventário.
 * @param {number} item.peso - Peso unitário do item.
 * @param {number} [item.quantidade=1] - Quantidade atual do item (fallback: 1).
 * @returns {number} O peso total ocupado pelo item (Peso * Quantidade).
 * * @example
 * // Retorna 2 (item de peso 1 com quantidade 2)
 * calcPeso({ peso: 1, quantidade: 2 });
 */
function calcPeso(item) {
  const qtd = item.quantidade ?? 1;
  return item.peso * qtd;
}

/**
 * Interpreta e formata expressões de dano dinâmicas para exibição.
 * * A função utiliza Regex para encontrar referências a atributos (ex: /FOR/) e multiplicadores
 * (ex: 2* /AGI/) dentro de uma string de dados, substituindo-os pelos valores reais do personagem
 * e somando bônus numéricos fixos.
 * * @param {Object} damage - Objeto contendo os dados do dano.
 * @param {string} damage.dados - Expressão original (ex: "1d10 + 2* /FOR/ + 5").
 * @param {Object} character - Instância do personagem que fornece os atributos.
 * @returns {string} String formatada para o jogador (ex: "1d10 + 11").
 * * @logic
 * 1. Extrai o prefixo de dados (ex: "2d6").
 * 2. Processa multiplicadores e atributos via regex: `/([+-]?)(\d*)\*?\/([A-Z]{3})\//g`.
 * 3. Limpa a string para somar valores numéricos residuais.
 * 4. Retorna a combinação final consolidada.
 */
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

/**
 * Seção retrátil para organização de listas.
 * @param {string} title - Título da seção.
 * @param {number} count - Quantidade de itens na seção.
 * @param {ReactNode} children - Conteúdo a ser exibido.
 */
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

/**
 * Aba de Gerenciamento de Inventario.
 * Mostra as armas, equipamentos, itens. Permite a execução de testes automaticos.
 * * @component
 * @param {Object} props
 * @param {Character} props.character - Instância do personagem para cálculo de perícias e resistências.
 */
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

  /**
   * Exibe uma Badge informativa com Tooltip para propriedades especiais de itens.
   * * @component
   * @param {Object} especial - Objeto contendo { nome, descricao, paranormal }.
   * * @visual
   * - Vermelho (danger): Se a propriedade for 'paranormal' (ex: Itens Amaldiçoados).
   * - Cinza (secondary): Para propriedades mundanas ou técnicas.
   * - Tooltip largo: Garante legibilidade para descrições longas de regras.
   */
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

  /**
   * Gerencia a atualização da quantidade de um item no inventário.
   * * @param {string} itemName - Nome/ID do item a ser alterado.
   * @param {number} delta - Valor a ser somado ou subtraído (ex: +1 ou -1).
   * * @logic
   * Mapeia o inventário atual e gera uma nova lista imutável. Garante que a quantidade
   * nunca seja inferior a 0. Ao final, chama `onUpdateInventory` para persistir os dados.
   */
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

  /**
   * Widget de controle numérico para o inventário.
   * * @component
   * @param {Object} item - O item que terá sua quantidade controlada.
   * * @features
   * - Botão de decremento (-) em vermelho.
   * - Input centralizado com sanitização de Regex (permite apenas dígitos).
   * - Botão de incremento (+) em verde.
   * - Lógica de 'delta' no `onChange` para reaproveitar a função `updateQuantity`.
   */
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

  /**
   * Card especializado para exibição e interação com Armas.
   * * @param {Object} item - O objeto do item que contém a propriedade 'arma'.
   * @param {Object} item.arma - Detalhes técnicos (tipo, critico, ataques, danos).
   * * @features
   * - Cabeçalho dinâmico com tipo de arma e selo 'Paranormal'.
   * - Listagem de modificações usando 'EspecialBadge'.
   * - Integração com 'RollTooltip' para exibir resultados de dados anteriores.
   * - Suporte a múltiplos ataques (ex: Ataque Padrão vs Ataque Furtivo) e múltiplos tipos de dano.
   */
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
                          onClick={() =>
                            handleRoll(
                              key,
                              expression,
                              "teste",
                              setRolls,
                              character
                            )
                          }
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
                            onClick={() =>
                              handleRoll(
                                key,
                                d.dados,
                                "soma",
                                setRolls,
                                character
                              )
                            }
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

  /**
   * Card para itens de inventário que possuem mecânicas de uso ou efeitos passivos.
   * * @features
   * - Controle de quantidade integrado (QtdControl).
   * - Exibição de 'Efeito' com estilo destacado (itálico e cor roxa).
   * - Botões de ação dinâmica: substitui chaves como /INT/ por valores reais
   * no texto do botão usando 'formatExpression'.
   * - Suporte a testes (d20) e rolagens de dados genéricos (soma).
   */
  function EquipamentoCard({ item }) {
    const keyTeste = `eqp-test-${item.nome}`;
    const keyDado = `eqp-dado-${item.nome}`;

    return (
      <Card style={{ backgroundColor: "#1e2330", border: "1px solid #2a2f3e" }}>
        <Card.Body>
          <div className="d-flex gap-3">
            {/* Lado Esquerdo: Imagem (se existir) */}
            {item.imagem && (
              <div style={{ flexShrink: 0 }}>
                <img
                  src={item.imagem}
                  alt={item.nome}
                  style={{
                    width: "64px",
                    height: "64px",
                    objectFit: "contain",
                    borderRadius: "4px",
                    backgroundColor: "rgba(0,0,0,0.2)",
                    padding: "2px",
                  }}
                />
              </div>
            )}

            {/* Lado Direito: Conteúdo principal */}
            <div className="flex-grow-1">
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

              {/* Badges de Modificações/Maldições */}
              {item.especiais?.length > 0 && (
                <div style={{ marginTop: "0.6rem" }}>
                  <div
                    style={{
                      display: "flex",
                      gap: "0.4rem",
                      flexWrap: "wrap",
                      marginTop: "0.3rem",
                    }}
                  >
                    {item.especiais.map((e, i) => (
                      <EspecialBadge
                        key={`esp-${item.nome}-${i}`}
                        especial={e}
                      />
                    ))}
                  </div>
                </div>
              )}

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
            </div>
          </div>

          {/* Rodapé: Botões de Rolagem */}
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
                  onClick={() =>
                    handleRoll(
                      keyTeste,
                      item.teste,
                      "teste",
                      setRolls,
                      character
                    )
                  }
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
                  onClick={() =>
                    handleRoll(keyDado, item.dado, "soma", setRolls, character)
                  }
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

  /**
   * Card simplificado para itens comuns de inventário.
   * * @description
   * Focado em economia de espaço vertical, exibe apenas nome, descrição curta
   * e o seletor de quantidade. Ideal para itens que não possuem mecânicas de dado.
   */
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
            {armas
              .sort((a, b) => a.nome.localeCompare(b.nome))
              .map((i) => (
                <ArmaCard key={i.nome} item={i} />
              ))}
          </CollapsibleSection>

          <CollapsibleSection title="Equipamentos" count={equipamentos.length}>
            {equipamentos
              .sort((a, b) => a.nome.localeCompare(b.nome))
              .map((i, idx) => (
                <EquipamentoCard key={idx} item={i} />
              ))}
          </CollapsibleSection>

          <CollapsibleSection title="Itens e Pistas" count={itens.length}>
            {itens
              .sort((a, b) => a.nome.localeCompare(b.nome))
              .map((i, idx) => (
                <ItemCard key={idx} item={i} />
              ))}
          </CollapsibleSection>
        </Stack>
      </Card.Body>
    </Card>
  );
}
