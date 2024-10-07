<template>
    <hr class="border-primary opacity-2 mt-sm-7 " />
      <b-row>
        <b-col md="6" xl="7" class="mb-5 mb-md-0">
          <p class="mb-0">
            <BIconShieldCheck class="mb-1" />
            | Lakukan CV pulsa dengan mudah dan cepat di
            <b class="text-primary fs-6">CV Pulsa</b>
          </p>

          <Swiper
            class="mt-2 mt-md-4"
            :modules="[Autoplay]"
            :loop="true"
            :slidesPerView="4"
            :spaceBetween="30"
            :autoplay="{
              delay: 2000,
              disableOnInteraction: false
            }"
            :breakpoints="{
              576: { slidesPerView: 4 },
              768: { slidesPerView: 4 },
              992: { slidesPerView: 3 },
              1200: { slidesPerView: 4 }
            }"
            wrapperClass="align-items-center"
          >
            <SwiperSlide v-for="(image, idx) in clientLogos" :key="idx">
              <img :src="image" class="px-3" :class="!idx && 'ps-0'" alt="client-img" />
            </SwiperSlide>
          </Swiper>
        </b-col>

        <b-col md="6" lg="5" xl="3" class="ms-auto text-md-end">
          <p class="mb-0 me-2">Di percaya oleh <span class="badge bg-dark">Active</span></p>

          <div class="d-flex justify-content-md-end mt-2 mt-md-4">
            <div>
              <div class="d-flex justify-content-md-end">
                <h4 class="purecounter mb-0">
                = 200
                </h4>
              </div>
              <p class="mb-0">Active users</p>
            </div>

            <div class="vr mx-3 mx-sm-4"></div>
            <div>
              <div class="d-flex justify-content-md-end">
                <h4 class="purecounter mb-0">
                = 1.5k
                </h4>
                <span class="h4 mb-0">+</span>
              </div>
              <p class="mb-0">Completed transaksi</p>
            </div>
          </div>
        </b-col>
      </b-row>  
</template>

<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import {
  BIconFire,
  BIconLifePreserver,
  BIconShieldCheck,
  BIconStopwatch
} from 'bootstrap-icons-vue'

import client1 from '@/assets/images/client/a.png'
import client2 from '@/assets/images/client/b.png'
import client3 from '@/assets/images/client/c.png'
import client4 from '@/assets/images/client/d.png'
import client5 from '@/assets/images/client/e.png'
import client6 from '@/assets/images/client/f.png'
import client7 from '@/assets/images/client/g.png'
import client8 from '@/assets/images/client/h.png'
import client9 from '@/assets/images/client/i.png'

const clientLogos = [client1, client2, client3, client4, client5, client6,client7, client8, client9]
</script>

<style scoped>

.client-image {
  max-width: 100px; 
  width: 100%;
}

@media (max-width: 576px) {
  .client-image {
    max-width: 60px; 
  }
}
</style>
