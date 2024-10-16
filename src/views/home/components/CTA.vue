<template>
  <section>
    <b-container>
      <div class="bg-light rounded position-relative overflow-hidden p-4 p-sm-6">
        <div class="position-absolute end-0 bottom-0 me-5 md:tw-block tw-hidden">
          <img :src="ctaVectorImg" class="h-200px" alt="vector-img" />
        </div>

        <b-row class="g-4">
          <b-col lg="5">
            <h2 class="mb-4 tw-text-start tw-font-semibold tw-text-gray-800">Dimana pun Kapan pun Tukar Uang Kalian </h2>
            <p class="mb-4">
              install aplikasi kami dan nikmati kemudahan dalam melakukan transaksi
            </p>
            <b-row class="g-4 mb-4 mb-lg-0">
              <b-col cols="6" sm="4">
                <a href="https://play.google.com/store/apps/details?id=com.cv.pulsa">
                  <img :src="googlePlay" class="btn-transition" alt="google-store" />
                </a>
              </b-col>
              <b-col cols="6" sm="4">
                <a href="https://apps.apple.com/app/cvpulsa-convert-pulsa/id6720757606">
                  <img :src="appStore" class="btn-transition" alt="app-store" />
                </a>
              </b-col>
            </b-row>
          </b-col>

         
        </b-row>
      </div>
    </b-container>
  </section>
</template>

<script lang="ts" setup>
import ctaVectorImg from '@/assets/images/elements/cta-vector.svg'
import googlePlay from '@/assets/images/elements/google-play.svg'
import appStore from '@/assets/images/elements/app-store.svg'
import router from '../../../router';
</script>
