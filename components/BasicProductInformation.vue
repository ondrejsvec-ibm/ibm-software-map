<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-card :bordered="false">
      <n-descriptions label-placement="top" :column="1">
        <n-descriptions-item
          :label="$t('element.' + elementPropertyKey)"
          :label-style="descriptionsLabelStyle"
          :content-style="descriptionsContentStyle"
          v-for="(elementPropertyValue, elementPropertyKey) in this.inversePick(
            element,
            ['links', 'assets', 'productAbreviation']
          )"
          :key="elementPropertyKey"
        >
          <!-- value translation -->
          <span
            class="value"
            v-if="['cloudPak'].includes(elementPropertyKey)"
            >{{
              $t(elementPropertyKey + "Names." + elementPropertyValue)
            }}</span
          >
          <!-- array translation -->
          <span
            class="value"
            v-else-if="
              ['arrayData'].includes(
                elementPropertyKey
              )
            "
            >{{
              element[elementPropertyKey]
                .map((e) => $t(elementPropertyKey + "Names." + e))
                .join(", ")
            }}</span
          >
          <!-- simple -->
          <span class="value" v-else>{{ elementPropertyValue }}</span>
        </n-descriptions-item>
      </n-descriptions>
    </n-card>
    <n-card :bordered="false">
      <n-grid :x-gap="12" :y-gap="12" :cols="2" layout-shift-disabled>
      <n-gi
          v-for="(link, linkKey) in element.links"
          :key="linkKey"
        >
          <n-button @click=openLink(link.link.url)>{{ $t("element.links." + link.link.name) }}</n-button>
        </n-gi>
      </n-grid>
    </n-card>
  </n-config-provider>
</template>

<script>
import { Link } from "@vicons/carbon";
import { NButton } from "naive-ui";
const inversePick = (obj, keys) =>
  Object.keys(obj)
    .filter((i) => !keys.includes(i))
    .reduce((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {});
const pick = (obj, keys) =>
  Object.keys(obj)
    .filter((i) => keys.includes(i))
    .reduce((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {});
const openLink = function(obj){
  open(obj);
}

export default {
  props: {
    element: {
      type: Object,
      default() {
        return {};
      },
    },
    colorIdentifier: {
      type: String,
    },
    themeOverrides: {
      type: Object,
    },
  },
  data() {
    return {
      descriptionsLabelStyle: {
        color: "#03a9f4",
      },
      descriptionsContentStyle: {
        color: "white",
      },
      pick,
      inversePick,
      openLink,
      Link,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/config/variable.scss";
@import "@/assets/scss/components/basic-product-information.scss";
@import "@/assets/scss/config/filter-colors.scss";
</style>