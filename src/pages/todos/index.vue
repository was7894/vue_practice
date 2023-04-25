<template>
  <div>
    <h1>오늘의 할일</h1>
    <input v-model="searchText" type="text" class="form-control" placeholder="검색어를 입력하세요" @keyup.enter="searchTodos" />
    <TodoBasicForm @add-todo="onSubmit" />
    <div style="color: red">{{ error }}</div>
    <div v-if="!todos.length">등록된 일정이 없습니다</div>

    <TodoList :todos="todos" @toggle-todo="toggleTodo" @deleteTodo="deleteTodo" />

    <nav>
      <ul class="pagination justify-content-center">
        <li v-if="currentPage !== 1" class="page-item">
          <a class="page-link" @click="getTodos(currentPage - 1)" tabindex="-1" aria-disabled="true">Previous</a>
        </li>
        <li v-for="page in numberOfPages" :key="{ page }" :class="currentPage === page ? 'active' : ''" class="page-item">
          <a class="page-link" @click="getTodos(page)"> {{ page }}</a>
        </li>
        <li v-if="currentPage !== numberOfPages" class="page-item">
          <a class="page-link" @click="getTodos(currentPage + 1)">Next</a>
        </li>
      </ul>
    </nav>
  </div>
  <Toast v-if="showToast" :message="toastMessage" :type="toastAlertType" />
  <Toast />
</template>

<script>
import { ref, computed, watch } from "vue";
import axios from "axios";
import TodoBasicForm from "@/components/TodoBasicForm.vue";
import TodoList from "@/components/TodoList.vue";
import { useToast } from "@/composables/toast";
import { Toast } from "@/components/Toast";

export default {
  components: {
    TodoBasicForm,
    TodoList,
    Toast,
    useToast,
  },
  setup() {
    const error = ref("");
    const toggle = ref(false);
    const searchText = ref("");
    const totalTodos = ref(0);
    const limit = 5;
    const currentPage = ref(1);
    const { showToast, toastMessage, toastAlertType, triggerToast, timeout } = useToast();

    const numberOfPages = computed(() => {
      return Math.ceil(totalTodos.value / limit);
    });

    let time = null;

    /* 변하는값 추적 */
    watch(searchText, () => {
      time = setTimeout(() => {
        getTodos(1);
      }, 2000);
    });

    const searchTextTodos = () => {
      clearTimeout(time);
    };

    // console.log(searchText.value);

    const todos = ref([]);
    const getTodos = (page = currentPage.value) => {
      currentPage.value = page;
      console.log("currentPage:", currentPage.value);
      axios
        .get(`http://localhost:8080/todos?&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`)
        .then((res) => {
          console.log("성공", res.headers["x-total-count"]);
          totalTodos.value = res.headers["x-total-count"];
          todos.value = res.data;
          triggerToast("목록가져옴", "info");
        })
        .catch((err) => {
          console.error(err);
          error.value = "일시적인 오류가 발생하였습니다. 잠시후 이용해주세요.";
          triggerToast("목록가져옴", "info");
        });
    };
    getTodos();
    const onSubmit = (todo) => {
      error.value = "";
      axios
        .post("http://localhost:8080/todos", { subject: todo.subject, completed: todo.completed })
        .then((res) => {
          todos.value.push(res.data.todos);
        })
        .catch((err) => {
          console.error("err", err);
          error.value = "일시적으로 오류가 발생하였습니다.";
        });
      // todos.value.push(todo);
    };
    const todoStyle = {
      textDecoration: "line-through",
      color: "gray",
    };

    const deleteTodo = (index) => {
      error.value = "";
      const id = index;
      axios
        .delete("http://localhost:8080/todos/" + id)
        .then((res) => {
          getTodos();
        })
        .catch((err) => {
          console.error(err);
        });
    };
    const toggleTodo = (index, checked) => {
      console.log("checked😪", checked);
      const id = index;
      axios
        .patch("http://localhost:8080/todos/" + id, { completed: checked })
        .then((res) => {
          getTodos();
          // todos.value[id].completed = checked;
          // console.log("🤨then", todos.value[id]?.completed);
        })
        .catch((err) => {
          console.error(err);
        });
    };

    return {
      error,
      // filteredTodos,
      onSubmit,
      todos,
      toggle,
      todoStyle,
      deleteTodo,
      toggleTodo,
      searchText,
      numberOfPages,
      currentPage,
      limit,
      getTodos,
      searchTextTodos,
      triggerToast,
      showToast,
      toastMessage,
      toastAlertType,
      timeout,
    };
  },
};
</script>

<style>
.todo {
  color: gray;
  text-decoration: line-through;
}
.page-item {
  cursor: pointer;
}
</style>
