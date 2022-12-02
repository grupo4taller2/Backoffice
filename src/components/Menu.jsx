import { useNavigate } from "react-router-dom";
import { Button, Card, Nav, NavLink } from "reactstrap";
import { useUserContext } from "../config/ctx";
import "../style/menu.css";
import "../style/screenTitle.css"

export default function Menu(props){

    const {signOut, userState} = useUserContext();
    const navigator = useNavigate();
    const adminInfo = userState.userInfo.first_name + " " + userState.userInfo.last_name + " ( " + userState.userInfo.username + " ) ";
    const exit = async () => {
        await signOut();
        navigator("/")
    }

    const toRules = () => {
        navigator("/rules")
    }

    const toSearch = () => {
        navigator("/search")
    }

    const toMetrics = () => {
        navigator("/metrics")
    }

    const toTransactions = () => {
        navigator("/transactions")
    }

    return (
            <Card className="MenuSurface">
            <Nav  className="Menu" pills>
                <NavLink className="Title" href="#" onClick={toSearch} active={props.search}>Search users</NavLink>
                <NavLink className="Title" href="#" onClick={toRules} active={props.rules}>Pricing rules</NavLink>
                <NavLink className="Title" href="#" onClick={toMetrics} active={props.metrics}>Metrics</NavLink>
                <NavLink className="Title" href="#" onClick={toTransactions}  active={props.transactions}>Transactions</NavLink>
                <NavLink className="LogOut" href="/" onClick={exit}>Logout</NavLink>
            </Nav>
                <p className="AdminName">{adminInfo}</p>
            </Card>
            
        
    );
}