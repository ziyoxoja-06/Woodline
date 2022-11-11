<template>
  <div class="mx-5 mt-6">
    <v-card class="px-10">

      <v-card-text>
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
        >
        <v-text-field
            v-model="name"
            :rules="positionRules"
            name="name"
            label="Название позиции"
        ></v-text-field>
        <v-text-field
            v-model="percent"
            :rules="precentRules"
            name="precent"
            label="Процент позиции"
        ></v-text-field>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer/>
        <v-btn class="blue"
               :loading="loading"
               :disabled="loading"
               @click="save(name, percent)">Добавить</v-btn>
        <v-btn class="red" @click="clear">
          Удалить
        </v-btn>
      </v-card-actions>

    </v-card>
    <simple-table  class="px-10 " />
  </div>
</template>
<script>
import simpleTable from "@/components/PositionSimpleTable";
export default {
  components: {simpleTable},

  data(){
    return{
      loader: null,
      loading: false,
      name:'',
      percent:'',
      valid: true,
      positionRules: [
        v => !!v || 'Укажите позиции',
      ],
      precentRules: [
        v => !!v || 'Требуется процент',
      ],
    }
  },

  computed:{

  },
   methods:{
  clear:function (){
    this.loader = null
    this.loading=false
    this.$refs.form.reset()
  },
    // eslint-disable-next-line
    save:async function (name, percent) {
      this.loader = 'loading'
      const l = this.loader
      this[l] = !this[l]
      if (this.$refs.form.validate()) {
          await this.$axios.post('position', {name,percent})
          await this.$store.dispatch('setPositionTableData',(await this.$axios.get('position')).data)
          await this.$store.dispatch('setUsersData',(await this.$axios.get('position')).data)
        this.$refs.form.reset()
        setTimeout(()=>{
          this[l] = false
        },2000)
        this.loader = null
      }else {
        this.name=''
        this.percent=''
      }
      }

  },

 async created() {
  },
 async beforeCreate() {
    try {
      await this.$store.dispatch('setUsersData',(await this.$axios.get('position')).data)
      await this.$store.dispatch('setPositionTableData',(await this.$axios.get('position')).data)
    }catch (err){
      console.log(err)
    }

  }

}
</script>
