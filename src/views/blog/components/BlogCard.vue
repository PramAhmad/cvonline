<template>
  <template v-for="blog in blog" :key="blog.id">
    
      
    
    <article class="card bg-transparent h-100 p-0" >
  
      <img :src="'https://admin.cvpulsa.id/uploads/blog/'+blog.image" class="card-img" alt="Blog-img" />
  
      <b-card-body class="px-2 pb-4">
        <b-card-title tag="h6" class="mb-2">
          <router-link to="">{{ blog.created_at }}</router-link>
        </b-card-title>
        <p class="small mb-0">{{ blog.slug }}</p>
      </b-card-body>
  
      <div class="card-footer bg-transparent d-flex justify-content-between px-2 py-0">
        <span class="heading-color fw-semibold mb-0"
          >{{blog.title}}</span
        >
        <router-link
          class="icon-link icon-link-hover stretched-link"
          v-if="blog.route"
          :to="'blog/'+blog.slug"
          >Read more
          <BIconArrowRight class="bi" />
        </router-link>
      </div>
    </article>
  </template>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { BIconArrowRight } from 'bootstrap-icons-vue'
import type { BlogType } from '@/types'
import {ref, onMounted} from 'vue'
const blog = ref<any>(null);

const getBlog = async () => {
  try {
    const response = await fetch(`https://admin.cvpulsa.id/api/blog/all`, {
      method: 'GET',
      headers: {
        'X-Api-Key': import.meta.env.VITE_API_KEY,
      },
    });

    if (response.ok) {
      const data = await response.json();
      blog.value = data.data.blog;
      console.log(blog.value);
    } else {
      console.error('Failed to fetch blog:', response.statusText);
    }
  } catch (error) {
    console.error('Failed to fetch blog:', error);
  }
};

onMounted(() => {
  getBlog();
});
</script>
