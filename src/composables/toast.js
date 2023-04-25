import { ref, onUnmounted } from "vue";

export const useToast = () => {
  const showToast = ref(false);
  const toastMessage = ref("");
  const toastAlertType = ref("");
  const timeout = ref(null);

  onUnmounted(() => {
    clearTimeout(timeout.value);
  });

  const triggerToast = (msg, type = "info") => {
    toastMessage.value = msg;
    toastAlertType.value = type;
    showToast.value = true;

    timeout.value = setTimeout(() => {
      console.log("아디뷰 컴포넌트함수");
      console.log("돌고도는세상");
      toastMessage.value = "";
      toastAlertType.value = "";
      showToast.value = false;
    }, 5000);
  };
  return {
    showToast,
    triggerToast,
    toastMessage,
    toastAlertType,
    timeout,
  };
};
