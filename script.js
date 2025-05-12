async function getWeather() {
  const city = document.getElementById('city').value.trim();
  const loading = document.getElementById('loading');
  const weatherInfo = document.getElementById('weather-info');
  const app = document.getElementById('app');
  const weatherIcons = {
    clear: '☀️',
    clouds: '☁️',
    rain: '🌧️',
    snow: '❄️',
    thunderstorm: '⛈️',
    drizzle: '🌦️',
    mist: '🌫️',
    default: '🌍'
  };

  if (!city) {
    weatherInfo.innerHTML = '<p>Please enter a city name.</p>';
    return;
  }

  const apiKey = 'c4d839de5854c5c847bcea52458286bb';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  loading.style.display = 'block';
  weatherInfo.innerHTML = '';

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('City not found');
    const data = await response.json();

    const weather = data.weather[0].main.toLowerCase();
    updateBackground(weather);

    const weatherDetails = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>Temperature: ${data.main.temp}°C</p>
      <p>Weather: ${data.weather[0].description}</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
    weatherInfo.innerHTML = weatherDetails;
  } catch (error) {
    weatherInfo.innerHTML = `<p>${error.message}</p>`;
  } finally {
    loading.style.display = 'none';
  }
}

function updateBackground(condition) {
  const body = document.body;
  const backgrounds = {
    clear: 'linear-gradient(to bottom, #fceabb, #f8b500)',
    clouds: 'linear-gradient(to bottom, #d7d2cc, #304352)',
    rain: 'linear-gradient(to bottom, #314755, #26a0da)',
    snow: 'linear-gradient(to bottom, #e6dada, #274046)',
    thunderstorm: 'linear-gradient(to bottom, #373B44, #4286f4)',
    drizzle: 'linear-gradient(to bottom, #89f7fe, #66a6ff)',
    default: 'linear-gradient(to bottom, #87CEEB, #4682B4)'
  };
  body.style.background = backgrounds[condition] || backgrounds.default;
}

function updateDateTime() {
  const dateTimeElement = document.getElementById('current-date-time');
  const now = new Date();
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  };
  dateTimeElement.textContent = `Current Date & Time: ${now.toLocaleDateString('en-US', options)}`;
}

setInterval(updateDateTime, 1000);
updateDateTime();
document.getElementById('get-weather').addEventListener('click', getWeather);
document.getElementById('city').addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    getWeather();
  }
});
document.getElementById('app').addEventListener('click', function (event) {
  if (event.target.id === 'app') {
    document.getElementById('city').blur();
  }
});