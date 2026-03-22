<script setup lang="ts">
</script>

<template>
  <header
    class="sticky top-0 z-[99999] w-full border-b border-neutral-200 dark:border-neutral-800
    bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md"
  >
    <div class="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-6">
      <!-- Logo -->
      <button
        class="flex items-center gap-2.5 text-neutral-900 dark:text-neutral-100 hover:opacity-75 transition-opacity"
        @click="navigateTo('/')"
      >
        <img src="../assets/git.png" class="h-7 w-auto" alt="Git101 Logo">
        <span class="font-semibold text-base tracking-tight">Git101</span>
      </button>

      <!-- Desktop actions -->
      <div class="hidden lg:flex items-center gap-1">
        <Search />
        <div class="h-4 w-px bg-neutral-200 dark:bg-neutral-700 mx-2" />
        <ColorModeSwitch />
      </div>

      <!-- Mobile actions -->
      <div class="flex lg:hidden items-center">
        <NavigationSlider />
      </div>
    </div>
  </header>
</template>
