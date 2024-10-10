<template>
    <div class="tw-flex tw-items-center tw-mb-4 tw-w-full tw-justify-center tw-px-2 tw-bg-gray-50 tw-py-3 tw-border-b-2 tw-border-gray-200">
  <button @click="goBack" class="tw-flex tw-items-center tw-space-x-2 tw-text-gray-500 tw-text-sm tw-absolute tw-left-5">
    <svg xmlns="http://www.w3.org/2000/svg" class="tw-h-5 tw-w-5 tw-text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
    </svg>
  </button>
  <h2 class="tw-font-medium tw-text-md tw-text-gray-900">Data Rekening</h2>
</div>

    
    <!-- List Rekening -->
    <main class="tw-py-10 tw-pb-20 tw-px-1">
      <div v-for="item in rekening" :key="item.id" class="tw-w-full tw-px-4 tw-py-3 tw-bg-white tw-flex tw-justify-between tw-items-center tw-rounded-lg tw-border-2 tw-border-gray-100 tw-mb-4">
        <div class="tw-flex tw-items-center">
          <img :src="`https://admin.cvpulsa.id/uploads/my_metode_pembayaran/`+item.icon" alt="icon" class="tw-h-10 tw-w-10 tw-mr-3">
         <div class="tw-flex tw-items-center tw-justify-around">
          <div class="">
            <h4 class="tw-font-semibold tw-text-gray-950 tw-pr-4">{{ item.bank }}</h4>
            
          </div>
          <div>
            <p class="tw-text-gray-800">{{ item.no_rekening }}</p>
            <p class="tw-text-gray-800">{{ item.nama_rekening }}</p>
          </div>
         </div>
        </div>
        <button @click="openModal(item)" class="tw-text-gray-900">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="tw-size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
  </svg>
</button>
      </div>
  
      <div class="tw-flex tw-text-center">
        <router-link to="/rekening/tambah" class="tw-mt-4 tw-w-full tw-py-2 tw-bg-red-600 tw-text-white tw-rounded-full">
          Tambah
        </router-link>
      </div>
    </main>
  
    <!-- Modal untuk Edit/Hapus -->
    <div v-if="isModalOpen" class="tw-fixed tw-inset-0 tw-flex tw-justify-center tw-items-end tw-bg-black tw-bg-opacity-50" @click="closeModal">
      <div class="tw-w-full tw-bg-white tw-rounded-t-lg tw-p-6 tw-py-10" @click.stop>
        <h3 class="tw-text-center tw-font-medium tw-text-lg tw-mb-2 tw-text-gray-950">Data Akun/ E-Wallet</h3>
        <hr>
        <div class="tw-w-full tw-px-4 tw-py-3 tw-bg-white tw-my-10 tw-flex tw-justify-between tw-items-center tw-rounded-lg tw-border-2 tw-border-gray-100">
          <div class="tw-flex tw-items-center">
            <img :src="`https://admin.cvpulsa.id/uploads/my_metode_pembayaran/`+selectedRekening.icon" alt="icon" class="tw-h-10 tw-w-10 tw-mr-3">
            <div class="tw-mr-5">
              <h4 class="tw-font-semibold  tw-text-gray-950 tw-pr-4">{{ selectedRekening.bank }}</h4>
              <p class="tw-text-[0.7rem] tw-text-green-600">Biaya {{ selectedRekening.biaya_transfer }}</p>
            </div>
            <div>
              <p class="tw-text-gray-800">{{ selectedRekening.no_rekening }}</p>
              <p class="tw-text-gray-800">{{ selectedRekening.nama_rekening }}</p>
            </div>
          </div>
        </div>
  
        <!-- Tombol Edit dan Hapus -->
        <div class="tw-flex tw-justify-between tw-gap-5">
          <button @click="editRekening" class="tw-bg-gray-200 tw-px-4 tw-py-2 tw-rounded-full tw-w-1/2">Edit</button>
          <button @click="deleteRekening" class="tw-bg-red-600 tw-text-white tw-px-4 tw-w-1/2 tw-py-2 tw-rounded-full">Hapus</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  interface Rekening {
    id: number;
    icon: string;
    nama_rekening: string;
    bank: string;
    biaya_transfer: number;
    no_rekening: string;
    kode: string;
  }
  
  const rekening = ref<Rekening[]>([]);
  const selectedRekening = ref<Rekening | null>(null);
  const userEmail = localStorage.getItem('user_email');
  const isModalOpen = ref(false);
  const router = useRouter();
  
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
        console.log('Rekening:', rekening.value);
      } else {
        console.log('Unexpected response:', response);
      }
    } catch (error) {
      console.error('Failed to fetch rekening:', error);
    }
  };
  
  const openModal = (item: Rekening) => {
    selectedRekening.value = item;
    isModalOpen.value = true;
  };
  
  const closeModal = () => {
    isModalOpen.value = false;
  };
  
  const editRekening = () => {
    if (selectedRekening.value) {
      router.push(`/rekening/${selectedRekening.value.id}`);
    }
    closeModal();
  };
  
  const deleteRekening = async () => {
    const formData = new FormData();
    formData.append('id', selectedRekening.value?.id.toString() || '');
    if (selectedRekening.value) {
      try {
        const response = await fetch(`https://admin.cvpulsa.id/api/my_bank/delete?id=${selectedRekening.value.id}`, {
          method: 'POST',
          headers: {
            'X-Api-Key': '6B327B94169776D1096031DC73EF9F81',
          },
          body: formData,
        });
  
        if (response.ok) {
          console.log(`Rekening with ID ${selectedRekening.value.id} deleted successfully.`);
          rekening.value = rekening.value.filter(item => item.id !== selectedRekening.value?.id);
          closeModal();
        } else {
          console.log('Failed to delete rekening.');
        }
      } catch (error) {
        console.error('Error during deletion:', error);
      }
    }
  };
  
  const goBack = () => {
    window.history.length > 1 ? window.history.back() : router.push('/');
  };
  
  onMounted(() => {
    getRekening();
  });
  </script>
  