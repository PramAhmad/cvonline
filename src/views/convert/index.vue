<template>
  <form @submit.prevent="submitForm" class="tw-w-full">
    <div class="tw-flex tw-items-center tw-mb-4 tw-w-full tw-justify-center tw-px-2 tw-bg-gray-50 tw-py-3 tw-border-b-2 tw-border-gray-200">
      <router-link to="/" class="tw-flex tw-items-center tw-space-x-2 tw-text-gray-500 tw-text-sm tw-absolute tw-left-5">
        <svg xmlns="http://www.w3.org/2000/svg" class="tw-h-5 tw-w-5 tw-text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </router-link>
      <h2 class="tw-font-medium tw-text-xl tw-text-gray-900">Convert {{ provider?.name || 'Provider' }}</h2>
    </div>
    
    <div class="tw-w-full tw-p-4">
      <label class="tw-block tw-mb-2 tw-text-sm tw-font-medium">Nominal Pulsa Yang Di Convert <span class="tw-text-red-500">*</span></label>
      <div class="tw-flex tw-max-w-full ">
        <InputNumber v-model="nominal" type="number" placeholder="0" class="tw-w-full  tw-border tw-rounded tw-p-2 tw-mb-2 tw-my-5" />
      
      </div>
      <p v-if="nominal < provider?.min_transaksi" class="tw-text-red-500 tw-text-sm tw-my-2">
        Minimal convert pulsa {{ formatCurrency(provider?.min_transaksi) }}
      </p>
      <p v-if="nominal > provider?.max_transaksi" class="tw-text-red-500 tw-text-sm tw-my-2">
        Maksimal convert pulsa {{ formatCurrency(provider?.max_transaksi) }}
      </p>
      
      <div v-else-if="nominal >= provider?.min_transaksi && nominal <= provider?.max_transaksi">
        <div class="tw-flex tw-justify-between tw-items-center tw-mb-4 tw-py-2 tw-px-3 tw-rounded-md tw-bg-blue-100">
          <h5 class="tw-text-blue-400 tw-font-medium">Rate <span class="tw-font-semibold">{{ provider?.rate }}</span></h5>
          <h5 class="tw-text-blue-400 tw-font-medium">Saldo Diterima <span class="tw-font-semibold">{{ formattedSaldoDiterima }}</span></h5>
        </div>
      </div>
  
      <label class="tw-block tw-mb-2 tw-text-sm tw-font-medium">Nomor Pengirim Pulsa <span class="tw-text-red-500">*</span></label>
      <input v-model="phoneNumber" type="text" placeholder="081234xxxxxxx" class="tw-w-full tw-border tw-rounded tw-p-2 tw-mb-2" />
      <span v-if="errorMessages.phoneNumber" class="tw-text-red-500 tw-text-sm">{{ errorMessages.phoneNumber }}</span>
    
      <label class="tw-block tw-mb-2 tw-text-sm tw-font-medium">Pilih Rekening</label>
      <select v-model="selectedRekening" class="tw-w-full tw-border tw-rounded tw-p-2 tw-mb-1 tw-bg-gray-50">
        <option disabled>Pilih Rekening</option>
        <option v-for="rek in rekening" :key="rek.id" :value="rek">
          {{ rek.nama_rekening }} - {{ rek.no_rekening }}
        </option>
      </select>
      <span v-if="errorMessages.selectedRekening" class="tw-text-red-500 tw-text-sm">{{ errorMessages.selectedRekening }}</span>
  
      <label class="tw-block tw-mb-2 tw-text-sm tw-font-medium">Info Sisa Pulsa Setelah Transfer <span class="tw-text-red-500">*</span></label>
      <div class="tw-flex tw-items-center tw-mb-2">
        <span class="tw-text-gray-500 tw-pr-2">Rp</span>
        <input v-model="sisaPulsa" type="number" placeholder="0" class="tw-w-full tw-border tw-rounded tw-p-2" disabled />
      </div>
  
      <div class="tw-flex tw-items-center tw-mb-2">
        <input type="checkbox" id="confirm" v-model="isConfirmed" class="tw-mr-2" />
        <label for="confirm" class="tw-text-sm">Saya memastikan pulsa yang saya convert dari hasil yang benar dan aman.</label>
      </div>
      <span v-if="errorMessages.isConfirmed" class="tw-text-red-500 tw-text-sm">{{ errorMessages.isConfirmed }}</span>
  
      <div class="tw-flex tw-justify-between tw-items-center tw-mb-4 tw-pt-10">
        <p>Saldo Diterima</p>
        <p class="tw-font-bold">{{ formattedSaldoDiterima }}</p>
      </div>
  
      <button
        type="submit"
        class="tw-w-full tw-bg-rose-600 tw-text-white tw-font-medium tw-py-2 tw-rounded-full"
      >
        <span>Selanjutnya</span>
      </button>
    </div>
  </form>
  
  <!-- Confirmation Modal -->
  <div v-if="showModal" class="tw-fixed tw-inset-0 tw-flex tw-items-center tw-justify-center tw-bg-gray-800 tw-bg-opacity-75">
    <div class="tw-bg-white tw-rounded-lg tw-shadow-lg tw-p-6 tw-w-full tw-max-w-md">
      <h3 class="tw-text-lg tw-font-semibold tw-mb-4">Konfirmasi Transaksi</h3>
      <p>Apakah Anda yakin ingin melanjutkan transaksi ini?</p>
      <p><strong>Nominal:</strong> {{ formattedNominal }}</p>
      <p><strong>Provider:</strong> {{ provider?.name }}</p>
      <p><strong>Rekening:</strong> {{ selectedRekening.nama_rekening }} - {{ selectedRekening.no_rekening }}</p>
      <p><strong>Saldo Diterima:</strong> {{ formattedSaldoDiterima }}</p>
  
      <div class="tw-flex tw-justify-end tw-mt-4">
        <button @click="showModal = false" class="tw-bg-gray-300 tw-py-2 tw-px-4 tw-mr-2 tw-rounded">Batal</button>
        <button @click="confirmTransaction" class="tw-bg-blue-500 tw-text-white tw-py-2 tw-px-4 tw-rounded">
          <span v-if="isLoading">Loading...</span>
          <span v-else>Konfirmasi</span>
        </button>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>

import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
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

interface Rekening {
id: number;
icon: string;
nama_rekening: string;
bank:string;
biaya_transfer: number;
no_rekening: string;
kode_pembayaran: string;  
}

const rekening = ref<Rekening[]>([]);
const provider = ref<Provider | null>(null);
const nominal = ref(0);
const phoneNumber = ref('');
const sisaPulsa = ref(0);
const isConfirmed = ref(false);
const $route = useRoute();
const userEmail = localStorage.getItem('user_email');
const showModal = ref(false);
const selectedRekening = ref<Rekening | null>(null);
const isLoading = ref(false);

const formatCurrency = (value: number) => {
return new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  minimumFractionDigits: 0
}).format(value);
};

const formattedNominal = computed(() => formatCurrency(nominal.value));
const formattedSisaPulsa = computed(() => formatCurrency(sisaPulsa.value));
const formattedSaldoDiterima = computed(() => formatCurrency(calculatedSaldo.value));



const getRekening = async () => {
try {
  const response = await fetch(`https://admin.cvpulsa.id/api/my_bank/all?filter=${userEmail}`, {
    method: 'GET',
    headers: {
      'X-Api-Key': '6B327B94169776D1096031DC73EF9F81',
    },
  });

  if (response.ok) {
    const data = await response.json();
    rekening.value = data.data.my_bank;
  } else {
    console.log('Unexpected response:', response);
  }
} catch (error) {
  console.error('Failed to fetch provider:', error);
}
};

const getProviderById = async () => {
try {
  const response = await fetch(`https://admin.cvpulsa.id/api/my_provider/detail?id=${$route.params.id}`, {
    method: 'GET',
    headers: {
      'X-Api-Key': '6B327B94169776D1096031DC73EF9F81',
    },
  });

  if (response.ok) {
    const data = await response.json();
    provider.value = data.data.my_provider;
  } else {
    console.log('Unexpected response:', response);
  }
} catch (error) {
  console.error('Failed to fetch provider:', error);
}
};

const calculateFee = (nominal: number) => {
switch (provider.value?.name) {
  case 'Telkomsel':
    switch (true) {
      case nominal >= 20000 && nominal <= 49900:
        sisaPulsa.value = 4000;
        break;
      case nominal >= 50000 && nominal <= 99900:
        sisaPulsa.value = 5000;
        break;
      case nominal >= 100000 && nominal <= 199900:
        sisaPulsa.value = 8500;
        break;
      case nominal >= 200000 && nominal <= 299000:
        sisaPulsa.value = 13500;
        break;
      case nominal >= 300000 && nominal <= 498000:
        sisaPulsa.value = 18500;
        break;
      case nominal >= 500000 && nominal <= 1000000:
        sisaPulsa.value = 24500;
        break;
      default:
        sisaPulsa.value = 0;
    }
    break;
  case 'XL/Axis':
    switch (true) {
      case nominal >= 25000 && nominal <= 49999:
        sisaPulsa.value = 2000;
        break;
      case nominal >= 50000 && nominal <= 99999:
        sisaPulsa.value = 2500;
        break;
      case nominal >= 100000 && nominal <= 200000:
        sisaPulsa.value = 4500;
        break;
      case nominal >= 200001 && nominal <= 300000:
        sisaPulsa.value = 6600;
        break;
      case nominal >= 300001 && nominal <= 500000:
        sisaPulsa.value = 8500;
        break;
      case nominal >= 500001 && nominal <= 1000000:
        sisaPulsa.value = 10500;
        break;
      default:
        sisaPulsa.value = 0;
    }
    break;
  case 'Three':
    switch (true) {
      case nominal >= 25000 && nominal <= 49999:
        sisaPulsa.value = 1500;
        break;
      case nominal >= 50000 && nominal <= 99999:
        sisaPulsa.value = 2000;
        break;
      case nominal >= 100000 && nominal <= 200000:
        sisaPulsa.value = 4000;
        break;
      case nominal >= 200001 && nominal <= 400000:
        sisaPulsa.value = 8000;
        break;
      case nominal >= 400001 && nominal <= 600000:
        sisaPulsa.value = 12000;
        break;
      case nominal >= 600001 && nominal <= 1000000:
        sisaPulsa.value = 20000;
        break;
      default:
        sisaPulsa.value = 0;
    }
    break;
  case 'Smartfreen':
    switch (true) {
      case nominal >= 20000 && nominal <= 50000:
        sisaPulsa.value = 2000;
        break;
      case nominal >= 50001 && nominal <= 100000:
        sisaPulsa.value = 2500;
        break;
      case nominal >= 100001 && nominal <= 200000:
        sisaPulsa.value = 5000;
        break;
      case nominal >= 200001 && nominal <= 300000:
        sisaPulsa.value = 7500;
        break;
      case nominal >= 300001 && nominal <= 400000:
        sisaPulsa.value = 10000;
        break;
      case nominal >= 400001 && nominal <= 500000:
        sisaPulsa.value = 12500;
        break;
      default:
        sisaPulsa.value = 0;
    }
    break;
  default:
    sisaPulsa.value = 0;
}
return sisaPulsa.value;
};
interface ErrorMessages {
phoneNumber: string;
selectedRekening: string;
isConfirmed: string;
}

const errorMessages = ref<ErrorMessages>({
phoneNumber: '',
selectedRekening: '',
isConfirmed: ''
});
function validateForm(){

errorMessages.value.phoneNumber = phoneNumber.value ? '' : 'Nomor telepon tidak boleh kosong';
errorMessages.value.selectedRekening = selectedRekening.value ? '' : 'Rekening tidak boleh kosong';
errorMessages.value.isConfirmed = isConfirmed.value ? '' : 'Anda harus menyetujui syarat dan ketentuan';

  
}
const submitForm = () => {
  console.log(errorMessages.value);
  validateForm();
  if (
  !errorMessages.value.phoneNumber &&
  !errorMessages.value.selectedRekening && 
  !errorMessages.value.isConfirmed &&
  provider.value && 
  nominal.value >= provider.value.min_transaksi && 
  nominal.value <= provider.value.max_transaksi && 
  isConfirmed.value
) {
  showModal.value = true; 
}
};

const calculatedSaldo = computed(() => {
const fee = calculateFee(nominal.value);
const biaya_transfer = selectedRekening.value?.biaya_transfer || 0;

if (provider.value && nominal.value >= provider.value.min_transaksi && nominal.value <= provider.value.max_transaksi) {
  return Math.floor(nominal.value * provider.value.rate) -biaya_transfer ;
}
return 0;
});

const confirmTransaction = async () => {
  isLoading.value = true; 
  try {
    const formData = new FormData();
    formData.append('tanggal', new Date().toISOString());
    formData.append('email', userEmail);
    formData.append('provider', provider.value?.name);
    formData.append('no_telepon', phoneNumber.value);
    formData.append('nominal', nominal.value);
    formData.append('bank', selectedRekening.value?.bank);
    
    if (selectedRekening.value?.kode_pembayaran !== "0") {
      formData.append('no_rekening', selectedRekening.value?.kode_pembayaran + selectedRekening.value?.no_rekening);
    } else {
      formData.append('no_rekening', selectedRekening.value?.no_rekening);
    }
    
    formData.append('nama_rekening', selectedRekening.value?.nama_rekening);
    formData.append('biaya_transfer', selectedRekening.value?.biaya_transfer);
    formData.append('total_diterima', calculatedSaldo.value);
    formData.append('status', 'Selesai');

    const response = await fetch('https://admin.cvpulsa.id/api/my_transactions/add', {
      method: 'POST',
      headers: {
        'X-Api-Key': '6B327B94169776D1096031DC73EF9F81',
      },
      body: formData,
    });

    if (response.ok) {
      const result = await response.json(); 
      

      const message = `
        \nNominal: Rp ${nominal.value.toLocaleString()}
        \nSaldo Diterima: Rp ${calculatedSaldo.value.toLocaleString()}
        \nNomor Pengirim: ${phoneNumber.value}
        \nConvert : ${provider.value?.name}
        \nNama : ${selectedRekening.value?.nama_rekening}
        \nRekening: ${selectedRekening.value?.bank} - ${selectedRekening.value?.kode_pembayaran != "0" ? selectedRekening.value?.kode_pembayaran + selectedRekening.value?.no_rekening : selectedRekening.value?.no_rekening}
      `;

      const whatsappUrl = `https://wa.me/${provider.value?.no_cs}?text=${encodeURIComponent(message)}`;

      window.open(whatsappUrl, '_blank');

      const updateFormData = new FormData();
      updateFormData.append('id', selectedRekening.value?.id);  
      updateFormData.append('status', 'Selesai');

      const res = await fetch(`https://admin.cvpulsa.id/api/my_transactions/update?id=${selectedRekening.value?.id}`, {
        method: 'POST',
        headers: {
          'X-Api-Key': '6B327B94169776D1096031DC73EF9F81',
        },
        body: updateFormData,  
      });

    } else {
      console.error('Transaction failed', response);
      alert('Terjadi kesalahan dalam transaksi.');
    }
  } catch (error) {
    console.error('Error in confirming transaction:', error);
    alert('Error saat menghubungi server.');
  } finally {
    isLoading.value = false;
    showModal.value = false;
  }
};


onMounted(() => {
getProviderById();
getRekening();
});
</script>

<style scoped>

.error {
color: red;
font-size: 0.75rem;
}
</style>