import MetricCard from "./MetricCard";
import "../style/metrics.css"


export default function TwoMetrics(props){
    return (
        <div className="MetricsDiv">
            <MetricCard title={props.title1} data={props.first} layout={props.layout1} type={props.type1}/>
            <MetricCard title={props.title2} data={props.second} layout={props.layout2} type={props.type2}/>
            <MetricCard title={props.title3} data={props.third} layout={props.layout3} type={props.type3} />
        </div>
    )
}

/*

            
*/