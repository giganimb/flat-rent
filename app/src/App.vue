<template>
  <v-app>
    <order-create></order-create>
  </v-app>
</template>

<script>
import OrderCreate from '@/components/OrderCreate.vue'

export default {
  name: 'App',

  components: {
    OrderCreate,
  },

  data: () => ({
    //
  }),
};
</script>
