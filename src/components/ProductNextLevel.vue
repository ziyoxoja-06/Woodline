<template>
  <div :hidden="productLevel" class="w-[100%] h-[100%] bg-gray-900/40 fixed top-0  right-0 left-0 z-50 " tabindex="-1">
    <div tabindex="1" class="w-full flex justify-center absolute">
      <v-alert class="text-center" width="100%" v-if="alert" type="success">Pozitsya o'zgardi</v-alert>
    </div>
    <div class="overflow-y-auto overflow-x-hidden w-full md:inset-0 h-modal md:h-full flex items-center justify-center">
      <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              Id: {{ $store.getters['getUserTableData']?.order?.order_id }}
            </h3>
            <button class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    type="button"
                    @click="closeModal">
              <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                   xmlns="http://www.w3.org/2000/svg">
                <path clip-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      fill-rule="evenodd"></path>
              </svg>
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
              <v-select
                  v-model="selectPosition"
                  :items="positonsItemData"
                  :rules="positionRules"
                  label="??????????????"
                  required
              ></v-select>
              <v-select
                  v-model="selectName"
                  :items="usersItemData"
                  :rules="nameRules"
                  label="????????????????????????"
                  required
              ></v-select>
            </v-form>
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
              ??????????????
              <img alt="image" class="w-5 ml-1" src="../image/right-arrowWhite.png">
            </v-btn>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Modal",
  data() {
    return {
      loader: null,
      loading: false,
      alert:false,
      valid: true,
      nameRules: [
        v => !!v || '?????????????? ??????',
      ],
      positionRules: [
        v => !!v || '?????????????? ??????????????',

      ],
      openmodal: true,
      selectPosition: null,
      selectName: null,
      positonsItemData: [],
      usersItemData: [],
      takeUser: []
    }
  },
  props: {
    productLevel: {
      require: true
    }
  },
  async created() {
    await this.$store.dispatch('setPositionTableData', (await this.$axios.get('position')).data)
    for (let i = 0; i < await this.$store.getters["getPositionTableData"].length; i++) {
      this.positonsItemData.push({
        text: await this.$store.getters["getPositionTableData"][i].position_name,
        value: await this.$store.getters["getPositionTableData"][i].position_id,
      })
    }
    for (let i = 0; i < (await this.$axios.get('user')).data.length; i++) {
      this.usersItemData.push({
        text: await this.takeUser[i].user_name,
        value: await this.takeUser[i].user_id,
      })
    }

  },
  watch: {

  },
  methods: {
    closeModal: function () {
      this.loader = null
      this.loading=false
      this.$refs.form.reset()
      this.$emit('close', this.openmodal)
    },
    send: async function () {
      this.loader = 'loading'
      const l = this.loader
      this[l] = !this[l]

      if (this.$refs.form.validate()) {
              let id = this.$store.getters['getUserTableData'].process_id
              let order = this.$store.getters['getUserTableData'].order.id
              let position = this.selectPosition
              let user = this.selectName

        await this.$axios.post('process', {id, order, position, user})
        await this.$store.dispatch('setMainTableDate', [])
        console.log( await this.$store.dispatch('setMainTableDate', (await this.$axios.get('process')).data),'wrg')
        await this.$store.dispatch('setMainTableDate', (await this.$axios.get('process')).data)
        this.$refs.form.reset()

        this.alert=true
       setTimeout(()=>{
          this.$emit('close', this.openmodal)
         this.alert=false
         this[l] = false
       },3000)
        this.loader = null

      } else {
        this.selectPosition = ''
        this.selectName = ''
      }
    }
  },
  async beforeCreate() {
    try {
      this.takeUser = (await this.$axios.get('user')).data
    }catch (err){
      console.log(err)
    }

  }
}
</script>

<style scoped>

</style>
