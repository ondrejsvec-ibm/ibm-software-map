<template class="modal-container">
  <n-config-provider :theme-overrides="themeOverrides" class="modal-container">
    <n-card class="modal-container" :bordered="false">
      <n-tabs
        type="segment"
        size="large"
        pane-style="padding: 20px;"
        :tabs-padding="20"
        class="modal-container"
      >
        <n-tab-pane name="BASICS">
          <basic-product-information
            :element="element"
            :colorIdentifier="colorIdentifier"
            :themeOverrides="themeOverrides"
          />
        </n-tab-pane>
        <!-- <n-tab-pane name="ASSETS">
          <div>Test</div>
        </n-tab-pane> -->
      </n-tabs>
    </n-card>
  </n-config-provider>
</template>

<script>
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
};
</script>


<style lang="scss">
@import "@/assets/scss/config/variable.scss";
@import "@/assets/scss/components/periodic-modal.scss";
@import "@/assets/scss/config/filter-colors.scss";
</style>
