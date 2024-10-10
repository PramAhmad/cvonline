<template>
    <div>
      <div class="tw-flex tw-items-center tw-mb-4 tw-w-full tw-justify-center tw-px-2 tw-bg-gray-50 tw-py-3 tw-border-b-2 tw-border-gray-200">
        <button @click="goBack" class="tw-flex tw-items-center tw-space-x-2 tw-text-gray-500 tw-text-sm tw-absolute tw-left-5">
          <svg xmlns="http://www.w3.org/2000/svg" class="tw-h-5 tw-w-5 tw-text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 class="tw-font-medium tw-text-md tw-text-gray-900">Edit Data Rekening</h2>
      </div>
  
      <div class="tw-max-w-full tw-px-4">
        <!-- Select Rekening -->
        <div class="tw-relative mb-4">
  <select v-model="selectedRekening" @change="populatePaymentData" class="tw-pl-10 tw-bg-gray-50 tw-w-full tw-py-3 tw-border tw-rounded-lg tw-pr-4">
    <option value="" disabled selected>Pilih rekening</option>
    <option v-for="item in metodepembayaran" :key="item.id" :value="item.id">{{ item.nama }}</option>
  </select>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="tw-absolute tw-left-3 tw-top-1/2 tw-transform tw--translate-y-1/2 tw-w-6 tw-h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
  </svg>
</div>

<!-- Input for Nomor Akun/Wallet -->
<div class="tw-relative mb-4">
  <input type="text" v-model="nomorAkun" class="tw-pl-10 tw-w-full tw-py-3 tw-border tw-rounded-lg tw-pr-4" placeholder="Nomor akun/wallet" />
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="tw-absolute tw-left-3 tw-top-1/2 tw-transform tw--translate-y-1/2 tw-w-6 tw-h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
  </svg>
</div>

<!-- Input for Atas Nama -->
<div class="tw-relative mb-4">
  <input type="text" v-model="atasNama" class="tw-pl-10 tw-w-full tw-py-3 tw-border tw-rounded-lg tw-pr-4" placeholder="Atas Nama" />
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="tw-absolute tw-left-3 tw-top-1/2 tw-transform tw--translate-y-1/2 tw-w-6 tw-h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
</div>

  
        <!-- Save Button -->
        <div class="tw-flex tw-text-center tw-px-4 tw-mt-6">
          <button @click="editData" class="tw-mt-4 tw-w-full tw-py-2 tw-bg-red-600 tw-text-white tw-rounded-full">
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import Swal from 'sweetalert2';
  import { useRoute, useRouter } from 'vue-router';
  
  interface MetodePembayaran {
    id: any;
    nama: string;
    bank: string;
    kode_pembayaran: any;
    biaya_transfer: any;
    icon: string;
  }
  
  const metodepembayaran = ref<MetodePembayaran[]>([]);
  const selectedRekening = ref<string | null>(null);
  const selectedPaymentMethod = ref<MetodePembayaran | null>(null);
  const nomorAkun = ref<string>('');
  const atasNama = ref<string>('');
  
  const route = useRoute();
  const router = useRouter();
  const rekeningId = ref<string | null>(route.params.id || null);
  
  const getMetodePembayaran = async () => {
    try {
      const response = await fetch(`https://admin.cvpulsa.id/api/my_metode_pembayaran/all`, {
        method: 'GET',
        headers: {
          'X-Api-Key': '6B327B94169776D1096031DC73EF9F81',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        metodepembayaran.value = data.data.my_metode_pembayaran;
      }
    } catch (error) {
      console.error('Failed to fetch provider:', error);
    }
  };
  
  const getBankDetail = async (id: string) => {
    try {
      const response = await fetch(`https://admin.cvpulsa.id/api/my_bank/detail?id=${id}`, {
        method: 'GET',
        headers: {
          'X-Api-Key': '6B327B94169776D1096031DC73EF9F81',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        nomorAkun.value = data.data.my_bank.no_rekening;
        atasNama.value = data.data.my_bank.nama_rekening;
        selectedRekening.value = data.data.my_bank.id_pembayaran;
        
        populatePaymentData();
      }
    } catch (error) {
      console.error('Failed to fetch bank details:', error);
    }
  };
  
  const populatePaymentData = () => {
  const paymentMethod = metodepembayaran.value.find(
    (item) => item.id === selectedRekening.value
  );
  selectedPaymentMethod.value = paymentMethod || null;

  console.log('Selected Payment Method:', selectedPaymentMethod.value); // Debugging line
};


  const isValid = () => {
    return selectedRekening.value && nomorAkun.value && atasNama.value;
  };
  
  const editData = async () => {
  if (!isValid()) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Harap isi semua data yang dibutuhkan!',
    });
    return;
  }

  // Handle old data (initialize oldData)
  const oldData = {
    id: rekeningId.value,
    no_rekening: nomorAkun.value,
    nama_rekening: atasNama.value,
    bank: selectedPaymentMethod.value?.nama || '', // Use empty strings as fallback
    kode_pembayaran: selectedPaymentMethod.value?.kode || '',
    biaya_transfer: selectedPaymentMethod.value?.biaya || '',
    icon: selectedPaymentMethod.value?.icon || '',
  };

  // Create formData and use fallback to oldData
  const formData = new FormData();
  formData.append('id', route.params.id);
  formData.append('id_pembayaran', selectedPaymentMethod.value?.id || oldData.id);
  formData.append('no_rekening', nomorAkun.value || oldData.no_rekening);
  formData.append('nama_rekening', atasNama.value || oldData.nama_rekening);
  formData.append('email', localStorage.getItem('user_email'));
  formData.append('bank', selectedPaymentMethod.value?.nama || oldData.bank); // fallback to old data
  formData.append('kode_pembayaran', selectedPaymentMethod.value?.kode || oldData.kode_pembayaran); // fallback
  formData.append('biaya_transfer', selectedPaymentMethod.value?.biaya || oldData.biaya_transfer); // fallback
  formData.append('icon', selectedPaymentMethod.value?.icon || oldData.icon); // fallback

  console.log('FormData Payload:', Object.fromEntries(formData));

  try {
    const response = await fetch(`https://admin.cvpulsa.id/api/my_bank/update?id=${rekeningId.value}`, {
      method: 'POST',
      headers: {
        'X-Api-Key': '6B327B94169776D1096031DC73EF9F81',
      },
      body: formData,
    });

    const responseData = await response.json();

    if (response.ok) {
      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Data berhasil diubah!',
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: responseData.message || 'Terjadi kesalahan saat mengubah data!',
      });
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Terjadi kesalahan saat mengubah data!',
    });
  }
};




  
  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      router.push('/');
    }
  };
  
  onMounted(() => {
    getMetodePembayaran();
    if (rekeningId.value) {
      getBankDetail(rekeningId.value);
    }
  });
  </script>
  