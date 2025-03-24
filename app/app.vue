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
    { property: 'og:image', content: 'https://git101.atlasyigitaydin.com/seo-card.png' },
    { name: 'twitter:image', content: 'https://git101.atlasyigitaydin.com/seo-card.png' },
  ],
  link: [
    { rel: 'canonical', href: 'https://git101.atlasyigitaydin.com' },
  ],
})

useSeoMeta({
  title: 'Türkçe Git101 - Git ve Versiyon Kontrolü Eğitimi',
  description: 'Git101 ile Git ve versiyon kontrolünü öğrenin. Branching, merging, remote repository yönetimi ve ileri seviye Git komutlarını kapsamlı içeriklerle keşfedin.',
  ogTitle: 'Türkçe Git101 - Git ve Versiyon Kontrolü Eğitimi',
  ogDescription: 'Git101 ile Git ve versiyon kontrolünü Türkçe öğrenin. Kapsamlı ve pratik içeriklerle Git uzmanı olun.',
  ogUrl: 'https://git101.atlasyigitaydin.com',
  ogType: 'website',
  twitterTitle: 'Türkçe Git101 - Git ve Versiyon Kontrolü Eğitimi',
  twitterDescription: 'Git101 ile Git ve versiyon kontrolünü Türkçe öğrenin.',
  twitterCard: 'summary_large_image',
  ogImage: 'https://git101.atlasyigitaydin.com/seo-card.png',
  twitterImage: 'https://git101.atlasyigitaydin.com/seo-card.png',
})
</script>

<template>
  <div class="sm:pb-10 nunito-sans">
    <Html lang="tr" />
    <AppNavbar />
    <NuxtPage />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:opsz@6..12&display=swap');

.nunito-sans {
  font-family: "Nunito Sans", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}
</style>
