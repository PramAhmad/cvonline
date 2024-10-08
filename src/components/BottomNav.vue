<template>
    <!-- component -->
    <div class="tw-w-full tw-max-w-md tw-mx-auto tw-fixed tw-bottom-0 tw-left-0 tw-right-0 tw-mb-5">
        <div class=" tw-bg-white tw-shadow-lg tw-rounded-2xl">
            <div class="tw-flex">
                <div class="tw-flex-1 group">
                    <a href="#" class="tw-flex tw-items-end tw-justify-center tw-text-center tw-mx-auto tw-px-4 tw-pt-2 tw-w-full tw-text-gray-400 group-hover:tw-text-indigo-500 tw-border-b-2 tw-border-transparent group-hover:tw-border-indigo-500">
                        <span class="tw-block tw-px-1 tw-pt-1 tw-pb-2">
                            <i class="far fa-home tw-text-2xl tw-pt-1 tw-mb-1 tw-block"></i>
                            <span class="tw-block tw-text-xs tw-pb-1">Home</span>
                        </span>
                    </a>
                </div>
                <div class="tw-flex-1 group">
                    <a href="#" class="tw-flex tw-items-end tw-justify-center tw-text-center tw-mx-auto tw-px-4 tw-pt-2 tw-w-full tw-text-gray-400 group-hover:tw-text-indigo-500 tw-border-b-2 tw-border-transparent group-hover:tw-border-indigo-500">
                        <span class="tw-block tw-px-1 tw-pt-1 tw-pb-2">
                            <i class="far fa-compass tw-text-2xl tw-pt-1 tw-mb-1 tw-block"></i>
                            <span class="tw-block tw-text-xs tw-pb-1">Tutorial</span>
                        </span>
                    </a>
                </div>
                <div class="tw-flex-1 group">
                    <a href="#" class="tw-flex tw-items-end tw-justify-center tw-text-center tw-mx-auto tw-px-4 tw-pt-2 tw-w-full tw-text-gray-400 group-hover:tw-text-indigo-500 tw-border-b-2 tw-border-transparent group-hover:tw-border-indigo-500">
                        <span class="tw-block tw-px-1 tw-pt-1 tw-pb-2">
                            <i class="far fa-file tw-text-2xl tw-pt-1 tw-mb-1 tw-block"></i>
                            <span class="tw-block tw-text-xs tw-pb-1">Transaksi</span>
                        </span>
                    </a>
                </div>
                <div class="tw-flex-1 group">
                    <a href="#" class="tw-flex tw-items-end tw-justify-center tw-text-center tw-mx-auto tw-px-4 tw-pt-2 tw-w-full tw-text-gray-400 group-hover:tw-text-indigo-500 tw-border-b-2 tw-border-transparent group-hover:tw-border-indigo-500">
                        <span class="tw-block tw-px-1 tw-pt-1 tw-pb-2">
                            <i class="far fa-user tw-text-2xl tw-pt-1 tw-mb-1 tw-block"></i>
                            <span class="tw-block tw-text-xs tw-pb-1">Profile</span>
                        </span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

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
