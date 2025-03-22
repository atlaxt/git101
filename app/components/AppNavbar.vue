<script setup lang="ts">
</script>

<template>
  <div
    class="flex mx-auto sm:px-8 items-center justify-center sticky top-0 z-[99999]
   bg-clip-padding backdrop-filter backdrop-blur-sm border-b dark:border-gray-800 border-gray-200
    "
  >
    <div class="w-full flex flex-row justify-between px-4 lg:py-4 py-2 items-center lg:max-w-6xl">
      <div class="cursor-pointer text-gray-700 dark:text-gray-200 text-xl flex flex-row items-center" @click="navigateTo('/')">
        <div class="flex dark:font-normal font-semibold doto flex-row items-center gap-2">
          <img src="../assets/git.png" class="lg:h-10 h-6">
          <div class="flex flex-col">
            <p class="lg:text-xl text-lg">
              {{ "Git101" }}
            </p>
            <!-- <p class="text-xs -mt-1">
              <span class="whitespace-nowrap text-[#D44A2F]">written by.</span>
              <span class="whitespace-nowrap ml-1">Ali Özgür</span>
            </p> -->
          </div>
        </div>
      </div>
      <div class="lg:flex gap-2 md:hidden hidden space-x-3 transition text-xl dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300">
        <Search />
        <ColorModeSwitch class="mt-2" />
      </div>
      <div class="lg:hidden md:block block ">
        <NavigationSlider />
      </div>
    </div>
  </div>
</template>
