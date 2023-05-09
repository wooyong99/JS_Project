const body = document.querySelector("body");

const IMG_NUMBER = 5;

function paintImage(imgNumber){
  const image = new Image();
  image.src = `images/${imgNumber}.jpg`;
  body.appendChild(image);
  image.classList.add("bgImage");
}

function genRandom(){
  const number = Math.floor(Math.random()*IMG_NUMBER);
  return number;
}

function init(){
  const randomNum = genRandom();
  paintImage(randomNum);
}
init();
