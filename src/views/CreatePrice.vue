<template>
    <div class="overflow-y-auto overflow-x-hidden w-full md:inset-0 h-modal md:h-full flex items-center justify-center">
      <!-- Alert -->

      <div class="relative p-4 w-full max-w-[80%] h-full md:h-auto">
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
        >
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
          <v-select
                v-model="selectPosition"
                :items="positonsItemData"
                label="Model"
                required
                :rules="[v => !!v || 'Item is required']"
            ></v-select>
          </div>
          <!-- Modal body -->
          <div class="p-6 space-y-6">

              <v-text-field v-for="(input,i) in positions" required :rules="errInput[input.toLowerCase()]" v-model="emptyObjects[input.toLowerCase()]" :label="input" :key="i" />

          </div>
          <!-- Modal footer -->
          <div
              class="flex items-center justify-end p-6 pl-96 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
            <v-btn
                :loading="loading"
                :disabled="loading||!valid"
                class="ma-2"
                color="info"
                type="button"
                @click="send">
              Принять
              <img alt="image" class="w-5 ml-1" src="../image/right-arrowWhite.png">
            </v-btn>

          </div>
        </div>
        </v-form>
      </div>
    </div>
</template>

<script>
export default {
  name: "CreatePriice",
  data:()=>({
    selectPosition:'',
    positonsItemData:[],
    tissue:'',
    loader: null,
    loading: false,
    valid: true,
    emptyObjects:{},
    pushs:[],
    positions:[],
    errInput:{},
    alertModel:false
  }),
  methods:{
  send:async function () {
    let date =  ( await this.$axios.get('positionPrice')).data
    for (let i = 0; i < date.length; i++) {
      this.pushs.push({price:this.emptyObjects[date[i]?.position_name.toLowerCase()], position:date[i]?.position_id})
    }
    this.loader = 'loading'
    const l = this.loader
    this[l] = !this[l]
    if (this.$refs.form.validate()) {
      console.log({model:this.selectPosition,positionPrices:this.pushs},'Push Element')
      await this.$axios.post('priceBulk', {model:this.selectPosition,positionPrices:this.pushs})
      this.positonsItemData=[]
      try {
        (await this.$axios.get('modelForPrice')).data
            .forEach((el)=>{this.positonsItemData.push({text: el.model_name, value:el.model_id})})
      }catch (err){
        console.log(err)
      }
      this.$refs.form.reset()
      setTimeout(()=>{
        this[l] = false
      },2000)
      this.loader = null
    }else {
      setTimeout(()=>{
        this.alertModel=false
        this[l] = false
      },2000)
      this.loader = null
      this.order_id=''; this.model=''; this.tissue=''; this.calendar=null
    }
  },
},
 async beforeCreate() {
   try {
   let date =  ( await this.$axios.get('positionPrice')).data
     for (let i = 0; i < date.length; i++) {
       this.positions.push(date[i]?.position_name)
       this.emptyObjects[date[i]?.position_name.toLowerCase()]=''
       this.errInput[date[i]?.position_name.toLowerCase()]=[
         v => !!v || `Требуется ${date[i]?.position_name.toLowerCase()}`,
         v => /^\d+$/.test(v)||'This field only accept numbers'
       ]
     }
   }catch (err){
     console.log(err)
   }
   try {
    (await this.$axios.get('modelForPrice')).data
        .forEach((el)=>{this.positonsItemData.push({text: el.model_name, value:el.model_id})})
   }catch (err){
     console.log(err)
   }
  }
}
</script>