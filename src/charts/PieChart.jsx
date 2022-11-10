import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";

export default function CustomPieChart(props){
    return (
        <ResponsiveContainer width="92.5%" height="60%" aspect={1.25}>
            <PieChart width="80%" height="80%">
                <Pie data={props.data} label={true}>
                    {props.data.map((value, index) => {
                        return <Cell key={value.name} fill={props.layout.colors[index]} />
                    })}
                </Pie>
                {props.layout.legend && <Legend align="right" verticalAlign="middle" layout="vertical"/>}
            </PieChart>
        </ResponsiveContainer>
    )
}