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
                <DateRangePickerVue 
                @onInputStartChange="getStartDate" 
                @onInputEndChange="getEndDate" 
                @selectRange="getRange"
                :selectedDate="selectedDate">
                </DateRangePickerVue>
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
import DateRangePickerVue from '@/components/DateRangePickerVue';
    export default{
        name: "FormVue",
        components: {
          DateRangePickerVue,
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
                startDate: "",
                endDate: "",
            }
        }),

        methods: {
            createOrder() {
                if(this.order.name && this.order.surname && this.order.patronymic && this.order.phone && this.order.startDate && this.order.endDate){
                    this.order.id = Date.now();
                    this.$emit("clickOnCreateButton", this.order);
                    this.order = {
                        name: "",
                        surname: "",
                        patronymic: "",
                        phone: "",
                        startDate: "",
                        endDate: "",
                    };
                    this.$refs.form.reset();
                }
                else{
                    this.$refs.form.validate();
                }
            },
            resetForm() {
                this.$refs.form.reset()
                this.$emit("clickOnCancelBtn");
            },
            getStartDate(start){
                this.order.startDate = start;
            },
            getEndDate(end){
                this.order.endDate = end;
            },
            getRange(range){
                this.order.startDate = range.start;
                this.order.endDate = range.end;
            }
        },
    }
</script>

<style>

</style>