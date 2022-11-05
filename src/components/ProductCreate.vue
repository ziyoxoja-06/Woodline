<template>
  <div tabindex="-1" :hidden="productCreate" class=" w-[100%] h-[100%] bg-gray-900/40 fixed top-0  right-0 left-0 z-50 ">
    <div tabindex="1" class="w-full flex justify-center absolute">
      <v-alert class="text-center" width="100%" v-if="alert" type="success">Qo'shildi</v-alert>
    </div>
    <div   class="overflow-y-auto overflow-x-hidden w-full md:inset-0 h-modal md:h-full flex items-center justify-center">
      <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              Priniyat zakaz
            </h3>
            <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" @click="closeCerate">
              <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <!-- Modal body -->
          <div class="p-6 space-y-6">
            <v-form
                ref="form"
                v-model="valid"
                lazy-validation
            >
              <v-text-field
                  v-model="order_id"
                  :rules="idRules"
                  label="Id"
                  required
              ></v-text-field>
              <v-text-field
                  v-model="model"
                  :rules="modelRules"
                  label="Mодель"
                  required
              ></v-text-field>
              <v-text-field
                  v-model="tissue"
                  :rules="tissueRules"
                  label="Tкань"
                  required
              ></v-text-field>
            </v-form>

            <div class="w-full flex justify-end">
              <input type="date"
                     :class="this.calendar===null?'bg-red-600':'bg-blue-600'"
                     v-model="calendar" class="w-[200px] text-white- rounded" />
            </div>
          </div>
          <!-- Modal footer -->
          <div class="flex items-center justify-end p-6 pl-96 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">

            <button
                @click="send"
                type="button"
                class="text-white
                     w-[20px]
                     ml-32
                     bg-blue-700
                     hover:bg-blue-800
                     focus:ring-4
                     focus:outline-none
                     focus:ring-blue-300
                     font-medium rounded-lg
                     text-sm px-5 py-2.5
                     text-center dark:bg-blue-600
                     dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center justify-center">
              Принять
              <img class="w-5 ml-1" src="../image/right-arrowWhite.png" alt="image">
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "ProductCreate",
  data(){
    return{
      valid: true,
      idRules: [
        v => !!v || 'Требуется id',
      ],
      modelRules: [
        v => !!v || 'Требуется модель',
      ],
      tissueRules: [
        v => !!v || 'Требуется ткань',
      ],
      openmodal:true,
      calendar:null,
      order_id:'',
      model:'',
      tissue:'',
      bgCalendar: true,
      alert:false
    }
  },
  props:{
    productCreate:{
      required:true
    }
  },
  methods: {
    closeCerate: async function(){
      this.$emit('closemodal',this.openmodal)
      this.$refs.form.reset()
    },
    send:async function () {
      console.log((await this.$axios.get('process')).data)
      if (this.$refs.form.validate()&&this.calendar!==null) {
      let orderId =this.order_id
      let model = this.model
      let tissue = this.tissue
      let deliveryDate=this.calendar
     await this.$axios.post('order',{orderId,model,tissue,deliveryDate})
      await this.$store.dispatch('setMainTableDate',(await this.$axios.get('process')).data)
        console.log(true)
          this.alert=true
        setTimeout(()=>{
          this.alert=false
        },3000)
        this.calendar=' '
        this.$refs.form.reset()
        // this.$emit('closemodal',this.openmodal)
      }else {
        this.order_id=''; this.model=''; this.tissue=''; this.calendar=null
      }
    },
  }
}
</script>

<style scoped>

</style>
