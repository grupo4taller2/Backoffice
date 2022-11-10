import { Card, CardBody, CardHeader } from "reactstrap";
import { Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import LinearChart from "../charts/Linechart";


export default function MetricCard(props){

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
    return (
        <Card outline color="light" className="MetricsCard">
            <CardHeader className="CardTitle">{props.title}</CardHeader>
            <CardBody className="CardBody">
                <ResponsiveContainer width="80%" height="80%" aspect={1}>
                <LineChart width="100%" height="100%" data={user2Data}>
                    <Line type="monotone" dataKey="Riders" stroke="#0000ff" />
                    <Line type="monotone" dataKey="Drivers" stroke="#ff0000" />
                    <XAxis dataKey="x" />
                    <YAxis  />
                    <Legend />
                </LineChart>
                </ResponsiveContainer>
            </CardBody>
        </Card>
    );
}