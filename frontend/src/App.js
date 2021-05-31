import './App.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import logo from './logo.png';

import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';

function App() {
  const localizer = momentLocalizer(moment)

  const myEventsList = [
    {
      title: "Test",
      start: "2020-10-28",
      end: "2020-10-29"
    }
  ];

  return (
    <div className="App">
      <header>
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Python React Portal</h1>
      </header>
      <div>
        <h2>Calendar</h2>
        <Calendar
          localizer={localizer}
          events={myEventsList}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </div>
    </div>
  );
}

export default App;
