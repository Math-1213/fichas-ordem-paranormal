import { useState, useEffect } from "react";
import { Container, Form, Tabs, Tab, Spinner } from "react-bootstrap";
import Character from "../models/Character";
import { CharacterService } from "../data/characters_service";

import MainNav from "../components/navigation/MainNav";
import InfosTab from "../components/tabs/InfosTab";
import AtributosTab from "../components/tabs/AtributosTab";
import PericiasTab from "../components/tabs/PericiasTab";
import StatusTab from "../components/tabs/StatusTab";
import PoderesTab from "../components/tabs/PoderesTab";
import InventarioTab from "../components/tabs/InventarioTab";
import RitualTab from "../components/tabs/RituaisTab";
import DadosTab from "../components/tabs/DadosTab";

function FichasPage() {
  const [summary, setSummary] = useState([]);
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    CharacterService.listSummary()
      .then((data) => setSummary(data))
      .finally(() => setLoading(false));
  }, []);

  async function handleSelect(id) {
    if (!id) return;
    const fullData = await CharacterService.getById(id);
    if (fullData) {
      // Instancia seu model Character com os dados do banco
      setCharacter(new Character(fullData.data));
    }
  }

  async function updateCharacterInventory(newItemList) {
    // 1. Atualização instantânea na tela (UI)
    const updatedChar = new Character({
      ...character,
      inventario: newItemList,
    });
    setCharacter(updatedChar);

    // 2. Sincronização com o Back via rota PATCH /characters/inventario/<id>
    try {
      await CharacterService.updateInventory(character.id, newItemList);
      console.log("Inventário salvo na Ordem.");
    } catch (err) {
      console.error("Falha na sincronização:", err);
      // Opcional: Aqui você poderia dar um alerta ao usuário
    }
  }

  if (loading)
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );

  return (
    <>
      <Container className="mt-4">
        <Form.Select
          className="mb-4"
          defaultValue=""
          onChange={(e) => handleSelect(e.target.value)}
        >
          <option value="" disabled>
            Selecione uma ficha
          </option>

          {summary.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nome}
            </option>
          ))}
        </Form.Select>

        {!character && (
          <div className="text-muted text-center mt-5">
            Selecione uma ficha para iniciar a investigação
          </div>
        )}

        {character && (
          <Tabs defaultActiveKey="infos" className="mb-3" justify>
            <Tab eventKey="infos" title="Infos">
              <InfosTab character={character} />
            </Tab>

            <Tab eventKey="atributos" title="Atributos">
              <AtributosTab character={character} />
            </Tab>

            <Tab eventKey="pericias" title="Perícias">
              <PericiasTab character={character} />
            </Tab>

            <Tab eventKey="status" title="Status">
              <StatusTab character={character} />
            </Tab>

            <Tab eventKey="poderes" title="Poderes">
              <PoderesTab character={character} />
            </Tab>

            <Tab eventKey="inventario" title="Inventario">
              <InventarioTab
                character={character}
                onUpdateInventory={updateCharacterInventory}
              />
            </Tab>

            <Tab eventKey="rituais" title="Rituais">
              <RitualTab character={character} />
            </Tab>

            <Tab eventKey="dados" title="Dados">
              <DadosTab character={character} />
            </Tab>
          </Tabs>
        )}
      </Container>
    </>
  );
}

export default FichasPage;
