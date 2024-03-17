<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <main class="px-4 py-10 text-center text-teal-700 dark:text-gray-200">
    <div>
      <p class="text-4xl">
        <carbon-warning class="inline-block" />
      </p>
    </div>
    <RouterView />
    <div>
      <button
        class="m-3 mt-8 text-sm btn"
        @click="router.back()"
      >
        {{ 'button.back' }}
      </button>
    </div>
  </main>
</template>
