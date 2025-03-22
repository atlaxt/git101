<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

// const appConfig = useAppConfig()
const appStore = useAppStore()
watch(() => appStore.silderIsOpen, (isOpen) => {
  document.body.classList.toggle('!overflow-hidden', isOpen)
})
watch(() => appStore.searchModalIsOpen, (isOpen) => {
  document.body.classList.toggle('!overflow-hidden', isOpen)
})
</script>

<template>
  <div>
    <div class="flex flex-row items-center gap-6 text-xl dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300">
      <Search />
      <ColorModeSwitch class="mt-2" />
      <button class=" pt-2" @click="appStore.silderIsOpen = !appStore.silderIsOpen">
        <Icon name="heroicons-outline:menu-alt-3" class="text-2xl" />
      </button>
    </div>

    <div
      class="fixed top-0 left-0 h-full w-full !bg-white dark:!bg-neutral-900 shadow-md transform transition-transform ease-in-out duration-300 z-[9999999]"
      :class="appStore.silderIsOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="flex h-screen flex-col p-3 space-y-4 !bg-white dark:!bg-neutral-900">
        <div class="flex flex-row items-center justify-end">
          <button class="self-end text-gray-700 dark:text-gray-200 text-2xl" @click="appStore.silderIsOpen = false">
            <Icon name="heroicons-outline:x" />
          </button>
        </div>
        <Navigation
          class="overflow-y-scroll" @click-to="(_page: ContentNavigationItem) => {
            appStore.silderIsOpen = false
          }"
        />
        <div class="flex flex-col w-full gap-2 justify-between">
          <div
            class="flex flex-col w-full border-dashed border p-2
    border-neutral-400 rounded dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
          >
            <CardCommunity />
          </div>
          <CardBook />
        </div>
      </div>
    </div>
  </div>
</template>
