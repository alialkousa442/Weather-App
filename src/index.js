import './style.css'
import { getWeatherData } from "./weatherApi";
 const data=await getWeatherData("latakia");
 console.log(data);
 