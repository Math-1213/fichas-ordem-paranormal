import React, { useState } from "react";
import { Tabs, Tab, Row, Col, Form } from "react-bootstrap";
import { Save, X, Database, Ghost } from "lucide-react";
import { baseCreature } from "../../pages/baseCharacter";
import { ELEMENT_DATA } from "../../configs/paranormal";

// Estilos
import * as S from "./EditTabs/styles";

// Sub-componentes
import BasicInfoTab from "./EditTabs/BasicInfoTab";
import SkillsTab from "./EditTabs/SkillsTab";
import DefensesTab from "./EditTabs/DefensesTab";
import ActionsTab from "./EditTabs/ActionsTab";
import EnigmaTab from "./EditTabs/EnigmaTab";

export default function EditEntity({ entity, onBack, onSave }) {
  const [formData, setFormData] = useState({
    ...baseCreature,
    ...entity,
  });

  const handleChange = (path, value) => {
    const keys = path.split(".");
    setFormData((prev) => {
      let newData = { ...prev };
      let current = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const handleElementToggle = (elemName) => {
    let { element, secondaryElements } = formData;
    if (element === elemName) element = null;
    else if (!element) element = elemName;
    else {
      secondaryElements = secondaryElements.includes(elemName)
        ? secondaryElements.filter((e) => e !== elemName)
        : [...secondaryElements, elemName];
    }
    setFormData((prev) => ({ ...prev, element, secondaryElements }));
  };

  return (
    <S.MainFrame>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          onSave(formData);
        }}
      >
        <S.CyberHeader>
          <div className="d-flex align-items-center gap-3">
            <div
              className="hex-icon-container"
              style={{
                width: "45px",
                height: "45px",
                background: "rgba(0,242,255,0.1)",
                border: "1px solid #00f2ff",
                clipPath:
                  "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Database size={24} className="text-info" />
            </div>
            <div>
              <h1 className="h4 mb-0 fw-black tracking-widest text-uppercase">
                {formData.name || "ENTIDADE_DESCONHECIDA"}
              </h1>
              <small className="text-info mono">
                <span className="status-blink"></span> REGISTRO_BESTIARIO_V2.0.6
              </small>
            </div>
          </div>
          <div className="d-flex gap-2">
            <S.CyberButton type="button" onClick={onBack}>
              <X size={18} /> CANCELAR
            </S.CyberButton>
            <S.CyberButton type="submit" primary>
              <Save size={18} /> UPLOAD_DADOS
            </S.CyberButton>
          </div>
        </S.CyberHeader>

        <Row className="g-4 px-3">
          {/* COLUNA ESQUERDA: VISUAL E ELEMENTOS */}
          <Col lg={3}>
            <S.CyberCard className="mb-4">
              <S.CyberLabel>RECONHECIMENTO_VISUAL</S.CyberLabel>
              <S.CRTContainer hasImage={!!formData.image}>
                <div className="scanline"></div>
                {formData.image ? (
                  <img src={formData.image} alt="Entity Recon" />
                ) : (
                  <div className="no-data">
                    <span className="mono">NO_DATA_FOUND</span>
                    <span className="mono" style={{ fontSize: "0.6rem" }}>
                      BUSCANDO_SINAL...
                    </span>
                  </div>
                )}
              </S.CRTContainer>
              <div className="mt-3">
                <S.CyberLabel>URL_DA_IMAGEM</S.CyberLabel>
                <Form.Control
                  size="sm"
                  value={formData.image}
                  onChange={(e) => handleChange("image", e.target.value)}
                  style={{
                    background: "#000",
                    border: "1px solid #1a222f",
                    color: "#00ff00",
                    fontFamily: "JetBrains Mono",
                  }}
                />
              </div>
            </S.CyberCard>

            <S.CyberCard>
              <S.CyberLabel>AFINIDADES_PARANORMAIS</S.CyberLabel>
              <div className="d-flex flex-wrap gap-2 justify-content-center pt-2">
                {Object.entries(ELEMENT_DATA).map(([key, value]) => {
                  if (key === "vazio") return null;
                  const name = key.charAt(0).toUpperCase() + key.slice(1);
                  const isMain = formData.element === name;
                  const isSec = formData.secondaryElements.includes(name);

                  return (
                    <div
                      key={key}
                      onClick={() => handleElementToggle(name)}
                      style={{
                        width: "42px",
                        height: "42px",
                        cursor: "pointer",
                        transition: "0.3s",
                        border: isMain
                          ? `2px solid ${value.color}`
                          : isSec
                            ? `1px dashed ${value.color}`
                            : "1px solid #222",
                        background: isMain ? `${value.color}22` : "#000",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: isMain ? `0 0 15px ${value.color}` : "none",
                      }}
                    >
                      <img
                        src={value.icon}
                        alt={name}
                        style={{
                          width: "24px",
                          filter:
                            isMain || isSec
                              ? "grayscale(0)"
                              : "grayscale(1) opacity(0.3)",
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </S.CyberCard>
          </Col>

          {/* COLUNA CENTRO/DIREITA: TABS DE EDIÇÃO */}
          <Col lg={9}>
            <S.CyberCard style={{ minHeight: "600px" }}>
              <Tabs defaultActiveKey="basic" className="cyber-tabs mb-4">
                <Tab eventKey="basic" title="01_DADOS_BASICOS">
                  <div className="pt-3">
                    <BasicInfoTab
                      formData={formData}
                      handleChange={handleChange}
                    />
                  </div>
                </Tab>
                <Tab eventKey="defenses" title="02_DEFESAS">
                  <div className="pt-3">
                    <DefensesTab
                      formData={formData}
                      handleChange={handleChange}
                    />
                  </div>
                </Tab>
                <Tab eventKey="skills" title="03_PERICIAS">
                  <div className="pt-3">
                    <SkillsTab
                      formData={formData}
                      handleChange={handleChange}
                    />
                  </div>
                </Tab>
                <Tab eventKey="actions" title="04_PROTOCOLOS_ATAQUE">
                  <div className="pt-3">
                    <ActionsTab formData={formData} setFormData={setFormData} />
                  </div>
                </Tab>
                <Tab eventKey="enigma" title="05_ENIGMA_DO_MEDO">
                  <div className="pt-3">
                    <EnigmaTab
                      formData={formData}
                      handleChange={handleChange}
                    />
                  </div>
                </Tab>
              </Tabs>
            </S.CyberCard>
          </Col>
        </Row>
      </Form>

      <style>{`
        /* Sobrescrita do Bootstrap para Tabs Cyber */
        .cyber-tabs { border-bottom: 1px solid #1a222f !important; gap: 5px; }
        .cyber-tabs .nav-link { 
          color: #566573 !important; 
          border: none !important; 
          border-radius: 0 !important;
          font-weight: 900; 
          font-size: 0.7rem; 
          letter-spacing: 1px;
          padding: 12px 20px;
          text-transform: uppercase;
        }
        .cyber-tabs .nav-link.active { 
          background: #00f2ff !important; 
          color: #000 !important; 
          box-shadow: 0 0 15px rgba(0, 242, 255, 0.3);
        }
      `}</style>
    </S.MainFrame>
  );
}
