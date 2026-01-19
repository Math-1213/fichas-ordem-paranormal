import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import { Shield, Heart, Activity, AlertTriangle, Zap } from "lucide-react";
import * as S from "./styles";

export default function DefensesTab({ formData, handleChange }) {
  return (
    <div className="p-2">
      {/* STATUS PRINCIPAIS */}
      <Row className="g-4 mb-5">
        <Col md={6}>
          <S.CyberLabel style={{ color: "#ff3b3b" }}>
            INTEGRIDADE_VITAL (PV)
          </S.CyberLabel>
          <S.StatusGauge color="#ff3b3b">
            <div className="d-flex justify-content-between align-items-center">
              <Heart size={32} className="text-danger opacity-50" />
              <input
                type="number"
                value={formData.stats.pv}
                onChange={(e) =>
                  handleChange("stats.pv", parseInt(e.target.value) || 0)
                }
              />
            </div>
            <div
              className="mono"
              style={{ fontSize: "0.6rem", color: "#ff3b3b" }}
            >
              ESTADO: NORMAL
            </div>
          </S.StatusGauge>
        </Col>

        <Col md={6}>
          <S.CyberLabel style={{ color: "#00f2ff" }}>
            DEFESAS_NATURAIS (DEF)
          </S.CyberLabel>
          <S.StatusGauge color="#00f2ff">
            <div className="d-flex justify-content-between align-items-center">
              <Shield size={32} className="text-info opacity-50" />
              <input
                type="number"
                value={formData.stats.defesa}
                onChange={(e) =>
                  handleChange("stats.defesa", parseInt(e.target.value) || 0)
                }
              />
            </div>
            <div
              className="mono"
              style={{ fontSize: "0.6rem", color: "#00f2ff" }}
            >
              ESQUIVA: INATIVA
            </div>
          </S.StatusGauge>
        </Col>
      </Row>

      {/* PRESENÇA PERTURBADORA */}
      <S.CyberCard
        className="mb-4"
        style={{
          background: "rgba(168, 85, 247, 0.05)",
          borderColor: "#a855f744",
        }}
      >
        <S.CyberLabel style={{ color: "#a855f7" }}>
          <Activity size={14} className="me-2" />
          SINAL_DE_PRESENÇA_PERTURBADORA
        </S.CyberLabel>
        <Row className="g-3 mt-1">
          <Col md={4}>
            <S.CyberLabel>DT_RESISTÊNCIA</S.CyberLabel>
            <Form.Control
              type="number"
              className="bg-black border-secondary text-light mono"
              value={formData.presence.dt}
              onChange={(e) => handleChange("presence.dt", e.target.value)}
            />
          </Col>
          <Col md={4}>
            <S.CyberLabel>DANO_MENTAL</S.CyberLabel>
            <Form.Control
              className="bg-black border-secondary text-light mono"
              value={formData.presence.damage}
              onChange={(e) => handleChange("presence.damage", e.target.value)}
            />
          </Col>
          <Col md={4}>
            <S.CyberLabel>IMUNIDADE (NEX)</S.CyberLabel>
            <Form.Control
              className="bg-black border-secondary text-light mono"
              value={formData.presence.immune}
              onChange={(e) => handleChange("presence.immune", e.target.value)}
            />
          </Col>
        </Row>
      </S.CyberCard>

      {/* RESISTÊNCIAS E VULNERABILIDADES */}
      <Row className="g-3">
        <Col md={4}>
          <S.CyberLabel style={{ color: "#00ff00" }}>
            IMUNIDADES_AO_DANO
          </S.CyberLabel>
          <S.DefenseTextArea
            rows={4}
            focusColor="#00ff00"
            placeholder="Ex: Sangue, Crítico..."
            value={formData.immunities.join(", ")}
            onChange={(e) =>
              handleChange(
                "immunities",
                e.target.value.split(",").map((s) => s.trim()),
              )
            }
          />
        </Col>
        <Col md={4}>
          <S.CyberLabel style={{ color: "#ffee58" }}>
            RESISTÊNCIAS_ESPECÍFICAS
          </S.CyberLabel>
          <S.DefenseTextArea
            rows={4}
            focusColor="#ffee58"
            placeholder="Ex: Corte 10, Energia 5..."
            value={formData.resistances.join(", ")}
            onChange={(e) =>
              handleChange(
                "resistances",
                e.target.value.split(",").map((s) => s.trim()),
              )
            }
          />
        </Col>
        <Col md={4}>
          <S.CyberLabel style={{ color: "#ff0055" }}>
            VULNERABILIDADES_DETECTADAS
          </S.CyberLabel>
          <S.DefenseTextArea
            rows={4}
            focusColor="#ff0055"
            placeholder="Ex: Morte, Fogo..."
            value={formData.vulnerabilities.join(", ")}
            onChange={(e) =>
              handleChange(
                "vulnerabilities",
                e.target.value.split(",").map((s) => s.trim()),
              )
            }
          />
        </Col>
      </Row>
    </div>
  );
}
