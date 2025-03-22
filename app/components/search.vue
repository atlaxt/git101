<script setup lang="ts">
import type { SearchResultItem } from '~/types'
import Fuse from 'fuse.js'
import { computed, nextTick, onMounted, ref } from 'vue'

const appStore = useAppStore()
const query = ref('')
const activeIndex = ref(0)
const inputRef = ref<HTMLInputElement | null>(null)
const resultsContainerRef = ref<HTMLElement | null>(null)

const { data } = await useAsyncData('search-data', () => queryCollectionSearchSections('content'))

const fuse = new Fuse(Array.isArray(data.value) ? data.value : [], {
  keys: ['title', 'description', 'content'],
  threshold: 0.3,
})

const results = computed<SearchResultItem[]>(() => fuse.search(query.value).slice(0, 10))

watch(() => appStore.searchModalIsOpen, async (isOpen) => {
  if (isOpen) {
    await nextTick()
    inputRef.value?.focus()
    inputRef.value?.select()
  }
})

function scrollToActiveItem() {
  if (!resultsContainerRef.value)
    return
  const activeItem = resultsContainerRef.value.children[activeIndex.value] as HTMLElement
  if (activeItem) {
    activeItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (event.ctrlKey && event.key === 'k') {
    event.preventDefault()
    appStore.searchModalIsOpen = true
  }
  if (event.key === 'Escape') {
    appStore.searchModalIsOpen = false
  }
  if (!appStore.searchModalIsOpen || results.value.length === 0)
    return

  if (event.key === 'ArrowDown') {
    activeIndex.value = (activeIndex.value + 1) % results.value.length
    scrollToActiveItem()
  }
  else if (event.key === 'ArrowUp') {
    activeIndex.value = (activeIndex.value - 1 + results.value.length) % results.value.length
    scrollToActiveItem()
  }
  else if (event.key === 'Enter') {
    const selectedResult = results.value[activeIndex.value]
    if (selectedResult) {
      navigateTo(selectedResult.item.id)
      appStore.searchModalIsOpen = false
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div>
    <button
      class="hover:text-[#cf3d21] hover:dark:text-[#D44A2F] cursor-pointer flex flex-row items-center
      border-dashed rounded gap-4 py-2 lg:px-4 lg:border border-neutral-400 dark:border-neutral-500
      "
      @click="appStore.searchModalIsOpen = true"
    >
      <Icon name="heroicons:magnifying-glass" />
      <p class="text-sm lg:flex hidden">
        {{ "ctrl + k" }}
      </p>
    </button>

    <div
      v-if="appStore.searchModalIsOpen"
      class="fixed h-screen inset-0 bg-neutral-700/50 flex justify-center lg:items-center items-start z-[99999999]"
    >
      <div class="w-full max-w-3xl flex flex-col lg:h-[70vh] h-full bg-white dark:bg-neutral-900 rounded-lg shadow-lg p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-semibold dark:text-neutral-200">
            İçeriklerde Ara
          </h3>
          <button @click="appStore.searchModalIsOpen = false">
            <Icon
              name="heroicons:x-mark"
              class="text-2xl text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-200"
            />
          </button>
        </div>

        <input
          ref="inputRef"
          v-model="query"
          placeholder="Ara..."
          class="w-full p-2 rounded border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 mb-4"
        >

        <div
          v-if="query"
          ref="resultsContainerRef"
          class="h-full overflow-auto flex gap-2 pr-2 flex-col [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:rounded-none [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-none [&::-webkit-scrollbar-thumb]:bg-[#D44A2F] dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-[#D44A2F]"
        >
          <div
            v-for="(result, index) in results"
            :key="result.item.id"
            class="py-2 border-dashed rounded p-2 border border-neutral-200 dark:border-neutral-700 hover:bg-gray-200 hover:dark:bg-neutral-800"
            :class="{ 'bg-gray-200 dark:bg-neutral-800': index === activeIndex }"
          >
            <NuxtLink
              :to="result.item.id"
              class="block hover:text-[#cf3d21] dark:hover:text-[#D44A2F]"
              @click="appStore.searchModalIsOpen = false"
            >
              <div class="font-medium dark:text-neutral-100">
                {{ result.item.title }}
              </div>
              <div class="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2">
                {{ result.item.content }}
              </div>
            </NuxtLink>
          </div>
          <li v-if="results.length === 0" class="text-neutral-500 dark:text-neutral-400 text-center py-4">
            Sonuç bulunamadı.
          </li>
        </div>
      </div>
    </div>
  </div>
</template>
