import {
  Card,
  Stack,
  Badge,
  Button,
  Accordion,
  ProgressBar,
  Alert,
} from "react-bootstrap";
import { useState } from "react";
import styled from "styled-components";
import RollTooltip from "../ui/RollTooltip";
import { handleRoll, formatExpression } from "../../configs/dice";

const RitualCard = styled(Card)`
  border: 1px solid ${(props) => props.borderColor || "#2a2f3e"};
  background: linear-gradient(145deg, #1e2330 0%, #161a22 100%);

  .ritual-header {
    background: rgba(0, 0, 0, 0.2);
    border-bottom: 1px solid #2a2f3e;
  }
`;

const ELEMENTOS_CORES = {
  SANGUE: "#ef4444",
  MORTE: "#7c3aed",
  ENERGIA: "#3b82f6",
  CONHECIMENTO: "#eab308",
  MEDO: "#9ca3af",
};

/**
 * Aba de Habilidades e Rituais.
 * Gerencia o uso de recursos (PE) e execução de efeitos.
 */
export default function HabilidadesTab({ character, onUpdateResources }) {
  const { habilidades = [], rituais = [] } = character;
  const peAtual = character.recursos?.pe ?? 0;

  const [rolls, setRolls] = useState({});

  /**
   * Tenta subtrair o custo de PE do personagem.
   */
  function gastarRecurso(custo) {
    if (peAtual < custo) {
      alert("Pontos de Esforço insuficientes!");
      return false;
    }
    onUpdateResources({ ...character.recursos, pe: peAtual - custo });
    return true;
  }

  /**
   * Card para Habilidades de Classe ou Poderes.
   */
  function HabilidadeCard({ hab }) {
    const key = `hab-${hab.nome}`;
    return (
      <Card className="bg-dark border-secondary mb-2">
        <Card.Body className="p-3">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h6 className="mb-0">{hab.nome}</h6>
              <small className="text-muted">
                {hab.origem} | Custo: {hab.custo} PE
              </small>
            </div>
            <Button
              size="sm"
              variant="outline-primary"
              disabled={peAtual < hab.custo}
              onClick={() => gastarRecurso(hab.custo)}
            >
              Usar
            </Button>
          </div>
          <p className="mt-2 mb-0" style={{ fontSize: "0.9rem" }}>
            {hab.descricao}
          </p>
        </Card.Body>
      </Card>
    );
  }

  /**
   * Card estilizado para Rituais.
   */
  function RitualItem({ ritual }) {
    const cor = ELEMENTOS_CORES[ritual.elemento.toUpperCase()] || "#2a2f3e";
    const keyDano = `rit-dmg-${ritual.nome}`;

    return (
      <RitualCard borderColor={cor} className="mb-3">
        <div className="ritual-header p-2 d-flex justify-content-between align-items-center">
          <strong style={{ color: cor }}>{ritual.nome}</strong>
          <Badge style={{ backgroundColor: cor }}>
            {ritual.circulo}º Círculo
          </Badge>
        </div>
        <Card.Body className="p-3">
          <div
            className="row g-2 mb-2 text-center"
            style={{ fontSize: "0.8rem" }}
          >
            <div className="col-4 border-end">Execução: {ritual.execucao}</div>
            <div className="col-4 border-end">Alcance: {ritual.alcance}</div>
            <div className="col-4">Duração: {ritual.duracao}</div>
          </div>

          <p style={{ fontSize: "0.85rem" }}>{ritual.descricao}</p>

          <div className="d-flex gap-2 flex-wrap mt-3 pt-2 border-top border-secondary">
            {/* Botão de Gasto de PE */}
            <Button
              size="sm"
              variant="dark"
              className="border-secondary"
              onClick={() => gastarRecurso(ritual.custo)}
            >
              Conjurar ({ritual.custo} PE)
            </Button>

            {/* Rolagem de Dano/Efeito do Ritual */}
            {ritual.dano && (
              <RollTooltip
                rolls={rolls[keyDano]?.rolls ?? []}
                rollType="soma"
                bonus={rolls[keyDano]?.bonus ?? 0}
              >
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() =>
                    handleRoll(
                      keyDano,
                      ritual.dano,
                      "soma",
                      setRolls,
                      character
                    )
                  }
                >
                  Dano: {formatExpression(ritual.dano, character)}
                </Button>
              </RollTooltip>
            )}
          </div>
        </Card.Body>
      </RitualCard>
    );
  }

  return (
    <Stack gap={3}>
      {/* Resumo de PE para referência rápida */}
      <Card className="bg-dark text-white border-primary">
        <Card.Body className="p-2">
          <div className="d-flex justify-content-between mb-1 px-1">
            <small>Energia Restante (PE)</small>
            <small>
              {peAtual} / {character.infos.peMax}
            </small>
          </div>
          <ProgressBar
            now={(peAtual / character.infos.peMax) * 100}
            variant={peAtual < 5 ? "danger" : "primary"}
            style={{ height: "8px" }}
          />
        </Card.Body>
      </Card>

      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0" className="bg-transparent border-0">
          <Accordion.Header>Habilidades e Poderes</Accordion.Header>
          <Accordion.Body className="px-0">
            {habilidades.length > 0 ? (
              habilidades.map((h, i) => <HabilidadeCard key={i} hab={h} />)
            ) : (
              <p className="text-muted text-center">
                Nenhuma habilidade listada.
              </p>
            )}
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1" className="bg-transparent border-0 mt-2">
          <Accordion.Header>Grimório de Rituais</Accordion.Header>
          <Accordion.Body className="px-0">
            {rituais.length > 0 ? (
              rituais.map((r, i) => <RitualItem key={i} ritual={r} />)
            ) : (
              <p className="text-muted text-center">
                O personagem não conhece rituais.
              </p>
            )}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Stack>
  );
}
