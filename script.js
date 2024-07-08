document.addEventListener("DOMContentLoaded", () => {
    
    const dateTimeElement = document.getElementById("date-time");
    setInterval(() => {
        const now = new Date();
        dateTimeElement.textContent = `Date: ${now.toLocaleDateString()} Time: ${now.toLocaleTimeString()}`;
    }, 1000);

    const locationElement = document.getElementById("location");
    const weatherElement = document.getElementById("weather");
    const weatherApiKey = 'ff095e521d638dfd4df69bd62e720832';
    const locationApiKey = '2fab46d546db4261a6338d91f50256f8';

    
    fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${locationApiKey}`)
        .then(response => response.json())
        .then(data => {
            const { latitude, longitude, city, country_name } = data;
            locationElement.textContent = `Location: ${city}, ${country_name}`;

            
            return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&units=metric`);
        })
        .then(response => response.json())
        .then(data => {
            weatherElement.textContent = `Weather: ${data.weather[0].description}, Temperature: ${data.main.temp}°C`;
        })
        .catch(error => {
            locationElement.textContent = "Location: Unable to fetch location.";
            weatherElement.textContent = "Weather: Unable to fetch weather.";
            console.error("Error fetching location or weather:", error);
        });
});
