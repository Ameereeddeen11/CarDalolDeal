import { Navbar, Button, Image, Nav, NavDropdown } from "react-bootstrap"
import PropTypes  from "prop-types"
import image from '../image/bmwi81.jpg'
import { useNavigate } from "react-router-dom"

function IsUserLogged(props) {
    const navigate = useNavigate()
    const handleLogIn = () => {
        navigate('/login')
    }
    const handleLogOut = () => {
        localStorage.removeItem('access_token')
        window.location.reload()
    }
    const Welcome = <NavDropdown title="Amir" id='offcanvasNavbarDropdown-expand-xxl'><NavDropdown.Item>Profile</NavDropdown.Item><NavDropdown.Item>Liked</NavDropdown.Item><NavDropdown.Item>Settings</NavDropdown.Item><NavDropdown.Divider /><NavDropdown.Item onClick={handleLogOut}>Logout</NavDropdown.Item></NavDropdown>
    const LoginOrSignIn = <Button className="mx-2" onClick={handleLogIn}>Log In</Button>
    return (props.isLoggedIn ? Welcome : LoginOrSignIn)
}

IsUserLogged.propstype = {
    name: PropTypes.string, 
    LoginOrSignIn: PropTypes.bool
}

export default IsUserLogged