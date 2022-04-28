import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueWebSpeech from 'vue-web-speech'




Vue.prototype.$baseUrl = "http://localhost:3000";
Vue.config.productionTip = false;
Vue.use(VueWebSpeech)


new Vue({
  render: (h) => h(App),
  store,
  router,
}).$mount("#app");