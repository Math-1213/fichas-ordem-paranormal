import React from "react";
import { Row, Col } from "react-bootstrap";
import { PERICIAS } from "../../../configs/skills";
import * as S from "./styles";
import { ELEMENT_DATA } from "../../../configs/paranormal";
import { ATRIBUTOS_MAP } from "../../../configs/dice";

const ATTR_COLORS = {
  forca: ELEMENT_DATA.sangue.color,
  agilidade: ELEMENT_DATA.energia.color,
  intelecto: ELEMENT_DATA.conhecimento.color,
  presenca: ELEMENT_DATA.morte.color,
  vigor: "#22c55e",
};

export default function SkillsTab({ formData, handleChange }) {
  const specialSkills = ["profissao", "percepcao"];

  const groupedSkills = Object.entries(PERICIAS).reduce((acc, [key, info]) => {
    const attr = info.atributo;
    if (!acc[attr]) acc[attr] = [];
    acc[attr].push({ key, ...info });
    return acc;
  }, {});

  return (
    <div className="p-2">
      {Object.entries(groupedSkills).map(([attr, skills]) => {
        const acronimoAtributo = Object.keys(ATRIBUTOS_MAP).find(
          (key) => ATRIBUTOS_MAP[key] === attr
        ) || attr;
        const corHeader = ATTR_COLORS[attr];
        const valorAtributoPai = formData.attributes[acronimoAtributo] || 0;

        return (
          <S.AttributeGroup key={attr} color={corHeader}>
            <div className="group-header">
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: corHeader,
                  boxShadow: `0 0 10px ${corHeader}`,
                }}
              />
              <span>MATRIZ_{attr.toUpperCase()}</span>
            </div>

            <Row className="g-0">
              {skills.map(({ key, label }) => {
                const skillValue = formData.skills[key] || {
                  dados: 0,
                  bonus: 0,
                };
                const isSpecial = specialSkills.includes(key.toLowerCase());

                const displayDados =
                  skillValue.dados === 0
                    ? valorAtributoPai
                    : skillValue.dados;

                const isActive =
                  skillValue.dados !== 0 || skillValue.bonus !== 0;

                return (
                  <S.GridDivider key={key} md={6} lg={4}>
                    <S.SkillCard isActive={isActive}>
                      <div className="skill-info">
                        <div className="skill-name text-truncate" title={label}>
                          {isActive && (
                            <span
                              style={{
                                color: corHeader,
                                marginRight: "8px",
                              }}
                            >
                              ▶
                            </span>
                          )}
                          <span
                            style={{
                              opacity: skillValue.dados === 0 ? 0.6 : 1,
                            }}
                          >
                            {label}
                          </span>
                        </div>

                        {isSpecial && (
                          <input
                            placeholder="ESPECIFICAÇÃO..."
                            value={skillValue.type || ""}
                            onChange={(e) =>
                              handleChange(`skills.${key}.type`, e.target.value)
                            }
                            style={{
                              background: "transparent",
                              border: "none",
                              borderBottom: `1px solid ${corHeader}44`,
                              color: "#ffee58",
                              fontSize: "0.65rem",
                              width: "90%",
                              outline: "none",
                              marginTop: "2px",
                              fontFamily: "JetBrains Mono",
                            }}
                          />
                        )}
                      </div>

                      <S.InputsWrapper>
                        <S.SkillInputBox
                          color={corHeader}
                          isActive={isActive}
                          style={{
                            borderStyle:
                              skillValue.dados === 0 ? "dashed" : "solid",
                          }}
                        >
                          <label>DADOS</label>
                          <input
                            type="number"
                            value={displayDados}
                            onChange={(e) =>
                              handleChange(
                                `skills.${key}.dados`,
                                parseInt(e.target.value) || 0,
                              )
                            }
                          />
                        </S.SkillInputBox>

                        <S.SkillInputBox color="#fff" isActive={isActive}>
                          <label>BÔNUS</label>
                          <input
                            type="number"
                            value={skillValue.bonus}
                            onChange={(e) =>
                              handleChange(
                                `skills.${key}.bonus`,
                                parseInt(e.target.value) || 0,
                              )
                            }
                          />
                        </S.SkillInputBox>
                      </S.InputsWrapper>
                    </S.SkillCard>
                  </S.GridDivider>
                );
              })}
            </Row>
          </S.AttributeGroup>
        );
      })}

      <style>{`
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      `}</style>
    </div>
  );
}
