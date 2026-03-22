<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')
const onClick = () => (!isDark.value ? (colorMode.preference = 'dark') : (colorMode.preference = 'light'))
</script>

<template>
  <button
    aria-label="Color Mode"
    class="flex items-center justify-center w-8 h-8 rounded-lg
    text-neutral-500 dark:text-neutral-400
    hover:text-neutral-900 dark:hover:text-neutral-100
    hover:bg-neutral-100 dark:hover:bg-neutral-800
    transition-all cursor-pointer"
    @click="onClick"
  >
    <Icon :name="`heroicons:${isDark ? 'sun' : 'moon'}`" class="w-4 h-4" />
  </button>
</template>
