<template>
  <div
    class="nuxt-zoom-image"
    :style="mobileCheck() ? `width: 100vw` : `width: ${props.width}px;`"
  >
    <div
      ref="thumbnail"
      class="hero-area"
      :class="props.heroStyle"
      :style="thumbnailStyle"
      @mouseenter="mouseEnter"
      @mouseleave="mouseLeave"
      @mousemove.self="followMouse"
    >
      <div
        v-if="data.visibleZoom"
        :style="pointerBoxStyle"
        @mouseenter="mouseEnter"
        @mousemove.self="followMouse"
      />
    </div>
    <div
      v-if="data.visibleZoom && !mobileCheck()"
      :style="containerStyle"
      class="zoom-image-wrapper"
    >
      <div :style="zoomStyle" />
    </div>
    <div
      v-if="mobileCheck() && data.modalMobile"
      class="mobile-container"
    >
      <div
        class="mobile-modal-close"
        @click="closeMobileModal"
      >
        &#x2715;
      </div>
      <Carousel
        v-if="props.gallery.length > 1"
        v-bind="{ itemsToShow: 1, wrapAround: true, gap: 16, modelValue: data.activeIndex }"
        :class="props.thumbnailStyle"
      >
        <Slide
          v-for="(thumbnail, index) in props.gallery"
          :key="`thumbnail-${index}`"
          @click="loadThumbnail(index)"
        >
          <img
            :src="thumbnail.image"
            class="mobile-thumbnail"
            alt="thumbnail"
          >
        </Slide>
        <template #addons>
          <Pagination />
        </template>
      </Carousel>
    </div>
    <Carousel
      v-if="props.gallery.length > 1"
      v-bind="{ itemsToShow: 4, wrapAround: true, gap: 16 }"
      :class="props.thumbnailStyle"
    >
      <Slide
        v-for="(thumbnail, index) in props.gallery"
        :key="`thumbnail-carousel-${index}`"
        @click="loadThumbnail(index)"
      >
        <img
          :src="thumbnail.image"
          class="thumbnail"
          alt="thumbnail"
        >
      </Slide>
      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </div>
</template>

<script setup>
import { defineProps, reactive, computed, useTemplateRef } from 'vue'
import { Carousel, Slide, Navigation, Pagination } from 'vue3-carousel'
import 'vue3-carousel/carousel.css'

const DEFAULT_BACKGROUND_OPTIONS = {
  image: 'none',
  color: '#fff',
  repeat: false,
  size: '100%',
  position: 'top left',
}

const thumbnailRef = useTemplateRef('thumbnail')

const props = defineProps({
  thumbnailStyle: {
    type: String,
    default: '',
  },
  heroStyle: {
    type: String,
    default: null,
  },
  gallery: {
    type: Array,
    default() {
      return []
    },
  },
  width: {
    type: Number,
    default: 200,
  },
  height: {
    type: Number,
    default: 200,
  },
  zoomLevel: {
    type: Number,
    default: 4,
  },
  zoomWindowSize: {
    type: Number,
    default: 2,
  },
  zoomWindowX: {
    type: Number,
    default: 300,
  },
  zoomWindowY: {
    type: Number,
    default: 10,
  },
  backgroundOptions: {
    type: Object,
    default: null,
  },
})

const data = reactive({
  modalMobile: false,
  activeIndex: 0,
  visibleZoom: false,
  pointer: {
    x: 0,
    y: 0,
  },
  thumbnailPos: {},
})

const loadThumbnail = (index) => {
  data.activeIndex = index
}

const toPx = (v) => {
  return v + 'px'
}

const mouseEnter = () => {
  if (!mobileCheck()) {
    data.visibleZoom = true
    updateThumbnailPos()
  }
  else {
    data.modalMobile = true
  }
}

const closeMobileModal = () => {
  data.modalMobile = false
}

const mouseLeave = () => {
  data.visibleZoom = false
}

const followMouse = (e) => {
  data.pointer = {
    x: e.pageX - thumbnailRef.value.getBoundingClientRect().left - window.scrollX,
    y: e.pageY - thumbnailRef.value.getBoundingClientRect().top - window.scrollY,
  }
}

const updateThumbnailPos = () => {
  const el = thumbnailRef.value
  data.thumbnailPos = {
    top: el.offsetTop,
    left: el.offsetLeft,
  }
}

const mobileCheck = () => {
  /* eslint-disable */
  let check = false;
  ((a) => { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-([mpt])|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c([\- _agpst])|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac([ \-/])|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/([klu])|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t([\- ov])|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[23]|n30(0|2)|n50([025])|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan([adt])|pdxg|pg(13|-([1-8c]))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c([\-01])|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(a.substr(0, 4))) check = true })(navigator.userAgent || navigator.vendor || window.opera)
  return check
}

const zoomWidth = computed(() => {
  return props.zoomWindowSize * 150
})

const zoomHeight = computed(() => {
  return props.zoomWindowSize * 150
})

const mainImgStyle = computed(() => {
  return {
    contain: props.backgroundOptions ? 'contain' : 'cover',
    repeat: 'no-repeat',
    position: '50% 50%',
  }
})

const customBackgroundOptions = computed(() => {
  return props.backgroundOptions ? props.backgroundOptions : DEFAULT_BACKGROUND_OPTIONS
})

const customBackgroundStyle = computed(() => {
  return {
    image: customBackgroundOptions.value.image || DEFAULT_BACKGROUND_OPTIONS.image,
    repeat: customBackgroundOptions.value.repeat ? 'repeat' : 'no-repeat',
    color: customBackgroundOptions.value.color || DEFAULT_BACKGROUND_OPTIONS.color,
    size: customBackgroundOptions.value.size || DEFAULT_BACKGROUND_OPTIONS.size,
    position: customBackgroundOptions.value.position || DEFAULT_BACKGROUND_OPTIONS.position,
  }
})

const thumbnailStyle = computed(() => {
  return {
    'background-image': `url("${props.gallery[data.activeIndex].image}"), url("${customBackgroundStyle.value.image}")`,
    'background-size': `${mainImgStyle.value.contain}, ${customBackgroundStyle.value.size}`,
    'background-repeat': `${mainImgStyle.value.repeat}, ${customBackgroundStyle.value.repeat}`,
    'background-position': `${mainImgStyle.value.position}, ${customBackgroundStyle.value.position}`,
    'background-color': customBackgroundStyle.value.color,
    'height': mobileCheck() ? '375px' : toPx(props.height),
    'min-width': mobileCheck() ? '100vw' : '100%',
    'width': mobileCheck() ? '100vw' : toPx(props.width),
  }
})

const containerStyle = computed(() => {
  return {
    height: toPx(zoomHeight.value),
    width: toPx(zoomWidth.value),
    left: toPx(props.zoomWindowX),
    top: toPx(props.zoomWindowY),
    position: 'absolute',
    overflow: 'hidden',
    border: '1px solid #E7E7E7',
  }
})

const zoomPosX = computed(() => {
  const xPad = props.width / 2
  const posX = -(data.pointer.x - data.thumbnailPos.left - xPad) * props.zoomWindowSize
  if (posX > data.pointerEdgeX) return data.pointerEdgeX
  if (posX < (data.pointerEdgeX * -1)) return (data.pointerEdgeX * -1)
  return posX
})

const zoomPosY = computed(() => {
  const yPad = (props.height / 2)
  const posY = -(data.pointer.y - data.thumbnailPos.top - yPad) * props.zoomWindowSize
  if (posY > data.pointerEdgeY) return data.pointerEdgeY
  if (posY < (data.pointerEdgeY * -1)) return (data.pointerEdgeY * -1)
  return posY
})

const zoomStyle = computed(() => {
  return {
    'background-image': `url("${largeImage.value}"), url("${customBackgroundStyle.value.image}")`,
    'background-size': `${mainImgStyle.value.contain}, ${customBackgroundStyle.value.size}`,
    'background-repeat': `${mainImgStyle.value.repeat}, ${customBackgroundStyle.value.repeat}`,
    'background-position': `${mainImgStyle.value.position}, ${customBackgroundStyle.value.position}`,
    'background-color': customBackgroundStyle.value.color,
    'width': '100%',
    'height': '100%',
    '-webkit-transform': `scale(${props.zoomLevel})`,
    'transform': `
      scale(${props.zoomLevel})
      translate(${toPx(zoomPosX.value)}, ${toPx(zoomPosY.value)})
    `,
  }
})

const pointerWidth = computed(() => {
  return props.width / props.zoomLevel
})

const pointerHeight = computed(() => {
  return props.height / props.zoomLevel
})

const pointerOffsetTop = computed(() => {
  const top = data.pointer.y - (pointerHeight.value / 2) - data.thumbnailPos.top
  if (top < 0) return 0
  if (top > (props.height - pointerHeight.value)) return (props.height - pointerHeight.value)
  return top
})

const pointerOffsetLeft = computed(() => {
  const left = data.pointer.x - (pointerWidth.value / 2) - data.thumbnailPos.left
  if (left < 0) return 0
  if (left > (props.width - pointerWidth.value)) return (props.width - pointerWidth.value)
  return left
})

const pointerBoxStyle = computed(() => {
  if (mobileCheck()) {
    return {
      display: 'none',
    }
  }
  else {
    return {
      'position': 'absolute',
      'z-index': '2',
      'transform': 'translateZ(0px)',
      'top': toPx(pointerOffsetTop.value),
      'left': toPx(pointerOffsetLeft.value),
      'width': toPx(pointerWidth.value),
      'height': toPx(pointerHeight.value),
      'background': 'gray',
      'opacity': 0.5,
      'border': '1px solid white',
      'cursor': 'crosshair',
    }
  }
})

const largeImage = computed(() => {
  return props.gallery[data.activeIndex].imageFull || props.gallery[data.activeIndex].image
})
</script>

<style scoped>
  .mobile-container {
    position: absolute;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    right: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: #FFFFFF;
    z-index: 999;
  }
  .mobile-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .nuxt-zoom-image {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 16px;
  }
  .hero-area {
    overflow: hidden;
    position: relative;
    border: 1px solid #E7E7E7;
    width: fit-content;
    overflow: hidden;

  }
  .zoom-image-wrapper {
    /* -webkit-box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.3);
    -moz-box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.3);
    box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.3); */
    z-index: 999;
  }
  .thumbnail {
    width: 100%;
    height: 100%;
    cursor: pointer;
    border: 1px solid #E7E7E7;
    object-fit: cover;
  }
  .mobile-thumbnail {
    width: 100%;
    height: 375px;
    cursor: pointer;
    object-fit: cover;
  }
  .mobile-modal-close {
    width: 26px;
    height: 26px;
    background-color: #1A1A1ACC;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 16px;
    right: 16px;
    font-size: 24px;
    color: white;
    font-size: 14px;
    cursor: pointer;
  }
  .mobile-container .carousel__pagination {
    bottom: -32px;
  }
  :deep(.mobile-container .carousel__pagination-item .carousel__pagination-button) {
    width: 8px;
    height: 8px;
    border-radius: 32px;
    background-color: #DFDFDF;
  }
  :deep(.mobile-container .carousel__pagination-item .carousel__pagination-button--active) {
    width: 48px;
    height: 8px;
    border-radius: 32px;
    background-color: #616161;
  }
</style>
