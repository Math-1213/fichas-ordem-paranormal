import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Tabs, Tab, Spinner, Button, Card } from "react-bootstrap";
import { ChevronLeft, Save } from "lucide-react";
import { CharacterService } from "../data/characters_service";

import InfosEdit from "../components/editor/InfosEdit";
import AtributosEdit from "../components/editor/AtributosEdit";
import PericiasEdit from "../components/editor/PericiasEdit";
import StatusEdit from "../components/editor/StatusEdit";

import PoderesEdit from "../components/editor/PoderesEdit";

import InventarioEdit from "../components/editor/InventarioEdit";
import RitualEdit from "../components/editor/RituaisEdit";
import DadosEdit from "../components/editor/DadosEdit";

export default function CharacterFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id) {
      CharacterService.getById(id)
        .then((res) => setCharacter(res.data))
        .finally(() => setLoading(false));
    } else {
      setCharacter({
        infos: {
          nome: "Novo Investigador",
          jogador: "",
          ocupacao: "",
          portrait: "",
        },
        atributos: { for: 1, agi: 1, int: 1, vig: 1, pre: 1 },
        status: {
          vida: 10,
          vidaMax: 10,
          sanidade: 10,
          sanidadeMax: 10,
          esforco: 1,
          esforcoMax: 1,
        },
        pericias: {},
        inventario: [],
        poderes: [],
        rituais: [],
      });
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    console.log("Personagem: ", character);
  }, [character]);

  /**
   * Atualiza o estado local do personagem sem salvar no banco ainda.
   * Isso permite que o usuário navegue entre abas sem perder o que digitou.
   */
  const handleLocalUpdate = (partName, newData) => {
    setCharacter((prev) => ({
      ...prev,
      [partName]: newData,
    }));
  };

  /**
   * Persiste os dados no Backend.
   */
  const handleSaveAll = async () => {
    try {
      setSaving(true);
      if (id) {
        // Modo Edição
        await CharacterService.update(id, character);
        alert("Personagem atualizado com sucesso!");
      } else {
        // Modo Criação
        const res = await CharacterService.create(character);
        alert("Personagem criado com sucesso!");
        navigate(`/editor/${res.id}`, { replace: true });
      }
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Falha ao salvar personagem.");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="info" />
      </Container>
    );

  return (
    <Container className="mt-4 pb-5">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Button variant="outline-secondary" onClick={() => navigate("/fichas")}>
          <ChevronLeft size={18} /> Voltar
        </Button>
        <h2 className="text-white mb-0">
          {character.infos.nome || "Novo Personagem"}
        </h2>
        <div style={{ width: "80px" }}></div>
      </div>
      <Tabs defaultActiveKey="infos" className="mb-4 custom-tabs" justify>
        <Tab eventKey="infos" title="Identidade">
          <InfosEdit
            data={character.infos}
            onChange={(newData) => handleLocalUpdate("infos", newData)}
          />
        </Tab>

        <Tab eventKey="atributos" title="Atributos">
          <AtributosEdit
            data={character.atributos}
            onSave={(newData) => handleLocalUpdate("atributos", newData)}
          />
        </Tab>

        <Tab eventKey="pericias" title="Pericias">
          <PericiasEdit
            data={character.pericias}
            onSave={(newData) => handleLocalUpdate("pericias", newData)}
          />
        </Tab>

        <Tab eventKey="status" title="Status">
          <StatusEdit
            data={character.status}
            onSave={(newData) => handleLocalUpdate("status", newData)}
          />
        </Tab>

        <Tab eventKey="poderes" title="Poderes">
          <PoderesEdit
            data={character.poderes || []}
            onChange={(newData) => handleLocalUpdate("poderes", newData)}
          />
        </Tab>

        <Tab eventKey="inventario" title="Inventario">
          <InventarioEdit
            data={character.inventario}
            onChange={(newData) => handleLocalUpdate("inventario", newData)}
          />
        </Tab>

        <Tab eventKey="rituais" title="Rituais">
          <RitualEdit
            data={character.rituais || []}
            onChange={(newData) => handleLocalUpdate("rituais", newData)}
          />
        </Tab>

        <Tab eventKey="dados" title="Dados">
          <DadosEdit
            data={character.dados || []}
            onChange={(newData) => handleLocalUpdate("dados", newData)}
          />
        </Tab>
      </Tabs>
      {/* BOTÃO SALVAR FIXO (Rodapé) */}
      <div
        className="fixed-bottom p-3"
        style={{
          backgroundColor: "rgba(11, 14, 20, 0.9)",
          borderTop: "1px solid #2a2f3e",
          backdropFilter: "blur(5px)",
        }}
      >
        <Container className="d-flex justify-content-end">
          <Button
            variant="primary"
            size="lg"
            className="px-5 d-flex align-items-center gap-2"
            onClick={handleSaveAll}
            disabled={saving}
          >
            {saving ? <Spinner size="sm" /> : <Save size={20} />}
            {id ? "Salvar Alterações" : "Criar Personagem"}
          </Button>
        </Container>
      </div>
      <div style={{ height: "80px" }} />{" "}
      {/* Spacer para o botão fixo não cobrir o conteúdo */}
    </Container>
  );
}
