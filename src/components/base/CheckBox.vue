<template>
   <button
      @click="updateValue"
      class="transition-colors hover:text-white active:text-sky-500 outline-none flex items-center"
      :class="{ ['text-sky-500']: modelValue }"
   >
      <div class="border-2 border-slate-700 w-7 h-7 flex items-center justify-center">
         <transition name="fade">
            <svg
               v-if="modelValue"
               xmlns="http://www.w3.org/2000/svg"
               class="h-6 w-6"
               fill="none"
               viewBox="0 0 24 24"
               stroke="currentColor"
            >
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
         </transition>
      </div>
      <span class="ml-3">
         <slot></slot>
      </span>
   </button>
</template>

<script>
export default {
   props: {
      modelValue: { type: Boolean, required: true },
   },

   setup(props, { emit }) {
      const updateValue = () => {
         emit('update:modelValue', !props.modelValue);
      };

      return {
         updateValue,
      };
   },
};
</script>

<style>
</style>