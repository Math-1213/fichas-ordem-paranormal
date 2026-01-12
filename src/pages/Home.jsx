import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// Importando os ícones do Lucide
import { FolderSearch, UserPlus, ShieldAlert } from "lucide-react";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "80vh" }}
    >
      <div className="text-center w-100">
        {/* Logo com ícone de alerta sutil */}
        <div className="d-flex align-items-center justify-content-center gap-3 mb-2">
          <ShieldAlert size={40} color="#ff3b3b" strokeWidth={2.5} />
          <h1
            className="display-3 fw-bold text-white mb-0"
            style={{ letterSpacing: "4px" }}
          >
            ORDO REALITAS
          </h1>
        </div>

        <p
          className="text-muted mb-5 text-uppercase"
          style={{ fontSize: "1rem", letterSpacing: "2px" }}
        >
          — Gerenciador de Fichas de Investigação —
        </p>

        <Row className="justify-content-center gap-4">
          {/* CARD: VISUALIZAR FICHAS */}
          <Col md={5} lg={4}>
            <Card
              className="h-100 bg-dark text-white border-secondary card-hover"
              style={{ cursor: "pointer", transition: "all 0.3s ease" }}
              onClick={() => navigate("/fichas")}
            >
              <Card.Body className="d-flex flex-column align-items-center p-5">
                <div
                  className="mb-4 p-3 rounded-circle"
                  style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                >
                  <FolderSearch size={48} color="#9aa0b3" />
                </div>
                <Card.Title className="fs-3 mb-3 fw-bold">
                  Ver Fichas
                </Card.Title>
                <Card.Text className="text-muted text-center mb-4">
                  Acesse o banco de dados e visualize os investigadores ativos
                  na ordem.
                </Card.Text>
                <Button
                  variant="outline-light"
                  className="mt-auto w-100 fw-bold border-2"
                >
                  ABRIR ARQUIVOS
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* CARD: CRIAR NOVO */}
          <Col md={5} lg={4}>
            <Card
              className="h-100 bg-dark text-white border-secondary card-hover"
              style={{
                cursor: "pointer",
                transition: "all 0.3s ease",
                borderLeft: "4px solid #00e5ff",
              }}
              onClick={() => navigate("/editor")}
            >
              <Card.Body className="d-flex flex-column align-items-center p-5">
                <div
                  className="mb-4 p-3 rounded-circle"
                  style={{ backgroundColor: "rgba(0, 229, 255, 0.05)" }}
                >
                  <UserPlus size={48} color="#00e5ff" />
                </div>
                <Card.Title className="fs-3 mb-3 fw-bold">
                  Novo Agente
                </Card.Title>
                <Card.Text className="text-muted text-center mb-4">
                  Inicie o recrutamento de um novo agente e defina seus
                  atributos e perícias.
                </Card.Text>
                <Button
                  variant="info"
                  className="mt-auto w-100 fw-bold text-dark border-0"
                  style={{ backgroundColor: "#00e5ff" }}
                >
                  NOVA INVESTIGAÇÃO
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div
          className="mt-5 text-muted opacity-50"
          style={{ fontSize: "0.75rem", letterSpacing: "1px" }}
        >
          SISTEMA DE GESTÃO PARANORMAL • NÍVEL DE ACESSO: SIGILO MÁXIMO
        </div>
      </div>

      <style>{`
        .card-hover:hover {
          transform: translateY(-10px);
          border-color: #00e5ff !important;
          box-shadow: 0 15px 35px rgba(0, 229, 255, 0.15);
        }
        .card-hover:hover .rounded-circle {
          background-color: rgba(0, 229, 255, 0.15) !important;
        }
        .card-hover:hover svg {
          color: #00e5ff !important;
          transition: color 0.3s ease;
        }
      `}</style>
    </Container>
  );
}
