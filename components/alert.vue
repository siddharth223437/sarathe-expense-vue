<template>
  <div class="py-4  w-full md:w-1/2 shadow-lg border-l-4  flex justify-start rounded-lg " v-if="showAlertBox"
    :class="{
    'border-red-500 text-red-900 bg-red-100':danger,
    'bg-blue-200 border-blue-500 text-blue-900':primary,
    'bg-green-100 border-green-700 text-green-900': success,
    'bg-yellow-100 border-yellow-600 text-yellow-900': warning,
    'bg-indigo-200 border-indigo-600 text-indigo-900': info,
    'md:w-full':widthFull
  }"
  >
    <span class="md:text-lg text-sm font-semibold md:tracking-widest">
      <i :class="{'fas fa-check-circle px-4 text-blue-900':primary}"></i>
      <i :class="{'fas fa-exclamation-triangle  px-4 text-red-900':danger}"></i>
      <i :class="{'fas fa-check  px-4 text-green-900':success}"></i>
      <i :class="{'fas fa-exclamation  px-4 text-yellow-900':warning}"></i>
      <i :class="{'fas fa-info-circle  px-4 text-indigo-900':info}"></i>
      {{message}} {{computeDisableAlertBox}}
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
    info: Boolean,
    disableAlertBox: {
      type: Number,
      default: -1
    },
    custom: {
      type: Object
    },
    message: {
      required: true,
      type: String
    },
    widthFull: {
      type: Boolean,
      default: false
    }
  },
  data:()=>({
    showAlertBox: true
  }),

  computed: {
    computeDisableAlertBox() {
      if (this.disableAlertBox === -1) {
        this.showAlertBox = true
      } else {
        setInterval(() => {
          this.showAlertBox = false
        }, 20000)
      }
    }
  },
}
</script>

<style scoped>
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
