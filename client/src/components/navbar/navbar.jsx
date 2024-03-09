import { Container, Nav, NavLink, Navbar } from "react-bootstrap";

export const NaviBar = () => {
  return (
    <Navbar className="navbar">
        <Container>
            <Navbar.Brand>React JS x Express JS x MongoDB</Navbar.Brand>
            <Nav className="me-auto">
                <NavLink href="/" >Home</NavLink>
                <NavLink href="/add-item">Tambah</NavLink>
            </Nav>
        </Container>
    </Navbar>
  );
};
