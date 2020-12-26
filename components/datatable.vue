<template>
  <div>
    <table>
      <tbody>
      <tr v-for="items in tbodyArr">
        <slot name="beforeTd"></slot>
        <td v-for="num in tdKeys">
          {{items[num]}}
        </td>
        <slot name="afterTd"></slot>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "datatable",
  props: {
    tbodyArr:{
      type: Array,
      required: true
    },
    tdKeys: {
      type: Array,
      required: true
    },
    colArr: {
      type: Array,
      required: false
    }
  },
  data:()=>({

  })
}
</script>

<style scoped>

</style>
