<script>
import CardWrapper from "./CardWrapper.vue";

export default {
  components: {
    CardWrapper,
  },
};
</script>

<template>
  <div class="game-board">
    <p>I am the GameBoard.vue component</p>
    <ul class="cards">
      <CardWrapper />
    </ul>
  </div>
</template>
