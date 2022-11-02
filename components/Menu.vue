<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <section class="menu">
      <n-dropdown mode="horizontal" :options="menuOptions">
        <n-button ghost>
          <template #icon>
            <n-icon :component="Menu" />
          </template>
        </n-button>
      </n-dropdown>
    </section>
  </n-config-provider>
</template>

<script>
import { h } from "vue";
import { ChoroplethMap, Information, Menu } from "@vicons/carbon";
import CustomNuxtLink from "@/components/CustomNuxtLink.vue";
import { NIcon } from "naive-ui";

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

/**
 * Use this for type hints under js file
 * @type import('naive-ui').GlobalThemeOverrides
 */
const themeOverrides = {
  Button: {
    textColorGhost: 'white',
  },
  Dropdown: {
    optionColorHover: '#2e3440',
    optionTextColorHover: 'white'
  }
};

const menuOptions = [
  {
    label: () =>
      h(
        CustomNuxtLink,
        {
          to: "/",
        },
        { default: () => "Software Table" }
      ),
    key: "table",
    icon: renderIcon(ChoroplethMap),
  },
];

export default defineComponent({
  name: "menu-bar",
  setup() {
    return {
      Menu,
      menuOptions,
      themeOverrides,
    };
  },
});
</script>

<style lang="scss">
@import "@/assets/scss/config/variable.scss";
@import "@/assets/scss/components/menu.scss";
</style>
