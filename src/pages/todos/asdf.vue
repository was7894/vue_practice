<template>
  <h1>일정내용</h1>
  <div v-if="loading">Loading...</div>
  <form v-else @submit.prevent="onSave">
    <div class="row">
      <div class="col-6">
        <div class="form-group">
          <label>일정명:</label>
          <input type="text" class="form-control" v-model="todo.subject" />
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label>수행상태:</label>
          <button class="btn" :class="todo.completed ? 'btn-success' : 'btn-danger'" type="button" @click="toggleTodoStatus">
            {{ todo.completed ? "완료" : "미완료" }}
          </button>
        </div>
      </div>
    </div>
    <button class="btn btn-primary" :disabled="!todoUpdate">저장</button>
    <button class="btn btn-outline-dark ms-2" @click="moveToTodoListPage">취소</button>
  </form>
  <Toast v-if="showToast" :message="toastMessage" :type="toastAlertType" />
  <!-- <Toast v-else=""/> -->
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { ref, computed } from "vue";
import _ from "lodash";
import Toast from "@/components/Toast.vue";

export default {
  components: {
    Toast,
  },
  setup() {
    const originalTodo = ref(null);
    const route = useRoute();
    const router = useRouter();
    const todo = ref(null);
    const loading = ref(true);
    const todoId = route.params.id;
    const url = "http://localhost:8080/todos/";
    const showToast = ref(false);
    const toastMessage = ref("");
    const toastAlertType = ref("");

    const triggerToast = (msg, type = "info") => {
      toastMessage.value = msg;
      toastAlertType.value = type;
      showToast.value = true;
      setTimeout(() => {
        toastMessage.value = "";
        toastAlertType = "";
        showToast.value = false;
      }, 1000);
    };

    const todoUpdate = computed(() => {
      return !_.isEqual(todo.value, originalTodo.value);
    });
    const toggleTodoStatus = () => {
      todo.value.completed = !todo.value.completed;
    };
    const onSave = () => {
      axios
        .put(`${url}${todoId}`, {
          subject: todo.value.subject,
          complete: todo.value.complete,
        })
        .then((res) => {
          originalTodo.value = { ...res.data };
          triggerToast("등록이 완료되었습니다", "info");
          // console.log("onSave🙂", res);
        })
        .catch((err) => {
          console.error(err);
          triggerToast("일시적으로 장애가 오류가 발생하였습니다. 잠시 후 다시 이용해 주세요", "danger");
        });
    };

    const getTodo = () => {
      axios
        .get(`${url}${todoId}`)
        .then((res) => {
          todo.value = { ...res.data };
          originalTodo.value = { ...res.data };
          loading.value = false;
        })
        .catch((err) => {
          console.error(err);
        });
    };
    getTodo();
    const moveToTodoListPage = () => {
      router.push({
        name: "Todos",
      });
    };

    console.log("id🙄", route.params.id);
    return {
      todo,
      loading,
      moveToTodoListPage,
      onSave,
      todoUpdate,
      toggleTodoStatus,
      Toast,
      showToast,
      triggerToast,
      toastMessage,
      toastAlertType,
    };
  },
};
</script>

<style></style>
