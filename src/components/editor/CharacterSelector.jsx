import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Spinner, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Users, UserPlus, ArrowRight, Shield, Search } from "lucide-react";
import { CharacterService } from "../../data/characters_service";

export default function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadChars() {
      setLoading(true);
      const data = await CharacterService.listSummary();
      setCharacters(data);
      setLoading(false);
    }
    loadChars();
  }, []);

  if (loading) {
    return (
      <Container className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
        <Spinner animation="border" variant="danger" />
        <p className="text-muted mt-3">Sincronizando com a Ordo Realitas...</p>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom border-secondary pb-3">
        <div>
          <h2 className="text-white fw-bold mb-0">
            <Users className="me-2 text-danger" size={28} />
            AGENTES DISPONÍVEIS
          </h2>
          <p className="text-muted small">Selecione uma ficha para editar ou visualizar.</p>
        </div>
        <Button variant="outline-danger" onClick={() => navigate("/editor")}>
          <UserPlus size={18} className="me-2" /> NOVO AGENTE
        </Button>
      </div>

      {characters.length === 0 ? (
        <Card className="bg-dark text-center p-5 border-secondary">
          <p className="text-muted">Nenhum agente encontrado na base de dados.</p>
          <Button variant="danger" size="sm" className="mx-auto" onClick={() => navigate("/editor")}>
            Recrutar Primeiro Agente
          </Button>
        </Card>
      ) : (
        <Row g={4}>
          {characters.map((char) => (
            <Col key={char.id} xs={12} md={6} lg={4} className="mb-4">
              <Card 
                className="bg-dark text-white border-secondary h-100 shadow-sm char-card"
                style={{ cursor: "pointer", transition: "transform 0.2s" }}
                onClick={() => navigate(`/editor/${char.id}`)}
              >
                <Card.Body className="d-flex align-items-center">
                  <div className="bg-black rounded p-3 me-3 border border-secondary">
                    <Shield size={32} className="text-danger" />
                  </div>
                  <div className="flex-grow-1">
                    <h5 className="mb-0 fw-bold">{char.nome}</h5>
                    <Badge bg="dark" className="text-muted border border-secondary mt-1">
                      ID: {char.id}
                    </Badge>
                  </div>
                  <ArrowRight size={20} className="text-muted ms-auto" />
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <style>
        {`
          .char-card:hover {
            transform: translateY(-5px);
            border-color: #ef4444 !important;
            background-color: #1c212b !important;
          }
          .char-card:hover .text-muted {
            color: #ef4444 !important;
          }
        `}
      </style>
    </Container>
  );
}