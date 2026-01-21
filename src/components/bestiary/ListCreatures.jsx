import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Form,
  InputGroup,
  Collapse,
} from "react-bootstrap";
import {
  Plus,
  Activity,
  Shield,
  Search,
  Maximize,
  Target,
  Filter,
  X,
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

const TYPES = ["Criatura", "Animal", "Pessoa", "Objeto"];

export default function ListCreatures({ entities, onSelect, onCreate }) {
  // ESTADOS DOS FILTROS
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterSize, setFilterSize] = useState("");
  const [filterElements, setFilterElements] = useState([]); // Array para múltiplos elementos
  const [showFilters, setShowFilters] = useState(false);

  // LÓGICA DE FILTRAGEM MULTI-CRITÉRIO
  const filteredEntities = entities.filter((entity) => {
    const matchName = entity.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchType = filterType === "" || entity.type === filterType;
    const matchSize = filterSize === "" || entity.size === filterSize;
    const matchElement =
      filterElements.length === 0 ||
      filterElements.includes(entity.element?.toLowerCase());

    return matchName && matchType && matchSize && matchElement;
  });

  const toggleElement = (el) => {
    setFilterElements((prev) =>
      prev.includes(el) ? prev.filter((item) => item !== el) : [...prev, el],
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilterType("");
    setFilterSize("");
    setFilterElements([]);
  };

  return (
    <div className="animate__animated animate__fadeIn p-4 bg-black text-light min-vh-100">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom border-danger pb-4">
        <div>
          <h1 className="main-title mb-0 display-4 fw-black text-uppercase">
            Bestiário
          </h1>
          <div
            className="d-flex align-items-center gap-2"
            style={{ color: "#888" }}
          >
            <Target size={14} className="text-danger" />
            <span className="tiny-label" style={{ letterSpacing: "3px" }}>
              ORDO_REALITAS // FILTRO_AVANÇADO
            </span>
          </div>
        </div>
        <div className="d-flex gap-2">
          <Button
            variant="outline-secondary"
            className={`btn-militar px-3 ${showFilters ? "active text-danger" : ""}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={18} />
          </Button>
          <Button
            variant="danger"
            className="btn-militar px-4 fw-bold"
            onClick={onCreate}
          >
            <Plus size={20} className="me-2" /> NOVO REGISTRO
          </Button>
        </div>
      </div>

      {/* PAINEL DE FILTROS */}
      <div
        className="mb-5 p-3 rounded"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid #222",
        }}
      >
        <Row className="g-3">
          {/* BUSCA POR NOME */}
          <Col lg={4}>
            <Form.Label className="tiny-label text-danger">
              NOME_AMEAÇA
            </Form.Label>
            <InputGroup>
              <InputGroup.Text className="bg-transparent border-secondary text-danger">
                <Search size={16} />
              </InputGroup.Text>
              <Form.Control
                placeholder="Ex: Aberração..."
                className="bg-transparent border-secondary text-white shadow-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Col>

          {/* FILTRO DE TIPO */}
          <Col lg={2}>
            <Form.Label className="tiny-label text-danger">
              CATEGORIA
            </Form.Label>
            <Form.Select
              className="bg-transparent border-secondary text-white shadow-none"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="" className="bg-dark">
                Todos
              </option>
              {TYPES.map((t) => (
                <option key={t} value={t} className="bg-dark">
                  {t}
                </option>
              ))}
            </Form.Select>
          </Col>

          {/* FILTRO DE TAMANHO */}
          <Col lg={2}>
            <Form.Label className="tiny-label text-danger">ESCALA</Form.Label>
            <Form.Select
              className="bg-transparent border-secondary text-white shadow-none"
              value={filterSize}
              onChange={(e) => setFilterSize(e.target.value)}
            >
              <option value="" className="bg-dark">
                Todos
              </option>
              {Object.entries(SIZE_MAP).map(([val, label]) => (
                <option key={val} value={val} className="bg-dark">
                  {label}
                </option>
              ))}
            </Form.Select>
          </Col>

          {/* FILTRO DE ELEMENTOS (MULTI-SELECT) */}
          <Col lg={4}>
            <Form.Label className="tiny-label text-danger">
              ASSINATURA_PARANORMAL
            </Form.Label>
            <div className="d-flex gap-2 flex-wrap mt-1">
              {Object.entries(ELEMENT_DATA)
                .filter(([k]) => k !== "vazio")
                .map(([key, data]) => (
                  <div
                    key={key}
                    onClick={() => toggleElement(key)}
                    title={key.toUpperCase()}
                    style={{
                      cursor: "pointer",
                      width: "30px",
                      height: "30px",
                      borderRadius: "4px",
                      border: `1px solid ${filterElements.includes(key) ? data.color : "#333"}`,
                      background: filterElements.includes(key)
                        ? `${data.color}44`
                        : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "0.2s",
                    }}
                  >
                    <img
                      src={data.icon}
                      alt={key}
                      style={{
                        width: "18px",
                        filter: filterElements.includes(key)
                          ? "none"
                          : "grayscale(1)",
                      }}
                    />
                  </div>
                ))}
              {(searchTerm ||
                filterType ||
                filterSize ||
                filterElements.length > 0) && (
                <Button
                  variant="link"
                  className="text-danger p-0 ms-2"
                  onClick={clearFilters}
                >
                  <X size={20} />
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </div>

      {/* GRID DE RESULTADOS */}
      <Row className="g-4">
        {filteredEntities.map((entity) => {
          const element =
            ELEMENT_DATA[entity.element?.toLowerCase()] || ELEMENT_DATA.medo;
          const displaySize =
            SIZE_MAP[entity.size?.toLowerCase()] || entity.size || "Médio";

          return (
            <Col key={entity.id} xl={3} lg={4} md={6}>
              <Card
                className="creature-card h-100 position-relative"
                onClick={() => onSelect(entity)}
                style={{
                  background: "#080808",
                  border: `1px solid ${element.color}33`,
                  cursor: "pointer",
                }}
              >
                <div className="scanline"></div>
                <div
                  className="d-flex justify-content-between align-items-start p-3 position-relative"
                  style={{ zIndex: 5 }}
                >
                  <div
                    className="badge-vd p-1 px-3 fw-bold"
                    style={{
                      background: element.color,
                      color: "#000",
                      fontSize: "0.75rem",
                      clipPath: "polygon(0 0, 100% 0, 85% 100%, 0 100%)",
                    }}
                  >
                    VD {entity.vd}
                  </div>
                  <div
                    className="text-uppercase font-monospace"
                    style={{ fontSize: "0.6rem", color: element.color }}
                  >
                    {entity.type || "Criatura"}
                  </div>
                </div>

                <div
                  className="image-container mx-3 position-relative"
                  style={{ height: "200px" }}
                >
                  <img
                    src={entity.image || "/Sprites/placeholder.png"}
                    className="w-100 h-100 object-fit-cover rounded-1 grayscale-filter"
                    style={{ objectPosition: "top center" }}
                  />
                  <div
                    className="image-overlay"
                    style={{
                      background: `linear-gradient(to top, #080808, transparent)`,
                    }}
                  ></div>
                </div>

                <Card.Body className="px-3 pb-3 pt-0">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span
                      className="fw-bold text-uppercase"
                      style={{
                        color: element.color,
                        fontSize: "0.65rem",
                        letterSpacing: "2px",
                      }}
                    >
                      {entity.element}
                    </span>
                    <div
                      className="d-flex align-items-center gap-1"
                      style={{ color: "#777", fontSize: "0.65rem" }}
                    >
                      <Maximize size={10} /> <span>{displaySize}</span>
                    </div>
                  </div>
                  <h5 className="fw-black text-white text-uppercase tracking-tight">
                    {entity.name}
                  </h5>
                </Card.Body>
                <div
                  style={{
                    height: "4px",
                    background: element.color,
                    width: "100%",
                  }}
                ></div>
              </Card>
            </Col>
          );
        })}
      </Row>

      <style>{`
        .tiny-label { font-size: 0.6rem; font-weight: bold; letter-spacing: 1px; display: block; margin-bottom: 4px; }
        .font-monospace { font-family: 'JetBrains Mono', monospace; }
        .creature-card { transition: 0.3s; }
        .creature-card:hover { transform: translateY(-5px); border-color: #555 !important; }
        .grayscale-filter { filter: grayscale(100%) brightness(0.6); transition: 0.4s; }
        .creature-card:hover .grayscale-filter { filter: grayscale(0%) brightness(1); }
        .scanline { width: 100%; height: 100%; position: absolute; background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%); background-size: 100% 4px; pointer-events: none; opacity: 0.2; }
      `}</style>
    </div>
  );
}
