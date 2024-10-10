<!-- components/LoadingSpinner.vue -->
<template>
    <div class="loading-overlay">
      <div class="spinner"></div>
    </div>
  </template>
  
  <style scoped>
  .loading-overlay {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.1);
  }
  
  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #3b82f6;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s ease infinite;
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  </style>
  