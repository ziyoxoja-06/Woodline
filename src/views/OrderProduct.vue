<template>
  <div class="container mx-auto">
    <v-expansion-panels>
      <v-expansion-panel
          v-for="(item,i) in order"
          :key="i"
      >
        <v-expansion-panel-header class="mt-2">
          <span>
            <v-badge
                color="green"
                :content="item?.process.length"
            >
            {{positionNmae[i+1]}}
        </v-badge>
          </span>

        </v-expansion-panel-header >
        <v-expansion-panel-content v-for="(pruduct,s) in item.process" :key="s">
          <b>{{pruduct.order.order_id}}</b>
          <span> ({{pruduct.order.model.model_name}})</span>
          <span> - {{pruduct.order.tissue}}</span>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <div></div>
  </div>

</template>

<script>
export default {
  name: "NumProduct",
  data: () => ({
    order: [],
    present: [],
    positionNmae: []
  }),

  async beforeCreate() {
    try {
      await this.$store.dispatch('setOrderData', (await this.$axios.get('positionAll')).data)
      await this.$store.dispatch('setPositionTableData',(await this.$axios.get('position')).data)

      setTimeout(()=>{
        this.present =  this.$store.getters['getPositionTableData'].sort((a, b) => {
        a.position_percent - b.position_percent
      })
        console.log(this.present,'move')
        this.order =  this.$store.getters['getOrderData']

        for (let i = 0; i < this.order.length; i++) {
          console.log(this.order[i].position_percent)
          for (let j = 0; j < this.present.length; j++) {
            console.log(this.present[j].position_percent)
            this.present[j].position_percent===this.order[i].position_percent?
                this.positionNmae.push(this.present[j+1].position_name):''
          }
        }
      },200)
      console.log(this.present,'move2')
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style scoped>

</style>