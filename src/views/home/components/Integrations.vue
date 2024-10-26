<template>
  <section class="pt-5 pt-sm-0 tw-pb-5" >
    <b-container>
      <b-row class="align-items-center">
     

        <!-- Bagian Teks -->
        <b-col lg="12" class="order-1 order-lg-2 mb-5 mt-lg-5 mb-lg-0 ps-xl-5">
          <h2 class="mb-4 tw-text-red-600 tw-text-2xl tw-font-semibold text-center" >Kami memiliki banyak metode pembayaran</h2>
          <p class="mb-4">
            Kami menyediakan berbagai metode pembayaran yang dapat dipilih oleh pengguna. Kami
            memastikan bahwa setiap transaksi yang dilakukan aman dan terpercaya
          </p>
          <ul class="list-group list-group-borderless mb-4">
            <li class="list-group-item heading-color d-flex mb-0 icons-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="tw-size-5 me-2 text-primary">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /> 
</svg>
 Dukungan berbagai platform pembayaran
            </li>
            <li class="list-group-item heading-color d-flex mb-0 icons-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="tw-size-5 me-2 text-primary">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /> 
</svg>Transaksi cepat dan instan
            </li>
            <li class="list-group-item heading-color d-flex mb-0 icons-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="tw-size-5 me-2 text-primary">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /> 
</svg>Keamanan terjamin dengan sistem enkripsi

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
              :slidesPerView="3"
              :spaceBetween="5"
              :breakpoints="{
                576: { slidesPerView: 3 },
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
import {BIconPatchCheckFill} from 'bootstrap-icons-vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import bca from '@/assets/images/pembayaran/pay_bca.png'
import bri from '@/assets/images/pembayaran/pay_bri.png'
import mandiri from '@/assets/images/pembayaran/pay_mandiri.png'
import dana from '@/assets/images/pembayaran/pay_dana.png'
import gopay from '@/assets/images/pembayaran/pay_gopay.png'
import ovo from '@/assets/images/pembayaran/pay_ovo.png'
import shopeepay from '@/assets/images/pembayaran/pay_shopeepay.png'
import linkaja from '@/assets/images/pembayaran/pay_linkaja.png'
import jenius from '@/assets/images/pembayaran/pay_jenius.png'


// Data yang dipilih agar layout tetap rapi
  const swiper = [bca, bri, mandiri, dana, gopay, ovo, shopeepay, linkaja, jenius]
</script>
