import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import { Shield, Zap, Brain, Eye, Heart } from "lucide-react";
import * as S from "./styles";

const ATTR_CONFIG = {
  agilidade: { label: "AGI", icon: <Zap size={14} />, color: "#ffee58" },
  forca: { label: "FOR", icon: <Shield size={14} />, color: "#ff3b3b" },
  intelecto: { label: "INT", icon: <Brain size={14} />, color: "#3b82f6" },
  presenca: { label: "PRE", icon: <Eye size={14} />, color: "#a855f7" },
  vigor: { label: "VIG", icon: <Heart size={14} />, color: "#22c55e" },
};

export default function BasicInfoTab({ formData, handleChange }) {
  return (
    <div className="p-2">
      <Row className="g-4">
        {/* IDENTIFICAÇÃO BÁSICA */}
        <Col md={12}>
          <S.CyberLabel style={{ color: "#00f2ff" }}>
            Identificação_do_Alvo
          </S.CyberLabel>
          <Row className="g-3">
            <Col md={6}>
              <S.CyberLabel>Nome_Designado</S.CyberLabel>
              <Form.Control
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="bg-black border-secondary text-info fw-bold"
                style={{ borderRadius: "0", borderLeft: "3px solid #00f2ff" }}
              />
            </Col>
            <Col md={3}>
              <S.CyberLabel>Tipo_de_Entidade</S.CyberLabel>
              <Form.Select
                value={formData.type || ""}
                onChange={(e) => handleChange("type", e.target.value)}
                className="bg-black border-secondary text-light"
                style={{ borderRadius: "0" }}
              >
                <option value="Criatura">Criatura</option>
                <option value="Animal">Animal</option>
                <option value="Pessoa">Pessoa</option>
                <option value="Objeto">Objeto</option>
              </Form.Select>
            </Col>
            <Col md={3}>
              <S.CyberLabel>Nível_de_Ameaça (VD)</S.CyberLabel>
              <Form.Control
                type="number"
                value={formData.vd}
                onChange={(e) => handleChange("vd", e.target.value)}
                className="bg-black border-secondary text-danger fw-bold text-center"
                style={{ borderRadius: "0" }}
              />
            </Col>
          </Row>
        </Col>

        {/* LOGÍSTICA */}
        <Col md={12}>
          <Row className="g-3">
            <Col md={4}>
              <S.CyberLabel>Escala (Tamanho)</S.CyberLabel>
              <Form.Select
                value={formData.size || "medio"}
                onChange={(e) => handleChange("size", e.target.value)}
                className="bg-black border-secondary text-light"
                style={{ borderRadius: "0" }}
              >
                <option value="minusculo">Minúsculo</option>
                <option value="pequeno">Pequeno</option>
                <option value="medio">Médio</option>
                <option value="grande">Grande</option>
                <option value="enorme">Enorme</option>
                <option value="colossal">Colossal</option>
              </Form.Select>
            </Col>
            <Col md={4}>
              <S.CyberLabel>Capacidade_Deslocamento</S.CyberLabel>
              <Form.Control
                value={formData.displacement}
                onChange={(e) => handleChange("displacement", e.target.value)}
                className="bg-black border-secondary text-light"
                style={{ borderRadius: "0" }}
              />
            </Col>
          </Row>
        </Col>

        {/* MATRIZ DE ATRIBUTOS */}
        <Col md={12} className="mt-5">
          <S.CyberLabel style={{ color: "#ffee58" }}>
            Matriz_de_Atributos
          </S.CyberLabel>
          <div className="d-flex justify-content-between gap-2 flex-wrap">
            {Object.entries(ATTR_CONFIG).map(([key, cfg]) => (
              <div
                key={key}
                style={{
                  flex: "1",
                  minWidth: "100px",
                  background: "rgba(0,0,0,0.4)",
                  border: `1px solid ${cfg.color}44`,
                  borderBottom: `3px solid ${cfg.color}`,
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    color: cfg.color,
                    fontSize: "0.7rem",
                    fontWeight: "bold",
                    marginBottom: "5px",
                  }}
                >
                  {cfg.icon} {cfg.label}
                </div>
                <input
                  type="number"
                  value={formData.attributes[cfg.label]}
                  onChange={(e) =>
                    handleChange(`attributes.${cfg.label}`, parseInt(e.target.value))
                  }
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#fff",
                    fontSize: "1.5rem",
                    fontWeight: "900",
                    width: "100%",
                    textAlign: "center",
                    outline: "none",
                  }}
                />
              </div>
            ))}
          </div>
        </Col>

        <Col md={12}>
          <S.CyberLabel>Descrição_da_Entidade</S.CyberLabel>
          <Form.Control
            as="textarea"
            rows={12}
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="bg-black border-secondary text-light"
            style={{ borderRadius: "0", fontSize: "0.9rem" }}
            placeholder="Relatório de observação..."
          />
        </Col>
      </Row>
    </div>
  );
}
