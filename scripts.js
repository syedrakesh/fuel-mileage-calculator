// Function to save car profile in localStorage
function saveCarProfile() {
    const carModel = document.getElementById('carModel').value;
    const carMPG = document.getElementById('carMPG').value;

    if (carModel && carMPG) {
        // Save to localStorage
        localStorage.setItem('carProfile', JSON.stringify({ carModel, carMPG }));
        alert('Car profile saved successfully!');
    } else {
        alert('Please fill out both fields');
    }
}

// Function to retrieve car profile from localStorage
function loadCarProfile() {
    const carProfile = JSON.parse(localStorage.getItem('carProfile'));
    if (carProfile) {
        document.getElementById('carModel').value = carProfile.carModel;
        document.getElementById('carMPG').value = carProfile.carMPG;
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

// Function to calculate distance based on MPG
function calculateDistance() {
    let mpg = parseFloat(document.getElementById('mpg').value);
    let amountSpent = parseFloat(document.getElementById('amountSpent2').value);
    let pricePerGallon = parseFloat(document.getElementById('pricePerGallon2').value);

    // Validate inputs
    if (isNaN(amountSpent) || isNaN(pricePerGallon) || isNaN(mpg)) {
        alert("Please fill all fields correctly!");
        return;
    }

    // Calculate gallons purchased
    let gallonsPurchased = amountSpent / pricePerGallon;

    // Calculate estimated distance
    let miles = gallonsPurchased * mpg;

    // Display result
    document.getElementById('result').innerHTML = `
        <h2>Estimated Distance You Can Drive:</h2>
        <p><strong>Gallons of Fuel:</strong> ${gallonsPurchased.toFixed(2)} gallons</p>
        <p><strong>Estimated Miles You Can Drive:</strong> ${miles.toFixed(2)} miles</p>
    `;
}

// Toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Load car profile and chart data on page load
window.onload = function() {
    loadCarProfile();
    renderChart(); // Ensure the chart is rendered when the page loads
}
