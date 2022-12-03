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
              :rules="nameRules"
              label="Имя пользователя"
              name="name"
          ></v-text-field>
          <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="Пользовательский пароль"
              name="password"
          ></v-text-field>
          <v-card-actions>
            <v-spacer/>
            <v-btn class="blue"
                   :loading="loading"
                   :disabled="loading"
                   @click="save">Добавить</v-btn>
            <v-btn class="red" @click="clear">
              Удалить
            </v-btn>
          </v-card-actions>
          <v-simple-table>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-left">
                  Позиции
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
                      v-model="position"
                      :label="item.position_name"
                      :rules="checkRules"
                      :value="item.position_id"
                      type="checkbox"
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
  props: {
    comments: {}
  },
  data() {
    return {
      loader: null,
      loading: false,
      name: '',
      password: '',
      position: [],
      valid: true,
      nameRules: [
        v => !!v || 'Укажите имя',
      ],
      passwordRules: [
        v => !!v || 'Tребуется пароль',
      ],
      checkRules: [
        v => !!v || 'Требуется должность',
      ],
    }
  },

  methods: {
    clear: function () {
      this.loader = null
      this.loading=false
      this.$refs.form.reset()
    },
    // eslint-disable-next-line
    save: async function () {
      this.loader = 'loading'
      const l = this.loader
      this[l] = !this[l]
      if (this.$refs.form.validate()) {
        const position = this.position
        const name = this.name
        const password = this.password
        await this.$axios.post('user', {name, password, position})
        this.$refs.form.reset()
        setTimeout(()=>{
          this[l] = false
        },2000)
        this.loader = null
      } else {
        this.name = ''
        this.password = ''
        this.position = ''
      }
    }
  },
  async beforeCreate() {
    try {
      await this.$store.dispatch('setUsersData', (await this.$axios.get('position')).data)
      await this.$store.dispatch('setPositionTableData', (await this.$axios.get('position')).data)
    } catch (err) {
      console.log(err)
    }
  }
}
</script>