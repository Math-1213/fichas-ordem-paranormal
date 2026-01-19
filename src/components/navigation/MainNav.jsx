import {
  Navbar,
  Container,
  Nav,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { Home, Users, FileEdit, Settings2, Radio, ScanEye } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import AtmospherePlayer from "../ui/AtmospherePlayer";

export default function MainNav({ currentTrackUrl, compact = false }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const NavItem = ({ path, icon: Icon, label, activeClass }) => {
    const content = (
      <Nav.Link
        onClick={() => navigate(path)}
        className={`nav-link-custom ${isActive(path) ? activeClass : ""} ${compact ? "px-2 justify-content-center" : ""}`}
      >
        <Icon size={compact ? 20 : 16} />
        {!compact && <span>{label}</span>}
      </Nav.Link>
    );

    return compact ? (
      <OverlayTrigger placement="bottom" overlay={<Tooltip>{label}</Tooltip>}>
        {content}
      </OverlayTrigger>
    ) : (
      content
    );
  };

  return (
    <>
      <style>
        {`
          .navbar-custom {
            background: linear-gradient(to bottom, #0d1117 0%, #05070a 100%) !important;
            border-bottom: 2px solid #1f242d;
            padding: ${compact ? "0.2rem 0" : "0.75rem 0"};
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            transition: all 0.3s ease;
            min-height: ${compact ? "50px" : "auto"};
          }

          .nav-link-custom {
            color: #9aa0b3 !important;
            font-weight: 600;
            font-size: 0.85rem;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            padding: ${compact ? "6px" : "8px 15px"} !important;
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

          /* Classes Ativas com as cores dos Elementos */
          .nav-link-custom.active-home { color: #fff !important; border-bottom: 2px solid #fff; border-radius: 0; }
          .nav-link-custom.active-fichas { color: #ffea00 !important; background: rgba(255, 234, 0, 0.1); border: 1px solid rgba(255, 234, 0, 0.2); } /* Conhecimento */
          .nav-link-custom.active-edit { color: #9D00FF !important; background: rgba(157, 0, 255, 0.1); border: 1px solid rgba(157, 0, 255, 0.2); } /* Energia */
          .nav-link-custom.active-session { color: #ffffff !important; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); } /* Medo */
          
          /* Nova Classe: Bestiário (Morte) */
          .nav-link-custom.active-bestiary { 
            color: #757575 !important; 
            background: rgba(117, 117, 117, 0.1); 
            border: 1px solid rgba(117, 117, 117, 0.2); 
          }

          .btn-novo-agente {
            background: linear-gradient(45deg, #8b0000, #ff1744) !important; /* Sangue */
            border: none !important;
            padding: ${compact ? "5px 10px" : "default"};
            transition: all 0.3s ease !important;
            box-shadow: 0 0 15px rgba(255, 23, 68, 0.2);
          }
          
          .btn-novo-agente:hover {
            box-shadow: 0 0 20px rgba(255, 23, 68, 0.4);
            transform: scale(1.05);
          }

          .scale-down { transform: scale(0.9); }
        `}
      </style>

      <Navbar variant="dark" expand="lg" className="navbar-custom" sticky="top">
        <Container fluid={compact}>
          <Navbar.Brand
            onClick={() => navigate("/")}
            className="d-flex align-items-center gap-2"
            style={{ cursor: "pointer" }}
          >
            <img
              src="/Sprites/Simbolo_Maior.png"
              alt="Ordem"
              style={{
                height: compact ? "35px" : "55px",
                width: "auto",
                filter: "drop-shadow(0 0 10px rgba(255,255,255,0.3))",
                transition: "all 0.3s ease",
              }}
            />
            {!compact && (
              <img
                src="/Sprites/op-logo.png"
                alt="Paranormal"
                style={{
                  height: "45px",
                  width: "auto",
                  filter: "drop-shadow(0 0 12px rgba(239, 68, 68, 0.5))",
                }}
              />
            )}
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="border-0 shadow-none"
          />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto gap-2 align-items-center">
              {currentTrackUrl && (
                <div
                  className={`${compact ? "me-2 scale-down" : "me-lg-3"} py-1`}
                >
                  <AtmospherePlayer currentTrackUrl={currentTrackUrl} />
                </div>
              )}

              <NavItem
                path="/"
                icon={Home}
                label="Início"
                activeClass="active-home"
              />
              <NavItem
                path="/fichas"
                icon={Users}
                label="Agentes"
                activeClass="active-fichas"
              />
              <NavItem
                path="/preEdicao"
                icon={Settings2}
                label="Modificar"
                activeClass="active-edit"
              />
              <NavItem
                path="/session"
                icon={Radio}
                label="Sessão"
                activeClass="active-session"
              />
              <NavItem
                path="/bestiary"
                icon={ScanEye}
                label="Bestiário"
                activeClass="active-bestiary"
              />

              <Button
                className={`btn-novo-agente ${compact ? "ms-1" : "ms-lg-3"} d-flex align-items-center gap-2`}
                onClick={() => navigate("/editor")}
              >
                <FileEdit size={16} />
                {!compact && <span style={{ fontWeight: 800 }}>RECRUTAR</span>}
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
