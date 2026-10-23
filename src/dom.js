import { getWeatherData } from './weatherApi';
let lastWeatherData = null;
let currentUnit = 'F';
const cityInput = document.querySelector('#city-input');
const search = document.querySelector('#search-btn');
const weatherDisplay = document.querySelector('#weather-display');
const cityName = document.querySelector('#city-name');
const temp = document.querySelector('#temp-id');
const humidity = document.querySelector('#humidity-id');
const conditions = document.querySelector('#conditions');
const unitToggleBtn = document.querySelector('#unit-toggle-btn');

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
  lastWeatherData = data;
  const weatherIcon = document.getElementById('weather-icon');
  cityName.textContent = data.city;
  humidity.textContent = `Humidity: ${data.humidity}%`;
  conditions.textContent = data.conditions;
  displayTemperature();
  unitToggleBtn.style.display = 'inline-block';
  weatherDisplay.style.display = 'block';
  const iconMap = {
    "Clear": "01d",
    "Clouds": "02d",
    "Partially cloudy":"02d",
    "Overcast": "04d", 
    "Rain": "10d",
    "Drizzle": "09d",
    "Thunderstorm": "11d",
    "Snow": "13d",
    "Mist": "50d",
    "Fog": "50d"
  };
  const iconCode = iconMap[data.conditions] || "01d";
  weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  weatherIcon.style.display = 'inline-block';

}
function displayTemperature() {
  if (!lastWeatherData) return;

  let displayTemp = lastWeatherData.temp;

  if (currentUnit === 'C') {
    displayTemp = (displayTemp - 32) * (5 / 9);
    temp.textContent = `${Math.round(displayTemp)}°C`;
  } else {
    temp.textContent = `${Math.round(displayTemp)}°F`;
  }
}
unitToggleBtn.addEventListener('click', () => {
  currentUnit = currentUnit === 'F' ? 'C' : 'F';

  displayTemperature();
});

async function handleSearch() {
  showError('');
  unitToggleBtn.style.display = 'none';
  weatherDisplay.style.display = 'none';

  const cityNameValue = cityInput.value.trim();
  if (!cityNameValue) {
    showError('الرجاء ادخال اسم المدينة');
    return;
  }
  try {
    const weatherData = await getWeatherData(cityNameValue);
    renderWeather(weatherData);
  } catch (error) {
    unitToggleBtn.style.display = 'none';
    weatherDisplay.style.display = 'none';
    showError('تعذر جلب البيانات. يرجى التأكد من اسم المدينة والحالة الشبكية.');
  }
}
search.addEventListener('click', handleSearch);
