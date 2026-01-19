import React from "react";
import { Radio, Eye, Skull, ShieldAlert, Volume2 } from "lucide-react";
import { Button } from "react-bootstrap";

export default function MasterControls() {
  return (
    <div className="side-panel border-start border-secondary p-2 d-flex flex-column gap-3" style={{ width: "260px" }}>
      <div className="section-title tiny-label text-info mb-2 d-flex align-items-center">
        <Radio size={14} className="me-2" /> COMANDOS
      </div>
      <div className="d-grid gap-2">
        <Button variant="outline-light" className="btn-sm tiny-label text-start py-2 border-secondary">
          <Eye size={12} className="me-2 text-info" /> MOSTRAR PISTA
        </Button>
        <Button variant="outline-light" className="btn-sm tiny-label text-start py-2 border-secondary">
          <Skull size={12} className="me-2 text-danger" /> DANO EM ÁREA
        </Button>
        <Button variant="outline-danger" className="btn-sm tiny-label text-start py-2 mt-3 fw-bold">
          <ShieldAlert size={12} className="me-2" /> EMERGÊNCIA
        </Button>
      </div>
      <div className="mt-auto">
        <div className="tiny-label text-white-50 mb-2">MASTER VOLUME</div>
        <div className="d-flex align-items-center gap-2">
          <Volume2 size={16} />
          <input type="range" className="form-range custom-range" />
        </div>
      </div>
    </div>
  );
}