// UI Navigation
function showAuthPage() {
  document.getElementById('welcomePage').classList.add('hidden');
  document.getElementById('authPage').classList.remove('hidden');
}
function showMainPage() {
  document.getElementById('authPage').classList.add('hidden');
  document.getElementById('welcomePage').classList.add('hidden');
  document.getElementById('mainPage').classList.remove('hidden');
}

// Auth functions
function showReset() {
  alert("Reset Password functionality coming soon!");
}
function loginUser() {
  // Replace with real Firebase logic
  showMainPage();
}
function signupUser() {
  if (!document.getElementById('accept-terms').checked) {
    alert("You must accept the Privacy Policy & Terms!");
    return;
  }
  // Replace with real Firebase logic
  showMainPage();
}

// User info update (demo)
function updateUserInfo(name, avatar) {
  const display = document.getElementById('user-display');
  const img = document.getElementById('user-avatar');
  if (display) display.textContent = name || 'User';
  if (img && avatar) img.src = avatar;
}

// ---------------- Quotes Section -----------------
let quotesData = [];
let sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQUhH6VWWL055dpOkaGC3T-hXSFsJ2yx8QBvOm-Vplx_DPdWGkqoReIw06bWsEU8-ygSvY4hsLzsP0n/gviz/tq?tqx=out:json&sheet=Sheet1';

async function fetchQuotes() {
  try {
    let res = await fetch(sheetUrl);
    let text = await res.text();
    let json = JSON.parse(text.substr(47).slice(0, -2));
    quotesData = json.table.rows.map(row => ({
      content: row.c[2]?.v || "",
      author: row.c[3]?.v || "",
      mood: row.c[4]?.v || ""
    }));
    fetchRandomQuote();
  } catch (e) {
    const quoteElem = document.getElementById('quote-content');
    if (quoteElem) quoteElem.innerText = "Unable to load quotes!";
  }
}

function fetchRandomQuote() {
  if (!quotesData.length) return;
  let q = quotesData[Math.floor(Math.random() * quotesData.length)];
  const contentElem = document.getElementById('quote-content');
  const authorElem = document.getElementById('quote-author');
  const moodElem = document.getElementById('quote-mood');
  if (contentElem) contentElem.innerText = q.content;
  if (authorElem) authorElem.innerText = q.author ? `— ${q.author}` : "";
  if (moodElem) moodElem.innerText = q.mood ? `Mood: ${q.mood}` : "";
}

// Download and Share
function shareQuote() {
  let text = document.getElementById('quote-content').innerText +
    "\n" + document.getElementById('quote-author').innerText;
  if (navigator.share) {
    navigator.share({ text });
  } else {
    navigator.clipboard.writeText(text);
    alert("Quote copied to clipboard!");
  }
}

function downloadQuoteImage() {
  let node = document.getElementById('quote-card');
  html2canvas(node).then(canvas => {
    let link = document.createElement('a');
    link.download = 'quote.png';
    link.href = canvas.toDataURL();
    link.click();
  });
}

// On start
window.onload = () => {
  fetchQuotes();
};
