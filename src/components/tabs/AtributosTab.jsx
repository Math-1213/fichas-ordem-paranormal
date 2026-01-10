import { useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import Dice from "../../models/Dice";
import RollTooltip from "../ui/RollTooltip";

/**
 * Mapeamento para exibição amigável dos nomes dos atributos técnicos.
 * @constant
 */
const ATRIBUTOS_LABELS = {
  forca: "Força",
  agilidade: "Agilidade",
  intelecto: "Intelecto",
  presenca: "Presença",
  vigor: "Vigor",
};

/**
 * Aba de Atributos do Personagem.
 * Permite visualizar os valores base e realizar rolagens rápidas clicando no atributo.
 * * @component
 * @param {Object} props
 * @param {Character} props.character - Instância do personagem atual.
 */
export default function AtributosTab({ character }) {
  const atributos = character.atributos;
  const [lastRoll, setLastRoll] = useState(null);
  const [activeAttr, setActiveAttr] = useState(null);

  /**
   * Executa a lógica de rolagem de um atributo.
   * Ordem Paranormal: Rola-se uma quantidade de d20 igual ao valor do atributo
   * e seleciona-se o maior valor (tipo "teste").
   * * @param {string} nome - Identificador interno do atributo (ex: "forca").
   * @param {number} valor - Valor numérico do atributo (quantidade de dados).
   */
  function handleRoll(nome, valor) {
    const roll = Dice.roll("d20", valor, "teste", 0, 0);
    setLastRoll(roll);
    setActiveAttr(nome);
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card
        style={{
          backgroundColor: "#161a22",
          border: "1px solid #2a2f3e",
          maxWidth: "420px",
          width: "100%",
        }}
      >
        <Card.Header
          style={{
            backgroundColor: "#1e2330",
            borderBottom: "1px solid #2a2f3e",
            fontWeight: 600,
          }}
        >
          Atributos
        </Card.Header>

        <Card.Body style={{ padding: "0.75rem" }}>
          {Object.entries(atributos).map(([nome, valor]) => {
            const isActive = activeAttr === nome;

            return (
              <RollTooltip
                key={nome}
                rolls={isActive ? [lastRoll] : null}
                rollType="teste"
                critico={20}
                bonus={0}
              >
                <Row
                  onClick={() => handleRoll(nome, valor)}
                  style={{
                    padding: "0.45rem 0.5rem",
                    cursor: "pointer",
                    borderRadius: "6px",
                    marginBottom: "0.25rem",
                    backgroundColor: isActive ? "#1e2330" : "transparent",
                    transition: "background-color 0.15s ease",
                  }}
                  className="align-items-center"
                >
                  <Col style={{ color: "#9aa0b3", fontSize: "0.85rem" }}>
                    {ATRIBUTOS_LABELS[nome]}
                  </Col>

                  <Col
                    xs="auto"
                    style={{
                      color: "#8b5cf6",
                      fontWeight: 700,
                      fontSize: "1rem",
                    }}
                  >
                    {valor}
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
