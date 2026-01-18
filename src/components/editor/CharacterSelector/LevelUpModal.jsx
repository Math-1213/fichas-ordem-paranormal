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
} from "react-bootstrap";
import {
  Zap,
  Heart,
  Brain,
  ShieldAlert,
  ChevronUp,
  ChevronDown,
  Dna,
  BookOpen,
  ArrowRight,
} from "lucide-react";

import { ELEMENT_DATA, ELEMENTS } from "../../../configs/paranormal";
import { statusParams, trails } from "../../../models/Rules";
import { CharacterService } from "../../../data/characters_service";

export default function LevelUpModal({ show, onHide, charId }) {
  const [activeTab, setActiveTab] = useState("nivel");
  const [character, setCharacter] = useState(null);
  const [loadingSave, setLoadingSave] = useState(false);

  useEffect(() => {
    async function getChar() {
      if (!charId) return;
      try {
        const char = await CharacterService.getById(charId);
        if (char?.data) setCharacter(char.data);
      } catch (err) {
        console.error("Erro ao carregar agente:", err);
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
            SINCRONIZANDO COM A C.R.I.S...
          </p>
        </Modal.Body>
      </Modal>
    );
  }

  const calculateStat = (formula, level, attributes) => {
    if (!formula) return 0;
    let expression = formula
      .replace(/\/LEVEL\//g, level)
      .replace(/\/VIG\//g, attributes.vigor)
      .replace(/\/PRE\//g, attributes.presenca)
      .replace(/\/INT\//g, attributes.intelecto);
    try {
      // eslint-disable-next-line no-eval
      return eval(expression.replace(/[a-zA-Z]/g, ""));
    } catch (e) {
      return 0;
    }
  };

  const handleEvolution = (field, delta) => {
    const updated = { ...character };
    const { classe } = updated.infos;
    const rules = statusParams[classe];

    if (field === "nivel") {
      const newLevel = updated.infos.nivel + delta;
      if (newLevel < 1) return;
      updated.infos.nivel = newLevel;
      updated.infos.dtRitual += delta;

      // Recalcula automáticos (podem ser editados depois no lado direito)
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
      let newNex = updated.infos.nex + delta * 5;
      if (newNex > 99) newNex = 99; // Trava no 99%
      if (newNex < 0) newNex = 0;
      updated.infos.nex = newNex;
    }

    setCharacter(updated);
  };

  const handleManualStatus = (path, value) => {
    const updated = { ...character };
    const keys = path.split(".");
    updated[keys[0]][keys[1]] = parseInt(value) || 0;
    setCharacter(updated);
  };

  const handleSave = async () => {
    setLoadingSave(true);
    try {
      await CharacterService.update(charId, character);
      onHide();
    } catch (err) {
      alert("Falha ao sincronizar dados.");
    } finally {
      setLoadingSave(false);
    }
  };

  const getProximaHabilidade = () => {
    if (!character) return null;
    const { classe, trilha, nex } = character.infos;
    const trilhaData = trails[classe]?.find((t) => t.name === trilha);
    if (!trilhaData) return null;
    const nexTresholds = [99, 65, 40, 10];
    const currentTreshold = nexTresholds.find((t) => nex >= t);
    return currentTreshold ? trilhaData.powers[`nex${currentTreshold}`] : null;
  };

  const habAtual = getProximaHabilidade();

  return (
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
            {character?.infos?.nome?.toUpperCase()}
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
                <Col md={5}>
                  <div className="evolution-control-card mb-4">
                    <label className="tiny-label text-danger">
                      NÍVEL OPERACIONAL
                    </label>
                    <div className="d-flex align-items-center justify-content-between bg-dark-soft p-2 border border-secondary">
                      <Button
                        variant="dark"
                        onClick={() => handleEvolution("nivel", -1)}
                      >
                        <ChevronDown />
                      </Button>
                      <span className="h1 mb-0 fw-black">
                        {character?.infos?.nivel}
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
                    <div className="d-flex align-items-center justify-content-between bg-dark-soft p-2 border border-secondary">
                      <Button
                        variant="dark"
                        onClick={() => handleEvolution("nex", -1)}
                      >
                        <ChevronDown />
                      </Button>
                      <span className="h1 mb-0 fw-black text-warning">
                        {character?.infos?.nex}%
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

                <Col md={7}>
                  <div className="stats-recap p-3 border border-secondary bg-dark-soft h-100">
                    <h6 className="uppercase small text-danger border-bottom border-danger pb-2 mb-3">
                      Sincronização de Atributos Vitais
                    </h6>

                    {[
                      {
                        label: "Vida Máxima",
                        icon: <Heart size={14} className="text-danger" />,
                        value: character?.status?.vidaMax,
                        path: "status.vidaMax",
                      },
                      {
                        label: "Sanidade Máxima",
                        icon: <Brain size={14} className="text-info" />,
                        value: character?.status?.sanidadeMax,
                        path: "status.sanidadeMax",
                      },
                      {
                        label: "Esforço Máximo",
                        icon: <Zap size={14} className="text-warning" />,
                        value: character?.status?.esforcoMax,
                        path: "status.esforcoMax",
                      },
                      {
                        label: "DT de Ritual",
                        icon: <BookOpen size={14} className="text-danger" />,
                        value: character?.infos?.dtRitual,
                        path: "infos.dtRitual",
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="d-flex align-items-center justify-content-between mb-2 pb-2 border-bottom border-dark"
                      >
                        <div className="small text-white-50">
                          {item.icon} <span className="ms-1">{item.label}</span>
                        </div>
                        <div className="d-flex align-items-center">
                          <Form.Control
                            type="number"
                            className="bg-black text-white border-secondary text-center form-control-sm"
                            style={{ width: "70px" }}
                            value={item.value}
                            onChange={(e) =>
                              handleManualStatus(item.path, e.target.value)
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Col>
              </Row>
            </div>
          </Tab>

          <Tab eventKey="paranormal" title="2. PARANORMAL">
            <div className="p-4">
              {character?.infos?.nex >= 50 && !character?.infos?.afinidade && (
                <Alert
                  variant="danger"
                  className="bg-danger-subtle text-danger border-danger rounded-0 mb-4 py-2"
                >
                  <ShieldAlert size={18} className="me-2" />
                  <strong>RUPTURA DE AFINIDADE:</strong> Escolha um elemento.
                </Alert>
              )}

              <h6 className="tiny-label text-white-50 uppercase mb-3">
                Vínculo Elemental
              </h6>
              <Row className="g-2 mb-4">
                {Object.keys(ELEMENT_DATA)
                  .filter((k) => k !== "vazio")
                  .map((key) => (
                    <Col xs={4} key={key}>
                      <div
                        className={`element-select-card ${character?.infos?.afinidade === ELEMENTS[key] ? "active" : ""}`}
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

              {habAtual && (
                <div className="p-3 border-start border-4 border-info bg-dark-soft">
                  <div className="text-info tiny-label fw-bold mb-1">
                    HABILIDADE DESBLOQUEADA ({character.infos.nex}% NEX)
                  </div>
                  <h5 className="mb-1 text-white">{habAtual.title}</h5>
                  <p className="extra-small mb-0 text-white-50">
                    {habAtual.description}
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
          onClick={handleSave}
          disabled={loadingSave}
        >
          {loadingSave ? "PROCESSANDO..." : "EFETIVAR ASCENSÃO"}
        </Button>
      </Modal.Footer>

      <style>{`
        .bg-dark-soft { background: #0f0f0f !important; }
        .evolution-control-card .h1 { font-family: 'JetBrains Mono', monospace; }
        .element-select-card {
          background: #0a0a0a; border: 1px solid #222; padding: 12px; cursor: pointer;
          display: flex; align-items: center; gap: 10px; font-size: 0.7rem; font-weight: bold;
          text-transform: uppercase; transition: 0.3s;
        }
        .element-select-card.active { 
          border-color: var(--ele-color); 
          background: rgba(255,255,255,0.05); 
          box-shadow: inset 0 0 15px var(--ele-color); 
        }
        .ordo-evolution-modal .modal-content { border: 1px solid #444; border-radius: 0; }
        .shadow-danger { box-shadow: 0 0 20px rgba(255,0,0,0.2); }
        .extra-small { font-size: 0.75rem; line-height: 1.4; }
        .tiny-label { font-size: 0.65rem; letter-spacing: 1px; font-weight: 800; }
      `}</style>
    </Modal>
  );
}
