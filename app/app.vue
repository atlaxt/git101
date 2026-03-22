<script setup lang="ts">
useHead({
  title: 'Türkçe Git101 - Git ve Versiyon Kontrolü Eğitimi',
  meta: [
    { name: 'description', content: 'Git101 ile Git ve versiyon kontrolünü Türkçe öğrenin. Branching, merging, remote repository yönetimi ve ileri seviye Git komutlarını kapsamlı içeriklerle keşfedin.' },
    { name: 'keywords', content: 'git, versiyon kontrolü, türkçe git eğitimi, git branching, git merging, remote repository' },
    { property: 'og:title', content: 'Türkçe Git101 - Git ve Versiyon Kontrolü Eğitimi' },
    { property: 'og:description', content: 'Git101 ile Git ve versiyon kontrolünü Türkçe öğrenin. Kapsamlı ve pratik içeriklerle Git uzmanı olun.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'tr_TR' },
    { property: 'og:site_name', content: 'Git101 - Türkçe Git Eğitimi' },
    { property: 'og:image', content: 'https://git101.atlaxt.me/seo-card.png' },
    { name: 'twitter:image', content: 'https://git101.atlaxt.me/seo-card.png' },
  ],
  link: [
    { rel: 'canonical', href: 'https://git101.atlaxt.me' },
    { rel: 'alternate', hreflang: 'tr', href: 'https://git101.atlaxt.me' },
    { rel: 'alternate', hreflang: 'x-default', href: 'https://git101.atlaxt.me' },
  ],
})

useSeoMeta({
  title: 'Türkçe Git101 - Git ve Versiyon Kontrolü Eğitimi',
  description: 'Git101 ile Git ve versiyon kontrolünü öğrenin. Branching, merging, remote repository yönetimi ve ileri seviye Git komutlarını kapsamlı içeriklerle keşfedin.',
  ogTitle: 'Türkçe Git101 - Git ve Versiyon Kontrolü Eğitimi',
  ogDescription: 'Git101 ile Git ve versiyon kontrolünü Türkçe öğrenin. Kapsamlı ve pratik içeriklerle Git uzmanı olun.',
  ogUrl: 'https://git101.atlaxt.me',
  ogType: 'website',
  twitterTitle: 'Türkçe Git101 - Git ve Versiyon Kontrolü Eğitimi',
  twitterDescription: 'Git101 ile Git ve versiyon kontrolünü Türkçe öğrenin.',
  twitterCard: 'summary_large_image',
  ogImage: 'https://git101.atlaxt.me/seo-card.png',
  twitterImage: 'https://git101.atlaxt.me/seo-card.png',
})
</script>

<template>
  <div>
    <Html lang="tr" />
    <Head>
      <Script type="application/ld+json">
        {{
          JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            "name": 'Git101 - Türkçe Git Eğitimi',
            "url": 'https://git101.atlaxt.me',
            "inLanguage": 'tr',
            "description": 'Git ve versiyon kontrolünü Türkçe öğrenin.',
          })
        }}
      </Script>
    </Head>
    <AppNavbar />
    <NuxtPage />
  </div>
</template>
