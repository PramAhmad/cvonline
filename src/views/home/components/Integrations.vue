<template>
  <section class="pt-5 pt-sm-0" style="margin-top:8rem;">
    <b-container>
      <b-row class="align-items-center">
     

        <!-- Bagian Teks -->
        <b-col lg="6" class="order-1 order-lg-2 mb-5 mb-lg-0 ps-xl-5">
          <h2 class="mb-4 tw-text-red-600 tw-text-2xl tw-font-semibold text-center" >Kemi memiliki banyak metode pembayaran</h2>
          <p class="mb-4">
            Kami menyediakan berbagai metode pembayaran yang dapat dipilih oleh pengguna. Kami
            memastikan bahwa setiap transaksi yang dilakukan aman dan terpercaya
          </p>
          <ul class="list-group list-group-borderless mb-4">
            <li class="list-group-item heading-color d-flex mb-0 icons-center">
              <BIconPatchCheck class="text-primary me-2" />Dukungan berbagai platform pembayaran
            </li>
            <li class="list-group-item heading-color d-flex mb-0 icons-center">
              <BIconPatchCheck class="text-primary me-2" />Transaksi cepat dan instan
            </li>
            <li class="list-group-item heading-color d-flex mb-0 icons-center">
              <BIconPatchCheck class="text-primary me-2" />Keamanan terjamin dengan sistem enkripsi

            </li>
          </ul>
        </b-col>
        
      </b-row>
      <Swiper
              :modules="[Autoplay]"
              :autoplay="{
                delay: 2000
              }"
              :loop="true"
              :slidesPerView="4"
              :spaceBetween="30"
              :breakpoints="{
                576: { slidesPerView: 4 },
                768: { slidesPerView: 4 }
              }"
              wrapperClass="align-items-center"
            >
              <SwiperSlide v-for="(item, idx) in swiper" :key="idx">
                <img :src="item" class="px-sm-3 ps-0 tw-h-16" alt="client-img" />
              </SwiperSlide>
            </Swiper>
    </b-container>
  </section>
</template>

<script lang="ts" setup>
import { BIconPatchCheck } from 'bootstrap-icons-vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import bca from '@/assets/images/pembayaran/Bca.png'
import bri from '@/assets/images/pembayaran/Bri.png'
import mandiri from '@/assets/images/pembayaran/Mandiri.png'
import dana from '@/assets/images/pembayaran/Dana.png'
import gopay from '@/assets/images/pembayaran/Gopay.png'
import ovo from '@/assets/images/pembayaran/Ovo.png'
import shopeepay from '@/assets/images/pembayaran/Shopeepay.png'
import linkaja from '@/assets/images/pembayaran/Linkaja.png'
import jenius from '@/assets/images/pembayaran/jenius.png'

// Data yang dipilih agar layout tetap rapi
  const swiper = [bca, bri, mandiri, dana, gopay, ovo, shopeepay, linkaja, jenius]
</script>
