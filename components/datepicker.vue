<template>

  <div class="antialiased sans-serif ">
    <button v-if="showDatepicker" @click.prevent="showDatepicker = false" class="fixed outline-none inset-0 bg-transparent opacity-50 cursor-default h-full w-full"></button>
      <div>
        <div class="w-full relative">
          <input type="text" readonly id="datepicker" @click="showDatepicker = !showDatepicker" @keydown.escape="showDatepicker = false"
              class="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:outline-none focus:ring-2 ring-purple-200"
              placeholder="Select date" v-model="selectedDate">
          <div class="absolute top-0 right-0 px-3 py-2">
            <svg class="h-6 w-6 text-gray-400"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>

          <transition enter-active-class="transition transition-opacity-50"
                      leave-active-class="transition transition-opacity-50"
                      enter-class="opacity-0"
                      leave-to-class="opacity-0"
          >
          <div class="bg-white mt-1 rounded-lg absolute top-12 shadow p-4 top-0 left-0 w-64 " v-if="showDatepicker" >

            <div class="flex justify-between items-center mb-2">
              <div>
                <span class="text-lg font-bold text-gray-800">{{MONTH_NAMES[month]}}</span>
                <span class="ml-1 text-lg text-gray-600 font-normal">{{year}}</span>
              </div>
              <div>
                <button
                    type="button" @click="goToPrevMonth"
                    class="transition focus:outline-none ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full">
                  <svg class="h-6 w-6 text-gray-500 inline-flex"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                  </svg>
                </button>
                <button
                    type="button" @click="goToNextMonth"
                    class="transition focus:outline-none ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full">
                  <svg class="h-6 w-6 text-gray-500 inline-flex"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>

            <div class="grid grid-cols-7" @click="showDatepicker = false">
              <div v-for="day in DAYS">
                <div class="text-gray-800 font-medium text-center text-xs">{{day}}</div>
              </div>
              <div v-for="blnk in blankdays">
                <div class="text-center  text-sm"	></div>
              </div>
              <div v-for="date in no_of_days" >
                <div class="px-1 mb-1">
                <div  class="cursor-pointer text-center text-sm leading-none rounded-full leading-loose transition ease-in-out duration-100 transition ease-in duration-500"
                       :class="{'bg-blue-500 text-white': isToday(date) == true, 'text-gray-700 hover:bg-blue-200': isToday(date) == false }" @click="selectDate(date)">{{date}}</div>
              </div>
              </div>
            </div>
          </div>
          </transition>
        </div>
      </div>
    </div>
</template>

<script>
export default {

  name: "datepicker",
  props:{
    format: {
      required: false,
      default: 'MMM DD, yyyy'
    }
  },
  data:()=>({
    showDatepicker: false,
    month: '',
    year: '',
    blankdays: [],
    no_of_days: [],
    DAYS : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    MONTH_NAMES : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    selectedDate: null


  }),
  methods: {
    buildDates() {
      let daysInMonth = new Date(this.year, this.month + 1, 0).getDate();
      // find where to start calendar day of week
      let dayOfWeek = new Date(this.year, this.month).getDay();
      let blankdaysArray = [];
      for ( var i=1; i <= dayOfWeek; i++) {
        blankdaysArray.push(i);
      }

      let daysArray = [];
      for ( var i=1; i <= daysInMonth; i++) {
        daysArray.push(i);
      }

      this.blankdays = blankdaysArray;
      this.no_of_days = daysArray;

    },

    isToday(date) {
      const today = new Date();
      const d = new Date(this.year, this.month, date);

      return today.toDateString() === d.toDateString() ? true : false;
    },

    initDate() {
      let today = new Date();
      // let today = new Date(2021,0,1);
      this.month = today.getMonth();
      this.year = today.getFullYear();
      this.datepickerValue = new Date(this.year, this.month, today.getDate()).toDateString();
    },

    goToNextMonth(){
      this.month++;
      if (this.month > 11) {
        this.month = 0;
        this.year++;
      }
      this.buildDates();
      // this.monthHeading = this.months[this.month];
    },

    goToPrevMonth(){
      this.month--;
      if (this.month < 0) {
        this.month = 11;
        this.year--;
      }
      this.buildDates();
      // this.monthHeading = this.months[this.month];
    },
    selectDate(date){
      let d = new Date(this.year,this.month,date);
      this.selectedDate = this.$moment(d).format('MMM DD, yyyy');
      this.$emit('selectedDate', d)
    },
  },
  created () {
    this.initDate();
    this.buildDates();
  },
  computed: {

  }

}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
