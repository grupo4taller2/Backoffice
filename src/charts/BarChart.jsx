import { BarChart, ResponsiveContainer, Bar, XAxis, YAxis, Label, Legend } from "recharts"

export default function CustomBarGraph(props){

    const legend = props.layout.legend;

    const xAxisKey = props.layout.labels.xKey;
    const yAxisKey = props.layout.labels.yKey;

    const xLabel = props.layout.labels.x;
    const yLabel = props.layout.labels.y;
    
    const lines = props.layout.lines;
    
    return <ResponsiveContainer width="92.5%" height="60%" aspect={1.25}>
                <BarChart width="80%" height="80%" data={props.data}>
                    
                    <XAxis dataKey={xAxisKey} angle={-90} tickCount={24} tickMargin={13}>
                        {xLabel && <Label value={xLabel} position="left"/>}
                    </XAxis>
                    <YAxis  dataKey={yAxisKey}>
                        {yLabel && <Label value={yLabel} position="insideLeft" angle={-90}/>}
                    </YAxis>
                    {legend && <Legend verticalAlign="top"/>}
                    <Bar dataKey={lines[0].dataKey} fill={lines[0].stroke}/>

                </BarChart>
           </ResponsiveContainer>
}