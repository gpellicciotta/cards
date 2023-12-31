// Main code:

const targetDate = new Date(2024, 0, 1, 0, 0, 0);
const message = document.getElementById("message");
const canvas = document.getElementById("fireworks");

canvas.style.position = 'relative';
canvas.style.width = '80vw';
canvas.style.height = '80vh';
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

const ctx = canvas.getContext('2d');

let gravity = 0.2;
let snapTime = 0;

let fireworks = [];
let numOfFireworks = 20;

updateCountdownAndStartFireworks();

// Functions:

function updateCountdownAndStartFireworks() {
  let secondsUntil = Math.floor((targetDate.getTime() - new Date().getTime()) / 1000);
  if (secondsUntil >= 1) {
    if (secondsUntil < 20) {
      message.innerHTML = `${secondsUntil}`;
    }
    else {
      message.innerHTML = `${secondsUntil} secs`;
    }
    setTimeout(updateCountdownAndStartFireworks, 1000);
  }
  else {
    const year = new Date().getFullYear();
    message.innerHTML = `Happy ${year}`;
    startFireworks();
  }
}

function startFireworks() {
  window.addEventListener('resize', function() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
  });
  for (let i = 0; i < numOfFireworks; i++) {
    fireworks.push(new Firework(rndNum(canvas.width), canvas.height));
  }
  draw();  
}

function rndNum(num) {
  return (Math.random() * num) + 1;
}

function Vector(x, y) {
  this.x = x;
  this.y = y;

  this.add = function(o) {
    this.x = this.x + o.x;
    this.y = this.y + o.y;
  };
}

function Particle(pos, vel) {
  this.pos = new Vector(pos.x, pos.y);
  this.vel = vel;
  this.dead = false;
  this.start = 0;

  this.update = function(time) {
    let timeSpan = time - this.start;
    if (timeSpan > 500) {
      this.dead = true;
    }
    if (!this.dead) {
      this.pos.add(this.vel);
      this.vel.y = this.vel.y + gravity;
    }
  };

  this.draw = function() {
    if (!this.dead) {
      drawDot(this.pos.x, this.pos.y, 1);
    }
  };
}

function Firework(x, y) {
  this.pos = new Vector(x, y);
  this.vel = new Vector(0, -rndNum(10) - 3);
  this.color = 'hsl(' + rndNum(360) + ', 100%, 50%)'
  this.size = 4;
  this.dead = false;
  this.start = 0;
  let exParticles = [], exPLen = 100;
  let rootShow = true;

  this.update = function(time) {
    if (this.dead) {
      return;
    }
    rootShow = this.vel.y < 0;
    if (rootShow) {
      this.pos.add(this.vel);
      this.vel.y = this.vel.y + gravity;
    }
    else {
      if (exParticles.length === 0) {
        for (let i = 0; i < exPLen; i++) {
          exParticles.push(new Particle(this.pos, new Vector(-rndNum(10) + 5, -rndNum(10) + 5)));
          exParticles[exParticles.length - 1].start = time;
        }
      }
      let numOfDead = 0;
      for (let i = 0; i < exPLen; i++) {
        let p = exParticles[i];
        p.update(time);
        if (p.dead) {
          numOfDead++;
        }
      }
      if (numOfDead === exPLen) {
        this.dead = true;
      }
    }
  };

  this.draw = function() {
    if (this.dead) {
      return;
    }
    ctx.fillStyle = this.color;
    if (rootShow) {
      drawLine(this.pos.x, this.pos.y, this.size);
    } 
    else {
      for (let i = 0; i < exPLen; i++) {
        let p = exParticles[i];
        p.draw();
      }
    }
  };
}

function drawLine(x, y, size) {
  ctx.beginPath();
  ctx.rect(x, y, 1, size);
  ctx.fill();
  ctx.closePath();
}

function drawDot(x, y, size) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
}

function update(time) {
  for (let i = 0, len = fireworks.length; i < len; i++) {
    let p = fireworks[i];
    p.update(time);
  }
}

function draw(time) {
  update(time);

  ctx.fillStyle = '#1d1d1d';
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'white';
  ctx.font = "30px Arial";
  snapTime = time;

  ctx.fillStyle = 'blue';
  for (let i = 0, len = fireworks.length; i < len; i++) {
    let p = fireworks[i];
    if (p.dead) {
      fireworks[i] = new Firework(rndNum(canvas.width), canvas.height);
      p = fireworks[i];
      p.start = time;
    }
    p.draw();
  }

  window.requestAnimationFrame(draw);
}
