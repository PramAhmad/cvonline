<template>
  <section class=" ">
    <b-container>
      <div class="d-lg-flex justify-content-between align-items-center">
        <h4 class="mb-3 mb-lg-0 tw-text-xl tw-font-xl heading-color">Our Blog</h4>
        <div class="tw-flex tw-gap-2 tw-overflow-x-auto tw-pb-2">
          <button 
            v-for="cat in categories" 
            :key="cat.category_id"
            @click="changeCategory(cat.category_id)"
            class="tw-px-4 tw-py-2 tw-rounded-full tw-whitespace-nowrap tw-transition-colors"
            :class="[
              activeCategory === cat.category_id 
                ? 'tw-bg-red-500 tw-text-white' 
                : 'tw-bg-gray-100 hover:tw-bg-gray-200 tw-text-gray-700'
            ]"
          >
            {{ cat.category_name }}
          </button>
        </div>
      </div>

      <b-row class="g-4 g-sm-5 g-xl-7 mt-0">
        <b-col md="6" lg="4" v-for="blog in paginatedBlogs" :key="blog.id">
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

      <div v-if="hasMorePosts" class="tw-flex tw-justify-center tw-mt-8">
        <button 
          @click="loadMore"
          class="tw-px-6 tw-py-2 tw-bg-red-500 tw-text-white tw-rounded-full hover:tw-bg-red-600 tw-transition-colors"
        >
          Load More
        </button>
      </div>
    </b-container>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, computed } from 'vue';
import { BIconArrowRight } from 'bootstrap-icons-vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const blogs = ref<any[]>([]);
const activeCategory = ref('all');
const currentPage = ref(1);
const postsPerPage = 6;

const categories = ref([]);

const filteredBlogs = computed(() => {
  if (activeCategory.value === 'all') {
    return blogs.value; 
  }
  return blogs.value.filter(blog => blog.category === activeCategory.value); 
});

const paginatedBlogs = computed(() => {
  return filteredBlogs.value.slice(0, currentPage.value * postsPerPage);
});

const hasMorePosts = computed(() => {
  return paginatedBlogs.value.length < filteredBlogs.value.length;
});

const getBlogs = async () => {
  try {
    const response = await fetch('https://admin.cvpulsa.id/api/blog/all', {
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

const getCategories = async () => {
  try {
    const response = await fetch('https://admin.cvpulsa.id/api/blog_category/all', {
      method: 'GET',
      headers: {
        'X-Api-Key': import.meta.env.VITE_API_KEY,
      },
    });

    if (response.ok) {
      const data = await response.json();
      categories.value = [{ category_id: 'all', category_name: 'All' }, ...data.data.blog_category];
      console.log(categories.value);
    } else {
      console.error('Failed to fetch blog categories:', response.statusText);
    }
  } catch (error) {
    console.error('Failed to fetch blog categories:', error);
  }
};

const changeCategory = (category: string) => {
  activeCategory.value = category;
  currentPage.value = 1; 
};

const loadMore = () => {
  currentPage.value++;
};

const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = { 
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  };
  return new Date(date).toLocaleDateString('id-ID', options);
};

watch(
  () => route.params.category,
  (newCategory) => {
    if (newCategory) {
      activeCategory.value = newCategory as string;
    }
  }
);

onMounted(() => {
  if (route.params.category) {
    activeCategory.value = route.params.category as string;
  }
  getBlogs();
  getCategories();
});
</script>


<style scoped>
.tw-overflow-x-auto {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.tw-overflow-x-auto::-webkit-scrollbar {
  display: none;
}
</style>