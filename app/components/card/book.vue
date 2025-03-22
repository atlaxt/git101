<script setup lang="ts">
const appConfig = useAppConfig()

function goUrl() {
  window.open(appConfig.links.book, '_blank')
}
</script>

<template>
  <button
    class="flex items-end justify-between gap-4 w-full p-2 rounded border border-dashed
    border-neutral-400 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
    @click="goUrl"
  >
    <span class="font-medium text-neutral-800 dark:text-neutral-200 whitespace-nowrap">
      Kitabı Satın Al
    </span>
    <img class="w-12 object-contain" src="../../assets/gitbook.png" alt="Kitap İkonu">
  </button>
</template>
