import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Home, Users, FileEdit, Settings2, ShieldAlert } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import AtmospherePlayer from "../ui/AtmospherePlayer";

export default function MainNav({ currentTrackUrl }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <style>
        {`
          .navbar-custom {
            background: linear-gradient(to bottom, #0d1117 0%, #05070a 100%) !important;
            border-bottom: 2px solid #1f242d;
            padding: 0.75rem 0;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          }

          .nav-link-custom {
            color: #9aa0b3 !important;
            font-weight: 600;
            font-size: 0.85rem;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            padding: 8px 15px !important;
            border-radius: 4px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex;
            align-items: center;
            gap: 8px;
            border: 1px solid transparent;
          }

          .nav-link-custom:hover {
            color: #fff !important;
            background: rgba(255, 255, 255, 0.05);
          }

          .nav-link-custom.active-home {
            color: #fff !important;
            border-bottom: 2px solid #fff;
            border-radius: 0;
          }

          .nav-link-custom.active-fichas {
            color: #4da6ff !important;
            background: rgba(77, 166, 255, 0.1);
            border: 1px solid rgba(77, 166, 255, 0.2);
          }

          .nav-link-custom.active-edit {
            color: #ffca28 !important;
            background: rgba(255, 202, 40, 0.1);
            border: 1px solid rgba(255, 202, 40, 0.2);
          }

          .brand-logo {
            font-family: 'Special Elite', Courier, serif; /* Ou uma fonte impactante que você tenha */
            font-weight: 800;
            font-size: 1.3rem;
            text-shadow: 0 0 15px rgba(239, 68, 68, 0.4);
          }

          .btn-novo-agente {
            background: linear-gradient(45deg, #8b0000, #ef4444) !important;
            border: none !important;
            box-shadow: 0 0 15px rgba(239, 68, 68, 0.3);
            transition: all 0.3s ease !important;
          }

          .btn-novo-agente:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 20px rgba(239, 68, 68, 0.5);
            filter: brightness(1.2);
          }
        `}
      </style>

      <Navbar variant="dark" expand="lg" className="navbar-custom" sticky="top">
        <Container>
          <Navbar.Brand
            onClick={() => navigate("/")}
            className="d-flex align-items-center gap-3"
            style={{ cursor: "pointer", padding: "5px 0" }}
          >
            {/* IMAGEM 1: SÍMBOLO MAIOR */}
            <img
              src="/Sprites/Simbolo_Maior.png"
              alt="Ordem"
              style={{
                height: "55px",
                width: "auto",
                filter: "drop-shadow(0 0 10px rgba(255,255,255,0.3))",
                transition: "all 0.3s ease",
              }}
              className="brand-img"
            />

            {/* IMAGEM 2: OP LOGO */}
            <img
              src="/Sprites/op-logo.png"
              alt="Paranormal"
              style={{
                height: "45px",
                width: "auto",
                filter: "drop-shadow(0 0 12px rgba(239, 68, 68, 0.5))",
                transition: "all 0.3s ease",
              }}
              className="brand-img"
            />
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="border-0 shadow-none"
          />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto gap-2 align-items-center">
              {currentTrackUrl && (
                <div className="me-lg-3 py-2">
                  <AtmospherePlayer currentTrackUrl={currentTrackUrl} />
                </div>
              )}

              <Nav.Link
                onClick={() => navigate("/")}
                className={`nav-link-custom ${isActive("/") ? "active-home" : ""}`}
              >
                <Home size={16} /> Início
              </Nav.Link>

              <Nav.Link
                onClick={() => navigate("/fichas")}
                className={`nav-link-custom ${isActive("/fichas") ? "active-fichas" : ""}`}
              >
                <Users size={16} /> Agentes
              </Nav.Link>

              <Nav.Link
                onClick={() => navigate("/preEdicao")}
                className={`nav-link-custom ${isActive("/preEdicao") ? "active-edit" : ""}`}
              >
                <Settings2 size={16} /> Modificar
              </Nav.Link>

              <Button
                className="btn-novo-agente ms-lg-3 d-flex align-items-center gap-2"
                onClick={() => navigate("/editor")}
              >
                <FileEdit size={16} />
                <span style={{ fontWeight: 800 }}>RECRUTAR</span>
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
