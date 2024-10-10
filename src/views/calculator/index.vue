<template>
     <div class="tw-flex tw-items-center tw-mb-4 tw-w-full tw-justify-center tw-px-2 tw-bg-gray-50 tw-py-3 tw-border-b-2 tw-border-gray-200">
<router-link to="/" class="tw-flex tw-items-center tw-space-x-2 tw-text-gray-500 tw-text-sm tw-absolute tw-left-5">
    <!-- <i class="fas fa-chevron-left"></i>svg arrow kiri -->
    <svg xmlns="http://www.w3.org/2000/svg" class="tw-h-5 tw-w-5 tw-text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
</router-link>
<h2 class="tw-font-medium tw-text-xl tw-text-gray-900">Calculator Convert</h2>
</div>
    <div class="tw-py-6 tw-px-4">
      
      <!-- Form Fields -->
      <div class="tw-mb-4">
        <label class="tw-block tw-text-gray-700 tw-font-medium tw-mb-2">Jumlah Pulsa Sekarang *</label>
        <input type="number" placeholder="0" class="tw-w-full tw-px-4 tw-py-2 tw-border tw-rounded-md" v-model="pulsaSekarang" />
      </div>
      
      <div class="tw-mb-4">
        <label class="tw-block tw-text-gray-700 tw-font-medium tw-mb-2">Provider Kartu *</label>
        <button @click="openModal" class="tw-w-full tw-px-4 tw-py-2 tw-border tw-rounded-md tw-flex tw-justify-between tw-items-center">
          <span>{{ selectedProvider || 'Pilih Provider' }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="tw-h-5 tw-w-5 tw-text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      
      <div class="tw-mb-4">
        <label class="tw-block tw-text-gray-700 tw-font-medium tw-mb-2">Sisa Pulsa *</label>
        <input type="text" placeholder="Rp 0" class="tw-w-full tw-px-4 tw-py-2 tw-border tw-rounded-md" v-model="sisaPulsa" />
      </div>
  
      <div class="tw-mb-4">
        <label class="tw-block tw-text-gray-700 tw-font-medium tw-mb-2">Biaya Transfer Pulsa *</label>
        <input type="text" placeholder="Rp 0" class="tw-w-full tw-px-4 tw-py-2 tw-border tw-rounded-md" v-model="biayaTransfer" />
      </div>
      
      <!-- Footer Section -->
      <div class="tw-flex tw-items-center tw-justify-between tw-mt-6">
        <span class="tw-text-lg tw-font-bold">Pulsa bisa diconvert</span>
        <span class="tw-text-lg tw-font-bold">Rp {{ convertPulsa }}</span>
        <button class="tw-bg-gray-300 tw-text-gray-700 tw-px-6 tw-py-2 tw-rounded-md tw-font-semibold" @click="convertPulsaNow" :disabled="!pulsaSekarang || !selectedProvider">
          Convert Sekarang
        </button>
      </div>
      
      <!-- Modal for Provider Selection -->
      <div v-if="isModalOpen" class="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-50 tw-flex tw-justify-center tw-items-center">
        <div class="tw-bg-white tw-rounded-md tw-p-4 tw-w-3/4 tw-max-w-md tw-shadow-lg">
          <h2 class="tw-text-lg tw-font-semibold tw-mb-4">Pilih Provider</h2>
          <ul>
            <li v-for="item in provider" :key="item.id" @click="selectProvider(item.name)" class="tw-flex tw-items-center tw-py-2 tw-border-b tw-border-gray-200 tw-cursor-pointer">
              <img :src="`https://admin.cvpulsa.id/uploads/my_provider/`+item.icon" alt="Provider Icon" class="tw-w-8 tw-h-8 tw-mr-2" />
              <span>{{ item.name }}</span>
            </li>
          </ul>
          <button @click="closeModal" class="tw-w-full tw-mt-4 tw-bg-red-500 tw-text-white tw-py-2 tw-rounded-md">Close</button>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, computed, onMounted } from 'vue'
  
  const pulsaSekarang = ref<number | null>(null)
  const sisaPulsa = ref<string>('Rp 0')
  const biayaTransfer = ref<string>('Rp 0')
  const selectedProvider = ref<Provider | null>(null) 
  const isModalOpen = ref<boolean>(false)
  
  interface Provider {
    id: number;
    name: string;
    icon: string;
    rate: number;
    sisa_pulsa: number;
    status: string;
    min_transaksi: number;
    max_transaksi: number;
    no_cs: string;
  }
  
  const provider = ref<Provider[]>([])
  
  const getProvider = async () => {
    const config = {
      headers: {
        'X-Api-Key': '6B327B94169776D1096031DC73EF9F81',
      },
    };
  
    try {
      const response = await fetch('https://admin.cvpulsa.id/api/my_provider/all?sort_order=asc', {
        method: 'GET',
        headers: config.headers,
      });
  
      if (response.ok) {
        const data = await response.json();
        provider.value = data.data.my_provider;
      } else {
        console.log("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Failed to fetch provider:", error);
    }
  }
  
  function openModal() {
    isModalOpen.value = true
  }
  
  function closeModal() {
    isModalOpen.value = false
  }
  
  function selectProvider(providerItem: Provider) {
    selectedProvider.value = providerItem
    closeModal()
  }
  
  const convertPulsa = computed(() => {
    if (!pulsaSekarang.value || !selectedProvider.value) return 0
  
    const rate = selectedProvider.value.rate / 100 // Assuming rate is a percentage, convert to decimal
    const maxConvertable = selectedProvider.value.sisa_pulsa
  
    // Calculate the amount that can be converted based on the provider's rate
    const convertableAmount = pulsaSekarang.value * rate
  
    // Ensure the converted amount doesn't exceed the provider's sisa_pulsa
    return Math.min(convertableAmount, maxConvertable)
  })
  
  function convertPulsaNow() {
    if (!pulsaSekarang.value || !selectedProvider.value) {
      console.error('Pulsa or Provider not selected');
      return;
    }
  
    const result = convertPulsa.value;
    console.log(`Pulsa yang bisa diconvert: Rp ${result}`);
  }
  
  onMounted(() => {
    getProvider();
  });
  </script>
  