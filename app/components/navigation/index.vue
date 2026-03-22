<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const emit = defineEmits({
  clickTo: (contentNavigationItem: ContentNavigationItem) => contentNavigationItem,
})
const contentStore = useContentStore()
const scrollContainer = ref<HTMLElement | null>(null)
const scrollKey = 'content-scroll-position'
const route = useRoute()

function saveScrollPosition() {
  if (scrollContainer.value) {
    sessionStorage.setItem(scrollKey, scrollContainer.value.scrollTop.toString())
  }
}

function restoreScrollPosition() {
  if (scrollContainer.value) {
    const savedScrollPosition = sessionStorage.getItem(scrollKey)
    if (savedScrollPosition !== null) {
      scrollContainer.value.scrollTop = Number.parseInt(savedScrollPosition, 10)
    }
  }
}

watch(() => route.path, () => {
  saveScrollPosition()
  setTimeout(restoreScrollPosition, 100)
})

onMounted(() => {
  restoreScrollPosition()
})

onBeforeUnmount(() => {
  saveScrollPosition()
})
</script>

<template>
  <div
    ref="scrollContainer"
    class="overflow-y-auto overflow-x-hidden w-full
    [&::-webkit-scrollbar]:w-[3px]
    [&::-webkit-scrollbar-track]:bg-transparent
    [&::-webkit-scrollbar-thumb]:rounded-full
    [&::-webkit-scrollbar-thumb]:bg-neutral-200
    dark:[&::-webkit-scrollbar-thumb]:bg-neutral-700"
  >
    <nav v-if="contentStore.navigation" class="flex flex-col pb-4">
      <!-- Önsöz -->
      <div class="mb-6">
        <a
          href="/"
          class="block rounded-md px-2 py-1.5 text-sm transition-colors"
          :class="$route.path === '/'
            ? 'bg-orange-50 dark:bg-orange-950/30 text-[#E85D3E] dark:text-[#F47B5F] font-medium'
            : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800/50'"
        >
          Önsöz
        </a>
      </div>

      <!-- Sections -->
      <div
        v-for="navigate in contentStore.navigation"
        :key="navigate.path"
        class="mb-6"
      >
        <!-- Section header -->
        <div class="flex items-center gap-2 px-2 mb-2">
          <span class="text-[10px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 leading-none whitespace-nowrap">
            {{ navigate.title }}
          </span>
          <div class="flex-1 h-px bg-neutral-100 dark:bg-neutral-800" />
        </div>

        <!-- Items — ml-3 ile section header'dan ayrışır -->
        <div
          v-for="page in navigate.children"
          :key="page.path"
          class="ml-3 rounded-md px-2 py-1.5 text-sm cursor-pointer transition-colors"
          :class="{
            'bg-orange-50 dark:bg-orange-950/30 text-[#E85D3E] dark:text-[#F47B5F] font-medium': page.path === $route.path,
            'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800/50': page.path !== $route.path,
          }"
          @click="() => {
            navigateTo(page.path)
            emit('clickTo', page)
          }"
        >
          {{ page.title }}
        </div>
      </div>
    </nav>
  </div>
</template>
