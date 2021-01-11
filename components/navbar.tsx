import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import { useLoginContext } from './login'

export default function MainNavbar() {
    let state = useLoginContext();

    let loginButton =
        state.name ? 
            <div> Welcome, {state.name}</div> :
            <Button variant="outline-success" href="/login">
                Log in
            </Button>;
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">Seeking Quiz</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/tutor">Tutor</Nav.Link>
                    <Nav.Link href="/link">Link</Nav.Link>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                </Form>
                <Form inline className="ml-2">
                    {loginButton}
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
}