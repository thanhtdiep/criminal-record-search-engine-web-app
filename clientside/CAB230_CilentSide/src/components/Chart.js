import React from 'react';
import {Bar} from 'react-chartjs-2'

export function Chart(props){
    const contents = JSON.parse(props.data).result;
    const filterContents = contents.filter(c =>c.total !==0);
    const LGA = filterContents.map( c => c.LGA);
    const total = filterContents.map(c=> c.total);
    //const [input, setInput] = useState(null);
    const data = {
        labels: LGA,
        datasets:[
            {
                label:'Total number of case',
                backgroundColor: "rgba(51,102,0,0.8)",
                lineTension: 0.1,
                data: total,
            }
        ]
    };
    console.log(data);
    return (
        <div>
        <Bar 
            data={data}
            options={{
                responsive: true
            }}
        />
       </div>
    )
}
export default Chart;
