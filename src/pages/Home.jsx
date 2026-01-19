import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Lock, Terminal } from "lucide-react";
import { ELEMENT_DATA } from "../configs/paranormal";

export default function HomePage() {
  const navigate = useNavigate();
  const [logoError, setLogoError] = useState(false);

  const menuItems = [
    {
      title: "BANCO DE DADOS",
      subtitle: "ARQUIVOS DE AGENTES",
      desc: "Acessar registros históricos e fichas de investigadores ativos no campo.",
      path: "/fichas",
      element: "conhecimento",
    },
    {
      title: "MODIFICAR",
      subtitle: "REESTRUTURAR ATIVOS",
      desc: "Atualizar inventário, rituais e integridade física de agentes registrados.",
      path: "/preEdicao",
      element: "energia",
    },
    {
      title: "RECRUTAR",
      subtitle: "NOVO PROTOCOLO",
      desc: "Iniciar processo de triagem e registro de novo ativo paranormal.",
      path: "/editor",
      element: "sangue",
    },
    {
      title: "BESTIÁRIO",
      subtitle: "ENTIDADES REGISTRADAS",
      desc: "Catálogo de ameaças paranormais, fraquezas e comportamentos.",
      path: "/bestiary",
      element: "morte",
    },
    {
      title: "SESSÃO",
      subtitle: "OPERAÇÃO ATIVA",
      desc: "Interface de monitoramento de campo e combate tático em tempo real.",
      path: "/session",
      element: "medo",
    },
  ];

  return (
    <Container
      className="d-flex align-items-center justify-content-center py-5"
      style={{ minHeight: "90vh" }}
    >
      <div className="w-100">
        {/* HEADER TÉCNICO COM LOGO OU TEXTO */}
        <div className="text-center mb-5">
          <div className="d-flex justify-content-center align-items-center gap-3 mb-2">
            <div className="h-line flex-grow-1 opacity-25"></div>

            <div className="logo-container">
              {!logoError ? (
                <img
                  src="/Sprites/Logo_Ordo_Realitas.png"
                  alt="ORDO REALITAS"
                  className="main-logo"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <h1 className="main-title mb-0">ORDO REALITAS</h1>
              )}
            </div>

            <div className="h-line flex-grow-1 opacity-25"></div>
          </div>

          <div className="d-flex justify-content-center gap-4 tiny-label text-white-50">
            <span>
              <Lock size={10} /> ENCRYPTION: AES-256
            </span>
            <span>
              <Terminal size={10} /> STATUS: ONLINE
            </span>
            <span>ID: C.R.I.S-7.4.2</span>
          </div>
        </div>

        {/* GRID DE ACESSO */}
        <Row className="g-3 justify-content-center">
          {menuItems.map((item, idx) => {
            const data = ELEMENT_DATA[item.element];
            return (
              <Col key={idx} xl={2} lg={4} md={6}>
                <div
                  className="access-card h-100 p-4 d-flex flex-column gap-3 cursor-pointer"
                  style={{ borderLeft: `4px solid ${data.color}` }}
                  onClick={() => navigate(item.path)}
                >
                  <div className="d-flex justify-content-between align-items-start">
                    <img
                      src={data.icon}
                      alt={item.element}
                      style={{
                        height: "40px",
                        filter: `drop-shadow(0 0 5px ${data.color}66)`,
                      }}
                    />
                    <span className="opacity-25 fw-bold text-white">
                      0{idx + 1}
                    </span>
                  </div>

                  <div>
                    <div className="tiny-label opacity-50 mb-1 text-white">
                      {item.subtitle}
                    </div>
                    <h4 className="fw-black mb-2" style={{ color: data.color }}>
                      {item.title}
                    </h4>
                    <p className="extra-small text-white-50 mb-0 leading-tight">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-auto pt-3 border-top border-dark border-opacity-50 text-white">
                    <div className="d-flex justify-content-between align-items-center tiny-label">
                      <span style={{ color: data.color }}>INICIAR ACESSO</span>
                      <span className="opacity-50">→</span>
                    </div>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>

        <div className="mt-5 pt-4 text-center border-top border-white border-opacity-10 text-secondary">
          <p className="extra-small tracking-widest mb-0 opacity-50">
            ESTE TERMINAL É PROPRIEDADE DA ORDEM. O ACESSO NÃO AUTORIZADO
            RESULTARÁ EM RECOLHIMENTO IMEDIATO.
          </p>
        </div>
      </div>

      <style>{`
        .main-logo {
          height: 160px;
          /* Tingir de branco: brilho 0 deixa preto, invert 1 deixa branco */
          filter: brightness(0) invert(1) drop-shadow(0 0 10px rgba(255,255,255,0.2));
          transition: all 0.3s ease;
        }

        .main-title {
          font-family: 'Tarocco OT W03 Roman','Crimson Text', Arial, serif;
          font-weight: 900;
          letter-spacing: 8px;
          color: #fff;
          text-shadow: 0 0 20px rgba(255,255,255,0.1);
        }

        .h-line { height: 1px; background: white; max-width: 150px; }

        .access-card {
          background: #080808;
          border-top: 1px solid #1a1a1a;
          border-right: 1px solid #1a1a1a;
          border-bottom: 1px solid #1a1a1a;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .access-card:hover {
          background: #111;
          transform: translateY(-8px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.7);
        }

        .access-card::before {
          content: " ";
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background-size: 100% 4px;
          pointer-events: none;
        }

        .tiny-label { font-size: 0.65rem; letter-spacing: 2px; font-weight: 800; text-transform: uppercase; }
        .extra-small { font-size: 0.75rem; }
        .fw-black { font-weight: 900; letter-spacing: 1px; }
        .leading-tight { line-height: 1.3; }
      `}</style>
    </Container>
  );
}
