<template>
   <button
      @click="updateChecked"
      class="transition-colors hover:text-white active:text-sky-500"
      :class="{ ['text-sky-500']: isChecked }"
   >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
         />
      </svg>
   </button>
</template>

<script>
export default {
   props: {
      isChecked: { type: Boolean, required: true },
   },

   setup(props, { emit }) {
      const updateChecked = () => {
         emit('update:isChecked', !props.isChecked);
      };

      return {
         updateChecked,
      };
   },
};
</script>

<style>
</style>