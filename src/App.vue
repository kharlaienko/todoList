<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import TodoList from './components/TodoList.vue';
</script>

<template>
   <TodoList />
</template>

<style>
* {
   box-sizing: border-box;
}
html,
body {
   height: 100%;
   width: 100%;
}

#app {
   font-family: Avenir, Helvetica, Arial, sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   height: 100%;
   width: 100%;
}
</style>
