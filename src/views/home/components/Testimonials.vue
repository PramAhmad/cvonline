<template>
  <section class="pb-0">
    <b-container>
      <div class="inner-container-small text-center mb-4 mb-sm-5">
        <h2 class="mb-0 tw-text-red-600 tw-font-semibold tw-text-2xl">Apa Yang Mereka Katakan</h2>
      </div>

      <!-- Swiper container -->
      <swiper
        class="testimonial-slider"
        :modules="[Autoplay]"
              :autoplay="{
                delay: 2000
              }"
              :loop="true"
              :slidesPerView="3"
              :spaceBetween="5"
              :breakpoints="{
                576: { slidesPerView: 1 },
                768: { slidesPerView: 3 }
              }"
      >
        <!-- Testimonial slides -->
        <swiper-slide v-for="(testimonial, idx) in testimonials" :key="idx">
          <TestimonialCard :testimonial="testimonial" />
        </swiper-slide>
      </swiper>
    </b-container>
  </section>
</template>

<script lang="ts" setup>
import { testimonials } from '@/views/home/testimoni.ts'
import { onMounted } from 'vue'
import TestimonialCard from '@/views/home/components/TestimonialCard.vue'

// Import Swiper components
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
</script>
