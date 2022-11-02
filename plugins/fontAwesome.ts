import { defineNuxtPlugin } from "nuxt/app"

import { library, config } from "@fortawesome/fontawesome-svg-core";
import { faMap, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// This is important, we are going to let Nuxt.js worry about the CSS
config.autoAddCss = false

library.add(faMap, faQuestionCircle);

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
  })