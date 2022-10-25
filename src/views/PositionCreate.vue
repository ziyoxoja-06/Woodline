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
            label="Position name"
        ></v-text-field>
        <v-text-field
            v-model="percent"
            :rules="precentRules"
            name="precent"
            label="Position precent"
        ></v-text-field>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer/>
        <v-btn class="blue" @click="save(name, percent)">Add</v-btn>
        <v-btn class="red" @click="clear">
          clear
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
      name:'',
      percent:'',
      valid: true,
      positionRules: [
        v => !!v || 'Name is required',
      ],
      precentRules: [
        v => !!v || 'Name is required',
      ],
    }
  },
  
   methods:{
  clear:function (){
    this.$refs.form.reset()
  },
    // eslint-disable-next-line
    save:async function (name, percent) {
      if (this.$refs.form.validate()) {
          await this.$axios.post('position', {name,percent})
          await this.$store.dispatch('setPositionTableData',(await this.$axios.get('position')).data)
          await this.$store.dispatch('setUsersData',(await this.$axios.get('position')).data)
        this.$refs.form.reset()
      }else {
        this.name=''
        this.percent=''
      }
      }

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
