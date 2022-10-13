<script>
import CardView from "./CardView.vue";
import cardData from "../data/memoryCards8.js";
// import gameFunctions from "../assets/gameScript.js";

export default {
  components: {
    CardView,
  },
  data() {
    return {
      cardsData: cardData.concat(cardData),
      matchedPairs: 0,
      cardOne: "",
      cardTwo: "",
      disableDeck: false,
    };
  },
  mounted() {
    this.shuffleCards();
  },
  methods: {
    shuffleCards() {
      this.matchedPairs = 0; // reset matchedPairs variable to 0
      this.disableDeck = false; // reset disableDeck boolean
      this.cardOne = "";
      this.cardTwo = ""; // reset cardOne and cardTwo variables
      this.cardsData = this.cardsData.sort(function () {
        return 0.5 - Math.random();
      });
    },
    flipCard(evt) {
      const clickedCard = evt.target; // set the event's target DOM element as a variable
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
        matchCards(cardOneImg, cardTwoImg); // now check the images by filename to see if they are a match!
      }
    },
  },
};
</script>

<template>
  <div class="game-board">
    <ul class="cards">
      <li
        v-for="(cardInfo, index) in cardsData"
        :key="index"
        class="card"
        @click="flipCard"
      >
        <CardView viewType="front" />
        <CardView
          viewType="back"
          :imageUrl="cardInfo.url"
          :imageAltText="cardInfo.altText"
        />
      </li>
    </ul>
  </div>
</template>
