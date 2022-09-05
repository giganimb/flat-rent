<template>
  <div justify="center">

    <main-calendar
    ref="calendarFunctions"
    @clickOnDay="onClickDay">
    </main-calendar>

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
          @clickOnCancelBtn="dialog = false; selectedDate = ''"
          @onErrorMessage="sendErrorNotification"
          @onCreatedOrder="sendSuccessNotification"
          :selectedDate="selectedDate">
          </order-create-form>
        </v-card-text>
        
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import OrderCreateForm from '@/components/OrderCreateForm';
  import MainCalendar from '@/components/MainCalendar';
  import { mapState, mapMutations } from 'vuex';
    export default{
        name: "order-create",

        components: {
          OrderCreateForm,
          MainCalendar,
        },
        data () {
            return {
              selectedDate:{
                type: Date,
              },
            }
        },
        methods: {
          onClickDay(day){
            this.dialog = true;
            this.selectedDate = day.date;
          },
          sendErrorNotification(){
            this.$refs.calendarFunctions.showErrorAlert();
          },
          sendSuccessNotification(){
            this.$refs.calendarFunctions.showSuccessAlert();
            this.$refs.calendarFunctions.updateCalendar();
          },
          ...mapMutations(['setDialog'])
        },
        computed: {
          ...mapState({
                dialogState: state => state.dialog,
            }),
          dialog: {
           get(){
             return this.dialogState
           },
           set(boolValue){
             return this.setDialog(boolValue);
           } 
        }
        }
    }
</script>

<style>

</style>