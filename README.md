# **Fuel Mileage Calculator with Weather-Based Background**

A dynamic web app that calculates **fuel efficiency (MPG)** based on user inputs and provides a **weather-based background** using **geolocation**. The background changes based on the current weather conditions (rain, snow, cloud, clear) fetched from the **OpenWeatherMap API**. The app also includes a **dark mode toggle** and time-based background changes (morning, afternoon, evening, night).

## **Features**
- **Fuel Efficiency Calculation (MPG)**: Automatically calculates miles per gallon based on the starting and ending mileage, amount spent on fuel, and the price per gallon.
- **Time-Based Background**: Changes the background based on the time of day (morning, afternoon, evening, night).
- **Weather-Based Background**: Fetches the current weather using geolocation and updates the background based on weather conditions (rain, snow, cloud, or clear).
- **Dark Mode**: A toggle to switch between dark mode and light mode for the entire page.
- **User Profile**: Saves the car model to **localStorage** to store the user's car profile for future use.

## **Getting Started**

### **Prerequisites**
To run this project, you need:
- A **Web Browser** (Chrome, Firefox, etc.)
- A **Text Editor** (VSCode, Sublime Text, etc.)
- An **OpenWeatherMap API key** to fetch weather data (You can get one [here](https://openweathermap.org/api)).

### **Setup**

1. Clone this repository:
   ```bash
   git clone https://github.com/syedrakesh/fuel-mileage-calculator.git
   cd fuel-mileage-calculator
