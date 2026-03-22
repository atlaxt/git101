<script setup lang="ts">
const appConfig = useAppConfig()
const links = [
  { icon: 'academicons:academia', text: 'Kaynağa Git', href: appConfig.links.sourceUrl },
  { icon: 'mdi:github', text: 'Siteyi Yıldızla', href: appConfig.links.repoGithub },
]
</script>

<template>
  <div class="flex flex-col gap-1">
    <p class="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 px-2 mb-1">
      Topluluk
    </p>
    <div class="flex flex-col">
      <a
        v-for="(link, index) in links"
        :key="index"
        :href="link.href"
        target="_blank"
        class="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs
        text-neutral-600 dark:text-neutral-400
        hover:text-neutral-900 dark:hover:text-neutral-100
        hover:bg-neutral-50 dark:hover:bg-neutral-800/50
        transition-all group"
      >
        <Icon :name="link.icon" class="w-3.5 h-3.5 flex-shrink-0" />
        <span>{{ link.text }}</span>
        <Icon name="lucide:arrow-up-right" class="w-2.5 h-2.5 ml-auto opacity-0 group-hover:opacity-50 transition-opacity" />
      </a>
    </div>
  </div>
</template>
