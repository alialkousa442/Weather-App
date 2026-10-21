export async function getWeatherData(city) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=AX8PEYGZAX7E2M2HD7VUAKYBL&contentType=json`
    );
    if (!response.ok) {
      throw new Error('City not found or network error');
    }
    const weatherData = await response.json();
    const clearData=extractWeatherData(weatherData);
    return clearData;
  } catch (error) {
    console.log('يوجد خطأ', error);
  }
}
 function extractWeatherData(opject) {
    const city=opject.resolvedAddress;
    const temp=opject.currentConditions.temp;
    const humidity=opject.currentConditions.humidity;
    const conditions=opject.currentConditions.conditions;
    return {
        city,
        temp,
        humidity,
        conditions
    }
 }