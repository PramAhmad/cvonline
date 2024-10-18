<template>
  <TopNavigationBar2 />
  <main class="tw-py-16 tw-pb-20 md:tw-py-24 tw-px-1 container">
    <div v-if="loading">
      <div
        v-for="n in skeletonCount"
        :key="n"
        class="tw-bg-white tw-border-2 tw-border-gray-100 tw-rounded-md tw-mb-4 tw-p-4 tw-flex tw-items-center"
      >
        <div class="tw-w-12 tw-h-12 tw-bg-gray-300 tw-rounded-full tw-mr-4"></div>
        <div class="tw-flex-1">
          <div class="tw-w-3/4 tw-h-4 tw-bg-gray-300 tw-rounded-md tw-mb-2"></div>
          <div class="tw-w-1/2 tw-h-3 tw-bg-gray-300 tw-rounded-md"></div>
        </div>
      </div>
    </div>

    <div v-else>
      <div
        v-for="item in tutorial"
        :key="item.title"
        class="tw-bg-white tw-border-2 tw-border-gray-100 tw-rounded-md tw-mb-4 tw-p-4 tw-flex tw-items-center"
      >
        <img :src="item.image" :alt="item.title" class="tw-w-12 tw-h-12 tw-mr-4" />
        <div>
          <h2 class="tw-text-base tw-font-bold">{{ item.title }}</h2>
          <p class="tw-text-gray-500 tw-text-xs">{{ item.desc }}</p>
        </div>
      </div>
    </div>
  </main>
  <BottomNav />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import tsel from '@/assets/images/tutorial/TSEL.png'
import axis from '@/assets/images/tutorial/axis.png'
import xl from '@/assets/images/tutorial/xl.png'
import smartfren from '@/assets/images/tutorial/smart.png'
import three from '@/assets/images/tutorial/tri.png'
import imtri from '@/assets/images/tutorial/im3.png'
import byu from '@/assets/images/tutorial/byu.png'

interface Tutorial {
  image: string
  title: string
  desc: string
}

const tutorial = ref<Tutorial[]>([])
const skeletonCount = 7 

const loading = ref(true)

onMounted(() => {
  setTimeout(() => {
    tutorial.value = [
      { image: tsel, title: 'Telkomsel', desc: 'Contoh: *858*081234567xxx*20000#' },
      { image: xl, title: 'XL', desc: 'Contoh: *808*168*0812345xxx*100000#' },
      { image: axis, title: 'Axis', desc: 'Contoh: Bagi 087xxxxxxx 1000000 kirim ke 168' },
      { image: three, title: 'Three', desc: 'Contoh: *323*1*08961134xxx*20000#' },
      { image: imtri, title: 'IM3', desc: 'Contoh: Transferpulsa 0857xxxxxxx 100000 kirim ke 151' },
      { image: smartfren, title: 'Smartfren', desc: 'Contoh: KIRIM.0838xxxxxxx.100000 kirim ke 879' },
      { image: byu, title: 'Byu', desc: 'Contoh: Masuk aplikasi byu, pilih kirim hadiah' }
    ]
    loading.value = false 
  }, 700) 
})
</script>


