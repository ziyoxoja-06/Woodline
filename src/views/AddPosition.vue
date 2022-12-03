<template>
  <div>
    <div tabindex="1" class="w-full flex justify-center absolute mt-44">
      <v-alert class="text-center" width="100%" v-if="alert" type="success">Pozitsya o'zgardi</v-alert>
    </div>
    <v-card>
      <v-form ref="form"
              v-model="valid"
              lazy-validation>
      <v-card-title>
        <div class=" inline sm:flex md:flex lg:flex xl:flex items-center w-full">
          <span class=" w-full  sm:w-full md:w-38lg:w-38 xl:w-38 ml-3">
            <v-select
                label="Id"
                :rules="idRules"
                v-model="selectModelId"
                :items="selectDataId"/>
          </span>
        <span class=" w-full  sm:w-full md:w-38 lg:w-38 xl:w-38 ml-3">
          <v-select
              v-model="selectUserName"
              :rules="nameRules"
              :items="selectDataName"
              label="Имя"
              required
          />
          </span>
          <span  class=" w-full  sm:w-full md:w-38 lg:w-38 xl:w-38 ml-3">
            <v-select
                v-model="selectPosition"
                :rules="positionRules"
                :items="positonsItemData"
                label="Model"
                required
            ></v-select>
          </span>
          <span>
            <input  v-model="todayData"
                    type="datetime-local"
                    :rules="dateRules"
                    :class="todayData|dateFilter"
            />
          </span>
          <v-spacer/>
        </div>
        <div class="inline w-full">
          <label>Check</label>
          <input type="checkbox"
                 class="ml-1"

                 v-model="check"/>
        </div>
        <v-btn class="ml-3"
               color="info"
               small
               :loading="loading"
               :disabled="loading || !valid"
               @click="changeData">Click</v-btn>
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
          <v-data-table
              :headers="headers"
              :items="complateDates"
              :search="search"
              :items-per-page="10"
              :footer-props="{itemsPerPageText: 'Строк на странице'}"
          ></v-data-table>
          {{tableFilter}}
        </div>
      </v-card-text>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "SalaryUsers",
  data: () => ({
    nameRules: [
      v => !!v || 'Укажите имя',
    ],
    idRules:[
      v => !!v || 'Укажите id',
    ],
    positionRules:[
      v => !!v || 'Укажите position',
    ],
    dateRules:[
      v => !!v || 'Укажите position',
    ],
    loader: null,
    loading: false,
    alert:false,
    search: '',
    check:false,
    valid:true,
    collectPrice:0,
    todayData: null,
    selectUserName: null,
    selectModelId:'',
    selectPosition:'',
    positonsItemData:[],
    selectDataId: [],
    selectDataName: [],
    complateDates:[],
    uts:0,
    headers: [
      {
        text: 'Id',
        align: 'start',
        sortable: false,
        value: 'id',
      },
      {text: 'Модель', value: 'model'},
      {text: "Тип работы", value: 'process'},
      {text: 'Дата', value: 'complateDate'},
    ],
  }),
  filters:{
    dateFilter(date){
     return date===null?'bg-red-500 rounded ml-2':'ml-2'
    }
  },
 async mounted() {
    try {
      await this.$store.dispatch('setMainTableDate', (await this.$axios.get('process')).data)
    } catch (err) {console.log(err)}
    (await this.$store.getters['getMainTableData']).forEach(date => {
      // Table date
      this.complateDates.push({
        id: date?.order?.order_id,
        model: date?.order?.model?.model_name,
        process: date?.position?.position_name,
        complateDate: date?.order?.delivery_date,
        user: 'Usersss'})
    });
   (await this.$store.getters['getMainTableData']).forEach(date => {
     this.selectDataId.push({text: date?.order?.order_id, value: date?.order?.id})
   })

   console.log(this.selectDataId)
    // Select Position Name
    try {
      (await this.$axios.get('position')).data.forEach(date => {
        this.positonsItemData.push({text: date.position_name, value:date.position_id})
      })
    }catch (e) {console.log(e)}
    // Select User ID
    try {
      (await this.$axios.get('user')).data.forEach(date => {
        this.selectDataName.push({text: date.user_name, value:date.user_id})
      })
    }catch (e) {console.log(e)}
  },

  methods: {
    async changeData() {
      this.loader = 'loading'
      const l = this.loader
      this[l] = !this[l]
      if (this.$refs.form.validate()&&this.todayData!==null){
        this.uts=Date.UTC(this.todayData.slice(0,4),this.todayData.slice(5,7),this.todayData.slice(8,10),this.todayData.slice(11,13),this.todayData.slice(14,16))
        await this.$axios.post('dateProcess',{order:this.selectModelId, position:this.selectPosition, user:this.selectUserName, date:this.uts,moved_forward:this.check})
        this.$refs.form.reset()
        this.todayData=''
        this.uts= ''
        this.check=false
        this.alert=true
        setTimeout(()=>{
          this.alert=false
          this[l] = false
        },3000);
        this.complateDates=[];
        await this.$store.dispatch('setMainTableDate', (await this.$axios.get('process')).data)

      }else {

        this.todayData=''
        this.uts= ''
        this.check=false
        this.alert=true
        setTimeout(()=>{
          this.alert=false
          this[l] = false
        },3000)
      }
      this.loader = null
    },
  },
  // async beforeCreate() {
  //   // Select Model Id
  //   try {
  //     await this.$store.dispatch('setMainTableDate', (await this.$axios.get('process')).data)
  //   } catch (err) {console.log(err)}
  //   (await this.$store.getters['getMainTableData']).forEach(date => {
  //     this.selectDataId.push({text: date?.order?.order_id, value: date?.order?.id})
  //     // Table date
  //     this.complateDates.push({
  //       id: date?.order?.order_id,
  //       model: date?.order?.model?.model_name,
  //       process: date?.position?.position_name,
  //       complateDate: date?.order?.delivery_date,
  //       user: 'Usersss'})
  //   });
  //   // Select Position Name
  //   try {
  //       (await this.$axios.get('position')).data.forEach(date => {
  //       this.positonsItemData.push({text: date.position_name, value:date.position_id})
  //     })
  //   }catch (e) {console.log(e)}
  //   // Select User ID
  //   try {
  //     (await this.$axios.get('user')).data.forEach(date => {
  //       this.selectDataName.push({text: date.user_name, value:date.user_id})
  //     })
  //   }catch (e) {console.log(e)}
  // }
}
</script>