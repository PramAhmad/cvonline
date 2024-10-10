<template>
  <TopNavigationBar2 />
  <main>
    <Suspense>
      <template #default>
        <Hero />
      </template>
      <template #fallback>
        <SkeletonLoader />
      </template>
    </Suspense>

    <Suspense>
      <template #default>
        <BottomNav />
      </template>
      <template #fallback>
        <SkeletonLoader />
      </template>
    </Suspense>
  </main>
</template>

<script lang="ts" setup>
import { defineAsyncComponent } from 'vue'
import SkeletonLoader from '@/components/SkeletonLoader.vue'

const Hero = defineAsyncComponent(() => import('@/components/home/Hero.vue'))
const BottomNav = defineAsyncComponent(() => import('@/components/BottomNav.vue'))
</script>
