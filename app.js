'use strict';

const diceImg = document.querySelector('.dice-img');
const btnNew = document.querySelector('.btn-new');
const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');

const infoBtn = document.querySelector('.info');
const overlayEL = document.querySelector('.overlay');
const closeModalBtn = document.querySelector('.close');

let totalScore = [0, 0];
let currentScore = [0, 0];
let score = 0;

let activePlayer = 0; // 0 means first player is by default the active player
let isPlaying = true;

const generateRandomNumber = () => Math.ceil(Math.random() * 6);

const showDice = (diceNumber) => {
  diceImg.src = `./images/dice-${diceNumber}.png`;
  diceImg.style.display = 'block';
};

const checkWinner = (btnType) => {
  const tempTotalScore = totalScore[activePlayer] + score;
  console.log(tempTotalScore);
  if (btnType === 'roll' && tempTotalScore >= 100) {
    document.querySelector(`.player-${activePlayer}-total-score`).textContent =
      tempTotalScore;
    document.querySelector(`.section-${activePlayer}`).classList.add('winner');
    isPlaying = false;
    diceImg.style.display = 'none';
  }
};

const rollDice = () => {
  if (isPlaying) {
    const diceNumber = generateRandomNumber();
    console.log(`dice number: ${diceNumber}`);
    showDice(diceNumber);

    if (diceNumber === 1) {
      score = 0;
      currentScore[activePlayer] = score;
      document.querySelector(
        `.player-${activePlayer}-current-score`
      ).textContent = score;
      document
        .querySelector(`.section-${activePlayer}`)
        .classList.remove('active');
      activePlayer = activePlayer ? 0 : 1;
      document
        .querySelector(`.section-${activePlayer}`)
        .classList.add('active');
    } else {
      score += diceNumber;
      document.querySelector(
        `.player-${activePlayer}-current-score`
      ).textContent = score;
      console.log(score);
      checkWinner('roll');
    }
  }
};

const holdScore = () => {
  if (isPlaying) {
    totalScore[activePlayer] += score;
    document.querySelector(`.player-${activePlayer}-total-score`).textContent =
      totalScore[activePlayer];

    if (totalScore[activePlayer] >= 100) {
      document
        .querySelector(`.section-${activePlayer}`)
        .classList.add('winner');
      isPlaying = false;
      diceImg.style.display = 'none';
    } else {
      score = 0;
      document.querySelector(
        `.player-${activePlayer}-current-score`
      ).textContent = score;
      document
        .querySelector(`.section-${activePlayer}`)
        .classList.remove('active');
      activePlayer = activePlayer ? 0 : 1;
      document
        .querySelector(`.section-${activePlayer}`)
        .classList.add('active');
    }
  }
};

const resetGame = () => {
  document.querySelector(`.section-${activePlayer}`).classList.remove('winner');
  document.querySelector(`.section-${activePlayer}`).classList.remove('active');
  totalScore = [0, 0];
  currentScore = [0, 0];
  score = 0;
  document.querySelector('.player-0-total-score').textContent = 0;
  document.querySelector('.player-1-total-score').textContent = 0;
  document.querySelector('.player-0-current-score').textContent = 0;
  document.querySelector('.player-1-current-score').textContent = 0;

  activePlayer = 0; // 0 means first player is by default the active player
  isPlaying = true;
  document.querySelector(`.section-${activePlayer}`).classList.add('active');
};

btnRoll.addEventListener('click', rollDice);

btnHold.addEventListener('click', holdScore);

btnNew.addEventListener('click', resetGame);

const showModal = () => {
  overlayEL.classList.add('show-modal');
};

const closeModal = () => {
  overlayEL.classList.remove('show-modal');
};

// modal
infoBtn.addEventListener('click', showModal);
closeModalBtn.addEventListener('click', closeModal);
overlayEL.addEventListener('click', closeModal);
document.body.addEventListener('keyup', (e) => {
  if (e.key === 'Escape') closeModal();
});
