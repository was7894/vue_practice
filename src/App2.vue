<template>
  <div>
    <h1 :class="red">{{ name }}😀</h1>
  </div>
  <input type="text" v-model="name" />
  <!-- <input type="text" :value="name" @input="updateName" /> -->
  <button class="btn-primary" @:click="onSubmit">버튼</button>
</template>

<script>
//{{name 에 김망고가 출력되게 해주세요}}
import { ref } from "vue";

export default {
  setup() {
    let red = ref("red");
    console.log(red.value);

    let name = ref("김망고"); /* 단방향으로 전송. */

    const onSubmit = () => {
      console.log(name.value);
    };

    const updateName = (e) => {
      console.log(e.target.value);
    };
    return { name, onSubmit, red, updateName };
  },
};
</script>

<style>
.red {
  background-color: red;
}
.green {
  background-color: green;
}
</style>
