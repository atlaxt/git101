<script setup lang="ts">
import type { LayoutKey } from '#build/types/layouts'

const route = useRoute()
const contentStore = useContentStore()

const page = ref()

const { data: _page } = await useAsyncData(`page-${route.params.slug}`, () => {
  return queryCollection('content').path(route.path).first()
})
page.value = _page.value

const { data: _navigation } = useAsyncData('navigation', () =>
  queryCollectionNavigation('content'))

watch(_page, (newPage) => {
  if (newPage) {
    page.value = newPage
    contentStore.setSections(newPage)
  }
}, { immediate: true })

watch(_navigation, (newNav) => {
  if (newNav) {
    contentStore.setNavigation(newNav)
  }
}, { immediate: true })
</script>

<template>
  <NuxtLayout :name="page?.layout as LayoutKey || 'default'" class="">
    <ContentRenderer
      v-if="page"
      :value="page"
      class="prose dark:prose-invert prose-pre:bg-gray-100 dark:prose-pre:bg-gray-900 min-w-full"
    />
  </NuxtLayout>
</template>
