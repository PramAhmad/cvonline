<template>
    <div class="tw-w-full tw-h-full">
      <!-- Header Section -->
      <div ref="header" class="sticky-header tw-flex tw-items-center tw-mb-4 tw-w-full tw-justify-center tw-px-2 tw-bg-gray-50 tw-py-3 tw-border-b-2 tw-border-gray-200">
    <!-- Button to go back -->
    <button @click="goBack" class="tw-flex tw-items-center tw-space-x-2 tw-text-gray-500 tw-text-sm tw-absolute tw-left-5">
      <svg xmlns="http://www.w3.org/2000/svg" class="tw-h-5 tw-w-5 tw-text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
     
    </button>
    <h2 class="tw-font-medium tw-text-md tw-text-gray-900">Pengaduan Penggunaan Aplikasi</h2>
  </div>
      <!-- Content Section -->
      <div class="tw-p-6 tw-bg-white tw-text-gray-800">
        <h3 class="tw-text-lg tw-font-bold tw-mb-4">Kebijakan Privasi</h3>
        <p class="tw-mb-4">
          Kami sangat menghargai privasi Anda. Kebijakan privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda saat Anda menggunakan layanan kami.
        </p>
  
        <!-- Numbered List with Sublist -->
        <ol type="1" class="tw-list-decimal tw-ml-5 tw-space-y-2">
          <li><h5 class="tw-font-semibold">Informasi yang kami kumpulkan</h5>
            <p class="tw-text-sm">Kami mengumpulkan berbagai jenis informasi untuk menyediakan dan meningkatkan layanan kami. Informasi tersebut dapat mencakup:</p>
            <ul  class="tw-list-lower-alpha  tw-list-disc  tw-space-y-2">
              <li><h5 class="tw-font-semibold tw-text-sm">Informasi Pribadi:</h5> Seperti nama, alamat email, nomor telepon, dan informasi pembayaran saat Anda mendaftar akun atau menggunakan layanan kami.</li>
              <li><h5 class="tw-font-semibold tw-text-sm">Informasi Transaksi:</h5> Detail tentang transaksi yang Anda lakukan menggunakan layanan kami, termasuk jumlah pulsa yang dikonversi, penerima, dan informasi terkait lainnya.</li>
              <li><h5 class="tw-font-semibold tw-text-sm">Informasi Penggunaan:</h5> Data tentang bagaimana Anda berinteraksi dengan layanan kami, seperti alamat IP, jenis perangkat, sistem operasi, dan jenis browser.</li>

<li><h5 class="tw-font-semibold tw-text-sm">Data Lokasi:</h5> Kami mungkin mengumpulkan
data lokasi Anda untuk memfasilitasi fitur
tertentu dari layanan kami.</li>

            </ul>
          </li>
          
          <li><h5 class="tw-font-semibold">Bagaimana Kami Menggunakan Informasi Anda</h5>
            <p class="tw-mb-4">
                Kami menggunakan informasi anda untuk:
            </p>
            <ul type="a" class="tw-list-lower-alpha  tw-list-disc  tw-space-y-2">
                <li><h5 class="tw-font-base tw-text-md">Menyediakan dan mengoprasikan layanan </h5></li>
                <li><h5 class="tw-font-base tw-text-md">Memproses pembayaran dan transaksi secara aman. </h5></li>
                <li><h5 class="tw-font-base tw-text-md">Meningkatkan dan mempersonalisasi pengalaman Anda di platform kami.</h5></li>
                <li><h5 class="tw-font-base tw-text-md">Berkomunikasi dengan Anda, termasuk mengirimkan notifikasi transaksi dan materi pemasaran (dengan persetujuan Anda). </h5></li>
                <li><h5 class="tw-font-base tw-text-md">Mematuhi kewajiban hukum dan melindungi dari penipuan serta penyalahgunaan. </h5></li>



            </ul>
          </li>
  
          <li><h5 class="tw-font-semibold">Informasi yang kami kumpulkan</h5>
            <p class="tw-mb-4">Kami tidak menjual, menukar, atau menyewakan informasi pribadi Anda kepada pihak ketiga. Namun, kami mungkin membagikan informasi Anda dengan:</p>
            <ul type="a" class="tw-list-lower-alpha  tw-list-disc  tw-space-y-2">
                <li><h5 class="tw-font-medium tw-text-md">Penyedia Layanan: </h5> Seperti pemroses pembayaran dan vendor pihak ketiga yang membantu kami menyediakan layanan.
                </li>
                <li><h5 class="tw-font-medium tw-text-md">Penegak Hukum atau Persyaratan Hukum: </h5> Saat diwajibkan oleh hukum atau untuk melindungi keamanan dan hak pengguna kami.
                </li>


            </ul>
          </li>
  
          <li><h5 class="tw-font-semibold">Keamanan Data</h5>
            <p class="tw-mb-4">
                Kami mengambil langkah-langkah keamanan yang sesuai untuk melindungi informasi pribadi Anda dari akses, pengungkapan, perubahan, atau penghancuran yang tidak sah. Namun, harap diingat bahwa tidak ada metode transmisi melalui internet yang sepenuhnya aman.</p>
                </li>
  
                <li><h5 class="tw-font-semibold">Cookies dan Teknologi Pelacakan
                </h5>
            <p class="tw-mb-4">
                Situs web dan aplikasi kami dapat menggunakan cookies dan teknologi pelacakan serupa untuk meningkatkan pengalaman Anda. Cookies ini membantu kami memahami bagaimana pengguna berinteraksi dengan layanan kami dan memungkinkan kami memberikan pengalaman yang lebih dipersonalisasi.

                </p>
                </li>
  
  
         
                <li><h5 class="tw-font-semibold">Hak-Hak Anda</h5>
            <p class="tw-mb-4">Bergantung pada yurisdiksi Anda, Anda mungkin memiliki hak-hak berikut terkait informasi pribadi Anda:</p>
            <ul type="a" class="tw-list-lower-alpha  tw-list-disc  tw-space-y-2">
                <li><h5 class="tw-font-medium tw-text-md">Penghapusan: </h5>Anda dapat berhenti berlangganan komunikasi pemasaran kapan saja dengan mengikuti tautan berhenti berlangganan di email kami atau menghubungi kami langsung.

                </li>
                <li><h5 class="tw-font-medium tw-text-md">Opt-Out: </h5>  Anda dapat berhenti berlangganan komunikasi pemasaran kapan saja dengan mengikuti tautan berhenti berlangganan di email kami atau menghubungi kami langsung.

                </li>
                </ul>
                </li>
                <!-- Tautan Pihak Ketiga  -->
                <li><h5 class="tw-font-semibold">Tautan Pihak Ketiga</h5>
            <p class="tw-mb-4">
                Layanan kami mungkin berisi tautan ke situs web atau layanan pihak ketiga. Kami tidak bertanggung jawab atas praktik privasi pihak ketiga tersebut, dan kami menganjurkan Anda untuk meninjau kebijakan privasi mereka sebelum memberikan informasi pribadi Anda.

            </p>   
            </li>
            <li><h5 class="tw-font-semibold">Perubahan Kebijakan Privasi Ini</h5>
            <p class="tw-mb-4">
                Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu untuk mencerminkan perubahan dalam praktik kami atau untuk alasan hukum. Kami akan memberi tahu Anda tentang perubahan signifikan dengan memposting kebijakan yang diperbarui di situs web dan aplikasi kami. Penggunaan layanan kami secara terus-menerus setelah perubahan tersebut berarti Anda menerima Kebijakan Privasi yang telah diperbarui.

            </p>   
            </li>


            <li><h5 class="tw-font-semibold">Hubungi Kami</h5>
                <p class="tw-mb-4">
                    Jika Anda memiliki pertanyaan atau kekhawatiran tentang Kebijakan Privasi ini atau bagaimana kami menangani informasi pribadi Anda, silakan hubungi kami di:
                    
                </p>     
                <p class="tw-font-semibold">CV Pulsa</p>
                <span>PT Solusi Digital Gresindo</span>
                <span>info@cvpulsa.id</span>
                <span>Dsn Gridi Jaya RT 10 RW 04, Ds Pacuh Kecamatan Balongpanggang, Kab Gresik, Jawa Timur +62 821-2255-5556</span>
                </li>   
        </ol>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  const router = useRouter();
  
  const goBack = () => {
    window.history.length > 1 ? window.history.back() : router.push('/');
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
  }</style>