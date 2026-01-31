// Fetch the weather data from OpenWeatherMap API (replace with your actual API key)
const PUBLIC_OPENWEATHERMAP_API_KEY = "6daa10acde06de3eaa8ff1a5b3cefd24"; // Replace with your OpenWeatherMap API key

// Function to fetch weather data based on the user's coordinates
async function fetchWeatherData(lat, lon) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${PUBLIC_OPENWEATHERMAP_API_KEY}`);
    const data = await response.json();
    const weatherCondition = data.weather[0].main.toLowerCase();

    // Update the background based on weather
    updateBackgroundBasedOnWeather(weatherCondition);
}

// Function to update the background based on weather condition
function updateBackgroundBasedOnWeather(condition) {
    // Remove all weather-related background classes before adding a new one
    document.body.classList.remove('rainy', 'cloudy', 'snowy', 'default-background');

    // Set background based on the weather condition
    if (condition.includes("clear")) {
        document.body.classList.add('morning');  // Clear: Morning background
    } else if (condition.includes("cloud")) {
        document.body.classList.add('cloudy'); // Cloudy: Cloudy background
    } else if (condition.includes("rain")) {
        document.body.classList.add('rainy'); // Rainy: Rain animation
    } else if (condition.includes("snow")) {
        document.body.classList.add('snowy'); // Snow: Snow animation
    } else {
        document.body.classList.add('default-background'); // Default background if no condition matched
    }
}

// Function to get the user's current location (latitude and longitude)
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            // Fetch weather data based on the user's location
            fetchWeatherData(lat, lon);
        }, () => {
            alert("Geolocation failed! Default weather will be shown.");
            fetchWeatherData(51.5074, -0.1278); // Default to London if geolocation fails
        });
    } else {
        alert("Geolocation is not supported by this browser.");
        fetchWeatherData(51.5074, -0.1278); // Default to London if geolocation is not available
    }
}

// Function to switch the background based on the time of day
function updateBackgroundBasedOnTime() {
    const hours = new Date().getHours();

    // Remove any previous background class
    document.body.classList.remove('morning', 'afternoon', 'evening', 'night');

    // Determine the background class based on time
    if (hours >= 6 && hours < 12) {
        document.body.classList.add('morning');
    } else if (hours >= 12 && hours < 18) {
        document.body.classList.add('afternoon');
    } else if (hours >= 18 && hours < 21) {
        document.body.classList.add('evening');
    } else {
        document.body.classList.add('night');
    }
}

// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Function to save car profile in localStorage
function saveCarProfile() {
    const carModel = document.getElementById('carModel').value;

    if (carModel) {
        // Save to localStorage
        localStorage.setItem('carProfile', JSON.stringify({ carModel }));
        alert('Car profile saved successfully!');
    } else {
        alert('Please fill out the car model');
    }
}

// Function to retrieve car profile from localStorage
function loadCarProfile() {
    const carProfile = JSON.parse(localStorage.getItem('carProfile'));
    if (carProfile) {
        document.getElementById('carModel').value = carProfile.carModel;
    }
}

// Function to calculate MPG based on starting and ending mileage
function calculateMPG() {
    let amountSpent = parseFloat(document.getElementById('amountSpent').value);
    let pricePerGallon = parseFloat(document.getElementById('pricePerGallon').value);
    let startMileage = parseFloat(document.getElementById('startMileage').value);
    let endMileage = parseFloat(document.getElementById('endMileage').value);

    // Validate inputs
    if (isNaN(amountSpent) || isNaN(pricePerGallon) || isNaN(startMileage) || isNaN(endMileage)) {
        alert("Please fill all fields correctly!");
        return;
    }

    // Calculate total miles driven and gallons purchased
    let totalMilesDriven = endMileage - startMileage;
    let gallonsPurchased = amountSpent / pricePerGallon;

    // Calculate MPG
    let mpg = totalMilesDriven / gallonsPurchased;

    // Display result
    document.getElementById('result').innerHTML = `
        <h2>Calculated MPG:</h2>
        <p><strong>Total Miles Driven:</strong> ${totalMilesDriven.toFixed(2)} miles</p>
        <p><strong>Gallons of Fuel:</strong> ${gallonsPurchased.toFixed(2)} gallons</p>
        <p><strong>Calculated MPG:</strong> ${mpg.toFixed(2)} mpg</p>
    `;

    // Store fuel data for chart
    storeFuelData(mpg);
}

// Function to store fuel data for graphical representation
function storeFuelData(mpg) {
    let fuelData = JSON.parse(localStorage.getItem('fuelData')) || [];
    if (fuelData.length >= 5) {
        fuelData.shift(); // Remove the oldest entry to maintain the latest 5
    }
    fuelData.push({ date: new Date().toLocaleDateString(), mpg }); // Add new data with current date
    localStorage.setItem('fuelData', JSON.stringify(fuelData));

    renderChart(); // Re-render the chart after storing new data
}

// Function to render the chart based on stored data
function renderChart() {
    const fuelData = JSON.parse(localStorage.getItem('fuelData')) || [];
    if (fuelData.length === 0) {
        return; // Do not render the chart if there's no data
    }

    const dates = fuelData.map(data => data.date);
    const mpgValues = fuelData.map(data => data.mpg);

    const ctx = document.getElementById('fuelEfficiencyChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Fuel Efficiency (MPG)',
                data: mpgValues,
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 5
                    }
                }
            }
        }
    });
}

// Load car profile and chart data on page load
window.onload = function() {
    loadCarProfile();
    updateBackgroundBasedOnTime(); // Set time-based background on page load
    getUserLocation(); // Fetch and update background based on weather using user's location
    renderChart(); // Ensure the chart is rendered when the page loads
}
