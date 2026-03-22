<script setup lang="ts">
import Fuse from 'fuse.js'
import { computed, nextTick, onMounted, ref, watch } from 'vue'

const appStore = useAppStore()
const query = ref('')
const activeIndex = ref(0)
const inputRef = ref<HTMLInputElement | null>(null)
const resultsContainerRef = ref<HTMLElement | null>(null)

const { data } = await useAsyncData('search-data', () => queryCollectionSearchSections('content'))

// Fuse reactive — data değişse de index güncellenir
const fuse = computed(() => new Fuse(Array.isArray(data.value) ? data.value : [], {
  keys: ['title', 'titles', 'content'],
  threshold: 0.35,
  ignoreLocation: true,
  minMatchCharLength: 2,
}))

// Aynı sayfadan gelen section'ları grupla, her sayfadan en iyi 1 sonuç al
const results = computed(() => {
  if (!query.value.trim())
    return []

  const raw = fuse.value.search(query.value).slice(0, 30)

  // id'den sayfa path'ini çıkar (# anchor'ı at)
  const seen = new Set<string>()
  const deduped: typeof raw = []

  for (const r of raw) {
    const pagePath = r.item.id.split('#')[0]
    if (!seen.has(pagePath)) {
      seen.add(pagePath)
      deduped.push(r)
    }
    if (deduped.length >= 8)
      break
  }

  return deduped
})

// Query değişince index sıfırla
watch(query, () => {
  activeIndex.value = 0
})

// Modal açılınca query + index temizle, focus ver
watch(() => appStore.searchModalIsOpen, async (isOpen) => {
  document.body.classList.toggle('overflow-hidden', isOpen)
  if (isOpen) {
    query.value = ''
    activeIndex.value = 0
    await nextTick()
    inputRef.value?.focus()
  }
})

function scrollToActiveItem() {
  if (!resultsContainerRef.value)
    return
  const activeItem = resultsContainerRef.value.children[activeIndex.value] as HTMLElement
  if (activeItem)
    activeItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
}

function handleKeydown(event: KeyboardEvent) {
  if (event.ctrlKey && event.key === 'k') {
    event.preventDefault()
    appStore.searchModalIsOpen = true
    return
  }
  if (event.key === 'Escape') {
    appStore.searchModalIsOpen = false
    return
  }
  if (!appStore.searchModalIsOpen || results.value.length === 0)
    return

  if (event.key === 'ArrowDown') {
    event.preventDefault()
    activeIndex.value = (activeIndex.value + 1) % results.value.length
    scrollToActiveItem()
  }
  else if (event.key === 'ArrowUp') {
    event.preventDefault()
    activeIndex.value = (activeIndex.value - 1 + results.value.length) % results.value.length
    scrollToActiveItem()
  }
  else if (event.key === 'Enter') {
    const selected = results.value[activeIndex.value]
    if (selected) {
      navigateTo(selected.item.id.split('#')[0])
      appStore.searchModalIsOpen = false
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})
</script>

<template>
  <!-- Trigger button -->
  <button
    class="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg
    border border-neutral-200 dark:border-neutral-700
    bg-neutral-50 dark:bg-neutral-900
    text-neutral-400 dark:text-neutral-500
    hover:border-neutral-300 dark:hover:border-neutral-600
    hover:text-neutral-600 dark:hover:text-neutral-300
    transition-all cursor-pointer"
    @click="appStore.searchModalIsOpen = true"
  >
    <Icon name="heroicons:magnifying-glass" class="w-3.5 h-3.5 flex-shrink-0" />
    <span class="hidden lg:inline text-sm">Ara...</span>
    <kbd class="hidden lg:inline-flex items-center font-mono text-[10px] bg-white dark:bg-neutral-800
      border border-neutral-200 dark:border-neutral-700 rounded px-1.5 py-0.5 ml-3 text-neutral-400">
      ⌃K
    </kbd>
  </button>

  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="appStore.searchModalIsOpen"
        class="fixed inset-0 z-[99999999] flex items-start justify-center pt-[12vh] px-4
        bg-neutral-900/40 dark:bg-neutral-950/60 backdrop-blur-sm"
        @click.self="appStore.searchModalIsOpen = false"
      >
        <div class="w-full max-w-xl bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl
          border border-neutral-200 dark:border-neutral-800 overflow-hidden">
          <!-- Input -->
          <div class="flex items-center gap-3 px-4 py-3.5 border-b border-neutral-100 dark:border-neutral-800">
            <Icon name="heroicons:magnifying-glass" class="w-4 h-4 text-neutral-400 flex-shrink-0" />
            <input
              ref="inputRef"
              v-model="query"
              placeholder="İçeriklerde ara..."
              class="flex-1 bg-transparent text-neutral-900 dark:text-neutral-100
              placeholder-neutral-400 focus:outline-none text-sm"
            >
            <button
              class="flex-shrink-0 transition-colors"
              @click="appStore.searchModalIsOpen = false"
            >
              <kbd class="font-mono text-[10px] bg-neutral-100 dark:bg-neutral-800
                border border-neutral-200 dark:border-neutral-700 rounded px-1.5 py-0.5 text-neutral-400 cursor-pointer">
                ESC
              </kbd>
            </button>
          </div>

          <!-- Results -->
          <div
            ref="resultsContainerRef"
            class="max-h-[55vh] overflow-auto p-2
            [&::-webkit-scrollbar]:w-[3px]
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:bg-neutral-200
            dark:[&::-webkit-scrollbar-thumb]:bg-neutral-700"
          >
            <template v-if="query.trim()">
              <template v-if="results.length > 0">
                <NuxtLink
                  v-for="(result, index) in results"
                  :key="result.item.id"
                  :to="result.item.id.split('#')[0]"
                  class="flex flex-col gap-0.5 px-3 py-2.5 rounded-xl cursor-pointer transition-colors"
                  :class="{
                    'bg-orange-50 dark:bg-orange-950/30': index === activeIndex,
                    'hover:bg-neutral-50 dark:hover:bg-neutral-800/50': index !== activeIndex,
                  }"
                  @click="appStore.searchModalIsOpen = false"
                >
                  <span class="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    {{ result.item.title }}
                  </span>
                  <span v-if="result.item.titles?.length" class="text-xs text-neutral-400 dark:text-neutral-500">
                    {{ result.item.titles.join(' › ') }}
                  </span>
                  <span v-else-if="result.item.content" class="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1">
                    {{ result.item.content }}
                  </span>
                </NuxtLink>
              </template>

              <div v-else class="py-12 text-center text-sm text-neutral-400">
                "<span class="font-medium text-neutral-600 dark:text-neutral-300">{{ query }}</span>" için sonuç bulunamadı.
              </div>
            </template>

            <div v-else class="py-10 text-center text-sm text-neutral-400">
              Aramak için yazmaya başlayın...
            </div>
          </div>

          <!-- Footer -->
          <div class="flex items-center gap-4 px-4 py-2.5 border-t border-neutral-100 dark:border-neutral-800 text-[10px] text-neutral-400">
            <span class="flex items-center gap-1">
              <kbd class="font-mono bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded px-1 py-0.5">↑↓</kbd>
              gezin
            </span>
            <span class="flex items-center gap-1">
              <kbd class="font-mono bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded px-1 py-0.5">↵</kbd>
              aç
            </span>
            <span class="flex items-center gap-1">
              <kbd class="font-mono bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded px-1 py-0.5">ESC</kbd>
              kapat
            </span>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
