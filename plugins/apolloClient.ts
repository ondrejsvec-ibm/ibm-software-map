import { defineNuxtPlugin, useRuntimeConfig } from "nuxt/app"
import { ApolloClient, InMemoryCache } from "@apollo/client/core"
import { DefaultApolloClient } from "@vue/apollo-composable"

export default defineNuxtPlugin((nuxtApp: any) => {
  const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    uri: useRuntimeConfig().API_ENDPOINT
    // configuration //
  })
  nuxtApp.vueApp.provide(DefaultApolloClient, apolloClient)
})