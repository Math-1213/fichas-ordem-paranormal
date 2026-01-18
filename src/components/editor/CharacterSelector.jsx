import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Badge,
  ProgressBar,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Users, UserPlus, ArrowRight, Zap, Target } from "lucide-react";
import { CharacterService } from "../../data/characters_service";

export default function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadChars() {
      setLoading(true);
      try {
        const data = await CharacterService.listSummary();
        setCharacters(data);
      } catch (err) {
        console.error("Erro ao carregar agentes", err);
      } finally {
        setLoading(false);
      }
    }
    loadChars();
  }, []);

  const handleLevelUpClick = (e, charId) => {
    e.stopPropagation();
    console.log("Iniciando Protocolo de Ascensão para:", charId);
  };

  if (loading) {
    return (
      <Container
        className="d-flex flex-column align-items-center justify-content-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="scanner-line"></div>
        <Spinner animation="grow" variant="danger" />
        <p className="text-danger mt-3 fw-bold tracking-widest">
          AUTENTICANDO ACESSO...
        </p>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      {/* Header Estilizado */}
      <div className="mb-5 d-flex justify-content-between align-items-end">
        <div className="border-start border-danger border-4 ps-3">
          <h1 className="text-white fw-black mb-0 h3">C.R.I.S.</h1>
          <p className="text-white-50 small mb-0 uppercase tracking-tighter">
            Central de Reconhecimento de Irregularidades Sobrenaturais
          </p>
        </div>
        <Button
          variant="outline-danger"
          className="btn-ordo p-2 px-4"
          onClick={() => navigate("/editor")}
        >
          <UserPlus size={18} className="me-2" /> RECRUTAR
        </Button>
      </div>

      <Row className="g-4">
        {characters.map((char) => (
          <Col key={char.id} xs={12} md={6} lg={4}>
            <Card
              className="agente-card bg-black text-white border-secondary"
              onClick={() => navigate(`/editor/${char.id}`)}
            >
              {/* Botão Level Up Minimalista e Flutuante */}
              <button
                className="btn-levelup-float"
                onClick={(e) => handleLevelUpClick(e, char.id)}
                title="Subir NEX"
              >
                <Zap size={16} fill="#ffc107" />
              </button>

              <Card.Body className="p-0 position-relative">
                <div className="d-flex">
                  {/* Portrait Lateral (Estilo Ficha de RPG) */}
                  <div className="portrait-aside border-end border-secondary">
                    {char.portrait ? (
                      <img src={char.portrait} alt={char.nome} />
                    ) : (
                      <div className="portrait-placeholder">
                        <Target size={30} opacity={0.3} />
                      </div>
                    )}
                  </div>

                  <div className="p-3 flex-grow-1 d-flex flex-column justify-content-between">
                    <div>
                      <div className="d-flex justify-content-between align-items-start">
                        <span className="text-danger tiny-label fw-bold">
                          {char.patente || "Não Recrutado"}
                        </span>
                      </div>
                      <h4 className="agent-name mb-0">{char.nome}</h4>
                      <div className="text-white-50 extra-small mb-2 italic">
                        {char.classe || "Classe Não Definida"}
                      </div>
                    </div>

                    <div className="nex-container">
                        <span className="text-warning tiny-label fw-bold">
                          NEX {char.nex || 5}%
                        </span>
                      <div className="glow-bar">
                        <div
                          className="glow-fill"
                          style={{ width: `${char.nex || 5}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card.Body>

              <div className="card-access-overlay">
                <span>
                  ACESSAR PRONTUÁRIO <ArrowRight size={14} />
                </span>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700;800&display=swap');

          :root {
            --ordo-gray: #1a1a1a;
            --ordo-red: #ff4444;
            --nex-gold: #ffc107;
          }

          body { font-family: 'JetBrains Mono', monospace; }

          /* Card de Agente Estilo Dossiê */
          .agente-card {
            border: 1px solid #333 !important;
            border-radius: 0 !important;
            overflow: hidden;
            transition: all 0.3s ease;
            min-height: 140px;
          }

          .agente-card:hover {
            border-color: var(--ordo-red) !important;
            transform: translateY(-4px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          }

          /* Portrait Lateral */
          .portrait-aside {
            width: 100px;
            height: 140px;
            background: #0a0a0a;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .portrait-aside img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: top;
            filter: grayscale(1) contrast(1.2) brightness(0.8);
            transition: 0.3s;
          }

          .agente-card:hover .portrait-aside img {
            filter: grayscale(0.2) contrast(1.1);
          }

          /* Botão Level Up Flutuante */
          .btn-levelup-float {
            position: absolute;
            top: -1px;
            right: -1px;
            background: #222;
            border: 1px solid #444;
            color: var(--nex-gold);
            padding: 8px;
            z-index: 10;
            transition: 0.2s;
            cursor: pointer;
          }

          .btn-levelup-float:hover {
            background: var(--nex-gold);
            color: black;
          }

          /* Tipografia */
          .agent-name {
            font-weight: 800;
            font-size: 1.1rem;
            letter-spacing: -0.5px;
            color: #eee;
          }

          .tiny-label { font-size: 0.65rem; letter-spacing: 1px; }
          .extra-small { font-size: 0.75rem; }

          /* Barra de NEX Customizada */
          .nex-container { margin-top: 10px; }
          .glow-bar {
            height: 4px;
            background: #111;
            width: 100%;
            position: relative;
            border-radius: 2px;
          }

          .glow-fill {
            height: 100%;
            background: var(--nex-gold);
            box-shadow: 0 0 12px var(--nex-gold);
            position: relative;
            transition: width 1s ease-in-out;
          }

          /* Overlay de acesso ao fundo */
          .card-access-overlay {
            background: #000;
            font-size: 0.6rem;
            text-align: center;
            padding: 4px;
            opacity: 0.5;
            transition: 0.3s;
          }

          .agente-card:hover .card-access-overlay {
            background: var(--ordo-red);
            opacity: 1;
            color: white;
          }

          /* Animação de Loading */
          .scanner-line {
            position: absolute;
            top: 0; width: 100%; height: 2px;
            background: var(--ordo-red);
            box-shadow: 0 0 15px var(--ordo-red);
            animation: scan 2s linear infinite;
          }

          @keyframes scan {
            0% { top: 0; }
            100% { top: 100vh; }
          }
        `}
      </style>
    </Container>
  );
}
