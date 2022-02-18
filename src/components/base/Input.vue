<template>
   <input
      class="border w-full border-slate-800 bg-transparent outline-none rounded-t-sm p-2"
      v-model="modelValue"
      @input="$emit('update:modelValue', modelValue)"
      :placeholder="placeholder"
   />
</template>

<script>
export default {
   props: {
      modelValue: { type: String, required: true },
      placeholder: { type: String },
   },

   setup({ value, placeholder }) {
      return {
         value,
         placeholder,
      };
   },
};
</script>

<style>
</style>