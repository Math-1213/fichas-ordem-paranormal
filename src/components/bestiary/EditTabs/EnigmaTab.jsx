import React from "react";
import { ShieldAlert, EyeOff, Lock } from "lucide-react";
import * as S from "./styles";

export default function EnigmaTab({ formData, handleChange }) {
  // Gerar um ID persistente por sessão (ou fixo) para não mudar a cada clique
  const docId = React.useMemo(
    () => Math.random().toString(36).toUpperCase().substring(2, 12),
    [],
  );

  return (
    <S.ConfidentialFolder>
      <div className="classified-tape">CLASSIFIED - TOP SECRET</div>
    
      <div className="watermark">VOID</div>

      {/* CABEÇALHO DO ARQUIVO */}
      <div className="confidential-header">
        <div>
          <h4 className="text-danger fw-black mb-1 mono">
            <ShieldAlert className="me-2" size={24} />
            ARQUIVO_CONFIDENCIAL_099
          </h4>
          <div className="confidential-subtitle">
            ASSUNTO: ENIGMA_DO_MEDO // ENTIDADE_DESCONHECIDA
          </div>
        </div>
        <div
          className="text-danger mono d-none d-md-block"
          style={{ fontSize: "0.7rem", fontWeight: "900", marginRight: '80px'}}
        >
          <EyeOff size={14} className="me-1" />
          ACESSO_RESTRITO_NIVEL_O5
        </div>
      </div>

      <div className="position-relative">
        <div
          className="d-flex justify-content-between mb-2 mono"
          style={{ fontSize: "0.6rem", color: "#ff0055", opacity: 0.6 }}
        >
          <span>{`> DECRYPTING_METHOD: HYPER_SIGIL_V2`}</span>
          <span style={{marginRight: '20px'}}>{`STATUS: ENCRYPTED`}</span>
        </div>

        <S.EnigmaTextArea
          placeholder="Transcreva aqui os segredos do Enigma do Medo..."
          value={formData.enigma}
          onChange={(e) => handleChange("enigma", e.target.value)}
        />

        {/* FOOTER DO DOCUMENTO */}
        <div className="mt-4 pt-3 border-top border-secondary border-opacity-25 d-flex justify-content-between align-items-center">
          <div
            className="mono"
            style={{ color: "#566573", fontSize: "0.65rem" }}
          >
            DOC_REF: ORD_{docId}
          </div>
          <div
            className="glitch-box"
            style={{
              background: "#ff0055",
              padding: "4px 12px",
              color: "#000",
              fontSize: "0.7rem",
              fontWeight: "900",
              clipPath: "polygon(5% 0, 100% 0, 95% 100%, 0 100%)",
            }}
          >
            <Lock size={12} className="me-1" /> CONTEÚDO_SENSÍVEL
          </div>
        </div>
      </div>
    </S.ConfidentialFolder>
  );
}