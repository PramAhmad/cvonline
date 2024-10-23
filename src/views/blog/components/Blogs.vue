<template>
  <section class="tw-pt-16 tw-translate-y-20">
    <b-container>
      <div class="d-lg-flex justify-content-between align-items-center">
        <h4 class="mb-3 mb-lg-0">Our Blog</h4>
        <ul class="nav nav-pills gap-1 nav-pills-light">
          <li class="nav-item">
            <a class="nav-link active">All blog</a>
          </li>
          <li class="nav-item">
            <a class="nav-link">Marketing</a>
          </li>
          <li class="nav-item">
            <a class="nav-link">Design</a>
          </li>
          <li class="nav-item">
            <a class="nav-link">Lifestyle</a>
          </li>
          <li class="nav-item">
            <a class="nav-link">Technology</a>
          </li>
        </ul>
      </div>

      <!-- Blog List Section -->
      <b-row class="g-4 g-sm-5 g-xl-7 mt-0">
        <b-col md="6" lg="4" v-for="blog in blogs" :key="blog.id">
          <article class="h-100 tw-rounded-xl">
            <img :src="'https://admin.cvpulsa.id/uploads/blog/' + blog.image" alt="Blog Image" class="blog-img tw-rounded-xl" />
            <div class="px-2 pb-4">
              <h6 class="mb-2">
                <router-link to="">{{ blog.created_at }}</router-link>
              </h6>
            
              <div class="d-flex justify-content-between align-items-center">
                <span class="heading-color fw-semibold">{{ blog.title }}</span>
                <router-link :to="'/blog/' + blog.slug" class="icon-link text-primary stretched-link">
                  Read more <BIconArrowRight class="bi" />
                </router-link>
              </div>
            </div>
          </article>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { BIconArrowRight } from 'bootstrap-icons-vue';

const blogs = ref<any[]>([]);

const getBlogs = async () => {
  try {
    const response = await fetch(`https://admin.cvpulsa.id/api/blog/all`, {
      method: 'GET',
      headers: {
        'X-Api-Key': import.meta.env.VITE_API_KEY,
      },
    });

    if (response.ok) {
      const data = await response.json();
      blogs.value = data.data.blog;
    } else {
      console.error('Failed to fetch blog:', response.statusText);
    }
  } catch (error) {
    console.error('Failed to fetch blog:', error);
  }
};

onMounted(() => {
  getBlogs();
});
</script>

<style scoped>
.blog-img {
  width: 100%;
  height: auto;
}
.icon-link {
  color: #007bff;
  text-decoration: none;
}
.icon-link:hover {
  text-decoration: underline;
}
</style>
