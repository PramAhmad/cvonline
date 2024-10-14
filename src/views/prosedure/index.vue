<template>
    <div class="tw-w-full tw-h-full">
      <!-- Top Navigation Bar -->
       <TopNavigationBar2 />
  
      <!-- Content Section -->
      <div class="tw-p-2 tw-px-3 tw-bg-white tw-text-gray-800 tw-translate-y-14">
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
    <BottomNav />
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  const router = useRouter();
  
  const goBack = () => {
    window.history.length > 1 ? window.history.back() : router.push('/');
  };
  </script>
  