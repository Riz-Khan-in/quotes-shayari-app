// Authentication
function googleLogin() {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
}

function anonLogin() {
    firebase.auth().signInAnonymously();
}

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        document.getElementById('user-status').innerText = `Logged in as: ${user.isAnonymous ? "Anonymous" : user.email}`;
    } else {
        document.getElementById('user-status').innerText = "Not logged in";
    }
});

// Fetch Quotes from Google Sheets
let quotesData = [];

async function fetchQuotes() {
    const sheetURL = 'Your-Google-Sheet-URL';
    const res = await fetch(`${sheetURL}?alt=json`);
    const data = await res.json();
    quotesData = data.feed.entry.map(e => ({
        content: e.gsx$content.$t,
        author: e.gsx$author.$t
    }));
    fetchRandomQuote();
}

function fetchRandomQuote() {
    let random = quotesData[Math.floor(Math.random() * quotesData.length)];
    document.getElementById('quote-content').innerText = random.content;
    document.getElementById('quote-author').innerText = random.author;
}

// Placeholder functions (download/share)
function downloadQuote() {
    alert("Download functionality will be implemented later.");
}

function shareQuote() {
    alert("Share functionality will be implemented later.");
}

// Initial fetch
fetchQuotes();
