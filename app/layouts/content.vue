<template>
  <div class="w-full flex flex-row justify-center">
    <div class="max-w-full lg:block md:block hidden">
      <Navigation class="flex sticky top-24 mx-8 h-[calc(85vh)]" />
    </div>

    <div class="lg:px-0 md:px-0 px-4 border-white lg:mt-6 md:mt-3 mt-3 sm:mt-0 min-h-screen lg:max-w-4xl w-full">
      <main class="">
        <slot />
      </main>
    </div>

    <div class="w-60 z-50 md:hidden hidden lg:flex flex-col">
      <NavigationSections class="h-[calc(85vh)] flex justify-start sticky top-24 mx-8">
        <div class="my-4 w-full border-t border-dashed dark:border-neutral-700 border-neutral-400" />
        <CardCommunity />
        <div class="my-4 w-full " />
        <CardBook />
      </NavigationSections>
    </div>
  </div>
</template>
