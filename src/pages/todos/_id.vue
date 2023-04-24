<template>
  <h1>일정내용</h1>
  <div v-if="loading">Loading...</div>
  <form v-else>
    <div class="row">
      <div class="col-6">
        <div class="form-group">
          <label for="">일정명:</label>
          <input type="text" class="form-control" v-model="todo.subject" />
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label for="">수행상태:</label>
          <button class="btn" :class="todo.completed ? 'btn-success' : 'btn-danger'" type="button">{{ todo.completed ? "완료" : "미완료" }}</button>
        </div>
      </div>
    </div>

    <button class="btn btn-primary">저장</button>
  </form>
</template>

<script>
import { useRoute } from "vue-router";
import axios from "axios";
import { ref } from "vue";
export default {
  setup() {
    // console.log("id", route.params.id);
    const route = useRoute();
    const todo = ref(null);
    const loading = ref(true);
    const getTodo = () => {
      axios
        .get("http://localhost:8080/todos/" + route.params.id)
        .then((res) => {
          todo.value = res.data;
          loading.value = false;
        })
        .catch((err) => {
          console.error(err);
        });
    };
    getTodo();
    return { todo, loading };
  },
};
</script>

<style></style>
