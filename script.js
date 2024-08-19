let display = document.getElementById('display');
let currentInput = '';
let operator = '';
let previousInput = '';

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function clearDisplay() {
    playSound();
    currentInput = '';
    operator = '';
    previousInput = '';
    display.textContent = '0';
}

function appendNumber(number) {
    playSound();
    currentInput += number.toString();
    display.textContent = currentInput;
}

function appendOperator(op) {
    playSound();
    if (currentInput === '') return;
    if (operator !== '') {
        calculateResult();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

function appendDot() {
    playSound();
    if (!currentInput.includes('.')) {
        currentInput += '.';
        display.textContent = currentInput;
    }
}

function deleteLast() {
    playSound();
    currentInput = currentInput.slice(0, -1);
    display.textContent = currentInput || '0';
}

function calculateResult() {
    playSound();
    if (previousInput === '' || currentInput === '') return;

    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = '';
    previousInput = '';
    display.textContent = currentInput;
}

function playSound() {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4 note frequency

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime); // 10% volume level

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1); // Short beep duration
}
