<template>
  <router-link class="navbar-brand" :class="className" :to="{ name: 'home' }">
    <div class="d-flex" style="align-items: center; justify-content: center; ">
      <img
      v-if="!onlyLight && !smallLogo"
      class="light-mode-item navbar-brand-item"
      :class="imageClass"
      :src="logo"
      alt="logo"
    />
    </div>
    <img
      v-if="!smallLogo"
      class="dark-mode-item navbar-brand-item"
      :src="logo"
      :class="imageClass"
      alt="logo"
    />
    <img v-if="smallLogo" :src="logoIcon" class="h-50px mb-4" alt="logo" />
  </router-link>
</template>

<script lang="ts" setup>
import logoLight from '@/assets/images/logo_bulat.png'
import logo from '@/assets/images/logo_web.png'
import logoIcon from '@/assets/images/logo-icon.svg'

defineProps<{
  className?: string
  onlyLight?: boolean
  smallLogo?: boolean
  imageClass?: string
}>()
</script>
