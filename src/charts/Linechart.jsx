import { Legend, Line, LineChart, XAxis, YAxis } from "recharts";

export default function LinearChart(props){
    console.log(props);
    return (
        <LineChart width={props.width} heigh={props.heigh} data={props.data}>
            {props.lines.map(line => {
                return <Line type={line.type} dataKey={line.dataKey} stroke={line.color} id={line.dataKey}/>
            })}
            <XAxis dataKey={props.xAxisKey} label={props.xLabel}/>
            <YAxis dataKey={props.yAxisKey} label={props.yLabel}/>
            {props.legend && <Legend />}
        </LineChart>
    );
}