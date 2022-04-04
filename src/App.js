import React, { useState, useEffect} from 'react';
//mock data
import data from "./data.json";
//components
import Header from "./Header";
import ToDoList from "./ToDoList";
import ToDoForm from './ToDoForm';
import Popup from './Popupcomponents/Popup';
import Settings from './Settings/settingspopup'; 

function App() {

  // Store api key and base as variables
  const api = {
    key: "3ccd7c2b35621b24433e01aac28af74f",
    base: "https://api.openweathermap.org/data/2.5/"
  }
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  //Input for API to fetch data in either metric or Imperial.
  let unit = 'Metric';
    
  let unitType = 'C';
  if (unit === 'Imperial'){
    unitType = 'F'
  }

  // Get current Location of user 
  const [details, setDetails] = useState(null);
  const getUserGeolocationDetails = () => {
    fetch(
        "https://geolocation-db.com/json/0f761a30-fe14-11e9-b59f-e53803842572"
    )
        .then(response => response.json())
        .then(data => setDetails(data));
  };
  const getlocation =()=>{
    getUserGeolocationDetails();
    fetch(`${api.base}weather?q=${details.city}&units=${unit}&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
      });
  }
  
  // In event that user uses the search to get the weather for a particular city 
  // Search bar takes value and passes the value when "enter" is pressed to fetch results
  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=${unit}&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          /* console.log(result); */
        });
    }
  }

  // Upcomingclass(aka to-do)
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

  // popup screen disply configs
  const[buttonPopup, setButtonPopup] = useState(false);
  const[timedPopup, setTimedPopup] = useState(false);
  const[settingPopup, setSettingPopup] = useState(false);
  //Timed Popup for use location, which shows after couple sec loading
  useEffect(() =>{
    setTimeout(() =>{
      setTimedPopup(true);
    }, 1000);
  },[]);

  //Returns all the html for the application

  return (
    //changes wallpaper based on the condition defined from the location given
    <div className={(typeof weather.main != "undefined") ? (
    // ((new Date()).getTime() < weather.sys.Sunrise && (new Date()).getTime() > weather.sys.Sunset) ? 'App Night' : 'App' &&
    (weather.weather[0].main === "Clear") ? 'App clear' : 'App' && 
    (weather.weather[0].main === "Clouds") ? 'App cloudy' : 'App' &&
    (weather.weather[0].main === "Snow") ? 'App snow' : 'App' &&
    (weather.weather[0].main === "Rain") ? 'App rain' : 'App')
    : 'App'}>
      
      {/* search a location box  */}
      <div>
          <div className="search-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
              <input type="text" placeholder="Search Location" onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search} />
          </div>
          
          {/* Use location popup when page has load */}
          <Popup trigger={timedPopup} setTrigger={setTimedPopup}>
            <h1> Allow Use of Current Location</h1>
          <button onClick={getlocation}>Use Location</button>
          </Popup> 

          {(typeof weather.main != "undefined") ? (
          <div className = 'MainData'>

            {/* Display city name  */}
            <div className='city'>
                <div>{weather.name}</div>
            </div>
            
            {/* Display properites such as the temperature, condition, max & min temperature and humidity of the location given  */}
            <div>
              <div className='temperature'>{Math.round(weather.main.temp)}°{unitType}</div>
                <div className='conditions'>{weather.weather[0].main}</div>
                <div className = 'range'>H:&nbsp;{Math.round(weather.main.temp_max)}°  &nbsp;&nbsp;&nbsp; L: &nbsp;{Math.round(weather.main.temp_min)}° </div>
                <div className = 'humStyles'>Humidity: {weather.main.humidity}% </div>
            </div>

          </div>
      ) : ('')}
      </div>

      <button className='settingsbutton' onClick={() => setSettingPopup(true)}> <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-gear-fill" viewBox="0 0 16 16">
        <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
        </svg>
      </button>
      <Settings trigger={settingPopup} setTrigger={setSettingPopup}>
        <h1 className= 'settings-title'>Toggle Metric/Imperial</h1>
        <label class="switch">
         <input type="checkbox"></input>
          <span class="slider round"></span>
          </label>
      </Settings>

      {/* Upcomingclass feaature (Extra Feature)  */}
      <div className='upcomingclasscomponents'>
        <Header />
        <div className='container'>
          <ToDoList toDoList={toDoList} handleToggle={handleToggle} handleFilter={handleFilter}/>
        </div>
        <div>
          <button className='addbutton' onClick={() => setButtonPopup(true)}> + Add</button>
          <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
            <h2 className='addheader'>Add New Class</h2>
            <ToDoForm addTask={addTask} />
          </Popup>
          </div>
      </div>

    </div>
  );
}

export default App;
