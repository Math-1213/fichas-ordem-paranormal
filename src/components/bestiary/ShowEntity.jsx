import { Button, Row, Col } from "react-bootstrap";
import { ArrowLeft, Edit3, Shield, Heart, Zap } from "lucide-react";

export default function ShowEntity({ entity, onBack, onEdit }) {
  return (
    <div className="animate__animated animate__fadeIn">
      <Button variant="link" className="text-white-50 p-0 mb-4 text-decoration-none" onClick={onBack}>
        <ArrowLeft size={16} /> VOLTAR PARA LISTA
      </Button>

      <Row>
        <Col lg={4}>
          <img src={entity.image} className="img-fluid border border-white border-opacity-10 mb-3" alt={entity.name} />
          <div className="p-3 bg-dark border-start border-danger">
            <h6 className="tiny-label mb-3">Status de Combate</h6>
            <div className="d-flex justify-content-between mb-2"><span><Heart size={14}/> PV</span> <strong>{entity.stats?.pv}</strong></div>
            <div className="d-flex justify-content-between mb-2"><span><Shield size={14}/> Defesa</span> <strong>{entity.stats?.defesa}</strong></div>
            <div className="d-flex justify-content-between"><span><Zap size={14}/> VD</span> <strong>{entity.stats?.vd}</strong></div>
          </div>
        </Col>
        <Col lg={8}>
          <h1 className="display-4 fw-black text-uppercase">{entity.name}</h1>
          <h5 className="text-danger tracking-widest mb-4">{entity.element}</h5>
          
          <div className="mb-5">
            <h6 className="tiny-label opacity-50">Descrição Fenomenológica</h6>
            <p className="lead text-white-800">{entity.description}</p>
          </div>

          <Button variant="light" className="fw-bold px-4" onClick={onEdit}>
            <Edit3 size={16} className="me-2" /> EDITAR ARQUIVO
          </Button>
        </Col>
      </Row>
    </div>
  );
}