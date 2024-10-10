<template>
    <TopNavigationBar2 />
    <main class="tw-py-16 tw-pb-20 tw-px-1 ">
      <div v-for="item in tutorial" :key="item.title" class="tw-bg-white tw-border-2 tw-border-gray-100 tw-rounded-md tw-mb-4 tw-p-4 tw-flex tw-items-center">
        <img :src="item.image" :alt="item.title" class="tw-w-12 tw-h-12 tw-mr-4" />
        <div>
          <h2 class="tw-text-base tw-font-bold">{{ item.title }}</h2>
          <p class="tw-text-gray-500 tw-text-xs">{{ item.desc }}</p>
        </div>
      </div>
    </main>
    <BottomNav />
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
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
  
  const tutorial = ref<Tutorial[]>([
    { image: tsel, title: 'Telkomsel', desc: 'Contoh: *858*081234567xxx*20000#' },
    { image: xl, title: 'XL', desc: 'Contoh: *808*168*0812345xxx*100000#' },
    { image: axis, title: 'Axis', desc: 'Contoh: Bagi 087xxxxxxx 1000000 kirim ke 168' },
    { image: three, title: 'Three', desc: 'Contoh: *323*1*08961134xxx*20000#' },
    { image: imtri, title: 'IM3', desc: 'Contoh: Transferpulsa 0857xxxxxxx 100000 kirim ke 151' },
    { image: smartfren, title: 'Smartfren', desc: 'Contoh: KIRIM.0838xxxxxxx.100000 kirim ke 879' },
    { image: byu, title: 'Byu', desc: 'Panduan isi pulsa Byu' },
  ])
  </script>
  
  <style scoped>
  /* You can add custom styles here if needed */
  </style>
  