<template>
  <div class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-w-full tw-min-h-screen tw-bg-white">
    <img :src="logo" alt="CV Pulsa Logo" class="tw-w-24 tw-h-24 tw-mb-6" />
    <h1 class="tw-text-xl tw-font-semibold tw-mb-2 tw-text-gray-800 tw-text-center">
      Selamat datang
    </h1>
    <p class="tw-text-center tw-text-gray-600 tw-mb-6">
      Tukar pulsa jadi saldo aman dan terpercaya, ingat convert pulsa ingat cvpulsa
    </p>
    <div class="tw-space-y-4 tw-w-4/5 sm:tw-w-1/3">
      <button
        @click="signInWithGoogle"
        class="tw-w-full tw-flex tw-items-center tw-justify-center tw-py-3 tw-border tw-border-red-500 tw-text-red-500 tw-rounded-full tw-shadow-md hover:tw-bg-red-500 hover:tw-text-white tw-transition-all"
      >
        <i class="far fa-google tw-mr-2"></i> Masuk dengan Google
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { auth, provider, signInWithRedirect, getRedirectResult } from '@/firebase';
import logo from '@/assets/images/logo_bulat.png';

const router = useRouter();

const signInWithGoogle = async () => {
  try {
    await signInWithRedirect(auth, provider);
  } catch (error) {
    console.error('Google Sign-In Error:', error);
  }
};

onMounted(async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      const user = result.user;
      const email = user.email;
      localStorage.setItem('user_email', email);
      router.push('/');
    }
  } catch (error) {
    console.error('Error after redirect:', error);
  }
});
</script>
