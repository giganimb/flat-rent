import Vue from 'vue'
import App from './App.vue'
import VCalendar from 'v-calendar';
import vuetify from './plugins/vuetify'

Vue.use(VCalendar, {
  componentPrefix: "vc",
});

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app');
