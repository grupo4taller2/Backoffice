import React from "react";
import { Card, Modal, Nav, NavLink } from "reactstrap";
import LoadingScreen from "../components/LoadingSpinner";
import Menu from "../components/Menu";

import TwoMetrics from "../components/TwoMetrics";
import { getLast24HoursFrom } from "../functions/data";

import "../style/metrics.css";

export default function MetricsView(props){
    const [activeMetrics, setActiveMetrics] = React.useState(true);
    const [retrieved, setRetrieved] = React.useState(false);
    const [loginData, setLoginData] = React.useState([]);
    const [active, setActive] = React.useState([]);
    

    const retrieve = async () => {
        let login_data = await getLast24HoursFrom("logins", {"Federated": 0, "Email": 0});
        let active_data = await getLast24HoursFrom("active", {"Driver": 0, "Rider": 0});

        const sumed_logins = {
            "Federated": 0,
            "Email and password": 0
        };

        login_data.map(value => {
            sumed_logins.Federated += value.Federated;
            sumed_logins["Email and password"] += value.Email;
        })

        console.log(active_data);
        setLoginData([
            {
                name: "Federated",
                value: sumed_logins.Federated
            },
            {
                name: "Email and password",
                value: sumed_logins["Email and password"]
            }
        ]);
        setActive(active_data);
        setRetrieved(true);
        
    }
    const user1Layout = {
        legend: true,
        colors: ["#1f77b4", "#ff7f0e"]
    }

    const user2Layout = {
        legend: true,
        labels: {
            x: "Time",
            xKey: "Time",
            y: "Users"
        },
        lines: [
            {
                dataKey: "Rider",
                type: "monotone",
                stroke: "#1f77b4",
            },
            {
                dataKey: "Driver",
                type: "monotone",
                stroke: "#ff7f0e",
            },
            
        ]
    }
    React.useEffect(() => {
        retrieve();
    }, [])
    return (<Modal isOpen={true}>
            <Menu metrics={true} />
            <Card className="MetricsSurface">
                <Nav className="MetricsNav" pills>
                    <NavLink href="#" onClick={() => setActiveMetrics(true)} active={activeMetrics}>User metrics</NavLink>
                    <NavLink href="#" onClick={() => setActiveMetrics(false)} active={!activeMetrics}>Trip metrics</NavLink>
                </Nav>
                {retrieved ? (activeMetrics ? <TwoMetrics title1="Total users by login" title2="Total active users by user type"
                                    first={loginData}  layout1={user1Layout} type1="Pie" 
                                    second={active} layout2={user2Layout} type2="Line"/> : 
                                <TwoMetrics title1="Trip metric 1" title2="Trip metric 2" />) : 
                                <LoadingScreen />
                }
            </Card>
    </Modal>)
}