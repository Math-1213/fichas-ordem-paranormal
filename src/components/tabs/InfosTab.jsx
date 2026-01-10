import { useEffect } from "react";
import { Card, Row, Col, Accordion } from "react-bootstrap";

/**
 * Aba de Informações Gerais do Personagem.
 * Exibe dados biográficos, técnicos de Ordem Paranormal e a narrativa (história/aparência).
 * * @component
 * @param {Object} props
 * @param {Character} props.character - Instância da classe Character contendo os métodos e dados.
 */
export default function InfosTab({ character }) {
  const { infos } = character;
  const { narrativa } = infos;

  useEffect(() => {
    console.log(infos);
  }, []);

  const labelStyle = {
    color: "#9aa0b3",
    fontSize: "0.85rem",
    fontWeight: 500,
  };

  const valueStyle = {
    fontSize: "1rem",
  };

  const sectionStyle = {
    borderBottom: "1px solid #2a2f3e",
    paddingBottom: "0.75rem",
    marginBottom: "0.75rem",
  };

  const accordionBodyStyle = {
    whiteSpace: "pre-line",
    lineHeight: 1.6,
    color: "#e6e6e6",
    fontSize: "0.95rem",
  };

  const accordionHeaderStyle = `
    .accordion-button {
    background-color: #1e2330;
    color: #8b5cf6;
    font-weight: 600;
    }

    .accordion-button:not(.collapsed) {
    background-color: #1e2330;
    color: #8b5cf6;
    box-shadow: none;
    }

    .accordion-body {
    background-color: #161a22;
    border-top: 1px solid #2a2f3e;
    }

    .accordion-item {
    background-color: transparent;
    border: 1px solid #2a2f3e;
    margin-bottom: 0.5rem;
    }
`;

  /**
   * Sub-componente interno para renderizar pares de Label/Valor.
   * @param {string} label - Título do dado (ex: "Classe")
   * @param {any} value - Valor a ser exibido
   * @param {number} [md=4] - Largura da coluna no grid Bootstrap (1-12)
   * @returns {JSX.Element|null} Retorna null se o valor for vazio para economizar espaço.
   */
  function InfoItem({ label, value, md = 4 }) {
    if (value === undefined || value === null || value === "") return null;

    return (
      <Col md={md}>
        <div style={labelStyle}>{label}</div>
        <div style={valueStyle}>{value}</div>
      </Col>
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
        Informações do Investigador
      </Card.Header>

      <Card.Body>
        {/* TOPO */}
        <Row className="text-center" style={sectionStyle}>
          <Col>
            <div
              style={{ color: "#8b5cf6", fontSize: "1.4rem", fontWeight: 700 }}
            >
              {infos.nome}
            </div>
            <div style={{ fontSize: "0.85rem", color: "#9aa0b3" }}>
              {infos.idade} anos • Jogador: {infos.jogador}
            </div>
          </Col>
        </Row>

        {/* CLASSE / TRILHA / Patente */}
        <Row style={sectionStyle}>
          <InfoItem label="Classe" value={infos.classe} />
          <InfoItem label="Trilha" value={infos.trilha} />
          <InfoItem label="Patente" value={infos.patente} />
        </Row>

        {/* ORIGEM / NEX / NÍVEL */}
        <Row style={sectionStyle}>
          <InfoItem label="Origem" value={infos.origem} />
          <InfoItem
            label="NEX"
            value={infos.nex != null ? `${infos.nex}%` : null}
          />
          <InfoItem
            label="Nível"
            value={infos.nivel != null ? `${infos.nivel}/20` : null}
          />
        </Row>

        {/* PE / AFINIDADE */}
        <Row style={sectionStyle}>
          <InfoItem label="PE / Rodada" value={infos.peRodada} md={6} />
          <InfoItem label="Afinidade" value={infos.afinidade} md={6} />
        </Row>

        {/* DESLOCAMENTO */}
        <Row style={sectionStyle}>
          <InfoItem
            label="Deslocamento"
            value={
              infos.deslocamento != null
                ? `${character.getDeslocamentoQuadrados(infos.deslocamento)} □`
                : null
            }
            md={6}
          />

          <InfoItem
            label="Deslocamento (m)"
            value={
              infos.deslocamento != null ? `${infos.deslocamento} metros` : null
            }
            md={6}
          />
        </Row>

        {/* NACIONALIDADE */}
        <Row>
          <InfoItem label="Nacionalidade" value={infos.nacionalidade} md={12} />
        </Row>
      </Card.Body>

      <Card.Body>
        <style>{accordionHeaderStyle}</style>
        <Accordion alwaysOpen={false}>
          {narrativa?.aparencia && (
            <Accordion.Item eventKey="0">
              <Accordion.Header>Aparência</Accordion.Header>
              <Accordion.Body style={accordionBodyStyle}>
                {narrativa.aparencia}
              </Accordion.Body>
            </Accordion.Item>
          )}

          {narrativa?.historia && (
            <Accordion.Item eventKey="1">
              <Accordion.Header>História</Accordion.Header>
              <Accordion.Body style={accordionBodyStyle}>
                {narrativa.historia}
              </Accordion.Body>
            </Accordion.Item>
          )}

          {narrativa?.primeiroEncontro && (
            <Accordion.Item eventKey="2">
              <Accordion.Header>Primeiro Encontro Paranormal</Accordion.Header>
              <Accordion.Body style={accordionBodyStyle}>
                {narrativa.primeiroEncontro}
              </Accordion.Body>
            </Accordion.Item>
          )}

          {narrativa?.fobias && (
            <Accordion.Item eventKey="3">
              <Accordion.Header>Doenças, Fobias e Manias</Accordion.Header>
              <Accordion.Body style={accordionBodyStyle}>
                {narrativa.fobias}
              </Accordion.Body>
            </Accordion.Item>
          )}

          {narrativa?.personalidade && (
            <Accordion.Item eventKey="4">
              <Accordion.Header>Personalidade</Accordion.Header>
              <Accordion.Body style={accordionBodyStyle}>
                {narrativa.personalidade}
              </Accordion.Body>
            </Accordion.Item>
          )}

          {narrativa?.piorPesadelo && (
            <Accordion.Item eventKey="5">
              <Accordion.Header>Pior Pesadelo</Accordion.Header>
              <Accordion.Body style={accordionBodyStyle}>
                {narrativa.piorPesadelo}
              </Accordion.Body>
            </Accordion.Item>
          )}
        </Accordion>
      </Card.Body>
    </Card>
  );
}
