import { useNavigate } from "react-router-dom";
import { Button, Card } from "reactstrap";
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
            <Button className="MenuItem" onClick={exit}>Logout</Button>
        </Card>
    );
}