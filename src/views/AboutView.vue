<template>
  <div>
    <h1>About</h1>
    <p>
      This is an about page ,id is: <span class="id">{{ id }}</span>
    </p>
    <p>Count is: {{ state.count }}</p>
    <button @click="state.count++">Add 1</button>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router/composables';

const route = useRoute();
const id = computed(() => route.query.id);

const state = reactive({
  count: 0,
});
</script>

<style lang="scss" scoped>
.id {
  color: red;
}
</style>
