// Pinia Store
import { defineStore } from 'pinia'
import filters from "@/assets/data/schema/filters.json"

export const useFiltersStore = defineStore('filters', {
  state: () => ({
    filtersMap: new Map()
  }),

  getters: {
    filters: (state) => state.filtersMap
  },

  actions: {
    async loadFilters() {
      this.updateFilters(filters)
    },
    updateFilters(filters: any) {
      filters.forEach((type: any) => {
        this.filtersMap.set(type.elementType, type.filters)
      });
    },
    clearFilters() {
      this.$reset()
    }
  }
})