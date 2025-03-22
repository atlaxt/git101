<script setup lang="ts">
const props = defineProps<{
  title: string
}>()
</script>

<template>
  <div class="w-full font-black dark:text-white">
    {{ props.title }}
  </div>
</template>
