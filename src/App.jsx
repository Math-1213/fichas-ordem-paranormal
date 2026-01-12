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
    const fetchMusic = async () => {
      try {
        const res = await fetch("http://localhost:5001/music");

        if (!res.ok) throw new Error("Erro na rede");

        const data = await res.json();

        if (data.url !== currentTrack) {
          console.log("Nova trilha detectada:", data.url);
          setCurrentTrack(data.url);
        }
      } catch (err) {
        console.warn("Servidor de música offline ou erro de conexão.");
      }
    };

    fetchMusic();

    const interval = setInterval(fetchMusic, 5000);

    return () => clearInterval(interval);
  }, [currentTrack]);

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
