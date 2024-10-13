<template>
  <TopNavigationBar2 />
  <main class="tw-py-16 tw-pt-20 tw-px-4">
    <!-- Profile Section -->
    <div v-if="loading">
      <SkeletonLoader class="tw-h-28 tw-w-full" />
    </div>
    <div v-else class="tw-bg-white tw-border-2 tw-border-gray-100-md tw-rounded-lg tw-p-4 tw-flex tw-items-center tw-flex-col tw-text-center">
      <img :src="logo" alt="Profile Logo" class="tw-w-24 tw-h-24 tw-rounded-full tw-mb-4" />
      <h1 class="tw-font-semibold tw-text-lg tw-mb-2">Cvpulsa</h1>
    </div>

    <!-- Card Section for Menu -->
    <div class="tw-mt-12 tw-grid tw-gap-4 ">
      <template v-if="loading">
        <SkeletonLoader v-for="i in 4" :key="i" />
      </template>
      <template v-else>
        <router-link to="/rekening">
          <div class="tw-bg-white tw-border-2 tw-border-gray-100 tw-rounded-lg tw-p-3 tw-flex tw-items-center">
            <span class="tw-text-xl tw-text-gray-800 tw-pr-4"><i class="fa fa-folder"></i></span> 
            <div class="tw-text-gray-800 tw-font-light">Data Rekening</div>
            <i class="fa fa-chevron-right tw-text-gray-800 tw-ml-auto"></i>
          </div>
        </router-link>

        <router-link to="/panduan">
          <div class="tw-bg-white tw-border-2 tw-border-gray-100 tw-rounded-lg tw-p-3 tw-flex tw-items-center">
            <span class="tw-text-xl tw-text-gray-800 tw-pr-4"><i class="fa fa-info-circle"></i></span> 
            <div class="tw-text-gray-800 tw-font-light">Panduan Penggunaan</div>
            <i class="fa fa-chevron-right tw-text-gray-800 tw-ml-auto"></i>
          </div>
        </router-link>

        <router-link to="/kebijakan">
          <div class="tw-bg-white tw-border-2 tw-border-gray-100 tw-rounded-lg tw-p-3 tw-flex tw-items-center">
            <span class="tw-text-xl tw-text-gray-800 tw-pr-4"><i class="fa fa-shield"></i></span> 
            <div class="tw-text-gray-800 tw-font-light">Kebijakan Privasi</div>
            <i class="fa fa-chevron-right tw-text-gray-800 tw-ml-auto"></i>
          </div>
        </router-link>

        <router-link to="/prosedure">
          <div class="tw-bg-white tw-border-2 tw-border-gray-100 tw-rounded-lg tw-p-3 tw-flex tw-items-center">
            <span class="tw-text-xl tw-text-gray-800 tw-pr-4"><i class="fa fa-file"></i></span> 
            <div class="tw-text-gray-800 tw-font-light">Prosedure</div>
            <i class="fa fa-chevron-right tw-text-gray-800 tw-ml-auto"></i>
          </div>
        </router-link>

        <div class="tw-bg-white tw-border-2 tw-border-gray-100 tw-rounded-lg tw-p-3 tw-flex tw-items-center tw-cursor-pointer" @click="showLogoutModal">
          <span class="tw-text-xl tw-text-gray-800 tw-pr-4"><i class="fa fa-sign-out"></i></span>
          <div class="tw-text-gray-800 tw-font-light">Keluar</div>
          <i class="fa fa-chevron-right tw-text-gray-800 tw-ml-auto"></i>
        </div>
      </template>
    </div>
  </main>

  <BottomNav />

  <ModalConfirm :visible="isModalVisible" @confirm="logoutHandler" @close="isModalVisible = false" />
</template>

<script lang="ts" setup>
import logo from '@/assets/images/logo_bulat.png'
import { ref, onMounted } from 'vue'
import ModalConfirm from '@/components/ModalConfirm.vue'
import SkeletonLoader from '@/components/SkeletonLoader.vue'

const isModalVisible = ref(false);
const loading = ref(true);

const showLogoutModal = () => {
isModalVisible.value = true;
};

const logoutHandler = () => {
localStorage.removeItem('user_email');
isModalVisible.value = false;   
window.location.href = '/login';
};

// Simulate data loading delay
onMounted(() => {
setTimeout(() => {
  loading.value = false;
}, 700);  // Set loading delay here
});
</script>

<style scoped>
/* Add additional styling here if necessary */
</style>
