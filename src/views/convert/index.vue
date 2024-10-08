<template>
    <div class="tw-w-full tw-p-4">
      <h2 class="tw-text-center tw-font-medium tw-mb-4">Convert Smartfreen</h2>
  
      <!-- Nominal Pulsa Yang Di Convert -->
      <label class="tw-block tw-mb-2 tw-text-sm tw-font-medium">Nominal Pulsa Yang Di Convert <span class="tw-text-red-500">*</span></label>
      <input v-model="nominal" type="number" placeholder="0" class="tw-w-full tw-border tw-rounded tw-p-2 tw-mb-2" />
      <p v-if="nominal < minConvert" class="tw-text-red-500 tw-text-sm">Minimal convert pulsa Rp {{ minConvert }}</p>
      <div v-else>cukup</div>
  
      <!-- Nomor Pengirim Pulsa -->
      <label class="tw-block tw-mb-2 tw-text-sm tw-font-medium">Nomor Pengirim Pulsa <span class="tw-text-red-500">*</span></label>
      <input v-model="phoneNumber" type="text" placeholder="081234xxxxxxx" class="tw-w-full tw-border tw-rounded tw-p-2 tw-mb-2" />
  
      <!-- Pilih Rekening -->
      <label class="tw-block tw-mb-2 tw-text-sm tw-font-medium">Pilih Rekening</label>
      <select class="tw-w-full tw-border tw-rounded tw-p-2 tw-mb-2">
        <option>Pilih Rekening</option>
        <!-- You can dynamically populate options here -->
      </select>
  
      <!-- Info Sisa Pulsa Setelah Transfer -->
      <label class="tw-block tw-mb-2 tw-text-sm tw-font-medium">Info Sisa Pulsa Setelah Transfer <span class="tw-text-red-500">*</span></label>
      <div class="tw-flex tw-items-center tw-mb-2">
        <span class="tw-text-gray-500 tw-pr-2">Rp</span>
        <input v-model="sisaPulsa" type="number" placeholder="0" class="tw-w-full tw-border tw-rounded tw-p-2" />
      </div>
  
      <!-- Checkbox -->
      <div class="tw-flex tw-items-center tw-mb-4">
        <input type="checkbox" id="confirm" v-model="isConfirmed" class="tw-mr-2" />
        <label for="confirm" class="tw-text-sm">Saya memastikan pulsa yang saya convert dari hasil yang benar dan aman.</label>
      </div>
  
      <!-- Saldo Diterima -->
      <div class="tw-flex tw-justify-between tw-items-center tw-mb-4">
        <p>Saldo Diterima</p>
        <p class="tw-font-bold">Rp {{ calculatedSaldo }}</p>
      </div>
  
      <!-- Submit Button -->
      <button
        :disabled="!isConfirmed || nominal < minConvert"
        @click="submitForm"
        class="tw-w-full tw-bg-rose-600 tw-text-white tw-font-medium tw-py-2 tw-rounded"
      >
        Selanjutnya
      </button>
    </div>
  </template>
 <script lang="ts" setup>
 import { ref, onMounted,computed } from 'vue';
 
 // Define minimal convert value and rate for calculation
 const minConvert = 30000;
 const rate = 0.8; // Assuming 80% is the rate to be applied
 
 // Define form data
 const nominal = ref(0);
 const phoneNumber = ref('');
 const sisaPulsa = ref(0);
 const isConfirmed = ref(false);
 
 // Compute the saldo based on the input nominal
 const calculatedSaldo = computed(() => {
   if (nominal.value >= minConvert) {
     return Math.floor(nominal.value * rate); 
   }
   return 0;
 });
 
 // Form submission handler
 const submitForm = () => {
   if (nominal.value >= minConvert && isConfirmed.value) {
     alert('Form submitted!');
     // Proceed with form submission logic here
   }
 };
 
 // Fetch provider data (mock example)
 onMounted(() => {
   getProviderById();
 });
 
 // Fetch provider details by ID (API call)
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
       console.log(data);
     } else {
       console.log('Unexpected response:', response);
     }
   } catch (error) {
     console.error('Failed to fetch provider:', error);
   }
 };
 </script>
 