<template>
  <div class="container flex justify-center md:px-[20%] xl:px-[30%] lg:px-[20%] px-[10%] sm:px-[10%] mt-28 messagess">

    <v-card class=" flex justify-center p-12 pb-30 rounded-lg ">
      <v-card-title>
        <div class="w-full flex justify-center">
          <v-alert class="text-center" width="100%" v-if="alert" type="error">{{aletrText}}</v-alert>
        </div>
      </v-card-title>
      <v-card-text>
        <v-form
            ref="form"
            v-model="valid"
            class=""
            lazy-validation
        >
          <v-text-field
              v-model="name"
              :counter="10"
              :rules="nameRules"
              label="Name"
              required
          ></v-text-field>

          <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="Password"
              required
              type="password"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions class="mt-10">
        <v-btn
            class="mr-4 "
            color="success"
            @click="validates"
        >
          Login
        </v-btn>
        <v-btn
            class="mr-4"
            color="error"
            @click="reset"
        >
          Reset
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
// eslint-disable-next-line
  name: "Login",
  data: () => ({
    alert:false,
    aletrText:'',
    alertType:'',
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Ismingizni kriting',
      v => (v && v.length <= 15) || 'Name must be less than 15 characters',
    ],
    password: '',
    passwordRules: [
      v => !!v || "Paro'lingizni kriting",
      v => (v && v.length <= 15) || 'Name must be less than 15 characters',
    ],
  }),
  methods: {
    async validates() {
      if (this.$refs.form.validate()) {
          if (await this.$store.getters['getLogin'].some(a => a.name === this.name)) {
            if (await this.$store.getters['getLogin'].some(a => a.password === this.password)){
              await this.$store.dispatch('setNavbarName', await this.$store.getters['getLogin'].filter(a => a.name === this.name))
              await this.$refs.form.reset()
              await this.$router.push('/')
            }
            else {
              this.alert = true
              this.aletrText = 'Password wrong'
              setTimeout(()=>{this.$refs.form.reset(); this.alert =false},2000)
            }
          }else {
            this.alert =true
            this.aletrText= 'Login name wrong'
            setTimeout(()=>{this.$refs.form.reset(); this.alert =false},2000)
          }
      } else {
        this.$refs.form.reset()
      }
    },
    reset() {
      this.$refs.form.reset()
    }
  },
}
</script>