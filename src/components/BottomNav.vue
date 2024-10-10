<template>
    <!-- component -->
    <div class="tw-w-full tw-max-w-md tw-fixed tw-mx-auto tw-bottom-0 tw-left-0 tw-right-0 tw-mb-5">
      <div class="tw-bg-white tw-shadow-lg tw-rounded-2xl">
        <div class="tw-flex">
          <div :class="['tw-flex-1', isActive('home') ? 'tw-text-rose-500' : 'tw-text-gray-700']">
            <router-link
              to="/"
              class="tw-flex tw-items-end tw-justify-center tw-text-center tw-mx-auto tw-px-4 tw-pt-2 tw-w-full tw-border-b-2"
              :class="{ 'tw-border-rose-500': isActive('home'), 'tw-border-transparent': !isActive('home') }"
            >
              <span class="tw-block tw-px-1 tw-pt-1 tw-pb-2">
                <i class="far fa-home tw-text-2xl tw-pt-1 tw-mb-1 tw-block"></i>
                <span class="tw-block tw-text-xs tw-pb-1">Home</span>
              </span>
            </router-link>
          </div>
          <div :class="['tw-flex-1', isActive('tutorial') ? 'tw-text-rose-500' : 'tw-text-gray-700']">
            <router-link
              to="/tutorial"
              class="tw-flex tw-items-end tw-justify-center tw-text-center tw-mx-auto tw-px-4 tw-pt-2 tw-w-full tw-border-b-2"
              :class="{ 'tw-border-rose-500': isActive('tutorial'), 'tw-border-transparent': !isActive('tutorial') }"
            >
              <span class="tw-block tw-px-1 tw-pt-1 tw-pb-2">
                <i class="far fa-compass tw-text-2xl tw-pt-1 tw-mb-1 tw-block"></i>
                <span class="tw-block tw-text-xs tw-pb-1">Tutorial</span>
              </span>
            </router-link>
          </div>
          <div :class="['tw-flex-1', isActive('transaksi') ? 'tw-text-rose-500' : 'tw-text-gray-700']">
            <router-link
              to="/transaksi"
              class="tw-flex tw-items-end tw-justify-center tw-text-center tw-mx-auto tw-px-4 tw-pt-2 tw-w-full tw-border-b-2"
              :class="{ 'tw-border-rose-500': isActive('transaksi'), 'tw-border-transparent': !isActive('transaksi') }"
            >
              <span class="tw-block tw-px-1 tw-pt-1 tw-pb-2">
                <i class="far fa-file tw-text-2xl tw-pt-1 tw-mb-1 tw-block"></i>
                <span class="tw-block tw-text-xs tw-pb-1">Transaksi</span>
              </span>
            </router-link>
          </div>
          <div :class="['tw-flex-1', isActive('profile') ? 'tw-text-rose-500' : 'tw-text-gray-700']">
            <router-link
              to="/profile"
              class="tw-flex tw-items-end tw-justify-center tw-text-center tw-mx-auto tw-px-4 tw-pt-2 tw-w-full tw-border-b-2"
              :class="{ 'tw-border-rose-500': isActive('profile'), 'tw-border-transparent': !isActive('profile') }"
            >
              <span class="tw-block tw-px-1 tw-pt-1 tw-pb-2">
                <i class="far fa-user tw-text-2xl tw-pt-1 tw-mb-1 tw-block"></i>
                <span class="tw-block tw-text-xs tw-pb-1">Profile</span>
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
