import * as fireworks from 'https://www.pellicciotta.com/hinolugi-support.js/js/fireworks.mjs'
import * as utils from 'https://www.pellicciotta.com/hinolugi-support.js/js/utils.mjs';
import * as log from 'https://www.pellicciotta.com/hinolugi-support.js/js/log.mjs';

const fireworksPerSecond = 0.6;

let showHelpInfo = false;
let targetDate = new Date(new Date().getTime() + 10000);
let targetMessage = "Happy Birthday !";
let targetShape = "twinkle";
let svgPathId = null;

// Check URL params:
const url = new URL(window.location.href);
let helpParam = url.searchParams.get("help");
if (helpParam != null) {
  showHelpInfo = true;
}
let dateParam = url.searchParams.get("date");
if (dateParam) {
  try {
    targetDate = utils.date(dateParam);
  }
  catch {
    log.error(`Failed to interpret '${dateParam}' as a valid date: using current date instead`);
  }
}
let messageParam = url.searchParams.get("message");
if (messageParam) {
  targetMessage = messageParam.trim();
}
let shapeParam = url.searchParams.get("shape");
if (shapeParam) {
  targetShape = shapeParam.trim();
}

// Run:
if (showHelpInfo) {
  showHelp();
}
else {
  updateCountdownAndStartFireworks();
}

function showHelp() {
  document.body.classList.add("help");
}

function updateCountdownAndStartFireworks() {
  const message = document.getElementById("message");
  const canvas = document.getElementById("fireworks");

  const now = new Date();
  const secondsUntil = Math.floor((targetDate.getTime() - now.getTime()) / 1000);

  let hue = utils.random(0, 360);
  let color = "hsla(" + hue + ", 50%, 50%, 0.8)";
  message.style.color = color;

  if (secondsUntil < 1) {
    message.innerHTML = targetMessage;
    fireworks.start(canvas, { 
      shape: targetShape,
      frequency: fireworksPerSecond,
      svgPathId: svgPathId
    });
  }
  else {
    fireworks.stop(canvas);
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
