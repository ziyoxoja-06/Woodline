<template>
    <v-card>
      <v-simple-table>
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-left">
              Name
            </th>
            <th class="text-left">
              Position
            </th>
            <th>Delete</th>

          </tr>
          </thead>
          <tbody>
          <tr
              v-for="(item,i) in $store.getters['getPositionTableData']"
              :key="i"
          >
            <td>{{ item.position_name }}</td>
            <td>{{ item.position_percent }}</td>
            <td>
              <v-btn class=" rounded-xl"
                     color="error">
                  Delete
              </v-btn>
            </td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </template>

<script>
export default {
  name: "SimpleTable",
  data(){
    return{
    }
  },
  methods:{

  },

}
</script>

<style scoped>

</style>
