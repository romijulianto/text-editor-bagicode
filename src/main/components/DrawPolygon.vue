<script setup lang="ts">
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import FeatureLayer from '@arcgis/core/layers/FeatureLayer'
import Editor from '@arcgis/core/widgets/Editor'
import Expand from '@arcgis/core/widgets/Expand'
import Fullscreen from '@arcgis/core/widgets/Fullscreen'
import ky from 'ky'
import type { Feature } from '../types/features'
import type { JSendResponse } from '~/common/types/base'

const mapContainer = ref<HTMLDivElement>()
const mapDiv = ref<HTMLDivElement>()

// TODO: value dari selectedFeatire
const idSelected = ref<number>(2)

const response = await ky.get(`${import.meta.env.VITE_BACKEND_ARCGIS}/services/${idSelected.value}`, {
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TOKEN_BACKEND}`,
  },
}).json<JSendResponse<Feature[]>>()

async function getFeature() {
  const myPointsFeatureLayer = new FeatureLayer({
    url: `${response.data[0].url}`,
  })

  const mapEsri = new Map({
    basemap: 'streets',
    layers: [myPointsFeatureLayer],
  })

  const view = new MapView({
    container: mapContainer.value!,
    map: mapEsri,
    center: [106.80543, 5.03],
    zoom: 13,
  })

  // TODO: add Fullscreen and Edit
  view.ui.add(
    new Fullscreen({
      view,
      element: mapDiv.value,
    }),
    'top-right',
  )

  const editor = new Editor({
    view,
  })

  const editExpand = new Expand({
    view,
    content: editor,
  })
  view.ui.add(editExpand, 'top-right')
  await myPointsFeatureLayer.load()

  // TODO: Zoom extent to feature
  const query = myPointsFeatureLayer.createQuery()
  query.where = '1=1'
  const result = await myPointsFeatureLayer.queryExtent(query)
  view.goTo(result.extent)
}

onMounted(async () => {
  await getFeature()
  mapDiv.value = document.getElementById('mapdiv') as HTMLDivElement
})
</script>

<template>
  <div id="mapdiv" ref="mapContainer" class="w-full h-full" />
</template>

<style scoped>
#mapdiv {
  height: 700px;
}

.esri-editor__prompt__header {
    color: red;
    display: flex;
    margin-bottom: cap-spacing;
    flex: 0 0 auto;
    align-items: center;
    gap: side-spacing--half;
  }
</style>
