const weather = document.querySelector(".js-weather");

const API_KEY = '3d118924307041340ab8ee58083a920e';

const COORDS = 'coords';

function getWeather(lat, lon){
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response) {
        return response.json();
    }).then(json=>{
        console.log(json);
        const place = json.name;
        const temperature = json.main.temp;
        weather.innerText = `${temperature} @ ${place}`;
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