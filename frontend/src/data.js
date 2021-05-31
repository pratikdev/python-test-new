import './App.css';
import logo from "./logo.png";
import { useEffect, useState } from "react";
import ApiService from "./ApiService";
import { Chart } from "react-google-charts";

function Data() {
    const [data, setData] = useState([]);
    const [options, setOptions] = useState({});


    useEffect(() => {
        getJsonData();
    }, [])

    function getJsonData() {
        ApiService.callGet('http://localhost:3000/data.json').then(result => {
            console.log(result);
            console.log('STARTED', new Date().toString())
            let data = [];
            let { data: { x_bin, y_bin, thickness }, x_label, y_label, title } = result;
            data.push([x_label, y_label, { role: "tooltip", type: "string" }]);
            x_bin.forEach((item, index) => data.push([item, y_bin[index], thickness[index]]));
            setData(data);
            setOptions({
                title,
                hAxis: {
                    title: x_label,
                    viewWindow: { min: Math.min(x_bin), max: Math.max(x_bin) }
                },
                vAxis: {
                    title: y_label,
                    viewWindow: { min: Math.min(y_bin), max: Math.max(y_bin) }
                },
                tooltip: { trigger: 'visible' }
            })
            console.log('FINISHED', new Date().toString())
        })
    }

    return (
        <div className="App">
            <header>
                <img src={logo} className="App-logo" alt="logo"/>
                <h1>Python React Portal</h1>
                <a style={{ marginLeft: '10px' }} href="/">Calender</a>
            </header>
            <div>
                <h2>Data</h2>
                {data.length > 0 && <Chart
                    chartType="ScatterChart"
                    data={data}
                    options={options}
                    width="100%"
                    height="800px"
                />}
            </div>
        </div>
    )
}

export default Data;
