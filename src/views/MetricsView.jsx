import React from "react";
import { Card, Modal, Nav, NavLink } from "reactstrap";
import Menu from "../components/Menu";

import TwoMetrics from "../components/TwoMetrics";

import "../style/metrics.css";

export default function MetricsView(props){
    const [activeMetrics, setActiveMetrics] = React.useState(true);

    const user1Data = [{
        labels: ["Federated users", "Email users"],
        values: [100, 290],
        type: "pie"
    }];
    const user1Layout = {
        legend: {
            x: 0,
            y: 0
        }
    };

    const user2Data = [{
        x: [1, 1.5, 2, 2.5, 3, 3.5, 4],
        y: [100, 200, 50, 15, 10, 50, 100],
        type: "lines+markers",
        name: "Riders"
    },
    {
        x: [1, 1.5, 2, 2.5, 3, 3.5, 4],
        y: [50, 100, 150, 150, 90, 70, 150],
        type: "lines+markers",
        name: "Drivers"
    },
    ]
    const user2Layout = {
        legend: true,
        xaxis: {
            title: "Time",
            showgrid: false,
            zeroline: false
        },
        yaxis: {
            title: "Total users",
            showline: false,
        }
    }

    return (<Modal isOpen={true}>
            <Menu metrics={true} />
            <Card className="MetricsSurface">
                <Nav className="MetricsNav" pills>
                    <NavLink href="#" onClick={() => setActiveMetrics(true)} active={activeMetrics}>User metrics</NavLink>
                    <NavLink href="#" onClick={() => setActiveMetrics(false)} active={!activeMetrics}>Trip metrics</NavLink>
                </Nav>
                {activeMetrics ? <TwoMetrics title1="Total users by login" title2="Total active users by user type" 
                                    first={user1Data} layout1={user1Layout}
                                    second={user2Data} layout2={user2Layout}/> : 
                                <TwoMetrics title1="Trip metric 1" title2="Trip metric 2" />}
            </Card>
    </Modal>)
}