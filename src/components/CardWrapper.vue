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
    <CardView
      viewType="back"
      imageUrl="../static_site/images/img-1.png"
      imageAltText="An emerald cut into a diamond shape."
    />
  </li>
</template>
