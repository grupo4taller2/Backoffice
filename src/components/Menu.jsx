import { useNavigate } from "react-router-dom";
import { Button, Card, Nav, NavLink } from "reactstrap";
import { useUserContext } from "../config/ctx";
import "../style/menu.css";
import "../style/screenTitle.css"

export default function Menu(props){

    const {signOut} = useUserContext();
    const navigate = useNavigate();

    const exit = async () => {
        await signOut();
        navigate("/")
    }

    const toRules = () => {
        navigate("/rules")
    }

    const toSearch = () => {
        navigate("/search")
    }


    return (
        <Card className="MenuSurface">
            <Nav pills>
                <NavLink className="Title" href="/search" onClick={toSearch} active={props.search}>Search users</NavLink>
                <NavLink className="Title" href="/rules" onClick={toRules} active={props.rules}>Pricing rules</NavLink>
                <NavLink className="LogOut" href="/" onClick={exit}>Logout</NavLink>
            </Nav>
            
        </Card>
    );
}