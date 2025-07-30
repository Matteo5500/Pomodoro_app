const bells = new Audio('./sounds/bell.wav');
const startBtn = document.querySelector('.btn-start');
const pauseBtn = document.querySelector('.btn-pause');
const resetBtn = document.querySelector('.btn-reset');

const minuteDiv = document.querySelector('.minutes');
const secondDiv = document.querySelector('.seconds');
const digitalCrown = document.querySelector('.digital-crown');

let myInterval;
let totalSeconds = 0;
let totalInitialSeconds = 0;
let isRunning = false;
let isPaused = false;

const appTimer = () => {
  if (!isRunning) {
    isRunning = true;
    isPaused = false;

    const sessionAmount = Number.parseInt(minuteDiv.textContent);
    totalSeconds = sessionAmount * 60;
    totalInitialSeconds = totalSeconds;

    myInterval = setInterval(updateSeconds, 1000);
  } else {
    alert('Timer already running!');
  }
};

const togglePause = () => {
  if (!isRunning) return;

  if (!isPaused) {
    clearInterval(myInterval);
    isPaused = true;
    pauseBtn.textContent = 'Resume';
  } else {
    myInterval = setInterval(updateSeconds, 1000);
    isPaused = false;
    pauseBtn.textContent = 'Pause';
  }
};

const resetTimer = () => {
  clearInterval(myInterval);
  totalSeconds = 25 * 60;
  isRunning = false;
  isPaused = false;
  pauseBtn.textContent = 'Pause';

  updateDisplay(totalSeconds);
  rotateCrown(0);
};

const updateSeconds = () => {
  totalSeconds--;

  if (totalSeconds < 0) {
    bells.play();
    clearInterval(myInterval);
    isRunning = false;
    return;
  }

  updateDisplay(totalSeconds);
  const progress = (totalInitialSeconds - totalSeconds) / totalInitialSeconds;
  rotateCrown(progress * 360);
};

const updateDisplay = (total) => {
  const minutesLeft = Math.floor(total / 60);
  const secondsLeft = total % 60;

  minuteDiv.textContent = `${minutesLeft}`;
  secondDiv.textContent = secondsLeft < 10 ? '0' + secondsLeft : secondsLeft;
};

const rotateCrown = (degrees) => {
  digitalCrown.style.transform = `translateX(-50%) rotate(${degrees}deg)`;
};

startBtn.addEventListener('click', appTimer);
pauseBtn.addEventListener('click', togglePause);
resetBtn.addEventListener('click', resetTimer);

resetTimer();
