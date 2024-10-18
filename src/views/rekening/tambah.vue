<template>
  <TopNavigationBar2/>
  
  <div class="container md:tw-translate-y-28 tw-px-1 tw-translate-y-20">
    <!-- Select Rekening -->
    <div class="tw-relative mb-4"> 
      <!-- label -->
      <label for="metodePembayaran" class="tw-absolute tw-left-10 tw-top-1/2 tw-transform -tw-translate-y-1/2 tw-text-gray-500" 
    :class="{ 'tw-opacity-0': selectedRekening }">
    Pilih Metode Pembayaran
  </label>
      <select v-model="selectedRekening" @change="populatePaymentData" class="tw-pl-10 tw-bg-gray-50 tw-w-[100%] tw-py-3 tw-border tw-rounded-lg">
    
        <option :value="''" disabled selected>Pilih Metode Pembayaran</option>     
        <option v-for="item in metodepembayaran" :key="item.id" :value="item.id">{{ item.nama }}</option>
      </select>
        <!-- Option for 'Bank Lain' -->
    </div>

    <!-- Input for Nomor Akun/Wallet -->
    <div class="tw-relative mb-4"> 
      <input type="text" v-model="nomorAkun" class="tw-pl-10 tw-w-[100%] tw-py-3 tw-border tw-rounded-lg" placeholder="Nomor akun/wallet" />
    </div>

    <!-- Input for Atas Nama -->
    <div class="tw-relative mb-4"> 
      <input type="text" v-model="atasNama" class="tw-pl-10 tw-w-[100%] tw-py-3 tw-border tw-rounded-lg" placeholder="Atas Nama" />
    </div>

    <!-- Input for 'Bank Lain' if selected -->
    <div v-if="isBankLain" class="tw-relative mb-4">
      <input type="text" v-model="bankLain" class="tw-pl-10 tw-w-[100%] tw-py-3 tw-border tw-rounded-lg" placeholder="Nama Bank Lain" />
    </div>

    <!-- Save Button -->
    <div class="tw-flex tw-text-center tw-px-4 tw-mt-6">
      <button @click="tambahData" class="tw-mt-4 tw-w-full tw-py-2 tw-bg-red-600 tw-text-white tw-rounded-full">
        Simpan
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import Swal from 'sweetalert2';
import TopNavigationBar2 from '../../components/TopNavigationBar2.vue';

interface MetodePembayaran {
  id: any;
  nama: string;
  bank: string;
  kode_pembayaran: string;
  biaya_transfer: string;
  icon: string;
}

const metodepembayaran = ref<MetodePembayaran[]>([]);
const selectedRekening = ref<string | null>(null);
const selectedPaymentMethod = ref<MetodePembayaran | null>(null);
const nomorAkun = ref<string>('');
const atasNama = ref<string>('');
const bankLain = ref<string>(''); // For 'Bank Lain'
const isBankLain = ref<boolean>(false); // State to show/hide the 'Bank Lain' input

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

const userEmail = localStorage.getItem('user_email');
const tambahData = async () => {
  if (!selectedRekening.value || !nomorAkun.value || !atasNama.value || (isBankLain.value && !bankLain.value)) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Harap isi semua data yang dibutuhkan!',
    });
    return;
  }

  try {
    const formData = new FormData();
    formData.append('email', userEmail);
    formData.append('id_pembayaran', isBankLain.value ? 'bankLain' : selectedPaymentMethod.value?.id);
    formData.append('no_rekening', nomorAkun.value);
    formData.append('nama_rekening', atasNama.value);
    formData.append('bank', isBankLain.value ? bankLain.value : selectedPaymentMethod.value?.nama);
    formData.append('kode_pembayaran', selectedPaymentMethod.value?.kode_pembayaran || '');
    formData.append('biaya_transfer', selectedPaymentMethod.value?.biaya_transfer || '');
    formData.append('icon', selectedPaymentMethod.value?.icon || '');

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
  getMetodePembayaran();
});
</script>
