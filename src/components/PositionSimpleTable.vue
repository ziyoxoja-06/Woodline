<template>
    <v-card>
      <v-simple-table>
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-left">
              Имя
            </th>
            <th class="text-left">
              Процент
            </th>
            <th>Удалить</th>

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
              <v-btn  class=" rounded-xl"
                     color="error">
                Удалить
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
}
</script>
