import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Tabs,
  Tab,
  Row,
  Col,
  Alert,
  Spinner,
  Form,
  Badge,
} from "react-bootstrap";
import {
  Zap,
  Heart,
  Brain,
  ZapOff,
  ShieldAlert,
  ChevronUp,
  ChevronDown,
  Dna,
  BookOpen,
} from "lucide-react";

// Importações dos seus arquivos de configuração
import { ELEMENT_DATA, ELEMENTS } from "../../../configs/paranormal";
import { statusParams, trails } from "../../../models/Rules";
import { CharacterService } from "../../../data/characters_service";

export default function LevelUpModal({ show, onHide, charId }) {
  const [activeTab, setActiveTab] = useState("nivel");
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    async function getChar() {
      if (!charId) return;

      try {
        const char = await CharacterService.getById(charId);
        if (char && char.data) {
          setCharacter(char.data);
        }
      } catch (err) {
        console.error("Erro ao carregar dados do agente:", err);
      }
    }

    getChar();
  }, [charId]);

  if (!character && show) {
    return (
      <Modal
        show={show}
        onHide={onHide}
        centered
        contentClassName="bg-black border-danger"
      >
        <Modal.Body className="text-center p-5">
          <Spinner animation="border" variant="danger" />
          <p className="text-white mt-3 tiny-label">
            SINCRONIZANDO DADOS DO AGENTE...
          </p>
        </Modal.Body>
      </Modal>
    );
  }

  // --- MOTOR DE REGRAS ---
  const calculateStat = (formula, level, attributes) => {
    if (!formula) return 0;
    let expression = formula
      .replace(/\/LEVEL\//g, level)
      .replace(/\/VIG\//g, attributes.vigor)
      .replace(/\/PRE\//g, attributes.presenca)
      .replace(/\/INT\//g, attributes.intelecto);

    // Resolve a string matemática simples
    try {
      // eslint-disable-next-line no-eval
      return eval(expression.replace(/[a-zA-Z]/g, ""));
    } catch (e) {
      return 0;
    }
  };

  const handleEvolution = (field, delta) => {
    const updated = { ...character };
    console.log(updated);
    const { classe } = updated.infos;
    const rules = statusParams[classe];

    if (field === "nivel") {
      const newLevel = updated.infos.nivel + delta;
      if (newLevel < 1) return;

      updated.infos.nivel = newLevel;
      updated.infos.dtRitual += delta; // Regra: +1 por nível

      // Recalcular Status Máximos baseados nas fórmulas do Rules.js
      updated.status.vidaMax = calculateStat(
        rules.vida.calc,
        newLevel,
        updated.atributos,
      );
      updated.status.sanidadeMax = calculateStat(
        rules.sanidade.calc,
        newLevel,
        updated.atributos,
      );
      updated.status.esforcoMax = calculateStat(
        rules.esforco.calc,
        newLevel,
        updated.atributos,
      );
    }

    if (field === "nex") {
      updated.infos.nex = Math.max(0, updated.infos.nex + delta * 5);
    }

    setCharacter(updated);
  };

  // --- LÓGICA DE TRILHA ---
  const getProximaHabilidade = () => {
    if (!character) return null;
    const { classe, trilha, nex } = character.infos;
    const trilhaData = trails[classe]?.find((t) => t.name === trilha);
    if (!trilhaData) return null;

    // Acha a maior habilidade liberada pelo NEX atual
    const nexTresholds = [99, 65, 40, 10];
    const currentTreshold = nexTresholds.find((t) => nex >= t);

    return currentTreshold ? trilhaData.powers[`nex${currentTreshold}`] : null;
  };

  const habilidadeAtual = getProximaHabilidade();

  return (
    <>
      {character && (
        <Modal
          show={show}
          onHide={onHide}
          size="lg"
          centered
          contentClassName="ordo-evolution-modal"
        >
          <Modal.Header className="bg-black border-danger text-white py-2">
            <Modal.Title className="small fw-bold d-flex align-items-center">
              <Dna size={18} className="text-danger me-2" />
              NEXUS-REWRITE:{" "}
              <span className="text-danger ms-2">
                {character.infos.nome.toUpperCase()}
              </span>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body className="bg-black text-white p-0">
            <Tabs
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k)}
              className="ordo-tabs-nav"
            >
              <Tab eventKey="nivel" title="1. BIOMETRIA">
                <div className="p-4">
                  <Row>
                    <Col md={6}>
                      <div className="evolution-control-card mb-4">
                        <label className="tiny-label text-danger">
                          NÍVEL OPERACIONAL
                        </label>
                        <div className="d-flex align-items-center justify-content-between bg-dark p-2 border border-secondary">
                          <Button
                            variant="dark"
                            onClick={() => handleEvolution("nivel", -1)}
                          >
                            <ChevronDown />
                          </Button>
                          <span className="h1 mb-0 fw-black">
                            {character.infos.nivel}
                          </span>
                          <Button
                            variant="dark"
                            onClick={() => handleEvolution("nivel", 1)}
                          >
                            <ChevronUp />
                          </Button>
                        </div>
                      </div>

                      <div className="evolution-control-card">
                        <label className="tiny-label text-warning">
                          EXPOSIÇÃO (NEX)
                        </label>
                        <div className="d-flex align-items-center justify-content-between bg-dark p-2 border border-secondary">
                          <Button
                            variant="dark"
                            onClick={() => handleEvolution("nex", -1)}
                          >
                            <ChevronDown />
                          </Button>
                          <span className="h1 mb-0 fw-black text-warning">
                            {character.infos.nex}%
                          </span>
                          <Button
                            variant="dark"
                            onClick={() => handleEvolution("nex", 1)}
                          >
                            <ChevronUp />
                          </Button>
                        </div>
                      </div>
                    </Col>

                    <Col md={6}>
                      <div className="stats-recap bg-dark-subtle p-3 border border-secondary h-100">
                        <h6 className="uppercase small text-white-50 border-bottom border-secondary pb-2 mb-3">
                          Sincronização de Status
                        </h6>
                        <div className="stats-row">
                          <Heart size={14} className="text-danger" /> Vida Max:{" "}
                          <strong>{character.status.vidaMax}</strong>
                        </div>
                        <div className="stats-row">
                          <Brain size={14} className="text-info" /> Sanidade
                          Max: <strong>{character.status.sanidadeMax}</strong>
                        </div>
                        <div className="stats-row">
                          <Zap size={14} className="text-warning" /> Esforço
                          Max: <strong>{character.status.esforcoMax}</strong>
                        </div>
                        <div className="stats-row border-top border-secondary pt-2 mt-2">
                          <BookOpen size={14} className="text-danger" /> DT
                          Ritual: <strong>{character.infos.dtRitual}</strong>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Tab>

              <Tab eventKey="paranormal" title="2. PARANORMAL">
                <div className="p-4">
                  {character.infos.nex >= 50 && !character.infos.afinidade && (
                    <Alert
                      variant="danger"
                      className="bg-danger-subtle text-danger border-danger rounded-0 mb-4"
                    >
                      <ShieldAlert size={18} className="me-2" />
                      <strong>RUPTURA DE AFINIDADE:</strong> Escolha um elemento
                      para se vincular.
                    </Alert>
                  )}

                  <h6 className="tiny-label text-white-50">
                    AFINIDADE ELEMENTAL
                  </h6>
                  <Row className="g-2 mb-4">
                    {Object.keys(ELEMENT_DATA)
                      .filter((k) => k !== "vazio")
                      .map((key) => (
                        <Col xs={4} key={key}>
                          <div
                            className={`element-select-card ${character.infos.afinidade?.toLowerCase() === key ? "active" : ""}`}
                            onClick={() =>
                              setCharacter({
                                ...character,
                                infos: {
                                  ...character.infos,
                                  afinidade: ELEMENTS[key],
                                },
                              })
                            }
                            style={{ "--ele-color": ELEMENT_DATA[key].color }}
                          >
                            <img
                              src={ELEMENT_DATA[key].icon}
                              alt={key}
                              width="20"
                            />
                            <span>{ELEMENTS[key]}</span>
                          </div>
                        </Col>
                      ))}
                  </Row>

                  {habilidadeAtual && (
                    <div className="p-3 border border-info bg-info-subtle text-info">
                      <div className="fw-bold uppercase small mb-1">
                        Habilidade Liberada ({character.infos.nex}% NEX):
                      </div>
                      <h5 className="mb-1">{habilidadeAtual.title}</h5>
                      <p className="extra-small mb-0 opacity-75">
                        {habilidadeAtual.description}
                      </p>
                    </div>
                  )}
                </div>
              </Tab>
            </Tabs>
          </Modal.Body>

          <Modal.Footer className="bg-black border-top border-secondary">
            <Button
              variant="outline-secondary"
              className="rounded-0 btn-sm px-4"
              onClick={onHide}
            >
              ABORTAR
            </Button>
            <Button
              variant="danger"
              className="rounded-0 btn-sm px-4 fw-bold shadow-danger"
            >
              EFETIVAR ASCENSÃO
            </Button>
          </Modal.Footer>

          <style>{`
        .element-select-card {
          background: #111; border: 1px solid #333; padding: 10px; cursor: pointer;
          display: flex; align-items: center; gap: 10px; font-size: 0.7rem; font-weight: bold;
          text-transform: uppercase; transition: 0.2s;
        }
        .element-select-card.active { border-color: var(--ele-color); background: #1a1a1a; box-shadow: inset 0 0 10px var(--ele-color); }
        .element-select-card:hover { border-color: #666; }
        .shadow-danger { box-shadow: 0 0 15px rgba(255,0,0,0.3); }
        .extra-small { font-size: 0.7rem; line-height: 1.2; }
      `}</style>
        </Modal>
      )}
    </>
  );
}
