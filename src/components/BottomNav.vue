<template>
  <!-- component -->
  <div class="tw-w-full tw-max-w-md tw-fixed tw-mx-auto tw-bottom-0 tw-left-0 tw-right-0 ">
    <div class="tw-bg-white tw-shadow-lg tw-rounded-xl">
      <div class="tw-flex">
        <div :class="['tw-flex-1', isActive('home') ? 'tw-text-rose-500' : 'tw-text-gray-700']">
          <router-link
            to="/"
            class="tw-flex tw-items-center tw-justify-center tw-text-center tw-mx-auto tw-px-2 tw-pt-1 tw-w-full tw-border-b-2"
            :class="{ 'tw-border-rose-500': isActive('home'), 'tw-border-transparent': !isActive('home') }"
          >
            <span class="tw-block tw-px-1 tw-pt-1 tw-pb-1">
              <i class="far fa-home tw-text-xl tw-mb-0.5"></i>
              <span class="tw-block tw-text-xs">Home</span>
            </span>
          </router-link>
        </div>
        <div :class="['tw-flex-1', isActive('tutorial') ? 'tw-text-rose-500' : 'tw-text-gray-700']">
          <router-link
            to="/tutorial"
            class="tw-flex tw-items-center tw-justify-center tw-text-center tw-mx-auto tw-px-2 tw-pt-1 tw-w-full tw-border-b-2"
            :class="{ 'tw-border-rose-500': isActive('tutorial'), 'tw-border-transparent': !isActive('tutorial') }"
          >
            <span class="tw-block tw-px-1 tw-pt-1 tw-pb-1">
              <i class="far fa-compass tw-text-xl tw-mb-0.5"></i>
              <span class="tw-block tw-text-xs">Tutorial</span>
            </span>
          </router-link>
        </div>
        <div v-if="user" :class="['tw-flex-1', isActive('transaksi') ? 'tw-text-rose-500' : 'tw-text-gray-700']">
          <router-link
            to="/transaksi"
            class="tw-flex tw-items-center tw-justify-center tw-text-center tw-mx-auto tw-px-2 tw-pt-1 tw-w-full tw-border-b-2"
            :class="{ 'tw-border-rose-500': isActive('transaksi'), 'tw-border-transparent': !isActive('transaksi') }"
          >
            <span class="tw-block tw-px-1 tw-pt-1 tw-pb-1">
              <i class="far fa-file tw-text-xl tw-mb-0.5"></i>
              <span class="tw-block tw-text-xs">Transaksi</span>
            </span>
          </router-link>
        </div>
        <div v-if="user" :class="['tw-flex-1', isActive('profile') ? 'tw-text-rose-500' : 'tw-text-gray-700']">
          <router-link
            to="/profile"
            class="tw-flex tw-items-center tw-justify-center tw-text-center tw-mx-auto tw-px-2 tw-pt-1 tw-w-full tw-border-b-2"
            :class="{ 'tw-border-rose-500': isActive('profile'), 'tw-border-transparent': !isActive('profile') }"
          >
            <span class="tw-block tw-px-1 tw-pt-1 tw-pb-1">
              <i class="far fa-user tw-text-xl tw-mb-0.5"></i>
              <span class="tw-block tw-text-xs">Profile</span>
            </span>
          </router-link>
        </div>
        <!-- login -->
        <div v-if="!user" :class="['tw-flex-1', isActive('login') ? 'tw-text-rose-500' : 'tw-text-gray-700']">
          <router-link
            to="/login"
            class="tw-flex tw-items-center tw-justify-center tw-text-center tw-mx-auto tw-px-2 tw-pt-1 tw-w-full tw-border-b-2"
            :class="{ 'tw-border-rose-500': isActive('login'), 'tw-border-transparent': !isActive('login') }"
          >
            <span class="tw-block tw-px-1 tw-pt-1 tw-pb-1">
              <i class="far fa-sign-in tw-text-xl tw-mb-0.5"></i>
              <span class="tw-block tw-text-xs">Login</span>
            </span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const user = localStorage.getItem('user_email');

const isActive = (routeName) => {
  return route.name === routeName;
};
</script>

<style>
@import url(https://pro.fontawesome.com/releases/v5.10.0/css/all.css);
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;800&display=swap');

body {
    font-family: 'Poppins', sans-serif;
}

.hover\:tw-w-full:hover {
    width: 100%;
}

.group:hover .group-hover\:tw-w-full {
    width: 100%;
}

.group:hover .group-hover\:inline-block {
    display: inline-block;
}

.group:hover .group-hover\:flex-grow {
    flex-grow: 1;
}
</style>
