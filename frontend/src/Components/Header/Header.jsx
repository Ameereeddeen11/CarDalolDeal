import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';
import IsUserLogged from './IsUserLogged.jsx'
import Search from './Search.jsx';

function Header() {
    return(
        <>
            <Navbar fixed='top' className='navbar navbar-expand-lg navbar-light bg-light'>
                <Container>
                    <Navbar.Brand>Car Deal</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse className='justify-content-center'>
                        <Search/>
                    </Navbar.Collapse>
                    <Navbar.Collapse className='justify-content-end'>
                        <NavDropdown title={<IsUserLogged name="Amir" isLoggedIn={true}/>}>
                            <NavDropdown.Item>Profile</NavDropdown.Item>
                            <NavDropdown.Item>Liked</NavDropdown.Item>
                            <NavDropdown.Item>Settings</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Navbar.Collapse>
                </Container>    
            </Navbar>        
        </>
    )
}

export default Header