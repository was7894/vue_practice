<template>
  <div class="container">
    <h1>오늘의 할일😎</h1>
    <!-- <h1>{{ todo }}</h1> -->
    <form action="#" class="d-flex" @:submit.prevent="onSubmit">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="일정을 추가하세요" v-model="todo" />
        <!-- type을줘야 prevent로 막힘. -->
        <button class="btn btn-primary" type="submit">추가하기</button>
      </div>
    </form>
    <div class="card">
      <span v-for="i in todos" :key="i.id">
        {{ i.subject }}
      </span>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const todo = ref("");
    let todos = ref([
      {
        id: 1,
        subject: "리액트복습",
      },
      {
        id: 2,
        subject: "뷰복습",
      },
    ]);

    const onSubmit = () => {
      /* ref으로 감싼건 value로 불러야됨 */
      console.log(todo.value);
      todos.value.push({
        id: Date.now(),
        subject: todo.value,
      });
    };

    const updateName = (e) => {
      console.log(e.target.value);
    };

    return {
      todo,
      todos,
      onSubmit,
      updateName,
    };
  },
};
</script>

<style>
.red {
  color: red;
}
</style>
