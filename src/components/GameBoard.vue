<script>
import CardView from "./CardView.vue";
import cardData from "../data/memoryCards8.js";

export default {
  components: {
    CardView,
  },
  computed: {
    cardsData() {
      return cardData.concat(cardData);
    },
  },
};
</script>

<template>
  <div class="game-board">
    <ul class="cards">
      <li v-for="(cardInfo, index) in cardsData" :key="index" class="card">
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
