<template>
  <div class="w-full max-w-[1400px] mx-auto flex flex-row min-h-screen px-6">
    <!-- Left sidebar -->
    <aside class="lg:block md:block hidden w-64 xl:w-72 flex-shrink-0">
      <Navigation class="sticky top-14 h-[calc(100vh-3.5rem)] pt-8 pb-6 pr-6" />
    </aside>

    <!-- Main content -->
    <div class="flex-1 min-w-0 pt-8 pb-16 lg:px-8 xl:px-12">
      <main>
        <slot />
      </main>
      <div class="mt-12 pt-8 border-t border-neutral-100 dark:border-neutral-800">
        <NavigationContent />
      </div>
    </div>

    <!-- Right TOC sidebar -->
    <aside class="w-52 xl:w-56 flex-shrink-0 md:hidden hidden lg:flex flex-col">
      <NavigationSections class="sticky top-14 pt-8 pb-6 pl-6 h-[calc(100vh-3.5rem)] overflow-hidden">
        <div class="mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-800 flex flex-col gap-3">
          <CardCommunity />
          <CardBook />
        </div>
      </NavigationSections>
    </aside>
  </div>
</template>
