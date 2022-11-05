<template>
  <div class="flex justify-center  w-full">
    <div class=" bg-gray-200   w-[0rem]

                        pt-16
                        mx-auto
                        "
          :class="drawers===true?' sm:w-[38rem]\n'+
'                        md:w-[50rem]\n'+
'                        lg:w-[68rem]\n'+
'                        xl:w-[80rem]\n'+
'                        2xl:w-[76rem]':
                        ' sm:w-[38rem]\n'+
'                        md:w-[50rem]\n'+
'                        lg:w-[68rem]\n'+
'                        xl:w-[80rem]\n'+
'                        2xl:w-[96rem]'">
      <div class="mt-16 "></div>
      <div v-for="([key,value],s) of Object.entries(mainData?.data)" :key="s" class=" w-full ">
        <div class=" ">
          <v-row>
            <div :class="WeekCardEdite(drawers)">
              <div class="flex items-center justify-center">
                <div class="uppercase w-40 text-2xl">{{ navKey }}</div>
                <div class="flex justify-center my-3 w-full items-center ml-6 sm:ml-72 lg:ml-80 md:w-[87%] md:ml-72 2xl:ml-80">
                  <span class="text-xl w-20 text-center">потенциальная мощность</span>
                  <span class="text-3xl w-16 pl-20">{{ mainData.count>1?Math.round(mainData.count):Math.ceil(mainData.count) }}</span>
                  <div class="w-fit  flex justify-end">
                    <div class=" bg-blue-500 ml-5">
                      <input v-model="changeCalendar"
                             class="text-white- rounded" type="date" @mouseleave="changeData"/>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex justify-space-between  px-2 md:pr-3">
                <v-card v-for="(card,d) in calendar.days.ru" :key="d"
                        class="bg-amber-500
                               font-extrabold
                               text-center
                               text-[12px]
                               py-1
                               w-[12%]
                               h-full">
                  {{ card }}
                </v-card>
              </div>
            </div>
          </v-row>

          <div class="text-3xl text-center mb-4 uppercase   mt-13 pl-8">
            {{ key }}
          </div>
          <v-row id=" main-card" :class="key" class="flex  justify-start mx-auto sm:pl-3 lg:pl-2" @mouseenter="funk(key)">

            <div :class="startMonthWeek(drawers,mainData,key,calendar)"
                 class="ml-2"
            ></div>
            <v-card v-for="(days, i) in value " :key="i"
                    :class="dragMainCard(drawers)">
              <Container
                  v-for="(dayKey,j) in days"
                  :key="j"
                  :drop-placeholder="{className:'placeholder'}"
                  :get-child-payload="getChildPayload"
                  class="w-full h-full"
                  group-name="trello"
                  @drop="handleDrop(`${Object.keys(days)[0]}`, $event, `${key}`, i)"
                  @drag-start="handleDragStart(`${Object.keys(days)[0]}`, $event,`${key}`, i)"
              >{{ 1 + i}}

                <Draggable
                    v-for="(project,index) in dayKey?dayKey:0" :key="project?.order_id"
                >
                  <dropcard

                      :class="index+1 <=  mainData.count>1?Math.round(mainData.count):Math.ceil(mainData.count)?'border-green-600': ' border-red-600 text-red-600 ' "
                      class="text-[12px]
                    font-extrabold
                    rounded-3xl
                    border-b-4
                    border-gray-600
                    bg-blue-300 "
                  >
                    <div class="h-fit w-[45px]">
                      {{ project?.order?.order_id }}
                    </div>
<!--                    <div :hidden="true">{{filterDate=project}}</div>-->
                    <div
                        :class="index+1 <=  mainData.count>1?Math.round(mainData.count):Math.ceil(mainData.count)?' bg-green-600 ': ' bg-red-600 text-white' "
                        class="min-w-fit
                      px-2
                      ml-2
                      sm:hiden
                      rounded-2xl
                      text-[12px]
                      text-center
                      text-white"
                    >
                      {{project.order?.process|objectFilter}}%
                    </div>
                  </dropcard>
                </Draggable>
              </Container>
            </v-card>
          </v-row>
        </div>
        <drag-and-drop-modal
                :modalinfo="modalData"
                :product-create="openDrag"
                :date="deliveryDates"
                @closemodal="openDrag=!openDrag"></drag-and-drop-modal>
      </div>
      {{ infinite ? '' : '' }}
    </div>
  </div>

</template>

<script>
import Dropcard from "@/components/DropCard";
import {Container, Draggable} from 'vue-smooth-dnd'
import DragAndDropModal from "@/components/DragAndDropModal";
import {WeekCardEdite,dragMainCard ,startMonthWeek } from "@/utils/DragAndDropData/dragStyle";
import {fullData,dragMethhods} from "@/utils/DragAndDropData/dragMainData";


export default {

  name: "DragDrop",
  props:{
    drawers:{
      required:true
    }
  },
  components: {DragAndDropModal, Container, Draggable, Dropcard,},
  data: () => ({
    WeekCardEdite,
    dragMainCard,
    ...fullData,
    startMonthWeek,
  }),
  computed: {
    // eslint-disable-next-line
    infinite() {
      let values = []
      let objectKeys = []
      for (const [key, value] of Object.entries(this.mainData?.data)) {
        values.push(value)
        objectKeys.push(key)
      }
      return objectKeys
    },
  },
filters:{
  objectFilter(value){
    let collect=0
    for (let i = 0; i < value.length; i++) {
      collect+=value[i]?.position?.position_percent>collect?
          value[i]?.position?.position_percent:
          0
    }
    return collect
  }
},
  methods: {
   ...dragMethhods
  },
  async beforeCreate() {

    try {
      await this.$store.dispatch('setDragAndDrop',(await this.$axios.get(`/orderCalendar/?date=${new Date().toString().slice(0,10)}`)).data)
      this.mainData = await this.$store.getters['getDragAndDrop']
    } catch (err) {
      console.log(err)
    }

  }
}
</script>