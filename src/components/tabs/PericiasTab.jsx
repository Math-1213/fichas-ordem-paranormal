import { useState } from "react";
import { Card, Row, Col, Badge } from "react-bootstrap";
import Dice from "../../models/Dice";
import RollTooltip from "../ui/RollTooltip";
import {
  PERICIAS,
  TREINO_BONUS,
  TREINO_LABELS,
  TREINO_COLORS,
} from "../../configs/skills";

/**
 * Aba de Perícias do Personagem.
 * Lista todas as perícias do sistema, cruzando os dados de treinamento do personagem
 * com os atributos base e bônus de itens.
 * * @component
 * @param {Object} props
 * @param {Character} props.character - Instância do personagem para buscar atributos e bônus.
 */
export default function PericiasTab({ character }) {
  // Dados de treino e bônus específicos deste personagem
  const pericias = character.pericias;

  // Estados para gerenciar a exibição do resultado do dado no Tooltip
  const [lastRoll, setLastRoll] = useState(null);
  const [active, setActive] = useState(null);

  /**
   * Realiza o teste de perícia.
   * Lógica: Quantidade de dados = Atributo Base. Bônus Final = Treino + Bônus de Item.
   * * @param {string} nome - ID da perícia (ex: "luta", "ocultismo").
   */
  function handleRoll(nome) {
    const config = PERICIAS[nome];
    const data = pericias[nome] ?? { treino: "destreinado", bonus: 0 };

    // Valor fixo somado ao dado (Ex: Treinado +5, Especialista +10)
    const treinoBonus = TREINO_BONUS[data.treino] ?? 0;

    // Busca o valor do atributo vinculado (Ex: Luta usa FORÇA)
    const atributoValor = character.getAtributo(config.atributo);

    const roll = Dice.roll(
      "d20",
      atributoValor,
      "teste",
      treinoBonus + data.bonus,
      0
    );

    setLastRoll(roll);
    setActive(nome);
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card
        style={{
          backgroundColor: "#161a22",
          border: "1px solid #2a2f3e",
          width: "75%",
          marginBottom: "20px",
        }}
      >
        <Card.Header
          style={{
            backgroundColor: "#1e2330",
            borderBottom: "1px solid #2a2f3e",
            fontWeight: 600,
          }}
        >
          Perícias
        </Card.Header>

        <Card.Body style={{ padding: "0.75rem" }}>
          {/* Cabeçalho das Colunas - Apenas Visual */}
          <Row
            style={{
              padding: "0.35rem 0.5rem",
              marginBottom: "0.5rem",
              borderBottom: "1px solid #2a2f3e",
              fontSize: "0.75rem",
              color: "#9aa0b3",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            <Col md={4}>Perícia</Col>
            <Col md={2}>Atributo</Col>
            <Col md={2}>Treino</Col>
            <Col md={2}>Bônus</Col>
            <Col
              md={2}
              style={{ color: "#8b5cf6", fontWeight: 700, textAlign: "right" }}
            >
              Total
            </Col>
          </Row>

          {/* Mapeia a lista GLOBAL de perícias do sistema */}
          {Object.keys(PERICIAS).map((nome) => {
            const config = PERICIAS[nome];
            const data = pericias[nome] ?? { treino: "destreinado", bonus: 0 };

            const treinoBonus = TREINO_BONUS[data.treino] ?? 0;
            const totalBonus = treinoBonus + data.bonus;
            const isActive = active === nome;

            return (
              <RollTooltip
                key={nome}
                rolls={isActive ? [lastRoll] : null}
                rollType="teste"
                critico={20}
                bonus={totalBonus}
              >
                <Row
                  onClick={() => handleRoll(nome)}
                  className="align-items-center"
                  style={{
                    padding: "0.5rem",
                    cursor: "pointer",
                    opacity: 1,
                    backgroundColor: isActive ? "#1e2330" : "transparent",
                    borderRadius: "6px",
                    marginBottom: "0.3rem",
                    height: "60px",
                    transition: "all 0.2s",
                  }}
                >
                  {/* Nome da Perícia e Indicadores (Badges) */}
                  <Col md={4}>
                    <div style={{ fontWeight: 500 }}>
                      {config.label}
                      {data.type && (
                        <Badge bg="success" className="ms-2">
                          {data.type}
                        </Badge>
                      )}
                    </div>

                    <div style={{ marginTop: "0.15rem" }}>
                      {/* Badge "Somente Treinada": Avisa que o teste é impossível se destreinado */}
                      {config.somenteTreinada && (
                        <Badge
                          bg="danger"
                          className="me-1"
                          style={{ fontSize: "0.6rem" }}
                        >
                          Somente Treinada
                        </Badge>
                      )}
                      {/* Badge "Kit": Indica necessidade de item específico para evitar penalidade */}
                      {config.kit && (
                        <Badge
                          bg="warning"
                          className="me-1"
                          style={{ fontSize: "0.6rem" }}
                        >
                          Kit
                        </Badge>
                      )}
                      {/* Badge "Carga": Indica que penalidade de carga afeta esta perícia */}
                      {config.carga && (
                        <Badge bg="secondary" style={{ fontSize: "0.6rem" }}>
                          Carga
                        </Badge>
                      )}
                    </div>
                  </Col>

                  {/* Sigla do Atributo Base (FOR, AGI, etc) */}
                  <Col md={2} style={{ color: "#9aa0b3", fontSize: "0.8rem" }}>
                    {config.atributo.toUpperCase()}
                  </Col>

                  {/* Nível de Treinamento (Badges Coloridas) */}
                  <Col md={2}>
                    <Badge
                      bg={TREINO_COLORS[data.treino] ?? "secondary"}
                      style={{ fontSize: "0.7rem", fontWeight: 600 }}
                    >
                      {TREINO_LABELS[data.treino]}
                    </Badge>
                  </Col>

                  {/* Bônus Numérico Adicional (Itens/Poderes) */}
                  <Col md={2} style={{ color: "#9aa0b3", fontSize: "0.85rem" }}>
                    Extra: {data.bonus >= 0 ? `+${data.bonus}` : data.bonus}
                  </Col>

                  {/* Bônus Total (Soma de Treino + Extra) */}
                  <Col
                    md={2}
                    style={{
                      color: "#8b5cf6",
                      fontWeight: 700,
                      textAlign: "right",
                    }}
                  >
                    +{totalBonus}
                  </Col>
                </Row>
              </RollTooltip>
            );
          })}
        </Card.Body>
      </Card>
    </div>
  );
}
