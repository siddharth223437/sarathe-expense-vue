<template>
  <div class="bg-blue-200 border-blue-500 text-blue-900 py-4  w-full md:w-1/2 shadow-lg border-l-4  flex justify-start rounded-lg"
    :class="{'border-red-500 text-red-900 bg-red-100':danger}"
  >
    <span class="md:text-lg text-sm font-semibold md:tracking-widest">
      <i class="fas fa-check-circle px-4 text-blue-900"></i>
      <i class="fas fa-exclamation-triangle px-4 text-red-900" v-if="danger"></i>
      {{message}}
    </span>
  </div>
</template>

<script>
export default {
  name: 'alert',
  props: {
    success: Boolean,
    danger: Boolean,
    warning: Boolean,
    primary: Boolean,
    custom: String,
    message: {
      required: true,
      type: String
    },
    disableAlert: {
      type: Number,
      default: null
    }
  },
  data:()=>({
    disableAlertObj: {
      timeAfterDisable: 20000 //  20 seconds
    }
  }),
  computed: {
    determineUpperDiv(){
      if(this.primary){
        return ""
      }
    }
  }
}
</script>

<style scoped>

</style>
