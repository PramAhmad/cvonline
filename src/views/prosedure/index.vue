<template>
    <div class="tw-w-full tw-h-full">
      <!-- Header Section -->
      <div class="tw-flex tw-items-center tw-mb-4 tw-w-full tw-justify-center tw-px-2 tw-bg-gray-50 tw-py-3 tw-border-b-2 tw-border-gray-200">
        <button @click="goBack" class="tw-flex tw-items-center tw-space-x-2 tw-text-gray-500 tw-text-sm tw-absolute tw-left-5">
          <svg xmlns="http://www.w3.org/2000/svg" class="tw-h-5 tw-w-5 tw-text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 class="tw-font-medium tw-text-md tw-text-gray-900">Prosedur</h2>
      </div>
  
      <!-- Content Section -->
      <div class="tw-p-2 tw-px-3 tw-bg-white tw-text-gray-800">
        <p class="tw-mb-4">
            Untuk melakukan convert pulsa ada bebrapa prosedur yang harus diketahui sebagai berikut:
        </p>
  
        <!-- Numbered List with tailwind -->
        <ol type="1" class="tw-list-decimal tw-px-4 tw-space-y-2">
          <li><p class="tw-text-sm tw-text-gray-800 tw-font-medium">Wajib pulsa halal, bukan hasil pencurin ,judi ,dll</p></li>
          <li><p class="tw-text-sm tw-text-gray-800 tw-font-medium">Setiap convert pulsa harus mengisi formulir</p></li>
          <li><p class="tw-text-sm tw-text-gray-800 tw-font-medium">Dilarang isi pulsa topup, elektrik, marketplace</p></li>
          <li><p class="tw-text-sm tw-text-gray-800 tw-font-medium">Tunggu cs ksih nomer untuk dikirim pulsa  </p></li>
          <li><p class="tw-text-sm tw-text-gray-800 tw-font-medium">Lakukan pengiriman pulsa dahulu baru uang diproses</p></li>
          <li><p class="tw-text-sm tw-text-gray-800 tw-font-medium">Lewat 10 menit setelah cs kasih nomer pulsa belum dikirim transaksi otomatis dibatalkan,jika ingin transaksi lagi isi formulir lagi</p></li>
          <li><p class="tw-text-sm tw-text-gray-800 tw-font-medium">Transaksi diproses 5-10 menit setelah pulsa masuk</p></li>
          <li><p class="tw-text-sm tw-text-gray-800 tw-font-medium">Wajib mengunakan rekening/akun sendiri</p></li>
            <li><p class="tw-text-sm tw-text-gray-800 tw-font-medium">Dilarang pakai rekening/akun orang lain
            </p></li>
        <li ><p class="tw-text-sm tw-text-gray-800 tw-font-medium">Dilarang kirim pulsa sebelum dikasih nomer CS</p></li>


          
        </ol>
       
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  const router = useRouter();
  
  const goBack = () => {
    window.history.length > 1 ? window.history.back() : router.push('/');
  };
  </script>
  