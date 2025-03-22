export const useAppStore = defineStore('app', () => {
  const silderIsOpen = ref(false)
  const searchModalIsOpen = ref(false)

  return {
    silderIsOpen,
    searchModalIsOpen,
  }
})
