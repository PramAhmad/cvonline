<template>
    <TopNavigationBar2 style="margin-bottom: 3rem" />
 

  <!-- List Rekening -->
  <main class="container tw-pb-20 md:tw-translate-y-28 tw-px-1 tw-translate-y-20">
    <div v-if="isLoading" class="tw-space-y-4">
      <!-- Skeleton loader for each list item -->
      <div v-for="n in 3" :key="n" class="tw-w-full tw-px-4 tw-py-3 tw-bg-white tw-flex tw-justify-between tw-items-center tw-rounded-lg tw-border-2 tw-border-gray-100 tw-mb-4">
        <div class="tw-flex tw-items-center">
          <div class="tw-w-10 tw-h-10 tw-bg-gray-200 tw-rounded-full tw-mr-3"></div>
          <div class="tw-space-y-2">
            <div class="tw-h-4 tw-w-24 tw-bg-gray-200 tw-rounded"></div>
            <div class="tw-h-4 tw-w-32 tw-bg-gray-200 tw-rounded"></div>
          </div>
        </div>
        <div class="tw-h-6 tw-w-6 tw-bg-gray-200 tw-rounded"></div>
      </div>
    </div>

    <div class="" v-else >
      <div v-for="item in rekening" :key="item.id" class="tw-w-full  tw-px-4 tw-py-3 tw-bg-white tw-flex tw-justify-between tw-items-center tw-rounded-lg tw-border-2 tw-border-gray-100 tw-mb-4">
        <div class="tw-flex tw-items-center">
          <img :src="`https://admin.cvpulsa.id/uploads/my_metode_pembayaran/` + item.icon" alt="icon" class="tw-h-10 tw-w-10 tw-mr-3" />
          <div class="tw-flex tw-items-center tw-justify-around">
            <div>
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
    </div>

    <div class="tw-flex tw-text-center  tw-top-20">
      <router-link to="/rekening/tambah" class="tw-mt-4 tw-w-full tw-py-2 tw-bg-red-600 tw-text-white tw-rounded-full">
        Tambah
      </router-link>
    </div>
  </main>

  <!-- Modal for Edit/Delete -->
  <div v-if="isModalOpen" class="tw-fixed tw-bottom-16 tw-inset-0 tw-flex tw-justify-center tw-items-end tw-bg-black tw-bg-opacity-50" @click="closeModal">
    <div class="tw-w-full container tw-bg-white tw-rounded-t-lg tw-p-6 tw-py-10" @click.stop>
      <h3 class="tw-text-center tw-font-medium tw-text-lg tw-mb-2 tw-text-gray-950">Data Akun/ E-Wallet</h3>
      <hr />
      <div class="tw-w-full tw-px-4 tw-py-3 tw-bg-white tw-my-10 tw-flex tw-justify-between tw-items-center tw-rounded-lg tw-border-2 tw-border-gray-100">
        <div class="tw-flex tw-items-center">
          <img :src="`https://admin.cvpulsa.id/uploads/my_metode_pembayaran/` + selectedRekening.icon" alt="icon" class="tw-h-10 tw-w-10 tw-mr-3" />
          <div class="tw-mr-5">
            <h4 class="tw-font-semibold tw-text-gray-950 tw-pr-4">{{ selectedRekening.bank }}</h4>
            <p class="tw-text-[0.7rem] tw-text-green-600">Biaya {{ selectedRekening.biaya_transfer }}</p>
          </div>
          <div>
            <p class="tw-text-gray-800">{{ selectedRekening.no_rekening }}</p>
            <p class="tw-text-gray-800">{{ selectedRekening.nama_rekening }}</p>
          </div>
        </div>
      </div>

      <!-- Edit and Delete Buttons -->
      <div class="tw-flex tw-justify-between tw-gap-5">
        <button @click="editRekening" class="tw-bg-gray-200 tw-px-4 tw-py-2 tw-rounded-full tw-w-1/2">Edit</button>
        <button @click="deleteRekening" class="tw-bg-red-600 tw-text-white tw-px-4 tw-w-1/2 tw-py-2 tw-rounded-full">Hapus</button>
      </div>
    </div>
  </div>
  <BottomNav/>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import BottomNav from '../../components/BottomNav.vue';

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
const isModalOpen = ref(false);
const isLoading = ref(true);
const userEmail = localStorage.getItem('user_email');
const router = useRouter();

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
    console.error('Failed to fetch rekening:', error);
  } finally {
    isLoading.value = false;
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
  if (selectedRekening.value) {
    try {
      const response = await fetch(`https://admin.cvpulsa.id/api/my_bank/delete?id=${selectedRekening.value.id}`, {
        method: 'POST',
        headers: {
          'X-Api-Key': import.meta.env.VITE_API_KEY,
        },
      });

      if (response.ok) {
        rekening.value = rekening.value.filter(item => item.id !== selectedRekening.value?.id);
        closeModal();
      } else {
        console.log('Failed to delete rekening:', response);
      }
    } catch (error) {
      console.error('Failed to delete rekening:', error);
    }
  }
};

const goBack = () => {
  router.go(-1);
};

onMounted(() => {
  getRekening();
});
</script>

<style scoped>
  /* Add styles for skeleton loader */
  .tw-skeleton-loader {
    background-color: #e2e8f0;
    background-image: linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0));
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }

  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
  .sticky-header {
    position: sticky;
    top: 0;
    z-index: 50;
    transition: box-shadow 0.3s ease-in-out;
  }
  
  .tw-shadow-lg {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
</style>
