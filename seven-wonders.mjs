const playerCountInput = document.getElementById('player-count');
const addPlayerButton = document.getElementById('add-player-button');
const resetButton = document.getElementById("reset-button");

function recalculate() {
  let players = +(document.body.dataset.playerCount || 0);

  let maxPoints = 0;
  for (let i = 1; i <= players; i++) {
    let blueCardsInput = document.body.querySelector('.card > .row.blue-cards > input.player-' + i);
    let greenCardsInput = document.body.querySelector('.card > .row.green-cards > input.player-' + i);
    let yellowCardsInput = document.body.querySelector('.card > .row.yellow-cards > input.player-' + i);
    let purpleCardsInput = document.body.querySelector('.card > .row.purple-cards > input.player-' + i);
    let wondersInput = document.body.querySelector('.card > .row.wonders > input.player-' + i);
    let greenCoinsInput = document.body.querySelector('.card > .row.green-coins > input.player-' + i);
    let moneyCoinsInput = document.body.querySelector('.card > .row.money-coins > input.player-' + i);
    let militaryInput = document.body.querySelector('.card > .row.military > input.player-' + i);
    let sumInput = document.body.querySelector('.card > .row.sum > input.player-' + i);
    // Calculate:
    let totalPoints =  (+blueCardsInput.value) + 
                       (+greenCardsInput.value) +
                       (+yellowCardsInput.value) +
                       (+purpleCardsInput.value) +
                       (+wondersInput.value) +
                       (greenCoinsInput ? +greenCoinsInput.value : 0) + // Not used in full game
                       (+moneyCoinsInput.value) +
                       (+militaryInput.value);
    // Assign:
    sumInput.value = totalPoints;     
    
    // Reset winner status:
    sumInput.classList.remove('winner');
    let nameInput = document.body.querySelector('.card > .row.players > input.player-' + i);  
    nameInput.classList.remove('winner');

    // Check max points:
    if (totalPoints > maxPoints) {
      maxPoints = totalPoints;
    }
  }
  // Now check/mark the winner(s):
  if (maxPoints > 0) {
    for (let i = 1; i <= players; i++) {
      let sumInput = document.body.querySelector('.card > .row.sum > input.player-' + i);
      let nameInput = document.body.querySelector('.card > .row.players > input.player-' + i);    
      if (+sumInput.value === maxPoints) {
        sumInput.classList.add('winner');
        nameInput.classList.add('winner');
      }
    }                 
  }
}

function resetScores() {
  for (let i = 1; i <= 7; i++) {
    let nameInput = document.body.querySelector('.card > .row.players > input.player-' + i);  
    nameInput.classList.remove('winner');

    let blueCardsInput = document.body.querySelector('.card > .row.blue-cards > input.player-' + i);
    blueCardsInput.value = 0;

    let greenCardsInput = document.body.querySelector('.card > .row.green-cards > input.player-' + i);
    greenCardsInput.value = 0;

    let yellowCardsInput = document.body.querySelector('.card > .row.yellow-cards > input.player-' + i);
    yellowCardsInput.value = 0;

    let purpleCardsInput = document.body.querySelector('.card > .row.purple-cards > input.player-' + i);
    purpleCardsInput.value = 0;

    let wondersInput = document.body.querySelector('.card > .row.wonders > input.player-' + i);
    wondersInput.value = 0;

    let greenCoinsInput = document.body.querySelector('.card > .row.green-coins > input.player-' + i);
    if (greenCoinsInput) { // Not used in full game
      greenCoinsInput.value = 0;
    }

    let moneyCoinsInput = document.body.querySelector('.card > .row.money-coins > input.player-' + i);
    moneyCoinsInput.value = 0;

    let militaryInput = document.body.querySelector('.card > .row.military > input.player-' + i);
    militaryInput.value = 0;

    let sumInput = document.body.querySelector('.card > .row.sum > input.player-' + i);
    sumInput.classList.remove('winner');
    sumInput.value = 0;
  }

  document.body.querySelector('.card > .row.players > .player-1').focus();
}

document.querySelectorAll("input[type=number]").forEach((el) => {
  if (el.readOnly) {
    return ;
  }
  el.addEventListener("focus", (e) => {
    el.select();
  });
  el.addEventListener("keydown", (e) => {
    if (e.keyCode === 107) { // Plus key
      el.value = +el.value + 1;
      e.preventDefault();
    }
    else if (e.keyCode === 109) { // Minus key
      el.value = Math.max(0, +el.value - 1);
      e.preventDefault();
    }
    recalculate();
  });
  el.addEventListener("change", (e) => {
    if (+el.value < 0) {
      el.value = 0;
    }
    recalculate();
  });  
});

if (resetButton) {
  resetButton.addEventListener("click", (e) => {
    resetScores();
  });
}

if (playerCountInput) {
  playerCountInput.addEventListener("change", (e) => {
    e.preventDefault();

    let cnt = Math.min(Math.max(+playerCountInput.value, 2), 7); 
    playerCountInput.value = cnt;
    
    updatePlayerCount(cnt);
  });
}

if (addPlayerButton) {
  addPlayerButton.addEventListener("click", (e) => {
    e.preventDefault();

    let cnt = +(document.body.dataset.playerCount || 0);
    cnt += 1;

    updatePlayerCount(cnt);
  });
}

/* Start with 2 players */
updatePlayerCount(2);

function updatePlayerCount(playerCount) {
  // Store for easy retrieval later
  let oldPlayerCount = +(document.body.dataset.playerCount || 0);
  document.body.dataset.playerCount = playerCount;

  // Update other input too
  if (playerCountInput) {
    playerCountInput.value = playerCount;
  }

  // Update styles
  document.body.style.setProperty('--player-count', playerCount);
  for (let i = 1; i <= 7; i++) {
    if (i <= playerCount) {
      document.body.classList.add("player-" + i);
    }
    else {
      document.body.classList.remove("player-" + i);
    }
  }
  if (oldPlayerCount != playerCount) {
    resetScores();
  }
}