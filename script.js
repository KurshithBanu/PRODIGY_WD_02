let startTime, elapsedTime = 0, timerInterval;
const timeDisplay = document.getElementById('timeDisplay');
const lapsContainer = document.getElementById('laps');

function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let formattedHH = hh.toString().padStart(2, "0");
    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");

    return `${formattedHH}:${formattedMM}:${formattedSS}`;
}

function print(txt) {
    timeDisplay.innerHTML = txt;
}

// Function to change the time display color based on button pressed
function changeColor(buttonType) {
    if (buttonType === 'start') {
        timeDisplay.style.color = 'rgb(62, 139, 27)'; // Green for Start
    } else if (buttonType === 'pause') {
        timeDisplay.style.color = 'rgb(47, 233, 171)'; // Orange for Pause
    } else if (buttonType === 'reset') {
        timeDisplay.style.color = 'rgb(250, 106, 69)'; // Red for Reset
    } else if (buttonType === 'lap') {
        timeDisplay.style.color = 'rgb(194, 107, 187)'; // Blue for Lap
    }
}

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        print(timeToString(elapsedTime));
    }, 1000);
    changeColor('start'); // Change color to green when start is pressed
}

function pause() {
    clearInterval(timerInterval);
    changeColor('pause'); // Change color to orange when pause is pressed
}

function reset() {
    clearInterval(timerInterval);
    print("00:00:00");
    elapsedTime = 0;
    lapsContainer.innerHTML = '';
    changeColor('reset'); // Change color to red when reset is pressed
}

function lap() {
    let lapTime = timeToString(elapsedTime);
    let li = document.createElement("li");
    li.innerText = lapTime;
    lapsContainer.appendChild(li);
    changeColor('lap'); // Change color to blue when lap is pressed
}

document.getElementById('startBtn').addEventListener('click', start);
document.getElementById('pauseBtn').addEventListener('click', pause);
document.getElementById('resetBtn').addEventListener('click', reset);
document.getElementById('lapBtn').addEventListener('click', lap);
