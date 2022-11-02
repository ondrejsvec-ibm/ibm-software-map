// Pinia Store
import { defineStore } from 'pinia'

export const useLanguageStore = defineStore('language', {
  state: () => ({
    locale: 'en',
    fallbackLocale: 'en'
  }),

  getters: {
    language: (state) => state.locale
  },

  actions: {
    async loadLanguage() {
      this.updateLanguage('en')
    },
    updateLanguage(payload: any) {
      this.locale = payload;
    },
    clearLanguage() {
      this.$reset()
    }
  }
})