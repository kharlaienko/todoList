import { onMounted, reactive, ref } from 'vue';

export default function loadUsers() {
   const isLoading = ref(true);
   const userList = ref([]);

   const loadData = () => {
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
