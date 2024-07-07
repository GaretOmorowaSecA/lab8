document.addEventListener("DOMContentLoaded", () => {
    // Display current date and time
    const dateTimeElement = document.getElementById("date-time");
    setInterval(() => {
        const now = new Date();
        dateTimeElement.textContent = `Date: ${now.toLocaleDateString()} Time: ${now.toLocaleTimeString()}`;
    }, 1000);

    const locationElement = document.getElementById("location");
    const weatherElement = document.getElementById("weather");
    const weatherApiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
    const locationApiKey = 'YOUR_IPGEOLOCATION_API_KEY';

    // Fetch current location from IP geolocation API
    fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${locationApiKey}`)
        .then(response => response.json())
        .then(data => {
            const { latitude, longitude, city, country_name } = data;
            locationElement.textContent = `Location: ${city}, ${country_name}`;

            // Fetch weather for the current location
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
