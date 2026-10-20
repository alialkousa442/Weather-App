 export async function getWeatherData(city) {

    try{
        const response =await fetch(
  `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=AX8PEYGZAX7E2M2HD7VUAKYBL&contentType=json`
);
const weatherData=await response.json();
console.log(weatherData);


    }
    catch(error){
        console.log("يوجد خطأ",error);
        
    }
}
