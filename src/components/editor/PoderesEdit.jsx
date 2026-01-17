import { useState, useEffect } from "react";
import { Card, Row, Col, Form, Button, Stack, Badge } from "react-bootstrap";
import { Plus, Trash2, Shield, Tag, AlignLeft } from "lucide-react";

const TAG_STYLES = {
  origem: { bg: "secondary", label: "Origem" },
  classe: { bg: "primary", label: "Classe" },
  trilha: { bg: "info", label: "Trilha" },
  transcender: { bg: "danger", label: "Transcender" },
  outros: { bg: "dark", label: "Outros" },
  combate: { bg: "danger", label: "Combate" },
  investigacao: { bg: "warning", label: "Investigação" },
  social: { bg: "success", label: "Social" },
  exploracao: { bg: "info", label: "Exploração" },
  ritual: { bg: "primary", label: "Ritual" },
  suporte: { bg: "secondary", label: "Suporte" },
  passivo: { bg: "dark", label: "Passivo" },
  reacao: { bg: "success", label: "Reação" },
};

export default function PoderesEdit({ data = [], onChange }) {
  const [poderes, setPoderes] = useState(Array.isArray(data) ? data : []);
  // const poderes = Array.isArray(data) ? data : [];

  useEffect(() => {
  // Sincroniza o estado local com os dados que vêm do pai
  // Se o pai mudou (porque a classe injetou poderes), o state local reseta para o novo valor
  setPoderes(Array.isArray(data) ? data : []);
}, [data]);

  const handleUpdate = (newList) => {
    if (onChange) onChange(newList);
  };

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      titulo: "",
      descricao: "",
      tags: [],
    };
    handleUpdate([...poderes, newItem]);
  };

  const removeItem = (index) => {
    const newList = poderes.filter((_, i) => i !== index);
    handleUpdate(newList);
  };

  const handleChange = (index, field, value) => {
    const newList = poderes.map((item, i) => {
      if (i === index) return { ...item, [field]: value };
      return item;
    });
    handleUpdate(newList);
  };

  const toggleTag = (index, tag) => {
    const currentTags = poderes[index].tags || [];
    const newTags = currentTags.includes(tag)
      ? currentTags.filter((t) => t !== tag)
      : [...currentTags, tag];
    handleChange(index, "tags", newTags);
  };

  const inputStyle = {
    backgroundColor: "#0d1117",
    color: "#fff",
    borderColor: "#2a2f3e",
  };

  return (
    <div className="pb-4">
      <Card style={{ backgroundColor: "#161a22", border: "1px solid #2a2f3e" }}>
        <Card.Header className="bg-dark border-secondary py-3 d-flex justify-content-between align-items-center">
          <div className="text-white fw-bold d-flex align-items-center">
            <Shield size={20} className="me-2 text-info" />
            PODERES E HABILIDADES
          </div>
          <Button variant="outline-primary" size="sm" onClick={addItem}>
            <Plus size={16} /> Adicionar Poder
          </Button>
        </Card.Header>

        <Card.Body className="p-3">
          <Stack gap={3}>
            {poderes.length === 0 ? (
              <div className="text-center py-5 text-secondary small border border-dashed border-secondary rounded">
                Nenhum poder registrado.
              </div>
            ) : (
              poderes.map((item, index) => (
                <Card
                  key={item.id || index}
                  style={{
                    backgroundColor: "#0d1117",
                    border: "1px solid #30363d",
                  }}
                  className="p-3"
                >
                  <Row className="g-3">
                    <Col md={11}>
                      {/* Título */}
                      <Form.Group className="mb-2">
                        <Form.Label className="small text-white-50 fw-bold">
                          TÍTULO DO PODER
                        </Form.Label>
                        <Form.Control
                          style={inputStyle}
                          value={item.titulo}
                          onChange={(e) =>
                            handleChange(index, "titulo", e.target.value)
                          }
                          placeholder="Ex: Transcender"
                        />
                      </Form.Group>

                      {/* Descrição */}
                      <Form.Group className="mb-3">
                        <Form.Label className="small text-white-50 fw-bold d-flex align-items-center gap-1">
                          <AlignLeft size={14} /> DESCRIÇÃO
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          style={inputStyle}
                          value={item.descricao}
                          onChange={(e) =>
                            handleChange(index, "descricao", e.target.value)
                          }
                          placeholder="O que este poder faz?"
                        />
                      </Form.Group>

                      {/* Tags */}
                      <div className="d-flex flex-wrap gap-1 mt-2">
                        <span className="small text-white-50 me-2 d-flex align-items-center">
                          <Tag size={12} className="me-1" /> Tags:
                        </span>
                        {Object.keys(TAG_STYLES).map((tagKey) => {
                          const isSelected = item.tags?.includes(tagKey);
                          const style = TAG_STYLES[tagKey];
                          return (
                            <Badge
                              key={tagKey}
                              bg={isSelected ? style.bg : "outline-secondary"}
                              className="cursor-pointer"
                              style={{
                                cursor: "pointer",
                                opacity: isSelected ? 1 : 0.3,
                                border: isSelected ? "none" : "1px solid #444",
                              }}
                              onClick={() => toggleTag(index, tagKey)}
                            >
                              {style.label}
                            </Badge>
                          );
                        })}
                      </div>
                    </Col>

                    {/* Botão Remover */}
                    <Col
                      md={1}
                      className="d-flex align-items-start justify-content-end"
                    >
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => removeItem(index)}
                      >
                        <Trash2 size={18} />
                      </Button>
                    </Col>
                  </Row>
                </Card>
              ))
            )}
          </Stack>
        </Card.Body>
      </Card>
    </div>
  );
}
