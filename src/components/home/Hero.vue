<template>
  <section class="mt-16 tw-flex tw-justify-center banner-section">
    <div class="container">
      <Swiper
        class="overflow-hidden"
        :modules="[EffectFade, Autoplay, Pagination]"
        :loop="true"
        :effect="'fade'"
        :speed="1000"
        :autoplay="{
          delay: 3000,
          disableOnInteraction: false
        }"
        :pagination="{
          el: '.swiper-pagination',
          clickable: true
        }"
      >
        <SwiperSlide>
          <div class="banner-container">
            <img
              src="@/assets/images/bg/Banner1.jpg"
              alt="banner"
              class="banner-image"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div class="banner-container">
            <img
              src="@/assets/images/bg/Banner3.jpg"
              alt="banner"
              class="banner-image"
            />
          </div>
        </SwiperSlide>

        <div class="swiper-pagination swiper-pagination-line position-absolute bottom-0 mb-3"></div>
      </Swiper>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { EffectFade, Autoplay, Pagination } from 'swiper/modules';
</script>

<style scoped>

.banner-section {
  padding-left: 5rem;
  padding-right: 5rem;
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
