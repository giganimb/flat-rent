<template>
    <div class="mb-4">
        <v-row style="margin: 10px;" justify="space-around">
            <div class="text-h6">Выберите дату</div>
        </v-row>
        <vc-date-picker
            v-model="range"
            mode="date"
            :masks="masks"
            is-range
            :popover="{ visibility: 'none' }"
        >
            <template v-slot="{ inputValue, togglePopover, inputEvents, isDragging }">
                <div class="flex flex-col sm:flex-row justify-start items-center">
                    <v-row>
                        <v-col>
                            <div class="flex items-center">
                                <div style="margin-top: 16px; margin-left: 10px">
                                    <v-img @click="togglePopover()" src="../../public/calendar.png" width="20px" height="20px" style="cursor: pointer;"/>
                                </div>
                                <v-card style="background-color: #BBDEFB; margin: 10px;">
                                    <input
                                        class="flex-grow pl-8 pr-2 py-1 bg-gray-100 border rounded w-full"
                                        :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                                        :value="inputValue.start"
                                        v-on="inputEvents.start"
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
        name: "DateRangePickerVue",
        data() {
            return {
                range: {
                    start: new Date(2020, 0, 6),
                    end: new Date(2020, 0, 23),
                },
                masks: {
                    input: 'YYYY-MM-DD',
                },
            };
        },
    };
</script>