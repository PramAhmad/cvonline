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
        <!-- convert dan calculator -->
        
        <hr class="dropdown-divider" />

        <router-link class="dropdown-item" to="/calculator">
          Calculator
        </router-link>
      </li>
     
      
    </div>
  </li>
  <li class="nav-item" v-if="isLoggedIn">
    <router-link class="nav-link" to="/panduan" >
      Tutorial
    </router-link>
  </li>
  <li class="nav-item" v-if="isLoggedIn">
    <router-link class="nav-link" to="/transaksi" >
      Transaksi
    </router-link>
  </li>
  <!-- Conditionally display Profile and Login based on login status -->
  <li class="nav-item" v-if="isLoggedIn">
    <router-link class="nav-link" to="/profile" >
      Profile
    </router-link>
  </li>

  <li class="nav-item" v-else>
    <router-link class="nav-link" to="login" >
      Login
    </router-link>
  </li>
</template>
<script lang="ts" setup>
import router from '@/router'
import { supportLink } from '@/helpers'
import type { MenuItemType } from '@/helpers/menu'
import MenuItem from '@/components/topbar/AppMenu/MenuItem.vue'
import MenuItemWithChildren from '@/components/topbar/AppMenu/MenuItemWithChildren.vue'
import { menuItemActive } from '@/components/topbar/AppMenu/getActiveClass'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { BIconLifePreserver } from 'bootstrap-icons-vue'
import { computed } from 'vue'

// Check if the user is logged in by checking the presence of email_user in localStorage
const isLoggedIn = computed(() => !!localStorage.getItem('user_email'))

type PagesMenuDropdownProps = {
  menuItems: MenuItemType[]
}

defineProps<PagesMenuDropdownProps>()

const currentRouteName = router.currentRoute.value.name
</script>
