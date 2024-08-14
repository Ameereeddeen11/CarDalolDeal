import { Navbar, Button, Image } from "react-bootstrap"
import PropTypes  from "prop-types"
import image from '../image/bmwi81.jpg'

function IsUserLogged(props) {
    const Welcome = <Image src={image} roundedCircle width="32" height="32"/>
    const LoginOrSignIn = <Button className="mx-2">Log In</Button>
    return (props.isLoggedIn ? Welcome : LoginOrSignIn)
}

IsUserLogged.propstype = {
    name: PropTypes.string, 
    LoginOrSignIn: PropTypes.bool
}

export default IsUserLogged