import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainNav from "./components/navigation/MainNav";
import FichasPage from "./pages/fichas";

function App() {
  return (
    <Router>
      <MainNav />
      <Routes>
        {/* Rota principal das fichas */}
        <Route path="/fichas" element={<FichasPage />} />
        
        {/* Redireciona qualquer rota desconhecida para /fichas */}
        <Route path="*" element={<Navigate to="/fichas" />} />
      </Routes>
    </Router>
  );
}

export default App;