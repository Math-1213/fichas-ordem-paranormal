import React from "react";
import { Badge, Button } from "react-bootstrap";

export default function SessionHeader({ displayMode, setDisplayMode }) {
  return (
    <div className="d-flex justify-content-between align-items-center px-3 py-2 border-bottom border-danger bg-dark-soft shadow-sm">
      <div className="d-flex align-items-center gap-3">
        <Badge bg="danger" className="tiny-label pulse">SESSÃO ATIVA</Badge>
        <div className="tiny-label tracking-widest text-white-50">OPERAÇÃO: CÉU DE SANGUE</div>
      </div>
      <div className="d-flex gap-2">
        <Button 
          variant={displayMode === "CENA" ? "light" : "outline-light"} 
          className="btn-sm tiny-label px-3" 
          onClick={() => setDisplayMode("CENA")}
        >CENÁRIO</Button>
        <Button 
          variant={displayMode === "INIMIGO" ? "danger" : "outline-danger"} 
          className="btn-sm tiny-label px-3" 
          onClick={() => setDisplayMode("INIMIGO")}
        >COMBATE</Button>
      </div>
    </div>
  );
}