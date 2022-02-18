import { onMounted, ref } from 'vue';

export default function loadTodos({ isLoading, id }) {
   const todoList = ref([]);

   const loadData = () => {
      isLoading.value = true;
      fetch(`https://jsonplaceholder.typicode.com/users/${id}/todos`)
         .then(res => res.json())
         .then(data => (todoList.value = data))
         .finally(() => (isLoading.value = false));
   };

   loadData();

   return {
      todoList,
   };
}
