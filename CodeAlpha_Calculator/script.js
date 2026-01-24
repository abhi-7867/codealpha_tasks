// Little Talking Calculator (Alexa Voice Edition) 😊

// DOM elements
const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');
let currentInput = '';

// --- Update calculator screen ---
function updateDisplay() {
  display.textContent = currentInput || '0';
}
