import React, { useState, useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
import ListCreatures from "../components/bestiary/ListCreatures";
import ShowEntity from "../components/bestiary/ShowEntity";
import EditEntity from "../components/bestiary/EditEntity";
import { BestiaryService } from "../data/bestiary_services";
export default function Bestiary() {
  const [view, setView] = useState("list"); // 'list', 'view', 'edit'
  const [entities, setEntities] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [loading, setLoading] = useState(true);

  // Troca do fetch manual pelo BestiaryService.listAll()
  const fetchEntities = async () => {
    setLoading(true);
    try {
      const data = await BestiaryService.listAll();
      setEntities(data);
    } catch (err) {
      console.error("Erro ao buscar bestiário", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntities();
  }, []);

  const handleSelect = (entity) => {
    setSelectedEntity(entity);
    setView("view");
  };

  const handleEdit = (entity) => {
    setSelectedEntity(entity);
    setView("edit");
  };

  const handleCreate = () => {
    setSelectedEntity(null);
    setView("edit"); // Alterado de 'new' para 'edit' para renderizar o componente corretamente
  };

  const handleSave = async (updatedData) => {
    try {
      // 1. Limpeza de segurança: garantir que as IDs temporárias de ações
      // geradas com Date.now() não conflitem se o back gerar as próprias IDs
      const dataToSave = {
        ...updatedData,
        updatedAt: new Date().toISOString(),
      };

      if (dataToSave.id) {
        // É uma edição
        await BestiaryService.update(dataToSave.id, dataToSave);
        console.log("SISTEMA: Protocolo atualizado com sucesso.");
      } else {
        // É uma nova criatura
        await BestiaryService.create(dataToSave);
        console.log("SISTEMA: Novo espécime catalogado.");
      }

      // 2. Atualiza a lista local e volta para a visualização
      await fetchEntities();
      setView("list");
      setSelectedEntity(null);
    } catch (error) {
      console.error("FALHA NO SISTEMA:", error);
      alert("ERRO AO SALVAR: Verifique a conexão com o banco de dados.");
    }
  };

  if (loading)
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center bg-black">
        <Spinner animation="border" variant="danger" />
      </div>
    );

  return (
    <Container className="py-5 min-vh-100 text-white">
      {view === "list" && (
        <ListCreatures
          entities={entities}
          onSelect={handleSelect}
          onCreate={handleCreate}
        />
      )}

      {view === "view" && (
        <ShowEntity
          entity={selectedEntity}
          onBack={() => setView("list")}
          onEdit={() => setView("edit")}
        />
      )}

      {view === "edit" && (
        <EditEntity
          entity={selectedEntity}
          onBack={() => {
            setView("list");
            setSelectedEntity(null);
          }}
          onSave={handleSave}
        />
      )}
    </Container>
  );
}
