const weather = document.querySelector(".js-weather");

const API_KEY = '3d118924307041340ab8ee58083a920e';

const COORDS = 'coords';

function getWeatherImg(weather){
  const today_icon = document.querySelector(".today-icon");
  const img = new Image();
    img.src = `images/${weather}.png`;
    today_icon.appendChild(img);
}

function getWeather(lat, lon){
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response) {
        return response.json();
    }).then(json=>{
        console.log(json);
        const weather = json.weather[0].main;
        console.log(weather);
        getWeatherImg(weather);

        const city = json.name;
        const place = document.querySelector(".city");
        place.innerHTML = `${city}`;

        const temperature = json.main.temp;
        const temp = document.querySelector(".temp");
        temp.innerHTML = `${temperature}`;

        const max_temp = json.main.temp_max;
        const max = document.querySelector(".max");
        max.innerHTML = `${max_temp}`;

        const min_temp = json.main.temp_min;
        const min = document.querySelector(".min");
        min.innerHTML = `${min_temp}`;

        const wind_speed = json.wind.speed;
        const wind = document.querySelector(".wind");
        wind.innerHTML = `${wind_speed}`;

        const clouds= json.clouds.all;
        const cloud = document.querySelector(".clouds");
        cloud.innerHTML = `${clouds}`;
    });
}

function saveCoords(coordsObj){
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
  const latitude = position.coords.latitude;
  console.log(latitude);
  const longitude = position.coords.longitude;
  console.log(longitude);
  const coordsObject = {
    latitude,
    longitude
  };
  saveCoords(coordsObject);
  getWeather(latitude, longitude);
}
function handleGeoError(){
  console.log("failed");
}

function askforCoords(){
  navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError)
}

function loadCoords(){
  const loadedCoords = localStorage.getItem(COORDS);
  if(loadedCoords === null){
    console.log(loadedCoords)
    askforCoords();
  }else{
    const parsedCoords = JSON.parse(loadedCoords);
    console.log(parsedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}
function init(){
  loadCoords();
}
init();