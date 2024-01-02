import * as fireworks from './fireworks.js'

const TARGET_DATE = new Date(2024, 0, 2, 11, 1);
updateCountdownAndStartFireworks();

function updateCountdownAndStartFireworks() {
  const message = document.getElementById("message");
  const canvases = document.querySelectorAll("canvas.fireworks");

  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth() + 1;

  if ((day === TARGET_DATE.getDate()) && (month === TARGET_DATE.getMonth() + 1)) {
    message.innerHTML = `Happy Birthday`;
    for (let canvas of canvases) {
      fireworks.start(canvas, { 
        shape: 'hearts',
        frequency: 3
      });
    }
  }
  else {
    for (let canvas of canvases) {
      fireworks.stop(canvas);
    }
    let secondsUntil = Math.floor((TARGET_DATE.getTime() - now.getTime()) / 1000);
    if (secondsUntil <= 20) {
      message.innerHTML = `${secondsUntil}`;
    }
    else if (secondsUntil <= (2*60)) { // Less than 2 minutes
      message.innerHTML = `${secondsUntil} secs`;
    }
    else if (secondsUntil <= (2*60*60)) { // Less than 2 hours
      let minutesUntil = Math.floor(secondsUntil / 60);
      message.innerHTML = `${minutesUntil} mins`;
    }
    else if (secondsUntil <= (2*3600*24)) { // Less than 2 days
      let hoursUntil = Math.floor(secondsUntil / 3600);
      message.innerHTML = `${hoursUntil} hrs`;
    }
    else {
      let daysUntil = Math.floor(secondsUntil / (3600 * 24));
      message.innerHTML = `${daysUntil} days`;
    }
    setTimeout(updateCountdownAndStartFireworks, 1000);
  }
}
