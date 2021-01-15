import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import { useLoginContext } from './login'
import Link from 'next/link'

export default function MainNavbar() {
    let state = useLoginContext();

    let loginButton =
        state.name ?
            <div> Welcome, {state.name}</div> :
            <Button variant="outline-success" href="/login">
                Log in
            </Button>;
    return (
        <Navbar bg="light" expand="lg" style={{
            position: "fixed", /* Set the navbar to fixed position */
            top: 0, /* Position the navbar at the top of the page */
            width: "100%",
            zIndex: 999,
        }}>
            <Link href="/" passHref>
                <Navbar.Brand >Seeking Quiz</Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Link href="/tutor" passHref>
                        <Nav.Link >Tutor [locked if not student] </Nav.Link>
                    </Link>
                    <Link href="/problems/0" passHref>
                        <Nav.Link>Problems</Nav.Link>
                    </Link>
                    <Link href="/history" passHref>
                        <Nav.Link>History</Nav.Link>
                    </Link>
                    <Link href="/studentHome" passHref>
                        <Nav.Link>Student Home [need to merge with home]</Nav.Link>
                    </Link>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Form inline className="mt-1 mr-2">
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                </Form>
                <Form inline className="mt-1">
                    {loginButton}
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
}