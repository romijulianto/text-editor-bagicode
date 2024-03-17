<script setup lang="ts">
// Routing
const router = useRouter()
const go = () => {
  router.push('/home/start')
}

setTimeout(go, 2000)
</script>

<template>
  <div class="flex items-center justify-center mt-[50%]">
    <img src="/images/favicon.png" alt="Logo" style="width: 15rem; height: 15rem;">
  </div>
</template>
