<template>
  <div justify="center">

    <new-calendar 
    @clickOnDay="onClickDay">
    </new-calendar>

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
          <order-create-form
          v-if="dialog"
          v-model="selectedDate" 
          @clickOnCancelBtn="dialog = false" 
          @clickOnCreateButton="createOrder" 
          :selectedDate="selectedDate">
          </order-create-form>
        </v-card-text>
        
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import OrderCreateForm from '@/components/OrderCreateForm';
  import NewCalendar from '@/components/NewCalendar';
    export default{
        name: "order-create",

        components: {
          OrderCreateForm,
          NewCalendar,
        },
        data () {
            return {
              dialog: false,
              selectedDate:{
                type: Date,
              },
              
            }
        },
        methods: {
          createOrder(){
            
          },
          onClickDay(day){
            this.dialog = true;
            this.selectedDate = day.date;
          }
        }
    }
</script>

<style>

</style>