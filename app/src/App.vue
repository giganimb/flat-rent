<template>
  <v-app>
    <order-create-dialog></order-create-dialog>
  </v-app>
</template>

<script>
import OrderCreateDialog from '@/components/OrderCreateDialog.vue'

export default {
  name: 'App',

  components: {
    OrderCreateDialog,
  },

  data: () => ({
    //
  }),
};
</script>
