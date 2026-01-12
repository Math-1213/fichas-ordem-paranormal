import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// Importando os ícones do Lucide
import {
  FolderSearch,
  UserPlus,
  ShieldAlert,
  FileEdit,
  Ghost,
} from "lucide-react";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "85vh" }}
    >
      <div className="text-center w-100">
        {/* Logo com ícone de alerta sutil */}
        <div className="d-flex align-items-center justify-content-center gap-3 mb-2">
          <ShieldAlert size={40} color="#ff3b3b" strokeWidth={2.5} />
          <h1
            className="display-4 fw-bold text-white mb-0"
            style={{ letterSpacing: "4px" }}
          >
            ORDOR REALITAS
          </h1>
        </div>

        <p
          className="text-muted mb-5 text-uppercase"
          style={{ fontSize: "0.9rem", letterSpacing: "2px" }}
        >
          — Terminal de Gerenciamento de Ativos —
        </p>

        <Row className="justify-content-center g-4">
          {/* CARD 1: VISUALIZAR (MODO LEITURA / FICHAS) */}
          <Col md={4}>
            <Card
              className="h-100 bg-dark text-white border-secondary card-hover"
              style={{ cursor: "pointer", transition: "all 0.3s ease" }}
              onClick={() => navigate("/fichas")}
            >
              <Card.Body className="d-flex flex-column align-items-center p-4 text-center">
                <div className="mb-4 p-3 rounded-circle bg-opacity-10 bg-light">
                  <FolderSearch size={40} className="text-muted" />
                </div>
                <Card.Title className="fs-4 mb-2 fw-bold">Arquivos</Card.Title>
                <Card.Text className="small text-muted mb-4">
                  Consulta rápida ao banco de dados de investigadores ativos.
                </Card.Text>
                <Button
                  variant="outline-light"
                  className="mt-auto w-100 btn-sm fw-bold"
                >
                  CONSULTAR
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* CARD 2: EDITAR EXISTENTE (PRE-EDIÇÃO) */}
          <Col md={4}>
            <Card
              className="h-100 bg-dark text-white border-secondary card-hover-edit"
              style={{
                cursor: "pointer",
                transition: "all 0.3s ease",
                borderTop: "3px solid #facc15",
              }}
              onClick={() => navigate("/preEdicao")}
            >
              <Card.Body className="d-flex flex-column align-items-center p-4 text-center">
                <div
                  className="mb-4 p-3 rounded-circle"
                  style={{ backgroundColor: "rgba(250, 204, 21, 0.05)" }}
                >
                  <FileEdit size={40} color="#facc15" />
                </div>
                <Card.Title className="fs-4 mb-2 fw-bold text-warning">
                  Modificar
                </Card.Title>
                <Card.Text className="small text-muted mb-4">
                  Alterar equipamentos, rituais ou atributos de agentes
                  registrados.
                </Card.Text>
                <Button
                  variant="outline-warning"
                  className="mt-auto w-100 btn-sm fw-bold"
                >
                  EDITAR AGENTE
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* CARD 3: CRIAR NOVO (EDITOR) */}
          <Col md={4}>
            <Card
              className="h-100 bg-dark text-white border-secondary card-hover-new"
              style={{
                cursor: "pointer",
                transition: "all 0.3s ease",
                borderTop: "3px solid #00e5ff",
              }}
              onClick={() => navigate("/editor")}
            >
              <Card.Body className="d-flex flex-column align-items-center p-4 text-center">
                <div
                  className="mb-4 p-3 rounded-circle"
                  style={{ backgroundColor: "rgba(0, 229, 255, 0.05)" }}
                >
                  <UserPlus size={40} color="#00e5ff" />
                </div>
                <Card.Title
                  className="fs-4 mb-2 fw-bold"
                  style={{ color: "#00e5ff" }}
                >
                  Recrutar
                </Card.Title>
                <Card.Text className="small text-muted mb-4">
                  Iniciar um novo processo de recrutamento para a Ordem.
                </Card.Text>
                <Button
                  variant="info"
                  className="mt-auto w-100 btn-sm fw-bold text-dark border-0"
                  style={{ backgroundColor: "#00e5ff" }}
                >
                  NOVA FICHA
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div
          className="mt-5 text-muted opacity-50"
          style={{ fontSize: "0.7rem", letterSpacing: "1px" }}
        >
          SISTEMA DE GESTÃO PARANORMAL • NÍVEL DE ACESSO: SIGILO MÁXIMO
        </div>
      </div>

      <style>{`
        .card-hover:hover {
          transform: translateY(-8px);
          border-color: #f8f9fa !important;
        }
        .card-hover-edit:hover {
          transform: translateY(-8px);
          border-color: #facc15 !important;
          box-shadow: 0 10px 25px rgba(250, 204, 21, 0.1);
        }
        .card-hover-new:hover {
          transform: translateY(-8px);
          border-color: #00e5ff !important;
          box-shadow: 0 10px 25px rgba(0, 229, 255, 0.15);
        }
      `}</style>
    </Container>
  );
}
