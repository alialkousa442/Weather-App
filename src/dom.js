import { getWeatherData } from "./weatherApi";
const cityTnput=document.querySelector('#city-input');
const search=document.querySelector('#search-btn');
const weatherDisplay=document.querySelector('#weather-display');
const cityName=document.querySelector('#city-name');
const temp=document.querySelector('#temp-id');
const humidity=document.querySelector('#humidity-id');
const conditions=document.querySelector('#conditions');


function showError(message) {
    const errorSpan = document.getElementById('error-message');
    errorSpan.textContent = message;
    
    if (message) {
        errorSpan.style.display = 'block';
    } else {
        errorSpan.style.display = 'none';
    }
}

export function renderWeather(data) {
    
    cityName.textContent = data.city;
    temp.textContent = `${data.temp}°F`;
    humidity.textContent = `Humidity: ${data.humidity}%`;
    conditions.textContent = data.conditions;
}

async function handleSearch() {
    showError('')

    const cityNameValue=cityTnput.value.trim();
    if (!cityNameValue) {
        showError('الرجاء ادخال اسم المدينة')
        return
    }
    try{
         const weatherData=await getWeatherData(cityNameValue);
    renderWeather(weatherData);

    }
    catch(error){
        showError('تعذر جلب البيانات. يرجى التأكد من اسم المدينة والحالة الشبكية.')

    }
   
}
search.addEventListener('click',handleSearch);