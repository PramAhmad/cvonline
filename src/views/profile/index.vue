<template>
    <TopNavigationBar2 />
    <main class="tw-py-16 tw-pt-20 tw-px-4">
      <!-- Profile Section -->
      <div class="tw-bg-white tw-border-2 tw-border-gray-100-md tw-rounded-lg tw-p-4 tw-flex tw-items-center tw-flex-col tw-text-center">
        <img :src="logo" alt="Profile Logo" class="tw-w-24 tw-h-24 tw-rounded-full tw-mb-4" />
        <h1 class="tw-font-semibold tw-text-lg tw-mb-2">Cvpulsa</h1>
      </div>
  
      <!-- Card Section for Menu -->
      <div class="tw-mt-12 tw-grid tw-gap-4 ">
        <router-link to="/rekening">
          <div class="tw-bg-white tw-border-2 tw-border-gray-100 tw-rounded-lg tw-p-3 tw-flex tw-items-center">
            <span class="tw-text-xl tw-text-gray-800 tw-pr-4"><i class="fa fa-folder"></i></span> <!-- Bank Icon -->
            <div class="tw-text-gray-800 tw-font-light">Data Rekening</div>
            <i class="fa fa-chevron-right tw-text-gray-800 tw-ml-auto"></i>
          </div>
        </router-link>
  
        <router-link to="/panduan">
          <div class="tw-bg-white tw-border-2 tw-border-gray-100 tw-rounded-lg tw-p-3 tw-flex tw-items-center">
            <span class="tw-text-xl tw-text-gray-800 tw-pr-4"><i class="fa fa-info-circle"></i></span> <!-- Guide Icon -->
            <div class="tw-text-gray-800 tw-font-light">Panduan Penggunaan</div>
            <i class="fa fa-chevron-right tw-text-gray-800 tw-ml-auto"></i>
          </div>
        </router-link>
        <!-- proseure kebijakan privasi -->
        <router-link to="/kebijakan">
          <div class="tw-bg-white tw-border-2 tw-border-gray-100 tw-rounded-lg tw-p-3 tw-flex tw-items-center">
            <span class="tw-text-xl tw-text-gray-800 tw-pr-4"><i class="fa fa-shield"></i></span> <!-- Guide Icon -->
            <div class="tw-text-gray-800 tw-font-light">Kebijakan Privasi</div>
            <i class="fa fa-chevron-right tw-text-gray-800 tw-ml-auto"></i>
          </div>
        </router-link>

        <!-- prosedure -->
        <router-link to="/prosedure">
          <div class="tw-bg-white tw-border-2 tw-border-gray-100 tw-rounded-lg tw-p-3 tw-flex tw-items-center">
            <span class="tw-text-xl tw-text-gray-800 tw-pr-4"><i class="fa fa-file"></i></span> <!-- Guide Icon -->
            <div class="tw-text-gray-800 tw-font-light">Prosedure</div>
            <i class="fa fa-chevron-right tw-text-gray-800 tw-ml-auto"></i>
          </div>
        </router-link>
         
        
        <div class="tw-bg-white tw-border-2 tw-border-gray-100 tw-rounded-lg tw-p-3 tw-flex tw-items-center tw-cursor-pointer" @click="showLogoutModal">
          <span class="tw-text-xl tw-text-gray-800 tw-pr-4"><i class="fa fa-sign-out"></i></span>
          <div class="tw-text-gray-800 tw-font-light">Keluar</div>
          <i class="fa fa-chevron-right tw-text-gray-800 tw-ml-auto"></i>
        </div>
      </div>
    </main>
  
    <BottomNav />
  
    <ModalConfirm :visible="isModalVisible" @confirm="logoutHandler" @close="isModalVisible = false" />
  </template>
  
  <script lang="ts" setup>
  import logo from '@/assets/images/logo_bulat.png'
  import { ref } from 'vue'
  import ModalConfirm from '@/components/ModalConfirm.vue'
  
  const isModalVisible = ref(false);
  
  const showLogoutModal = () => {
    isModalVisible.value = true;
  };
  
  const logoutHandler = () => {
    localStorage.removeItem('user_email');
    isModalVisible.value = false;   
    window.location.href = '/login';
  };
  </script>
  
  <style scoped>
  </style>
  