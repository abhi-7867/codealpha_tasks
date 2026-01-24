// Little Talking Calculator (Alexa Voice Edition) 😊

// DOM elements
const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');
let currentInput = '';

// --- Update calculator screen ---
function updateDisplay() {
  display.textContent = currentInput || '0';
}

// --- Alexa-style speech ---
function speakIt(text) {
  if ('speechSynthesis' in window) {
    const say = new SpeechSynthesisUtterance(text);
    // 🎤 Try to pick Alexa-like voice
    const voices = speechSynthesis.getVoices();
    const alexaVoice =
      voices.find(v =>
        v.name.toLowerCase().includes('alexa')
      ) ||
      voices.find(v =>
}
