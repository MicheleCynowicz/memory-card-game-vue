# Step 6: Complete the game
You've come a long way!

If you were able to get your `matchCards()` method working at the end of [Step 5]() on your own, then you should the `matchCards()` function code, with all the component variables and methods prefixed with `this.` in your `GameBoard.vue`component:
```js
matchCards(img1, img2) {
  if (img1 === img2) {
    // this code will run if the card images match
    this.matchedPairs++; // if the card images match, we can increment the global `matchedPairs` variable by 1 match
    if (this.matchedPairs == 8) {
      // if your number of matches is 8, you've made all the matches! Game Won!
      console.log(`YOU WIN!`);
      return; // for now, lets call this game over, end this function and do nothing else.
    }
    // everything below will execute if the game has not yet been won...
    this.cardOne.removeEventListener("click", this.flipCard); // remove the eventlistener so that this matchedPairs card cannot be flipped anymore
    this.cardTwo.removeEventListener("click", this.flipCard); // remove the eventlistener so that this matchedPairs card cannot be flipped anymore
    this.cardOne = ""; // now reset the cardOne & cardTwo variables to empty strings, so we can use them again
    this.cardTwo = "";
    this.disableDeck = false;
    return; // end function
  }
  setTimeout(() => {
    this.cardOne.classList.add("shake");
    this.cardTwo.classList.add("shake");
  }, 400);

  // these cards didn't match so we'll un-flip them, but let the user see them both before they disappear
  setTimeout(() => {
    this.cardOne.classList.remove("shake", "flip");
    this.cardTwo.classList.remove("shake", "flip");
    this.cardOne = "";
    this.cardTwo = ""; // reset the cardOne & cardTwo variables to empty string
    this.disableDeck = false;
    return;
  }, 1200);
},
```
If you didn't have the `matchCards()` function setup, add the previous code to your `methods: {...}` object now. Save and test this in the browser.

It *_almost_* works! You might have noticed a tiny flaw in the logic to `removeEventlistener` from the cards that were a match. When you play the game at this point, everything should function as you expect, *_except_* for after a match has been made. Once a match has been made, the player is able to click a matched card, and tested against another card, and could be _unflipped_ after already matched.

The culprit is that these lines of code don't do what they were intended to do:
```js
this.cardOne.removeEventListener("click", this.flipCard); // remove the eventlistener so that this matchedPairs card cannot be flipped anymore
this.cardTwo.removeEventListener("click", this.flipCard); // remove the eventlistener so that this matchedPairs card cannot be flipped anymore
```
These lines of code won't work with our Vue setup because we aren't calling `addEventListener` here. We cannot use JavaScript to remove an event listener that we did not add with JavaScript.

To circumvent this, we will again use a `class` to look for to figure out if a card should not be _unflipped_.
Change the two lines shown above to these two lines instead:
```js
this.cardOne.classList.add("matched"); // add a class "matched" so that the flipCard function will not run when these are clicked
this.cardTwo.classList.add("matched"); // add a class "matched" so that the flipCard function will not run when these are clicked
```

Then go into the `flipCard() {...}` method and add this line of code just after the `clickedCard` variable is defined:
```js
if (clickedCard.classList.contains("matched")) return;
```
This line of code will stop the `flipCard` method from continuing to execute if the `clickedCard` has a `matched` class applied already.

Your two methods, `flipCard()` and `matchCards()` should now look like this:
```js
flipCard(evt) {
  const clickedCard = evt.target; // set the event's target DOM element as a variable
  if (clickedCard.classList.contains("matched")) return;
  if (this.cardOne !== clickedCard && !this.disableDeck) { // make sure that the current variable cardOne is not the same value as the clickedCard, AND that the deck is NOT disabled
    clickedCard.classList.add("flip"); // add the 'flip' class to the classes currently assigned to the clickedCard
    if (!this.cardOne) {
      // if there is not yet a value assigned to the cardOne variable...
      return (this.cardOne = clickedCard); // set the cardOne value as the clickedCard and end this function.
    }
    // everything below will execute if the condition above was not met (if cardOne already had a value when flipCard() was called)
    this.cardTwo = clickedCard; // set the cardTwo value as the clickedCard
    this.disableDeck = true; // set this to true for the next time this flipCard function is called, when the top level condition is evaluated
    // if the function has come this far, it means we have set values for both cardOne and cardTwo.
    // each of the cardOne and cardTwo variables currently represent a whole HTML element with childNodes
    let cardOneImg = this.cardOne.querySelector(".back-view img").src; // query the elements inside cardOne to get the value of the img src, such as `img-2.png`, and set that as the value of cardOneImg
    let cardTwoImg = this.cardTwo.querySelector(".back-view img").src; // query the elements inside cardOne to get the value of the img src, such as `img-2.png`, and set that as the value of cardTwoImg
    this.matchCards(cardOneImg, cardTwoImg); // now check the images by filename to see if they are a match!
  }
},
matchCards(img1, img2) {
  if (img1 === img2) {
    // this code will run if the card images match
    this.matchedPairs++; // if the card images match, we can increment the global `matchedPairs` variable by 1 match
    if (this.matchedPairs == 8) {
      // if your number of matches is 8, you've made all the matches! Game Won!
      console.log(`YOU WIN!`);
      return; // for now, lets call this game over, end this function and do nothing else.
    }
    // everything below will execute if the game has not yet been won...
    this.cardOne.classList.add("matched"); // add a class "matched" so that the flipCard function will not run when these are clicked
    this.cardTwo.classList.add("matched"); // add a class "matched" so that the flipCard function will not run when these are clicked
    this.cardOne = ""; // now reset the cardOne & cardTwo variables to empty strings, so we can use them again
    this.cardTwo = "";
    this.disableDeck = false;
    return; // end function
  }
  setTimeout(() => {
    this.cardOne.classList.add("shake");
    this.cardTwo.classList.add("shake");
  }, 400);

  // these cards didn't match so we'll un-flip them, but let the user see them both before they disappear
  setTimeout(() => {
    this.cardOne.classList.remove("shake", "flip");
    this.cardTwo.classList.remove("shake", "flip");
    this.cardOne = "";
    this.cardTwo = ""; // reset the cardOne & cardTwo variables to empty string
    this.disableDeck = false;
    return;
  }, 1200);
},
```

Test your game until you've successfully matched all 8 pairs. If you see the message `YOU WIN!` in the console, you've successfully rebuilt your game in Vue!

If you added any game features in your original `static_site` version, try to convert those features to Vue now too!

In the [last step](/build-and-deploy), you'll deploy your app on GitHub pages.