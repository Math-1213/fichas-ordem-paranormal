import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  Table,
  Tabs,
  Tab,
} from "react-bootstrap";
import { Plus, Trash2, Sword, Shield, Zap, Flame } from "lucide-react";

export default function ArmaEditorModal({ show, onHide, armaData, onSave }) {
  const [tempItem, setTempItem] = useState(null);

  // Inicializa o estado interno com os dados do item selecionado
  useEffect(() => {
    if (armaData) {
      // Deep clone para não alterar o original sem salvar
      const clone = JSON.parse(JSON.stringify(armaData));

      // Normalização: garante que os arrays existam para evitar erros de .map()
      if (clone.tipo === "arma") {
        if (!clone.arma) clone.arma = {};
        if (!clone.arma.ataques) clone.arma.ataques = [];
        if (!clone.arma.danos) clone.arma.danos = [];
        if (!clone.arma.especiais) clone.arma.especiais = [];
      } else if (clone.tipo === "equipamento") {
        if (!clone.especiais) clone.especiais = [];
      }

      setTempItem(clone);
    }
  }, [armaData, show]);

  if (!tempItem) return null;

  const isArma = tempItem.tipo === "arma";

  // Funções de Gerenciamento
  const handleListChange = (listPath, index, field, value) => {
    const newItem = { ...tempItem };
    let list;

    if (isArma) {
      list = [...newItem.arma[listPath]];
      list[index][field] = value;
      newItem.arma[listPath] = list;
    } else {
      list = [...newItem[listPath]];
      list[index][field] = value;
      newItem[listPath] = list;
    }
    setTempItem(newItem);
  };

  const addItem = (listPath, template) => {
    const newItem = { ...tempItem };
    if (isArma) {
      newItem.arma[listPath] = [...newItem.arma[listPath], template];
    } else {
      newItem[listPath] = [...newItem[listPath], template];
    }
    setTempItem(newItem);
  };

  const removeItem = (listPath, index) => {
    const newItem = { ...tempItem };
    if (isArma) {
      newItem.arma[listPath] = newItem.arma[listPath].filter(
        (_, i) => i !== index
      );
    } else {
      newItem[listPath] = newItem[listPath].filter((_, i) => i !== index);
    }
    setTempItem(newItem);
  };

  const inputStyle = {
    backgroundColor: "#0d1117",
    color: "#fff",
    borderColor: "#30363d",
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
      contentClassName="bg-dark text-white border-secondary"
    >
      <Modal.Header
        closeButton
        closeVariant="white"
        className="border-secondary bg-black"
      >
        <Modal.Title className="d-flex align-items-center">
          {isArma ? (
            <Sword className="me-2 text-danger" />
          ) : (
            <Shield className="me-2 text-info" />
          )}
          Edição Avançada: {tempItem.nome}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-0" style={{ backgroundColor: "#161a22" }}>
        <Tabs
          defaultActiveKey={isArma ? "ataques" : "especiais"}
          id="editor-tabs"
          className="custom-tabs border-secondary bg-black"
        >
          {/* ABA ATAQUES (Apenas Armas) */}
          {isArma && (
            <Tab eventKey="ataques" title="Ataques/Testes" className="p-3">
              <Button
                variant="outline-primary"
                size="sm"
                className="mb-3"
                onClick={() =>
                  addItem("ataques", {
                    titulo: "Ataque",
                    atributo: "FOR",
                    pericias: "Luta",
                    bonus: 0,
                  })
                }
              >
                <Plus size={14} /> Novo Teste
              </Button>
              <Table
                responsive
                variant="dark"
                hover
                size="sm"
                className="border-secondary"
              >
                <thead>
                  <tr className="text-muted small">
                    <th>Título</th>
                    <th>Atributo</th>
                    <th>Perícia</th>
                    <th>Bônus</th>
                    <th width="50"></th>
                  </tr>
                </thead>
                <tbody>
                  {tempItem.arma.ataques.map((atq, idx) => (
                    <tr key={idx}>
                      <td>
                        <Form.Control
                          size="sm"
                          style={inputStyle}
                          value={atq.titulo}
                          onChange={(e) =>
                            handleListChange(
                              "ataques",
                              idx,
                              "titulo",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td>
                        <Form.Control
                          size="sm"
                          style={inputStyle}
                          value={atq.atributo}
                          onChange={(e) =>
                            handleListChange(
                              "ataques",
                              idx,
                              "atributo",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td>
                        <Form.Control
                          size="sm"
                          style={inputStyle}
                          value={atq.pericias}
                          onChange={(e) =>
                            handleListChange(
                              "ataques",
                              idx,
                              "pericias",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td>
                        <Form.Control
                          size="sm"
                          type="number"
                          style={inputStyle}
                          value={atq.bonus}
                          onChange={(e) =>
                            handleListChange(
                              "ataques",
                              idx,
                              "bonus",
                              parseInt(e.target.value)
                            )
                          }
                        />
                      </td>
                      <td>
                        <Button
                          variant="link"
                          className="text-danger"
                          onClick={() => removeItem("ataques", idx)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Tab>
          )}

          {/* ABA DANOS (Apenas Armas) */}
          {isArma && (
            <Tab eventKey="danos" title="Danos/Dados" className="p-3">
              <Button
                variant="outline-danger"
                size="sm"
                className="mb-3"
                onClick={() =>
                  addItem("danos", { titulo: "Dano Base", dados: "1d6" })
                }
              >
                <Plus size={14} /> Novo Dano
              </Button>
              {tempItem.arma.danos.map((dano, idx) => (
                <Row key={idx} className="mb-2 g-2 align-items-center">
                  <Col md={4}>
                    <Form.Control
                      size="sm"
                      style={inputStyle}
                      placeholder="Título"
                      value={dano.titulo}
                      onChange={(e) =>
                        handleListChange("danos", idx, "titulo", e.target.value)
                      }
                    />
                  </Col>
                  <Col md={7}>
                    <Form.Control
                      size="sm"
                      style={inputStyle}
                      placeholder="Ex: 2d10 + /FOR/"
                      value={dano.dados}
                      onChange={(e) =>
                        handleListChange("danos", idx, "dados", e.target.value)
                      }
                    />
                  </Col>
                  <Col md={1}>
                    <Button
                      variant="link"
                      className="text-danger p-0"
                      onClick={() => removeItem("danos", idx)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </Col>
                </Row>
              ))}
            </Tab>
          )}

          {/* ABA ESPECIAIS / MALDIÇÕES (Para os dois!) */}
          <Tab
            eventKey="especiais"
            title="Especiais / Maldições"
            className="p-3"
          >
            <Button
              variant="outline-warning"
              size="sm"
              className="mb-3"
              onClick={() =>
                addItem("especiais", {
                  nome: "Nova Maldição",
                  descricao: "",
                  paranormal: true,
                })
              }
            >
              <Flame size={14} className="me-1" /> Adicionar Efeito Especial
            </Button>

            {(isArma ? tempItem.arma.especiais : tempItem.especiais).map(
              (esp, idx) => (
                <div
                  key={idx}
                  className="p-3 border border-secondary rounded mb-3"
                  style={{ backgroundColor: "#0d1117" }}
                >
                  <div className="d-flex justify-content-between mb-2 gap-2">
                    <Form.Control
                      size="sm"
                      style={inputStyle}
                      placeholder="Nome do efeito (ex: Letárgica)"
                      value={esp.nome}
                      onChange={(e) =>
                        handleListChange(
                          "especiais",
                          idx,
                          "nome",
                          e.target.value
                        )
                      }
                    />
                    <Form.Check
                      type="switch"
                      label="Paranormal"
                      checked={esp.paranormal}
                      className="small text-nowrap"
                      onChange={(e) =>
                        handleListChange(
                          "especiais",
                          idx,
                          "paranormal",
                          e.target.checked
                        )
                      }
                    />
                    <Button
                      variant="link"
                      className="text-danger p-0 ms-2"
                      onClick={() => removeItem("especiais", idx)}
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    size="sm"
                    style={inputStyle}
                    placeholder="Descrição detalhada do bônus ou maldição..."
                    value={esp.descricao}
                    onChange={(e) =>
                      handleListChange(
                        "especiais",
                        idx,
                        "descricao",
                        e.target.value
                      )
                    }
                  />
                </div>
              )
            )}
          </Tab>
        </Tabs>
      </Modal.Body>

      <Modal.Footer className="border-secondary bg-black">
        <Button variant="outline-secondary" onClick={onHide}>
          Descartar
        </Button>
        <Button
          variant="primary"
          className="px-4"
          onClick={() => onSave(tempItem)}
        >
          <Zap size={16} className="me-2" /> Salvar Mudanças
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
