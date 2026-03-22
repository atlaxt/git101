<script setup lang="ts">
const props = defineProps<{
  title: string
}>()
</script>

<template>
  <p class="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
    {{ props.title }}
  </p>
</template>
