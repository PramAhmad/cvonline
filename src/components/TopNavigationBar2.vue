<template>
  <StickyHeader className="header-absolute">
    <nav class="navbar navbar-expand-xl " >
      <b-container>
        <LogoBox class-name="me-0" />

        <AppMenu   ul-class="mx-auto" />

        <ul class="nav align-items-center dropdown-hover ms-sm-2">
          <ThemeToggleDropdown />

         

          <li class="nav-item d-none d-sm-block">
            <a :href="buyLink" target="_blank" class="btn btn-sm btn-primary mb-0">Sign in</a>
          </li>

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
import { BIconPersonCircle } from 'bootstrap-icons-vue'
import AppMenu from '@/components/topbar/AppMenu/index.vue'
import { buyLink } from '@/helpers'
</script>
