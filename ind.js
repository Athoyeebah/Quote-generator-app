// Selectors
const selectors = {
  quote: '#quote',
  author: '#author',
  shareButton: '#share-btn',
  fetchQuoteButton: '#fetch-quote-btn',
  error: '#error',
  facebookShare: '#share-on-facebook',
  shareOnTwitter: '#share-on-twitter',
   };

// Get elements
const quoteElement = document.querySelector(selectors.quote);
const authorElement = document.querySelector(selectors.author);

const shareButton = document.querySelector(selectors.shareButton);
const fetchQuoteButton = document.querySelector(selectors.fetchQuoteButton);
const errorElement = document.querySelector(selectors.error);



// Add event listeners
shareButton.addEventListener('click', shareQuote);

fetchQuoteButton.addEventListener('click', getQuote);

// Function to display error message
function displayErrorMessage(message) {
  errorElement.textContent = message;
  errorElement.style.display = 'block';
  setTimeout(() => {
    errorElement.style.display = 'none';
  }, 3000);
}

//function to get quote
const api_url = 'https://api.quotable.io/random';
async function getQuote() {
  try {
    const response = await fetch(api_url, {
      method: 'GET',
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    const quote = data.content;
    const author = data.author;
    quoteElement.textContent = `${quote}`;
    authorElement.textContent = `${author}`;
    console.log(`Quote: ${quote}\nAuthor: ${author}`);
  } catch (error) {
    console.error('Error fetching quote:', error.message, error.stack);
    displayErrorMessage(`Failed to fetch quote. Try again later`);
  } finally {
    console.log('Quote fetch attempt completed');
    init();
  }
}



// Function to share quote(web Share API )
function shareQuote() {
   const quote = quoteElement.innerText;
  const shareData = {
    title: 'Motivational Quote of the Day',
    text: quote,
  };

  if (navigator.share) {
    navigator.share(shareData)
      .then(() => console.log('Quote shared successfully!'))
      .catch((error) => console.error('Error sharing quote:', error));
  } else {
    console.log('Web Share API is not supported in this browser.');
    copyToClipboard();
    }
}

// Function to copy quote to clipboard
function copyToClipboard() {
  const textToCopy = quoteElement.textContent;
  navigator.clipboard
    .writeText(textToCopy)
    .then(() => alert('Quote copied'));
}


//Social media share


const facebookBtn = document.querySelector(".facebook-btn");
const twitterBtn = document.querySelector(".twitter-btn");
const pinterestBtn = document.querySelector(".pinterest-btn");
const linkedinBtn = document.querySelector(".linkedin-btn");
const whatsappBtn = document.querySelector(".whatsapp-btn");

function init() {
 const quote = document.querySelector(selectors.quote);
  const postUrl = encodeURI(document.location.href);
const postTitle = encodeURI(`Motivational Quote of the Day -  "${quote}"`);



 

  facebookBtn.setAttribute(
   "href",
   
    `https://www.facebook.com/sharer.php?u=${postUrl}`
 );

  twitterBtn.setAttribute(
    "href",
    `https://twitter.com/share?url=${postUrl}&text=${postTitle}`
  );

 
 pinterestBtn.setAttribute(
  "href",
 `https://pinterest.com/pin/create/bookmarklet/?media=${postUrl}&description=${postTitle}`
 );

 linkedinBtn.setAttribute(
   "href",
    `https://www.linkedin.com/shareArticle?url=${postUrl}&title=${postTitle}`
 );

 whatsappBtn.setAttribute(
    "href",
   `https://wa.me/?text=${postTitle} ${postUrl}`
 );
}

getQuote();
init();

