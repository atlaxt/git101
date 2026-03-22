<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const appStore = useAppStore()

watch(() => appStore.silderIsOpen, (isOpen) => {
  document.body.classList.toggle('overflow-hidden', isOpen)
})
</script>

<template>
  <div class="flex flex-row items-center gap-3 text-neutral-600 dark:text-neutral-400">
    <Search />
    <ColorModeSwitch />
    <button
      class="flex items-center justify-center w-8 h-8 rounded-lg
      hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
      @click="appStore.silderIsOpen = !appStore.silderIsOpen"
    >
      <Icon name="heroicons-outline:menu-alt-3" class="text-xl dark:text-white text-neutral-800" />
    </button>
  </div>

  <!-- Teleport: drawer ve backdrop navbar'ın outside'ına çıkar,
       böylece backdrop-filter containing block sorunu yaşanmaz -->
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="appStore.silderIsOpen"
        class="fixed inset-0 bg-neutral-900/40 dark:bg-neutral-950/60 backdrop-blur-sm z-[999998]"
        @click="appStore.silderIsOpen = false"
      />
    </Transition>

    <!-- Drawer -->
    <Transition
      enter-active-class="transition-transform duration-300 ease-out"
      enter-from-class="-translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-200 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="-translate-x-full"
    >
      <div
        v-if="appStore.silderIsOpen"
        class="fixed top-0 left-0 h-full w-72 bg-white dark:bg-neutral-950
        shadow-2xl z-[999999] border-r border-neutral-200 dark:border-neutral-800
        flex flex-col"
      >
        <!-- Header -->
        <div class="flex items-center justify-between h-14 px-5 border-b border-neutral-100 dark:border-neutral-800 flex-shrink-0">
          <button
            class="flex items-center gap-2 text-neutral-900 dark:text-neutral-100 hover:opacity-75 transition-opacity"
            @click="navigateTo('/'); appStore.silderIsOpen = false"
          >
            <img src="../../assets/git.png" class="h-6 w-auto">
            <span class="font-semibold text-sm">Git101</span>
          </button>
          <button
            class="flex items-center justify-center w-8 h-8 rounded-lg text-neutral-500
            hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
            @click="appStore.silderIsOpen = false"
          >
            <Icon name="heroicons-outline:x" class="text-lg" />
          </button>
        </div>

        <!-- Nav — flex-1 + min-h-0 ile Navigation'ın kendi scroll'u çalışır -->
        <div class="flex-1 min-h-0 px-3 py-5">
          <Navigation
            class="h-full"
            @click-to="(_page: ContentNavigationItem) => {
              appStore.silderIsOpen = false
            }"
          />
        </div>

        <!-- Footer cards -->
        <div class="px-4 pb-5 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-col gap-2 flex-shrink-0">
          <CardCommunity />
          <CardBook />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
