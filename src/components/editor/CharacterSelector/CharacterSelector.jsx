import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserPlus, ArrowRight, Target } from "lucide-react";
import { CharacterService } from "../../../data/characters_service";

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

  if (loading) {
    return (
      <Container
        className="d-flex flex-column align-items-center justify-content-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="scanner-line"></div>
        <Spinner animation="grow" variant="danger" />
        <p className="text-danger mt-3 fw-bold tracking-widest uppercase small">
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
          className="btn-ordo p-2 px-4 fw-bold"
          onClick={() => navigate("/editor")}
        >
          <UserPlus size={18} className="me-2" /> RECRUTAR
        </Button>
      </div>

      <Row className="g-4">
        {characters.map((char) => (
          <Col key={char.id} xs={12} md={6} lg={4}>
            <Card
              className="agente-card bg-black text-white border-secondary cursor-pointer"
              onClick={() => navigate(`/editor/${char.id}`)}
            >
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
                      <span className="text-danger tiny-label fw-bold uppercase">
                        {char.patente || "NÃO RECRUTADO"}
                      </span>
                      <h4 className="agent-name mb-0">{char.nome}</h4>
                      <div className="text-white-50 extra-small mb-2 italic">
                        {char.classe || "Classe Não Definida"}
                      </div>
                    </div>

                    <div className="nex-container w-100">
                      <div className="d-flex justify-content-between mb-1">
                        <span className="text-warning tiny-label fw-bold">
                          NEX {char.nex || 0}%
                        </span>
                        <span className="text-success tiny-label fw-bold">
                          NÍVEL {char.nivel || 1}
                        </span>
                      </div>

                      <div className="glow-bar">
                        <div
                          className="glow-fill"
                          style={{ width: `${char.nex || 0}%` }}
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
            --ordo-red: #ff4444;
            --nex-gold: #ffc107;
          }

          body { 
            font-family: 'JetBrains Mono', monospace; 
            background-color: #0a0a0a;
          }

          .cursor-pointer { cursor: pointer; }

          .agente-card {
            border: 1px solid #333 !important;
            border-radius: 0 !important;
            transition: all 0.3s ease;
          }

          .agente-card:hover {
            border-color: var(--ordo-red) !important;
            transform: translateY(-4px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          }

          .portrait-aside {
            width: 100px; height: 140px;
            background: #000; overflow: hidden;
            display: flex; align-items: center; justify-content: center;
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

          .agent-name { font-weight: 800; font-size: 1.1rem; text-transform: uppercase; }
          .tiny-label { font-size: 0.65rem; letter-spacing: 1px; }
          .extra-small { font-size: 0.75rem; }

          .glow-bar {
            height: 6px; background: #111; width: 100%;
            border-radius: 2px; overflow: hidden;
          }

          .glow-fill {
            height: 100%; background: var(--nex-gold);
            box-shadow: 0 0 10px rgba(255, 193, 7, 0.4);
            position: relative;
          }

          .glow-fill::after {
            content: ""; position: absolute; top: 0; left: -100%;
            width: 100%; height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            animation: shine 3s infinite;
          }

          @keyframes shine {
            0% { left: -100%; }
            100% { left: 100%; }
          }

          .card-access-overlay {
            background: #151515; font-size: 0.65rem; text-align: center;
            padding: 6px; border-top: 1px solid #222; color: #888;
            letter-spacing: 1.5px; font-weight: 700; text-transform: uppercase;
            transition: 0.3s ease;
          }

          .agente-card:hover .card-access-overlay {
            background: var(--ordo-red); color: white;
          }

          .scanner-line {
            position: absolute; top: 0; width: 100%; height: 2px;
            background: var(--ordo-red); animation: scan 2s linear infinite;
          }

          @keyframes scan { 0% { top: 0; } 100% { top: 100vh; } }
        `}
      </style>
    </Container>
  );
}
