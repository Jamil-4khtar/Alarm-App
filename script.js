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
                timeHand.textContent = 0;
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
            if (timeHand.textContent == 60) {
                timeHand.textContent = 0;
                let upperHandValue = timeHand.previousElementSibling.textContent;
                if (/^\d+$/.test(upperHandValue)) {
                    timeHand.previousElementSibling.textContent = parseInt(upperHandValue) + 1;
                    timeHand.blur()
                }
                else {
                    timeHand.previousElementSibling.textContent = 1;
                }
            } else if (timeHand.textContent > 60) {
                timeHand.textContent = 0;
            }
        } else {
            if (!/^\d+$/.test(timeHand.textContent)) {
                timeHand.textContent = 0;
            }
        }
    })
}

function inputValidation(element) {
    let value = element.textContent.trim();
    if (/^\d+$/.test(value)) {
        if (value.length > 2) {
            element.textContent = value.slice(0, 2)
            value = element.textContent;
            element.blur();
        }
    }
    else {
        element.textContent = 0;
        value = 0;
    }
    return value;
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
                    <span class ="timer-remaining-hour">${hours}</span>
                    :
                    <span class ="timer-remaining-minute">${minutes}</span>
                    :
                    <span class ="timer-remaining-second">${seconds}</span>
                    <button class ="delete-timer" onClick=delTimer(${timerId}) >Delete</button>
            
            `;


            if (totalSeconds === 0) {
                clearInterval(timerId);
                alert("Time's up!");
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

function isAnyTimer() {
    if (!document.querySelectorAll(".timer").length) {
        // console.log("aszfsdfsd");
        timersList.innerHTML = `
        <p id = "no-timer">You have no timers currently!</p>
    `;
    } else {
        document.getElementById("no-timer").remove();
    }
}