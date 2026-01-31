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

// --- Speak every time user types ---
function speakTyping(input) {
  if ('speechSynthesis' in window) {
    const say = new SpeechSynthesisUtterance(input);
    const voices = speechSynthesis.getVoices();
    const alexaVoice =
      voices.find(v => v.name.toLowerCase().includes('alexa')) ||
      voices.find(v => v.name.toLowerCase().includes('english')) ||
      voices[0];
    say.voice = alexaVoice;
    say.rate = 1.2;
    say.pitch = 1;
    speechSynthesis.speak(say);
  }
}

// --- Evaluate user expression safely ---
function calculate() {
  try {
    let exp = currentInput
      .replace(/x/g, '*')
      .replace(/÷/g, '/')
      .replace(/−/g, '-');

    const result = eval(exp);
    currentInput = result.toString();
    speakIt('Answer is ' + result); // Alexa says the result
  } catch (err) {
    currentInput = 'Error';
    speakIt('Error');
  }
  updateDisplay();
}

// --- Handle button clicks ---
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const val = btn.textContent;

    if (val === 'C') {
      currentInput = '';
    } else if (val === '⌫') {
      currentInput = currentInput.slice(0, -1);
    } else if (val === '=') {
      calculate();
      return;
    } else {
      currentInput += val;
      speakTyping(val); // 🔊 Alexa speaks while typing
    }
    updateDisplay();
  });
});

// --- Keyboard support ---
document.addEventListener('keydown', e => {
  const key = e.key;

  if (
    (key >= '0' && key <= '9') ||
    key === '.' ||
    key === '+' ||
    key === '-' ||
    key === '*' ||
    key === '/'
  ) {
    currentInput += key;
    speakTyping(key); // 🔊 Speak keypress
  }
  updateDisplay();
});
