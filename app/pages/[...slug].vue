<script setup lang="ts">
import type { LayoutKey } from '#build/types/layouts'

const route = useRoute()
const contentStore = useContentStore()

const page = ref()

const { data: _page } = await useAsyncData(`page-${route.params.slug}`, () => {
  return queryCollection('content').path(route.path).first()
})
page.value = _page.value

const { data: _navigation } = useAsyncData('navigation', () =>
  queryCollectionNavigation('content'))

watch(_page, (newPage) => {
  if (newPage) {
    page.value = newPage
    contentStore.setSections(newPage)

    const pageTitle = newPage.title
      ? `${newPage.title} | Git101`
      : 'Türkçe Git101 - Git ve Versiyon Kontrolü Eğitimi'
    const pageDescription = newPage.description
      ?? 'Git101 ile Git ve versiyon kontrolünü Türkçe öğrenin. Branching, merging, remote repository yönetimi ve ileri seviye Git komutlarını kapsamlı içeriklerle keşfedin.'
    const pageUrl = `https://git101.atlaxt.me${route.path}`

    useSeoMeta({
      title: pageTitle,
      description: pageDescription,
      ogTitle: pageTitle,
      ogDescription: pageDescription,
      ogUrl: pageUrl,
      twitterTitle: pageTitle,
      twitterDescription: pageDescription,
    })

    const segments = route.path.split('/').filter(Boolean)
    const breadcrumbItems = [
      { '@type': 'ListItem', position: 1, name: 'Git101', item: 'https://git101.atlaxt.me' },
      ...segments.map((seg, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: newPage.title ?? seg,
        item: `https://git101.atlaxt.me/${segments.slice(0, i + 1).join('/')}`,
      })),
    ]

    useHead({
      link: [{ rel: 'canonical', href: pageUrl }],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TechArticle',
            headline: newPage.title ?? 'Git101',
            description: newPage.description ?? '',
            url: pageUrl,
            inLanguage: 'tr',
            isPartOf: { '@type': 'WebSite', url: 'https://git101.atlaxt.me' },
          }),
        },
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: breadcrumbItems,
          }),
        },
      ],
    })
  }
}, { immediate: true })

watch(_navigation, (newNav) => {
  if (newNav) {
    contentStore.setNavigation(newNav)
  }
}, { immediate: true })
</script>

<template>
  <NuxtLayout :name="page?.layout as LayoutKey || 'default'">
    <ContentRenderer
      v-if="page"
      :value="page"
      class="prose dark:prose-invert
      prose-pre:bg-neutral-50 dark:prose-pre:bg-neutral-900/80
      prose-neutral
      min-w-full"
    />
  </NuxtLayout>
</template>
