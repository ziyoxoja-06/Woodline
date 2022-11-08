<template>
  <div tabindex="-1" :hidden="searchOpen" class=" w-[100%] h-auto bg-gray-900/40 fixed top-0  right-0 left-0 z-50 ">
    <div   class=" w-full  h-auto md:h-auto flex items-center justify-center">
      <div class="relative  pb-96 p-4 w-full max-w-2xl h-auto md:h-auto">
        <!-- Modal content -->
        <div class=" bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div class="flex justify-between items-start p-2 rounded-t border-b dark:border-gray-600">

            <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" @click="searchEnd">
              <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <!-- Modal body -->
          <div class="p-6 space-y-6">
            <v-card>
              <v-card-title>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Поиск..."
                    single-line
                    hide-details
                ></v-text-field>
              </v-card-title>
              <v-data-table
                  :headers="headers"
                  :items="searchDates"
                  :search="search"
                  :items-per-page="5"
              ></v-data-table>
            </v-card>
          </div>
          <!-- Modal footer -->
          <div class="flex items-center justify-end p-6 pl-96 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
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
  props:{
    searchDates: {
      namespaced: true
    },
    searchOpen:{
      namespaced: true
    }
  },
  data:()=>({
    searchs:true,
    search:'',

    headers: [
      {
        text: 'Id',
        align: 'start',
        sortable: false,
        value: 'id',
      },
      { text: 'Модель', value: 'model' },
      { text: 'Пользователь', value: 'user' },
      { text: 'Должность', value: 'role' },
      { text: 'Дата', value: 'date' },
    ],
  }),
async mounted() {

},
  computed:{

  },
  methods:{
    searchEnd:  function(){
      this.searchs=''

      this.$emit('searchEnd',this.searchs)
    },
  },
  async beforeDestroy() {
    await this.$store.getters['getSearchModal']
  }

}
</script>

<style scoped>

</style>
