<script setup lang="ts">
const contentStore = useContentStore()
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <button
    class="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400
    hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors group text-left"
    @click="scrollToTop"
  >
    <Icon name="heroicons:arrow-up" class="w-3 h-3 flex-shrink-0 group-hover:-translate-y-0.5 transition-transform" />
    <span class="truncate font-medium">{{ contentStore.page.title }}</span>
  </button>
</template>
