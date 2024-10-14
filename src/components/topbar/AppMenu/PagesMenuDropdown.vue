<template>
  <li class="nav-item dropdown">
    <a
      class="nav-link dropdown-toggle arrow-none d-flex justify-content-between align-items-center w-100"
      href="#"
      :class="menuItemActive('pages', currentRouteName) && 'active'"
    >
      Home
      <font-awesome-icon :icon="faAngleDown" class="fa-sm ms-1" />
    </a>
    <div class="dropdown-menu">
      <template v-for="(item, idx) in menuItems" :key="item.key + idx">
        <MenuItemWithChildren v-if="item.children" :item="item" />
        <MenuItem v-else :item="item" />
      </template>

      <li>
        <router-link class="dropdown-item" to="/calculator">
          Kalkulator Pulsa
        </router-link>
      </li>
      
      <li v-for="item in provider" :key="item.id">
        <router-link class="dropdown-item" :to="'/convert/' + item.id">
          Convert {{ item.name }}
        </router-link>
      </li>
    </div>
  </li>
  <li class="nav-item" v-if="isLoggedIn">
    <router-link class="nav-link" to="/panduan">
      Tutorial
    </router-link>
  </li>
  <li class="nav-item" v-if="isLoggedIn">
    <router-link class="nav-link" to="/transaksi">
      Transaksi
    </router-link>
  </li>
  <li class="nav-item" v-if="isLoggedIn">
    <router-link class="nav-link" to="/profile">
      Profile
    </router-link>
  </li>
  <li class="nav-item" v-else>
    <router-link class="nav-link" to="/login">
      Login
    </router-link>
  </li>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { menuItemActive } from '@/components/topbar/AppMenu/getActiveClass'
import MenuItem from '@/components/topbar/AppMenu/MenuItem.vue'
import MenuItemWithChildren from '@/components/topbar/AppMenu/MenuItemWithChildren.vue'
import router from '@/router'

const isLoggedIn = computed(() => !!localStorage.getItem('user_email'))

interface Provider {
  id: number;
  name: string;
}

const provider = ref<Provider[]>([])

type PagesMenuDropdownProps = {
  menuItems: MenuItemType[]
}

defineProps<PagesMenuDropdownProps>()

const currentRouteName = router.currentRoute.value.name

const getProvider = async () => {
  const config = {
    headers: {
      'X-Api-Key': import.meta.env.VITE_API_KEY,
    },
  };

  try {
    const response = await fetch('https://admin.cvpulsa.id/api/my_provider/all?sort_order=asc', {
      method: 'GET',
      headers: config.headers,
    });

    if (response.ok) {
      const data = await response.json();
      provider.value = data.data.my_provider;
    } else {
      console.log("Unexpected response:", response);
    }
  } catch (error) {
    console.error("Failed to fetch provider:", error);
  }
};

onMounted(() => {
  getProvider();
});
</script>
