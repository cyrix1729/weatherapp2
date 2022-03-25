// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';

export default class Iphone extends Component {
    //var Iphone = React.createClass({

    // a constructor with initial set states
    constructor(props) {
        super(props);
        // temperature state
        this.state.temp = "";
        // button display state
        this.setState({ display: true });
    }

    // a call to fetch weather data via wunderground
    fetchWeatherData = () => {
        // API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
        var url = "http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=3ccd7c2b35621b24433e01aac28af74f";
        $.ajax({
                url: url,
                dataType: "jsonp",
                success: this.parseResponse,
                error: function(req, err) { console.log('API call failed ' + err); }
            })
            // once the data grabbed, hide the button
        this.setState({ display: false });
    }

    
    // the main render method for the iphone component
    render() {
        // check if temperature data is fetched, if so add the sign styling to the page
        const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
        const humStyles = this.state.hum ? `${style.hum} ${style.filledH}` : style.mul;
        const hiStyles = this.state.hi ? `${style.hi} ${style.filledR}` : style.hi;
        const loStyles = this.state.lo ? `${style.lo} ${style.filledR}` : style.lo;

        // display all weather data
        return ( 
               // Capitalize the first letter of the weather type
          
            <div class = { style.container }>
                <div class = { style.header } >
                <div class = { style.city } > { this.state.locate } < /div> 
                
                <span class = { tempStyles } > { this.state.temp } < /span> < /div > 
                <div class = { style.conditions } > {String(this.state.cond)[0].toUpperCase()+ String(this.state.cond).slice(1)}< /div> 
            
                

                {/* Display high and low temperatures */}
                <div class = {style.range}>
                <div class = { hiStyles } > H: {parseInt(this.state.hi) } < /div> 
                <div class = { loStyles } > L:{parseInt(this.state.lo) } < /div> 
                </div>
        
                <div class = { humStyles} > {this.state.hum} < /div>
                <div class = { style_iphone.container } > {
                    this.state.display ? < Button class = { style_iphone.button }
                    clickFunction = { this.fetchWeatherData }/ > : null } </div> 
            </div>
               
            );
            
        }


        // var con = con.toString(this.state.cond)
        // const fi = con[0]
        // con = fi + this.state.cond)} < /div> 


        parseResponse = (parsed_json) => {
            var location = parsed_json['name'];
            var temp_c = parsed_json['main']['temp'];
            var conditions = parsed_json['weather']['0']['description'];
            var max = parsed_json['main']['temp_min'];
            var min = parsed_json['main']['temp_max'];
            var humidity = parsed_json['main']['humidity'];


         
            // set states for fields so they could be rendered later on
            this.setState({
                locate: location,
                temp: temp_c,
                cond: conditions,
                hi: max,
                lo: min,
                hum: humidity,

            });

        }
       
        
    }