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
        v.name.toLowerCase().includes('english')
      ) ||
      voices[0];
    say.voice = alexaVoice;
    say.rate = 1;   // speaking speed
    say.pitch = 1;  // natural Alexa-like tone
    speechSynthesis.speak(say);
  } else {
    console.log('Speech synthesis not supported in this browser.');
  }
}
