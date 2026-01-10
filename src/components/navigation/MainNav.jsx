import { Navbar, Container } from "react-bootstrap";

/**
 * Componente de barra de navegação principal da aplicação.
 * * Este componente fornece a identidade visual no topo da página e serve como
 * container para futuros links de navegação (Ex: Inventário, Rituais, Configurações).
 * * @component
 * @example
 * return (
 * <MainNav />
 * )
 */
export default function MainNav() {
  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      style={{
        borderBottom: "1px solid #2a2f3e",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Container>
        {/* Logo e Título da Aplicação */}
        <Navbar.Brand
          style={{
            fontWeight: 700,
            letterSpacing: "1px",
            fontSize: "1.1rem",
          }}
        >
          ORDEM <span style={{ color: "#ef4444" }}>PARANORMAL</span>
          <span
            style={{ fontWeight: 300, color: "#9aa0b3", marginLeft: "8px" }}
          >
            • Ficha Digital
          </span>
        </Navbar.Brand>

        {/* Dica: Espaço reservado para Navbar.Toggle e Navbar.Collapse 
            caso você adicione menus responsivos no futuro. 
        */}
      </Container>
    </Navbar>
  );
}
