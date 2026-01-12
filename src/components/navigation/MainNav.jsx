import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Home, Users, FileEdit } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import AtmospherePlayer from "../ui/AtmospherePlayer";

export default function MainNav({ currentTrackUrl }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Função auxiliar para ver se o botão está ativo
  const isActive = (path) => location.pathname === path;

  const linkStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontWeight: 500,
    fontSize: "0.9rem",
    transition: "all 0.2s ease",
    padding: "8px 16px",
    borderRadius: "6px",
  };

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      style={{
        borderBottom: "1px solid #2a2f3e",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.3)",
        backgroundColor: "#0d1117 !important",
      }}
    >
      <Container>
        {/* Logo */}
        <Navbar.Brand
          onClick={() => navigate("/")}
          style={{
            fontWeight: 700,
            letterSpacing: "1px",
            fontSize: "1.1rem",
            cursor: "pointer",
          }}
        >
          ORDEM <span style={{ color: "#ef4444" }}>PARANORMAL</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto gap-2 align-items-center">
            {currentTrackUrl && (
              <div className="me-lg-3">
                <AtmospherePlayer currentTrackUrl={currentTrackUrl} />
              </div>
            )}
            {/* Botão Home */}
            <Nav.Link
              onClick={() => navigate("/")}
              style={{
                ...linkStyle,
                color: isActive("/") ? "#fff" : "#9aa0b3",
                backgroundColor: isActive("/") ? "#1c212b" : "transparent",
              }}
            >
              <Home size={18} /> Início
            </Nav.Link>

            {/* Botão Ver Fichas */}
            <Nav.Link
              onClick={() => navigate("/fichas")}
              style={{
                ...linkStyle,
                color: isActive("/fichas") ? "#fff" : "#9aa0b3",
                backgroundColor: isActive("/fichas")
                  ? "#1c212b"
                  : "transparent",
              }}
            >
              <Users size={18} /> Personagens
            </Nav.Link>

            {/* Botão Editor (Criar Novo) */}
            <Button
              variant={isActive("/editor") ? "danger" : "outline-danger"}
              size="sm"
              className="ms-lg-2 d-flex align-items-center gap-2"
              onClick={() => navigate("/editor")}
              style={{ fontWeight: 600, padding: "6px 16px" }}
            >
              <FileEdit size={16} /> NOVO AGENTE
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
