<template>
  <StickyHeader className="header-absolute">
    <nav class="navbar navbar-expand-xl " >
      <b-container>
        <LogoBox class-name="me-0" />

        <AppMenu   ul-class="mx-auto" />

        <ul class="nav align-items-center dropdown-hover ms-sm-2">
          <li>
            <a href="https://play.google.com/store/apps/details?id=com.cv.pulsa">
            <img :src="ps" alt="" class="tw-w-5 tw-mr-3" srcset="">
            </a>
          </li>
          <li>
            <a href="https://apps.apple.com/app/cvpulsa-convert-pulsa/id6720757606">
            <img :src="appstore" class="tw-w-5" alt="">
            </a>
          </li>
          <ThemeToggleDropdown />

         

         

          <li class="nav-item">
            <MobileNavbarToggler />
          </li>
        </ul>
      </b-container>
    </nav>
  </StickyHeader>
</template>

<script lang="ts" setup>
import StickyHeader from '@/components/topbar/StickyHeader.vue'
import LogoBox from '@/components/topbar/LogoBox.vue'
import ThemeToggleDropdown from '@/components/topbar/ThemeToggleDropdown.vue'
import MobileNavbarToggler from '@/components/topbar/MobileNavbarToggler.vue'
import AppMenu from '@/components/topbar/AppMenu/index.vue'
import { useRoute } from 'vue-router'
import ps from '@/assets/images/play-store.png'
import appstore from '@/assets/images/app-store.png'

const route = useRoute();
const buyLink = 'https://example.com/buy-link';  // Example buy link

const isActive = (routeName) => {
  return route.name === routeName;
};
</script>
