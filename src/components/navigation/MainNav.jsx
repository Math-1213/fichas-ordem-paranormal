import { useEffect } from "react";
import { Navbar, Container } from "react-bootstrap";

export default function MainNav() {

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Ordem Paranormal • Ficha Digital</Navbar.Brand>
      </Container>
    </Navbar>
  );
}
