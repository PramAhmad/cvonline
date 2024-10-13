<template>
    <div ref="header" class="sticky-header tw-flex tw-items-center tw-mb-4 tw-w-full tw-justify-center tw-px-2 tw-bg-gray-50 tw-py-3 tw-border-b-2 tw-border-gray-200">
    <!-- Button to go back -->
    <button @click="goBack" class="tw-flex tw-items-center tw-space-x-2 tw-text-gray-500 tw-text-sm tw-absolute tw-left-5">
      <svg xmlns="http://www.w3.org/2000/svg" class="tw-h-5 tw-w-5 tw-text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <h2 class="tw-font-medium tw-text-md tw-text-gray-900">Pengaduan Penggunaan Aplikasi</h2>
  </div>
    <div class="tw-py-6 tw-px-4">
     
      <div v-for="step in steps" :key="step.urutan" class="tw-flex tw-py-4 tw-border-b">
        <img :src="step.image" alt="" class="tw-w-1/2 tw-rounded-md tw-mr-4"/>
        <div class="tw-flex-1">
          <h2 class="tw-text-md tw-font-semibold tw-mb-2">{{ step.urutan }}. {{ step.title }}</h2>
          <p class="tw-text-gray-700">{{ step.description }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import step1 from '@/assets/images/panduan/tutor 1.png'
  import step2 from '@/assets/images/panduan/tutor 2.png'
  import step3 from '@/assets/images/panduan/tutor 3.png'
  import step4 from '@/assets/images/panduan/tutor 4.png'
  import step5 from '@/assets/images/panduan/tutor 5.png'
  import step6 from '@/assets/images/panduan/tutor 6.png'
  import step7 from '@/assets/images/panduan/tutor 7.png'
  import step8 from '@/assets/images/panduan/tutor 8.png'
  import step9 from '@/assets/images/panduan/tutor 9.png'
  
  interface Step {
      title: string;
      urutan: number;
      image: string;
      description: string;
  }
  
  const steps: Step[] = [
      {
          title: 'Pilih Provider yang akan di convert',
          urutan: 1,
          image: step1,
          description: 'Silahkan pilih provider kartu yang akan tukarkan menjadi saldo'
      },
      {
          title: 'Isi data form convert pulsa',
          urutan: 2,
          image: step2,
          description: 'Silahkan isi data formulir convert pulsa yang benar dan sesuai'
      },
      {
          title: 'Pilih tambah rek pembayaran',
          urutan: 3,
          image: step3,
          description: 'Silahkan pilih rekening pembayaran yang diinginkan'
      },
      {
            title: 'Konfirmasi data convert pulsa',
            urutan: 4,
            image: step4,
            description: 'Pastikan data convert pulsa yang diisi sudah benar'
        },
        {
            title: 'Klik tombol convert sekarang',
            urutan: 5,
            image: step5,
            description: 'Klik tombol convert sekarang untuk melanjutkan proses convert pulsa'
        },
        {
            title: 'Tunggu proses convert pulsa',
            urutan: 6,
            image: step6,
            description: 'Tunggu proses convert pulsa hingga selesai'
        },
        {
            title: 'Cek saldo diterima',
            urutan: 7,
            image: step7,
            description: 'Cek saldo yang diterima setelah proses convert pulsa selesai'
        },
        {
            title: 'Selesai',
            urutan: 8,
            image: step8,
            description: 'Proses convert pulsa telah selesai'
        },
        {
            title: 'Hubungi CS jika ada kendala',
            urutan: 9,
            image: step9,
            description: 'Hubungi customer service jika ada kendala dalam proses convert pulsa'
      }
  ];
  const router = useRouter();
  const goBack = () => {
        router.go(-1);
};

  </script>
  
  <style scoped>
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