<script setup>
import navItems from '@/navigation/horizontal'
import { themeConfig } from '@themeConfig'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

// Components
import Footer from '@/layouts/components/Footer.vue'
import NavBarNotifications from '@/layouts/components/NavBarNotifications.vue'
import UserProfile from '@/layouts/components/UserProfile.vue'
import { HorizontalNavLayout } from '@layouts'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'

const route = useRoute()

const findRouteTitle = (items, routeName) => {
  for (const item of items) {
    if (item.to === routeName) {
      return item.meta.title
    }
    if (item.children) {
      const foundTitle = findRouteTitle(item.children, routeName)
      if (foundTitle) {
        return foundTitle
      }
    }
  }
    
  return ''
}


const pageTitle = computed(() => {

  let baseRouteName = route.name
  let foundTitle = findRouteTitle(navItems, baseRouteName)

  while (!foundTitle && baseRouteName.includes('-')) {
    // Trim the last segment
    baseRouteName = baseRouteName.substring(0, baseRouteName.lastIndexOf('-'))
    foundTitle = findRouteTitle(navItems, baseRouteName)
  }

  return foundTitle || '' 
})
</script>

<template>
  <HorizontalNavLayout :nav-items="navItems">

    <!-- 👉 navbar -->
    <template #navbar>
      <RouterLink
        to="/"
        class="app-logo d-flex align-center gap-x-3"
      >
        <VNodeRenderer :nodes="themeConfig.app.logo" />
      </RouterLink>
      <VSpacer />

<!--      <VRow class="d-flex align-center p-4 justify-end">-->
<!--        <VCol cols="1" />-->
<!--        <VCol class="d-flex align-center justify-center">-->
<!--          <h1 class="text-darkred">-->
<!--            {{ pageTitle }}-->
<!--          </h1>-->
<!--        </VCol>-->
<!--        <VCol cols="2" />-->
<!--      </VRow>-->

      <VSpacer />

      <!-- <NavSearchBar trigger-btn-class="ms-lg-n3" /> -->

      <!-- <NavBarI18n class="me-1" /> -->
      <!-- <NavbarThemeSwitcher class="me-1" /> -->
      <!-- <NavbarShortcuts class="me-1" /> -->
<!--      <NavBarNotifications class="me-5" />-->
<!--      <UserProfile />-->
    </template>

    <!-- 👉 Pages -->
    <RouterView v-slot="{ Component }">
      <Component :is="Component" />
    </RouterView>

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>

    <!-- Customizer -->
    <!-- <TheCustomizer /> -->
  </HorizontalNavLayout>
</template>
