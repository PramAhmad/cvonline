<template>
  <section class="pt-5 pt-sm-0" >
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
