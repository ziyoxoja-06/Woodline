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
            name="name"
            :rules="nameRules"
            label="User name"
        ></v-text-field>
        <v-text-field
            v-model="password"
            name="password"
            :rules="passwordRules"
            label="User password"
        ></v-text-field>
          <v-card-actions>
            <v-spacer/>
            <v-btn class="blue" @click="save">Add</v-btn>
            <v-btn class="red" @click="clear">
              clear
            </v-btn>
          </v-card-actions>
        <v-simple-table>
          <template v-slot:default>
            <thead>
            <tr>
              <th class="text-left">
                Positions
              </th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="item in $store.getters['getUsersData']"
                :key="item.position_id"
            >

              <td>

                <v-checkbox
                    type="checkbox"
                    v-model="position"
                    :rules="checkRules"
                    :label="item.position_name"
                    :value="item.position_id"
                />
              </td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
        </v-form>
      </v-card-text>



    </v-card>

  </div>
</template>

<script>

export default {
  name: "UserAdd",

  data(){
    return{
      name:'',
      password:'',
      position:[],
      valid: true,
      nameRules: [
        v => !!v || 'Name is required',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
      ],
      checkRules: [
        v => !!v || 'Position is required',
      ],
    }
  },

  methods:{
    clear:function (){
      this.name = '';
      this.password=''
      this.position=[]
    },
    // eslint-disable-next-line
    save:async function () {
      if (this.$refs.form.validate()) {
        const position = this.position
        const name = this.name
        const password = this.password
        await this.$axios.post('user', {name, password, position})
        this.$refs.form.reset()
      }else {
        this.name=''
        this.password=''
        this.position =''
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

<style scoped>

</style>
