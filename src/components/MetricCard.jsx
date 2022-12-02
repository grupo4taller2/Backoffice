import { Card, CardBody, CardHeader } from "reactstrap";
import { Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import CustomBarGraph from "../charts/BarChart";

import LinearChart from "../charts/Linearchart";
import CustomPieChart from "../charts/PieChart";


export default function MetricCard(props){

    
    return (
        <Card outline color="light" className="MetricsCard">
            <CardHeader className="CardTitle">{props.title}</CardHeader>
            <CardBody className="CardBody">
                    {chooseChart(props.type)(props)}
            </CardBody>
        </Card>
    );
}


function createLinearChart(props){
    return <LinearChart data={props.data} layout={props.layout}/>;
}

function createPieChart(props){
    return <CustomPieChart data={props.data} layout={props.layout} />;
}

function CreateBarGraph(props){
    return <CustomBarGraph data={props.data} layout={props.layout} />
}

function chooseChart(choosing){
    switch (choosing){
        case "Line": return createLinearChart;
        case "Pie": return createPieChart;
        case "Bar": return CreateBarGraph;
    }
}