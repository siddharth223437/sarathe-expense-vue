<template>
  <div class="my-12">
    <transition enter-class="opacity-0 "
                enter-active-class="transition ease-in-out duration-1000"
                leave-active-class="transition ease-in-out duration-1000"
                leave-to-class="opacity-0"
    >
     <add v-if="!showMainPage" :expense-to-edit="expenseToEdit"/>
    </transition>
    <div v-if="showMainPage">
    <div class="flex flex-col xl:flex-row item-start xl:items-center justify-between xl:space-y-0 space-y-4 mt-6">
      <div class="bg-white py-6 px-6 rounded-lg xl:w-1/3 shadow">
        <div class=" flex rounded-lg justify-start space-x-4 items-start">
          <div class="bg-yellow-100 px-5 py-3 rounded-lg">
            <i class="fas fa-dollar-sign text-yellow-400 text-3xl"></i>
          </div>
          <div class="font-bold">
            {{showHeaderMonth}} Expense
            <div class="font-semibold">
              {{totalExpense}}
            </div>
          </div>
        </div>
        <div class="h-2 bg-gray-300 overflow-hidden flex rounded mt-4 mb-4 text-xs w-full ">
          <div :style="{'width':`${width}%`}" class="shadow-none text-center whitespace-nowrap text-white  justify-center bg-yellow-500"></div>
        </div>
        <div>
          <i class="fas fa-arrow-down text-red-600 text-lg"></i>
          <span class="text-sm text-red-600 font-bold tracking-normal">1.15%</span>
          <span class="text-gray-500 font-bold text-sm">since last month</span>
        </div>
      </div>

      <div class="bg-white  py-6 px-6 rounded-lg xl:w-1/3 shadow">
        <div class=" flex rounded-lg justify-start space-x-4 items-start">
          <div class="bg-blue-100 px-4 py-3 rounded-lg">
            <i class="fas fa-comments-dollar text-blue-400 text-3xl"></i>
          </div>
          <div class="font-bold">
            December Expense
            <div class="font-semibold">
              1,642
            </div>
          </div>
        </div>
        <div class="h-2 bg-gray-300 overflow-hidden flex rounded mt-4 mb-4 text-xs w-full ">
          <div :style="{'width':`${width}%`}" class="shadow-none text-center whitespace-nowrap text-white  justify-center bg-blue-500"></div>
        </div>
        <div>
          <i class="fas fa-arrow-down text-red-600 text-lg"></i>
          <span class="text-sm text-red-600 font-bold tracking-normal">1.15%</span>
          <span class="text-gray-500 font-bold text-sm">since last week</span>
        </div>
      </div>
    </div>

    <div class="bg-indigo-400 h-1 rounded-full my-6"/>

    <div class="mb-6">
      <div class="bg-white px-4 py-4 w-full rounded shadow">
        <form>
          <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center  justify-between xl:justify-start">
            <span class="w-full sm:w-1/6 2xl:w-1/12">
              <label class="block">Select Month</label>
              <select v-model="currentMonth" id="selectMonth" class="font-bold tracking-widest mb-6 w-full  bg-blue-400 text-white rounded py-1 px-2 outline-none ring-2 ring-purple-200 relative">
                <option v-for="month in getAllMonths" :key="month" :value="month">
                  {{month}}
                </option>
              </select>
            </span>

            <span class="w-full sm:w-1/6 2xl:w-1/12">
              <label class="block">Select year</label>
              <select v-model="currentYear" id="selectYear" class="font-bold tracking-widest mb-6 w-full  bg-blue-400 text-white rounded py-1   px-2 outline-none ring-2 ring-purple-200 relative">
               <option>2019</option>
               <option>2020</option>
              </select>
            </span>

            <span class="w-1/2">
              <button class="btn btn-primary" @click.prevent="searchExpense">Search</button>
            </span>

          </div>
        </form>
      </div>
    </div>

    <div>

      <div>
        <button class="btn  btn-indigo uppercase tracking-widest px-4" @click="addExpense">Add Expense</button>
      </div>


      <div class="overflow-x-auto shadow">
      <table class=" w-full bg-white rounded shadow ">
        <thead >
        <tr>
          <th v-for="header in tableHead" class="xl:px-6 px-1 py-3 border-b-2 border-gray-400 text-left leading-4 text-blue-800 tracking-wider">{{header}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="expense in searchExpenseResp">
          <td class="xl:px-6 px-1  py-4 border-b border-gray-500 text-sm">{{$moment(expense.date).format('MMM DD, yyyy')}}</td>
          <td class="xl:px-6 px-1  py-4 border-b border-gray-500 text-sm">{{expense.accountName}}</td>
          <td class="xl:px-6 px-1  py-4 border-b border-gray-500 text-sm">{{expense.categoryName}}</td>
          <td class="xl:px-6 px-1  py-4 border-b border-gray-500 text-sm">{{expense.type}}</td>
          <td class="xl:px-6 px-1  py-4 border-b border-gray-500 text-sm">$ {{expense.amount}}</td>
          <td class="xl:px-6 px-1  py-4 border-b border-gray-500 ">
            <i class="fas fa-edit text-green-500 cursor-pointer hover:text-green-400 transform hover:scale-150 transition ease-in-out duration-300" @click="editExpense(expense.expenseId)"></i>
          </td>
          <td class="xl:px-6 px-1  py-4 border-b border-gray-500 ">
            <i class="fas fa-times text-red-500 cursor-pointer hover:text-red-400 transform hover:scale-150 transition ease-out duration-300" @click="deleteExpense(expense.expenseId)"></i>
          </td>
        </tr>
        <tr>
          <td class="px-6 py-6"></td>
        </tr>
        </tbody>
      </table>
      </div>

      <div class="py-4 flex justify-end">
        <nav class="block">
          <ul class="flex pl-0 rounded list-none flex-wrap">
            <li>
              <a href="#pablo" class="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-indigo-200 text-white bg-indigo-200">
                <i class="fas fa-chevron-left -ml-px"></i>
                <i class="fas fa-chevron-left -ml-px"></i>
              </a>
            </li>
            <li>
              <a href="#pablo" class="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-indigo-200 text-white bg-indigo-200">
                <i class="fas fa-chevron-left -ml-px"></i>
              </a>
            </li>
            <li>
              <a href="#pablo" class="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-indigo-500 text-white bg-indigo-500">
                1
              </a>
            </li>
            <li>
              <a href="#pablo" class="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-indigo-200 text-white bg-indigo-200">
                2
              </a>
            </li>
            <li>
              <a href="#pablo" class="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-indigo-500 bg-white text-indigo-500">
                3
              </a>
            </li>
            <li>
              <a href="#pablo" class="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-indigo-500 bg-white text-indigo-500">
                4
              </a>
            </li>
            <li>
              <a href="#pablo" class="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-indigo-500 bg-white text-indigo-500">
                5
              </a>
            </li>
            <li>
              <a href="#pablo" class="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-indigo-500 bg-white text-indigo-500">
                <i class="fas fa-chevron-right -mr-px"></i>
              </a>
            </li>
            <li>
              <a href="#pablo" class="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-indigo-500 bg-white text-indigo-500">
                <i class="fas fa-chevron-right -mr-px"></i>
                <i class="fas fa-chevron-right -mr-px"></i>
              </a>
            </li>
          </ul>
        </nav>
      </div>

    </div>

    </div>


  </div>
</template>

<script>
import Datepicker from '~/components/datepicker'
import Login from '~/components/login'
import Add from '~/components/add'
export default {
  components: { Add, Login, Datepicker },
  middleware: 'auth',
  name: 'index',
  data:()=>({
    width: '60',
    tableHead: [],
    tableRow: [],
    currentMonth: null,
    currentYear: null,
    expenseSearch: {
      fromDate: null,
      toDate: null,
    },
    searchExpenseResp: [],
    expenseToEdit: null,
    showMainPage: true,
    showHeaderMonth: null,
    totalExpense: 0
  }),

  methods: {
    async searchExpense(){
      this.showHeaderMonth = this.currentMonth
      const currentDate = this.currentYear+'-'+this.currentMonth;
      this.expenseSearch.fromDate = this.$moment(currentDate,'yyyy-MMMM').startOf('month').format('yyyy-MM-DD');
      this.expenseSearch.toDate = this.$moment(currentDate,'yyyy-MMMM').endOf('month').format('yyyy-MM-DD');
      this.searchExpenseResp = await this.$axios.$post('/expense/search',this.expenseSearch);
      if(this.searchExpenseResp !== undefined){
        this.searchExpenseResp.filter(r => {
          this.totalExpense = this.totalExpense + r.amount
        })
      }
    },
    getCurrentMonth(){
      this.currentMonth = this.$moment().format('MMMM');
    },

    getCurrentYear(){
      this.currentYear = this.$moment().format('yyyy')
    },
    editExpense(id){
      this.searchExpenseResp.filter(e => {
        if(e.expenseId === id){
          this.expenseToEdit = e;
          this.showMainPage = false;
        }
      })
    },
    addExpense(){
      this.expenseToEdit = null;
      this.showMainPage = false
    },
    async deleteExpense(expenseId){
      let response = await this.$axios.$delete(`/expense/delete/${expenseId}`);
      if(response !== undefined && response.resp === 'success'){
        await  this.searchExpense();
      }
    },
  },

  created () {
    this.tableHead.push('Date');
    this.tableHead.push('Account');
    this.tableHead.push('Category');
    this.tableHead.push('Type');
    this.tableHead.push('Amount');
    this.tableHead.push('');
    this.tableHead.push('');

    this.getCurrentMonth();
    this.getCurrentYear();
    this.searchExpense();

  },

  computed: {
    getAllMonths(){
      return this.$moment.months();
    },

  }
}
</script>

<style scoped>

</style>
