import { Row, Col, Card, Button, Badge } from "react-bootstrap";
import { Plus } from "lucide-react";
import { ELEMENT_DATA } from "../../configs/paranormal";

export default function ListCreatures({ entities, onSelect, onCreate }) {
  return (
    <div className="animate__animated animate__fadeIn">
      <div className="d-flex justify-content-between align-items-end mb-5">
        <div>
          <h6 className="tiny-label text-danger mb-1">Database // Ameaças</h6>
          <h1 className="main-title mb-0">BESTIÁRIO</h1>
        </div>
        <Button variant="outline-danger" className="btn-militar" onClick={onCreate}>
          <Plus size={18} /> NOVO REGISTRO
        </Button>
      </div>

      <Row className="g-4">
        {entities.map((entity) => {
          const element = ELEMENT_DATA[entity.element?.toLowerCase()] || ELEMENT_DATA.medo;
          return (
            <Col key={entity.id} xl={3} lg={4} md={6}>
              <Card className="access-card h-100" onClick={() => onSelect(entity)}>
                <div style={{ height: "180px", overflow: "hidden" }}>
                  <Card.Img src={entity.image || "/Sprites/placeholder.png"} className="h-100 w-100 object-fit-cover opacity-75" />
                </div>
                <Card.Body className="border-top" style={{ borderLeft: `3px solid ${element.color}` }}>
                  <div className="d-flex justify-content-between small opacity-50 mb-1">
                    <span>{entity.element}</span>
                    <span>VD {entity.stats?.vd}</span>
                  </div>
                  <h5 className="fw-black mb-0">{entity.name}</h5>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}