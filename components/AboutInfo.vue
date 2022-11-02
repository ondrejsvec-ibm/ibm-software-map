<template>
  <section class="about"> 

    <side-bar showFilters="false"/>
    <h2>{{ $t("about.title") }}</h2>
    <p>{{ $t("about.primaryText") }}</p>
    <div class="reference">
    </div>
    <div class="clickable">
      <a
        href="https://github.com/ondrejsvec-ibm/ibm-software-map"
        target="_blank"
      >
        GitHub Source Repository
      </a>
    </div>
  </section>
</template>

<script>
import Menu from './Menu.vue';

export default {
    name: "about-info",
    components: { Menu }
};
</script>

<style lang="scss">
@import "@/assets/scss/config/variable.scss";

.about {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  width: 75vw;
  padding-left: 2%;
  .reference {
    margin-top: 2vw;
  }

  .clickable {
    grid-area:1 span/2 span/1;
    width: 100%;
    a {
      background: #323232;
    color: palegreen;
      width: 100%;
      display: flex;
      padding: 9px;
      font-size: 0.9vw;
      border-radius: 3px;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      margin-bottom: 10px;
      font-weight: 500;
    }
  }
}
</style>
