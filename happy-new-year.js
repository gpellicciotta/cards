import * as fireworks from './fireworks.js'

updateCountdownAndStartFireworks();

function updateCountdownAndStartFireworks() {
  const message = document.getElementById("message");
  const canvas = document.getElementById("fireworks");

  const now = new Date();
  const year = now.getFullYear();
  const day = now.getDate();
  const month = now.getMonth() + 1;

  if ((day === 1) && (month === 1)) {
    message.innerHTML = `Happy ${year}`;
    fireworks.start(canvas, { 
      shape: 'normal',
      frequency: 1
    });
  }
  else {
    fireworks.stop(canvas);
    let targetDate = new Date(year + 1, 0, 1);
    let secondsUntil = Math.floor((targetDate.getTime() - now.getTime()) / 1000);
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
