<template>
  <div class="container">
    <h4>count:{{ count }}</h4>
    <h4>double count:{{ doubleCountComputed }}</h4>
    <h4>double count fn:{{ doubleCountFn() }}</h4>
    <h4>double count:{{ doubleCountComputed }}</h4>
    <h4>double count fn:{{ doubleCountFn() }}</h4>
    <h4>double count:{{ doubleCountComputed }}</h4>
    <h4>double count fn:{{ doubleCountFn() }}</h4>
    <button @click="count++">add</button>
    <h1>오늘의 할일</h1>
    <input class="form-control" type="text" v-model="searchText" placeholder="Search" />
    <TodoList :todos="todos" @toggle-todo="toggleTodo" @deleteTodo="deleteTodo" />
    <!-- <TodoBasicForm @add-todo="onAdd" /> -->
    <div v-if="!todos.length">등록된 일정이 없습니다.</div>
  </div>
  <!-- <Props :textProp="내용" /> -->
</template>

<script>
import { ref, computed } from "vue";
// import TodoBasicForm from "./components/TodoBasicForm.vue";
import TodoList from "./components/TodoList.vue";
import Props from "./components/Props.vue";

export default {
  components: { TodoList, Props },
  setup() {
    const count = ref(1);
    const doubleCountComputed = computed(() => {
      console.log("computed");
      return count.value * 2;
    });
    let todos = ref([]);
    /*  const todoStyle = {
      color: "gray",
      textDecoration: "line-through",
    }; */

    const doubleCountFn = () => {
      console.log("함수");
      return count.value * 2;
    };
    const toggleTodo = (index) => {
      console.log("value:", todos.value);
      todos.value[index].completed = !todos.value[index].completed;
      console.log("completed:", todos.value[index].completed);
      console.log("toggleTodo:", index);
    };
    const deleteTodo = (data) => {
      console.log(data);
      todos.value.splice(data, 1);
    };
    const onAdd = (todo) => {
      console.log(todos.value);
      todos.value.push(todo);
    };

    return {
      count,
      doubleCountComputed,
      onAdd,
      deleteTodo,
      // todoStyle,
      todos,
      toggleTodo,
      doubleCountFn,
    };
  },
};
</script>

<style>
.red {
  color: red;
}
.todo {
  color: gray;
  text-decoration: line-through;
}
</style>
