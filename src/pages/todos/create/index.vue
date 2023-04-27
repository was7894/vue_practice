<template>
  <h2 class="red">일정등록하기</h2>
  <TodoForm :editing="false" />
</template>

<script>
import TodoForm from "@/components/TodoForm.vue";
export default {
  components: { TodoForm },
};
</script>
