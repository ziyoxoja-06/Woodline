<template>
  <div class="container w-[100%] mx-auto text-center">
    <div class="w-full h-fit  p-6 bg-blue-300">
      <!--   Teable header start -->
      <div class="flex items-center">
        <div class="w-fit h-fit md:w-full lg:w-full gap-x-10  flex py-4 items-center pr-5">
          <div class="text-[13px] sm:text-[17px]">Priniyat zakaz:</div>
          <div class="w-fit lg:pr-10">
            <button
                v-if="$store.getters['getNavbarName'][0].role==='admin'"
                class=" w-[20px] sm:w-[40px] md:w-[40px] lg:w-[40px] xl:w-[40px] 2xl:w-[40px] lg:mr-5 h-6 flex justify-center items-center bg-green-500 rounded-3xl "
                type="button"
                @click="openCreateProductf"
            >
              <v-icon color="white">mdi-arrow-down</v-icon>
            </button>
          </div>
        </div>

        <div class="w-fit md:w-full lg:w-full flex justify-center items-center pr-5 ml-0 lg:ml-24 md:ml-24">
          <div class="text-[13px] sm:text-[17px]">Sort:</div>
          <select id="" v-model="select" class="w-[100%] text-[13px] sm:text-[17px] ml-2 rounded" name="customerName">
            <option v-for="(select,i) in selects" :key="i">{{ select }}</option>
          </select>
        </div>

        <div class="w-fit md:w-full lg:w-full flex justify-center py-4 ml-0 lg:ml-24 md:ml-24">
          <input v-model="sendId" class="w-full h-6 bg-white rounded-3xl p-1 pl-2 " placeholder="Поиск..."/>
          <button class=" w-10 h-6 ml-3 flex justify-center items-center bg-green-500 rounded-2xl" type="button"
                  @click="sendIdFunk(sendId)">
            <v-icon color="white">mdi-magnify</v-icon>
          </button>
        </div>
      </div>
      <!--   Teable header end -->
      <table class="w-full h-fit">
        <div v-for="(data, i) of  $store.getters['getMainTableData']" :key="i" class="border-b flex justify-between relative h-fit border-gray-800 ">
        <!--     EditeBtn start   -->
          <v-btn class="rounded-3xl mt-3" @click="openEditeModal(data)" text x-small>
            <v-icon color="pink darken-1">mdi-pencil-plus</v-icon>
          </v-btn>
        <!--     EditeBtn end   -->

          <div class="w-[33%] flex justify-center">
            <div class="mt-[5%]">

              <button
                  :class="getDateColor(data)"

                  class="p-1
                           text-white
                           text-[8px]
                           sm:text-[15px]
                           rounded-3xl">{{ data.order?.delivery_date }}
              </button>
              <div class="h-fit
                            flex
                            items-center
                            text-[12px]
                            sm:text-[25px]
                            justify-center">{{ data.order?.model?.model_name }}
              </div>
            </div>

          </div>
          <div class="w-[33%] p-3 flex justify-center ">
            <div class="h-fit ">
              <span
                  class="extra-bold text-[12px] sm:text-[25px] border-b-2 border-gray-800 ">{{
                  data?.order?.order_id
                }}</span>
              <div class="h-fit flex text-[12px] sm:text-[25px] items-center justify-center">{{ data.order.tissue }}</div>
            </div>
          </div>
          <div class="w-full">
            <div class="w-full bg-gray-200 rounded-full h-4 mt-4 dark:bg-gray-700">

              <div :class=" data?.position?.position_percent===null?'':
                                data?.position?.position_percent<30?'bg-red-600':
                                 data?.position?.position_percent<=70?'bg-yellow-400':
                                   data?.position?.position_percent>70?'bg-green-600':''"
                   :style="{'width': data?.position?.position_percent+'%'}" class="h-4 text-[14px] w-[95%]
                             rounded-full
                             flex
                             items-center
                             justify-center">
                {{ data?.position?.position_percent }}%
              </div>

            </div>
            <div class="flex items-center h-16 mt-2 justify-center text-[12px] sm:text-[25px]">
              <div class="flex">
                <div>{{ data?.position?.position_name===undefined?"Pazitsya va ": data?.position?.position_name + ": " }}{{ data.user ? data.user.user_name : "Odam tanlang" }}</div>
                <button
                    :hidden="data?.is_completed===true"
                    class="mlm:w-[20px]"
                    @click="data.is_completed=!data.is_completed; completFunk(i)">
                  <div class="orbit-spinner">
                    <div class="orbit"></div>
                    <div class="orbit"></div>
                    <div class="orbit"></div>
                  </div>
                </button>
                <div class="w-[70px] h-fit mt-1 ml-2" :hidden="data.is_completed===false">
                  <button
                      :hidden="data.is_completed===false"
                      class="w-full h-5 sm:h-6 md:h-7 lg:h-7 bg-green-500 flex justify-center items-center rounded-3xl">
                    <v-icon color="white">mdi-check</v-icon>
                  </button>
                </div>
              </div>
              <v-spacer/>
              <div>
              </div>
              <v-btn
                  :disabled="data.is_completed===false"
                  class="info px-auto ml-3 rounded-3xl "
                  @click="openLevelModalf(i)">
                <v-icon color="white" x-large>mdi-arrow-right-thin</v-icon>
              </v-btn>
            </div>
          </div>
        </div>
      </table>
      <modal :productLevel="openLevelModal" @close="closeLevelModal"/>
      <main-date-edite-modal :editeModal="editeModal" :editeModaleDate="editeModalDate" @editeModalClose="editeModalClose"/>
      <product-create :productCreate="openCreateProduct" @closemodal="closeCreateModal"/>
      <search-modal :searchDates="searchData" :searchOpen="search" @searchEnd="searchEnd" />
    </div>
  </div>

</template>

<script>
import {selects,todayDate} from "@/utils/tableHelpFiles/Table.js";
import modal from "@/components/ProductNextLevel";
import mainDateEditeModal from "@/components/MainDateEditeModal";
import ProductCreate from "@/components/ProductCreate";
import searchModal from "@/components/SearchModal";


export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'maintable',
  components: {ProductCreate, modal,searchModal,mainDateEditeModal},
  data() {
    return {
      selects,
      select: "srok dostavki",
      allData: [],
      todayDate,
      editeModal:true,
      editeModalDate:[],
      openLevelModal: true,
      openCreateProduct: true,
      search:true,
      sendId:null,
      searchData:[],
    }
  },

  methods: {
    getDateColor(data){
     return (+(data?.order?.delivery_date.split('-').join('')))<=(+todayDate.split('-').join(''))+2?'bg-red-600':
         (+(data?.order?.delivery_date.split('-').join('')))<=(+todayDate.split('-').join(''))+6?'bg-yellow-400':
             (+(data?.order?.delivery_date.split('-').join('')))>=(+todayDate.split('-').join(''))+6?'bg-green-600':'bg-red-600'
    },
    openEditeModal(date){
      this.editeModalDate=date
      console.log(this.editeModalDate,'dateModal', date,'date')
      this.editeModal=!this.editeModal
    },
    searchEnd: function (end) {
      this.search =end
      this.searchData=[]

    },
    sendIdFunk: async function (id) {

      await this.$store.dispatch('setSearchModal', (await this.$axios.get(`orderProcess/${id}`)).data)
      this.$store.getters['getSearchModal'].forEach(data=>{
        this.searchData.push({
          id:data?.order?.order_id,
          model:data?.order?.model?.model_name,
          user:data?.user?data?.user?.user_name:'',
          date:data?.order?.delivery_date,
          role:data?.position?.position_name
        })
      })
      this.search =false
    },
    editeModalClose(close){this.editeModal=close},
    openLevelModalf: async function (i) {
      this.openLevelModal = false
      await this.$store.dispatch('setUserTableData', this.$store.getters['getMainTableData'][i])
      await this.$store.dispatch('setMainTableDate', (await this.$axios.get('process')).data)
    },
    closeLevelModal: function (close) {this.openLevelModal = close},

    openCreateProductf: async function () {this.openCreateProduct = false},

    closeCreateModal: async function (close) {this.openCreateProduct = close},

    completFunk(i) {
      let id = this.$store.getters['getMainTableData'][i].process_id
      this.$axios.put('process', {id})
    }
  },
  async beforeCreate() {
    try {
      console.log('sdfsd')
      await this.$store.dispatch('setMainTableDate', (await this.$axios.get('process')).data)
      console.log((await this.$axios.get('process')).data,'back')

    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style scoped>
@import "../utils/tableHelpFiles/Table.css";
</style>
