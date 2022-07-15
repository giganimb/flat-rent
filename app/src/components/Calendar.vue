<template>
  <div>
    <vc-calendar 
      is-expanded 
      title-position="center"
      background="lightgrey"
      :columns="$screens({ default: 1, md:2, lg: 3 })"
      :rows="$screens({ default: 2, md:3, lg: 4 })"
      :min-date="new Date()"
      :max-date="endOfCalendar"
      :attributes="attributes"
      is-light
      @dayclick="onDayClick"
    />
  </div>
</template>

<script>
  export default {
    name: "calendar",
    components: {
    },
    data(){
      return{
        endOfCalendar: "",
        dialogVisible: false,
        ordersDates : [
          {
            initials: 'TIO',
            dates: { start: new Date(2022, 7, 14), end: new Date(2022, 7, 18) },
            color: 'red',
          },
          {
            initials: 'MIO',
            dates: { start: new Date(2022, 8, 14), end: new Date(2022, 8, 18) },
            color: 'blue',
          },
        ],
      }
    },
    props: {
    },
    methods: {
      calculateEndOfCalendar(){
        let date = new Date();
        date.setDate(date.getDate() + 365);
        this.endOfCalendar = date.toString();
      },
      onDayClick(day){
        if(!day.isDisabled){
          this.dialogVisible = true;
          this.$emit("clickOnDay", this.dialogVisible);
        }
      },
      
    },
    mounted(){
      this.calculateEndOfCalendar()
    },
    computed:{
      attributes() {
        return [
            ...this.ordersDates.map(orderDate => ({
            dates: orderDate.dates,
            dot: {
              color: orderDate.color,
            },
            popover: {
              label: orderDate.initials,
            },
          })),
        ];
      },
    }
  }
</script>

<style scoped>

</style>
