<template>
  <div class="pb-0 ">
    <b-container>
      <b-row class="align-items-center mb-2">
        <b-col md="12" class="mb-3 mb-md-5">
          <h2 class="mb-0 tw-text-center tw-text-2xl tw-text-red-600 tw-font-bold">Kenapa Memilih Kami</h2>
          <p class="tw-text-sm  text-center tw-font-normal tw-text-gray-900">CV Pulsa adalah layanan digital yang khusus membantu mengkonversi pulsa Anda menjadi saldo dompet digital Anda. Terjamin aman sebab kami sudah terdaftar secara resmi di PSE Kominfo</p>
        </b-col>

        <b-col md="4" class="ms-auto text-md-end">
        </b-col>
      </b-row>

      <section class="pt-0 " style="padding-bottom: 3rem;">
        <div class="container">
          <div class="row g-4 g-lg-5">
            <div class="col-md-6">
              <div class="tw-rounded-2xl tw-shadow-lg border d-flex flex-row p-4 h-100"><!----><!----><!---->
                <figure class="text-primary mb-0"><img src="https://sendpulsa.com/wp-content/uploads/2024/09/A1.png" class="tw-h-13 tw-rounded-full tw-w-16" alt="" srcset=""></figure>
                <div class="d-flex flex-column ms-4">
                  <h5 class="mb-1 heading-color tw-font-semibold">Berpengalaman</h5>
                  <p class="tw-text-sm">Kami memiliki pengalaman sejak 2013</p>
                </div><!----><!---->
              </div>
            </div>
            <!-- https://sendpulsa.com/wp-content/uploads/2024/09/A2.png -->
            <div class="col-md-6">
              <div class=" tw-rounded-2xl tw-shadow-lg border d-flex flex-row p-4 h-100"><!----><!----><!---->
                <figure class="text-primary mb-0"><img src="https://sendpulsa.com/wp-content/uploads/2024/09/A2.png" class="tw-h-13 tw-rounded-full tw-w-16" alt="" srcset=""></figure>
                <div class="d-flex flex-column ms-4">
                  <h5 class="mb-1 heading-color tw-font-semibold">Proses Cepat</h5>
                  <p class="tw-text-sm">Proses cepat 5 - 10 menit , uang cair</p>
                </div><!----><!---->
              </div>
            </div>
            <!-- https://sendpulsa.com/wp-content/uploads/2024/09/A3.png -->
            <div class="col-md-6">
              <div class="  tw-rounded-2xl tw-shadow-lg border d-flex flex-row p-4 h-100"><!----><!----><!---->
                <figure class="text-primary mb-0"><img src="https://sendpulsa.com/wp-content/uploads/2024/09/A3.png" class="tw-h-13 tw-rounded-full tw-w-16" alt="" srcset=""></figure>
                <div class="d-flex flex-column ms-4">
                  <h5 class="mb-1 heading-color tw-font-semibold">Pembayaran</h5>
                  <p class="tw-text-sm">Banyak pilihan pembayaran yang tersedia</p>
                </div><!----><!---->
              </div>
            </div>
            <!-- https://sendpulsa.com/wp-content/uploads/2024/09/A4.png -->
            <div class="col-md-6">
              <div class="tw-rounded-2xl tw-shadow-lg border d-flex flex-row p-4 h-100"><!----><!----><!---->
                <figure class="text-primary mb-0"><img src="https://sendpulsa.com/wp-content/uploads/2024/09/A4.png" class="tw-h-13 tw-rounded-full tw-w-16" alt="" srcset=""></figure>
                <div class="d-flex flex-column ms-4">
                  <h5 class="mb-1 heading-color tw-font-semibold">Proses Mudah</h5>
                  <p class="tw-text-sm">Proses convert mudah untuk dilakukan</p>
                </div><!----><!---->
              </div>
            </div>
            <!-- https://sendpulsa.com/wp-content/uploads/2024/09/A5.png -->
            <div class="col-md-6">
              <div class="tw-rounded-2xl tw-shadow-lg border d-flex flex-row p-4 h-100"><!----><!----><!---->
                <figure class="text-primary mb-0"><img src="https://sendpulsa.com/wp-content/uploads/2024/09/A5.png" class="tw-h-13 tw-rounded-full tw-w-16" alt="" srcset=""></figure>
                <div class="d-flex flex-column ms-4">
                  <h5 class="mb-1 heading-color tw-font-semibold">Dijamin Aman</h5>
                  <p class="tw-text-sm">Convert pulsa di cvpulsa 100% aman</p>
                </div><!----><!---->
              </div>
            </div>
            <!-- https://sendpulsa.com/wp-content/uploads/2024/09/A6.png -->
            <div class="col-md-6">
              <div class="tw-rounded-2xl tw-shadow-lg border d-flex flex-row p-4 h-100"><!----><!----><!---->
                <figure class="text-primary mb-0"><img src="https://sendpulsa.com/wp-content/uploads/2024/09/A6.png" class="tw-h-13 tw-rounded-full tw-w-16" alt="" srcset=""></figure>
                <div class="d-flex flex-column ms-4">
                  <h5 class="mb-1 heading-color tw-font-semibold">Cuan Maksimal</h5>
                  <p class="tw-text-sm">Tukar pulsa kamu dengan rate tinggi</p>
                </div><!----><!---->
              </div>
            </div>
          </div>
        </div>
      </section>
<div class="tw-pb-7">
  <h3 class="tw-text-center tw-text-2xl tw-text-red-600 tw-font-bold">Diliput Oleh
</h3>
  <p class="tw-text-sm  text-center tw-font-normal tw-text-gray-900">Beberapa media yang telah meliput cvpulsa</p>
</div>
      <Swiper
              :modules="[Autoplay]"
              :autoplay="{
                delay: 2000
              }"
              :loop="true"
              :slidesPerView="3"
              :spaceBetween="5"
              :breakpoints="{
                576: { slidesPerView: 3},
                768: { slidesPerView: 4 }
              }"
              wrapperClass="align-items-center"
            >
              <SwiperSlide v-for="(item, idx) in swiper" :key="idx">
                <img :src="item" class="px-sm-3 ps-0 tw-h-16" alt="client-img" />
              </SwiperSlide>
            </Swiper>
    </b-container>
  </div>
</template>

<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper/modules'
import { BIconArrowUpRight } from 'bootstrap-icons-vue'
import detik from '@/assets/images/media/detik.png'
import kompas from '@/assets/images/media/kompas.png'
import liputan6 from '@/assets/images/media/liputan-6.png'
import tribun from '@/assets/images/media/tribun.png'

import suara from '@/assets/images/media/suara.png'
const swiper = [detik, kompas, liputan6, tribun, suara]
</script>
