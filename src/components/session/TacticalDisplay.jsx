import React from "react";
import { ProgressBar } from "react-bootstrap";

export default function TacticalDisplay({ mode, boss }) {
  return (
    <div className="flex-grow-1 bg-dark-soft position-relative d-flex align-items-center justify-content-center p-4">
      {mode === "INIMIGO" ? (
        <div className="enemy-display text-center">
          <div className="enemy-frame position-relative mb-3">
            <div className="corner-target tl" /><div className="corner-target tr" />
            <div className="corner-target bl" /><div className="corner-target br" />
            <img src={boss.imagem} alt="Enemy" className="img-fluid shadow-lg" style={{ maxHeight: "50vh" }} />
          </div>
          <h2 className="fw-black text-danger tracking-widest mb-0">{boss.nome}</h2>
          <p className="tiny-label text-white-50">{boss.tipo}</p>
          <div className="mx-auto" style={{ maxWidth: "400px" }}>
            <div className="d-flex justify-content-between tiny-label mb-1">
              <span>INTEGRIDADE FÍSICA</span>
              <span className="text-danger">{Math.round((boss.vidaAtual / boss.vidaMax) * 100)}%</span>
            </div>
            <ProgressBar now={(boss.vidaAtual / boss.vidaMax) * 100} variant="danger" className="bg-secondary" style={{ height: "8px" }} />
          </div>
        </div>
      ) : (
        <div className="scene-display text-center">
          <p className="text-white-50 tracking-widest mb-3">VISUALIZAÇÃO DE AMBIENTE ATIVA</p>
          <img src="https://images.unsplash.com/photo-1505635330303-d3f84fea91bd?auto=format&fit=crop&w=1200" className="img-fluid border border-secondary" style={{ maxHeight: "60vh" }} alt="Cenário" />
        </div>
      )}
      <div className="position-absolute bottom-0 end-0 p-3 tiny-label text-white-50">
        HUD-MODE: {mode} // C.R.I.S V1.0.4
      </div>
    </div>
  );
}