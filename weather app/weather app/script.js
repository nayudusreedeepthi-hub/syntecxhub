

window.onload = function () {

    const user = localStorage.getItem("weatherUser");

    if (user) {
        showWeatherPage(user);
    }
};

function login() {

    const username =
        document.getElementById("username").value;

    const password =
        document.getElementById("password").value;

    if (username === "" || password === "") {
        alert("Enter Username and Password");
        return;
    }

    localStorage.setItem(
        "weatherUser",
        username
    );

    showWeatherPage(username);
}

function showWeatherPage(username) {

    document.getElementById("login-container")
        .style.display = "none";

    document.getElementById("weather-container")
        .style.display = "block";

    document.getElementById("userName")
        .innerText = username;
}

function logout() {

    localStorage.removeItem("weatherUser");

    location.reload();
}

async function getWeather() {

    const city =
        document.getElementById("city").value;

    if (city === "") {
        alert("Enter a city name");
        return;
    }

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {

        const response =
            await fetch(url);

        const data =
            await response.json();

        document.getElementById("weatherResult")
            .innerHTML = `

        <div class="weather-box">

        <h2>${data.name}</h2>

        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">

        <h3>${data.main.temp} °C</h3>

        <p>${data.weather[0].description}</p>

        <p>Humidity: ${data.main.humidity}%</p>

        <p>Wind Speed: ${data.wind.speed} m/s</p>

        </div>
        `;

    } catch (error) {

        document.getElementById("weatherResult")
            .innerHTML =
            "<h3>City not found!</h3>";
    }
}

async function getWeather() {

    const city = document.getElementById("city").value;

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {

        const response = await fetch(url);
        const data = await response.json();

        console.log(data);

        if (data.cod != 200) {
            document.getElementById("weatherResult").innerHTML =
                `<h3>${data.message}</h3>`;
            return;
        }

        document.getElementById("weatherResult").innerHTML = `
        <h2>${data.name}</h2>
        <h3>${data.main.temp} °C</h3>
        <p>${data.weather[0].description}</p>
        `;

    } catch (error) {
        console.log(error);
    }
}
async function getWeather() {

    const city = document.getElementById("city").value;

    const url =
        `https://wttr.in/${city}?format=j1`;

    const response = await fetch(url);
    const data = await response.json();

    document.getElementById("weatherResult").innerHTML = `
        <h2>${city}</h2>
        <h3>${data.current_condition[0].temp_C} °C</h3>
        <p>${data.current_condition[0].weatherDesc[0].value}</p>
        <p>Humidity: ${data.current_condition[0].humidity}%</p>
    `;
}