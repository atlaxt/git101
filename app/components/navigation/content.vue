<script setup lang="ts">
const contentStore = useContentStore()
const currentPageNavigationIndex = ref<number>()
const prevPage = ref<{ path: string, stem: string, title: string }>()
const nextPage = ref<{ path: string, stem: string, title: string }>()

const prevCardHover = ref<boolean>(false)
const nextCardHover = ref<boolean>(false)

onMounted(() => {
  currentPageNavigationIndex.value = contentStore.contentNavigationMap.findIndex(item => item.stem === contentStore.page.stem)
  prevPage.value = contentStore.contentNavigationMap[currentPageNavigationIndex.value - 1]
  nextPage.value = contentStore.contentNavigationMap[currentPageNavigationIndex.value + 1]
})
</script>

<template>
  <div class="w-full flex lg:flex-row flex-col justify-between lg:h-24 lg:gap-12 gap-4">
    <NuxtLink
      class=" flex w-full flex-col rounded justify-around gap-4 border border-dashed py-2 px-4 "
      :class="{
        'text-[#cf3d21] dark:text-[#D44A2F]': prevCardHover && prevPage?.path,
        'dark:text-gray-400': !prevCardHover && prevPage?.path,
      }"
      :to="prevPage?.path"
      @mouseover="prevCardHover = true"
      @mouseleave="prevCardHover = false"
    >
      <div
        v-if="prevPage?.path"
        class="border rounded-full flex items-center justify-center w-7 h-7"
        :class="{
          '': prevCardHover,
          'dark:border-gray-400 border-gray-700': !prevCardHover && prevPage?.path,
        }"
      >
        <Icon name="heroicons:arrow-left" class="text-lg" />
      </div>
      {{ prevPage?.title }}
    </NuxtLink>

    <NuxtLink
      class=" flex w-full flex-col rounded justify-around items-end gap-4 border border-dashed py-2 px-4 "
      :class="{
        'text-[#cf3d21] dark:text-[#D44A2F]': nextCardHover && nextPage?.path,
        'dark:text-gray-400': !nextCardHover && nextPage?.path,
      }"
      :to="nextPage?.path"
      @mouseover="nextCardHover = true"
      @mouseleave="nextCardHover = false"
    >
      <div
        v-if="nextPage?.path"
        class="border rounded-full flex items-center justify-center w-7 h-7"
        :class="{
          '': nextCardHover,
          'dark:border-gray-400 border-gray-700': !nextCardHover && nextPage?.path,
        }"
      >
        <Icon name="heroicons:arrow-right" class="text-lg" />
      </div>
      {{ nextPage?.title }}
    </NuxtLink>
  </div>
</template>
