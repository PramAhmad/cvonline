<!-- components/SkeletonLoader.vue -->
<template>
    <div class="skeleton-loader">
      <div class="skeleton-item skeleton-title"></div>
      <div class="skeleton-item skeleton-text"></div>
      <div class="skeleton-item skeleton-text"></div>
      <div class="skeleton-item skeleton-image"></div>
    </div>
  </template>
  
  <script lang="ts" setup>
  </script>
  
  <style scoped>
  .skeleton-loader {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .skeleton-item {
    background: #e0e0e0;
    border-radius: 4px;
    animation: skeleton-loading 1.2s ease-in-out infinite;
  }
  
  .skeleton-title {
    width: 60%;
    height: 20px;
  }
  
  .skeleton-text {
    width: 100%;
    height: 15px;
  }
  
  .skeleton-image {
    width: 100%;
    height: 200px;
  }
  
  @keyframes skeleton-loading {
    0% {
      background-color: #e0e0e0;
    }
    50% {
      background-color: #f0f0f0;
    }
    100% {
      background-color: #e0e0e0;
    }
  }
  </style>
  