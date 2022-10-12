const cards = document.querySelectorAll(".card");
const newGameBtn = document.getElementById("new-game-btn");
const matchedPairsCounter = document.getElementById("matched-pairs");
const setOfCards = document.querySelector('.cards');
let matchedPairs = 0;
let cardOne, cardTwo;
let disableDeck = false;

function flipCard(evt) { // take an event object's as a scoped variable
  const clickedCard = evt.target; // set the event's target DOM element as a variable
  if (cardOne !== clickedCard && !disableDeck) { // make sure that the current variable cardOne is not the same value as the clickedCard, AND that the deck is NOT disabled
      clickedCard.classList.add("flip"); // add the 'flip' class to the classes currently assigned to the clickedCard
      if(!cardOne) { // if there is not yet a value assigned to the cardOne variable...
          return cardOne = clickedCard; // set the cardOne value as the clickedCard and end this function.
      }
      // everything below will execute if the condition above was not met (if cardOne already had a value when flipCard() was called)
      cardTwo = clickedCard; // set the cardTwo value as the clickedCard
      disableDeck = true; // set this to true for the next time this flipCard function is called, when the top level condition is evaluated
      // if the function has come this far, it means we have set values for both cardOne and cardTwo.
      // each of the cardOne and cardTwo variables currently represent a whole HTML element with childNodes
      let cardOneImg = cardOne.querySelector(".back-view img").src; // query the elements inside cardOne to get the value of the img src, such as `img-2.png`, and set that as the value of cardOneImg
      let cardTwoImg = cardTwo.querySelector(".back-view img").src; // query the elements inside cardOne to get the value of the img src, such as `img-2.png`, and set that as the value of cardTwoImg
      matchCards(cardOneImg, cardTwoImg); // now check the images by filename to see if they are a match!
  }
}

function matchCards(img1, img2) {
  if (img1 === img2) { // this code will run if the card images match
    matchedPairs++; // if the card images match, we can increment the global `matchedPairs` variable by 1 match
    printMatchCount();
    if (matchedPairs == 8) { // if your number of matches is 8, you've made all the matches! Game Won!  
      youWin();
      return; // for now, lets call this game over, end this function and do nothing else.
    }
    // everything below will execute if the game has not yet been won...
    cardOne.removeEventListener("click", flipCard); // remove the eventlistener so that this matchedPairs card cannot be flipped anymore
    cardTwo.removeEventListener("click", flipCard); // remove the eventlistener so that this matchedPairs card cannot be flipped anymore
    cardOne = cardTwo = ""; // now reset the cardOne & cardTwo variables to empty strings, so we can use them again
    disableDeck = false;
    return; // end function
  }
  
  setTimeout(() => {
    cardOne.classList.add("shake");
    cardTwo.classList.add("shake");
  }, 400);

  // these cards didn't match so we'll un-flip them, but let the user see them both before they disappear
  setTimeout(() => {
    cardOne.classList.remove("shake", "flip");
    cardTwo.classList.remove("shake", "flip");
    cardOne = cardTwo = ""; // reset the cardOne & cardTwo variables to empty string
    disableDeck = false;
    return;
  }, 1200);
}

function shuffleCards() {
  matchedPairs = 0; // reset matchedPairs variable to 0
  disableDeck = false; // reset disableDeck boolean
  cardOne = cardTwo = ""; // reset cardOne and cardTwo variables
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8]; // create an array of the image numbers, 1-8, twice
  arr.sort(() => Math.random() > 0.5 ? 1 : -1); // randomly sort the array
  
  cards.forEach((card, i) => { // loop over the set of cards. For each card...
      card.classList.remove("flip"); // remove the 'flip' class
      let imgTag = card.querySelector(".back-view img"); // find the back-view image tag by querying all the childNodes of the current card element for the '.back-view img' CSS selector
      imgTag.src = `images/img-${arr[i]}.png`; // set the value of the src attribute on the current imgTag to a numbered filename based on our randomized array
      card.addEventListener("click", flipCard); // add the click event listener to the current card to execute a function `flipCard` when clicked
  });
}

function newGame() {
  cards.forEach((card) => { // loop over the set of cards. For each card...
    card.classList.remove("flip"); // remove the 'flip' class
  });
  setOfCards.classList.remove('hide');
  matchedPairs = 0;
  printMatchCount();
  setTimeout(() => {
    shuffleCards();
  }, 900);
}

function printMatchCount() {
  matchedPairsCounter.innerHTML = matchedPairs;
}

function youWin() {
  setOfCards.classList.add('hide');
  window.confetti();
}

newGameBtn.addEventListener('click', newGame);
shuffleCards(); // execute the shuffleCards function
