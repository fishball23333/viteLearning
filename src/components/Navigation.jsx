import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import {Link} from 'react-router-dom'
import './Navigation.css'
function Navigation() {
  return (
    <>
    <Navbar bg='primary'>
      <Container>
        <Navbar.Brand as={Link} to="/">kanban in development...</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/order">place an order</Nav.Link>
          <Nav.Link as={Link} to="/">kanban</Nav.Link>
          <Nav.Link as={Link} to="/history">order history</Nav.Link>
        </Nav>


      
    </Container>
    </Navbar>    
    <hr />
    </>
  );
}

 
export default Navigation;