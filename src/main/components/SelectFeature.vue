<script setup lang="ts">
import ky from 'ky'
import type { Feature } from '../types/features'
import type { JSendResponse } from '~/common/types/base'

const selectedFeature = ref<string>()
const featureOptions = ref()

async function getFeatures() {
  const response = await ky.get(`${import.meta.env.VITE_BACKEND_ARCGIS}/services`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TOKEN_BACKEND}`,
    },
  }).json<JSendResponse<Feature[]>>()

  featureOptions.value = response.data.map((service) => {
    return {
      label: service.title,
      value: service.id,
    }
  })
}

onMounted(async () => {
  await getFeatures()
})
</script>

<template>
  <n-card>
    <n-select
      v-model:value="selectedFeature"
      size="medium"
      placeholder="Pilih feature service"
      filterable
      clearable
      :options="featureOptions"
    />
  </n-card>
</template>
