<template>
   <main class="bg-slate-900 h-full w-full flex flex-col text-gray-300">
      <div class="sm:p-5 flex-grow h-full flex">
         <transition name="fade">
            <aside
               class="w-full sm:w-1/3 border-2 mb-2 border-slate-800 h-full overflow-hidden flex flex-col"
               v-show="!isOpenTodos"
            >
               <UsersSideBar @userSelected="updateIsOpenTodos" />
            </aside>
         </transition>
         <transition name="fade">
            <div
               class="bg-slate-900 transition-all w-full border-2 border-slate-800 h-full overflow-hidden flex flex-col"
               :class="{ hidden: !isOpenTodos && isMobileDevice }"
            >
               <TodosList @backToUsers="updateIsOpenTodos" />
            </div>
         </transition>
      </div>
   </main>
</template>

<script>
import Spinner from './base/Spinner.vue';
import Button from './base/Button.vue';
import Title from './base/Title.vue';
import UsersSideBar from './UsersSideBar.vue';
import TodosList from './TodosList.vue';
import { ref } from '@vue/reactivity';
export default {
   components: { Spinner, Button, Title, UsersSideBar, TodosList },
   setup() {
      const isOpenTodos = ref(false);
      const isMobileDevice = window.innerWidth < 760;

      const updateIsOpenTodos = () => {
         if (isMobileDevice) {
            isOpenTodos.value = !isOpenTodos.value;
         }
      };
      return {
         isOpenTodos,
         isMobileDevice,
         updateIsOpenTodos,
      };
   },
};
</script>

<style lang="sass">
.fade-enter-active
   transition: opacity 0.5s ease

.fade-enter-from,
.fade-leave-to
   opacity: 0
</style>