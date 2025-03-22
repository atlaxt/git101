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
  <div class="flex flex-col overflow-auto dark:text-white capitalize text-sm">
    <div v-if="contentStore.sections" class="text-left flex flex-col gap-3">
      <NavigationSectionsTop />
      <div v-if="contentStore.sections.length > 0" class="flex flex-col gap-2">
        <div class="w-full border-t border-dashed dark:border-neutral-700 border-neutral-400" />
        <NavigationSectionsHeader title="Bu Sayfanın İçeriği" class="mt-2" />
      </div>
      <div v-for="section in contentStore.sections" :key="section.id">
        <div class="flex flex-col truncate gap-2">
          <a
            :class="{
              'text-[#cf3d21] dark:text-[#D44A2F]': currentSections.includes(section.id),
              'dark:text-white text-black opacity-70 hover:opacity-100 ': !currentSections.includes(section.id),
            }"
            class="cursor-pointer text-wrap animation-all duration-100"
            @click.prevent="scrollToSection(section.id)"
          >
            {{ section.label }}
          </a>
          <a
            v-for="(subSection, key) in section.subSections"
            :key="key"
            :class="{
              'text-[#cf3d21] dark:text-[#D44A2F]': currentSections.includes(subSection.id),
              'dark:text-white text-black opacity-70 hover:opacity-100': !currentSections.includes(subSection.id),
            }"
            class="ml-4 text-wrap cursor-pointer animation-all duration-100"
            @click.prevent="scrollToSection(subSection.id)"
          >
            {{ subSection.label }}
          </a>
        </div>
      </div>
    </div>
    <slot />
  </div>
</template>
