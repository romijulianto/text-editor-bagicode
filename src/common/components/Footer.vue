<script setup lang="ts">
import { isDark, toggleDark } from '~/common/composables'
</script>

<template>
  <nav class="mt-6 text-xl">
    <button class="icon-btn mx-2 !outline-none" @click="toggleDark()">
      <carbon-moon v-if="isDark" />
      <carbon-sun v-else />
    </button>
  </nav>
</template>
