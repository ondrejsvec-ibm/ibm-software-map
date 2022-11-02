
<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <section class="periodictable-container-section">
      <div class="periodictable-container">
        <div class="periodictable">
          <button
            class="item"
            v-for="el in elements.get(elementType).first"
            :key="el[elementInfoTagMiddle]"
            @click="openModal(el)"
            @mouseover="showElement(el)"
            :class="[`color-${el[mainFilterType]}`, { blur: blurElement(el) }]"
          >
            <span class="small" v-if="elementInfoTagTop">{{
              $t(elementInfoTagTop + "Shorts." + el[elementInfoTagTop])
            }}</span>
            {{ el[elementInfoTagMiddle] }}
            <span class="product_name">{{ el[elementInfoTagBottom] }}</span>
          </button>
        </div>

        <div class="periodictable">
          <div class="elementinfo" v-if="info[mainFilterType]">
            <div class="title">
              <div class="abreviation" :class="`color-${info[mainFilterType]}`">
                {{ info[elementInfoTagMiddle] }}
              </div>
              <div class="name">
                <h3>{{ $t("element." + elementInfoTagBottom) }}</h3>
                <span>{{ info[this.elementInfoTagBottom] }}</span>
              </div>
            </div>

            <div class="detail">
              <div class="ditem">
                <p class="info">{{ $t("element." + mainFilterType) }}</p>
                <p class="val" :class="`color-${info[mainFilterType]}`">
                  {{
                    Array.isArray(info[mainFilterType])
                      ? info[mainFilterType]
                          .map((e) => $t(mainFilterType + "Names." + e))
                          .join(", ")
                      : $t(mainFilterType + "Names." + info[mainFilterType])
                  }}
                </p>
              </div>
              <div class="ditem" v-if="elementInfoTagTop">
                <p class="info">{{ $t("element." + elementInfoTagTop) }}</p>
                <p class="val" :class="`color-${info[mainFilterType]}`">
                  {{
                    $t(elementInfoTagTop + "Names." + info[elementInfoTagTop])
                  }}
                </p>
              </div>
            </div>

            <div class="detail" v-if="additionalInfoDisplayData">
              <div class="long_ditem">
                <p class="info">
                  {{ $t("element." + additionalInfoDisplayData) }}
                </p>
                <p class="val" :class="`color-${info[mainFilterType]}`">
                  {{
                    Array.isArray(info[additionalInfoDisplayData])
                      ? info[additionalInfoDisplayData]
                          .map((e) =>
                            $t(additionalInfoDisplayData + "Names." + e)
                          )
                          .join(", ")
                      : $t(
                          additionalInfoDisplayData +
                            "Names." +
                            info[additionalInfoDisplayData]
                        )
                  }}
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            class="item"
            v-for="(el, index) in elements.get(elementType).second"
            :key="el[elementInfoTagMiddle]"
            @click="openModal(el)"
            @mouseover="showElement(el)"
            :class="[
              `color-${el[mainFilterType]}`,
              {
                second: (index === 1) | (index === 9),
                blur: blurElement(el),
              },
            ]"
          >
            <span class="small" v-if="elementInfoTagTop">{{
              $t(elementInfoTagTop + "Shorts." + el[elementInfoTagTop])
            }}</span>
            {{ el[elementInfoTagMiddle] }}
            <span class="product_name">{{ el[elementInfoTagBottom] }}</span>
          </button>
        </div>

        <div class="periodictable">
          <button
            type="button"
            class="item"
            @click="openModal(el)"
            @mouseover="showElement(el)"
            v-for="el in elements.get(elementType).body"
            :key="el[elementInfoTagMiddle]"
            :class="[{ blur: blurElement(el) }, `color-${el[mainFilterType]}`]"
          >
            <span class="small" v-if="elementInfoTagTop">{{
              $t(elementInfoTagTop + "Shorts." + el[elementInfoTagTop])
            }}</span>
            {{ el[elementInfoTagMiddle] }}
            <span class="product_name">{{ el[elementInfoTagBottom] }}</span>
          </button>
        </div>

        <div class="periodictable p-footer">
          <button
            type="button"
            class="item"
            v-for="el in elements.get(elementType).bottom"
            @click="openModal(el)"
            @mouseover="showElement(el)"
            :key="el[elementInfoTagMiddle]"
            :class="[`color-${el[mainFilterType]}`, { blur: blurElement(el) }]"
          >
            <span class="small" v-if="elementInfoTagTop">{{
              $t(elementInfoTagTop + "Shorts." + el[elementInfoTagTop])
            }}</span>
            {{ el[elementInfoTagMiddle] }}
            <span class="product_name">{{ el[elementInfoTagBottom] }}</span>
          </button>
        </div>
        <side-bar
          :elementType="elementType"
          v-on:activeFilterChange="updateActiveFilter"
          :mainFilterType="mainFilterType"
          showFilters="true"
        />
      </div>
      <n-modal
        v-model:show="showModal"
        class="element-modal"
        preset="card"
        :bordered="false"
        size="small"
        :style="bodyStyle"
        :on-after-leave="closeModal"
      >
        <element-modal
          :element="modalData"
          :colorIdentifier="modalData.cloudPak"
          :themeOverrides="themeOverrides"
        />
      </n-modal>
    </section>
  </n-config-provider>
</template>

<script>
import { computed, onServerPrefetch } from "vue";
import ElementModal from "./ElementModal.vue";
import SideBar from "./SideBar.vue";
import { useElementsStore } from "@/stores/elements";
import { useFiltersStore } from "@/stores/filters";
import { storeToRefs } from "pinia";
import Menu from "./Menu.vue";

export default {
  setup() {
    /**
     * Use this for type hints under js file
     * @type import('naive-ui').GlobalThemeOverrides
     */
    const themeOverrides = {
      Card: {
        color: "#3b4252",
      },
      Tabs: {
        colorSegment: "#3b4252",
        tabColorSegment: "#2e3440",
        tabTextColorSegment: "gray",
        tabTextColorActiveSegment: "white",
        tabTextColorHoverSegment: "white",
      },
      Button: {
        textColor: "white"
      }
    };

    const filtersStore = useFiltersStore();
    const { filters } = storeToRefs(filtersStore);

    const loadFilters = async () => {
      await filtersStore.loadFilters();
    };

    const elementsStore = useElementsStore();
    const { elements } = storeToRefs(elementsStore);

    const loadElements = async () => {
      await elementsStore.loadSWTableElements();
    };

    onServerPrefetch(loadElements);
    onServerPrefetch(loadFilters);

    return { elements, filters, themeOverrides };
  },
  name: "periodic-table",
  props: {
    elementType: {
      type: String,
      default() {
        return "swTable";
      },
    },
    elementInfoTagTop: {
      type: String,
      default() {
        return "";
      },
    },
    elementInfoTagMiddle: {
      type: String,
      default() {
        return "productAbreviation";
      },
    },
    elementInfoTagBottom: {
      type: String,
      default() {
        return "productName";
      },
    },
    additionalInfoDisplayData: {
      type: String,
      default() {
        return "";
      },
    },
    mainFilterType: {
      type: String,
      default() {
        return "cloudPak";
      },
    },
  },
  data() {
    return {
      products: null,
      showModal: false,
      modalData: [],
      info: {},
      loaded: false,
      activeFilters: [],
      bodyStyle: {
        backgroundColor: "#3b4252",
      },
    };
  },
  components: {
    ElementModal,
    SideBar,
    Menu,
  },
  methods: {
    openModal(element) {
      this.modalData = element;
      this.info = element;
      this.showModal = true;
    },
    closeModal() {
      this.modalData = [];
      this.showModal = false;
    },
    showElement(element) {
      this.info = element;
    },
    updateActiveFilter(activeFilters) {
      this.activeFilters = activeFilters;
    },
    blurElement(el) {
      if (this.activeFilters === null || this.activeFilters.length === 0) {
        return false;
      } else {
        for (var i = 0; i < this.activeFilters.length; i++) {
          if (this.processFilter(el, this.activeFilters[i])) {
            return true;
          }
        }
        return false;
      }
    },
    processFilter(el, filter) {
      if (filter.type === null) {
        return false;
      } else if (filter.match === "search") {
        return (
          !el[this.elementInfoTagBottom]
            .toLowerCase()
            .includes(filter.value.toLowerCase()) &&
          !el[this.elementInfoTagMiddle]
            .toLowerCase()
            .includes(filter.value.toLowerCase())
        );
      } else if (filter.type === this.mainFilterType) {
        // Specific handling for main filters
        //ToDo: refactor into non dependant handling, possibly to be passed from top or in the filter definition
        if (
          Array.isArray(el[this.mainFilterType]) &&
          el[this.mainFilterType].includes(filter.value)
        ) {
          return false;
        }
        if (filter.value === "cloud_pak") {
          if (el[this.mainFilterType] !== "not_cloud_pak") {
            return false;
          }
        } else if (filter.value === "not_cloud_pak") {
          if (el[this.mainFilterType] === "not_cloud_pak") {
            return false;
          }
        } else {
          return filter.value != el[this.mainFilterType];
        }
      } else {
        return (
          el[filter.type] === undefined ||
          (this.filters.get(this.elementType)[filter.type] !== undefined &&
            ((this.filters.get(this.elementType)[filter.type].match == "in" &&
              !el[filter.type].includes(filter.value)) ||
              (this.filters.get(this.elementType)[filter.type].match ==
                "equals" &&
                el[filter.type] !== filter.value))) ||
          (this.filters
            .get(this.elementType)
            ["otherFilters"]["values"].find((obj) => {
              return obj.propertyName == filter.type;
            }) !== undefined &&
            ((this.filters
              .get(this.elementType)
              ["otherFilters"]["values"].find((obj) => {
                return obj.propertyName == filter.type;
              }).match == "in" &&
              !el[filter.type].includes(filter.value)) ||
              (this.filters
                .get(this.elementType)
                ["otherFilters"]["values"].find((obj) => {
                  return obj.propertyName == filter.type;
                }).match == "equals" &&
                el[filter.type] !== filter.value)))
        );
      }
      return true;
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/config/variable.scss";
@import "@/assets/scss/components/periodic-table.scss";
@import "@/assets/scss/config/filter-colors.scss";
</style>
