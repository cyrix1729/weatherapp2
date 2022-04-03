import React, { useState } from 'react';
//mock data
import data from "./data.json";
//components
import Header from "./Header";
import ToDoList from "./ToDoList";
import ToDoForm from './ToDoForm';

function App() {

  const api = {
    key: "3ccd7c2b35621b24433e01aac28af74f",
    base: "https://api.openweathermap.org/data/2.5/"
  }
  
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});
    let unit = 'Imperial';
    
    let unitType = 'C';
    if (unit === 'Imperial'){
      unitType = 'F'
    }
    
    
  
    const search = evt => {
      if (evt.key === "Enter") {
        fetch(`${api.base}weather?q=${query}&units=${unit}&APPID=${api.key}`)
          .then(res => res.json())
          .then(result => {
            setWeather(result);
            setQuery('');
            console.log(result);
          });
      }
    }

  
  const [ toDoList, setToDoList ] = useState(data);

  const handleToggle = (id) => {
    let mapped = toDoList.map(task => {
      return task.id === Number(id) ? { ...task, complete: !task.complete } : { ...task};
    });
    setToDoList(mapped);
  }

  const handleFilter = () => {
    let filtered = toDoList.filter(task => {
      return !task.complete;
    });
    setToDoList(filtered);
  }

  const addTask = (userInput, userStartInput, setUserEndInput ) => {
    let copy = [...toDoList];
    copy = [...copy, { id: toDoList.length + 1, task: userInput, complete: false, start: userStartInput, end: setUserEndInput }];
    setToDoList(copy);
  }

  return (
    <div className={(typeof weather.main != "undefined") ? (
    (weather.weather[0].main === "Clear") ? 'App clear' : 'App' && 
    (weather.weather[0].main === "Clouds") ? 'App cloudy' : 'App' &&
    (weather.weather[0].main === "Snow") ? 'App snow' : 'App' &&
    (weather.weather[0].main === "Rain") ? 'App rain' : 'App')
    : 'App'}>
      <div>
          <div className="search-box">
            <input type="text" placeholder="Search Location" onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search} />
          </div>

          {(typeof weather.main != "undefined") ? (
          <div className = 'MainData'>

              <div className='city'>
                <div>{weather.name}</div>
              </div>
            
            <div>
              <div className='temperature'>{Math.round(weather.main.temp)}°{unitType}</div>
                <div className='conditions'>{weather.weather[0].main}</div>
                <div className = 'range'>H:&nbsp;{Math.round(weather.main.temp_max)}°  &nbsp;&nbsp;&nbsp; L: &nbsp;{Math.round(weather.main.temp_min)}° </div>
                <div className = 'humStyles'>Humidity: {weather.main.humidity}% </div>
            </div>
          </div>
          ) : ('')}
      </div>



      <div className='todocomponents'>
        <Header />
        <div className='container'>
          <ToDoList toDoList={toDoList} handleToggle={handleToggle} handleFilter={handleFilter}/>
        </div>
        {/* <AddHeader/> */}
        <div>
          <ToDoForm addTask={addTask} />
        </div>
      </div>
    </div>
  );
}

export default App;
