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
  Plus,
  Trash2,
  Flame,
  Zap,
  Shield,
  Target,
  Clock,
  Dices,
} from "lucide-react";
import { ELEMENT_DATA } from "../../configs/paranormal";

export default function RituaisEdit({ data = [], onChange }) {
  const rituais = Array.isArray(data) ? data : [];

  const handleUpdate = (newList) => onChange && onChange(newList);

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      nome: "Novo Ritual",
      elementos: [],
      circulo: 1,
      execucao: "Padrão",
      alcance: "Curto",
      alvo: "1 ser",
      duracao: "Cena",
      resistencia: "",
      normal: { custo: 1, efeito: "", dados: "" },
    };
    handleUpdate([...rituais, newItem]);
  };

  const handleChange = (index, field, value) => {
    const newList = [...rituais];
    newList[index] = { ...newList[index], [field]: value };
    handleUpdate(newList);
  };

  // Atualiza sub-objetos (normal, discente, verdadeiro)
  const handleVersionChange = (index, version, field, value) => {
    const newList = [...rituais];
    newList[index][version] = { ...newList[index][version], [field]: value };
    handleUpdate(newList);
  };

  const inputStyle = {
    backgroundColor: "#0d1117",
    color: "#fff",
    borderColor: "#30363d",
  };

  return (
    <>
      <style>
        {`/* Remove o fundo claro e a borda azul ao clicar/abrir */
          .accordion-button {
            background-color: #161a22 !important;
            color: white !important;
            box-shadow: none !important;
          }

          /* Remove a cor clara quando o item está expandido */
          .accordion-button:not(.collapsed) {
            background-color: #1c212b !important; /* Um pouco mais claro que o fundo para dar destaque */
            color: white !important;
          }

          /* Ajusta a cor da setinha do accordion para branco */
          .accordion-button::after {
            filter: invert(1) brightness(2);
          }`}
      </style>

      <Card style={{ backgroundColor: "#161a22", border: "1px solid #2a2f3e" }}>
        <Card.Header className="bg-dark d-flex justify-content-between align-items-center">
          <div className="text-white fw-bold">
            <Zap size={18} className="me-2 text-warning" />
            RITUAIS
          </div>
          <Button variant="outline-primary" size="sm" onClick={addItem}>
            <Plus size={16} /> Adicionar
          </Button>
        </Card.Header>

        <Card.Body>
          <Accordion defaultActiveKey="0">
            {rituais.map((ritual, idx) => (
              <Accordion.Item
                eventKey={String(idx)}
                key={ritual.id || idx}
                className="mb-2 border-secondary bg-transparent"
              >
                <Accordion.Header
                  style={{ backgroundColor: "#161a22" }}
                  className="custom-accordion-header"
                >
                  <div className="d-flex align-items-center gap-2 w-100">
                    <span className="text-white fw-bold">
                      {ritual.nome || "Sem nome"}
                    </span>
                    <Badge bg="dark" className="border border-secondary">
                      {ritual.circulo}º Círculo
                    </Badge>
                    {/* Lista simples de elementos ativos */}
                    <div className="d-flex gap-1">
                      {ritual.elementos?.map((el) => (
                        <small
                          key={el}
                          style={{
                            color:
                              ELEMENT_DATA[el.toLowerCase()]?.color || "#fff",
                            fontSize: "0.7rem",
                          }}
                        >
                          ● {el.toUpperCase()}
                        </small>
                      ))}
                    </div>
                  </div>
                </Accordion.Header>
                <Accordion.Body
                  style={{
                    backgroundColor: "#0d1117",
                    color: "#fff",
                    position: "relative", // Necessário para o botão absoluto se posicionar aqui
                    paddingTop: "2.5rem", // Espaço extra no topo para o botão não sobrepor o primeiro input
                  }}
                >
                  {/* BOTÃO REMOVER POSICIONADO NO CANTO SUPERIOR */}
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() =>
                      handleUpdate(rituais.filter((_, i) => i !== idx))
                    }
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      padding: "4px 8px",
                      fontSize: "0.75rem",
                      zIndex: 10,
                    }}
                  >
                    <Trash2 size={14} className="me-1" /> Remover Ritual
                  </Button>

                  <Row className="g-3">
                    <Col md={12}>
                      {" "}
                      {/* Aumentado para 12 para ocupar a linha toda já que o botão saiu do lado */}
                      <Form.Label className="small text-secondary">
                        Nome do Ritual
                      </Form.Label>
                      <Form.Control
                        size="sm"
                        style={inputStyle}
                        value={ritual.nome}
                        onChange={(e) =>
                          handleChange(idx, "nome", e.target.value)
                        }
                      />
                    </Col>

                    <Col md={12}>
                      <Form.Label className="small text-secondary d-block">
                        Elementos do Ritual
                      </Form.Label>
                      <Stack
                        direction="horizontal"
                        gap={2}
                        className="flex-wrap"
                      >
                        {Object.keys(ELEMENT_DATA).map((elKey) => {
                          const isSelected = ritual.elementos?.includes(elKey);
                          const color = ELEMENT_DATA[elKey]?.color;
                          return (
                            <Button
                              key={elKey}
                              size="sm"
                              variant={
                                isSelected ? "dark" : "outline-secondary"
                              }
                              style={{
                                borderColor: isSelected ? color : "#30363d",
                                color: isSelected ? color : "#8b949e",
                                backgroundColor: isSelected
                                  ? `${color}20`
                                  : "transparent",
                                fontSize: "0.7rem",
                                padding: "2px 8px",
                              }}
                              onClick={() => {
                                const current = ritual.elementos || [];
                                const next = isSelected
                                  ? current.filter((e) => e !== elKey)
                                  : [...current, elKey];
                                handleChange(idx, "elementos", next);
                              }}
                            >
                              {elKey.toUpperCase()}
                            </Button>
                          );
                        })}
                      </Stack>
                    </Col>

                    <Col md={3}>
                      <Form.Label className="small text-secondary">
                        Círculo
                      </Form.Label>
                      <Form.Select
                        size="sm"
                        style={inputStyle}
                        value={ritual.circulo}
                        onChange={(e) =>
                          handleChange(idx, "circulo", e.target.value)
                        }
                      >
                        {[1, 2, 3, 4].map((n) => (
                          <option key={n} value={n}>
                            {n}º Círculo
                          </option>
                        ))}
                      </Form.Select>
                    </Col>

                    {/* Detalhes Técnicos */}
                    <Col md={3}>
                      <label className="small text-secondary">Execução</label>
                      <Form.Control
                        size="sm"
                        style={inputStyle}
                        value={ritual.execucao}
                        onChange={(e) =>
                          handleChange(idx, "execucao", e.target.value)
                        }
                      />
                    </Col>
                    <Col md={3}>
                      <label className="small text-secondary">Alcance</label>
                      <Form.Control
                        size="sm"
                        style={inputStyle}
                        value={ritual.alcance}
                        onChange={(e) =>
                          handleChange(idx, "alcance", e.target.value)
                        }
                      />
                    </Col>
                    <Col md={3}>
                      <label className="small text-secondary">Duração</label>
                      <Form.Control
                        size="sm"
                        style={inputStyle}
                        value={ritual.duracao}
                        onChange={(e) =>
                          handleChange(idx, "duracao", e.target.value)
                        }
                      />
                    </Col>
                    <Col md={3}>
                      <label className="small text-secondary">Resistência</label>
                      <Form.Control
                        size="sm"
                        style={inputStyle}
                        value={ritual.resistencia}
                        onChange={(e) =>
                          handleChange(idx, "resistencia", e.target.value)
                        }
                      />
                    </Col>

                    <Col md={12}>
                      <hr className="border-secondary" />
                      {/* VERSÃO NORMAL */}
                      <div
                        className="p-2 rounded mb-2"
                        style={{
                          borderLeft: "4px solid #adb5bd",
                          background: "#161a22",
                        }}
                      >
                        <div className="d-flex justify-content-between fw-bold small mb-2">
                          <span>NORMAL</span>{" "}
                          <span className="text-info">
                            {ritual.normal?.custo} PE
                          </span>
                        </div>
                        <Form.Control
                          as="textarea"
                          rows={2}
                          size="sm"
                          style={inputStyle}
                          className="mb-2"
                          placeholder="Efeito..."
                          value={ritual.normal?.efeito}
                          onChange={(e) =>
                            handleVersionChange(
                              idx,
                              "normal",
                              "efeito",
                              e.target.value,
                            )
                          }
                        />
                        <Form.Control
                          size="sm"
                          style={inputStyle}
                          placeholder="Dados (ex: 2d6+/INT/)"
                          value={ritual.normal?.dados}
                          onChange={(e) =>
                            handleVersionChange(
                              idx,
                              "normal",
                              "dados",
                              e.target.value,
                            )
                          }
                        />
                      </div>

                      {/* VERSÃO DISCENTE (OPCIONAL) */}
                      <div
                        className="p-2 rounded mb-2"
                        style={{
                          borderLeft: "4px solid #0dcaf0",
                          background: "#161a22",
                        }}
                      >
                        <div className="fw-bold small mb-2">DISCENTE</div>
                        <Form.Control
                          as="textarea"
                          rows={2}
                          size="sm"
                          style={inputStyle}
                          className="mb-2"
                          value={ritual.discente?.efeito || ""}
                          onChange={(e) =>
                            handleVersionChange(
                              idx,
                              "discente",
                              "efeito",
                              e.target.value,
                            )
                          }
                        />
                        <Row>
                          <Col>
                            <Form.Control
                              size="sm"
                              style={inputStyle}
                              placeholder="Custo PE"
                              value={ritual.discente?.custo || ""}
                              onChange={(e) =>
                                handleVersionChange(
                                  idx,
                                  "discente",
                                  "custo",
                                  e.target.value,
                                )
                              }
                            />
                          </Col>
                          <Col>
                            <Form.Control
                              size="sm"
                              style={inputStyle}
                              placeholder="Dados"
                              value={ritual.discente?.dados || ""}
                              onChange={(e) =>
                                handleVersionChange(
                                  idx,
                                  "discente",
                                  "dados",
                                  e.target.value,
                                )
                              }
                            />
                          </Col>
                        </Row>
                      </div>

                      {/* VERSÃO Verdadeira (OPCIONAL) */}
                      <div
                        className="p-2 rounded mb-2"
                        style={{
                          borderLeft: "4px solid #085c6dff",
                          background: "#161a22",
                        }}
                      >
                        <div className="fw-bold small mb-2">Verdadeira</div>
                        <Form.Control
                          as="textarea"
                          rows={2}
                          size="sm"
                          style={inputStyle}
                          className="mb-2"
                          value={ritual.verdadeiro?.efeito || ""}
                          onChange={(e) =>
                            handleVersionChange(
                              idx,
                              "verdadeiro",
                              "efeito",
                              e.target.value,
                            )
                          }
                        />
                        <Row>
                          <Col>
                            <Form.Control
                              size="sm"
                              style={inputStyle}
                              placeholder="Custo PE"
                              value={ritual.verdadeiro?.custo || ""}
                              onChange={(e) =>
                                handleVersionChange(
                                  idx,
                                  "verdadeiro",
                                  "custo",
                                  e.target.value,
                                )
                              }
                            />
                          </Col>
                          <Col>
                            <Form.Control
                              size="sm"
                              style={inputStyle}
                              placeholder="Dados"
                              value={ritual.verdadeiro?.dados || ""}
                              onChange={(e) =>
                                handleVersionChange(
                                  idx,
                                  "verdadeiro",
                                  "dados",
                                  e.target.value,
                                )
                              }
                            />
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Card.Body>
      </Card>
    </>
  );
}
