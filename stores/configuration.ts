// Pinia Store
import { defineStore } from 'pinia'

interface Configuration {
  isPeriodLoading: boolean
}

export const useConfigurationStore = defineStore('configuration', {
  state: () => {
    return {
      isPeriodLoading: true
    }
  },

  getters: {
    isPeriodLoading: (state) => state.isPeriodLoading
  },

  actions: {
    updateConfiguration(configuration: Configuration) {
      this.isPeriodLoading = configuration.isPeriodLoading
    },
    clearConfiguration() {
      this.$reset()
    }
  }
})