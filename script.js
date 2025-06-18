// sanity check
console.log("script.js loaded!");

// attach your handler (optional if you keep the inline onclick)
window.getWeather = async function() {
  console.log("getWeather() called");

  const city = document.getElementById("cityInput").value.trim();
  const resultEl = document.getElementById("result");
  const apiKey = "701d16f5f92942b295e133932251806";
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

  if (!city) {
    resultEl.innerHTML = `<p>Please enter a city name.</p>`;
    return;
  }

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.error) {
      resultEl.innerHTML = `<p>❌ ${data.error.message}</p>`;
      return;
    }

    const weatherHTML = `
      <h2 class="weather-h2">
        ${data.location.name}, ${data.location.country}
      </h2>
      <div class="temp-data">
        <p class="weather-p1">🌡 Temp: ${data.current.temp_c}°C</p>
        <p class="weather-p2">☁ Condition: ${data.current.condition.text}</p>
        <p class="weather-p3">💨 Wind: ${data.current.wind_kph} km/h</p>
      </div>
      <img
        class="weather-img"
        src="${data.current.condition.icon}"
        alt="${data.current.condition.text}"
      />
    `;

    resultEl.innerHTML = weatherHTML;
  } catch (err) {
    console.error(err);
    resultEl.innerHTML = `<p>⚠️ Failed to fetch weather data.</p>`;
  }
};
