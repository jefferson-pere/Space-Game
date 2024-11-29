const spaceContainer = document.querySelector(".spaceContainer");
const spaceship = document.querySelector(".spaceship");
const playerName = document.querySelector(".playerName");
const life = document.querySelector(".life");
const score = document.querySelector(".score");
const gammeOverButton = document.querySelector(".gameOver button");
//mover nave
const spaceContainerWidth = spaceContainer.offsetWidth;
const spaceContainerHeight = spaceContainer.offsetHeight;
const spaceshipWidth = spaceship.offsetWidth;
const spaceshipHeight = spaceship.offsetHeight;

const spaceshipSpeed = 10; // velocidade (px)

let positionX = 0;
let positionY = 0;
let moveX = spaceContainerWidth / 2;
let moveY = 0;

function spaceshipMove() {
  moveX += positionX * spaceshipSpeed;
  moveY += positionY * spaceshipSpeed;

  spaceship.style.left = moveX + "px";
  spaceship.style.bottom = moveY + "px";

  requestAnimationFrame(spaceshipMove);
}

function gameControls(key) {
  switch (key.code) {
    case "Space":
      break;
    case "ArrowUp":
    case "KeyW":
      positionY = 1;
      break;
    case "ArrowDown":
    case "KeyS":
      positionY = -1;
      break;
    case "ArrowLeft":
    case "KeyA":
      positionX = -1;
      spaceship.style.transform = "rotate(-15deg)";
      break;
    case "ArrowRight":
    case "KeyD":
      positionX = 1;
      spaceship.style.transform = "rotate(15deg)";
      break;
    default:
      break;
  }
}

function gameControlsCancel(key) {
  switch (key.code) {
    case "Space":
      break;
    case "ArrowUp":
    case "KeyW":
    case "ArrowDown":
    case "KeyS":
      positionY = 0;
      break;
    case "ArrowLeft":
    case "KeyA":
    case "ArrowRight":
    case "KeyD":
      positionX = 0;
      spaceship.style.transform = "rotate(0deg)";
      break;
    default:
      break;
  }
}

function setPlayerName() {
  playerName.innerHTML = localStorage.getItem("@spaceshipGame:playerName");
}

document.addEventListener("keydown", gameControls);
document.addEventListener("keyup", gameControlsCancel);

setPlayerName();
spaceshipMove();
