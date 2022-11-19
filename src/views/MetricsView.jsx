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
    const [newUsers, setNewUsers] = React.useState([]);
    

    const retrieve = async () => {
        let login_data = await getLast24HoursFrom("logins", {"Federated": 0, "Email": 0});
        let creation_data = await getLast24HoursFrom("signup", {"Federated": 0, "Email": 0});
        let active_data = await getLast24HoursFrom("active", {"Driver": 0, "Rider": 0});

        const sumed_logins = {
            "Federated": 0,
            "Email and password": 0
        };

        const sumed_signups = {
            "Federated": 0,
            "Email and password": 0    
        };

        creation_data.map(value => {
            sumed_signups.Federated += value.value.Federated;
            sumed_signups["Email and password"] += value.value.Email;
        })

        login_data.map(value => {
            
            sumed_logins.Federated += value.value.Federated;
            sumed_logins["Email and password"] += value.value.Email;
        })

        setNewUsers(
            [
                {
                    name: "Federated",
                    value: sumed_signups.Federated
                },
                {
                    name: "Email and password",
                    value: sumed_signups["Email and password"]
                }
            ]
        )
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
        setActive(active_data.map(value => {
            const data = {...value.value};
            data.time = value.time;
            return data;
        }));
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
            xKey: "time",
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
    console.log(newUsers)
    return (
            <>
            <Menu metrics={true} />
            
                
                {retrieved ? (activeMetrics ? <TwoMetrics title1="Total users by login (last 24Hrs)" 
                                    title2="Total active users by user type"
                                    title3="Total new users by signup (last 24Hrs)"
                                    first={loginData}  layout1={user1Layout} type1="Pie" 
                                    second={active} layout2={user2Layout} type2="Line"
                                    third={newUsers} layout3={user1Layout} type3="Pie"/> : 
                                <TwoMetrics title1="Trip metric 1" title2="Trip metric 2" />) : 
                                <LoadingScreen />
                }
                <Nav className="MetricsNav" pills>
                    <NavLink href="#" onClick={() => setActiveMetrics(true)} active={activeMetrics}>User metrics</NavLink>
                    <NavLink href="#" onClick={() => setActiveMetrics(false)} active={!activeMetrics}>Trip metrics</NavLink>
                </Nav>
            
            </>
    )
}