<template>

    <TopNavigationBar2 />
    <main>
      <Hero />

      <b-container>
        <About />
      
        
        
        
      </b-container>  
      <Services />
      <Cta />
      <Features />
      <Integrations />
      <FAQ/>
      <Testimonial />
      <section class=" ">
    <b-container>
      <div class="inner-container-small text-center mb-4 mb-sm-5">
        <h2 class="mb-0 tw-text-[#bb0606] tw-font-semibold tw-text-2xl">Our Blog</h2>
      </div>

      <b-row class="g-4 g-sm-5 g-xl-7 mt-0">
        <b-col md="6" lg="4" v-for="blog in blogs" :key="blog.id">
          <article class="h-100 tw-rounded-xl tw-bg-white tw-shadow-sm tw-transition-transform hover:tw-translate-y-[-4px]">
            <div class="tw-relative tw-pb-[60%] tw-overflow-hidden">
              <router-link 
              :to="'/blog/' + blog.slug" >
              <img 
                :src="'https://admin.cvpulsa.id/uploads/blog/' + blog.image" 
                :alt="blog.title" 
                class="tw-absolute tw-inset-0 tw-w-full tw-h-full tw-object-cover tw-rounded-t-xl" 
              />
            </router-link>
            </div>
            <div class="tw-p-4">
              <div class="tw-flex tw-items-center tw-gap-2 tw-mb-3">
                <span class="tw-text-sm tw-text-gray-600">{{ formatDate(blog.created_at) }}</span>
              </div>
              <router-link :to="'/blog/' + blog.slug"  class="tw-text-xl tw-font-semibold tw-mb-3 tw-text-gray-800">{{ blog.title }}</router-link>
              <div class="tw-flex tw-justify-between tw-items-center">
                
              </div>
            </div>
          </article>
        </b-col>
      </b-row>

    </b-container>
  </section>
      <Footer5 />
      <BottomNav/>
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
import BottomNav from '../../components/BottomNav.vue'
import { ref, onMounted, watch, computed } from 'vue';
import { on } from 'events'
interface Blog {
  id: number;
  title: string;
  slug: string;
  image: string;
  created_at: string;
}
const blogs = ref<Blog[]>([]);
const getBlogs = async () => {
  try {
    const response = await fetch('https://admin.cvpulsa.id/api/blog/all?limit=3', {
      method: 'GET',
      headers: {
        'X-Api-Key': import.meta.env.VITE_API_KEY,
      },
    });
    
    if (response.ok) {
      const data = await response.json();
      blogs.value = data.data.blog; 
      console.log(blogs.value);
    } else {
      console.error('Failed to fetch blog:', response.statusText);
    }
  } catch (error) {
    console.error('Failed to fetch blog:', error);
  }
};
const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = { 
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  };
  return new Date(date).toLocaleDateString('id-ID', options);
};

onMounted(() => {
  getBlogs();
});
  </script>