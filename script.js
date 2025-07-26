const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const preview = document.getElementById('result-preview');

let currentInput = "";

function updateDisplay() {
  display.value = currentInput;
  updatePreview();
}

function updatePreview() {
  try {
    const result = eval(currentInput);
    preview.textContent = isFinite(result) ? result : '';
  } catch {
    preview.textContent = '';
  }
}

function handleInput(value) {
  if (value === 'C') {
    currentInput = "";
  } else if (value === '=') {
    try {
      currentInput = eval(currentInput).toString();
    } catch {
      currentInput = "Error";
    }
  } else {
    currentInput += value;
  }
  updateDisplay();
}

// Button clicks
buttons.forEach(button => {
  const val = button.dataset.value;
  button.addEventListener('click', () => handleInput(val));
});

// Keyboard support
document.addEventListener('keydown', (e) => {
  const key = e.key;

  if ('0123456789+-*/.'.includes(key)) {
    currentInput += key;
  } else if (key === 'Enter') {
    try {
      currentInput = eval(currentInput).toString();
    } catch {
      currentInput = "Error";
    }
  } else if (key === 'Backspace') {
    currentInput = currentInput.slice(0, -1);
  } else if (key.toLowerCase() === 'c') {
    currentInput = "";
  }
  updateDisplay();
});
