const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");
const bestEl = document.getElementById("best");
const stateEl = document.getElementById("state");

const keys = new Set();
const rand = (min, max) => Math.random() * (max - min) + min;
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

let best = Number(localStorage.getItem("arenaPrototypeBest") || 0);
let game;

function resetGame() {
  game = {
    over: false,
    score: 0,
    time: 0,
    player: { x: 480, y: 270, r: 14, speed: 245 },
    core: spawnCore(),
    drones: [
      spawnDrone(1),
      spawnDrone(1.2),
      spawnDrone(1.35)
    ]
  };
  stateEl.textContent = "Collect cores";
}

function spawnCore() {
  return {
    x: rand(50, canvas.width - 50),
    y: rand(50, canvas.height - 50),
    r: 10
  };
}

function spawnDrone(multiplier) {
  const edge = Math.floor(rand(0, 4));
  const drone = {
    x: edge === 0 ? -30 : edge === 1 ? canvas.width + 30 : rand(0, canvas.width),
    y: edge === 2 ? -30 : edge === 3 ? canvas.height + 30 : rand(0, canvas.height),
    r: 16,
    speed: 80 * multiplier
  };
  return drone;
}

function update(dt) {
  if (game.over) {
    if (keys.has("r")) resetGame();
    return;
  }

  game.time += dt;
  const input = {
    x: Number(keys.has("arrowright") || keys.has("d")) - Number(keys.has("arrowleft") || keys.has("a")),
    y: Number(keys.has("arrowdown") || keys.has("s")) - Number(keys.has("arrowup") || keys.has("w"))
  };
  const length = Math.hypot(input.x, input.y) || 1;
  game.player.x = clamp(game.player.x + (input.x / length) * game.player.speed * dt, game.player.r, canvas.width - game.player.r);
  game.player.y = clamp(game.player.y + (input.y / length) * game.player.speed * dt, game.player.r, canvas.height - game.player.r);

  if (distance(game.player, game.core) < game.player.r + game.core.r) {
    game.score += 10;
    game.core = spawnCore();
    if (game.score % 30 === 0) {
      game.drones.push(spawnDrone(1 + game.score / 80));
    }
  }

  for (const drone of game.drones) {
    const dx = game.player.x - drone.x;
    const dy = game.player.y - drone.y;
    const len = Math.hypot(dx, dy) || 1;
    const pressure = 1 + game.time * 0.018;
    drone.x += (dx / len) * drone.speed * pressure * dt;
    drone.y += (dy / len) * drone.speed * pressure * dt;

    if (distance(game.player, drone) < game.player.r + drone.r) {
      game.over = true;
      best = Math.max(best, game.score);
      localStorage.setItem("arenaPrototypeBest", String(best));
      stateEl.textContent = "Game over - press R";
    }
  }
}

function drawGrid() {
  ctx.strokeStyle = "#242b36";
  ctx.lineWidth = 1;
  for (let x = 0; x <= canvas.width; x += 48) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y <= canvas.height; y += 48) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid();

  ctx.fillStyle = "#59d6a3";
  ctx.beginPath();
  ctx.arc(game.core.x, game.core.y, game.core.r, 0, Math.PI * 2);
  ctx.fill();

  for (const drone of game.drones) {
    ctx.fillStyle = "#ff6b6b";
    ctx.beginPath();
    ctx.arc(drone.x, drone.y, drone.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#ffc1c1";
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  ctx.save();
  ctx.translate(game.player.x, game.player.y);
  ctx.fillStyle = "#f3f6fb";
  ctx.beginPath();
  ctx.moveTo(18, 0);
  ctx.lineTo(-12, -12);
  ctx.lineTo(-7, 0);
  ctx.lineTo(-12, 12);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  if (game.over) {
    ctx.fillStyle = "rgba(17, 19, 24, 0.72)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#f3f6fb";
    ctx.font = "700 42px system-ui";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2 - 10);
    ctx.font = "500 18px system-ui";
    ctx.fillText("Press R to restart", canvas.width / 2, canvas.height / 2 + 28);
  }

  scoreEl.textContent = game.score;
  bestEl.textContent = best;
}

let last = performance.now();
function loop(now) {
  const dt = Math.min((now - last) / 1000, 0.033);
  last = now;
  update(dt);
  draw();
  requestAnimationFrame(loop);
}

window.addEventListener("keydown", (event) => keys.add(event.key.toLowerCase()));
window.addEventListener("keyup", (event) => keys.delete(event.key.toLowerCase()));

bestEl.textContent = best;
resetGame();
requestAnimationFrame(loop);

