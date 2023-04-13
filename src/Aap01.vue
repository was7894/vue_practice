<template>
  <!--html 주석-->
  <h1 class="app">{{ name }}app</h1>

  <button type="button" class="btn btn-primary" v-on:click="updateName">가나다라</button>

  <ul class="list text-primary">
    <li>{{ greeting("육쌈냉면") }}</li>
    <li>{{ cats }}🐱</li>
    <li>{{ cats }}🐱</li>
    <li>{{ cats }}🐱</li>
  </ul>

  <button type="button" class="btn btn-danger" v-on:click="updateCat">야옹</button>
</template>

<script>
import { reactive, ref } from "vue";

export default {
  //자바스크립트 주석
  //vue3 에서 나온 문법 사용해서 실행해보기
  setup() {
    let name = ref("비빔냉면");

    let cats = reactive({
      name: "마리",
      age: 1,
      weight: 100,
    });

    const updateCat = () => {
      (cats.name = "덕이"), (cats.age = 7), (cats.weight = 5);
    };

    const greeting = (name) => {
      return "오늘점심은" + name;
    };

    const updateName = () => {
      name.value = "물냉면";
    };

    const consoleLog = () => {
      console.log("click");
    };

    return { name, greeting, consoleLog, updateName, cats, updateCat };
  },
};
</script>

<style>
/* css 주석 */
.app {
  background-color: red;
}
.list {
  color: green;
}
</style>
