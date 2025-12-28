import * as fireworks from 'https://www.pellicciotta.com/hinolugi-support.js/js/fireworks.mjs'
import * as utils from 'https://www.pellicciotta.com/hinolugi-support.js/js/utils.mjs';
import * as log from 'https://www.pellicciotta.com/hinolugi-support.js/js/log.mjs';

const fireworksPerSecond = 0.6;

let showHelpInfo = false;
let targetDate = new Date(new Date().getTime() + 10000);
let targetMessage = "Happy Birthday !";
let targetShape = "twinkle";
let svgPathId = null;

// Fit the #message element to the visible viewport by adjusting its font-size (px).
function fitMessageToViewport(el) {
  if (!el) return;
  const padding = Math.round(window.innerWidth * 0.04);
  const maxWidth = Math.max(10, window.innerWidth - padding * 2);
  const maxHeight = Math.max(10, window.innerHeight - padding * 2);

  el.style.whiteSpace = 'normal';
  el.style.display = 'block';

  let lo = 4;
  let hi = Math.max(16, Math.floor(window.innerHeight));
  let best = lo;

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    el.style.fontSize = mid + 'px';
    const rect = el.getBoundingClientRect();
    if (rect.width <= maxWidth && rect.height <= maxHeight) {
      best = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }

  el.style.fontSize = best + 'px';
}

window.addEventListener('resize', () => fitMessageToViewport(document.getElementById('message')));

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
  fitMessageToViewport(message);

  if (secondsUntil < 1) {
    message.innerHTML = targetMessage;
    fitMessageToViewport(message);
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
      fitMessageToViewport(message);
    }
    else if (secondsUntil <= (2*60)) { // Less than 2 minutes
      message.innerHTML = `${secondsUntil} secs`;
      fitMessageToViewport(message);
    }
    else if (secondsUntil <= (2*60*60)) { // Less than 2 hours
      let minutesUntil = Math.floor(secondsUntil / 60);
      message.innerHTML = `${minutesUntil} mins`;
      fitMessageToViewport(message);
    }
    else if (secondsUntil <= (2*3600*24)) { // Less than 2 days
      let hoursUntil = Math.floor(secondsUntil / 3600);
      message.innerHTML = `${hoursUntil} hrs`;
      fitMessageToViewport(message);
    }
    else {
      let daysUntil = Math.floor(secondsUntil / (3600 * 24));
      message.innerHTML = `${daysUntil} days`;
      fitMessageToViewport(message);
    }
    setTimeout(updateCountdownAndStartFireworks, 1000);
  }
}
