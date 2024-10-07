<template>
  <b-collapse id="topbar-appmenu-collapse" class="navbar-collapse">
    <ul class="navbar-nav navbar-nav-scroll dropdown-hover" :class="ulClass">
      <PagesMenuDropdown />
      <!-- halmaan 2 halmaan 3 hjalaman 4 -->
       

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
