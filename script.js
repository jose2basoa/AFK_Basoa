let startTime = 0;
let elapsed = 0;
let timerInterval;
let running = false;
let started = false;

const afkBox = document.getElementById("afkBox");
const afkText = document.getElementById("afkText");

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    const milliseconds = String(ms % 1000).padStart(3, '0');
    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

function updateTimer() {
    const now = Date.now();
    const diff = now - startTime + elapsed;
    document.getElementById("timer").textContent = formatTime(diff);
}

function setOnState() {
    afkBox.classList.add("on");
    afkText.textContent = "ESTOU ON";
}

function setAfkState() {
    afkBox.classList.remove("on");
    afkText.textContent = "ESTOU AFK E JÁ VOLTO";
}

function startTimer() {
    if (!running) {
    setAfkState();
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 10);
    running = true;
    started = true;

    document.getElementById("startBtn").classList.add("hidden");
    document.getElementById("pauseBtn").classList.remove("hidden");
    document.getElementById("resetBtn").classList.remove("hidden");
    }
}

function pauseTimer() {
    if (running) {
    clearInterval(timerInterval);
    elapsed += Date.now() - startTime;
    running = false;

    document.getElementById("pauseBtn").classList.add("hidden");
    document.getElementById("resumeBtn").classList.remove("hidden");

    setOnState();
    }
}

function resumeTimer() {
    if (!running) {
    setAfkState();
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 10);
    running = true;

    document.getElementById("resumeBtn").classList.add("hidden");
    document.getElementById("pauseBtn").classList.remove("hidden");
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    elapsed = 0;
    running = false;
    started = false;
    document.getElementById("timer").textContent = "00:00:00:000";

    document.getElementById("startBtn").classList.remove("hidden");
    document.getElementById("pauseBtn").classList.add("hidden");
    document.getElementById("resumeBtn").classList.add("hidden");
    document.getElementById("resetBtn").classList.add("hidden");

    setOnState();
}

// Inicializa com estado "on"
setOnState();