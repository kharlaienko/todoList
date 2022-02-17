<template>
   <main class="bg-slate-900 h-full w-full flex flex-col text-gray-300 overflow-x-auto">
      <div class="container mx-auto pt-2 px-2 md:px-0 flex-grow">
         <div class="flex">
            <aside class="w-1/3 border border-slate-800">
               <h2 class="text-center py-4 w-full text-3xl border-b border-slate-800">Select User</h2>
               <transition name="fade">
                  <div v-if="!isLoading" class="px-4">
                     <transition-group name="list">
                        <button
                           v-for="user of userList"
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
                     </transition-group>
                  </div>
                  <div v-else class="text-center py-5">
                     <Spinner :height="10" :width="10" />
                  </div>
               </transition>
            </aside>

            <div class="bg-slate-900 w-full"></div>
         </div>
      </div>
   </main>
</template>

<script>
import loadUsers from '../api/loadUsers';
import Spinner from './base/Spinner.vue';
export default {
   components: { Spinner },
   setup() {
      const { isLoading, userList } = loadUsers();

      const selectUser = id => {
         console.log(id);
      };

      return {
         isLoading,
         userList,
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