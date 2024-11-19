import {Navbar, Container, Nav, Button, Offcanvas} from 'react-bootstrap';
import IsUserLogged from './IsUserLogged.jsx'
import Search from './Search.jsx';
import './Header.css'

function Header(props) {
    return(
        <>
            <Navbar key="xxl" expand="xxl" fixed='top' className='navbar navbar-expand-lg navbar-light background'>
                <Container>
                    <Navbar.Brand><a href='/' className='fw-bolder fs-4'>Car Deal</a></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Offcanvas 
                        id='offcanvasNavbar-expand-xxl'
                        aria-labelledby='offcanvasNavbarLabel-expand-xxl'
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id='offcanvasNavbarLabel-expand-xxl'>
                                Offcanvas
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Navbar.Collapse className='justify-content-end'>
                                <Nav className='mx-3'>
                                    <Button variant='light' className='mx-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-app-indicator" viewBox="0 0 16 16">
                                            <path d="M5.5 2A3.5 3.5 0 0 0 2 5.5v5A3.5 3.5 0 0 0 5.5 14h5a3.5 3.5 0 0 0 3.5-3.5V8a.5.5 0 0 1 1 0v2.5a4.5 4.5 0 0 1-4.5 4.5h-5A4.5 4.5 0 0 1 1 10.5v-5A4.5 4.5 0 0 1 5.5 1H8a.5.5 0 0 1 0 1z"/>
                                            <path d="M16 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                                        </svg>
                                    </Button>
                                    <Button variant='light'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-box2-heart" viewBox="0 0 16 16">
                                            <path d="M8 7.982C9.664 6.309 13.825 9.236 8 13 2.175 9.236 6.336 6.31 8 7.982"/>
                                            <path d="M3.75 0a1 1 0 0 0-.8.4L.1 4.2a.5.5 0 0 0-.1.3V15a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4.5a.5.5 0 0 0-.1-.3L13.05.4a1 1 0 0 0-.8-.4zm0 1H7.5v3h-6zM8.5 4V1h3.75l2.25 3zM15 5v10H1V5z"/>
                                        </svg>
                                    </Button>
                                </Nav>
                                <IsUserLogged isLoggedIn={props.isLoggedIn} name="Amir"/>
                            </Navbar.Collapse>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>    
            </Navbar>        
        </>
    )
}

export default Header