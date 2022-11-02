// Pinia Store
import { defineStore } from 'pinia'

import aiApps from "@/assets/data/areas/ai-apps.json";
import aiOps from "@/assets/data/areas/aiops.json";
import businessAutomation from "@/assets/data/areas/business-automation.json";
import data from "@/assets/data/areas/data.json";
import integration from "@/assets/data/areas/integration.json";
import security from "@/assets/data/areas/security.json";
import storage from "@/assets/data/areas/storage.json";
import redhat from "@/assets/data/areas/redhat.json";
import transactionProcessing from "@/assets/data/areas/transaction-processing.json";
import ibmZ from "@/assets/data/areas/ibm-z.json";
import { elementDark } from 'naive-ui';

let group = (order: number) =>
  order < 3 ? "first" : order < 19 ? "second" : order < 91 ? "body" : "bottom";

export const useElementsStore = defineStore('elements', {
  state: () => ({
    elementsMap: new Map()
  }),

  getters: {
    elements: (state) => state.elementsMap
  },

  actions: {
    async loadSWTableElements(){
      let inputs = [aiApps, aiOps, businessAutomation, data, integration, security, storage, redhat, transactionProcessing, ibmZ]

      let objectElements = []
      inputs.forEach(function(o){
        o.products.forEach((el) => {
          objectElements.push(el);
        });
      })

      this.updateTableElements("swTable", {'data': {'products': objectElements}})
    },
    transformProduct(product: any) {
      let links = [];
      if (product.links !== undefined && !Array.isArray(product.links)) {
        Object.keys(product.links).forEach((linkKey: any) => {
          links.push(
            {
              link: {
                name: linkKey,
                url: product.links[linkKey]
            }
          })
        });
        product.links = links;
      }
      return product;
    },
    updateTableElements(tableType: string, payload: any) {
      let counter = 0
      let elements = {
        first: [],
        second: [],
        body: [],
        bottom: [],
      }

      payload.data.products.forEach((el: any) => {
        if (el.cloudPak !== "not_cloud_pak"){
          counter++;
          elements[group(counter)].push(this.transformProduct(el));
        }
      });
      payload.data.products.forEach((el: any) => {
        if (el.cloudPak === "not_cloud_pak"){
          counter++;
          elements[group(counter)].push(this.transformProduct(el));
        }
      });
      this.elementsMap.set(tableType, elements)
    },
    clearSWTableElements() {
      this.$reset()
    }
  }

})