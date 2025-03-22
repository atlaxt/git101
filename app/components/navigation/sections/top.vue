<script setup lang="ts">
const contentStore = useContentStore()
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div class="flex flex-row gap-2 dark:text-neutral-200 text-neutral-800 items-center cursor-pointer" @click="scrollToTop">
    <Icon name="heroicons:arrow-up" class="text-lg flex-shrink-0 w-6 h-6" />
    <p class="truncate">
      {{ contentStore.page.title }}
    </p>
  </div>
</template>
