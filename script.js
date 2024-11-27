const timerHour = document.getElementById('timer-hour');
const timerMinute = document.getElementById('timer-minute');
const timerSeconds = document.getElementById('timer-second');
const startTimer = document.getElementById('start-timer');
const timeInputs = document.querySelectorAll('.set-time');

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
    } else {
        element.textContent = 0;
        value = 0;
    }
    return value;
}