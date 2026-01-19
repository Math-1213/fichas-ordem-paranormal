import React from "react";
import { Users, Music, Play } from "lucide-react";
import { ProgressBar } from "react-bootstrap";

export default function PartyPanel({ party, activeMusic }) {
  return (
    <div className="side-panel border-end border-secondary p-2 d-flex flex-column gap-2" style={{ width: "240px" }}>
      <div className="section-title tiny-label text-danger mb-1 d-flex align-items-center">
        <Users size={14} className="me-2" /> AGENTES
      </div>
      {party.map((char, i) => (
        <div key={i} className={`agent-mini-card ${char.falando ? "active" : ""}`}>
          <div className="portrait-circle">
            <div className="placeholder" />
            {char.falando && <div className="voice-wave" />}
          </div>
          <div className="ms-2">
            <div className="fw-bold extra-small text-truncate">{char.nome.toUpperCase()}</div>
            <div className={`tiny-label ${char.status === "Saudável" ? "text-success" : "text-warning"}`}>{char.status}</div>
          </div>
        </div>
      ))}

      <div className="mt-auto border-top border-secondary pt-3">
        <div className="section-title tiny-label text-warning mb-2 d-flex align-items-center">
          <Music size={14} className="me-2" /> ÁUDIO
        </div>
        <div className="bg-dark p-2 border border-secondary">
          <div className="extra-small text-warning text-truncate mb-1">{activeMusic}</div>
          <div className="d-flex align-items-center gap-2">
            <Play size={14} className="cursor-pointer text-white-50" />
            <ProgressBar now={65} variant="warning" style={{ height: "3px", flexGrow: 1 }} />
          </div>
        </div>
      </div>
    </div>
  );
}