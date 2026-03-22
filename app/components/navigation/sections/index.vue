<script setup lang="ts">
import { onMounted, ref } from 'vue'

const contentStore = useContentStore()
const currentSections = ref<string[]>([])

function observeSections() {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.6,
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id
        if (!currentSections.value.includes(sectionId)) {
          currentSections.value.push(sectionId)
        }
      }
      else {
        currentSections.value = currentSections.value.filter(id => id !== entry.target.id)
      }
    })
  }, options)

  setTimeout(() => {
    contentStore.sections.forEach((section) => {
      const sectionElement = document.getElementById(section.id)
      if (sectionElement)
        observer.observe(sectionElement)

      section.subSections?.forEach((subId) => {
        const subElement = document.getElementById(subId.id)
        if (subElement)
          observer.observe(subElement)
      })
    })
  }, 500)
}

function scrollToSection(id: string) {
  const sectionElement = document.getElementById(id)
  if (sectionElement) {
    const yOffset = -80
    const y = sectionElement.getBoundingClientRect().top + window.scrollY + yOffset

    window.scrollTo({ top: y, behavior: 'smooth' })

    history.replaceState(null, '', `#${id}`)
  }
}

onMounted(() => {
  observeSections()
})
</script>

<template>
  <div class="flex flex-col overflow-auto
    [&::-webkit-scrollbar]:w-[3px]
    [&::-webkit-scrollbar-track]:bg-transparent
    [&::-webkit-scrollbar-thumb]:rounded-full
    [&::-webkit-scrollbar-thumb]:bg-neutral-200
    dark:[&::-webkit-scrollbar-thumb]:bg-neutral-700"
  >
    <div v-if="contentStore.sections" class="flex flex-col gap-1">
      <NavigationSectionsTop />

      <template v-if="contentStore.sections.length > 0">
        <p class="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mt-5 mb-1">
          Bu Sayfanın İçeriği
        </p>
        <div class="flex flex-col gap-0.5 border-l border-neutral-100 dark:border-neutral-800 pl-3">
          <div v-for="section in contentStore.sections" :key="section.id" class="flex flex-col gap-0.5">
            <a
              :class="{
                'text-[#E85D3E] dark:text-[#F47B5F] font-medium': currentSections.includes(section.id),
                'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100': !currentSections.includes(section.id),
              }"
              class="cursor-pointer transition-colors py-0.5 text-xs leading-relaxed"
              @click.prevent="scrollToSection(section.id)"
            >
              {{ section.label }}
            </a>
            <a
              v-for="(subSection, key) in section.subSections"
              :key="key"
              :class="{
                'text-[#E85D3E] dark:text-[#F47B5F] font-medium': currentSections.includes(subSection.id),
                'text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100': !currentSections.includes(subSection.id),
              }"
              class="ml-3 cursor-pointer transition-colors py-0.5 text-xs leading-relaxed"
              @click.prevent="scrollToSection(subSection.id)"
            >
              {{ subSection.label }}
            </a>
          </div>
        </div>
      </template>
    </div>
    <slot />
  </div>
</template>
