import React, { useEffect, useState } from "react";
import { Button, Row, Col, Badge } from "react-bootstrap";
import {
  ArrowLeft,
  Edit3,
  Shield,
  Heart,
  Zap,
  Activity,
  Target,
  ZapOff,
} from "lucide-react";
import { BestiaryService } from "../../data/bestiary_services";

export default function ShowEntity({ id, onBack, onEdit }) {
  const [entity, setEntity] = useState({});
  useEffect(() => {
    async function getMonster() {
      const monster = await BestiaryService.getById(id);
      setEntity(monster);
    }

    if (!id) onBack();
    getMonster();
  }, []);
  return (
    <div className="entity-view-container animate__animated animate__fadeIn">
      {/* BOTÃO VOLTAR COM ESTILO DE TERMINAL */}
      <button className="btn-terminal-back mb-4" onClick={onBack}>
        <ArrowLeft size={14} className="me-2" /> [ VOLTAR_AO_INDEX ]
      </button>

      <Row className="gy-4">
        {/* COLUNA DA ESQUERDA: BIOMETRIA E STATUS */}
        <Col lg={4}>
          <div className="scanner-frame mb-3">
            <div className="scanner-line"></div>
            <img
              src={entity.image}
              className="img-fluid entity-profile-img"
              alt={entity.name}
            />
            <div className="corner-tl"></div>
            <div className="corner-br"></div>
          </div>

          <div className="status-grid">
            <div className="status-item hp">
              <div className="label">
                <Heart size={12} /> VITALIDADE
              </div>
              <div className="value">{entity.stats?.pv}</div>
            </div>
            <div className="status-item def">
              <div className="label">
                <Shield size={12} /> DEFESA
              </div>
              <div className="value">{entity.stats?.defesa}</div>
            </div>
            <div className="status-item vd">
              <div className="label">
                <Zap size={12} /> AMEAÇA_VD
              </div>
              <div className="value">{entity.vd}</div>
            </div>
          </div>

          {/* ATRIBUTOS RÁPIDOS */}
          <div className="attributes-hex-grid mt-3">
            {Object.entries(entity.attributes || {}).map(([attr, val]) => (
              <div key={attr} className="attr-box">
                <span className="attr-name">{attr}</span>
                <span className="attr-val">{val}</span>
              </div>
            ))}
          </div>
        </Col>

        {/* COLUNA DA DIREITA: DOSSIÊ E DETALHES */}
        <Col lg={8} className="ps-lg-5">
          <header className="entity-header mb-4">
            <div className="d-flex align-items-center gap-3 mb-2">
              <Badge bg="danger" className="element-badge text-uppercase">
                {entity.element}
              </Badge>
              {entity.secondaryElements?.map((sec) => (
                <span key={sec} className="text-secondary small">
                  // {sec.toUpperCase()}
                </span>
              ))}
            </div>
            <h1 className="entity-title">{entity.name}</h1>
            <div className="id-serial">UUID: {entity.id}</div>
          </header>

          <section className="dossier-section mb-5">
            <h6 className="section-title">
              <Activity size={16} className="me-2" /> RELATÓRIO_DE_CAMPO
            </h6>
            <div className="description-text">
              {entity.description ||
                "Nenhum dado fenomenológico registrado nos arquivos da Ordem."}
            </div>
          </section>

          <section className="dossier-section mb-5">
            <h6 className="section-title">
              <Target size={16} className="me-2" />{" "}
              VULNERABILIDADES_E_RESISTÊNCIAS
            </h6>
            <div className="d-flex flex-wrap gap-2">
              {entity.resistances?.map((res) => (
                <Badge key={res} className="res-badge">
                  RES: {res}
                </Badge>
              ))}
              {entity.vulnerabilities?.map((vul) => (
                <Badge key={vul} className="vul-badge">
                  VUL: {vul}
                </Badge>
              ))}
            </div>
          </section>

          <div className="actions-footer border-top border-white border-opacity-10 pt-4">
            <Button
              variant="outline-danger"
              className="btn-cyber-edit"
              onClick={() => onEdit(entity)}
            >
              <Edit3 size={16} className="me-2" /> SOBRESCREVER_PROTOCOLO
            </Button>
          </div>
        </Col>
      </Row>

      <style>{`
        .entity-view-container { color: #e0e0e0; font-family: 'JetBrains Mono', monospace; }
        
        /* BOTÃO VOLTAR */
        .btn-terminal-back { background: transparent; border: none; color: #666; font-size: 0.75rem; font-weight: bold; transition: 0.3s; }
        .btn-terminal-back:hover { color: #ff1744; letter-spacing: 1px; }

        /* SCANNER FRAME */
        .scanner-frame { position: relative; background: #0a0a0a; border: 1px solid rgba(255,255,255,0.05); padding: 5px; overflow: hidden; }
        .entity-profile-img { width: 100%; height: 400px; object-fit: cover; filter: grayscale(0.3) contrast(1.2); }
        .scanner-line { 
          position: absolute; top: 0; left: 0; width: 100%; height: 2px; 
          background: rgba(255, 23, 68, 0.5); box-shadow: 0 0 15px #ff1744;
          z-index: 10; animation: scan 4s infinite linear;
        }
        @keyframes scan { 0% { top: 0; } 100% { top: 100%; } }

        /* STATUS GRID */
        .status-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1px; background: #222; border: 1px solid #222; }
        .status-item { background: #000; padding: 10px; text-align: center; }
        .status-item .label { font-size: 0.55rem; color: #666; margin-bottom: 5px; }
        .status-item .value { font-size: 1.4rem; font-weight: 900; }
        .hp .value { color: #ff1744; }
        .def .value { color: #00e5ff; }
        .vd .value { color: #ffea00; }

        /* ATRIBUTOS */
        .attributes-hex-grid { display: flex; justify-content: space-between; gap: 5px; }
        .attr-box { 
          background: #0f0f0f; border: 1px solid #222; flex: 1; 
          display: flex; flex-direction: column; align-items: center; padding: 5px;
        }
        .attr-name { font-size: 0.6rem; color: #444; font-weight: bold; }
        .attr-val { font-size: 1.1rem; font-weight: 900; color: #fff; }

        /* TYPOGRAPHY */
        .entity-title { font-size: 3.5rem; font-weight: 900; text-transform: uppercase; line-height: 1; margin: 0; color: #fff; }
        .id-serial { font-size: 0.65rem; color: #444; letter-spacing: 2px; }
        .section-title { font-size: 0.8rem; color: #ff1744; font-weight: bold; border-bottom: 1px solid #ff174444; padding-bottom: 5px; margin-bottom: 15px; }
        .description-text { font-size: 1rem; line-height: 1.6; color: #aaa; text-align: justify; }

        /* BADGES */
        .res-badge { background: #1a1a1a !important; border: 1px solid #00e5ff44; color: #00e5ff; margin-right: 5px; }
        .vul-badge { background: #1a1a1a !important; border: 1px solid #ff174444; color: #ff1744; }

        .btn-cyber-edit { 
          border-radius: 0; font-weight: bold; letter-spacing: 1px; font-size: 0.8rem;
          padding: 10px 25px; transition: 0.3s;
        }
        .btn-cyber-edit:hover { background: #ff1744; color: #fff; box-shadow: 0 0 20px rgba(255,23,68,0.4); }

        /* CORNERS */
        .corner-tl { position: absolute; top: 0; left: 0; width: 15px; height: 15px; border-top: 2px solid #ff1744; border-left: 2px solid #ff1744; }
        .corner-br { position: absolute; bottom: 0; right: 0; width: 15px; height: 15px; border-bottom: 2px solid #ff1744; border-right: 2px solid #ff1744; }
      `}</style>
    </div>
  );
}
