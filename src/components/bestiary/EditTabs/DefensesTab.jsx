import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { Shield, Activity, Heart } from 'lucide-react';

export default function DefensesTab({ formData, handleChange }) {
  return (
    <div className="cyber-panel p-4">
      <Row className="g-4 mb-4">
        <Col md={6}>
          <div className="status-box-cyber">
            <div className="label"><Heart size={14}/> PONTOS_DE_VIDA</div>
            <input type="number" value={formData.stats.pv} onChange={e => handleChange("stats.pv", e.target.value)} />
          </div>
        </Col>
        <Col md={6}>
          <div className="status-box-cyber defense">
            <div className="label"><Shield size={14}/> DEFESA_TOTAL</div>
            <input type="number" value={formData.stats.defesa} onChange={e => handleChange("stats.defesa", e.target.value)} />
          </div>
        </Col>
      </Row>

      <Row className="g-3 border-top border-secondary pt-4">
        <Col md={12}><h6 className="text-info mono-small">PRESENÇA_PERTURBADORA</h6></Col>
        <Col md={4}><label className="cyber-label">DT_RESISTENCIA</label><Form.Control type="number" className="cyber-input" value={formData.presence.dt} onChange={e => handleChange("presence.dt", e.target.value)} /></Col>
        <Col md={4}><label className="cyber-label">DANO_MENTAL</label><Form.Control className="cyber-input" value={formData.presence.damage} onChange={e => handleChange("presence.damage", e.target.value)} /></Col>
        <Col md={4}><label className="cyber-label">IMUNIDADE</label><Form.Control className="cyber-input" value={formData.presence.immune} onChange={e => handleChange("presence.immune", e.target.value)} /></Col>
      </Row>

      <Row className="g-3 mt-4">
        <Col md={4}>
          <label className="cyber-label text-info">IMUNIDADES</label>
          <Form.Control as="textarea" rows={3} className="cyber-input" placeholder="Dano crítico, Sangue..." value={formData.immunities.join(', ')} onChange={e => handleChange("immunities", e.target.value.split(', '))} />
        </Col>
        <Col md={4}>
          <label className="cyber-label text-warning">RESISTÊNCIAS</label>
          <Form.Control as="textarea" rows={3} className="cyber-input" placeholder="Corte 10, Energia 5..." value={formData.resistances.join(', ')} onChange={e => handleChange("resistances", e.target.value.split(', '))} />
        </Col>
        <Col md={4}>
          <label className="cyber-label text-danger">VULNERABILIDADES</label>
          <Form.Control as="textarea" rows={3} className="cyber-input" placeholder="Morte, Fogo..." value={formData.vulnerabilities.join(', ')} onChange={e => handleChange("vulnerabilities", e.target.value.split(', '))} />
        </Col>
      </Row>
    </div>
  );
}