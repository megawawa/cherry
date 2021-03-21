import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import { useSession, signIn, signOut, getSession } from 'next-auth/client'
import Link from 'next/link'
import { Dropdown, NavItem, NavLink, DropdownButton } from 'react-bootstrap'
import { useAccountContext } from './accountContext'

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

    let [session] = useSession();

    let loginButton =
        session ? (
            <DropdownButton variant="success"
                title={`Welcome, ${session.user.name}`} menuAlign="right">
                <Dropdown.Item onClick={signOut}>Log Out</Dropdown.Item>
                {
                    session.user.isStudent &&
                    (<Dropdown.Item href="/login?profile=student">View as Student
                    </Dropdown.Item>)
                }
                {
                    session.user.isTutor &&
                    (<Dropdown.Item href="/login?profile=tutor">View as Tutor
                    </Dropdown.Item>)
                }
            </DropdownButton >) :
            <Button variant="outline-success" onClick={signIn}>
                Log in
            </Button>;

    return (
        <Navbar bg="light" expand="lg" style={{
            position: "fixed", /* Set the navbar to fixed position */
            top: 0, /* Position the navbar at the top of the page */
            width: "calc(100vw - 20px)",
            zIndex: 999,
            marginRight: "calc(-100vw + 100 %)",
        }}>
            <Link href="/" passHref>
                <Navbar.Brand >Seeking Quiz</Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavbarLink href='/tutors/1' text='Tutor [locked if not student]' />
                    {/* TODO: @megawawa(02/18/2021) load last viewed quiz
                        <NavbarLink href='/problems/0' text='Problems'
                        registeredHref='/problems/[id]' /> */}
                    <NavbarLink href='/history' text='History' />
                    <NavbarLink href="/quizzes" text='Quizzes' />
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