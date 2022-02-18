<template>
   <main class="bg-slate-900 h-full w-full flex flex-col text-gray-300">
      <div class="container mx-auto py-2 px-2 md:px-0 flex-grow h-full">
         <div class="flex h-full">
            <aside class="w-1/3 border mb-2 border-slate-800 h-full overflow-hidden flex flex-col">
               <h2 class="text-center py-4 w-full text-3xl border-b border-slate-800">Select User</h2>
               <div class="mb-2 mt-4 px-4">
                  <Input v-model="searchUser" :placeholder="'Search user'" />
               </div>
               <transition name="fade">
                  <div v-if="!isLoading" class="px-4 w-full overflow-y-auto">
                     <button
                        v-for="user of finalUserList"
                        :key="user.id"
                        class="
                           transition-all
                           duration-300
                           px-1
                           py-4
                           w-full
                           hover:bg-slate-700 hover:text-white
                           active:bg-slate-900 active:text-sky-500
                           border-slate-700 border-2
                           my-2
                           rounded-sm
                        "
                        @click="selectUser(user.id)"
                     >
                        {{ user.name }}
                     </button>
                  </div>
                  <div v-else class="text-center py-5">
                     <Spinner class="w-10 h-10" />
                  </div>
               </transition>
            </aside>

            <div class="bg-slate-900 w-full border border-slate-800 h-full overflow-y-auto"></div>
         </div>
      </div>
   </main>
</template>

<script>
import loadUsers from '../api/loadUsers';
import loadTodos from '../api/loadTodos';
import Spinner from './base/Spinner.vue';
import { ref } from '@vue/reactivity';
import { computed, watch } from '@vue/runtime-core';
import Input from './base/Input.vue';
export default {
   components: { Spinner, Input },
   setup() {
      const isLoading = ref(false);
      const selectedUserId = ref('');
      const searchUser = ref('');
      const todosList = ref([]);

      const { userList } = loadUsers(isLoading);

      const selectUser = id => {
         selectedUserId.value = id;
      };

      const finalUserList = computed(() => {
         return userList.value.filter(({ name }) => name.toLowerCase().includes(searchUser.value.trim().toLowerCase()));
      });

      watch(selectedUserId, () => {
         const { todoList } = loadTodos({ isLoading, id: selectedUserId.value });
         todosList.value = todoList.value;
      });

      return {
         isLoading,
         finalUserList,
         searchUser,
         todosList,
         selectUser,
      };
   },
};
</script>

<style lang="sass" scoped>
.fade-enter-active,
.fade-leave-active
   transition: opacity 0.5s ease

.fade-enter-from,
.fade-leave-to
   opacity: 0

.list-enter-active,
.list-leave-active
   transition: all 0.5s ease

.list-enter-from,
.list-leave-to
   opacity: 0
   transform: translateX(30px)
</style>