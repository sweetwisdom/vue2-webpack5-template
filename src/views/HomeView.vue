<template>
  <div class="home">
    <h2 class="title">{{ msg }}</h2>
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts" setup>
import Vue from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
const msg = "Welcome to Your Vue.js + TypeScript App";
</script>
<style lang="scss">
.home {
  .title {
    color: #41b883;
    text-align: center;
  }
}
</style>
