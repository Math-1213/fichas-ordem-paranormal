import React from "react";
import {
  Card,
  Row,
  Col,
  Form,
  Button,
  Accordion,
  Badge,
  Stack,
} from "react-bootstrap";
import {
  Sword,
  Package,
  Box,
  Plus,
  Trash2,
  Shield,
  Zap,
  Dices,
} from "lucide-react";
import ArmaEditorModal from "./ArmaEditorModal";

export default function InventarioEdit({ data = [], onChange }) {
  const itens = Array.isArray(data) ? data : [];
  const [modalShow, setModalShow] = React.useState(false);
  const [selectedIdx, setSelectedIdx] = React.useState(null);

  const openEditor = (idx) => {
    setSelectedIdx(idx);
    setModalShow(true);
  };

  const handleUpdate = (newList) => onChange && onChange(newList);

  const saveChanges = (updatedItem) => {
    const newList = [...itens];
    newList[selectedIdx] = updatedItem;
    handleUpdate(newList);
    setModalShow(false);
  };

  const addItem = (tipo) => {
    const templates = {
      arma: {
        tipo: "arma",
        nome: "Nova Arma",
        categoria: 0,
        peso: 1,
        alcance: "Curto",
        arma: {
          tipo: "Corte",
          critico: "20",
          ataques: [],
          danos: [],
          especiais: [],
        },
      },
      equipamento: {
        tipo: "equipamento",
        nome: "Novo Equipamento",
        categoria: 0,
        peso: 1,
        quantidade: 1,
        efeito: "",
        especiais: [],
        dado: "",
      },
      item: {
        tipo: "item",
        nome: "Novo Objeto",
        categoria: 0,
        peso: 0,
        quantidade: 1,
      },
    };
    handleUpdate([...itens, { id: Date.now(), ...templates[tipo] }]);
  };

  const handleChange = (index, field, value) => {
    const newList = [...itens];
    newList[index] = { ...newList[index], [field]: value };
    handleUpdate(newList);
  };

  const inputStyle = {
    backgroundColor: "#0d1117",
    color: "#fff",
    borderColor: "#444d56",
  };
  const labelStyle = {
    color: "#e6edf3",
    fontWeight: "500",
    marginBottom: "4px",
  };

  return (
    <>
      <style>
        {`
          .inventory-card { background-color: #161a22; border: 1px solid #2a2f3e; }
          .accordion-item { background: transparent !important; border: 1px solid #30363d !important; margin-bottom: 8px; }
          .accordion-button { background-color: #161a22 !important; color: #ffffff !important; box-shadow: none !important; }
          .accordion-button:not(.collapsed) { background-color: #1c212b !important; color: #ffffff !important; }
          .accordion-button::after { filter: invert(1) brightness(2); }
          .text-label { color: #adb5bd; font-size: 0.85rem; }
        `}
      </style>

      <Card className="inventory-card">
        <Card.Header className="bg-dark d-flex justify-content-between align-items-center py-3">
          <div className="text-white fw-bold">
            <Package size={20} className="me-2 text-info" /> INVENTÁRIO
          </div>
          <Stack direction="horizontal" gap={2}>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => addItem("arma")}
            >
              <Sword size={14} /> +Arma
            </Button>
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => addItem("equipamento")}
            >
              <Shield size={14} /> +Equip
            </Button>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => addItem("item")}
            >
              <Box size={14} /> +Outro
            </Button>
          </Stack>
        </Card.Header>

        <Card.Body>
          <Accordion>
            {itens.map((item, idx) => (
              <Accordion.Item eventKey={String(idx)} key={item.id || idx}>
                <Accordion.Header>
                  <div className="d-flex align-items-center gap-2 w-100">
                    {item.tipo === "arma" && (
                      <Sword size={16} className="text-danger" />
                    )}
                    {item.tipo === "equipamento" && (
                      <Shield size={16} className="text-info" />
                    )}
                    {item.tipo === "item" && (
                      <Box size={16} className="text-muted" />
                    )}

                    <span className="text-white fw-bold">
                      {item.nome || "Sem nome"}
                    </span>

                    <div className="ms-auto d-flex gap-2 pe-3">
                      <Badge bg="secondary">{item.peso} Esp.</Badge>
                      <Badge
                        bg={item.paranormal ? "purple" : "dark"}
                        style={
                          item.paranormal ? { backgroundColor: "#6f42c1" } : {}
                        }
                      >
                        Cat {item.categoria}
                      </Badge>
                    </div>
                  </div>
                </Accordion.Header>
                <Accordion.Body style={{ backgroundColor: "#0d1117" }}>
                  <Row className="g-3">
                    <Col md={6}>
                      <Form.Label style={labelStyle}>Nome do Objeto</Form.Label>
                      <Form.Control
                        size="sm"
                        style={inputStyle}
                        value={item.nome}
                        onChange={(e) =>
                          handleChange(idx, "nome", e.target.value)
                        }
                      />
                    </Col>
                    <Col md={2}>
                      <Form.Label style={labelStyle}>Peso</Form.Label>
                      <Form.Control
                        size="sm"
                        type="number"
                        style={inputStyle}
                        value={item.peso}
                        onChange={(e) =>
                          handleChange(idx, "peso", parseInt(e.target.value))
                        }
                      />
                    </Col>
                    <Col md={2}>
                      <Form.Label style={labelStyle}>Categoria</Form.Label>
                      <Form.Control
                        size="sm"
                        type="number"
                        style={inputStyle}
                        value={item.categoria}
                        onChange={(e) =>
                          handleChange(
                            idx,
                            "categoria",
                            parseInt(e.target.value)
                          )
                        }
                      />
                    </Col>
                    <Col md={2} className="d-flex align-items-end">
                      <Button
                        variant="outline-danger"
                        size="sm"
                        className="w-100"
                        onClick={() =>
                          handleUpdate(itens.filter((_, i) => i !== idx))
                        }
                      >
                        <Trash2 size={14} />
                      </Button>
                    </Col>

                    <Col md={12}>
                      <Form.Label style={labelStyle}>URL da Imagem</Form.Label>
                      <Form.Control
                        size="sm"
                        style={inputStyle}
                        value={item.imagem || ""}
                        onChange={(e) =>
                          handleChange(idx, "imagem", e.target.value)
                        }
                        placeholder="https://..."
                      />
                    </Col>

                    {/* Campos Específicos de Arma */}
                    {item.tipo === "arma" && (
                      <>
                        <Col md={4}>
                          <Form.Label style={labelStyle}>Tipo Dano</Form.Label>
                          <Form.Control
                            size="sm"
                            style={inputStyle}
                            value={item.arma?.tipo}
                            onChange={(e) =>
                              handleChange(idx, "arma", {
                                ...item.arma,
                                tipo: e.target.value,
                              })
                            }
                          />
                        </Col>
                        <Col md={4}>
                          <Form.Label style={labelStyle}>Alcance</Form.Label>
                          <Form.Control
                            size="sm"
                            style={inputStyle}
                            value={item.alcance}
                            onChange={(e) =>
                              handleChange(idx, "alcance", e.target.value)
                            }
                          />
                        </Col>
                        <Col md={4}>
                          <Form.Label style={labelStyle}>Crítico</Form.Label>
                          <Form.Control
                            size="sm"
                            style={inputStyle}
                            value={item.arma?.critico}
                            onChange={(e) =>
                              handleChange(idx, "arma", {
                                ...item.arma,
                                critico: e.target.value,
                              })
                            }
                          />
                        </Col>
                      </>
                    )}

                    {/* Campos Específicos de Equipamento/Item */}
                    {(item.tipo === "equipamento" || item.tipo === "item") && (
                      <>
                        <Col md={2}>
                          <Form.Label style={labelStyle}>Qtd.</Form.Label>
                          <Form.Control
                            size="sm"
                            type="number"
                            style={inputStyle}
                            value={item.quantidade}
                            onChange={(e) =>
                              handleChange(
                                idx,
                                "quantidade",
                                parseInt(e.target.value)
                              )
                            }
                          />
                        </Col>
                        <Col md={item.tipo === "equipamento" ? 5 : 10}>
                          <Form.Label style={labelStyle}>
                            Efeito Curto
                          </Form.Label>
                          <Form.Control
                            size="sm"
                            style={inputStyle}
                            value={item.efeito || ""}
                            onChange={(e) =>
                              handleChange(idx, "efeito", e.target.value)
                            }
                          />
                        </Col>
                        {item.tipo === "equipamento" && (
                          <Col md={5}>
                            <Form.Label style={labelStyle}>
                              <Dices size={14} /> Dado de Uso
                            </Form.Label>
                            <Form.Control
                              size="sm"
                              style={inputStyle}
                              placeholder="Ex: 2d8+2"
                              value={item.dado || ""}
                              onChange={(e) =>
                                handleChange(idx, "dado", e.target.value)
                              }
                            />
                          </Col>
                        )}
                      </>
                    )}

                    <Col md={12}>
                      <Form.Label style={labelStyle}>
                        Descrição Completa
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        size="sm"
                        style={inputStyle}
                        value={item.descricao}
                        onChange={(e) =>
                          handleChange(idx, "descricao", e.target.value)
                        }
                      />
                    </Col>

                    {/* Botão de Edição Avançada (Armas e Equipamentos) */}
                    {(item.tipo === "arma" || item.tipo === "equipamento") && (
                      <Col md={12}>
                        <Button
                          variant="outline-warning"
                          size="sm"
                          className="w-100 fw-bold py-2"
                          onClick={() => openEditor(idx)}
                        >
                          <Zap size={14} className="me-2" /> CONFIGURAR
                          MALDIÇÕES E DETALHES
                        </Button>
                      </Col>
                    )}

                    <Col md={12}>
                      <Form.Check
                        type="switch"
                        label={
                          <span style={{ color: "#fff" }}>
                            Este item é Paranormal / Amaldiçoado
                          </span>
                        }
                        checked={item.paranormal}
                        onChange={(e) =>
                          handleChange(idx, "paranormal", e.target.checked)
                        }
                      />
                    </Col>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Card.Body>
      </Card>

      <ArmaEditorModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        armaData={itens[selectedIdx]}
        onSave={saveChanges}
      />
    </>
  );
}
