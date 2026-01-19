import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Plus, Trash2, Sword, Zap, ShieldAlert } from "lucide-react";

export default function ActionsTab({ formData, setFormData }) {
  
  const addAction = () => {
    const newAction = {
      id: Date.now(),
      nome: "Nova Ação",
      tipo: "Padrão", // Padrão, Movimento, Livre, Reação
      teste: "",      // Ex: 3d20+10
      dano: "",       // Ex: 2d10+5 Sangue
      descricao: ""
    };
    setFormData({ ...formData, actions: [...formData.actions, newAction] });
  };

  const updateAction = (id, field, value) => {
    const updatedActions = formData.actions.map(action => 
      action.id === id ? { ...action, [field]: value } : action
    );
    setFormData({ ...formData, actions: updatedActions });
  };

  const removeAction = (id) => {
    setFormData({
      ...formData,
      actions: formData.actions.filter(a => a.id !== id)
    });
  };

  return (
    <div className="cyber-panel p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h5 className="text-info mb-0 tracking-widest">SISTEMAS_DE_COMBATE</h5>
          <small className="text-muted mono-small">MÓDULOS_OFENSIVOS_E_HILIDADES</small>
        </div>
        <button type="button" className="btn-cyber btn-cyber-primary" onClick={addAction}>
          <Plus size={18} /> INSTALAR_MODULO
        </button>
      </div>

      <div className="actions-list">
        {formData.actions.length === 0 && (
          <div className="text-center py-5 border border-dashed border-secondary opacity-50">
            <Sword size={48} className="mb-3" />
            <p className="mono-small">NENHUMA_AÇÃO_CONFIGURADA</p>
          </div>
        )}

        {formData.actions.map((action, index) => (
          <div key={action.id || index} className="action-module-card mb-4">
            <div className="module-header d-flex justify-content-between">
              <div className="d-flex align-items-center gap-2">
                <div className="module-number">#{index + 1}</div>
                <Form.Control 
                  value={action.nome}
                  placeholder="NOME_DA_AÇÃO"
                  onChange={e => updateAction(action.id, "nome", e.target.value)}
                  className="cyber-input-ghost fw-bold"
                />
              </div>
              <button type="button" className="btn-remove-module" onClick={() => removeAction(action.id)}>
                <Trash2 size={16} />
              </button>
            </div>

            <div className="module-body p-3">
              <Row className="g-3">
                <Col md={3}>
                  <label className="cyber-label">EXECUÇÃO</label>
                  <Form.Select 
                    value={action.tipo} 
                    onChange={e => updateAction(action.id, "tipo", e.target.value)}
                    className="cyber-input-mini-select"
                  >
                    <option value="Padrão">PADRÃO</option>
                    <option value="Movimento">MOVIMENTO</option>
                    <option value="Livre">LIVRE</option>
                    <option value="Reação">REAÇÃO</option>
                    <option value="Passiva">PASSIVA</option>
                  </Form.Select>
                </Col>
                <Col md={4}>
                  <label className="cyber-label text-warning">TESTE / DADOS</label>
                  <InputGroup>
                    <InputGroup.Text className="cyber-addon"><Zap size={14}/></InputGroup.Text>
                    <Form.Control 
                      value={action.teste}
                      placeholder="Ex: 3d20+15"
                      onChange={e => updateAction(action.id, "teste", e.target.value)}
                      className="cyber-input"
                    />
                  </InputGroup>
                </Col>
                <Col md={5}>
                  <label className="cyber-label text-danger">DANO / EFEITO</label>
                  <InputGroup>
                    <InputGroup.Text className="cyber-addon"><Sword size={14}/></InputGroup.Text>
                    <Form.Control 
                      value={action.dano}
                      placeholder="Ex: 4d6+10 Sangue"
                      onChange={e => updateAction(action.id, "dano", e.target.value)}
                      className="cyber-input"
                    />
                  </InputGroup>
                </Col>
                <Col md={12}>
                  <label className="cyber-label text-info">DESCRIÇÃO_DO_PROTOCOLO</label>
                  <Form.Control 
                    as="textarea"
                    rows={2}
                    value={action.descricao}
                    placeholder="Detalhes sobre a habilidade..."
                    onChange={e => updateAction(action.id, "descricao", e.target.value)}
                    className="cyber-input"
                  />
                </Col>
              </Row>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .action-module-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid #1a222f;
          border-left: 3px solid var(--c-blue);
        }
        .module-header {
          background: rgba(0, 242, 255, 0.05);
          padding: 8px 12px;
          border-bottom: 1px solid #1a222f;
        }
        .module-number {
          font-family: 'JetBrains Mono', monospace;
          background: var(--c-blue);
          color: #000;
          font-size: 0.7rem;
          padding: 2px 6px;
          font-weight: 900;
        }
        .cyber-input-ghost {
          background: transparent !important;
          border: none !important;
          color: var(--c-blue) !important;
          box-shadow: none !important;
          padding: 0 !important;
          font-size: 0.9rem;
        }
        .cyber-input-mini-select {
          background: #000 !important;
          border: 1px solid #1a222f !important;
          color: #fff !important;
          font-size: 0.7rem !important;
          padding: 4px !important;
        }
        .btn-remove-module {
          background: transparent;
          border: none;
          color: #444;
          transition: 0.2s;
        }
        .btn-remove-module:hover {
          color: #ff3b3b;
          transform: scale(1.1);
        }
        .cyber-addon {
          background: #04060a !important;
          border: 1px solid #1a222f !important;
          border-right: none !important;
          color: #555 !important;
        }
      `}</style>
    </div>
  );
}