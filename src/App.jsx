import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  matchPath,
  useLocation
} from "react-router-dom";
import MainNav from "./components/navigation/MainNav";
import FichasPage from "./pages/Fichas";
import CharacterFormPage from "./pages/CharacterFormPage";
import Home from "./pages/Home";
import CharacterList from "./components/editor/CharacterSelector/CharacterSelector";
import Session from "./pages/Session";
import Bestiary from "./pages/Bestiary";

function AppContent({ currentTrack }) {
  const location = useLocation();

  // Define quais rotas devem usar o modo compacto
  const compactModeRoutes = ["/session", "/editor", "/editor/:id", "/fichas"];

  const isCompactMode = compactModeRoutes.some((route) =>
    matchPath({ path: route, exact: true }, location.pathname),
  );

  return (
    <>
      <MainNav currentTrackUrl={currentTrack} compact={isCompactMode} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fichas" element={<FichasPage />} />
        <Route path="/editor" element={<CharacterFormPage />} />
        <Route path="/editor/:id" element={<CharacterFormPage />} />
        <Route path="/preEdicao" element={<CharacterList />} />
        <Route path="/session" element={<Session />} />
        <Route path="/bestiary" element={<Bestiary />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

function App() {
  const [currentTrack, setCurrentTrack] = useState(null);

  useEffect(() => {
    const eventSource = new EventSource(
      "http://localhost:5001/music/stream-events",
    );

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
      <AppContent currentTrack={currentTrack} />
    </Router>
  );
}

export default App;
