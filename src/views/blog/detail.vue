<template>
    <TopNavigationBar2 />
    <section class="pt-lg-8">
      <b-container class="pt-4 pt-lg-0">
        <b-row class="g-4 g-sm-7">
          <b-col lg="8">
            <div class="d-flex position-relative z-index-9">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb breadcrumb-dots mb-1">
                  <li class="breadcrumb-item">
                    <router-link to="/">Home</router-link>
                  </li>
                  <li class="breadcrumb-item">
                    <router-link to="/blog">Blog</router-link>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">{{ blog?.title || 'Blog not found' }}</li>
                </ol>
              </nav>
            </div>
  
            <h1 class="h2 mb-0">{{ blog?.title || 'Loading...' }}</h1>

            <img v-if="blog?.image" :src="'https://admin.cvpulsa.id/uploads/blog/'+blog.image" class="img-fluid rounded mt-5" alt="blog-img" />
            
            <div class="mt-5" v-html="blog?.content || 'Loading...'" />
          </b-col>
       
        </b-row>
      </b-container>
    </section>
    <BottomNav/>
</template>
  
<script lang="ts" setup>
import { faPaste, faThumbsDown, faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import {
  BIconChat,
  BIconFacebook,
  BIconInstagram,
  BIconShare,
  BIconWhatsapp,
  BIconQuote
} from 'bootstrap-icons-vue'
  
import TopNavigationBar2 from '../../components/TopNavigationBar2.vue';
import BottomNav from '../../components/BottomNav.vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';

// Get route params
const route = useRoute();
const blogId = route.params.slug;
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
      const blogs = data.data.blog;
      const filteredData = blogs.find((item) => item.slug === blogId);
      blog.value = filteredData || {};
      
      if (!filteredData) {
        console.log('No blog found with this slug');
      } else {
        console.log('Filtered data:', filteredData);
      }
    } else {
      console.log('Unexpected response:', response);
    }
  } catch (error) {
    console.error('Failed to fetch blog:', error);
  }
};

onMounted(() => {
  getBlog();
});
</script>
