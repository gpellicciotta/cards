// Constants:
const snowFlakeCount = 30;
const snowSymbols = [ "*","❆","❅","❄" ];
const snowFlakeColors = [ "rgba(220,220,220,0.2)", "rgba(220,220,220,0.4)", "rgba(220,220,220,0.6)", "rgba(220,220,220,0.8)", "rgba(220,220,220,1.0)" ];

// Main script:
let snowFlakes = [];
createSnow();
window.requestAnimationFrame(animateSnow);

// Support functions:
function randomBetween(min, max) {
  if (arguments.length === 1) {
    max = min; // First argument is then max
    min = 0;
  }
  let spread = max - min + 1;
  return min + Math.floor(spread * Math.random());
}

function randomElement(arr) {
  let randomIndex = randomBetween(0, arr.length - 1);  
  return arr[randomIndex];
}

function reset() {
  snowFlakes = [];
  document.querySelectorAll("span.snowflake").forEach((el) => { el.remove(); });
}

function createSnowFlake() {
  const screenWidth = window.innerWidth;
  // Create new object with meta-data and document element:
  let newElement = document.createElement("span");    
  let xPos = randomBetween(0, screenWidth);
  let yPos = 0 - randomBetween(10, screenWidth / 2);
  let size = randomBetween(16, 32);
  let zIndex = randomBetween(500, 1000);
  let newSnowFlake = { 
    id: `snowflake-${snowFlakes.length}`,
    element: newElement,
    xPos: xPos,
    yPos: yPos,
    dir: randomElement([-1, 1]),
    fallSpeed: randomElement([1, 2])
  };
  snowFlakes.push(newSnowFlake);
  // Style the document el:
  newElement.classList.add("snowflake");
  newElement.style.position = "fixed";
  newElement.style.top = `${yPos}px`;
  newElement.style.right = `${xPos}px`;
  newElement.style.color = randomElement(snowFlakeColors);
  newElement.style.fontSize = `${size}px`;
  //newElement.style.width = `${size}px`;
  newElement.style.height = `${size}px`;
  newElement.style.zIndex = `${zIndex}`;
  newElement.style.pointerEvents = "none";
  newElement.innerText = randomElement(snowSymbols); // + `sp:${newSnowFlake.fallSpeed},d:${newSnowFlake.dir}`;
  // Append to document:
  document.body.appendChild(newElement);
  console.log(`${snowFlakes.length} snowflakes have been created now`);
}

function createSnow() {
  createSnowFlake();
  if (snowFlakes.length < snowFlakeCount) {
    window.requestAnimationFrame(createSnow);
  }
}

function animateSnow() {
  let screenWidth = window.innerWidth;
  let screenHeight = window.innerHeight;

  for (let i = 0; i < snowFlakes.length; i++) {
    let snowFlake = snowFlakes[i];
    let snowEl = snowFlake.element;
    // Check current position
    let xPos = snowFlake.xPos;
    let yPos = snowFlake.yPos;
    // Calculate new position
    xPos += randomBetween(0, 1) * snowFlake.dir;
    yPos += snowFlake.fallSpeed;
    // Check window boundaries: reset
    if (yPos > screenHeight) {
      xPos = randomBetween(0, screenWidth);
      yPos = 0 - randomBetween(10, 20);
    }
    // Set position (= move the snowflake)
    snowFlake.xPos = xPos;
    snowFlake.yPos = yPos;
    snowEl.style.top = `${yPos}px`;
    snowEl.style.right = `${xPos}px`;
  }
  window.requestAnimationFrame(animateSnow);
}
