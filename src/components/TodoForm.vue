<template>
  <h1 v-if="editing">일정상세페이지</h1>
  <div v-if="loading">Loading...</div>
  <form v-else @submit.prevent="onSave">
    <div class="row">
      <div class="col-6">
        <Input label="일정명" :error="subjectError" />
      </div>
      <div class="col-6">
        <div v-if="editing" class="form-group">
          <label>수행상태:</label>
          <button class="btn" :class="todo.completed ? 'btn-success' : 'btn-danger'" type="button" @click="toggleTodoStatus">
            {{ todo.completed ? "완료" : "미완료" }}
          </button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="form-group"><label>일정내용</label> <textarea class="form-control" cols="30" rows="10" v-model="todo.body"></textarea></div>
      </div>
    </div>
    <button class="btn btn-primary" :disabled="!todoUpdate">{{ editing ? "저장" : "등록" }}</button>
    <button class="btn btn-outline-dark ms-2" @click="moveToTodoListPage">취소</button>
  </form>

  <transition name="fade">
    <Toast v-if="showToast" :message="toastMessage" :type="toastAlertType" />
  </transition>

  <div id="mango">😁강아지</div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { ref, computed, onMounted } from "vue";
import _ from "lodash";
import Toast from "@/components/Toast.vue";
import Input from "@/components/Inputt.vue";

export default {
  props: {
    editing: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Toast,
    Input,
  },
  setup(props) {
    const subjectError = ref(null);
    const originalTodo = ref(null);
    const route = useRoute();
    const router = useRouter();
    const todo = ref({
      subject: "",
      completed: false,
      body: "",
    });
    const loading = ref(false);
    const todoId = route.params.id;
    const url = "http://localhost:8080/todos/";

    const showToast = ref(false);
    const toastMessage = ref("");
    const toastAlertType = ref("");
    const timeout = ref(null);

    onMounted(() => {
      clearTimeout(timeout.value);
    });

    const triggerToast = (msg, type = "info") => {
      toastMessage.value = msg;
      toastAlertType.value = type;
      showToast.value = true;
      timeout.value = setTimeout(() => {
        // console.log("움직임 확인👻");
        toastMessage.value = "";
        toastAlertType.value = "";
        showToast.value = false;
      }, 8000);
    };

    const todoUpdate = computed(() => {
      return !_.isEqual(todo.value, originalTodo.value);
    });
    const toggleTodoStatus = () => {
      todo.value.completed = !todo.value.completed;
    };
    const onSave = () => {
      let response;
      const data = {
        subject: todo.value.subject,
        completed: todo.value.completed,
        body: todo.value.body,
      };
      subjectError.value = "";
      if (!todo.value.subject) {
        subjectError.value = "일정명은 필수입력사항입니다.";
      }
      if (props.editing) {
        //editing; 기존일정수정
        axios
          .put(`${url}${todoId}`, data)
          .then((res) => {
            originalTodo.value = { ...res.data };
            triggerToast("등록이 완료되었습니다", "info");
            // router.push({ name: "Todos" });
            // console.log("onSave🙂", res);
          })
          .catch((err) => {
            console.error(err);
            triggerToast("일시적으로 장애가 오류가 발생하였습니다. 잠시 후 다시 이용해 주세요", "danger");
          });
      } else {
        //noediting; 새 일정등록
        axios
          .post(`${url}`, data)
          .then((res) => {
            response = res;
            console.log("🍔hamberger", response);
            originalTodo.value = { ...res.data };
            triggerToast("등록이 완료되었습니다", "info");
            // router.push({ name: "Todos" });
            // console.log("onSave🙂", res);
            todo.value.subject = "";
            todo.value.body = "";
          })
          .catch((err) => {
            console.error(err);
            triggerToast("일시적으로 장애가 오류가 발생하였습니다. 잠시 후 다시 이용해 주세요", "danger");
          });
      }

      /*  axios
        .put(`${url}${todoId}`, {
          subject: todo.value.subject,
          complete: todo.value.complete,
        })
        .then((res) => {
          originalTodo.value = { ...res.data };
          triggerToast("등록이 완료되었습니다", "info");
          router.push({ name: "Todos" });
          // console.log("onSave🙂", res);
        })
        .catch((err) => {
          console.error(err);
          triggerToast("일시적으로 장애가 오류가 발생하였습니다. 잠시 후 다시 이용해 주세요", "danger");
        }); */
    };

    const getTodo = () => {
      loading.value = true;
      axios
        .get(`${url}${todoId}`)
        .then((res) => {
          todo.value = { ...res.data };
          originalTodo.value = { ...res.data };
          loading.value = false;
        })
        .catch((err) => {
          console.error(err);
          loading.value = false;
        });
    };
    if (props.editing) {
      getTodo();
    }

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
      subjectError,
    };
  },
};
</script>

<style scoped>
.red {
  color: red;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0px);
}
</style>
