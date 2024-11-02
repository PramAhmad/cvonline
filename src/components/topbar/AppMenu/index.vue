<template>
  <b-collapse id="topbar-appmenu-collapse" class="navbar-collapse">
    <ul class="navbar-nav navbar-nav-scroll dropdown-hover" :class="ulClass">
      <PagesMenuDropdown />
      <!-- halmaan 2 halmaan 3 hjalaman 4 -->
      <li class="nav-item" v-if="isLoggedIn">
    <router-link class="nav-link" to="/panduan">
      Tutorial
    </router-link>
  </li>
  <li class="nav-item" >
    <router-link class="nav-link" to="/blog">
      Blog
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
             
      <ResourcesMenuDropdown v-if="showResources" />
    

             

     
      <MegaMenuDropdown v-if="showMegaMenu" />

      
      <li v-if="showDocs" class="nav-item">
        <a
          class="nav-link"
          href="https://mizzle-vue.vercel.app/docs/index.html"
          target="_blank"
        >
          Docs
        </a>
      </li>
    </ul>
  </b-collapse>
</template>

<script lang="ts" setup>
import { getAppMenuItems, type MenuItemType } from '@/helpers/menu'
import DemosMenuDropdown from '@/components/topbar/AppMenu/DemosMenuDropdown.vue'
import PagesMenuDropdown from '@/components/topbar/AppMenu/PagesMenuDropdown.vue'
import MegaMenuDropdown from '@/components/topbar/AppMenu/MegaMenuDropdown.vue'
import PortfolioMenuDropdown from '@/components/topbar/AppMenu/PortfolioMenuDropdown.vue'
import ResourcesMenuDropdown from '@/components/topbar/AppMenu/ResourcesMenuDropdown.vue'
import appStore from "@/assets/images/elements/app-store.svg";
import googlePlay from "@/assets/images/elements/google-play.svg";
import { defineProps, computed } from 'vue'
const isLoggedIn = computed(() => !!localStorage.getItem('user_email'))


type AppMenuProps = {
  showMegaMenu?: boolean
  showResources?: boolean
  showContactUs?: boolean
  showDocs?: boolean
  ulClass?: string
}
const menuItems: MenuItemType[] = getAppMenuItems()

defineProps<AppMenuProps>()
</script>
