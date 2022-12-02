import { Label, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export default function LinearChart(props){

    const legend = props.layout.legend;

    const xAxisKey = props.layout.labels.xKey;
    const yAxisKey = props.layout.labels.yKey;

    const xLabel = props.layout.labels.x;
    const yLabel = props.layout.labels.y;
    
    const lines = props.layout.lines;
    console.log(props.data);
    return (
        <ResponsiveContainer width="92.5%" height="60%" aspect={1.25}>
        <LineChart width="80%" height="80%" data={props.data}>
                    {lines.map((line, index) => {
                        return <Line type={line.type} dataKey={line.dataKey} stroke={line.stroke} 
                                    strokeWidth={2} key={"line-" + index}/>
                    })}
                    <XAxis dataKey={xAxisKey} angle={-90}  tickMargin={13}>
                        {xLabel && <Label value={xLabel} position="left"/>}
                    </XAxis>
                    <YAxis  dataKey={yAxisKey}>
                        {yLabel && <Label value={yLabel} position="insideLeft" angle={-90}/>}
                    </YAxis>
                    {legend && <Legend verticalAlign="top"/>}
                </LineChart>
                </ResponsiveContainer>
    );
}