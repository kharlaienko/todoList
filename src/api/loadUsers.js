import { onMounted, reactive, ref } from 'vue';

export default function loadUsers(isLoading) {
   const userList = ref([]);

   const loadData = () => {
      isLoading.value = true;
      fetch('https://jsonplaceholder.typicode.com/users/')
         .then(res => res.json())
         .then(data => (userList.value = data))
         .finally(() => (isLoading.value = false));
   };

   onMounted(() => {
      loadData();
   });

   return {
      isLoading,
      userList,
   };
}
