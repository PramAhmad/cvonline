<template>
  <TopNavigationBar2/>
  <form @submit.prevent="submitForm" class="tw-w-full md:tw-translate-y-28 tw-px-1 tw-translate-y-20 container">

    
    <div class="tw-w-full tw-p-4">
      <label class="tw-block tw-mb-2 tw-text-sm tw-font-medium">Nominal Pulsa Yang Di Convert <span class="tw-text-red-500">*</span></label>
      <div class="tw-flex tw-max-w-full ">
        <input
      v-model="formattedNominal"
      @input="formatNumber"
      placeholder="0"
      class="tw-w-full tw-border tw-rounded tw-p-2 tw-mb-2 tw-my-5"
    />
      </div>
      <p v-if="nominal < provider?.min_transaksi" class="tw-text-red-500 tw-text-sm tw-my-2">
        Minimal convert pulsa {{ formatCurrency(provider?.min_transaksi) }}
      </p>
      <p v-if="nominal > provider?.max_transaksi" class="tw-text-red-500 tw-text-sm tw-my-2">
        Maksimal convert pulsa {{ formatCurrency(provider?.max_transaksi) }}
      </p>
      
      <div v-else-if="nominal >= provider?.min_transaksi && nominal <= provider?.max_transaksi">
        <div class="tw-flex tw-justify-between tw-items-center tw-mb-4 tw-py-2 tw-px-3 tw-rounded-md tw-bg-[#EBFBFF]">
          <h5 class="tw-text-[#000000] tw-font-medium">Rate <span class="tw-font-semibold">{{ provider?.rate }}</span></h5>
          <h5 class="tw-text-[#000000] tw-font-medium">Saldo Diterima <span class="tw-font-semibold">{{ formattedSaldoDiterima }}</span></h5>
        </div>
      </div>
  
      <label class="tw-block tw-mb-2 tw-text-sm tw-font-medium">Nomor Pengirim Pulsa <span class="tw-text-red-500">*</span></label>
      <input v-model="phoneNumber" type="number" placeholder="081234xxxxxxx" class="tw-w-full tw-border tw-rounded tw-p-2 tw-mb-2" />
      <span v-if="errorMessages.phoneNumber" class="tw-text-red-500 tw-text-sm">{{ errorMessages.phoneNumber }}</span>
    
      <label class="tw-block tw-mb-2 tw-text-sm tw-font-medium">Pilih Rekening</label>
      <select v-model="selectedRekening" class="tw-w-full tw-border tw-rounded tw-p-2 tw-mb-1 tw-bg-gray-50">
        <option disabled>Pilih Rekening</option>
        <option v-for="rek in rekening" :key="rek.id" :value="rek">
          {{ rek.bank }}  - {{ rek.no_rekening }}
        </option>
        <option value="tambahrek">
          Tambah Rekening
        </option>
      </select>
      <span v-if="errorMessages.selectedRekening" class="tw-text-red-500 tw-text-sm">{{ errorMessages.selectedRekening }}</span>
  
      <label class="tw-block tw-mb-2 tw-text-sm tw-font-medium">Info Sisa Pulsa Setelah Transfer <span class="tw-text-red-500">*</span></label>
      <div class="tw-flex tw-items-center tw-mb-2">
      
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
      <p><strong>Rekening:</strong> {{ selectedRekening.bank }} - {{ selectedRekening.no_rekening }}</p>
      <p><strong>Nama Penerima:</strong> {{ selectedRekening.nama_rekening }}</p>
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
  <div v-if="modalRekening" class="tw-fixed tw-inset-0 tw-flex tw-items-center tw-justify-center tw-bg-gray-800 tw-bg-opacity-75">
  <div class="tw-bg-white tw-rounded-lg tw-shadow-lg tw-p-6 tw-w-full tw-max-w-md relative">
    <!-- Close Button -->
  

    <div class="tw-flex tw-items-center tw-justify-between">

    <h3 class="tw-text-lg tw-font-semibold tw-mb-4">Tambah Rekening</h3>
    <!-- close button -->
    <button @click="modalRekening = false" class="mb-3">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="tw-w-6 tw-h-6">
    close
    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
</button>
    </div>
    <div class="tw-relative mb-4"> 
      <label for="metodePembayaran" class="tw-absolute tw-left-10 tw-top-1/2 tw-transform -tw-translate-y-1/2 tw-text-gray-500" 
    :class="{ 'tw-opacity-0': selectedRekening }">
    Pilih Metode Pembayaran
  </label>
      <select v-model="selectedRekening" @change="populatePaymentData" class="tw-pl-10 tw-bg-gray-50 tw-w-[100%] tw-py-3 tw-border tw-rounded-lg">
    
        <option :value="''" disabled selected>Pilih Metode Pembayaran</option>     
        <option v-for="item in metodepembayaran" :key="item.id" :value="item.id">{{ item.nama }}</option>
      </select>
    </div>
    <div v-if="isBankLain" class="tw-relative mb-4">
      <input type="text" v-model="bankLain" class="tw-pl-10 tw-w-[100%] tw-py-3 tw-border tw-rounded-lg" placeholder="Nama Bank Lain" />
    </div>

    <div class="tw-relative mb-4"> 
      <input type="text" v-model="nomorAkun" class="tw-pl-10 tw-w-[100%] tw-py-3 tw-border tw-rounded-lg" placeholder="Nomor akun/wallet" />
    </div>
    <div class="tw-relative mb-4"> 
      <input type="text" v-model="atasNama" class="tw-pl-10 tw-w-[100%] tw-py-3 tw-border tw-rounded-lg" placeholder="Atas Nama" />
    </div>

   
    <!-- Save Button -->
    <div class="tw-flex tw-text-center tw-px-4 tw-mt-6">
      <button @click="tambahDataRekening" class="tw-mt-4 tw-w-full tw-py-2 tw-bg-red-600 tw-text-white tw-rounded-full">
        Simpan
      </button>
    </div>
  </div>
</div>

</template>


<script lang="ts" setup>

import { ref, onMounted, computed,watch } from 'vue';
import { useRoute } from 'vue-router';
import InputNumber from 'primevue/inputnumber';
import Swal from 'sweetalert2';
import TopNavigationBar2 from '../../components/TopNavigationBar2.vue';



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
interface MetodePembayaran {
    id: any;
    nama: string;
    bank: string;
    kode_pembayaran: any;
    biaya_transfer: string;
    icon: string;
    kode:any;
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
const selectedRekening = ref<string | null>(null);
const isLoading = ref(false);
const modalRekening = ref(false)
const metodepembayaran = ref<MetodePembayaran[]>([]);
const nomorAkun = ref()
const atasNama = ref()
const selectedPaymentMethod = ref<MetodePembayaran | null>(null);
const formattedNominal = ref<string>('');
const bankLain = ref<string>(''); 
const isBankLain = ref<boolean>(false); 


const formatCurrency = (value: number) => {
return new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  minimumFractionDigits: 0
}).format(value);
};
const formatNumber = (e: any) => {
  const input = e.target.value.replace(/[^0-9]/g, ''); 
  nominal.value = parseFloat(input) || null;

  formattedNominal.value = input
    ? parseFloat(input).toLocaleString('id-ID') 
    : '';
};

watch(nominal, (newVal) => {
  formattedNominal.value = newVal?.toLocaleString('id-ID') || '';
});

const formattedSaldoDiterima = computed(() => formatCurrency(calculatedSaldo.value));



const getRekening = async () => {
try {
  const response = await fetch(`https://admin.cvpulsa.id/api/my_bank/all?filter=${userEmail}`, {
    method: 'GET',
    headers: {
      'X-Api-Key': import.meta.env.VITE_API_KEY,
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
      'X-Api-Key': import.meta.env.VITE_API_KEY,
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
const getMetodePembayaran = async () => {
    try {
      const response = await fetch(`https://admin.cvpulsa.id/api/my_metode_pembayaran/all`, {
        method: 'GET',
        headers: {
          'X-Api-Key': import.meta.env.VITE_API_KEY,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        metodepembayaran.value = data.data.my_metode_pembayaran;
      } else {
        console.log('Unexpected response:', response);
      }
    } catch (error) {
      console.error('Failed to fetch provider:', error);
    }
  };

  const calculateFee = (nominal: number) => {
  let mandatoryBalance = 0;

  switch (provider.value?.name) {
    case 'Telkomsel':
      mandatoryBalance = 2000; // Sisa pulsa wajib for Telkomsel
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
      mandatoryBalance = 5000; // Sisa pulsa wajib for XL/Axis
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
      mandatoryBalance = 5000; // Sisa pulsa wajib for Three (updated)
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
        case nominal >= 600001 && nominal <= 800000:
          sisaPulsa.value = 16000;
          break;
        case nominal >= 800001 && nominal <= 1000000:
          sisaPulsa.value = 20000;
          break;
        default:
          sisaPulsa.value = 0;
      }
      break;
    case 'Smartfreen':
      mandatoryBalance = 5000; // Sisa pulsa wajib for Smartfreen
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
    case 'Im3': 
      mandatoryBalance = 5000; // Sisa pulsa wajib for Im3
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
        case nominal >= 600001 && nominal <= 800000:
          sisaPulsa.value = 16000;
          break;
        case nominal >= 800001 && nominal <= 1000000:
          sisaPulsa.value = 20000;
          break;
        default:
          sisaPulsa.value = 0;
      }
      break;
    default:
      sisaPulsa.value = 0;
  }

  sisaPulsa.value += mandatoryBalance;

  sisaPulsa.value = sisaPulsa.value.toLocaleString('id-ID');
  
  return parseFloat(sisaPulsa.value);
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

watch(selectedRekening,(value)=>{
  if(value ===  'tambahrek'){
    modalRekening.value = true
  }
})
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
  console.log(selectedRekening.value?.kode_pembayaran)
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
        'X-Api-Key': import.meta.env.VITE_API_KEY,
      },
      body: formData,
    });

    if (response.ok) {
      const result = await response.json(); 
      

      const message = `
Nominal :  ${nominal.value.toLocaleString()}
Diterima: Rp ${calculatedSaldo.value.toLocaleString()}
Nomer   : ${phoneNumber.value}
Convert : ${provider.value?.name}
Nama    : ${selectedRekening.value?.nama_rekening}
Rek     : ${selectedRekening.value?.bank} - ${selectedRekening.value?.kode_pembayaran !== "0" ? selectedRekening.value?.kode_pembayaran + selectedRekening.value?.no_rekening : selectedRekening.value?.no_rekening}
            `;
     const wa = provider.value?.no_cs;

const formattedNumber = wa?.startsWith('0') ? wa.replace(/^0/, '62') : wa;

const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`;

      window.open(whatsappUrl, '_blank');

      const updateFormData = new FormData();
      updateFormData.append('id', selectedRekening.value?.id);  
      updateFormData.append('status', 'Selesai');

      const res = await fetch(`https://admin.cvpulsa.id/api/my_transactions/update?id=${selectedRekening.value?.id}`, {
        method: 'POST',
        headers: {
          'X-Api-Key': import.meta.env.VITE_API_KEY,
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


const populatePaymentData = () => {
  if (selectedRekening.value == '1') {
    isBankLain.value = true;
    selectedPaymentMethod.value = null;
  } else {
    isBankLain.value = false;
    const paymentMethod = metodepembayaran.value.find(item => item.id === selectedRekening.value);
    if (paymentMethod) {
      selectedPaymentMethod.value = paymentMethod;
    } else {
      selectedPaymentMethod.value = null;
    }
  }
};

const tambahDataRekening = async () => {
  if (!selectedRekening.value || !nomorAkun.value || !atasNama.value || (isBankLain.value && !bankLain.value)) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Harap isi semua data yang dibutuhkan!',
    });
    return;
  }
// console.log(selectedPaymentMethod.value)
  try {
    const formData = new FormData();
    formData.append('email', userEmail);
    formData.append('id_pembayaran', isBankLain.value ?  "1" : selectedPaymentMethod.value?.id);
    formData.append('no_rekening', nomorAkun.value);
    formData.append('nama_rekening', atasNama.value);
    formData.append('bank', isBankLain.value ? bankLain.value : selectedPaymentMethod.value?.nama);
    formData.append('kode_pembayaran', selectedPaymentMethod.value?.kode);
    formData.append('biaya_transfer', selectedPaymentMethod.value?.biaya_transfer || '0');
    formData.append('icon', selectedPaymentMethod.value?.icon || '-');

    const response = await fetch(`https://admin.cvpulsa.id/api/my_bank/add`, {
      method: 'POST',
      headers: {
        'X-Api-Key': import.meta.env.VITE_API_KEY,
      },
      body: formData,
    });

    if (response.ok) {
      const result = await response.json();
      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Data berhasil disimpan!',
      });
      nomorAkun.value = '';
      atasNama.value = '';
      selectedRekening.value = null;
      selectedPaymentMethod.value = null;
      bankLain.value = '';
      isBankLain.value = false;
      // close modal
      modalRekening.value = false;  
      getRekening();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Terjadi kesalahan saat menyimpan data!',
      });
    }
  } catch (error) {
    console.error('Error saving data:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Terjadi kesalahan pada server!',
    });
  }
};
  


onMounted(() => {
getProviderById();
getRekening();
getMetodePembayaran()
const calnominal = localStorage.getItem('nominal');
const exptime = localStorage.getItem('nominal_expiry');
const curent = new Date().getTime();

console.log(calnominal)
if(curent < parseInt(exptime)){
  nominal.value = parseInt(calnominal)
}
  });
</script>

<style scoped>

.error {
color: red;
font-size: 0.75rem;
}
</style>