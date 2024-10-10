<template>
    <TopNavigationBar2 />
    <main class="tw-py-8 tw-pb-20 tw-px-1 tw-bg-gray-100">
      <section class="tw-space-y-4">
        <!-- Loop through transaksi array -->
        <div 
          v-for="(item, index) in transaksi" 
          :key="index" 
          class="tw-bg-white tw-p-4 tw-rounded-lg tw-shadow-md"
        >
          <div class="tw-flex tw-justify-between">
            <span class="tw-text-sm tw-text-gray-700 tw-font-light">{{ item.tanggal }}</span>
            <span 
              :class="item.status === 'Selesai' ? 'tw-bg-green-100 tw-text-green-600' : 'tw-bg-yellow-100 tw-text-yellow-600'"
              class="tw-px-2 tw-py-1 tw-rounded-full tw-text-xs"
            >
              {{ item.status }}
            </span>
          </div>
          <div class="tw-mt-2">
            <div class="tw-flex tw-justify-between tw-mt-2">
              <p class="tw-text-gray-800 tw-font-light">{{ item.provider }} {{ item.no_telepon }}</p>
              <span class="tw-text-gray-800">{{ formatNumber(item.nominal) }}</span>
            </div>
            <p class="tw-text-gray-800 tw-font-light">{{ item.bank }} {{ item.no_rekening }}</p>
            <p class="tw-text-gray-800 tw-font-light">{{ item.nama_rekening }}</p>
            <div class="tw-flex tw-justify-between tw-mt-2">
              <span class="tw-text-gray-700 tw-font-light">Hasil Konversi</span>
              <span class="tw-text-gray-800 tw-font-light">Rp {{ formatNumber(item.total_diterima) }}</span>
            </div>
            <div class="tw-flex tw-justify-between">
              <span class="tw-text-gray-700 tw-font-light">Biaya Transaksi</span>
              <span class="tw-text-gray-800 tw-font-light">Rp {{ formatNumber(item.biaya_transfer) }}</span>
            </div>
            <hr class="tw-mt-2">
            <div class="tw-flex tw-justify-between tw-font-semibold tw-mt-2">
              <span class="tw-text-gray-900 tw-font-medium">Total Diterima</span>
              <span class="tw-text-gray-900 tw-font-light">Rp {{ formatNumber(item.total_diterima) }}</span>
            </div>
          </div>
        </div>
      </section>
    </main>
    <BottomNav />
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  
  interface Transaksi {
    id: number;
    tanggal: string;
    email: string;
    provider: string;
    no_telepon: string;
    nominal: number;
    bank: string;
    no_rekening: string;
    nama_rekening: string;
    biaya_transfer: number;
    total_diterima: number;
    status: string; // Assuming you have a status field for 'Selesai' or 'Pending'
  }
  
  const transaksi = ref<Transaksi[]>([]);
  const email = localStorage.getItem('user_email');
  
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  
  const getTransaksi = async () => {
    try {
      const response = await fetch(`https://admin.cvpulsa.id/api/my_transactions/all?filter=${email}`, {
        method: 'GET',
        headers: {
          'X-Api-Key': '6B327B94169776D1096031DC73EF9F81',
          'Accept': 'application/json'
        }
      });
      console.log(response);
  
      if (response.ok) {
        const data = await response.json();
      
        data.data.my_transactions.forEach((item: Transaksi) => {
          const date = new Date(item.tanggal);
          item.tanggal = date.toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
        });
        transaksi.value = data.data.my_transactions;
        console.log(transaksi.value);
      } else {
        console.log('Unexpected response:', response);
      }
    } catch (error) {
      console.error('Failed to fetch provider:', error);
    }
  };
  
  onMounted(() => {
    console.log('Component mounted');
    getTransaksi();
  });
  </script>
  