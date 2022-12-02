import React from "react";
import { Card, Modal, Nav, NavLink } from "reactstrap";
import LoadingScreen from "../components/LoadingSpinner";
import Menu from "../components/Menu";
import MetricCard from "../components/MetricCard";

import TwoMetrics from "../components/TwoMetrics";
import { getLast24HoursFrom } from "../functions/data";
import { getTransactionData } from "../functions/transactionData";
import { getTripData } from "../functions/tripData";

import "../style/metrics.css";

export default function MetricsView(props){
    const [activeMetrics, setActiveMetrics] = React.useState(1);
    const [retrieved, setRetrieved] = React.useState(false);
    const [loginData, setLoginData] = React.useState([]);
    const [active, setActive] = React.useState([]);
    const [newUsers, setNewUsers] = React.useState([]);
    const [tripsLength, setTripsLength] = React.useState([]);
    const [driverFreq, setDriverFreq] = React.useState([]);
    const [priceDist, setPriceDist] = React.useState([]);
    const [paymentsPerHour, setPerHour] = React.useState([]);


    const retrieve = async () => {
        let login_data = await getLast24HoursFrom("logins", {"Federated": 0, "Email": 0});
        let creation_data = await getLast24HoursFrom("signup", {"Federated": 0, "Email": 0});
        let active_data = await getLast24HoursFrom("active", {"Driver": 0, "Rider": 0});

        let trip_metrics = await getTripData();
        let transaction_metrics = await getTransactionData();
        console.log(transaction_metrics)

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
        setDriverFreq(trip_metrics.driverTripsFreq);
        setTripsLength(trip_metrics.byDistance);
        setPriceDist(trip_metrics.priceDist);
        setPerHour(transaction_metrics.totalByHours);
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

    const trip1Layout = {
        labels: {
            x: "Km",
            xKey: "length",
            y: "%"
        },

        lines: [
            {
                dataKey: "value",
                type: "step",
                stroke: "#ff7f0e"
            }
        ]
    }

    const trip2Layout = {
        labels: {
            x: "Trips",
            xKey: "trips",
            y: "Drivers"
        },

        lines: [
            {
                dataKey: "drivers",
                type: "step",
                stroke: "#ff7f0e"
            }
        ]
    }

    const trip3Layout = {
        legend: true,
        labels: {
            x: "Keth",
            xKey: "value",
            y: "Users"
        },
        lines: [
            {
                dataKey: "quantile",
                type: "monotone",
                stroke: "#1f77b4",
            }
            
        ]
    }

    const transactions1Layout = {
        labels: {
            x: "Time",
            xKey: "hour",
            y: "Total (kETH)"
        },

        lines: [
            {
                dataKey: "totalPayments",
                type: "monotone",
                stroke: "#ff7f0e"
            }
        ]
    }

    React.useEffect(() => {
        retrieve();
    }, [])
    console.log(newUsers)
    return (
            <>
            <Menu metrics={true} />
                
                
                {retrieved ? null : <LoadingScreen />}
                {retrieved && activeMetrics === 1 && <TwoMetrics title1="Total users by login (last 24Hrs)" 
                                    title2="Total active users by user type"
                                    title3="Total new users by signup (last 24Hrs)"
                                    first={loginData}  layout1={user1Layout} type1="Pie" 
                                    second={active} layout2={user2Layout} type2="Line"
                                    third={newUsers} layout3={user1Layout} type3="Pie"/>}

                {retrieved && activeMetrics === 2 && <TwoMetrics title3="Distance distribution" 
                                title2="Trips price distribution"
                                title1="Drivers trips frequency"
                                third={tripsLength}  layout3={trip1Layout} type3="Bar" 
                                second={priceDist} layout2={trip3Layout} type2="Line"
                                first={driverFreq} layout1={trip2Layout} type1="Bar" />}

                {retrieved && activeMetrics === 3 && 
                <div className="OneMetricDiv">
                <MetricCard title="Payments per hour" layout={transactions1Layout} data={paymentsPerHour} type="Line" />
                </div>}

                
                <Nav className="MetricsNav" pills>
                    <NavLink href="#" onClick={() => setActiveMetrics(1)} active={activeMetrics === 1}>User metrics</NavLink>
                    <NavLink href="#" onClick={() => setActiveMetrics(2)} active={activeMetrics === 2}>Trip metrics</NavLink>
                    <NavLink href="#" onClick={() => setActiveMetrics(3)} active={activeMetrics === 3}>Transaction metrics</NavLink>
                </Nav>
            
            </>
    )
}