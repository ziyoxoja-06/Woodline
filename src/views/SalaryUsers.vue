<template>
  <div>
    <v-card>
      <v-card-title>
        <div class="flex items-center">
        <span class="w-36">
          <v-select
              v-model="selectValue"
              :items="selectData"
              :rules="[v => !!v || 'Item is required']"
              label="Имя"
              required
          />
        </span>
          <input v-model="todayData" class="ml-3" type="date"/>
          <v-btn class="ml-3" color="info"  small @click="changeData">Click</v-btn>
          <v-spacer/>
          <v-btn v-print="'#cardss'" color="warning" small><v-icon>mdi-printer</v-icon></v-btn>

        </div>

      </v-card-title>
      <v-card-text>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            hide-details
            label="Поиск..."
            single-line
        ></v-text-field>
        <div  id="cardss">
          <h1 class="text-2xl font-extrabold flex justify-center my-5"><span class="mr-1">{{`${selectValue?.texts===undefined?'': `${selectValue?.texts} : `}`}}</span>{{collectPrice|filterPrice}}</h1>
          <v-data-table
              :headers="headers"
              :items="complateDates"
              :search="search"
              :items-per-page="10"
              :footer-props="{itemsPerPageText: 'Строк на странице'}"
          ></v-data-table>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import print from "vue-print-nb/print";

export default {
  name: "SalaryUsers",
  data: () => ({
    search: '',
    collectPrice:0,
    todayData: null,
    selectValue: null,
    selectData: [],
    headers: [
      {
        text: 'Id',
        align: 'start',
        sortable: false,
        value: 'id',
      },
      {text: 'Модель', value: 'model'},
      {text: "Тип работы", value: 'process'},
      {text: 'Цена', value: 'price'},
      {text: 'Дата', value: 'complateDate'},
    ],
    complateDates: []
  }),
  filters:{
    filterPrice(el){
      var formatter = new Intl.NumberFormat('uz-UZ', {
        style: 'currency',
        currency: "UZS"
      });
      return  formatter.format(el);
    }
  },
  directives: {
    print
  },
  methods: {
    async changeData() {
      if (this.selectValue !== null && this.todayData !== null) {
        try {
          this.complateDates=[]
          this.collectPrice=0
          let dates = (await this.$axios.get(`userProcess/${this.selectValue.id}/?date=${this.todayData}`)).data
          dates.forEach(date => {
            this.complateDates.push({
                  id: date?.order?.order_id,
                  model: date?.order?.model?.model_name,
                  process: date?.position?.position_name,
                  price: date?.price?.price,
                  complateDate: date?.order?.delivery_date,
                  user: 'Usersss'
                })
          })
          dates.forEach(date=>{ this.collectPrice+=(date?.price?.price===undefined?0:+date?.price?.price)})
        } catch (e) {console.log(e)}
      }
    },
  },
  async beforeCreate() {
    try {
      let date = (await this.$axios.get('user')).data
      date.forEach(obj => {
        this.selectData.push({text: obj.user_name, value: {id:obj.user_id,texts:obj.user_name}})
      })
    } catch (err) {
      console.log(err)
    }
  }
}
</script>