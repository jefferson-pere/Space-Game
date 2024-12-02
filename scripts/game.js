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
const shotSpeed = 10; // tiro por segundo
const spaceshipDamage = 25; // dano nave
const timeToEndSpecialShot = 30 * 1000; // especial 30s

let canShot = true;
let specialShotIsActive = false;
let shoot = 25; // -25 enemy life

let positionX = 0;
let positionY = 0;
let moveX = spaceContainerWidth / 2;
let moveY = 0;
//mover
function spaceshipMove() {
  moveX += positionX * spaceshipSpeed;
  moveY += positionY * spaceshipSpeed;

  //limie da tela x
  const discountScreenLimit = spaceshipWidth / 2;

  moveX = Math.max(
    discountScreenLimit,
    Math.min(moveX, spaceContainerWidth - discountScreenLimit)
  );

  //limie da tela y

  moveY = Math.max(
    -discountScreenLimit,
    Math.min(
      moveY,
      spaceContainerHeight - spaceshipHeight - discountScreenLimit
    )
  );

  spaceship.style.left = moveX - discountScreenLimit + "px";
  spaceship.style.bottom = moveY + discountScreenLimit + "px";

  requestAnimationFrame(spaceshipMove);
}
//tiro
function createShot(classeName = "shot") {
  if (canShot) {
    const shot = document.createElement("div");
    shot.classList.add(classeName);

    if (specialShotIsActive) {
      shot.classList.add("specialShot");
      const shootSound = new Audio("../audios/shootSpecial.mp3");
      shootSound.volume = 0.3;
      shootSound.play();

      shot.style.left = moveX + "px";
      shot.style.bottom = moveY + spaceshipHeight + spaceshipHeight / 8 + "px";
    } else {
      const shootSound = new Audio("../audios/shoot.mp3");
      shootSound.volume = 1;
      shootSound.play();

      shot.style.left = moveX + "px";
      shot.style.bottom = moveY + spaceshipHeight + spaceshipHeight / 4 + "px";
    }
    spaceContainer.appendChild(shot);
    canShot = false;

    setTimeout(() => {
      canShot = true;
    }, 1000 / shotSpeed);
  }
}
function spaceshipShootRemove() {
  const shoots = document.querySelectorAll(".shot");

  shoots.forEach((shot) => {
    shot.addEventListener("animationend", () => {
      shot.remove();
    });
  });
  requestAnimationFrame(spaceshipShootRemove);
}
//controles
function gameControls(key) {
  switch (key.code) {
    case "Space":
      createShot();
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
spaceshipShootRemove();
