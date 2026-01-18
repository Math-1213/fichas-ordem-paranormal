import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserPlus, ArrowRight, Zap, Target } from "lucide-react";
import { CharacterService } from "../../../data/characters_service";
import LevelUpModal from "./LevelUpModal";

export default function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [selectedChar, setSelectedChar] = useState(null);
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

  const handleLevelUpClick = (e, char) => {
    e.stopPropagation();
    setSelectedChar(char);
    setShowLevelUp(true);
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
          CONECTANDO À C.R.I.S...
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
              {/* Botão Level Up Expandível no Canto Superior DIREITO */}
              <button
                className="btn-levelup-float"
                onClick={(e) => handleLevelUpClick(e, char.id)}
              >
                <div className="icon-container">
                  <Zap size={16} fill="#ffc107" className="icon-zap" />
                </div>
                <span className="label-rank">Subir de Rank</span>
              </button>

              <Card.Body className="p-0 position-relative">
                <div className="d-flex">
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

                    <div className="nex-container w-100">
                      {/* Header com as informações de texto */}
                      <div className="d-flex justify-content-between mb-1">
                        <span className="text-warning tiny-label fw-bold">
                          NEX {char.nex || 0}%
                        </span>
                        <span className="text-success tiny-label fw-bold">
                          NÍVEL {char.nivel || 1}
                        </span>
                      </div>

                      {/* Barra de Progresso (Glow Bar) */}
                      <div
                        className="glow-bar"
                        style={{
                          height: "6px",
                          background: "#1a1a1a",
                          borderRadius: "3px",
                          overflow: "hidden",
                        }}
                      >
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

      <LevelUpModal
        show={showLevelUp}
        onHide={() => setShowLevelUp(false)}
        charId={selectedChar}
      />

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700;800&display=swap');

          :root {
            --ordo-red: #ff4444;
            --nex-gold: #ffc107;
          }

          body { 
            font-family: 'JetBrains Mono', monospace; 
            background-color: #0a0a0a;
          }

          .agente-card {
            border: 1px solid #333 !important;
            border-radius: 0 !important;
            overflow: hidden;
            transition: all 0.3s ease;
            position: relative;
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
            background: #000;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .portrait-aside img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: top; /* Foco no topo da imagem */
            filter: grayscale(1) brightness(0.7);
            transition: 0.3s ease;
          }

          .agente-card:hover .portrait-aside img {
            filter: grayscale(0.2) brightness(1);
            transform: scale(1.05); 
          }

          /* Botão Expandível (Direita) */
          .btn-levelup-float {
            position: absolute;
            top: -1px;
            right: -1px;
            display: flex;
            align-items: center;
            background: #222;
            border: none;
            border-left: 1px solid #444;
            border-bottom: 1px solid #444;
            color: var(--nex-gold);
            padding: 8px;
            z-index: 20;
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
            width: 35px;
            height: 35px;
            white-space: nowrap;
            overflow: hidden;
            border-bottom-left-radius: 4px;
          }

          .btn-levelup-float:hover {
            width: 160px;
            background: var(--nex-gold);
            color: black;
          }

          .icon-container {
            min-width: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .label-rank {
            font-size: 0.7rem;
            font-weight: 800;
            text-transform: uppercase;
            opacity: 0;
            margin-left: 10px;
            transition: opacity 0.2s;
          }

          .btn-levelup-float:hover .label-rank {
            opacity: 1;
          }

          .btn-levelup-float:hover .icon-zap {
            fill: black !important;
          }

          /* Estilos de Texto e Progressão */
          .agent-name { font-weight: 800; font-size: 1.1rem; color: #eee; text-transform: uppercase; }
          .tiny-label { font-size: 0.65rem; letter-spacing: 1px; }
          .extra-small { font-size: 0.75rem; }

          .nex-container { margin-top: 10px; }
          .glow-bar {
            height: 6px; background: #111; width: 100%;
            position: relative; border-radius: 2px; overflow: hidden;
          }

          .glow-fill {
            height: 100%;
            background: var(--nex-gold);
            box-shadow: 0 0 10px rgba(255, 193, 7, 0.5);
            position: relative;
            overflow: hidden; /* Garante que o brilho não saia do preenchimento */
          }

          .glow-fill::after {
            content: "";
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            /* Brilho muito mais suave (0.2 de opacidade) */
            background: linear-gradient(
              90deg, 
              transparent, 
              rgba(255, 255, 255, 0.2), 
              transparent
            );
            animation: shine 3s infinite;
          }

          @keyframes shine {
            0% { left: -100%; }
            100% { left: 100%; }
          }

          .card-access-overlay {
            background: #151515; 
            font-size: 0.65rem;
            text-align: center;
            padding: 6px;
            border-top: 1px solid #222; 
            color: #888;
            letter-spacing: 1.5px;
            font-weight: 700;
            text-transform: uppercase;
            transition: all 0.3s ease;
            opacity: 1;
          }

          .agente-card:hover .card-access-overlay {
            background: var(--ordo-red); 
            color: white;
            border-top-color: var(--ordo-red);
            text-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
          }

          .scanner-line {
            position: absolute; top: 0; width: 100%; height: 2px;
            background: var(--ordo-red); animation: scan 2s linear infinite; z-index: 100;
          }

          @keyframes scan { 0% { top: 0; } 100% { top: 100vh; } }
        `}
      </style>
    </Container>
  );
}
