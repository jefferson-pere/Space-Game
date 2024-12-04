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

let enemiesDifficultyLevel = 1; //dificuldade dos inimigos
let pointsToIncrementDifficultyLevel = 1000; //dificuldade apos os 1000 pontos

let enemyX = Math.random() * spaceContainerWidth; // onde inimigos surgem
let enemyY = 100;

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
function createShot(className = "shot") {
  if (canShot) {
    const shot = document.createElement("div");
    shot.classList.add(className);

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
}
//enemigos
class EnemySpaceship {
  constructor(enemyNumber = 1, src, alt, className) {
    this.enemyNumber = enemyNumber;
    this.life = enemyNumber == 1 ? 100 : enemyNumber == 2 ? 300 : 600; // vida
    this.score = enemyNumber == 1 ? 250 : enemyNumber == 2 ? 500 : 1000; // pontos
    this.damage = enemyNumber == 1 ? 20 : enemyNumber == 2 ? 30 : 50; // dano
    this.flyCategory = (Math.random() - 0.5) * 3; //positivo/negativo
    this.x = 0;
    this.y = 0;
    this.offscreenTopElementDiscount = 200; // enemigo nasce -px
    this.#createElement(src, alt, className);
  }
  #createElement(src, alt, className) {
    this.element = document.createElement("img");
    this.element.src = src;
    this.element.alt = alt;
    this.element.className = className;

    this.element.style.position = "absolute";
    this.element.style.top = `-${this.offscreenTopElementDiscount}px`; //

    document.querySelector(".enemies").appendChild(this.element);
  }
}
function createEnemies() {
  enemiesDifficultyLevel =
    score == 0 ? 1 : Math.ceil(score / pointsToIncrementDifficultyLevel);

  const delayIntervalTime = Math.max(
    Math.random() * 1000 + 1000 / enemiesDifficultyLevel,
    500
  ); // tempo para surgir inimigos

  setInterval(() => {
    let randomEnemyType = Math.ceil(Math.random() * 100);

    if (randomEnemyType <= 50) {
      randomEnemyType = 1; //50%
    } else if (randomEnemyType <= 80) {
      randomEnemyType = 2; //30%
    } else if (randomEnemyType <= 95) {
      randomEnemyType = 3; //15%
    } else if (randomEnemyType <= 100) {
      //5%
    }

    new EnemySpaceship(
      randomEnemyType,
      `../images/enemy${randomEnemyType}.gif`,
      `enemy${randomEnemyType}`,
      `enemy${randomEnemyType}`
    );
  }, 1000);
}
//controles
function gameControls(key) {
  switch (key.code) {
    case "Space":
      createShot();
      spaceshipShootRemove();
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
createEnemies();
