<template>
  <div class="container">
    <h1>Results</h1>
    <p>{{percent}}%</p>

    <p>{{score}} right</p>
    <p>{{wrong}} wrong</p>
  </div>
</template>

<script>
export default {
  name: "Results",
  props: {
    score: {
      type: Number,
      default: ""
    },
    percent: {
      type: Number,
      default: ""
    },
    wrong: {
      type: Number,
      default: ""
    }
  }
};
</script>

<style>
</style>