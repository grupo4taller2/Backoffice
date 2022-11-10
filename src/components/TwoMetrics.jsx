import MetricCard from "./MetricCard";
import "../style/metrics.css"

export default function TwoMetrics(props){
    return (
        <div className="MetricsDiv">
            
            <MetricCard title={props.title2} data={props.second} layout={props.layout2}/>
        </div>
    )
}