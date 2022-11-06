<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <section class="sidebar">
      <div class="sidebar" role="tablist">

        <div class="sidebar-header">
          <span class="disclaimer">{{ $t("interface.disclaimer") }}</span>
        </div>
        <div v-if="showFilters === 'true'" class="accordion">
          <div class="form-group">
            <n-input
              placeholder="Search"
              class="form-control"
              v-model:value="search"
            >
              <template #prefix>
                <n-icon :component="Search" />
              </template>
            </n-input>
          </div>

          <div class="accordion-filters">
            <n-card
              content-style="padding: 0;"
              class="card"
              v-for="filterType in Object.keys(filters.get(elementType)).filter(
                (e) => e != `search`
              )"
              :key="filterType"
            >
              <n-collapse
                :id="'accordion-' + filterType + 'Filters'"
                display-directive="if"
                class="card"
                :default-expanded-names="mainFilterType"
              >
                <template #header-extra>
                  <n-icon :component="Search" />
                </template>
                <n-collapse-item
                  :title="$t('interface.' + filterType + 'Filters')"
                  :name="filterType"
                  class="accordion-header"
                >
                  <div
                    class="description"
                    v-if="
                      filters.get(elementType)[filterType].match !==
                      'sub_filters'
                    "
                  >
                    <div
                      v-for="filter in filters.get(elementType)[filterType]
                        .values"
                      :key="filter"
                      class="item types"
                      @mouseleave="
                        onFilterLeave(
                          filterType,
                          filters.get(elementType)[filterType].match,
                          filter
                        )
                      "
                      @mouseover="
                        onFilterEnter(
                          filterType,
                          filters.get(elementType)[filterType].match,
                          filter
                        )
                      "
                      @click="
                        onFilterClick(
                          filterType,
                          filters.get(elementType)[filterType].match,
                          filter
                        )
                      "
                      :class="[
                        `color-${
                          filterType === mainFilterType ? filter : 'filter'
                        }`,
                        {
                          blur:
                            activeFilters.length > 0 &&
                            activeFilters.filter(
                              (item) =>
                                item.match ===
                                  filters.get(elementType)[filterType].match &&
                                item.type === filterType &&
                                item.value === filter
                            ).length === 0,
                          set: activeFilters.length > 0,
                        },
                      ]"
                    >
                      {{ $t(filterType + "Names." + filter) }}
                    </div>
                  </div>
                  <!-- Other Filters -->
                  <div
                    class="description"
                    v-if="
                      filters.get(elementType)[filterType].match ===
                      'sub_filters'
                    "
                  >
                    <div
                      v-for="(filter, index) in filters.get(elementType)[
                        filterType
                      ].values"
                      :key="index"
                    >
                      <div
                        v-if="
                          filter.values !== undefined &&
                          Array.isArray(filter.values)
                        "
                        class="description"
                      >
                        <div
                          v-for="otherFilter in filter.values"
                          :key="otherFilter"
                          class="item types"
                          @mouseleave="
                            onFilterLeave(
                              filter.propertyName,
                              filter.match,
                              otherFilter
                            )
                          "
                          @mouseover="
                            onFilterEnter(
                              filter.propertyName,
                              filter.match,
                              otherFilter
                            )
                          "
                          @click="
                            onFilterClick(
                              filter.propertyName,
                              filter.match,
                              otherFilter
                            )
                          "
                          :class="[
                            'color-filter',
                            {
                              blur:
                                activeFilters.length > 0 &&
                                activeFilters.filter(
                                  (item) =>
                                    item.match === filter.match &&
                                    item.type === filter.propertyName &&
                                    item.value === otherFilter
                                ).length === 0,
                              set: activeFilters.length > 0,
                            },
                          ]"
                        >
                          {{ $t(filterType + "Names." + otherFilter) }}
                        </div>
                      </div>
                      <div v-else class="description">
                        <div
                          class="item types"
                          @mouseleave="
                            onFilterLeave(
                              filter.propertyName,
                              filter.match,
                              filter.name
                            )
                          "
                          @mouseover="
                            onFilterEnter(
                              filter.propertyName,
                              filter.match,
                              filter.name
                            )
                          "
                          @click="
                            onFilterClick(
                              filter.propertyName,
                              filter.match,
                              filter.name
                            )
                          "
                          :class="[
                            'color-filter',
                            {
                              blur:
                                activeFilters.length > 0 &&
                                activeFilters.filter(
                                  (item) =>
                                    item.match === filter.match &&
                                    item.type === filter.propertyName &&
                                    item.value === filter.name
                                ).length === 0,
                              set: activeFilters.length > 0,
                            },
                          ]"
                        >
                          {{ $t(filterType + "Names." + filter.name) }}
                        </div>
                      </div>
                    </div>
                  </div>
                </n-collapse-item>
              </n-collapse>
            </n-card>
          </div>
        </div>
        <div class="end">
          <div class="github">
            <a
              href="https://github.com/ondrejsvec-ibm/ibm-software-map"
              target="_blank"
            >
              GitHub Source Repository
            </a>
          </div>
        </div>
      </div>
    </section>
  </n-config-provider>
</template>

<script>
import { useFiltersStore } from "@/stores/filters";
import { storeToRefs } from "pinia";
import { computed, onServerPrefetch, defineComponent } from "vue";
import { Search } from "@vicons/carbon";

export default {
  setup() {
    /**
     * Use this for type hints under js file
     * @type import('naive-ui').GlobalThemeOverrides
     */
    const themeOverrides = {
      Collapse: {
        titleTextColor: "white",
        arrowColor: "white",
      },
      Input: {
        textColor: "white",
        colorFocus: "#2e3440",
      },
    };

    const filtersStore = useFiltersStore();
    const { filters } = storeToRefs(filtersStore);

    const loadFilters = async () => {
      await filtersStore.loadFilters();
    };

    onServerPrefetch(loadFilters);

    return { filters, Search, themeOverrides };
  },
  name: "side-bar",
  props: {
    elementType: {
      type: String,
      default() {
        return "swTable";
      },
    },
    mainFilterType: {
      type: String,
      default() {
        return "cloudPak";
      },
    },
    showFilters: {
      type: String,
      default() {
        return "true";
      },
    },
  },
  data() {
    return {
      isBlurSet: false,
      activeFilters: [],
      activeFilter: {
        type: null,
        match: null,
        value: "",
      },
    };
  },
  // directives: {
  //   "b-toggle": VBToggle,
  // },
  computed: {
    search: {
      get() {
        for (var i = 0; i < this.activeFilters.length; i++) {
          if (this.activeFilters[i].match === "search") {
            return this.activeFilters[i].value;
          }
        }
        return "";
      },
      set(value) {
        if (value === "") {
          this.activeFilters = this.activeFilters.filter(
            (item) => item.match !== "search"
          );
        } else {
          var found = false;
          for (var i = 0; i < this.activeFilters.length; i++) {
            if (this.activeFilters[i].match == "search") {
              this.activeFilters[i].value = value;
              found = true;
              break;
            }
          }
          if (!found) {
            this.activeFilters.push({
              type: "search",
              match: "search",
              value: value,
              sticky: false,
            });
          }
        }
        this.$emit("activeFilterChange", this.activeFilters);
      },
    },
  },
  methods: {
    onFilterClick(type, match, value) {
      var found = false;
      for (var i = 0; i < this.activeFilters.length; i++) {
        if (
          this.activeFilters[i].type === type &&
          this.activeFilters[i].match === match &&
          this.activeFilters[i].value === value
        ) {
          if (this.activeFilters[i].sticky) {
            this.activeFilters.splice(i, 1);
          } else {
            this.activeFilters[i].sticky = true;
          }
          found = true;
          break;
        }
      }

      if (!found) {
        this.activeFilters.push({
          type: type,
          match: match,
          value: value,
          sticky: true,
        });
      }
      this.$emit("activeFilterChange", this.activeFilters);
    },
    onFilterEnter(type, match, value) {
      var found = false;
      for (var i = 0; i < this.activeFilters.length; i++) {
        if (
          this.activeFilters[i].type === type &&
          this.activeFilters[i].match === match &&
          this.activeFilters[i].value === value
        ) {
          found = true;
          break;
        }
      }

      if (!found) {
        this.activeFilters.push({
          type: type,
          match: match,
          value: value,
          sticky: false,
        });
      }
      this.$emit("activeFilterChange", this.activeFilters);
    },
    onFilterLeave(type, match, value) {
      for (var i = 0; i < this.activeFilters.length; i++) {
        if (
          this.activeFilters[i].type === type &&
          this.activeFilters[i].match === match &&
          this.activeFilters[i].value === value &&
          !this.activeFilters[i].sticky
        ) {
          this.activeFilters.splice(i, 1);
          break;
        }
      }
      this.$emit("activeFilterChange", this.activeFilters);
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/config/variable.scss";
@import "@/assets/scss/components/sidebar.scss";
@import "@/assets/scss/config/filter-colors.scss";
</style>
