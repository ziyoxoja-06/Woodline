<template>
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
        :items="coplateData"
        :search="search"
        :items-per-page="5"
    ></v-data-table>
  </v-card>
</template>

<script>
export default {
  name: "ComplateProjects",
  data:()=>({
    search:'',
    coplateData:[],
    headers:[
      {
        text: 'id',
        align: 'start',
        filterable: true,
        value: 'id',
      },
      { text: 'Модель ', value: 'model' },
      { text: 'Ткань ', value: 'tissue' },
      { text: 'Дата', value: 'date' },
    ]
  }),
 async mounted(){
   await this.$store.dispatch('setComplateProjects',(await this.$axios.get('processComplete')).data)
   await this.$store.getters['getComplateProjects'].forEach(data=>{
     this.coplateData.push({
       id:data.order.order_id,
       model:data.order.model.model_name,
       tissue:data.order.tissue,
       date:data.order.delivery_date
     })
   })

  }
}
</script>

<style scoped>

</style>