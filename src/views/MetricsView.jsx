import React from "react";
import { Card, Modal, Nav, NavLink } from "reactstrap";
import InfoAlert from "../components/InfoAlert";
import LoadingScreen from "../components/LoadingSpinner";
import Menu from "../components/Menu";
import MetricCard from "../components/MetricCard";

import TwoMetrics from "../components/TwoMetrics";
import { useUserContext } from "../config/ctx";
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
    const [userFreq, setuserFreq] = React.useState([]);
    const [paymentsVsWithdraws, setPayVsWith] = React.useState([]);

    const [mainError, setMainError] = React.useState(false);

    const context = useUserContext();

    const retrieve = async () => {
        let login_data = await getLast24HoursFrom("logins", {"Federated": 0, "Email": 0});
        let creation_data = await getLast24HoursFrom("signup", {"Federated": 0, "Email": 0});
        let active_data = await getLast24HoursFrom("active", {"Driver": 0, "Rider": 0});

        let trip_metrics = await getTripData(context);
        let transaction_metrics = await getTransactionData(context);
        
        
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
        console.log("Mapped all");
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
        setuserFreq(trip_metrics.userTripFreq);
        setPayVsWith([
            {
                name: "Payments (kETH)",
                value: transaction_metrics.withdrawsVsPayments.payments
            },
            {
                name: "Withdrawals (kETH)",
                value: transaction_metrics.withdrawsVsPayments.withdraws
            }
        ]);
    }

    const tryRetrieve = async () => {
        try{
            await retrieve()
        }catch{
            setMainError(true);
            setRetrieved(true);
        }
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
            y: "Amount"
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
            x: "Trips",
            xKey: "trips",
            y: "Users"
        },
        lines: [
            {
                dataKey: "users",
                type: "monotone",
                stroke: "#1f77b4",
            }
            
        ]
    }

    const transactions1Layout = {
        legend: true,
        colors: ["#1f77b4", "#ff7f0e"]
    }

    React.useEffect(() => {
        tryRetrieve();
    }, [])
    
    return (
            <>
            <Menu metrics={true} />
                
                
                {retrieved ? null : <LoadingScreen />}
                {retrieved && !mainError && activeMetrics === 1 && <TwoMetrics title1="Total users by login (last 24Hrs)" 
                                    title2="Total active users by user type"
                                    title3="Total new users by signup (last 24Hrs)"
                                    first={loginData}  layout1={user1Layout} type1="Pie" 
                                    second={active} layout2={user2Layout} type2="Line"
                                    third={newUsers} layout3={user1Layout} type3="Pie"/>}

                {retrieved && !mainError && activeMetrics === 2 && <TwoMetrics title3="Trips per distance range" 
                                title2="User trips frequency"
                                title1="Drivers trips frequency"
                                third={tripsLength}  layout3={trip1Layout} type3="Bar" 
                                second={userFreq} layout2={trip3Layout} type2="Bar"
                                first={driverFreq} layout1={trip2Layout} type1="Bar" />}

                {retrieved && activeMetrics === 3 && !mainError && 
                <div className="OneMetricDiv">
                <MetricCard title="Payments Vs Withdrawals" layout={transactions1Layout} data={paymentsVsWithdraws} type="Pie" />
                </div>}
                {mainError && 
                <Card className="SearchResultBox">
                <InfoAlert isError={mainError} isOpen={mainError} onDismiss={() => setMainError(false)} 
                                            text="Could not retrieve metrics" />
                </Card>}
                
                {!mainError && <Nav className="MetricsNav" pills>
                    <NavLink href="#" onClick={() => setActiveMetrics(1)} active={activeMetrics === 1}>User metrics</NavLink>
                    <NavLink href="#" onClick={() => setActiveMetrics(2)} active={activeMetrics === 2}>Trip metrics</NavLink>
                    <NavLink href="#" onClick={() => setActiveMetrics(3)} active={activeMetrics === 3}>Transaction metrics</NavLink>
                </Nav>}
            
            </>
    )
}