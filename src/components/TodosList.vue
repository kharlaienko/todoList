<template>
   <div class="flex items-center px-4">
      <button class="mr-2" v-if="isMobileDevice" @click="$emit('backToUsers')">
         <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
         </svg>
      </button>
      <Title>{{ selectedUser.name }} Todos</Title>
   </div>
   <div class="m-4 mb-0 p-4 flex items-center gap-x-5 border-2 border-slate-700">
      <CheckBox v-model="sortOptions.isCompleted">
         <p class="text-xl my-auto">Only Completed</p>
      </CheckBox>
   </div>
   <div class="overflow-y-auto">
      <transition name="fade">
         <div v-if="!isLoading && sortedTodos.length > 0" class="p-4">
            <transition-group name="list">
               <div
                  v-for="todo in sortedTodos"
                  :key="todo.id"
                  class="my-2 p-2 border-2 border-slate-700 flex justify-between items-center"
               >
                  <p class="text-xl capitalize mr-4">{{ todo.title }}</p>
                  <Check v-model:isChecked="todo.completed" />
               </div>
            </transition-group>
         </div>
         <div v-else-if="!isLoading && sortedTodos.length === 0">asd</div>
         <div v-else class="text-center py-5">
            <Spinner class="w-28 h-28" />
         </div>
      </transition>
   </div>
</template>
<script>
import { ref } from '@vue/reactivity';
import { loadTodos, loadUsers } from '../api/api';
import Spinner from './base/Spinner.vue';
import Title from './base/Title.vue';
import { computed, onMounted, watch } from '@vue/runtime-core';
import { getItemFromHash } from '../helpers/hash';
import Check from './base/Check.vue';
import CheckBox from './base/CheckBox.vue';
export default {
   components: { Spinner, Title, Check, CheckBox },
   emits: ['backToUsers'],
   setup() {
      const isLoading = ref(false);
      const todoList = ref([]);
      const userId = ref('');
      const selectedUser = ref({});
      const isMobileDevice = window.innerWidth < 760;

      const sortOptions = ref({
         isCompleted: false,
      });

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

      const sortedTodos = computed(() => {
         if (sortOptions.value.isCompleted) {
            return todoList.value.filter(item => item.completed === true);
         } else {
            return todoList.value.filter(item => item.completed === false);
         }
      });

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
         sortOptions,
         isLoading,
         todoList,
         selectedUser,
         sortedTodos,
         isMobileDevice,
      };
   },
};
</script>

<style lang="sass" scoped>
.list-enter-active,
.list-leave-active
   transition: all 0.5s ease

.list-enter-from,
.list-leave-to
   opacity: 0
   transform: translateX(30px)
</style>