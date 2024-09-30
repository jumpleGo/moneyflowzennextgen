import clickOutside from '~/libs/vuetify-click-outside';

// https://vuetifyjs.com/en/directives/click-outside/
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('clickOutside', clickOutside);
});