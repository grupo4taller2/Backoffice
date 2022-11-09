import { Card, CardBody, CardHeader } from "reactstrap";
import Plot from 'react-plotly.js';


export default function MetricCard(props){

    
    return (
        <Card outline color="light" className="MetricsCard">
            <CardHeader className="CardTitle">{props.title}</CardHeader>
            <CardBody className="CardBody">
                <Plot className="Plot"
                config={{staticPlot: true, responsive: true}}
                layout={props.layout}
                    data={props.data}
                    />
            </CardBody>
        </Card>
    );
}