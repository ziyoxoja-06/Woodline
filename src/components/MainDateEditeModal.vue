<template>
  <div :hidden="editeModal" class=" w-[100%] h-auto bg-gray-900/40 fixed top-0  right-0 left-0 z-50 " tabindex="-1">
    <div class="w-full flex justify-center" tabindex="1">
      <v-alert v-if="alert" class="text-center" type="success" width="100%">{{ alertText }}</v-alert>
    </div>
    <div class=" w-[100%]  h-auto md:h-auto flex items-center justify-center">
      <div class="relative  pb-96 p-4 w-[60%]  h-auto md:h-auto">
        <!-- Modal content -->
        <div class=" bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div class="flex justify-between items-start p-2 rounded-t border-b dark:border-gray-600">

            <button
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                type="button"
                @click="searchEnd">
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
            <v-card class="h-full">
              <v-card-title>
                <!--  eslint-disable -->
                Изменить ID
              </v-card-title>
              <v-card-text class="flex align-center">
                <span class="mr-5">Id 1: </span>
                <div class="w-48">
                  <v-text-field v-model="editeModaleDate.order.order_id" disabled/>
                </div>
                <v-icon class="mx-[2%]" color="red">mdi-swap-horizontal</v-icon>
                <span class="mr-5">Id 2: </span>
                <div class="w-48">
                  <v-select v-model="selectModelId" :items="selectDataId"/>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-spacer/>
                <v-btn
                    :disabled="loading1"
                    :loading="loading1"
                    color="warning"
                    @click="changeId">Отправить
                </v-btn>
              </v-card-actions>
            </v-card>
            <v-card>
              <v-card-title>
                Изменить юзера
              </v-card-title>
              <v-card-text class="flex align-center">
                <span class="mr-5">User 1: </span>
                <div class="w-48">
                  <v-text-field v-model="editeModaleDate.user.user_name" disabled/>
                </div>
                <v-icon class="mx-[2%]" color="red">mdi-swap-horizontal</v-icon>
                <span class="mr-5">User 2: </span>
                <div class="w-48">
                  <v-select v-model="selectModelUser" :items="selectDataName"/>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-spacer/>
                <v-btn :disabled="loading2"
                       :loading="loading2"
                       color="warning"
                       @click="changeName">Отправить
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>
          <!-- Modal footer -->
          <div
              class="flex items-center justify-end p-6 pl-96 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainDateEditeModal",
  props: {
    editeModal: {
      namespaced: true
    },
    editeModaleDate: {
      namespaced: true
    }
  },
  data: () => ({
    loader1: null,
    loading1: false,
    loader2: null,
    loading2: false,
    alertText: '',
    selectDataId: [],
    selectDataName: [],
    alert: false,
    selectModelId: '',
    selectModelUser: '',

  }),
  watch: {
    async logss() {
      console.log(this.editeModalDate.order, 'jjjjjj')
    }
  },
  methods: {
    async changeId() {
      this.alertText = "Model Id si o'zgardi"
      this.loader1 = 'loading1'
      let l = this.loader1
      this[l] = !this[l]
      await this.$axios.put(`changeId/${this.editeModaleDate.order.id}`, {id2: this.selectModelId})
      await this.$store.dispatch('setMainTableDate', (await this.$axios.get('process')).data)
      this.alert = true
      setTimeout(() => {
        this.alert = false
        this[l] = false
      }, 2000)
      this.loader1 = null
      this.selectModelId = ''
      this.$emit('editeModalClose', true)
    },
    async changeName() {
      this.alertText = "Ishchi nomi o'zgardi"
      this.loader2 = 'loading2'
      let l = this.loader2
      this[l] = !this[l]
      await this.$axios.put(`process/${this.editeModaleDate.process_id}`, {user_id: this.selectModelUser})
      await this.$store.dispatch('setMainTableDate', (await this.$axios.get('process')).data)
      this.alert = true
      setTimeout(() => {
        this.alert = false
        this[l] = false
      }, 2000)
      this.loader2 = null
      this.selectModelId = ''
      this.$emit('editeModalClose', true)
    },
    searchEnd: function () {
      this.loader2 = null
      this.loading2 = false
      this.loader1 = null
      this.loading1 = false
      this.$emit('editeModalClose', true)
    },
  },
  async beforeCreate() {
  try {
    (await this.$axios.get('process')).data.forEach(date => {
      this.selectDataId.push({text: date?.order?.order_id, value: date?.order?.id})
    });
    (await this.$axios.get('user')).data.forEach(date => {
      this.selectDataName.push({text: date?.user_name, value: date?.user_id})
    })
  }catch (e) {
    console.log(e)
  }
  }
}
</script>