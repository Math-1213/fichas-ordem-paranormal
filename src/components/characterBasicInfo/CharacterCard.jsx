import { Card, Row, Col, Badge, ProgressBar } from "react-bootstrap";
import { ELEMENT_DATA } from "../../configs/paranormal";
import { User, MapPin, Heart, Brain, Zap } from "lucide-react";

export default function CharacterCard({ char, onSelect }) {
  const elementColor = ELEMENT_DATA[char.afinidade?.toLowerCase()]?.color || "#2a2f3e";
  const elementIcon = ELEMENT_DATA[char.afinidade?.toLowerCase()]?.icon;
  const hasPortrait = !!char.portrait;

  // Função auxiliar para barras (Texto em Light para leitura clara)
  const MiniBar = ({ label, current, max, color, icon: Icon }) => (
    <div className="mb-2">
      <div className="d-flex justify-content-between align-items-center mb-1" style={{ fontSize: "0.85rem" }}>
        <span className="text-light opacity-75 d-flex align-items-center fw-bold">
          <Icon size={14} className="me-2" /> {label}
        </span>
        <span className="text-light fw-bold">{current}/{max}</span>
      </div>
      <ProgressBar
        now={(current / max) * 100}
        style={{ height: "6px", backgroundColor: "#000000" }}
        variant={color}
      />
    </div>
  );

  return (
    <Card
      onClick={() => onSelect(char.id)}
      className="shadow-sm mb-3 border-0"
      style={{
        cursor: "pointer",
        backgroundColor: "#12151a",
        borderLeft: `5px solid ${elementColor}`,
        transition: "all 0.3s ease",
        overflow: "hidden",
        width: "100%",
        maxWidth: "500px",
        minHeight: "260px",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateX(8px)";
        e.currentTarget.style.backgroundColor = "#1a1e24";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateX(0)";
        e.currentTarget.style.backgroundColor = "#12151a";
      }}
    >
      <Row className="g-0 h-100">
        {hasPortrait && (
          <Col xs={4} style={{ position: "relative" }}>
            <img
              src={char.portrait}
              alt={char.nome}
              style={{ width: "100%", height: "100%", objectFit: "cover", minHeight: "260px" }}
            />
            <div style={{
              position: "absolute", top: 0, right: 0, bottom: 0, width: "100%",
              background: "linear-gradient(to right, transparent, #12151a 92%)",
            }} />
          </Col>
        )}

        <Col className="p-4 d-flex flex-column">
          {/* HEADER: NOME E NEX */}
          <div className="d-flex justify-content-between align-items-start mb-1 gap-2">
            <h4 className="mb-0 fw-bold text-light" style={{ fontSize: "1.4rem" }}>
              {char.nome}
            </h4>
            <Badge bg="none" className="border" style={{ borderColor: `${elementColor}aa`, color: elementColor }}>
              {char.nex || 0}% NEX
            </Badge>
          </div>

          {/* CLASSE E TRILHA (Quebra de linha aplicada) */}
          <div className="mb-3">
            <div className="fw-bold" style={{ color: "#0dcaf0", fontSize: "0.9rem" }}>
               {char.classe?.toUpperCase()}
            </div>
            {char.trilha && (
              <div className="text-light opacity-50 fw-bold" style={{ fontSize: "0.75rem", letterSpacing: "1px" }}>
                {char.trilha.toUpperCase()}
              </div>
            )}
          </div>

          {/* DADOS (Origem e Patente mais claros) */}
          <Row className="mb-3 g-2">
            <Col xs={6}>
              <span className="d-block fw-bold" style={{ color: elementColor, fontSize: '0.65rem' }}>ORIGEM</span>
              <span className="text-light">{char.origem || "—"}</span>
            </Col>
            <Col xs={6}>
              <span className="d-block fw-bold" style={{ color: elementColor, fontSize: '0.65rem' }}>PATENTE</span>
              <span className="text-light">{char.patente || "—"}</span>
            </Col>
          </Row>

          {/* STATUS VITAIS COM ELEMENTO COLORIDO */}
          <div className="position-relative flex-grow-1">
            <MiniBar label="PV" current={char.vida} max={char.vidaMax} color="danger" icon={Heart} />
            <MiniBar label="SAN" current={char.sanidade} max={char.sanidadeMax} color="primary" icon={Brain} />
            <MiniBar label="PE" current={char.esforco} max={char.esforcoMax} color="warning" icon={Zap} />
            
            {/* IMAGEM DO ELEMENTO TINGIDA */}
            {elementIcon && (
              <img 
                src={elementIcon} 
                alt="afinidade"
                style={{
                  position: "absolute",
                  bottom: "0px",
                  right: "0px",
                  width: "50px",
                  opacity: 0.4,
                  pointerEvents: "none",
                  // Filtro para aproximar a cor da imagem à cor do elemento
                  filter: `drop-shadow(0px 0px 5px ${elementColor}) brightness(1.5)`
                }}
              />
            )}
          </div>

          {/* FOOTER */}
          <div className="mt-3 pt-2 border-top border-dark d-flex justify-content-between align-items-center" style={{ fontSize: "0.75rem" }}>
            <div className="d-flex gap-3 text-light opacity-75 fw-bold">
              <span className="d-flex align-items-center"><User size={12} className="me-1" /> {char.idade} ANOS</span>
              <span className="d-flex align-items-center"><MapPin size={12} className="me-1" /> {char.nacionalidade}</span>
            </div>
            <span style={{ color: elementColor, fontSize: '0.6rem', fontWeight: 'bold' }}>NÍVEL {char.nivel}</span>
          </div>
        </Col>
      </Row>
    </Card>
  );
}