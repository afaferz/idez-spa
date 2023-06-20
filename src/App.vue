<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import CountyBrazilComponent from './components/CountyBrazilComponent.vue'
</script>

<template>
  <v-app class="app">
    <v-container>
      <RouterView />
    </v-container>
  </v-app>
</template>

<style scoped>
.app {
  background-color: #E1F5FE;
  overflow-y: hidden;
}
</style>
