const sampleText = "Consistency is the key to mastering any skill. When you practice typing daily, your muscle memory improves, allowing your fingers to move effortlessly across the keyboard.";

const textDisplay = document.getElementById('textDisplay');
const inputArea = document.getElementById('inputArea');
const timerEl = document.getElementById('timer');
const mistakesEl = document.getElementById('mistakes');
const wpmEl = document.getElementById('wpm');
const resultBanner = document.getElementById('resultBanner');
const badgeText = document.getElementById('badgeText');

let timeLeft = 60;
let timer = null;
let isTypingStarted = false;

// Load Characters into Display Box
function loadText() {
    textDisplay.innerHTML = "";
    sampleText.split('').forEach(char => {
        const span = document.createElement('span');
        span.innerText = char;
        textDisplay.appendChild(span);
    });
    textDisplay.querySelectorAll('span')[0].classList.add('char-current');
}

// Handle User Inputs & Highlighting
function handleTyping() {
    const spans = textDisplay.querySelectorAll('span');
    const typedChars = inputArea.value.split('');

    if (!isTypingStarted) {
        isTypingStarted = true;
        timer = setInterval(updateTimer, 1000);
    }

    let mistakes = 0;

    spans.forEach((span, index) => {
        const char = typedChars[index];
        span.classList.remove('char-current');

        if (char == null) {
            span.classList.remove('char-correct', 'char-incorrect');
        } else if (char === span.innerText) {
            span.classList.add('char-correct');
            span.classList.remove('char-incorrect');
        } else {
            span.classList.add('char-incorrect');
            span.classList.remove('char-correct');
            mistakes++;
        }
    });

    if (typedChars.length < spans.length) {
        spans[typedChars.length].classList.add('char-current');
    }

    mistakesEl.innerText = mistakes;

    if (typedChars.length === spans.length) {
        endGame();
    }
}

// Countdown Timer
function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timerEl.innerText = timeLeft + "s";

        let wordsTyped = (inputArea.value.length / 5);
        let minutesPassed = (60 - timeLeft) / 60;
        let currentWpm = Math.round(wordsTyped / minutesPassed);
        wpmEl.innerText = currentWpm > 0 && isFinite(currentWpm) ? currentWpm : 0;
    } else {
        endGame();
    }
}

// End Game & Show Badges
function endGame() {
    clearInterval(timer);
    inputArea.disabled = true;

    let finalWpm = parseInt(wpmEl.innerText);
    resultBanner.style.display = "block";

    if (finalWpm >= 40) {
        badgeText.innerText = "PRO TYPIST ⚡";
    } else if (finalWpm >= 20) {
        badgeText.innerText = "INTERMEDIATE 👍";
    } else {
        badgeText.innerText = "BEGINNER 🎯";
    }
}

// Reset Game
function initGame() {
    clearInterval(timer);
    timeLeft = 60;
    isTypingStarted = false;
    inputArea.disabled = false;
    inputArea.value = "";
    timerEl.innerText = "60s";
    mistakesEl.innerText = "0";
    wpmEl.innerText = "0";
    resultBanner.style.display = "none";
    loadText();
}

inputArea.addEventListener('input', handleTyping);
window.onload = initGame;
