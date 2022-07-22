<template>
  <div class="text-center section">
    <v-alert
      prominent
      type="error"
      v-model="errorAlert"
      class="alert"
    >
      <v-row align="center">
        <v-col class="grow">
          Не удалось сохранить заказ, выбранная вами дата уже зарезервирована
        </v-col>
        <v-col>
          <v-btn color="orange" @click="onClickAlertButton">Ок</v-btn>
        </v-col>
      </v-row>
    </v-alert>

    <v-alert
      prominent
      type="success"
      v-model="successAlert"
      class="alert"
    >
      <v-row align="center">
        <v-col class="grow">
          Заказ успешно сохранен
        </v-col>
        <v-col>
          <v-btn color="orange" @click="onClickAlertButton">Ок</v-btn>
        </v-col>
      </v-row>
    </v-alert>

    <vc-calendar
      class="custom-calendar max-w-full"
      :masks="masks"
      :attributes="attributes"
      disable-page-swipe
      :min-date="new Date()"
      :max-date="endOfCalendar"
    >
      <div
        slot="day-content"
        v-on="dayEvents"
        @click="onClickDay(day)"
        slot-scope="{ day, attributes }"
        class="flex flex-col h-full z-10 overflow-hidden"
        :class="day.year"
      >
        <span
          class="day-label text-sm text-gray-900"
          :class="[day.dateTime === today ? 'today rounded-sm' : '' ]"
        >{{ day.day }}</span>
        <div class="flex-grow overflow-y-scroll overflow-x-auto">
          <p
            v-for="attr in attributes"
            :key="attr.key"
            class="text-xs leading-tight rounded-sm p-1 mt-0 mb-1"
            :class="attr.customData.class"
          >{{ attr.customData.title }}</p>
        </div>
      </div>
    </vc-calendar>
  </div>
</template>


<script>
import OrderDataService from "../services/OrderDataService";
export default {
  name: "main-calendar",
  data() {
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();
    const day = now.getDate();
    return {
      endOfCalendar: "",
      errorAlert: false,
      successAlert: false,
      today: new Date(year, month, day) * 1,
      masks: {
        weekdays: "WWW"
      },
      orders: [],
      attributes: [],
      dayEvents: {
        click: a => {
          // eslint-disable-next-line no-console
          console.log("dayEvents:", a);
        }
      }
    };
  },
  methods: {
    calculateEndOfCalendar(){
      let date = new Date();
      date.setDate(date.getDate() + 365);
      this.endOfCalendar = date.toString();
    },
    onClickDay(day) {
        if(day.day >= (new Date()).getDate() && !day.attributes[0]){
          this.$emit("clickOnDay", day);
        }
    },
    onClickAlertButton(){
      this.errorAlert = false;
      this.successAlert = false;
    },
    retrieveOrders() {
      OrderDataService.getAll()
        .then(response => {
          this.orders = response.data;
          this.setOrdersToCalendarAttrs();
        })
        .catch(e => {
          console.log(e);
        });
    },
    setOrdersToCalendarAttrs(){
      let counter = 0;
      for(let ord of this.orders){
        let attr = {
          key: {
            type: Number,
            required: true
          },
          customData: {
            title: {
              type: String,
              required: true
            },
            class: {
              type: String,
              required: true
            },
          },
          dates: {
            start: {
              type: Date,
              required: true
            },
            end: {
              type: Date,
              required: true
            },
          }
        };
        attr.key = counter;
        attr.customData.title = ord.shortInfo.customData.title;
        attr.customData.class = ord.shortInfo.customData.class;
        attr.dates.start = ord.shortInfo.dates.start;
        attr.dates.end = ord.shortInfo.dates.end;
        counter++;
        this.attributes.push(attr);
      }
    },
    updateCalendar(){
      this.retrieveOrders();
    },
    showErrorAlert(){
      this.errorAlert = true;
    },
    showSuccessAlert(){
      this.successAlert = true;
    }
  },
  mounted(){
    this.calculateEndOfCalendar();
    this.retrieveOrders();
  },
};
</script>


<style>
.alert{
  position: fixed; 
  z-index: 100; 
  width: 100%;
}
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
.flex-col {
  flex-direction: column;
}

.flex {
  display: flex;
}
.flex-grow {
  flex-grow: 1;
}
.h-full {
  height: 100%;
}
.bg-red-600 {
  background-color: #e53e3e;
}
.today {
  background-color: #d2e1ec;
}
.bg-teal-500 {
  background-color: #38b2ac;
}
.bg-pink-500 {
  background-color: #ed64a6;
}
.bg-indigo-500 {
  background-color: #667eea;
}
.overflow-y-scroll {
  overflow-y: scroll;
}
.overflow-x-auto {
  overflow-x: auto;
}
.z-10 {
  z-index: 10;
}
.overflow-hidden {
  overflow: hidden;
}
.text-gray-900 {
  color: #1a202c;
}
.vc-h-full {
  height: 100%;
}
.custom-calendar.vc-container {
  --day-border: 1px solid #b8c2cc;
  --day-border-highlight: 1px solid #b8c2cc;
  --day-width: 90px;
  --day-height: 90px;
  --weekday-bg: #f8fafc;
  --weekday-border: 1px solid #eaeaea;
  border-radius: 0;
  width: auto;
}
.custom-calendar.vc-container .vc-weeks {
  padding: 0;
  height: 80vh;
  grid-template-rows: 33px repeat(6, 1fr);
}
.custom-calendar.vc-container .vc-header {
  background-color: #f1f5f8;
  padding: 10px 0;
}
.custom-calendar.vc-container .vc-weekday {
  background-color: var(--weekday-bg);
  border-bottom: var(--weekday-border);
  border-top: var(--weekday-border);
  padding: 5px 0;
}
.vc-border {
  border-width: 1px;
}
.custom-calendar.vc-container .vc-day:not(.on-right) {
  border-right: var(--day-border);
}
.custom-calendar.vc-container .vc-day:not(.on-bottom) {
  border-bottom: var(--day-border);
}
.custom-calendar.vc-container .vc-day.weekday-1,
.custom-calendar.vc-container .vc-day.weekday-7 {
  background-color: #eff8ff;
}

.custom-calendar.vc-container .vc-day {
  padding: 0 5px 3px;
  text-align: left;
  /*min-height: var(--day-height);*/
  min-width: var(--day-width);
  background-color: #fff;
}
.vc-day {
  position: relative;
  min-height: var(--day-min-height);
  width: 100%;
  height: 100%;
  z-index: 1;
}
.text-center {
  text-align: center;
}
.section {
}
.max-w-full {
  max-width: 100%;
}
.bg-blue-500 {
  background-color: #4299e1;
}

.text-xs {
  font-size: 0.75rem;
}
.text-white {
  color: #fff;
}
.p-1 {
  padding: 0.25rem;
}
.mb-1 {
  margin-bottom: 0.25rem;
}
.mt-0 {
  margin-top: 0;
}
.leading-tight {
  line-height: 1.25;
}
.rounded-sm {
  border-radius: 0.125rem;
}
::-webkit-scrollbar {
  width: 0px;
}
::-webkit-scrollbar-track {
  display: none;
}
</style>
