function pickComputerMove(){
  const randomNumber = Math.random();
  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1/3){
    computerMove = 'rock';
  } else if (randomNumber >= 1/3 && randomNumber < 2/3){
    computerMove = 'paper';
  } else if (randomNumber >= 2/3 && randomNumber < 1){
    computerMove = 'scissors';
  }
  return computerMove;
  
}


let wins = JSON.parse(localStorage.getItem('wins')) || {
  counter : 0
};

let losses = JSON.parse(localStorage.getItem('losses')) || {
  counter : 0
};

let ties = JSON.parse(localStorage.getItem('ties')) || {
  counter : 0
};


updateWins();
updateLosses();
updateTies();

function updateWins(){
  document.querySelector('.player-score-counter')
    .innerHTML = wins.counter;
}

function updateLosses(){
  document.querySelector('.computer-score-counter')
    .innerHTML = losses.counter;
}

function updateTies(){
  document.querySelector('.ties-score-counter')
    .innerHTML = ties.counter;
}

let isAutoPlaying = false;
let intervalId;

function autoPlay(){
  if (!isAutoPlaying){
    intervalId = setInterval(function(){
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true
  }else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}



function playGame(playerMove){
  const computerMove = pickComputerMove();

  let result = '';

  if(playerMove === 'rock'){
    if (computerMove === 'rock'){
      result = 'Its a Tie';
    } else if (computerMove === 'paper'){
      result = 'You lose';
    } else if (computerMove === 'scissors'){
      result = 'You win';
    }
  } else if(playerMove === 'paper'){

      if (computerMove === 'rock'){
        result = 'You win';
      } else if (computerMove === 'paper'){
        result = 'Its a Tie';
      } else if (computerMove === 'scissors'){
        result = 'You lose';
      }
  } else if(playerMove === 'scissors'){

      if (computerMove === 'rock'){
        result = 'You lose';
      } else if (computerMove === 'paper'){
        result = 'You win';
      } else if (computerMove === 'scissors'){
        result = 'Its a Tie';
      }
  }

  if(result === 'You win'){
    wins.counter += 1;
  } else if(result === 'You lose'){
    losses.counter += 1;
  } else if(result === 'Its a Tie'){
    ties.counter += 1;
  }



  localStorage.setItem('wins', JSON.stringify(wins));
  localStorage.setItem('losses', JSON.stringify(losses));
  localStorage.setItem('ties', JSON.stringify(ties));


  updateWins();
  updateLosses();
  updateTies();

  

  document.querySelector('.js-result').innerHTML = result;

  
  document.querySelector('.player-move-icontainer')
    .innerHTML = `<img src="icons/${playerMove}.png" class="player-icon">`;
    document.querySelector('.computer-move-icontainer')
    .innerHTML = `<img src="icons/${computerMove}.png" class="player-icon">`;
}





