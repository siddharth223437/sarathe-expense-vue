<template>
  <div class="">

    <div class="shadow-lg relative" @click="showDropdownResult = !showDropdownResult" >
      <div class="rounded active:bg-gray-200 flex justify-between " :class="computeSize+' '+ bgColorClass">
        <div class="py-1 tracking-wide px-2 text-lg" :class="iconColorClass">
          {{selectedValue}}
        </div>
        <div class="flex flex-col justify-end items-end px-4">
          <i class="fas fa-chevron-up" :class="iconColorClass"></i>
          <i class="fas fa-chevron-down" :class="iconColorClass"></i>
        </div>
      </div>

      <transition name="fade">
        <div class="bg-white rounded mt-1 absolute  w-full h-56 overflow-y-scroll z-40" v-if="showDropdownResult" v-click-outside="hide" :class="bgColorClass">
          <div class="flex flex-col justify-center ">
            <div @click="emitSelectedValue(item,item)" v-if="objKey == null" v-for="(item,index) in objArr" :key="index" class="px-3 py-2 cursor-default  hover:text-white text-lg tracking-wider "
                 :class="computeHoverColor"
            >
              {{item}}
            </div>
            <div @click="emitSelectedValue(item,item[label])" v-if="objKey !== null" v-for="item in objArr" :key="item[objKey]" class="px-3 py-2 cursor-default  hover:text-white text-lg tracking-wider "
              :class="computeHoverColor"
            >
              {{item[label]}}
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "list",
  props:{
    objArr: {
      required: true,
    },
    objKey:{
      default: null
    },
    label: {
      default: null
    },
    hoverColor: {
      type: String,
      default: 'blue'
    },
    size: {
      type: String,
      default: 'md'
    },
    bgColorClass: {
      type: String,
      default: 'bg-white'
    },
    iconColorClass: {
      type: String,
      default: 'text-black'
    },
    initialValue: {
      default: null
    }
  },
  data:()=>({
    showDropdownResult: false,
    selectedValue: null
  }),
  methods: {
    hide(){
      this.showDropdownResult = false;
    },
    emitSelectedValue(item,labelValue){
      this.selectedValue = labelValue
      this.$emit('selected',item)
    }
  },
  computed: {
    computeHoverColor(){
      if(this.hoverColor === 'blue'){
        return 'hover:bg-blue-500'
      }else if(this.hoverColor === 'green'){
        return 'hover:bg-green-500'
      }
    },
    computeSize(){
      if(this.size === 'sm'){
        return 'py-0';
      }else if(this.size === 'md'){
        return 'py-2'
      }else if(this.size === 'lg'){
        return 'py-3'
      }
    },

  },
  watch: {
    initialValue: {
      immediate: true,
      handler(newVal){
        this.selectedValue = newVal;
      }
    }
  }
}
</script>

<style scoped>

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
