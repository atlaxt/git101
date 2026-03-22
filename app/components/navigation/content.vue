<script setup lang="ts">
const contentStore = useContentStore()
const currentPageNavigationIndex = ref<number>()
const prevPage = ref<{ path: string, stem: string, title: string }>()
const nextPage = ref<{ path: string, stem: string, title: string }>()

onMounted(() => {
  currentPageNavigationIndex.value = contentStore.contentNavigationMap.findIndex(item => item.stem === contentStore.page.stem)
  prevPage.value = contentStore.contentNavigationMap[currentPageNavigationIndex.value - 1]
  nextPage.value = contentStore.contentNavigationMap[currentPageNavigationIndex.value + 1]

  if (currentPageNavigationIndex.value === 0) {
    prevPage.value = {
      path: '/',
      stem: 'index',
      title: 'Önsöz',
    }
  }
})
</script>

<template>
  <div class="w-full grid grid-cols-1 lg:grid-cols-2 gap-3">
    <NuxtLink
      v-if="prevPage?.path"
      class="group flex flex-col gap-1.5 rounded-xl border border-neutral-200 dark:border-neutral-800
      p-4 transition-all hover:border-[#E85D3E]/50 dark:hover:border-[#E85D3E]/50
      hover:shadow-sm hover:shadow-orange-100 dark:hover:shadow-orange-950/20"
      :to="prevPage?.path"
    >
      <span class="flex items-center gap-1 text-xs text-neutral-400 dark:text-neutral-500">
        <Icon name="heroicons:arrow-left" class="w-3 h-3" />
        Önceki
      </span>
      <span class="text-sm font-medium text-neutral-700 dark:text-neutral-300
      group-hover:text-[#E85D3E] dark:group-hover:text-[#F47B5F] transition-colors line-clamp-2 capitalize">
        {{ prevPage?.title }}
      </span>
    </NuxtLink>
    <div v-else />

    <NuxtLink
      v-if="nextPage?.path"
      class="group flex flex-col items-end gap-1.5 rounded-xl border border-neutral-200 dark:border-neutral-800
      p-4 transition-all hover:border-[#E85D3E]/50 dark:hover:border-[#E85D3E]/50
      hover:shadow-sm hover:shadow-orange-100 dark:hover:shadow-orange-950/20"
      :to="nextPage?.path"
    >
      <span class="flex items-center gap-1 text-xs text-neutral-400 dark:text-neutral-500">
        Sonraki
        <Icon name="heroicons:arrow-right" class="w-3 h-3" />
      </span>
      <span class="text-sm font-medium text-neutral-700 dark:text-neutral-300
      group-hover:text-[#E85D3E] dark:group-hover:text-[#F47B5F] transition-colors text-right line-clamp-2 capitalize">
        {{ nextPage?.title }}
      </span>
    </NuxtLink>
    <div v-else />
  </div>
</template>
