import { useNavigate } from "react-router-dom";
import { Button, Card, Nav, NavLink } from "reactstrap";
import { useUserContext } from "../config/ctx";
import "../style/menu.css"

export default function Menu(props){

    const {signOut} = useUserContext();
    const navigate = useNavigate();

    const exit = async () => {
        await signOut();
        navigate("/")
    }

    return (
        <Card className="MenuSurface">
            <Nav vertical>
                <NavLink className="MenuItem" href="/" onClick={exit}>Logout</NavLink>
            </Nav>
        </Card>
    );
}