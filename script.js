const timerHour = document.getElementById('timer-hour');
const timerMinute = document.getElementById('timer-minute');
const timerSeconds = document.getElementById('timer-second');
const startTimer = document.getElementById('start-timer');
const timeInputs = document.querySelectorAll('.set-time');
const timersList = document.getElementById('timers-list-container');
// const timers = [];

timerHour.contentEditable = true;
timerMinute.contentEditable = true;
timerSeconds.contentEditable = true;

timerHour.addEventListener("click", function () { selection(this) })
timerMinute.addEventListener("click", function () { selection(this) })
timerSeconds.addEventListener("click", function () { selection(this) })

function selection(element) {
    const range = document.createRange();
    range.selectNodeContents(element);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
}


timerHour.addEventListener("input", function () {
    inputValidation(this);
    timeInputs.forEach(timeHand => {
        if (timeHand != timerHour) {
            if (!/^\d+$/.test(timeHand.textContent)) {
                timeHand.innerText = String(0).padStart(2, '0');
            }
        }
    });
});

timerMinute.addEventListener("input", function () {
    inputValidation(this);
    inputOutOfBounds(this)

});

timerSeconds.addEventListener("input", function () {
    inputValidation(this);
    inputOutOfBounds(this)
});


function inputOutOfBounds(element) {
    timeInputs.forEach(timeHand => {
        if (element == timeHand) {
            if (timeHand.innerText == 60) {
                timeHand.innerText = String(0).padStart(2, '0');
                let upperHandValue = timeHand.previousElementSibling.textContent;
                if (/^\d+$/.test(upperHandValue)) {
                    let newValue = parseInt(upperHandValue) + 1;
                    timeHand.previousElementSibling.textContent = newValue.toString().padStart(2, '0');
                    timeHand.blur()
                }
                else {
                    timeHand.previousElementSibling.textContent = 1;
                }
            } /* else if (timeHand.textContent > 60) {
                timeHand.textContent = String(0).padStart(2, '0');
            } */
        } else {
            if (!/^\d+$/.test(timeHand.textContent)) {
                timeHand.textContent = String(0).padStart(2, '0');
            }
        }
    })
}

function inputValidation(element) {
    let val = element.innerText.trim();
    if (/^\d+$/.test(val)) {

        if (val.length == 1) {
            element.innerText = "0" + val;
        }
        if (val.length > 1) {
            element.innerText = val.slice(2) + val.slice(0, 1);
            element.blur();
        }

    }
    else {
        element.innerText = String(0).padStart(2, '0');
    }
}

isAnyTimer()

startTimer.addEventListener("click", () => {
    let hour = parseInt(timerHour.textContent);
    let minute = parseInt(timerMinute.textContent);
    let second = parseInt(timerSeconds.textContent);

    let totalSeconds = hour * 3600 + minute * 60 + second;

    if (totalSeconds > 0) {

        const timerDiv = document.createElement('p');

        const timerId = setInterval(() => {
            totalSeconds--;
            const hours = Math.floor(totalSeconds / 3600); // 0 
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            // console.log(hours, minutes, seconds);

            timerDiv.innerHTML = `
                Time left:
                    <span>
                        <span class ="timer-remaining-hour">${String(hours).padStart(2, '0')}</span>
                        :
                        <span class ="timer-remaining-minute">${String(minutes).padStart(2, '0')}</span>
                        :
                        <span class ="timer-remaining-second">${String(seconds).padStart(2, '0')}</span>
                    </span>
                    <button class ="delete-timer" onClick=delTimer(${timerId}) >Delete</button>
            
            `;


            if (totalSeconds === 0) {
                clearInterval(timerId);
                // alert("Time's up!");
                timerDiv.innerHTML = `
                    <span>Timer Is Up !</span>
                    <button class ="stop-timer" onClick=delTimer(${timerId}) >Stop</button>
                `;
                timerDiv.classList.add("timer-up");
                document.getElementById('buzzer').play();

            }
        }, 1000);

        timerDiv.dataset.id = timerId;
        timerDiv.classList.add('timer');
        timersList.appendChild(timerDiv);
        // timers.push(timerId);
    }
    isAnyTimer();
})

function delTimer(timerId) {
    const timerDiv = document.querySelector(`[data-id="${timerId}"]`);
    console.log(timerDiv);
    clearInterval(timerId);
    timersList.removeChild(timerDiv);
    // timers = timers.filter(id => id!== timerId);
    isAnyTimer();

}

// function isAnyTimer() {
//     if (!document.querySelectorAll(".timer").length) {
//         // console.log("aszfsdfsd");
//         timersList.innerHTML = `
//         <p id = "no-timer">You have no timers currently!</p>
//     `;
//     } else {
//         document.getElementById("no-timer").remove();
//     }
// }
function isAnyTimer() {
    const noTimerElement = document.getElementById("no-timer");

    if (!document.querySelectorAll(".timer").length) {
        if (noTimerElement) {
            // Remove the element only if it exists.
            noTimerElement.remove();
        }
        timersList.innerHTML = `
            <p id="no-timer">You have no timers currently!</p>
        `;
    } else {
        if (noTimerElement) {
            noTimerElement.remove();
        }
    }
}