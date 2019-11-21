<template>
  <div>
    <h1>Results</h1>
    <h3>{{percent}}%</h3>

    <h5>{{score}} right</h5>
    <h5>{{wrong}} wrong</h5>
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