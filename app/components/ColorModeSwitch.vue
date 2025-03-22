<script setup lang="ts">
const colorMode = useColorMode()
const onClick = () => (colorMode.value === 'light' ? (colorMode.preference = 'dark') : (colorMode.preference = 'light'))
</script>

<template>
  <button
    aria-label="Color Mode"
    class="inline-block cursor-pointer w-5 hover:text-[#cf3d21] hover:dark:text-[#D44A2F]"
    @click="onClick"
  >
    <ColorScheme placeholder="...">
      <template v-if="colorMode.value === 'dark'">
        <Icon
          name="dark-mode"
          class="text-xl"
        />
      </template>
      <template v-else>
        <Icon
          name="light-mode"
          class="text-xl"
        />
      </template>
    </ColorScheme>
  </button>
</template>
