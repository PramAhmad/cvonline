<template>
  <section class="mt-16 tw-flex tw-bg-white tw-flex-col tw-items-center banner-section tw-mb-[6rem] dark:bg-gray-900">
    <!-- jam operasional -->
    <div class="tw-w-full tw-flex tw-justify-center tw-items-center tw-bg-red-500 tw-text-white tw-p-2 tw-rounded-lg tw-mb-4 dark:bg-red-500">
   
      <p class="tw-text-sm
        tw-font-medium tw-text-white dark:text-white">
        Jam Operasional: {{ jamop }}
      </p>
    </div>
    <!-- Rate Section -->
    <div class="rate-container tw-w-full tw-flex tw-z-10 tw-justify-between tw-items-center tw-border-2 tw-bg-white tw-border-gray-200 tw-rounded-md tw-py-2 dark:bg-gray-800 dark:border-gray-700">
      <div
        v-if="isLoading"
        v-for="index in 4"  
        :key="'loading-' + index"
        class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-center tw-w-20 tw-mx-auto"
      >
        <!-- Skeleton Loader -->
        <div class="tw-w-10 tw-h-10 tw-bg-gray-300 tw-rounded-full tw-mb-2 animate-pulse"></div>
        <div class="tw-w-20 tw-h-4 tw-bg-gray-300 tw-rounded-lg animate-pulse"></div>
      </div>
      <div
        v-else
        v-for="client in clientLogos"
        :key="client.label"
        class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-center tw-w-20 tw-mx-auto" 
      >
        <router-link :to="{ name: 'convert', params: { id: client.id } }">
          <img :src="`https://admin.cvpulsa.id/uploads/my_provider/`+client.icon" 
               :alt="client.label" 
               class="tw-w-10 tw-h-10 tw-rounded-full tw-mb-2 tw-object-cover tw-mx-auto" />
          <p class="tw-text-[0.72rem] tw-font-base tw-text-center dark:text-gray-100">
            Rate <span class="tw-font-semibold tw-text-gray-950 dark:text-white">{{ client.rate }}</span>
          </p>
        </router-link>  
      </div>
    </div>

    <!-- Banner Section -->
    <div class="tw-w-full tw-mt-6">
      <!-- Main Banner Slider -->
      <Swiper
        class="overflow-hidden"
        :modules="[EffectFade, Autoplay, Pagination]"
        :loop="true"
        :effect="'fade'"
        :speed="1000"
        :autoplay="{ delay: 3000, disableOnInteraction: false }"
        :pagination="{ el: '.swiper-pagination', clickable: true }"
      >
        <SwiperSlide v-if="isLoading" v-for="index in 3" :key="'loading-slide-' + index">
          <!-- Skeleton Loading for Banner -->
          <div class="tw-w-full tw-h-36 tw-rounded-lg tw-bg-gray-300 animate-pulse"></div>
        </SwiperSlide>
        
        <SwiperSlide v-else v-for="banner in banners" :key="banner.id">
          <div class="banner-container">
            <img :src="`https://admin.cvpulsa.id/uploads/my_banner/` + banner.image" alt="banner" class="banner-image" />
          </div>
        </SwiperSlide>
        
        <div class="swiper-pagination swiper-pagination-line position-absolute bottom-0 mb-3"></div>
      </Swiper>
    </div>

    <div class="tw-w-full tw-mt-6">
      <div class="tw-grid tw-grid-cols-2 tw-gap-4">
        <div v-if="isLoading" v-for="index in 2" :key="'loading-small-banner-' + index" class="tw-flex tw-flex-col tw-items-center tw-border-2 tw-rounded-lg tw-border-gray-100 cursor-pointer">
          <!-- Skeleton Loader for Small Banner -->
          <div class="tw-w-full tw-h-20 tw-bg-gray-300 animate-pulse tw-rounded-lg"></div>
          <h3 class="tw-w-24 tw-h-4 tw-bg-gray-300 tw-rounded-lg tw-mt-2 animate-pulse"></h3>
        </div>

        <div v-else v-for="secondBanner in secondBanners" :key="secondBanner.id" class="tw-flex tw-flex-col tw-items-center tw-border-2 tw-rounded-lg tw-border-gray-100 cursor-pointer" @click="handleSecondBannerClick(secondBanner.id)">
          <div class="banner-container">
            <img :src="secondBanner.image" alt="banner" class="banner-image" height="300px" />
          </div>
          <h3 class="text-center tw-font-semibold tw-text-base tw-mt-2 tw-text-gray-900 dark:text-gray-100">{{ secondBanner.desc }}</h3>
        </div>
      </div>

      <h3 class="tw-my-5 tw-font-semibold tw-text-gray-900 dark:text-white">Pilih Convert Pulsa</h3>
      
      <div class="max-w-full tw-px-2 tw-flex tw-justify-center">
        <div v-if="isLoading" v-for="index in 5" :key="'loading-provider-' + index" class="tw-flex tw-flex-col tw-items-center tw-border tw-border-gray-300 tw-rounded-lg tw-shadow-sm tw-w-1/5 tw-mr-1 dark:bg-gray-800 dark:border-gray-700">
          <div class="tw-w-20 tw-h-10  animate-pulse tw-mt-4"></div>
          <div class="tw-w-full tw-bg-gray-300 tw-h-6 tw-rounded-b-lg animate-pulse tw-mt-2"></div>
        </div>

        <div v-else v-for="(item, index) in clientLogos" :key="index" class="tw-flex tw-flex-col tw-items-center tw-border tw-border-gray-300 tw-rounded-lg tw-shadow-sm tw-w-1/5 tw-mr-1 dark:bg-gray-800 dark:border-gray-700" @click="redirectToConvert(item.id)">
          <div class="tw-w-20 tw-h-14 tw-p-2">
            <img :src="item.status === `1` ? item.image : item.nonaktif_image" alt="logo" class="tw-w-full tw-h-full tw-object-contain" />
          </div>
          <div class="tw-w-full tw-rounded-b-lg" :class="item.color">
            <p class="tw-font-normal tw-text-center tw-text-[0.6rem] tw-text-white py-2">{{ item.name }}</p>
          </div>
        </div>
      </div>

      <!-- Calculator Section -->
      <div class="tw-w-full tw-rounded-lg tw-p-3 tw-mt-8 tw-border-2 tw-border-gray-200 dark:border-gray-700" @click="calculatorPage">
        <div class="tw-flex tw-items-center tw-justify-between">
          <div class="tw-flex tw-items-center">
            <img :src="cal" alt="Calculator" class="tw-w-6 tw-h-6 tw-mr-2" />
            <h3 class="tw-text-lg tw-font-semibold tw-text-gray-900 dark:text-white">Kalkulator convert pulsa</h3>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" class="tw-w-6 tw-h-6 tw-text-gray-900 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Modal Section for Provider Selection -->
    <div v-if="showModal"  @click.self="showModal = false" class="tw-fixed tw-inset-0 tw-z-50 tw-bg-black tw-bg-opacity-50 tw-flex tw-items-center tw-justify-center">
      <div class="tw-bg-white dark:bg-gray-800 tw-p-4 tw-rounded-lg tw-w-80">
        <h3 class="tw-text-lg tw-font-semibold tw-mb-4 dark:text-white">Pilih Provider</h3>
        <ul class="tw-space-y-2">
          <li v-if="isLoading" v-for="index in 5" :key="'loading-provider-modal-' + index" class="tw-flex tw-justify-between tw-items-center tw-py-2 tw-border-b dark:text-white">
            <!-- Skeleton Loader for Modal Provider -->
            <div class="tw-w-8 tw-h-8 tw-bg-gray-300 tw-rounded-full"></div>
            <div class="tw-w-1/2 tw-h-4 tw-bg-gray-300 tw-rounded-lg animate-pulse"></div>
            <div class="tw-w-1/4 tw-h-4 tw-bg-gray-300 tw-rounded-lg animate-pulse"></div>
          </li>

          <li v-else v-for="provider in clientLogos" :key="provider.id" class="tw-flex tw-justify-between tw-items-center tw-py-2 tw-border-b dark:text-white">
            <div>
              <img :src="`https://admin.cvpulsa.id/uploads/my_provider/`+provider.icon" alt="provider-logo" class="tw-w-8 tw-h-8 tw-rounded-full" />
            </div>
            <p class="tw-text-gray-900"> {{ provider.name }}</p>
            <button @click="selectProvider(provider)" class="tw-text-white tw-bg-red-600 tw-py-1 tw-px-2 tw-rounded-lg">Select</button>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>


<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { EffectFade, Autoplay, Pagination } from 'swiper/modules';
import { onMounted, provide, ref } from 'vue';
import { useRouter } from 'vue-router';
import Skeleton from 'vue-loading-skeleton'; // Import Skeleton component

  // Loading state

import Banner1 from '@/assets/images/banner1.jpg';
import Banner2 from '@/assets/images/banner2.jpg';
import client1 from '@/assets/images/client/a.png';
import client2 from '@/assets/images/client/b.png';
import client3 from '@/assets/images/client/c.png';
import client5 from '@/assets/images/client/e.png';
import client7 from '@/assets/images/client/g.png';
import indosat from '@/assets/images/client/icon_indosat.png';
import telkomsel from '@/assets/images/client/icon_telkomsel_byu.png';
import xl from '@/assets/images/client/icon_xl_axis.png';
import smartfren from '@/assets/images/client/icon_smartfreen.png';
import three from '@/assets/images/client/iconthree.png';
import cal from '@/assets/images/calculator.png';
import nonaktifindosat from '@/assets/images/client/icon_indosat_nonaktif.png';
import nonaktiftelkomsel from '@/assets/images/client/icon_telkomsel_nonaktif.png';
import nonaktifxl from '@/assets/images/client/icon_xl_axis_nonaktif.png';
import nonaktifsmartfren from '@/assets/images/client/icon_smartfren_nonaktif.png';
import nonaktifthree from '@/assets/images/client/iconthree_nonaktif.png';

const router = useRouter();
const jamop = ref('');
const isLoading = ref(true);
interface Banner {
  id: number; 
  image: string;
  desc ?: string;
}

interface clientLogos {
  id: number;
  icon: string;
  rate: number;
  label: string;
  name: string;
  status: string;
}
const clientLogos = ref<clientLogos[]>([]);

const images = ref<any>([
  {image: telkomsel,nonaktif_image:nonaktiftelkomsel,color:'tw-bg-red-500'},
  {image: xl,nonaktif_image:nonaktifxl,color:'tw-bg-blue-500'},
  {image: indosat,nonaktif_image:nonaktifindosat,color:'tw-bg-yellow-500'},
  {image: smartfren,nonaktif_image:nonaktifsmartfren,color:'tw-bg-pink-500'},
  {image: three,nonaktif_image:nonaktifthree,color:'tw-bg-purple-500'},
])
const secondBanners = ref<Banner[]>([
  { id: 1, image: Banner1 , desc:'Panduan Aplikasi' },
  { id: 2, image: Banner2 , desc:'Fitur Transfer'},
]);

const banners = ref<Banner[]>([]);
const showModal = ref(false);



const GetBanner = async () => {
  const config = {
    headers: {
      'X-Api-Key': '6B327B94169776D1096031DC73EF9F81', 
    },
  };

  try {
    const response = await fetch('https://admin.cvpulsa.id/api/my_banner/all', {
      method: 'GET',
      headers: config.headers,
    });

    if (response.ok) {
      const data = await response.json(); 
      banners.value = data.data.my_banner;
      console.log("Banners:", banners.value);
    } else {
      console.log("Unexpected response:", response);
    }
  } catch (error) {
    console.error("Failed to fetch banners:", error);
  }
};


const getProvider = async () => {
  const config = {
    headers: {
      'X-Api-Key': '6B327B94169776D1096031DC73EF9F81',
    },
  };

  try {
    const response = await fetch('https://admin.cvpulsa.id/api/my_provider/all?sort_order=asc', {
      method: 'GET',
      headers: config.headers,
    });

    if (response.ok) {
      const data = await response.json();

      clientLogos.value = data.data.my_provider.map((provider, index) => {
        const imageData = images.value[index]; 
        return {
          ...provider,
            image: imageData?.image || '',
            nonaktif_image: imageData?.nonaktif_image || '', 
            color: imageData?.color || '',
          icon: provider.icon, 
        };
      });
      
      console.log(clientLogos.value);
    } else {
      console.log("Unexpected response:", response);
    }
  } catch (error) {
    console.error("Failed to fetch provider:", error);
  }
};

const getSetting = async () => {
  const config = {
    headers: {
      'X-Api-Key': '6B327B94169776D1096031DC73EF9F81',
    },
  };
  const res = await fetch('https://admin.cvpulsa.id/api/my_settings/all', {
    method: 'GET',
    headers: config.headers,
  });
  const data = await res.json();
  jamop.value = data.data.my_settings[2].value;  
  console.log(jamop.value);
};

const handleSecondBannerClick = (id: number) => {
  if (id === 1) {
    router.push({ name: 'panduan' });
  } else if (id === 2) {
    showModal.value = true;
  }
};

const closeModal = () => {
  showModal.value = false;
};

  const redirectToConvert = (providerId: number) => {
  closeModal();
  router.push({ name: 'convert', params: { id: providerId } });
};
const calculatorPage = () => {
  router.push({ name: 'calculator' });
};

const selectProvider = (provider: clientLogos) => {
  redirectToConvert(provider.id);
};

onMounted(() => {
  GetBanner();
  getSetting()
  getProvider();
  // wait 2 second
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
 

});
</script>
<style scoped>
.banner-section {
  padding-left: 5rem;
  padding-right: 5rem;
}

.rate-section {
  background-color: white;
}
.banner-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 15px; /* Tambahkan border-radius untuk membuat gambar rounded */
}

@media (max-width: 767px) {
  .banner-image {
    border-radius: 10px; /* Misalnya, nilai yang lebih kecil untuk mobile */
  }
}


@media (max-width: 767px) {
  .banner-section {
    padding-left: 1rem;
    padding-right: 1rem;
    padding-bottom: 0;
  }
}

.banner-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.banner-image {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.swiper-pagination {
  display: flex;
  justify-content: center;
}

@media (max-width: 767px) {
  .swiper-pagination {
    bottom: 10px;
  }
}
</style>
