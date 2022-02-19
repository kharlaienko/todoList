<template>
   <main class="bg-slate-900 h-full w-full flex flex-col text-gray-300">
      <div class="p-5 flex-grow h-full">
         <div class="flex h-full">
            <aside class="w-1/3 border-2 mb-2 border-slate-800 h-full overflow-hidden flex flex-col">
               <UsersSideBar />
            </aside>

            <div class="bg-slate-900 w-full border-2 border-slate-800 h-full overflow-hidden flex flex-col">
               <TodosList />
            </div>
         </div>
      </div>
   </main>
</template>

<script>
import Spinner from './base/Spinner.vue';
import Button from './base/Button.vue';
import Title from './base/Title.vue';
import UsersSideBar from './UsersSideBar.vue';
import TodosList from './TodosList.vue';
export default {
   components: { Spinner, Button, Title, UsersSideBar, TodosList },
   setup() {},
};
</script>

<style lang="sass">
.fade-enter-active
   transition: opacity 0.5s ease

.fade-enter-from,
.fade-leave-to
   opacity: 0
</style>