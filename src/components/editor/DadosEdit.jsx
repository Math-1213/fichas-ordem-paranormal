import { useState } from "react";
import { Card, Row, Col, Form, Button, Stack, Table } from "react-bootstrap";
import { Save, Plus, Trash2, Dice6, Info } from "lucide-react";

export default function DadosEdit({ data, onSave }) {
  // data é character.dados (um array de objetos)
  const [dados, setDados] = useState(data || []);

  const addDado = () => {
    const novoDado = { nome: "Novo Dado", valor: "1d20", tipo: "teste" };
    setDados([...dados, novoDado]);
  };

  const removeDado = (index) => {
    setDados(dados.filter((_, i) => i !== index));
  };

  const updateDado = (index, field, value) => {
    const novosDados = [...dados];
    novosDados[index][field] = value;
    setDados(novosDados);
  };

  return (
    <Card style={{ backgroundColor: "#161a22", border: "1px solid #2a2f3e" }}>
      <Card.Header className="bg-dark text-white d-flex justify-content-between align-items-center p-3">
        <h5 className="mb-0 d-flex align-items-center gap-2">
          <Dice6 size={20} className="text-danger" /> Configurar Dados da Ficha
        </h5>
        <Button variant="outline-success" size="sm" onClick={addDado}>
          <Plus size={18} /> Adicionar Atalho
        </Button>
      </Card.Header>

      <Card.Body>
        <div className="alert alert-info border-0 bg-info bg-opacity-10 text-info small mb-4 d-flex gap-2">
          <Info size={20} />
          <div>
            Estes dados aparecerão como botões rápidos na sua ficha. <br />
            Use <b>/FOR/</b>, <b>/AGI/</b> etc, para usar seus atributos, ou expressões normais como <b>2d6 + 4</b>.
          </div>
        </div>

        <Table responsive variant="dark" className="align-middle border-secondary">
          <thead>
            <tr className="text-muted small">
              <th style={{ width: "35%" }}>NOME DO ATALHO</th>
              <th style={{ width: "35%" }}>FÓRMULA / EXPRESSÃO</th>
              <th style={{ width: "20%" }}>MODO</th>
              <th style={{ width: "10%" }}></th>
            </tr>
          </thead>
          <tbody>
            {dados.map((dado, idx) => (
              <tr key={idx} style={{ borderBottom: "1px solid #2a2f3e" }}>
                <td>
                  <Form.Control
                    size="sm"
                    value={dado.nome}
                    placeholder="Ex: Espada Curta"
                    onChange={(e) => updateDado(idx, "nome", e.target.value)}
                    style={{ backgroundColor: "#0d1117", color: "#fff", borderColor: "#2a2f3e" }}
                  />
                </td>
                <td>
                  <Form.Control
                    size="sm"
                    value={dado.valor}
                    placeholder="Ex: /FOR/d20 + 5"
                    onChange={(e) => updateDado(idx, "valor", e.target.value)}
                    style={{ backgroundColor: "#0d1117", color: "#fff", borderColor: "#2a2f3e", fontFamily: "monospace" }}
                  />
                </td>
                <td>
                  <Form.Select
                    size="sm"
                    value={dado.tipo || "teste"}
                    onChange={(e) => updateDado(idx, "tipo", e.target.value)}
                    style={{ backgroundColor: "#0d1117", color: "#fff", borderColor: "#2a2f3e" }}
                  >
                    <option value="teste">Teste (Pega o Maior)</option>
                    <option value="soma">Soma (Dano/Cura)</option>
                  </Form.Select>
                </td>
                <td className="text-end">
                  <Button 
                    variant="outline-danger" 
                    size="sm" 
                    onClick={() => removeDado(idx)}
                    style={{ border: 'none' }}
                  >
                    <Trash2 size={18} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {dados.length === 0 && (
          <div className="text-center py-4 text-muted">
            Nenhum atalho configurado. Clique em "Adicionar Atalho" para começar.
          </div>
        )}

        <div className="d-grid mt-4">
          <Button variant="danger" size="lg" className="fw-bold" onClick={() => onSave(dados)}>
            <Save size={20} className="me-2" /> SALVAR CONFIGURAÇÕES DE DADOS
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}