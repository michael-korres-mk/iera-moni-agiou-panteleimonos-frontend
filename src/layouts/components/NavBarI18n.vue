<script setup>
import NavBarI18n from '@core/components/I18n.vue'

const i18nCompLanguages = [
  {
    label: 'Ελληνικά',
    i18nLang: 'el',
  },
  {
    label: 'English',
    i18nLang: 'en',
  },
]
</script>

<template>
  <NavBarI18n :languages="i18nCompLanguages" />
</template>
