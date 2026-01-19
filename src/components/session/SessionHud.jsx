import React, { useState } from "react";
import SessionHeader from "./SessionHeader";
import PartyPanel from "./PartyPanel";
import TacticalDisplay from "./TacticalDisplay";
import MasterControls from "./MasterControls";

export default function SessionHud() {
  const [displayMode, setDisplayMode] = useState("INIMIGO");
  const [activeMusic] = useState("Investigação Sombria - Loop");

  const party = [
    { nome: "Thiago", status: "Saudável", falando: true },
    { nome: "Elizabeth", status: "Ferida", falando: false },
    { nome: "Arthur", status: "Enlouquecendo", falando: false },
  ];

  const boss = {
    nome: "O ENIGMATA",
    tipo: "Existencial / Sangue",
    vidaAtual: 140,
    vidaMax: 200,
    imagem: "https://via.placeholder.com/600x400/100000/ff4444?text=O+ENIGMATA",
  };

  return (
    <div className="session-wrapper bg-black text-white vh-100 overflow-hidden d-flex flex-column">
      <SessionHeader
        displayMode={displayMode}
        setDisplayMode={setDisplayMode}
      />

      <div className="flex-grow-1 d-flex">
        <PartyPanel party={party} activeMusic={activeMusic} />
        <TacticalDisplay mode={displayMode} boss={boss} />
        <MasterControls />
      </div>

      <style>{`
        .bg-dark-soft { background: #050505; }
        .tiny-label { font-size: 0.6rem; letter-spacing: 2px; font-weight: 800; text-transform: uppercase; }
        .fw-black { font-weight: 900; }
        .extra-small { font-size: 0.75rem; }
        .agent-mini-card { display: flex; align-items: center; padding: 10px; background: #0a0a0a; border: 1px solid #1a1a1a; margin-bottom: 5px; }
        .agent-mini-card.active { border-color: #ff4444; background: #1a0505; }
        .portrait-circle { width: 38px; height: 38px; border-radius: 50%; background: #222; position: relative; border: 1px solid #333; flex-shrink: 0; }
        .voice-wave { position: absolute; top: -2px; left: -2px; right: -2px; bottom: -2px; border: 2px solid #ff4444; border-radius: 50%; animation: ripple 1.5s infinite; }
        .corner-target { position: absolute; width: 20px; height: 20px; border: 2px solid #ff4444; }
        .tl { top: -10px; left: -10px; border-right: 0; border-bottom: 0; }
        .tr { top: -10px; right: -10px; border-left: 0; border-bottom: 0; }
        .bl { bottom: -10px; left: -10px; border-right: 0; border-top: 0; }
        .br { bottom: -10px; right: -10px; border-left: 0; border-top: 0; }
        @keyframes ripple { 0% { transform: scale(1); opacity: 1; } 100% { transform: scale(1.4); opacity: 0; } }
        .pulse { animation: pulse-red 2s infinite; }
        @keyframes pulse-red { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        .custom-range::-webkit-slider-thumb { background: #ff4444; }
      `}</style>
    </div>
  );
}
