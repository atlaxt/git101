<script setup>
defineProps({
  href: {
    type: String,
    required: true,
  },
  external: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <span class="not-prose">
    <NuxtLink
      :to="href"
      :external="external"
      class="inline-flex items-center gap-1.5 text-sm font-medium
      !text-white bg-neutral-900 dark:bg-neutral-100 dark:!text-neutral-900
      px-3 py-1.5 rounded-lg no-underline hover:opacity-85 transition-opacity"
    >
      <Icon
        v-if="icon"
        :name="icon"
        class="w-4 h-4"
      />
      <slot mdc-unwrap="p" />
    </NuxtLink>
  </span>
</template>
