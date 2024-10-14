<template>
  <div class="tw-flex tw-items-center tw-mb-4 tw-w-full tw-justify-center tw-px-2 tw-bg-gray-50 tw-py-3 tw-border-b-2 tw-border-gray-200">
    <router-link to="/" class="tw-flex tw-items-center tw-space-x-2 tw-text-gray-500 tw-text-sm tw-absolute tw-left-5">
      <svg xmlns="http://www.w3.org/2000/svg" class="tw-h-5 tw-w-5 tw-text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </router-link>
    <h2 class="tw-font-medium tw-text-xl tw-text-gray-900">Calculator Convert</h2>
  </div>
  
  <div class="tw-py-6 tw-px-4">
    <!-- Form Fields -->
    <div class="tw-mb-4 tw-w-full">
      <label class="tw-block tw-text-gray-700 tw-font-medium tw-mb-2">Jumlah Pulsa Sekarang *</label>
      <InputNumber type="number" placeholder="0" class="tw-w-full tw-px-4 tw-py-2 tw-border tw-rounded-md tw-block" v-model="pulsaSekarang" />
    </div>

    <div class="tw-mb-4">
      <label class="tw-block tw-text-gray-700 tw-font-medium tw-mb-2">Provider Kartu *</label>
      <button @click="openModal" class="tw-w-full tw-px-4 tw-py-2 tw-border tw-rounded-md tw-flex tw-justify-between tw-items-center">
        <span>{{ selectedProvider?.name || 'Pilih Provider' }}</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="tw-h-5 tw-w-5 tw-text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>

    <div class="tw-mb-4">
  <label class="tw-block tw-text-gray-700 tw-font-medium tw-mb-2">Sisa Pulsa *</label>
  <input type="text" :value="`Rp ${sisaPulsa.toLocaleString('id-ID')}`" class="tw-w-full tw-px-4 tw-py-2 tw-border tw-rounded-md" disabled />
</div>

<div class="tw-mb-4">
  <label class="tw-block tw-text-gray-700 tw-font-medium tw-mb-2">Biaya Transfer Pulsa *</label>
  <input type="text" :value="`Rp ${BiayaTransfer.toLocaleString('id-ID')}`" class="tw-w-full tw-px-4 tw-py-2 tw-border tw-rounded-md" disabled />
</div>



    <!-- Footer Section -->
    <div class="tw-flex tw-items-center tw-justify-between tw-mt-10">
      <p class="tw-text-base tw-font-normal">Pulsa bisa diconvert</p>
      <p class="tw-text-base tw-font-normal">Rp {{ convertPulsa }}</p>
    </div>
    <div class="tw-flex tw-w-full tw-pt-2">
      <button class="tw-bg-red-600 tw-rounded-full tw-w-full  tw-text-white tw-px-6 tw-py-2 tw-font-normal" @click="convertPulsaNow" :disabled=" !selectedProvider">
      Convert Sekarang
    </button>
    </div>

    <!-- Modal for Provider Selection -->
    <div v-if="isModalOpen" class="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-50 tw-flex tw-justify-center tw-items-center">
      <div class="tw-bg-white tw-rounded-md tw-p-4 tw-w-3/4 tw-max-w-md tw-shadow-base">
        <h2 class="tw-text-base tw-font-semibold tw-mb-4">Pilih Provider</h2>
        <ul>
          <li v-for="item in provider" :key="item.id" @click="selectProvider(item)" class="tw-flex tw-items-center tw-py-2 tw-border-b tw-border-gray-200 tw-cursor-pointer">
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
import router from '../../router';

const pulsaSekarang = ref<number | null>(null)
const selectedProvider = ref<Provider | null>(null)
const isModalOpen = ref<boolean>(false)
import InputNumber from 'primevue/inputnumber';

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
  const sisaPulsa = ref<number>(0)
const BiayaTransfer = ref<number>(0)

const getProvider = async () => {
  const config = {
    headers: {
      'X-Api-Key': import.meta.env.VITE_API_KEY,
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
  sisaPulsa.value = parseInt(providerItem.sisa_pulsa) || 0
  const pulsa = pulsaSekarang.value || 0
  switch (providerItem.name) {
  case 'Telkomsel':
    switch (true) {
      case pulsa >= 20000 && pulsa <= 49900:
        BiayaTransfer.value = 4000;
        break;
      case pulsa >= 50000 && pulsa <= 99900:
        BiayaTransfer.value = 5000;
        break;
      case pulsa >= 100000 && pulsa <= 199900:
        BiayaTransfer.value = 8500;
        break;
      case pulsa >= 200000 && pulsa <= 299000:
        BiayaTransfer.value = 13500;
        break;
      case pulsa >= 300000 && pulsa <= 498000:
        BiayaTransfer.value = 18500;
        break;
      case pulsa >= 500000 && pulsa <= 1000000:
        BiayaTransfer.value = 24500;
        break;
      default:
        BiayaTransfer.value = 0;
    }
    break;
  case 'XL/Axis':
    switch (true) {
      case pulsa >= 25000 && pulsa <= 49999:
        BiayaTransfer.value = 2000;
        break;
      case pulsa >= 50000 && pulsa <= 99999:
        BiayaTransfer.value = 2500;
        break;
      case pulsa >= 100000 && pulsa <= 200000:
        BiayaTransfer.value = 4500;
        break;
      case pulsa >= 200001 && pulsa <= 300000:
        BiayaTransfer.value = 6600;
        break;
      case pulsa >= 300001 && pulsa <= 500000:
        BiayaTransfer.value = 8500;
        break;
      case pulsa >= 500001 && pulsa <= 1000000:
        BiayaTransfer.value = 10500;
        break;
      default:
        BiayaTransfer.value = 0;
    }
    break;
  case 'Three':
    switch (true) {
      case pulsa >= 25000 && pulsa <= 49999:
        BiayaTransfer.value = 1500;
        break;
      case pulsa >= 50000 && pulsa <= 99999:
        BiayaTransfer.value = 2000;
        break;
      case pulsa >= 100000 && pulsa <= 200000:
        BiayaTransfer.value = 4000;
        break;
      case pulsa >= 200001 && pulsa <= 400000:
        BiayaTransfer.value = 8000;
        break;
      case pulsa >= 400001 && pulsa <= 600000:
        BiayaTransfer.value = 12000;
        break;
      case pulsa >= 600001 && pulsa <= 1000000:
        BiayaTransfer.value = 20000;
        break;
      default:
        BiayaTransfer.value = 0;
    }
    break;
  case 'Smartfreen':
    switch (true) {
      case pulsa >= 20000 && pulsa <= 50000:
        BiayaTransfer.value = 2000;
        break;
      case pulsa >= 50001 && pulsa <= 100000:
        BiayaTransfer.value = 2500;
        break;
      case pulsa >= 100001 && pulsa <= 200000:
        BiayaTransfer.value = 5000;
        break;
      case pulsa >= 200001 && pulsa <= 300000:
        BiayaTransfer.value = 7500;
        break;
      case pulsa >= 300001 && pulsa <= 400000:
        BiayaTransfer.value = 10000;
        break;
      case pulsa >= 400001 && pulsa <= 500000:
        BiayaTransfer.value = 12500;
        break;
      default:
        BiayaTransfer.value = 0;
    }
    break;
  default:
    BiayaTransfer.value = 0;
}
  closeModal()
}

const convertPulsa = computed(() => {
 console.log(pulsaSekarang.value, BiayaTransfer.value, sisaPulsa.value)
  if (!pulsaSekarang.value || !selectedProvider.value) return 0;
  return (pulsaSekarang.value - BiayaTransfer.value - sisaPulsa.value).toLocaleString('id-ID');
});

function convertPulsaNow() {
  const providerId = selectedProvider.value?.id;
  const nominal = pulsaSekarang.value.toString();
  
  const expiryTime = new Date().getTime() + 30000; 
  localStorage.setItem('nominal', nominal);
  localStorage.setItem('nominal_expiry', expiryTime.toString());
  window.location.href = `/convert/${providerId}`;
  

}


onMounted(() => {
  getProvider();
});
</script>
