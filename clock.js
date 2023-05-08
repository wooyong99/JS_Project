const clockContainer = document.getElementsByClassName("js-clock");
const clockTitle = document.getElementById("clock-title");

function getTime() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  // 10보다 작을 경우 0을 붙여서 출력
  clockTitle.innerHTML = `${hours <10 ? `0${hours}` : hours}:${minutes<10 ? `0${minutes}` : minutes}:${seconds<10 ? `0${seconds}` : seconds}`;
}

function init (){
  // 1초 후에 실행되므로 getTime 함수 먼저 실행
  getTime();
  setInterval(getTime, 1000);
}

init();