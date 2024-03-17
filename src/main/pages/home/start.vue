<script setup lang="ts">
import { ref } from 'vue'
import type { StepsProps } from 'naive-ui'
import { MdArrowRoundBack, MdArrowRoundForward } from '@vicons/ionicons4'

const current = ref<number | undefined>(1)
const currentStatus = ref<StepsProps['status']>('process')

const next = () => {
  if (current.value === undefined)
    current.value = 1
  else if (current.value >= 4)
    current.value = undefined
  else current.value++
}

const prev = () => {
  if (current.value === 0)
    current.value = undefined
  else if (current.value === undefined)
    current.value = 4
  else current.value--
}

// Watch selectedFeature for changes
watch(current, (newCurrent) => {
})
</script>

<template>
  <n-card>
    <div>Selamat datang, Romi!</div>
    <div>Permudah survei dengan Apps 123</div>
  </n-card>
  <div class="flex items-center justify-center h-full">
    <n-scrollbar>
      <n-card>
        <n-space vertical>
          <n-steps vertical :current="current" :status="currentStatus">
            <n-step
              title="Pilih Feature Service"
              description="Pilih feature service yang akan diubah"
            >
              <div v-if="current === 1">
                <SelectFeature />
              </div>
            </n-step>
            <n-step
              title="Tetapkan Area of Interest"
              description="Tetapkan area of interest hasil survei"
            >
              <div v-if="current === 2">
                <DrawPolygon />
              </div>
            </n-step>
            <n-step
              title="Isi Atribute Tabel"
              description="Lengkapi attribute tabel pendukung data"
            >
              <div v-if="current === 3">
                <DrawPolygon />
              </div>
            </n-step>
            <n-step
              title="Simpan dan Lihat"
              description="Simpan dan lihat hasilnya pada peta"
            />
          </n-steps>
          <n-space>
            <n-button-group>
              <n-button @click="prev">
                <template #icon>
                  <n-icon>
                    <MdArrowRoundBack />
                  </n-icon>
                </template>
              </n-button>
              <n-button type="primary" @click="next">
                <template #icon>
                  <n-icon>
                    <MdArrowRoundForward />
                  </n-icon>
                </template>
              </n-button>
            </n-button-group>
            <div v-if="current === 4">
              <n-button type="primary">
                Lihat Peta
              </n-button>
            </div>
          </n-space>
        </n-space>
      </n-card>
    </n-scrollbar>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
