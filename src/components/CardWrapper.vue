<script>
import CardView from "./CardView.vue";

export default {
  components: {
    CardView,
  },
};
</script>

<template>
  <li class="card">
    <CardView viewType="front" />
    <CardView viewType="back" />
  </li>
</template>
