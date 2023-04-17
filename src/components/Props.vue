<template>
  <h1>Props</h1>
  {{ textProp }}
</template>

<script>
export default {
  props: {
    textProp: {
      type: String,
      required: true,
    },
  },
};
</script>

<style></style>
