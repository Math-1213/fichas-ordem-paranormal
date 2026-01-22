import React, { useState } from "react";
import { Row, Col, Card, Button, Form, InputGroup } from "react-bootstrap";
import {
  Plus,
  Search,
  Maximize,
  Target,
  Filter,
  X,
  CircleOff,
  Activity,
  Shield,
  Hash,
  LayoutGrid,
} from "lucide-react";
import { ELEMENT_DATA } from "../../configs/paranormal";

const SIZE_MAP = {
  minusculo: "Minúsculo",
  pequeno: "Pequeno",
  medio: "Médio",
  grande: "Grande",
  enorme: "Enorme",
  colossal: "Colossal",
};

const TYPES = ["Criatura", "Animal", "Pessoa", "Objeto", "Enxame"];

export default function ListCreatures({ entities, onSelect, onCreate }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterSize, setFilterSize] = useState("");
  const [filterElements, setFilterElements] = useState([]);
  const [showFilters, setShowFilters] = useState(true);

  // LÓGICA DE FILTRAGEM CORRIGIDA
  const filteredEntities = entities.filter((entity) => {
    const nameMatch = entity.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const typeMatch = filterType === "" || entity.type === filterType;
    const sizeMatch = filterSize === "" || entity.size === filterSize;

    // Lógica para Elemento nulo (Sem Elemento)
    const elementMatch =
      filterElements.length === 0 ||
      filterElements.some((f) => {
        if (f === "vazio") return entity.element === null;
        return entity.element?.toLowerCase() === f;
      });

    return nameMatch && typeMatch && sizeMatch && elementMatch;
  });

  const toggleElement = (el) => {
    setFilterElements((prev) =>
      prev.includes(el) ? prev.filter((item) => item !== el) : [...prev, el],
    );
  };

  return (
    <div className="bestiary-container p-4 min-vh-100 text-light">
      {/* HEADER TIPO DASHBOARD */}
      <header className="mb-5 d-flex justify-content-between align-items-start border-start border-danger border-4 ps-4">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <LayoutGrid size={18} className="text-danger" />
            <span className="text-secondary fw-bold small tracking-widest">
              DATABASE_ACCESS / SYSTEM_V26
            </span>
          </div>
          <h1 className="display-4 fw-black text-uppercase m-0">Ameaças</h1>
        </div>
        <div className="d-flex gap-2">
          <Button
            variant="outline-secondary"
            className={`btn-cyber ${showFilters ? "active" : ""}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={18} className="me-2" /> FILTROS
          </Button>
          <Button
            variant="danger"
            className="btn-cyber fw-bold"
            onClick={onCreate}
          >
            <Plus size={18} className="me-2" /> INSERIR REGISTRO
          </Button>
        </div>
      </header>

      {/* PAINEL DE FILTROS REESTILIZADO */}
      {showFilters && (
        <div className="filter-glass mb-5 p-4 animate__animated animate__fadeIn">
          <Row className="g-3">
            <Col lg={3}>
              <div className="filter-label">BUSCAR_IDENTIDADE</div>
              <InputGroup className="cyber-input">
                <InputGroup.Text className="bg-transparent border-0">
                  <Search size={16} />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Nome do alvo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>

            <Col lg={2}>
              <div className="filter-label">CATEGORIA</div>
              <Form.Select
                className="cyber-select"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="">TODAS</option>
                {TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t.toUpperCase()}
                  </option>
                ))}
              </Form.Select>
            </Col>

            <Col lg={2}>
              <div className="filter-label">TAMANHO</div>
              <Form.Select
                className="cyber-select"
                value={filterSize}
                onChange={(e) => setFilterSize(e.target.value)}
              >
                <option value="">TODOS</option>
                {Object.entries(SIZE_MAP).map(([val, label]) => (
                  <option key={val} value={val}>
                    {label.toUpperCase()}
                  </option>
                ))}
              </Form.Select>
            </Col>

            <Col lg={5}>
              <div className="filter-label">ELEMENTOS</div>
              <div className="d-flex gap-2 align-items-top h-100 pt-0">
                {Object.entries(ELEMENT_DATA).map(([key, data]) => (
                  <div
                    key={key}
                    onClick={() => toggleElement(key)}
                    className={`element-chip ${filterElements.includes(key) ? "selected" : ""}`}
                    style={{ "--glow-color": data.color }}
                    title={key.toUpperCase()}
                  >
                    {key === "vazio" ? (
                      <CircleOff size={14} />
                    ) : (
                      <img src={data.icon} alt={key} />
                    )}
                  </div>
                ))}
                {filterElements.length > 0 && (
                  <Button
                    variant="link"
                    className="text-danger p-0 ms-2"
                    onClick={() => setFilterElements([])}
                  >
                    <X size={18} />
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        </div>
      )}

      {/* GRID DE CARDS */}
      <Row className="g-4">
        {filteredEntities.map((entity) => {
          const element =
            ELEMENT_DATA[entity.element?.toLowerCase()] || ELEMENT_DATA.vazio;
          const displaySize =
            SIZE_MAP[entity.size?.toLowerCase()] || entity.size || "Médio";

          return (
            <Col key={entity.id} xl={3} lg={4} md={6}>
              <Card className="cyber-card" onClick={() => onSelect(entity)}>
                {/* Metadata superior */}
                <div className="card-top-meta">
                  <span className="id-tag">
                    REG_{entity.id.substring(0, 4).toUpperCase()}
                  </span>
                  <div
                    className="vd-badge"
                    style={{ backgroundColor: element.color }}
                  >
                    VD {entity.vd}
                  </div>
                </div>

                <div className="image-wrapper">
                  {entity.image ? (
                    <img
                      src={entity.image}
                      alt={entity.name}
                      className="entity-img"
                    />
                  ) : (
                    <div className="no-data-placeholder">
                      <div className="glitch-text">NO_DATA</div>
                      <div className="scanner-line"></div>
                    </div>
                  )}

                  {/* Overlay de Elementos Secundários */}
                  <div className="secondary-elements">
                    {entity.secondaryElements?.map((sec, idx) => (
                      <img
                        key={idx}
                        src={ELEMENT_DATA[sec.toLowerCase()]?.icon}
                        title={sec}
                        className="sec-el-icon"
                      />
                    ))}
                  </div>

                  <div
                    className="element-indicator"
                    style={{ background: element.color }}
                  ></div>
                </div>

                <div className="p-3 bg-black">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span
                      className="type-label"
                      style={{ color: element.color }}
                    >
                      {entity.type || "CRIATURA"}
                    </span>
                    <span className="size-label text-uppercase">
                      <Maximize size={10} className="me-1" />
                      {displaySize}
                    </span>
                  </div>
                  <h4 className="entity-name text-uppercase">{entity.name}</h4>

                  {/* STATUS ROBUSTOS */}
                  <div className="stats-container mt-3">
                    <div className="stat-box hp">
                      <div className="stat-header">PONTOS_VIDA</div>
                      <div className="stat-value">
                        <Activity size={20} className="me-2" />
                        {entity.pv}
                      </div>
                    </div>
                    <div className="stat-box def">
                      <div className="stat-header">DEFESA</div>
                      <div className="stat-value">
                        <Shield size={20} className="me-2" />
                        {entity.defesa}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>

      <style>{`
.bestiary-container { background-color: #050505; font-family: 'JetBrains Mono', monospace; }
        .fw-black { font-weight: 900; }
        
        /* FILTROS */
        .filter-label { font-size: 0.65rem; color: #ff1744; font-weight: 800; margin-bottom: 8px; letter-spacing: 1px; }
        .filter-glass { background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 4px; }
        .cyber-input input, .cyber-select { background: #000 !important; border: 1px solid #333 !important; color: white !important; font-size: 0.85rem; }
        .element-chip { width: 32px; height: 32px; border-radius: 4px; border: 1px solid #222; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.2s; background: #000; }
        .element-chip img { width: 18px; filter: grayscale(1); opacity: 0.5; }
        .element-chip.selected { border-color: var(--glow-color); box-shadow: 0 0 10px var(--glow-color); }
        .element-chip.selected img { filter: none; opacity: 1; }

        /* CARDS */
        .cyber-card { background: #000; border: 1px solid #222; border-radius: 4px; overflow: hidden; transition: 0.3s; cursor: pointer; }
        .cyber-card:hover { border-color: #ff1744; transform: translateY(-5px); box-shadow: 0 0 20px rgba(255,23,68,0.15); }

        .card-top-meta { position: absolute; top: 0; left: 0; width: 100%; display: flex; justify-content: space-between; padding: 10px; z-index: 10; background: linear-gradient(to bottom, rgba(0,0,0,0.8), transparent); }
        .id-tag { font-size: 0.65rem; color: #666; font-weight: bold; }
        .vd-badge { padding: 2px 12px; font-weight: 900; color: #000; font-size: 0.85rem; clip-path: polygon(10% 0, 100% 0, 100% 100%, 0 100%); }

        .image-wrapper { height: 220px; position: relative; background: #080808; border-bottom: 1px solid #333; overflow: hidden; }
        .entity-img { width: 100%; height: 100%; object-fit: cover; object-position: top; filter: grayscale(100%) brightness(0.6); transition: 0.4s ease; }
        .cyber-card:hover .entity-img { filter: grayscale(0%) brightness(1); transform: scale(1.05); }

        .no-data-placeholder { height: 100%; display: flex; align-items: center; justify-content: center; background: #080808; position: relative; }
        .glitch-text { color: #222; font-weight: 900; letter-spacing: 5px; font-size: 1.2rem; }
        .scanner-line { position: absolute; width: 100%; height: 2px; background: rgba(255,0,0,0.2); top: 0; animation: scan 3s infinite linear; }
        @keyframes scan { 0% { top: 0; } 100% { top: 100%; } }

        .secondary-elements { position: absolute; bottom: 10px; right: 10px; display: flex; gap: 5px; z-index: 5; }
        .sec-el-icon { width: 22px; height: 22px; filter: drop-shadow(0 0 5px #000); }
        .element-indicator { position: absolute; bottom: 0; left: 0; width: 100%; height: 3px; }

        .entity-name { font-weight: 900; font-size: 1.25rem; color: #fff; margin: 5px 0; }
        .type-label { font-size: 0.6rem; font-weight: bold; letter-spacing: 1.5px; }
        .size-label { font-size: 0.6rem; color: #666; font-weight: bold; }

        .stats-container { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: #222; border: 1px solid #222; }
        .stat-box { background: #0a0a0a; padding: 10px; display: flex; flex-direction: column; }
        .stat-header { font-size: 0.5rem; color: #555; font-weight: bold; margin-bottom: 4px; }
        .stat-value { font-size: 1.6rem; font-weight: 900; display: flex; align-items: center; }
        .hp .stat-value { color: #ff1744; }
        .def .stat-value { color: #00e5ff; }
        .btn-cyber { border-radius: 0; letter-spacing: 1px; font-size: 0.8rem; }
      `}</style>
    </div>
  );
}
