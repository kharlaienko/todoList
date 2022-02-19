<template>
   <button
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
         outline-black
      "
      :class="{ ['bg-slate-900, text-sky-500']: isActive }"
   >
      <slot></slot>
   </button>
</template>
<script>
export default {
   props: {
      isActive: { default: false },
   },
};
</script>
