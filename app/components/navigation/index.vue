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
    class="overflow-auto text-balance capitalize text-sm dark:text-white pr-2
    [&::-webkit-scrollbar]:w-1
    [&::-webkit-scrollbar-track]:rounded-full
    [&::-webkit-scrollbar-track]:bg-gray-100
    [&::-webkit-scrollbar-thumb]:rounded-full
    [&::-webkit-scrollbar-thumb]:bg-gray-300
    dark:[&::-webkit-scrollbar-track]:bg-neutral-800
    dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
    "
  >
    <div v-if="contentStore.navigation" class="w-full text-left flex text-wrap flex-col gap-3">
      <div v-for="navigate in contentStore.navigation" :key="navigate.path" class="text-wrap flex flex-col">
        <p class="text-[#cf3d21] dark:text-[#D44A2F] text-lg">
          {{ navigate.title }}
        </p>
        <div
          v-for="page in navigate.children"
          :key="page.path"
          class="border-l pl-4 ml-2 py-1 cursor-pointer
          dark:text-neutral-300 dark:hover:text-neutral-200 text-neutral-700 hover:text-neutral-900
          dark:border-neutral-700 border-neutral-300
          "
          :class="{
            'font-bold !text-black dark:!text-white dark:!border-white !border-black': page.path === $route.path,
          }"
          @click="() => {
            navigateTo(page.path)
            emit('clickTo', page)
          }"
        >
          {{ page.title }}
        </div>
      </div>
    </div>
  </div>
</template>
