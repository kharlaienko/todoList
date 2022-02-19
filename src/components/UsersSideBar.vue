<template>
   <Title>Select User</Title>
   <div class="mb-4 mt-4 px-4">
      <Input v-model="searchUser" :placeholder="'Search user'" />
   </div>
   <transition name="fade">
      <div v-if="!isLoading" class="px-4 w-full overflow-y-auto">
         <Button
            v-for="user of finalUserList"
            :key="user.id"
            :isActive="selectedUserId == user.id"
            @click="selectUser(user.id)"
         >
            {{ user.name }}
         </Button>
      </div>
      <div v-else class="text-center py-5">
         <Spinner class="w-10 h-10" />
      </div>
   </transition>
</template>
<script>
import { loadUsers } from '../api/api';
import Spinner from './base/Spinner.vue';
import Button from './base/Button.vue';
import Input from './base/Input.vue';
import { ref } from '@vue/reactivity';
import { computed, nextTick, onMounted, watch } from '@vue/runtime-core';
import Title from './base/Title.vue';
import { getItemFromHash, updateUrlHash } from '../helpers/hash';
export default {
   components: { Spinner, Button, Input, Title },
   setup() {
      const isLoading = ref(false);
      const userList = ref([]);
      const selectedUserId = ref(null);
      const searchUser = ref('');

      const selectUser = id => {
         selectedUserId.value = id;
         updateUrlHash('userId', selectedUserId.value);
      };

      const finalUserList = computed(() => {
         return userList.value.filter(({ name }) => name.toLowerCase().includes(searchUser.value.trim().toLowerCase()));
      });

      const load = async () => {
         isLoading.value = true;
         const data = await loadUsers();
         userList.value = data;
         const userId = getItemFromHash('userId');
         selectedUserId.value = userId || userList.value[0].id;
         updateUrlHash('userId', selectedUserId.value);
         isLoading.value = false;
      };

      return {
         isLoading,
         finalUserList,
         searchUser,
         selectedUserId,
         selectUser,
         load,
      };
   },

   created() {
      this.load();
   },
};
</script>

<style>
</style>