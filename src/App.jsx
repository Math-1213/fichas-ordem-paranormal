import { useState } from "react";
import Character from "./models/Character";
import characters from "./data";

import { Container, Form, Tabs, Tab } from "react-bootstrap";

import MainNav from "./components/navigation/MainNav";
import InfosTab from "./components/tabs/InfosTab";
import AtributosTab from "./components/tabs/AtributosTab";
import PericiasTab from "./components/tabs/PericiasTab";
import StatusTab from "./components/tabs/StatusTab";
import PoderesTab from './components/tabs/PoderesTab'
import InventarioTab from "./components/tabs/InventarioTab";
import RitualTab from "./components/tabs/RituaisTab";
import DadosTab from "./components/tabs/DadosTab";

function App() {
  const [character, setCharacter] = useState(null);

  function handleSelect(id) {
    const selected = characters.find((c) => c.id === id);
    if (!selected) return;

    setCharacter(new Character(selected.data));
  }

  return (
    <>
      <MainNav />

      <Container className="mt-4">
        <Form.Select
          className="mb-4"
          defaultValue=""
          onChange={(e) => handleSelect(e.target.value)}
        >
          <option value="" disabled>
            Selecione uma ficha
          </option>

          {characters.map((c) => (
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
              <InventarioTab character={character} />
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

export default App;
