<template>
   <Title>{{ selectedUser.name }} Todos</Title>
   <transition name="fade">
      <div v-if="!isLoading && todoList" class="p-4">
         <div v-for="todo in todoList" :key="todo.id">{{ todo.title }}</div>
      </div>
      <div v-else class="text-center py-5">
         <Spinner class="w-10 h-10" />
      </div>
   </transition>
</template>
<script>
import { ref } from '@vue/reactivity';
import { loadTodos, loadUsers } from '../api/api';
import Spinner from './base/Spinner.vue';
import Title from './base/Title.vue';
import { onMounted, watch } from '@vue/runtime-core';
import { getItemFromHash } from '../helpers/hash';
export default {
   components: { Spinner, Title },

   setup() {
      const isLoading = ref(false);
      const todoList = ref([]);
      const userId = ref('');
      const selectedUser = ref({});

      const changeUserId = () => {
         userId.value = getItemFromHash('userId');
      };

      const loadUser = async () => {
         const data = await loadUsers(userId.value);
         selectedUser.value = data;
      };

      const loadTodoList = async () => {
         isLoading.value = true;
         todoList.value = await loadTodos(userId.value);
         isLoading.value = false;
      };

      onMounted(() => {
         changeUserId();
         window.addEventListener('hashchange', changeUserId);
      });

      watch(userId, () => {
         if (!userId.value) return;
         loadTodoList();
         loadUser();
      });

      return {
         isLoading,
         todoList,
         selectedUser,
      };
   },
};
</script>