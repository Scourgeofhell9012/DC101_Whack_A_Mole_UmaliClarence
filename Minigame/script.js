const moles = document.querySelectorAll('.mole');
const scoreDisplay = document.querySelector('#score');
const timeLeftDisplay = document.querySelector('#time-left');
const startBtn = document.querySelector('#start-btn');

let score = 0;
let lastMole;
let timeUp = false;
let timeLeft = 30;

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomMole(moles) {
    const idx = Math.floor(Math.random() * moles.length);
    const mole = moles[idx];
    if (mole === lastMole) return randomMole(moles);
    lastMole = mole;
    return mole;
}

function peep() {
    const time = randomTime(600, 1200); // Speed of the mole
    const mole = randomMole(moles);
    mole.classList.add('up');
    
    setTimeout(() => {
        mole.classList.remove('up');
        if (!timeUp) peep();
    }, time);
}

function startGame() {
    score = 0;
    timeLeft = 30;
    timeUp = false;
    scoreDisplay.textContent = 0;
    startBtn.disabled = true;
    
    peep();
    const countdown = setInterval(() => {
        timeLeft--;
        timeLeftDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(countdown);
            timeUp = true;
            startBtn.disabled = false;
            alert(`Mission Complete! Moles whacked: ${score}`);
        }
    }, 1000);
}

function whack(e) {
    if(!e.isTrusted) return; // Anti-cheat (fake clicks)
    score++;
    this.classList.remove('up'); // Hide immediately when hit
    scoreDisplay.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', whack));
startBtn.addEventListener('click', startGame);