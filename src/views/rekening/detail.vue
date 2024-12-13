<template>
  <TopNavigationBar2/>
  
  <div class="container md:tw-translate-y-28 tw-px-1 tw-translate-y-20">
    <!-- Select Rekening -->
    <div class="tw-relative mb-4"> 
      <select v-model="selectedRekening" @change="populatePaymentData" class="tw-pl-10 tw-bg-gray-50 tw-w-[100%] tw-py-3 tw-border tw-rounded-lg">
        <option :value="''" disabled>Pilih Metode Pembayaran</option>     
        <option v-for="item in metodepembayaran" :key="item.id" :value="item.id">{{ item.nama }}</option>
        <option value="1">Bank Lain</option>
      </select>
    </div>

    <div class="tw-relative mb-4"> 
      <input type="text" v-model="nomorAkun" class="tw-pl-10 tw-w-[100%] tw-py-3 tw-border tw-rounded-lg" placeholder="Nomor akun/wallet" />
    </div>
    <div class="tw-relative mb-4"> 
      <input type="text" v-model="atasNama" class="tw-pl-10 tw-w-[100%] tw-py-3 tw-border tw-rounded-lg" placeholder="Atas Nama" />
    </div>

    <div v-if="isBankLain" class="tw-relative mb-4">
      <input type="text" v-model="bankLain" class="tw-pl-10 tw-w-[100%] tw-py-3 tw-border tw-rounded-lg" placeholder="Nama Bank Lain" />
    </div>

    <!-- Save Button -->
    <div class="tw-flex tw-text-center tw-px-4 tw-mt-6">
      <button @click="editData" class="tw-mt-4 tw-w-full tw-py-2 tw-bg-red-600 tw-text-white tw-rounded-full">
        Simpan Perubahan
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import Swal from 'sweetalert2';
import { useRoute, useRouter } from 'vue-router';
import TopNavigationBar2 from '../../components/TopNavigationBar2.vue';

interface MetodePembayaran {
  id: any;
  nama: string;
  bank: string;
  kode_pembayaran: string;
  biaya_transfer: string;
  icon: string;
}

const route = useRoute();
const router = useRouter();
const metodepembayaran = ref<MetodePembayaran[]>([]);
const selectedRekening = ref<string | null>(null);
const selectedPaymentMethod = ref<MetodePembayaran | null>(null);
const nomorAkun = ref<string>('');
const atasNama = ref<string>('');
const bankLain = ref<string>(''); 
const isBankLain = ref<boolean>(false); 
const rekeningId = ref<string | null>(route.params.id || null);

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

const getBankDetail = async (id: string) => {
  try {
    const response = await fetch(`https://admin.cvpulsa.id/api/my_bank/detail?id=${id}`, {
      method: 'GET',
      headers: {
        'X-Api-Key': import.meta.env.VITE_API_KEY,
      },
    });

    if (response.ok) {
      const data = await response.json();
      nomorAkun.value = data.data.my_bank.no_rekening;
      atasNama.value = data.data.my_bank.nama_rekening;
      selectedRekening.value = data.data.my_bank.id_pembayaran;
      if (selectedRekening.value === '1') {
        isBankLain.value = true;
        bankLain.value = data.data.my_bank.bank;
      }
      populatePaymentData();
    }
  } catch (error) {
    console.error('Failed to fetch bank details:', error);
  }
};

const populatePaymentData = () => {
  if (selectedRekening.value === '1') {
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
const editData = async () => {
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
    formData.append('id', rekeningId.value);
    formData.append('email', userEmail);
    formData.append('id_pembayaran', isBankLain.value ? "1" : selectedPaymentMethod.value?.id);
    formData.append('no_rekening', nomorAkun.value);
    formData.append('nama_rekening', atasNama.value);
    formData.append('bank', isBankLain.value ? bankLain.value : selectedPaymentMethod.value?.nama);
    formData.append('kode_pembayaran', selectedPaymentMethod.value?.kode_pembayaran || '0');
    formData.append('biaya_transfer', isBankLain.value ? "2500" : selectedPaymentMethod.value?.biaya_transfer);
    formData.append('icon', isBankLain.value ? "20240920184317-2024-09-20my_metode_pembayaran184314.png" : selectedPaymentMethod.value?.icon);

    const response = await fetch(`https://admin.cvpulsa.id/api/my_bank/update?id=${rekeningId.value}`, {
      method: 'POST',
      headers: {
        'X-Api-Key': import.meta.env.VITE_API_KEY,
      },
      body: formData,
    });

    if (response.ok) {
      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Data berhasil diubah!',
      });
      router.push('/rekening'); // Assuming this is the correct route
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Terjadi kesalahan saat mengubah data!',
      });
    }
  } catch (error) {
    console.error('Error updating data:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Terjadi kesalahan pada server!',
    });
  }
};

onMounted(() => {
  getMetodePembayaran();
  if (rekeningId.value) {
    getBankDetail(rekeningId.value);
  }
});
</script>