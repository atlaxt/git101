<script setup lang="ts">
const appConfig = useAppConfig()
const links = [
  { icon: 'academicons:academia', text: 'Kaynağa Git', href: appConfig.links.sourceUrl },
  { icon: 'mdi:github', text: 'Siteyi Yıldızla', href: appConfig.links.repoGithub },
  // { icon: 'heroicons:user', text: 'Edit this page', href: appConfig.links.github },
]
</script>

<template>
  <div class="flex flex-col whitespace-nowrap">
    <NavigationSectionsHeader title="Topluluk" class="my-2" />
    <div class="flex lg:flex-col md:flex-col lg:justify-start md:justify-start justify-end flex-row gap-3 text-sm text-neutral-700 dark:text-neutral-300">
      <a
        v-for="(link, index) in links"
        :key="index"
        :href="link.href"
        target="_blank"
        class="flex items-center gap-2 hover:text-neutral-900 dark:hover:text-white transition-colors"
      >
        <Icon :name="link.icon" class="text-lg" />
        <div class="flex ">

          <span>{{ link.text }}</span>
          <Icon name="lucide:arrow-up-right" class="text-xs" />
        </div>
      </a>
    </div>
  </div>
</template>
