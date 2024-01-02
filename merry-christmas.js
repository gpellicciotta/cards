import * as snowflakes from 'https://www.pellicciotta.com/hinolugi-support.js/js/snowflakes.js';
import * as log from 'https://www.pellicciotta.com/hinolugi-support.js/js/log.js';

let state = 1; // Snowing
snowflakes.start();

document.addEventListener("click", () => {
  state += 1;
  if (state > 2) { state = 0; }
  switch (state) {
    case 0: // Reset
      log.info("Resetting...");
      snowflakes.reset();
      break;
    case 1: // Snowing starts:  
      log.info("It starts to snow...")
      snowflakes.start();    
      break;
    case 2: // Snowing stops:
      log.info("Snowing stops now...")
      snowflakes.stop();
      break;
  }
});
