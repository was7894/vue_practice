<template>
  <div class="card mb-2">
    <div @click="moveToPage(i.id)" class="card-body p-2 d-flex" v-for="i in todos" :key="i.id" style="cursor: pointer">
      <div class="form-check flex-grow-1">
        <label class="form-check-label" :class="{ todo: i.completed }">
          {{ i.subject }}
          <!-- $event -> 이벤트객체 전달. -->
          <input type="checkbox" class="form-check-input" :value="todos.completed" @change="toggleTodo(i.id, $event)" @click.stop :checked="i.completed" />
        </label>
      </div>
      <div>
        <!-- stop추가 버블링 막음. -->
        <button class="btn btn-danger btn-sm" @click.stop="openModal(i.id)">삭제</button>
        <!-- deleteTodo(i.id) -->
      </div>
    </div>
  </div>
  <Modal v-if="showModal" @close="closeModal" @delete="deleteTodo" />
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Modal from "@/components/Modal.vue";
export default {
  props: {
    todos: {
      type: Array,
      required: true,
    },
  },
  components: {
    Modal,
  },
  emits: ["toggle-todo", "deleteTodo"],
  setup(props, { emit }) {
    let showModal = ref(false);
    let todoDeleteId = ref(null);
    const router = useRouter();
    const toggleTodo = (index, event) => {
      console.log("😀id, checked:", index, event.target.checked);
      emit("toggle-todo", index, event.target.checked);
    };
    const deleteTodo = (index) => {
      emit("deleteTodo", index);
    };
    const moveToPage = (todoId) => {
      // console.log("😏todoid:", todoId);
      // router.push("/todos/" + todoId);
      /* 네임드라우터 */
      router.push({
        name: "Todo",
        params: {
          id: todoId,
        },
      });
    };

    const openModal = (id) => {
      console.log("지울id", id);
      todoDeleteId.value = id;
      showModal.value = true;
    };
    const closeModal = () => {
      todoDeleteId.value = null;
      showModal.value = false;
    };

    return { toggleTodo, deleteTodo, moveToPage, showModal, openModal, closeModal };
  },
};
</script>
<style>
.form-check-label {
  cursor: pointer;
}
</style>
