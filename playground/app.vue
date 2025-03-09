<template>
  <div>
    <ClientOnly>
      <NuxtZoomGallery
        :gallery="gallery"
        :zoom-window-x="250"
        :width="450"
        :height="450"
      />
    </ClientOnly>
  </div>
</template>

<script setup>
const gallery = reactive([
  {
    image: 'https://cdn.narasi.tv/production/img/store/product.png',
    imageFull: 'https://cdn.narasi.tv/production/img/store/product.png',
  },
  {
    image: 'https://cdn.narasi.tv/production/img/store/collaboration-1.png',
    imageFull: 'https://cdn.narasi.tv/production/img/store/collaboration-1.png',
  },
  {
    image: 'https://cdn.narasi.tv/production/img/store/product.png',
    imageFull: 'https://cdn.narasi.tv/production/img/store/product.png',
  },

  {
    image: 'https://cdn.narasi.tv/production/img/store/collaboration-1.png',
    imageFull: 'https://cdn.narasi.tv/production/img/store/collaboration-1.png',
  },
  {
    image: 'https://cdn.narasi.tv/production/img/store/collaboration-1.png',
    imageFull: 'https://cdn.narasi.tv/production/img/store/collaboration-1.png',
  },
])
</script>
