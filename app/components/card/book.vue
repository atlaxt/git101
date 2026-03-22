<script setup lang="ts">
const appConfig = useAppConfig()

function goUrl() {
  window.open(appConfig.links.book, '_blank')
}
</script>

<template>
  <button
    class="group flex items-center justify-between w-full px-3 py-2.5 rounded-lg
    border border-neutral-200 dark:border-neutral-800
    hover:border-[#E85D3E]/50 dark:hover:border-[#E85D3E]/50
    transition-all text-left"
    @click="goUrl"
  >
    <span class="text-xs font-medium text-neutral-600 dark:text-neutral-400
    group-hover:text-[#E85D3E] dark:group-hover:text-[#F47B5F] transition-colors">
      Kitabı Satın Al
    </span>
    <img class="w-7 object-contain opacity-60 group-hover:opacity-100 transition-opacity" src="../../assets/gitbook.png" alt="Kitap">
  </button>
</template>
