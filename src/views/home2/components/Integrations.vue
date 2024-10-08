<template>
  <section class="pt-5 pt-sm-0" style="margin-top:8rem;">
    <b-container>
      <b-row class="align-items-center">
        <b-col lg="6" class="pe-xl-5 order-2">
          <b-row class="align-items-sm-center">
            <!-- Kolom Pertama -->
            <b-col cols="6" sm="4" class="d-none d-sm-block">
              <div v-for="(integration, idx) in firstColumn" :key="idx" class="bg-light rounded-4 text-center p-4 mb-4">
                <div class="icon-xl bg-body rounded-circle mx-auto mb-2">
                  <img :src="integration.img" class="h-40px" :alt="`${integration.label}-img`" />
                </div>
                <span class="heading-color fw-bold">{{ integration.label }}</span>
              </div>
            </b-col>

            <!-- Kolom Kedua -->
            <b-col cols="6" sm="4">
              <div v-for="(integration, idx) in secondColumn" :key="idx" class="bg-light rounded-4 text-center p-4 mb-4">
                <div class="icon-xl bg-body rounded-circle mx-auto mb-2">
                  <img :src="integration.img" class="h-40px" :alt="`${integration.label}-img`" />
                </div>
                <span class="heading-color fw-bold">{{ integration.label }}</span>
              </div>
            </b-col>

            <!-- Kolom Ketiga -->
            <b-col cols="6" sm="4">
              <div v-for="(integration, idx) in thirdColumn" :key="idx" class="bg-light rounded-4 text-center p-4 mb-4">
                <div class="icon-xl bg-body rounded-circle mx-auto mb-2">
                  <img :src="integration.img" class="h-40px" :alt="`${integration.label}-img`" />
                </div>
                <span class="heading-color fw-bold">{{ integration.label }}</span>
              </div>
            </b-col>
          </b-row>
        </b-col>

        <!-- Bagian Teks -->
        <b-col lg="6" class="order-1 order-lg-2 mb-5 mb-lg-0 ps-xl-5">
          <h2 class="mb-4">Kemi memiliki banyak metode pembayaran</h2>
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
    </b-container>
  </section>
</template>

<script lang="ts" setup>
import { BIconPatchCheck } from 'bootstrap-icons-vue'

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
const firstColumn = [
  { img: bca, label: 'BCA' },
  { img: bri, label: 'BRI' },
]

const secondColumn = [
  { img: mandiri, label: 'Mandiri' },
  { img: dana, label: 'Dana' },
  { img: gopay, label: 'GoPay' },
]

const thirdColumn = [
  { img: ovo, label: 'OVO' },
  { img: shopeepay, label: 'ShopeePay' },
]
</script>
