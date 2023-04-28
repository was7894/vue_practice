<template>
  <List :items="todos">
    <template #default="{ item, index }">
      <div class="d-flex p-2 align-item-center" @click="moveToPage(item.id)" style="cursor: pointer">
        <div class="form-check flex-grow-1">
          <input type="checkbox" class="ml-2 mr-2" :checked="item.completed" @change="toggleTodo(index, $event)" @click.stop />
          <span :class="{ todo: item.completed }">{{ item.subject }}</span>
        </div>
        <div>
          <!-- stop추가 버블링 막음. -->
          <button class="btn btn-danger btn-sm" @click.stop="openModal(item.id)">삭제</button>
          <!-- deleteTodo(i.id) -->
        </div>
      </div>
    </template>
  </List>

  <teleport to="#mango">
    <Modal v-if="showModal" @close="closeModal" @delete="deleteTodo" />
  </teleport>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Modal from "@/components/DeleteModal.vue";
import List from "@/components/List.vue";

export default {
  props: {
    todos: {
      type: Array,
      required: true,
    },
  },
  components: {
    Modal,
    List,
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
    const deleteTodo = () => {
      emit("deleteTodo", todoDeleteId.value);
      showModal.value = false;
      todoDeleteId.value = null;
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
