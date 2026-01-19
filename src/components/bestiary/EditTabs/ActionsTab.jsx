import React from "react";
import { Row, Col, Form, InputGroup } from "react-bootstrap";
import { Plus, Trash2, Sword, Zap, Activity, Hash } from "lucide-react";
import * as S from "./styles";

const TYPE_COLORS = {
  Padrão: "#ff3b3b",
  Movimento: "#ffee58",
  Livre: "#3b82f6",
  Reação: "#a855f7",
  Passiva: "#22c55e",
};

export default function ActionsTab({ formData, setFormData }) {
  const addAction = () => {
    const newAction = {
      id: Date.now(),
      nome: "",
      tipo: "Padrão",
      teste: "",
      dano: "",
      descricao: "",
    };
    setFormData({ ...formData, actions: [...formData.actions, newAction] });
  };

  const updateAction = (id, field, value) => {
    const updatedActions = formData.actions.map((action) =>
      action.id === id ? { ...action, [field]: value } : action,
    );
    setFormData({ ...formData, actions: updatedActions });
  };

  const removeAction = (id) => {
    setFormData({
      ...formData,
      actions: formData.actions.filter((a) => a.id !== id),
    });
  };

  return (
    <div className="p-2">
      <div className="d-flex justify-content-between align-items-center mb-4 p-3 border-bottom border-secondary border-opacity-25">
        <div>
          <h5
            className="text-info mb-0 fw-black mono"
            style={{ letterSpacing: "2px" }}
          >
            <Activity className="me-2" size={20} />
            SISTEMAS_DE_COMBATE
          </h5>
          <small className="text-muted mono">
            MÓDULOS_OFENSIVOS_CARREGADOS
          </small>
        </div>

        {/* Usando o seu CyberButton com prop transient $primary */}
        <S.CyberButton $primary type="button" onClick={addAction}>
          <Plus size={18} /> INSTALAR_MODULO
        </S.CyberButton>
      </div>

      <div className="actions-list px-2">
        {formData.actions.length === 0 && (
          <div className="text-center py-5 opacity-25 mono">
            <Sword size={48} className="mb-3" />
            <p>NENHUM_MODULO_DETECTADO</p>
          </div>
        )}

        {formData.actions.map((action, index) => (
          <S.ActionModuleCard
            key={action.id || index}
            typeColor={TYPE_COLORS[action.tipo]}
          >
            <div className="module-header">
              <div className="module-number">
                #{String(index + 1).padStart(2, "0")}
              </div>
              <S.CyberInputGhost
                value={action.nome}
                placeholder="NOME_DO_PROTOCOLO..."
                onChange={(e) =>
                  updateAction(action.id, "nome", e.target.value)
                }
              />
              <S.ActionDeleteButton onClick={() => removeAction(action.id)}>
                <Trash2 size={16} />
              </S.ActionDeleteButton>
            </div>

            <div className="p-3">
              <Row className="g-3">
                <Col md={3}>
                  <S.CyberLabel>EXECUÇÃO</S.CyberLabel>
                  <S.CyberInputMiniSelect
                    value={action.tipo}
                    onChange={(e) =>
                      updateAction(action.id, "tipo", e.target.value)
                    }
                    style={{
                      borderLeft: `3px solid ${TYPE_COLORS[action.tipo]}`,
                    }}
                  >
                    {Object.keys(TYPE_COLORS).map((t) => (
                      <option key={t} value={t}>
                        {t.toUpperCase()}
                      </option>
                    ))}
                  </S.CyberInputMiniSelect>
                </Col>

                {/* TESTE / DADOS */}
                <Col md={4}>
                  <S.CyberLabel style={{ color: TYPE_COLORS.Movimento }}>
                    TESTE_SISTEMA
                  </S.CyberLabel>
                  <S.CyberInput
                    value={action.teste}
                    placeholder="Ex: 3d20+15"
                    focusColor={TYPE_COLORS.Movimento} // Brilho amarelo
                    onChange={(e) =>
                      updateAction(action.id, "teste", e.target.value)
                    }
                  />
                </Col>

                {/* DANO / EFEITO */}
                <Col md={5}>
                  <S.CyberLabel style={{ color: TYPE_COLORS.Padrão }}>
                    OUTPUT_DANO
                  </S.CyberLabel>
                  <S.CyberInput
                    value={action.dano}
                    placeholder="Ex: 4d6+10 Sangue"
                    focusColor={TYPE_COLORS.Padrão} // Brilho vermelho
                    onChange={(e) =>
                      updateAction(action.id, "dano", e.target.value)
                    }
                  />
                </Col>

                <Col md={12}>
                  <S.CyberLabel>LOG_DE_EXECUÇÃO</S.CyberLabel>
                  <S.DefenseTextArea
                    rows={8}
                    value={action.descricao}
                    placeholder="Descreva o efeito visual e mecânico..."
                    onChange={(e) =>
                      updateAction(action.id, "descricao", e.target.value)
                    }
                    focusColor={TYPE_COLORS[action.tipo]}
                  />
                </Col>
              </Row>
            </div>
          </S.ActionModuleCard>
        ))}
      </div>
    </div>
  );
}
