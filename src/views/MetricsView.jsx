import React from "react";
import { Card, Modal, Nav, NavLink } from "reactstrap";
import Menu from "../components/Menu";

import TwoMetrics from "../components/TwoMetrics";

import "../style/metrics.css";

export default function MetricsView(props){
    const [activeMetrics, setActiveMetrics] = React.useState(true);
    const user2Data = [
        {
            "x": 1,
            "Riders": 100,
            "Drivers": 50,
        },
        {
            "x": 1.5,
            "Riders": 200,
            "Drivers": 100,
        },
        {
            "x": 2,
            "Riders": 50,
            "Drivers": 150,
        },
        {
            "x": 2.5,
            "Riders": 15,
            "Drivers": 150,
        },
        {
            "x": 3,
            "Riders": 10,
            "Drivers": 90,
        },
        {
            "x": 3.5,
            "Riders": 50,
            "Drivers": 70,
        },
        {
            "x": 4,
            "Riders": 100,
            "Drivers": 150,
        },
        
        
    ]
    const user2Layout = {
        legend: true,
        labels: {
            x: "Time",
            xKey: "x",
            y: "Users"
        },
        lines: [
            {
                dataKey: "Riders",
                type: "monotone",
                stroke: "#8884d8",
            },
            {
                dataKey: "Drivers",
                type: "monotone",
                stroke: "#82ca9d",
            },
            
        ]
    }

    return (<Modal isOpen={true}>
            <Menu metrics={true} />
            <Card className="MetricsSurface">
                <Nav className="MetricsNav" pills>
                    <NavLink href="#" onClick={() => setActiveMetrics(true)} active={activeMetrics}>User metrics</NavLink>
                    <NavLink href="#" onClick={() => setActiveMetrics(false)} active={!activeMetrics}>Trip metrics</NavLink>
                </Nav>
                {activeMetrics ? <TwoMetrics title1="Total users by login" title2="Total active users by user type" 
                                    second={user2Data} layout2={user2Layout}/> : 
                                <TwoMetrics title1="Trip metric 1" title2="Trip metric 2" />}
            </Card>
    </Modal>)
}