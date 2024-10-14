<template>
    <div class="tw-flex tw-items-center tw-mb-4 tw-w-full tw-justify-center tw-px-2 tw-bg-gray-50 tw-py-3 tw-border-b-2 tw-border-gray-200">
      <button @click="goBack" class="tw-flex tw-items-center tw-space-x-2 tw-text-gray-500 tw-text-sm tw-absolute tw-left-5">
        <svg xmlns="http://www.w3.org/2000/svg" class="tw-h-5 tw-w-5 tw-text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <h2 class="tw-font-medium tw-text-md tw-text-gray-900">Data Rekening</h2>
    </div>
  
    <div class="tw-max-w-full tw-px-4">
      <!-- Select Rekening -->
      <div class="tw-relative mb-4"> 
        <select v-model="selectedRekening" @change="populatePaymentData" class="tw-pl-10 tw-bg-gray-50 tw-w-[100%] tw-py-3 tw-border tw-rounded-lg">
          <option value="" disabled selected>Pilih rekening</option>
          <option v-for="item in metodepembayaran" :key="item.id" :value="item.id">{{ item.nama }}</option>
        </select>
      </div>
  
      <!-- Input for Nomor Akun/Wallet -->
      <div class="tw-relative mb-4"> 
        <input type="text" v-model="nomorAkun" class="tw-pl-10 tw-w-[100%] tw-py-3 tw-border tw-rounded-lg" placeholder="Nomor akun/wallet" />
      </div>
  
      <!-- Input for Atas Nama -->
      <div class="tw-relative mb-4"> 
        <input type="text" v-model="atasNama" class="tw-pl-10 tw-w-[100%] tw-py-3 tw-border tw-rounded-lg" placeholder="Atas Nama" />
      </div>
  
      <!-- Display Data from Selected Metode Pembayaran -->
     
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
  const paymentMethod = metodepembayaran.value.find(item => item.id === selectedRekening.value);
  
  if (paymentMethod) {
    selectedPaymentMethod.value = paymentMethod;
  } else {
    selectedPaymentMethod.value = null;
  }
};

  const userEmail = localStorage.getItem('user_email'); 
  const tambahData = async () => {
    if (!selectedRekening.value || !nomorAkun.value || !atasNama.value) {
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
    formData.append('id_pembayaran', selectedPaymentMethod.value?.id);
    formData.append('no_rekening', nomorAkun.value);
    formData.append('nama_rekening', atasNama.value);
    formData.append('bank', selectedPaymentMethod.value?.nama);
    formData.append('kode_pembayaran', selectedPaymentMethod.value?.kode);
    formData.append('biaya_transfer', selectedPaymentMethod.value?.biaya);
    formData.append('icon', selectedPaymentMethod.value?.icon);

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
  
  const goBack = () => {
    window.history.length > 1 ? window.history.back() : this.$router.push('/');
  };
  
  onMounted(() => {
    getMetodePembayaran();
  });
  </script>
  
  <style scoped></style>
  