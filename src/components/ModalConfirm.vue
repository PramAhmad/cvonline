<template>
    <div v-if="visible" class="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-50 tw-flex tw-items-center tw-justify-center">
      <div class="tw-bg-white tw-rounded-lg tw-px-6 tw-py-4 tw-text-center tw-shadow-lg">
        <h2 class="tw-font-semibold tw-text-lg">Konfirmasi Logout</h2>
        <p class="tw-my-4">Apakah Anda yakin ingin keluar?</p>
        <div class="tw-flex tw-justify-between tw-mt-6">
          <button @click="confirmLogout" class="tw-bg-red-500 tw-text-white tw-px-4 tw-py-2 tw-rounded-md">Ya, Keluar</button>
          <button @click="closeModal" class="tw-bg-gray-300 tw-px-4 tw-py-2 tw-rounded-md">Batal</button>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { defineEmits, defineProps } from 'vue';
  
  const props = defineProps({
    visible: Boolean
  });
  
  const emit = defineEmits(['confirm', 'close']);
  
  const closeModal = () => {
    emit('close');
  };
  
  const confirmLogout = () => {
    emit('confirm');
  };
  </script>
  
  <style scoped>
  </style>
  