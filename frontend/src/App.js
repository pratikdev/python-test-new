import './App.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import logo from './logo.png';

import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { useEffect, useState } from "react";
import ApiService from "./ApiService";

function App() {
    const localizer = momentLocalizer(moment)
    const [myEvents, setMyEvents] = useState([]);
    const [form, setForm] = useState({});

    useEffect(() => {
        getEvents();
    }, [])

    function getEvents() {
        ApiService.callGet('inspections', { format: 'json' }).then(result => {
            let events = [];
            result.forEach(item => {
                events.push({
                    title: item.title,
                    start: item.start_date,
                    end: item.end_date
                });
            })
            setMyEvents(events);
            setForm({
                title: '',
                description: '',
                start_date: '',
                end_date: ''
            });
        })
    }

    function saveTask(e) {
        e.preventDefault();
        ApiService.callPost('inspections/', form).then(result => {
            getEvents();
        })
    }

    return (
        <div className="App">
            <header>
                <img src={logo} className="App-logo" alt="logo"/>
                <h1>Python React Portal</h1>
                <a style={{ marginLeft: '10px' }} href="/data">Show data</a>
            </header>
            <div>
                <h2>Calendar</h2>
                <Calendar
                    localizer={localizer}
                    events={myEvents}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                />
            </div>
            <div>
                <form onSubmit={(e) => saveTask(e)}>
                    <h2>Add maintenance tasks</h2>
                    <label>Title</label>
                    <input type="text" required placeholder="Title" value={form.title} onChange={(e) => {
                        setForm({
                            ...form,
                            title: e.target.value
                        })
                    }}/>
                    <label>Description</label>
                    <input type="text" required placeholder="Description" value={form.description} onChange={(e) => {
                        setForm({
                            ...form,
                            description: e.target.value
                        })
                    }}/>
                    <label>Start date</label>
                    <input type="date" required value={form.start_date} onChange={(e) => {
                        setForm({
                            ...form,
                            start_date: moment(e.target.value).format('YYYY-MM-DD')
                        })
                    }}/>
                    <label>End date</label>
                    <input type="date" required value={form.end_date} onChange={(e) => {
                        setForm({
                            ...form,
                            end_date: moment(e.target.value).format('YYYY-MM-DD')
                        })
                    }}/>

                    <input type="submit" value="submit"/>
                </form>
            </div>
        </div>
    );
}

export default App;
