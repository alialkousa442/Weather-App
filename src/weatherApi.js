export async function getWeatherData(city) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=AX8PEYGZAX7E2M2HD7VUAKYBL&contentType=json`
    );
    if (!response.ok) {
      throw new Error('City not found or network error');
    }
    const weatherData = await response.json();
    return weatherData;
  } catch (error) {
    console.log('يوجد خطأ', error);
  }
}
