<template>
    <div class="mb-4">
        <v-row style="margin: 10px;" justify="space-around">
            <div class="text-h6">Выберите дату</div>
        </v-row>
        <vc-date-picker
            is-expanded
            :min-date="new Date()"
            :max-date="endOfCalendar"
            v-model="range"
            mode="date"
            :masks="masks"
            is-range
            :popover="{ visibility: 'none' }"
            @input="onSelectDate"
        >
            <template v-slot="{ inputValue, inputEvents, togglePopover, isDragging }">
                <div class="flex flex-col sm:flex-row justify-start items-center">
                    <v-row>
                        <v-col>
                            <div class="flex items-center">
                                <div style="margin-top: 16px; margin-left: 10px">
                                    <v-img @click="togglePopover()" src="../assets/calendar.png" width="24px" height="24px" style="cursor: pointer;"/>
                                </div>
                                <v-card style="background-color: #BBDEFB; margin: 10px;">
                                    <input
                                        class="flex-grow pl-8 pr-2 py-1 bg-gray-100 border rounded w-full"
                                        :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                                        :value="inputValue.start"
                                        v-on="inputEvents.start"
                                        @input="onInputStartValueUpdate"
                                        :placeholder="formatDate(new Date())"
                                    />
                                </v-card>
                            </div>
                        </v-col>
                        <v-col>
                            <div class="flex items-center">
                                <v-card style="background-color: #BBDEFB; margin: 10px;">
                                    <input
                                        class="flex-grow pl-8 pr-2 py-1 bg-gray-100 border rounded w-full"
                                        :class="isDragging ? 'text-gray-600' : 'text-gray-00'"
                                        :value="inputValue.end"
                                        v-on="inputEvents.end"
                                        @input="onInputEndValueUpdate"
                                        :placeholder="formatDate(new Date())"
                                    />
                                </v-card>
                            </div>
                        </v-col>
                    </v-row>
                </div>
            </template>
        </vc-date-picker>
    </div>
</template>

<script>
    export default {
        name: "date-range-picker",
        data() {
            return {
                endOfCalendar: "",
                range: {
                    start: new Date(this.selectedDate),
                    end: new Date(this.selectedDate),
                },
                masks: {
                    input: 'DD.MM.YYYY',
                },
            };
        },
        props:{
            selectedDate: Date,
        },
        methods: {
            calculateEndOfCalendar(){
                let date = new Date();
                date.setDate(date.getDate() + 365);
                this.endOfCalendar = date.toString();
            },
            onInputStartValueUpdate(){
                this.$emit("onInputStartChange", this.range.start);
            },
            onInputEndValueUpdate(){
                this.$emit("onInputEndChange", this.range.end);
            },
            onSelectDate(){
                this.$emit("selectRange", this.range);
            },
            addSelectedDate(){
                if(this.selectedDate){
                    this.$emit("selectDate", this.range)
                }
            },
            formatDate(date) {
                var dd = date.getDate();
                if (dd < 10) dd = '0' + dd;

                var mm = date.getMonth() + 1;
                if (mm < 10) mm = '0' + mm;

                var yy = date.getFullYear();
                if (yy < 10) yy = '0' + yy;

                return dd + '.' + mm + '.' + yy;
            }
        },
        mounted(){
            this.calculateEndOfCalendar();
            this.addSelectedDate();
        },
    };
</script>