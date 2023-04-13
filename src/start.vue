<template>
  <div :class="red">{{ name }}</div>
  <input type="text" v-model="name" />
  <button class="btn btn-primary" @:click="onSubmit">click</button>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const name = ref("김망고");

    const onSubmit = () => {
      console.log(name.value);
    };

    return {
      name,
      onSubmit,
    };
  },
};
</script>

<style>
.red {
  color: red;
}
</style>
