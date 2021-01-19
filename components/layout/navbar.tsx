import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import { useSession, signIn, signOut } from 'next-auth/client'
import Link from 'next/link'

export default function MainNavbar({ currentUrl }: { currentUrl: string }) {
    function NavbarLink({ href, text, registeredHref }: {
        href: string, text: string, registeredHref?: string
    }) {
        return (
            <Link href={href} passHref>
                <Nav.Link active={currentUrl == (registeredHref ?? href)}>{text}</Nav.Link>
            </Link>
        );
    }

    const [session] = useSession();

    let loginButton =
        session ?
            (<NavDropdown title={`Welcome, ${session.user.name}`} id="basic-nav-dropdown" >
                <NavDropdown.Item onClick={signOut}>Log Out</NavDropdown.Item>
            </NavDropdown >) :
            <Button variant="outline-success" onClick={signIn}>
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
                    <NavbarLink href='/tutor' text='Tutor [locked if not student]' />
                    <NavbarLink href='/problems/0' text='Problems'
                        registeredHref='/problems/[id]' />
                    <NavbarLink href='/history' text='History' />
                    <NavbarLink href='/quizzes' text='Quizzes' />
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