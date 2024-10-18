<template>
  <TopNavigationBar2/>
  <div class="container md:tw-translate-y-28 tw-px-1 tw-translate-y-20">
    

    <div class="tw-max-w-full tw-px-4">
      <!-- Select Rekening -->
      <div class="tw-relative mb-4">
        <select v-model="selectedRekening" @change="populatePaymentData"
          class="tw-pl-10 tw-bg-gray-50 tw-w-full tw-py-3 tw-border tw-rounded-lg tw-pr-4">
          <option value="" disabled selected>Pilih rekening</option>
          <option v-for="item in metodepembayaran" :key="item.id" :value="item.id">{{ item.nama }}</option>
        </select>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="tw-absolute tw-left-3 tw-top-1/2 tw-transform tw--translate-y-1/2 tw-w-6 tw-h-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
        </svg>
      </div>
      <div v-if="selectedRekening == '1'" class="tw-relative mb-4">
        <label for="bankName" class="tw-block tw-mb-2 tw-text-sm">Nama Bank Baru</label>
        <input id="bankName" v-model="newBankName" type="text"
          class="tw-pl-10 tw-w-full tw-py-3 tw-border tw-rounded-lg tw-pr-4" placeholder="Masukkan nama bank baru" />
      </div>

      <div class="tw-relative mb-4">
        <input type="text" v-model="nomorAkun" class="tw-pl-10 tw-w-full tw-py-3 tw-border tw-rounded-lg tw-pr-4"
          placeholder="Nomor akun/wallet" />
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="tw-absolute tw-left-3 tw-top-1/2 tw-transform tw--translate-y-1/2 tw-w-6 tw-h-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
        </svg>
      </div>

      <div class="tw-relative mb-4">
        <input type="text" v-model="atasNama" class="tw-pl-10 tw-w-full tw-py-3 tw-border tw-rounded-lg tw-pr-4"
          placeholder="Atas Nama" />
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="tw-absolute tw-left-3 tw-top-1/2 tw-transform tw--translate-y-1/2 tw-w-6 tw-h-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
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
import TopNavigationBar2 from '../../components/TopNavigationBar2.vue';

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
const newBankName = ref<string>('');
const route = useRoute();
const router = useRouter();
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

  if (selectedRekening.value === 'new') {
    try {
      const bankResponse = await fetch(`https://admin.cvpulsa.id/api/my_bank/create`, {
        method: 'POST',
        headers: {
          'X-Api-Key': import.meta.env.VITE_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nama: newBankName.value,
        }),
      });

      if (bankResponse.ok) {
        const bankData = await bankResponse.json();
        selectedRekening.value = bankData.data.id;
        Swal.fire({
          icon: 'success',
          title: 'Bank Baru Ditambahkan',
          text: 'Bank baru berhasil ditambahkan.',
        });
      } else {
        const errorData = await bankResponse.json();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorData.message || 'Gagal menambahkan bank baru.',
        });
        return;
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Terjadi kesalahan saat menambah bank baru.',
      });
      return;
    }
  }

  const formData = new FormData();
  formData.append('id', rekeningId.value);
  formData.append('id_pembayaran', selectedRekening.value || oldData.id);
  formData.append('no_rekening', nomorAkun.value || oldData.no_rekening);
  formData.append('nama_rekening', atasNama.value || oldData.nama_rekening);
  formData.append('email', localStorage.getItem('user_email'));
  formData.append('bank', selectedPaymentMethod.value?.nama || oldData.bank);
  formData.append('kode_pembayaran', selectedPaymentMethod.value?.kode || oldData.kode_pembayaran);
  formData.append('biaya_transfer', selectedPaymentMethod.value?.biaya || oldData.biaya_transfer);
  formData.append('icon', selectedPaymentMethod.value?.icon || oldData.icon);

  try {
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
    } else {
      const responseData = await response.json();
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