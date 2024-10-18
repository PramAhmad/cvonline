<template>
  <b-collapse id="topbar-appmenu-collapse" class="navbar-collapse">
    <ul class="navbar-nav navbar-nav-scroll dropdown-hover" :class="ulClass">
      <PagesMenuDropdown />
      <!-- halmaan 2 halmaan 3 hjalaman 4 -->
   
             
      <ResourcesMenuDropdown v-if="showResources" />
    
      <b-row class=" mt-3 px-3 mb-4 mb-sm-5">
                <b-col cols="5" sm="4" md="6">
                  <a href="https://play.google.com/store/apps/details?id=com.cv.pulsa"><img :src="googlePlay"
                      alt="" /></a>
                </b-col>

                <b-col cols="5" sm="4" md="6">
                  <a href="https://apps.apple.com/app/cvpulsa-convert-pulsa/id6720757606"><img :src="appStore"
                      alt="app-store" /></a>
                </b-col>
              </b-row>
             

     
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
