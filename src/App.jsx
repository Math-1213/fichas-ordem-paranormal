import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainNav from "./components/navigation/MainNav";
import FichasPage from "./pages/Fichas";
import CharacterFormPage from "./pages/CharacterFormPage";
import Home from "./pages/Home";
import CharacterList from "./components/editor/CharacterSelector";

function App() {
  const [currentTrack, setCurrentTrack] = useState(null);

  useEffect(() => {
  const eventSource = new EventSource("http://localhost:5001/music/stream-events");

  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("Evento de música recebido:", data);
    
    // Se a URL for null ou vazia, o estado atualiza e o componente para a música
    setCurrentTrack(data.url); 
  };

  eventSource.onerror = () => {
    console.error("Erro na conexão de eventos. Tentando reconectar...");
    eventSource.close();
  };

  return () => eventSource.close();
}, []);

  return (
    <Router>
      <MainNav currentTrackUrl={currentTrack} />
      <Routes>
        {/* Rota principal das fichas */}
        <Route path="/" element={<Home />} />

        {/* Rota principal das fichas */}
        <Route path="/fichas" element={<FichasPage />} />

        {/* Rota unificada: Criação e Edição */}
        <Route path="/editor" element={<CharacterFormPage />} />
        <Route path="/editor/:id" element={<CharacterFormPage />} />
        <Route path="/preEdicao" element={<CharacterList />} />

        {/* Redireciona qualquer rota desconhecida para /fichas */}
        <Route path="*" element={<Navigate to="/fichas" />} />
      </Routes>
    </Router>
  );
}

export default App;
