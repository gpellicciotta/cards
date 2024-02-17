import * as log from 'https://www.pellicciotta.com/hinolugi-support.js/js/log.mjs';

const pl1NameInput = document.getElementById('player-1-name');
const pl2NameInput = document.getElementById('player-2-name');
const pl1BlueCardsInput = document.getElementById('player-1-blue-cards');
const pl2BlueCardsInput = document.getElementById('player-2-blue-cards');
const pl1GreenCardsInput = document.getElementById('player-1-green-cards');
const pl2GreenCardsInput = document.getElementById('player-2-green-cards');
const pl1YellowCardsInput = document.getElementById('player-1-yellow-cards');
const pl2YellowCardsInput = document.getElementById('player-2-yellow-cards');
const pl1PurpleCardsInput = document.getElementById('player-1-purple-cards');
const pl2PurpleCardsInput = document.getElementById('player-2-purple-cards');
const pl1WondersInput = document.getElementById('player-1-wonders');
const pl2WondersInput = document.getElementById('player-2-wonders');
const pl1GreenCoinsInput = document.getElementById('player-1-green-coins');
const pl2GreenCoinsInput = document.getElementById('player-2-green-coins');
const pl1MoneyCoinsInput = document.getElementById('player-1-money-coins');
const pl2MoneyCoinsInput = document.getElementById('player-2-money-coins');
const pl1MilitaryInput = document.getElementById('player-1-military');
const pl2MilitaryInput = document.getElementById('player-2-military');
const pl1SumInput = document.getElementById('player-1-sum');
const pl2SumInput = document.getElementById('player-2-sum');


function sum() {
  pl1SumInput.value = (+pl1BlueCardsInput.value) + 
                      (+pl1GreenCardsInput.value) +
                      (+pl1YellowCardsInput.value) +
                      (+pl1PurpleCardsInput.value) +
                      (+pl1WondersInput.value) +
                      (+pl1GreenCoinsInput.value) +
                      (+pl1MoneyCoinsInput.value) +
                      (+pl1MilitaryInput.value);

  pl2SumInput.value = (+pl2BlueCardsInput.value) + 
                      (+pl2GreenCardsInput.value) +
                      (+pl2YellowCardsInput.value) +
                      (+pl2PurpleCardsInput.value) +
                      (+pl2WondersInput.value) +
                      (+pl2GreenCoinsInput.value) +
                      (+pl2MoneyCoinsInput.value) +
                      (+pl2MilitaryInput.value);       

  pl1NameInput.classList.remove("winner"); 
  pl2NameInput.classList.remove("winner");                     
  pl1SumInput.classList.remove("winner");
  pl2SumInput.classList.remove("winner");                    
  if (+pl1SumInput.value > +pl2SumInput.value) {
    pl1NameInput.classList.add("winner"); 
    pl1SumInput.classList.add("winner");
  } 
  else if (+pl1SumInput.value < +pl2SumInput.value) {
    pl2NameInput.classList.add("winner"); 
    pl2SumInput.classList.add("winner");  
  }                   
}

function reset() {
  pl1NameInput.classList.remove("winner"); 
  pl2NameInput.classList.remove("winner");                     
  pl1NameInput.value = "";
  pl2NameInput.value = "";
  pl1SumInput.classList.remove("winner");
  pl2SumInput.classList.remove("winner");

  pl1BlueCardsInput.value = 0; 
  pl1GreenCardsInput.value = 0;
  pl1YellowCardsInput.value = 0;
  pl1PurpleCardsInput.value = 0;
  pl1WondersInput.value = 0;
  pl1GreenCoinsInput.value = 0;
  pl1MoneyCoinsInput.value = 0;
  pl1MilitaryInput.value = 0;
  pl1SumInput.value = 0;

  pl2BlueCardsInput.value = 0; 
  pl2GreenCardsInput.value = 0;
  pl2YellowCardsInput.value = 0;
  pl2PurpleCardsInput.value = 0;
  pl2WondersInput.value = 0;
  pl2GreenCoinsInput.value = 0;
  pl2MoneyCoinsInput.value = 0;
  pl2MilitaryInput.value = 0;
  pl2SumInput.value = 0;

  pl1NameInput.focus();
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
    sum();
  });
  el.addEventListener("change", (e) => {
    if (+el.value < 0) {
      el.value = 0;
    }
    sum();
  });  
});

document.getElementById("reset-button").addEventListener("click", (e) => {
  reset();
});
