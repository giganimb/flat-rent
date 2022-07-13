<template>
  <div justify="center">

    <NewCalendarVue @clickOnDay="dialog = true"></NewCalendarVue>

    <div class="text-center">
      <v-btn
        @click.stop="dialog = true"
        rounded
        color="primary"
        style="margin: 20px 0px;"
      >
        Забронировать
      </v-btn>
    </div>

    <v-dialog
      v-model="dialog"
      max-width="1200"
    >
      <v-card>
        <v-card-title class="text-h5">
          Бронирование
        </v-card-title>

        <v-card-text>
          <FormVue @clickOnCancelBtn="dialog = false" @clickOnCreateButton="createOrder"></FormVue>
        </v-card-text>
        
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import FormVue from '@/components/FormVue';
  import NewCalendarVue from '@/components/NewCalendarVue';
    export default{
        name: "DialogVue",

        components: {
          FormVue,
          NewCalendarVue,
        },
        data () {
            return {
                dialog: false,
            }
        },
        methods: {
          createOrder(){
            
          }
        }
    }
</script>

<style>

</style>