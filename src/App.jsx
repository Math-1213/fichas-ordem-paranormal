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
  return (
    <Router>
      <MainNav />
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
