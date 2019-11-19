<template>
  <div id="home">
    <h1>Home</h1>
    <router-link :to="{ name: 'CardsBottom'}">Start</router-link>
  </div>
</template>

<script>
export default {
  name: "home"
  // data() {
  //   return { msg: "Welcome to Your Vue.js App" };
  // }
};
</script>

<style>
</style>