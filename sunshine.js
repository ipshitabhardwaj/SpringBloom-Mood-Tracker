// sunshine.js

const responseBox = document.getElementById('response');
const journalInput = document.getElementById('journal-entry');
const submitJournalBtn = document.getElementById('submit-journal');
const historyList = document.getElementById('history-list');
const clearHistoryBtn = document.getElementById('clear-history');
const quoteBox = document.getElementById('quote');

const responses = {
  happy: "That's wonderful to hear! Keep shining ☀️",
  sad: "It's okay to feel sad. Sending you a big hug 🤗",
  anxious: "Take a deep breath. You're safe and you're doing your best 🌿",
  angry: "Your feelings are valid. Let's find a calm moment together 🌧️➡️🌈",
  calm: "Peace looks good on you 🌸"
};

const quotes = [
  "“Just when the caterpillar thought the world was over, it became a butterfly.” 🦋",
  "“Every flower blooms in its own time.” 🌼",
  "“You are not a burden. You are blooming.” 🌷",
  "“Feelings are visitors. Let them come and go.” 🍃",
  "“Small steps are still progress.” 🌱"
];

function trackMood(mood) {
  const message = responses[mood] || "I'm here with you 💗";
  responseBox.innerText = message;
  saveToHistory(`Mood: ${mood} — ${message}`);
}

function saveToHistory(entry) {
  const time = new Date().toLocaleString();
  const fullEntry = `${time} – ${entry}`;

  let history = JSON.parse(localStorage.getItem('springbloom-history')) || [];
  history.unshift(fullEntry); // Add to beginning
  localStorage.setItem('springbloom-history', JSON.stringify(history));

  renderHistory();
}

function renderHistory() {
  historyList.innerHTML = '';
  const history = JSON.parse(localStorage.getItem('springbloom-history')) || [];

  if (history.length === 0) {
    historyList.innerHTML = '<li>No entries yet 🌱</li>';
    return;
  }

  history.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    historyList.appendChild(li);
  });
}

submitJournalBtn.addEventListener('click', () => {
  const entry = journalInput.value.trim();
  if (entry) {
    saveToHistory(`Journal: ${entry}`);
    journalInput.value = '';
    responseBox.innerText = "Your thoughts are safe here 💌";
  }
});

clearHistoryBtn.addEventListener('click', () => {
  localStorage.removeItem('springbloom-history');
  renderHistory();
  responseBox.innerText = "History cleared. A fresh start 🌼";
});

function showRandomQuote() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteBox.innerText = quote;
}

document.addEventListener('DOMContentLoaded', () => {
  renderHistory();
  showRandomQuote();
});
