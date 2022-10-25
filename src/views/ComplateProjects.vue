<template>
  <v-card>
    <v-card-title>
      <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
        :headers="headers"
        :items="coplateData"
        :search="search"
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
      { text: 'Model ', value: 'model' },
      { text: 'Tissue ', value: 'tissue' },
      { text: 'Date', value: 'date' },
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