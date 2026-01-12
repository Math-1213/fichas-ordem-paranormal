import { useState, useEffect } from "react";
import { Card, Row, Col, Form, Badge } from "react-bootstrap";
import { User, BookOpen, Shield, MapPin, Ghost } from "lucide-react";

export default function InfosEdit({ data, onChange }) {
  // Estado local para o formulário
  const [infos, setInfos] = useState(data || {});

  // Sincroniza o estado local se o dado vindo do pai mudar (ex: carregamento do banco)
  useEffect(() => {
    if (data) setInfos(data);
  }, [data]);

  // Handler que atualiza localmente e notifica o pai
  const handleChange = (path, value) => {
    const keys = path.split(".");
    let newInfos;

    if (keys.length > 1) {
      newInfos = {
        ...infos,
        [keys[0]]: { ...(infos[keys[0]] || {}), [keys[1]]: value },
      };
    } else {
      newInfos = { ...infos, [path]: value };
    }

    setInfos(newInfos);
    onChange(newInfos); // Notifica a CharacterFormPage para manter o estado global atualizado
  };

  const sectionStyle = {
    borderBottom: "1px solid #2a2f3e",
    paddingBottom: "1.5rem",
    marginBottom: "1.5rem",
  };

  const labelStyle = {
    color: "#9aa0b3",
    fontSize: "0.75rem",
    fontWeight: "bold",
    textTransform: "uppercase",
  };
  const inputStyle = {
    backgroundColor: "#0d1117",
    color: "#e6e6e6",
    borderColor: "#2a2f3e",
  };

  return (
    <Card
      style={{
        backgroundColor: "#161a22",
        border: "1px solid #2a2f3e",
        color: "#e6e6e6",
      }}
    >
      <Card.Header
        style={{
          backgroundColor: "#1e2330",
          borderBottom: "1px solid #2a2f3e",
          fontWeight: 600,
        }}
      >
        <User size={18} className="me-2 text-info" /> Identidade do Investigador
      </Card.Header>

      <Card.Body>
        {/* IDENTIFICAÇÃO BÁSICA */}
        <Row style={sectionStyle}>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label style={labelStyle}>Nome do Personagem</Form.Label>
              <Form.Control
                type="text"
                value={infos.nome || ""}
                onChange={(e) => handleChange("nome", e.target.value)}
                style={{ ...inputStyle, color: "#8b5cf6", fontWeight: "bold" }}
                placeholder="Ex: Arthur Cervero"
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label style={labelStyle}>Jogador</Form.Label>
              <Form.Control
                type="text"
                value={infos.jogador || ""}
                onChange={(e) => handleChange("jogador", e.target.value)}
                style={inputStyle}
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Label style={labelStyle}>Idade</Form.Label>
            <Form.Control
              type="number"
              value={infos.idade || ""}
              onChange={(e) => handleChange("idade", e.target.value)}
              style={inputStyle}
            />
          </Col>
          <Col md={3}>
            <Form.Label style={labelStyle}>Nacionalidade</Form.Label>
            <Form.Control
              type="text"
              value={infos.nacionalidade || ""}
              onChange={(e) => handleChange("nacionalization", e.target.value)}
              style={inputStyle}
            />
          </Col>
        </Row>

        {/* ORIGEM E CARREIRA */}
        <Row style={sectionStyle}>
          <Col md={3}>
            <Form.Label style={labelStyle}>Classe</Form.Label>
            <Form.Select
              value={infos.classe || ""}
              onChange={(e) => handleChange("classe", e.target.value)}
              style={inputStyle}
            >
              <option value="">Selecione...</option>
              <option value="Combatente">Combatente</option>
              <option value="Especialista">Especialista</option>
              <option value="Ocultista">Ocultista</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Label style={labelStyle}>Trilha</Form.Label>
            <Form.Control
              type="text"
              value={infos.trilha || ""}
              onChange={(e) => handleChange("trilha", e.target.value)}
              style={inputStyle}
            />
          </Col>
          <Col md={3}>
            <Form.Label style={labelStyle}>Origem</Form.Label>
            <Form.Control
              type="text"
              value={infos.origem || ""}
              onChange={(e) => handleChange("origem", e.target.value)}
              style={inputStyle}
            />
          </Col>
          <Col md={3}>
            <Form.Label style={labelStyle}>Patente</Form.Label>
            <Form.Control
              type="text"
              value={infos.patente || ""}
              onChange={(e) => handleChange("patente", e.target.value)}
              style={inputStyle}
            />
          </Col>
        </Row>

        {/* MECÂNICAS ORDEM */}
        <Row style={sectionStyle}>
          <Col md={2} xs={6}>
            <Form.Label style={labelStyle}>NEX (%)</Form.Label>
            <Form.Control
              type="number"
              value={infos.nex || 0}
              onChange={(e) =>
                handleChange("nex", parseInt(e.target.value) || 0)
              }
              style={inputStyle}
            />
          </Col>
          <Col md={2} xs={6}>
            <Form.Label style={labelStyle}>Nível</Form.Label>
            <Form.Control
              type="number"
              value={infos.nivel || 0}
              onChange={(e) =>
                handleChange("nivel", parseInt(e.target.value) || 0)
              }
              style={inputStyle}
            />
          </Col>
          <Col md={2} xs={6}>
            <Form.Label style={labelStyle}>PE / Rodada</Form.Label>
            <Form.Control
              type="number"
              value={infos.peRodada || 0}
              onChange={(e) =>
                handleChange("peRodada", parseInt(e.target.value) || 0)
              }
              style={inputStyle}
            />
          </Col>
          <Col md={2} xs={6}>
            <Form.Label style={labelStyle}>DT Ritual</Form.Label>
            <Form.Control
              type="number"
              value={infos.dtRitual || 0}
              onChange={(e) =>
                handleChange("dtRitual", parseInt(e.target.value) || 0)
              }
              style={inputStyle}
            />
          </Col>
          <Col md={4}>
            <Form.Label style={labelStyle}>Afinidade</Form.Label>
            <Form.Control
              type="text"
              value={infos.afinidade || ""}
              onChange={(e) => handleChange("afinidade", e.target.value)}
              style={inputStyle}
              placeholder="Ex: Morte"
            />
          </Col>
        </Row>

        {/* LOGÍSTICA E PORTRAIT */}
        <Row style={sectionStyle}>
          <Col md={2}>
            <Form.Label style={labelStyle}>Carga Max</Form.Label>
            <Form.Control
              type="number"
              value={infos.carga || 0}
              onChange={(e) =>
                handleChange("carga", parseInt(e.target.value) || 0)
              }
              style={inputStyle}
            />
          </Col>
          <Col md={2}>
            <Form.Label style={labelStyle}>Deslocamento</Form.Label>
            <Form.Control
              type="number"
              value={infos.deslocamento || 0}
              onChange={(e) =>
                handleChange("deslocamento", parseInt(e.target.value) || 0)
              }
              style={inputStyle}
            />
          </Col>
          <Col md={8}>
            <Form.Label style={labelStyle}>URL do Portrait (Imagem)</Form.Label>
            <Form.Control
              type="text"
              value={infos.portrait || ""}
              onChange={(e) => handleChange("portrait", e.target.value)}
              style={inputStyle}
              placeholder="https://link-da-imagem.com/foto.png"
            />
          </Col>
        </Row>

        {/* NARRATIVA COMPLEXA */}
        <div className="mt-4">
          <h5 className="text-info mb-4 d-flex align-items-center">
            <BookOpen size={18} className="me-2" /> Detalhes Psicológicos &
            Narrativos
          </h5>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label style={labelStyle}>Aparência</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  style={inputStyle}
                  value={infos.narrativa?.aparencia || ""}
                  onChange={(e) =>
                    handleChange("narrativa.aparencia", e.target.value)
                  }
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label style={labelStyle}>Personalidade</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  style={inputStyle}
                  value={infos.narrativa?.personalidade || ""}
                  onChange={(e) =>
                    handleChange("narrativa.personalidade", e.target.value)
                  }
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label style={labelStyle}>Fobias / Traumas</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  style={inputStyle}
                  value={infos.narrativa?.fobias || ""}
                  onChange={(e) =>
                    handleChange("narrativa.fobias", e.target.value)
                  }
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label style={labelStyle}>Pior Pesadelo</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  style={inputStyle}
                  value={infos.narrativa?.piorPesadelo || ""}
                  onChange={(e) =>
                    handleChange("narrativa.piorPesadelo", e.target.value)
                  }
                />
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label style={labelStyle}>
                  Primeiro Encontro com o Paranormal
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  style={inputStyle}
                  value={infos.narrativa?.primeiroEncontro || ""}
                  onChange={(e) =>
                    handleChange("narrativa.primeiroEncontro", e.target.value)
                  }
                />
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label style={labelStyle}>História de Vida</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  style={inputStyle}
                  value={infos.narrativa?.historia || ""}
                  onChange={(e) =>
                    handleChange("narrativa.historia", e.target.value)
                  }
                />
              </Form.Group>
            </Col>
          </Row>
        </div>
      </Card.Body>
    </Card>
  );
}
