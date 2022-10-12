<script>
export default {
  props: {
    viewType: {
      type: String,
      required: true,
    },
  },
  computed: {
    somthing() {
      return "value";
    },
  },
};
</script>

<template>
  <div :class="`view ${viewType}-view`">
    <p>{{ somthing }}</p>
    <img src="images/que_icon.svg" alt="icon" />
  </div>
</template>
