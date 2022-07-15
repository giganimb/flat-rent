<template>
    <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    >
        <v-text-field
        v-model="order.name"
        :counter="20"
        :rules="nameRules"
        label="Имя"
        required
        ></v-text-field>

        <v-text-field
        v-model="order.surname"
        :counter="20"
        :rules="surnameRules"
        label="Фамилия"
        required
        ></v-text-field>

        <v-text-field
        v-model="order.patronymic"
        :counter="20"
        :rules="patronymicRules"
        label="Отчество"
        required
        ></v-text-field>


        <v-text-field
        v-model="order.phone"
        :rules="phoneRules"
        label="Номер телефона"
        required
        ></v-text-field>

        <v-row justify="space-around">
            <v-card>
                <date-range-picker
                ref="dateRangePicker"
                v-model="order.range"
                @onInputStartChange="getStartDate" 
                @onInputEndChange="getEndDate" 
                @selectRange="getRange"
                @selectDate="getRange"
                :selectedDate="selectedDate">
                </date-range-picker>
            </v-card>
        </v-row>

        <v-btn
        :disabled="!valid"
        color="primary"
        style="margin-top: 50px;"
        class="mr-4"
        @click="createOrder"
        >
        Сохранить
        </v-btn>

        <v-btn
        color="error"
        style="margin-top: 50px;"
        class="mr-4"
        @click="resetForm"
        >
        Отмена
        </v-btn>
  </v-form>
</template>

<script>
import DateRangePicker from '@/components/DateRangePicker';
    export default{
        name: "order-create-form",
        components: {
          DateRangePicker,
        },
        props:{
            selectedDate: Date,
        },
        data: () => ({
            valid: true,
            nameRules: [
                v => !!v || 'Укажите имя',
                v => (v && v.length > 1 && v.length <= 20) || 'Имя должно быть больше 1 символа и меньше 20 символов',
            ],
            surnameRules: [
                v => !!v || 'Укажите фамилию',
                v => (v && v.length > 1 && v.length <= 20) || 'Фамилия должно быть больше 1 символа и меньше 20 символов',
            ],
            patronymicRules: [
                v => !!v || 'Укажите отчество',
                v => (v && v.length > 1 && v.length <= 20) || 'Отчество должно быть больше 1 символа и меньше 20 символов',
            ],
            phoneRules: [
                v => !!v || 'Укажите номер телефона',
                v => /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(v) || 'E-mail must be valid',
            ],
            order: {
                name: "",
                surname: "",
                patronymic: "",
                phone: "",
                range: {
                    startDate: "",
                    endDate: "",
                },
            }
        }),

        methods: {
            createOrder() {
                if(this.order.name && this.order.surname && this.order.patronymic && this.order.phone && this.order.range.startDate && this.order.range.endDate){
                    this.order.id = Date.now();
                    this.$emit("clickOnCreateButton", this.order);
                    this.order = {
                        name: "",
                        surname: "",
                        patronymic: "",
                        phone: "",
                        range: {
                            startDate: "",
                            endDate: "",
                        },
                    };
                    this.$refs.form.reset();
                    this.$refs.dateRangePicker.clearInputs();
                }
                else{
                    this.$refs.form.validate();
                }
            },
            resetForm() {
                this.$refs.form.reset()
                this.$refs.dateRangePicker.clearInputs();
                this.$emit("clickOnCancelBtn");
            },
            getStartDate(start){
                this.order.range.startDate = start;
            },
            getEndDate(end){
                this.order.range.endDate = end;
            },
            getRange(range){
                this.order.range.startDate = range.start;
                this.order.range.endDate = range.end;
            }
        },
    }
</script>

<style>

</style>