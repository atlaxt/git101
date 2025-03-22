<script setup lang="ts">
useHead({
  title: 'Git101',
})
</script>

<template>
  <div class="sm:pb-10 nunito-sans">
    <Html lang="en" />
    <NuxtLoadingIndicator />
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
