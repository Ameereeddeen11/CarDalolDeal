import { Navbar, Button } from "react-bootstrap"
import PropTypes  from "prop-types"

function IsUserLogged(props) {
    const Welcome = <Navbar.Text>Welcome {props.name}</Navbar.Text>
    const LoginOrSignIn = <Button className="mx-2">Log In</Button>
    return (props.isLoggedIn ? Welcome : LoginOrSignIn)
}

IsUserLogged.propstype = {
    name: PropTypes.string, 
    LoginOrSignIn: PropTypes.bool
}

export default IsUserLogged