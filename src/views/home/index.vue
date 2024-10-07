<template>

    <TopNavigationBar2 />
    <main>
      <Hero />

      <b-container>
      
        <Client />
        
        
        
      </b-container>  
      <About />
      <Services />
      <Cta />
      <Features />
      <Integrations />
      <FAQ/>
      <Testimonial />

      <Footer5 />
    </main>
  
  </template>
  
  <script lang="ts" setup>
//   import TopNavigationBar3 from '@/components/TopNavigationBar3.vue'
  import Hero from '@/components/home/Hero.vue'
  import About from '@/views/home/components/About.vue'
  import Client from '@/views/home/components/Clients.vue'
  import Features from '@/views/home/components/Features.vue'
  import Services from '@/views/home/components/Services.vue'
  import Cta from '@/views/home/components/CTA.vue'
  import Integrations from '@/views/home/components/Integrations.vue'
  import Footer5 from '@/components/footer/Footer9.vue'
  import FAQ from '@/views/home/components/FAQ.vue'
  import Testimonial from '@/views/home/components/Testimonials.vue'

  </script>