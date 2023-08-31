
const input = document.getElementById('cityName');
const submitBtn = document.getElementById('submit');
const loader = document.getElementById('loading');
const results = document.getElementById('results');
const countryName = document.getElementById('country');
const city = document.getElementById('city');
const temperature = document.getElementById('temperature');
const feelsLike = document.getElementById('feels_like');
const pressure = document.getElementById('pressure');
const weatherImage = document.getElementById('weather-img');
const modeBtn = document.getElementById('mode-button');
const cardMode = document.querySelector('.card');

//Add event Listener to submit button
submitBtn.addEventListener('click', function (e) {

    //Hide results
    document.getElementById('results').style.display = 'none';

    //Display loader
    loader.style.display = 'block';
    getTemperature(input.value); 
    e.preventDefault();
    
})

//Get Temperature
async function getTemperature(cityName) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=44d8add5b5bccfdce2b6662d2ae7c490&units=metric`)
        const weatherData = await response.json();
        countryName.value = weatherData.sys.country;
        city.value = weatherData.name;
        temperature.value = weatherData.main.temp;
        feelsLike.value = weatherData.main.feels_like;
        humidity.value = weatherData.main.humidity;
        pressure.value = weatherData.main.pressure;
        const weatherState = weatherData.weather[0].description;
       
        setTimeout(showDetails(weatherState), 4000);
       
    }
    catch (error) {
        showError(error);
    }
    
}

function showDetails(state) {

    //Clear Input field
    input.value = '';
    //Hide loader
    loader.style.display = 'none';
    //Display result
    results.style.display = 'block';


    //Conditions
    if (state.includes('smoke')) {
        const newImg = `<img src="../images/smoke.jpg" alt="Img not available" class="weather-img">`;
        weatherImage.innerHTML = newImg; 
    }
    else if (state.includes('cloud')) {
        const newImg = `<img src="../images/cloud.png" alt="Img not available" class="weather-img">`;
        weatherImage.innerHTML = newImg; 
    }
    else if (state.includes('rain' || drizzle)) {
        const newImg = `<img src="../images/rain.png" alt="Img not available" class="weather-img">`;
        weatherImage.innerHTML = newImg; 
    }
    else if (state.includes('snow')) {
        const newImg = `<img src="../images/snowflake.png" alt="Img not available" class="weather-img">`;
        weatherImage.innerHTML = newImg; 
    }
    else if (state.includes('thunderstorm')) {
        const newImg = `<img src="../images/storm.jpg" alt="Img not available" class="weather-img">`;
        weatherImage.innerHTML = newImg; 
    }
    else if (state.includes('clear sky')) {
        const newImg = `<img src="../images/clear.png" alt="Img not available" class="weather-img">`;
        weatherImage.innerHTML = newImg; 
    }

}

function showError(error) {

    //Hide results
    results.style.display = 'none';
    //Hide loader
    loader.style.display = 'none';

    //Create a div
    const errorDiv = document.createElement('div');
    //Get Elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    //Add class
    errorDiv.className = 'alert alert-danger';
    //Create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));
    //Insert error above heading
    card.insertBefore(errorDiv, heading);
    //Clear error after 3 seconds
    setTimeout(clearError, 3000);  //3000ms = 3s
}

//Clear error
function clearError() {
    document.querySelector('.alert').remove();
}

//Mode Change
modeBtn.addEventListener('click', function () {
   
    console.log('mode');
    cardMode.classList.toggle('dark-mode');
})
