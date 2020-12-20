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
    <div class="flex flex-col xl:flex-row item-start xl:items-center gap-12 xl:space-y-0 space-y-4 mt-6">
      <div class="bg-white py-6 px-6 rounded-lg xl:w-1/3 shadow">
        <div class=" flex rounded-lg justify-start space-x-4 items-start">
          <div class="bg-yellow-100 px-5 py-3 rounded-lg">
            <i class="fas fa-dollar-sign text-yellow-400 text-3xl"></i>
          </div>
          <div class="font-bold">
            {{showHeaderMonth}} Expense
            <div class="font-semibold">
              {{computeTotalExpense | currency('')}}
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

<!--2nd-->
      <div class="bg-white py-6 px-6 rounded-lg xl:w-1/3 shadow">
        <div class=" flex rounded-lg justify-start space-x-4 items-start">
          <div class="bg-green-100 px-5 py-3 rounded-lg">
            <i class="fas fa-th-list text-green-400 text-3xl"></i>
          </div>
          <div class="font-bold">
            Most Used Category
            <div class="font-semibold flex items-end gap-1">
              {{computeMostUsedCategory.categoryName}} <button @click="showModal=true" class="text-xs text-blue-500 hover:text-blue-300 focus:outline-none">see breakdown</button>
            </div>
          </div>
        </div>
        <div class="h-2 bg-gray-300 overflow-hidden flex rounded mt-4 mb-4 text-xs w-full ">
          <div :style="{'width':`${width}%`}" class="shadow-none text-center whitespace-nowrap text-white  justify-center bg-green-500"></div>
        </div>
        <div>
          <i class="fas fa-arrow-down text-red-600 text-lg"></i>
          <span class="text-sm text-red-600 font-bold tracking-normal">1.15%</span>
          <span class="text-gray-500 font-bold text-sm">since last month</span>
        </div>
      </div>

<!--      3rd-->

      <div class="bg-white py-6 px-6 rounded-lg xl:w-1/3 shadow">
        <div class=" flex rounded-lg justify-start space-x-4 items-start">
          <div class="bg-purple-100 px-5 py-3 rounded-lg">
            <i class="fas fa-dollar-sign text-purple-400 text-3xl"></i>
          </div>
          <div class="font-bold">
            Most Used Category Amount
            <div class="font-semibold">
              {{computeMostUsedCategory.amount | currency('')}}
            </div>
          </div>
        </div>
        <div class="h-2 bg-gray-300 overflow-hidden flex rounded mt-4 mb-4 text-xs w-full ">
          <div :style="{'width':`${width}%`}" class="shadow-none text-center whitespace-nowrap text-white  justify-center bg-purple-500"></div>
        </div>
        <div>
          <i class="fas fa-arrow-down text-red-600 text-lg"></i>
          <span class="text-sm text-red-600 font-bold tracking-normal">1.15%</span>
          <span class="text-gray-500 font-bold text-sm">since last month</span>
        </div>
      </div>

<!--      4th-->

<!--      <div class="bg-white  py-6 px-6 rounded-lg xl:w-1/3 shadow">-->
<!--        <div class=" flex rounded-lg justify-start space-x-4 items-start">-->
<!--          <div class="bg-blue-100 px-4 py-3 rounded-lg">-->
<!--            <i class="fas fa-comments-dollar text-blue-400 text-3xl"></i>-->
<!--          </div>-->
<!--          <div class="font-bold">-->
<!--            Year to Date Expense-->
<!--            <div class="font-semibold">-->
<!--              {{computeTotalExpense | currency('')}}-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="h-2 bg-gray-300 overflow-hidden flex rounded mt-4 mb-4 text-xs w-full ">-->
<!--          <div :style="{'width':`${width}%`}" class="shadow-none text-center whitespace-nowrap text-white  justify-center bg-blue-500"></div>-->
<!--        </div>-->
<!--        <div>-->
<!--          <i class="fas fa-arrow-down text-red-600 text-lg"></i>-->
<!--          <span class="text-sm text-red-600 font-bold tracking-normal">1.15%</span>-->
<!--          <span class="text-gray-500 font-bold text-sm">since last week</span>-->
<!--        </div>-->
<!--      </div>-->
    </div>

    <div class="bg-indigo-400 h-1 rounded-full my-6"/>

    <div class="mb-6">
      <div class="bg-white px-4 py-4 w-full rounded shadow">
        <form>
          <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center  justify-between xl:justify-start">
            <span class="w-full sm:w-1/6 2xl:w-32">
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
        <nuxt-link to="/expense/add" class="btn  btn-indigo uppercase tracking-widest px-4" >Add Expense</nuxt-link>
      </div>


      <div class="overflow-x-auto shadow">
      <table class=" w-full bg-white rounded shadow ">
        <thead >
        <tr>
          <th v-for="header in tableHead" class="xl:px-6 px-1 py-3 border-b-2 border-gray-400 text-left leading-4 text-blue-800 tracking-wider">{{header}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="expense in paginateSearchResultArr" class=" even:bg-gray-100 hover:bg-gray-200">
          <td class="xl:px-6 px-1  py-4 border-b border-gray-500 ">
            <i class="fas fa-edit text-green-500 cursor-pointer hover:text-green-400 transform hover:scale-150 transition ease-in-out duration-300" @click="editExpense(expense.expenseId)"></i>
          </td>
          <td class="xl:px-6 px-1  py-4 border-b border-gray-500 text-sm">{{$moment(expense.date).format('MMM DD, yyyy')}}</td>
          <td class="xl:px-6 px-1  py-4 border-b border-gray-500 text-sm">{{expense.accountName}}</td>
          <td class="xl:px-6 px-1  py-4 border-b border-gray-500 text-sm">{{expense.categoryName}}</td>
          <td class="xl:px-6 px-1  py-4 border-b border-gray-500 text-sm">{{expense.type}}</td>
          <td class="xl:px-6 px-1  py-4 border-b border-gray-500 text-sm">$ {{expense.amount}}</td>
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
        <pagination :obj-arr="searchExpenseResp" @paginate="getPaginateResp" />
      </div>

<!--      build modal -->
      <div class="bg-black bg-opacity-50 absolute inset-0 z-40  justify-center items-center" :class="{'flex':showModal,'hidden':!showModal}">
        <div class="bg-gray-200 max-w-xl">
          <div class="flex items-center justify-between py-4">
            <h4 class="text-lg font-bold px-4">Category Breakdown</h4>
            <svg @click="showModal=false" class="h-5 px-4 cursor-pointer hover:text-red-600"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
            <div v-for="category in categoryBreakdownArr" class="flex justify-between px-4 gap-24 items-center">
              <div class="">
                <h2 class="text-lg font-semibold">{{category.categoryName}}</h2>
              </div>
              <div class="">
                <h2 class="text-lg font-semibold">{{category.amount | currency}}</h2>
              </div>
            </div>
            <div class="px-4 py-4">
              <button class="btn btn-danger" @click="showModal=false">Close</button>
            </div>
        </div>
      </div>
    </div>
    </div>

  </div>
</template>

<script>
import Datepicker from '~/components/datepicker'
import Login from '~/components/login'
import Add from '@/pages/expense/add'
import Pagination from '~/components/pagination'
import Vue2Filters from 'vue2-filters'
export default {
  components: { Pagination, Add, Login, Datepicker },
  middleware: 'auth',
  name: 'index',
  mixins: [Vue2Filters.mixin],
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
    paginateSearchResultArr: [],
    categoryBreakdownArr: [],
    showModal: false
  }),

  methods: {
    getPaginateResp(e){
      this.paginateSearchResultArr = e;
    },

    async searchExpense(){
      const currentDate = this.currentYear+'-'+this.currentMonth;
      this.expenseSearch.fromDate = this.$moment(currentDate,'yyyy-MMMM').startOf('month').format('yyyy-MM-DD');
      this.expenseSearch.toDate = this.$moment(currentDate,'yyyy-MMMM').endOf('month').format('yyyy-MM-DD');
      this.searchExpenseResp = await this.$axios.$post('/expense/search',this.expenseSearch);
      if(this.searchExpenseResp !== undefined){
        this.showHeaderMonth = this.currentMonth
        this.getCategoryBreakdown();
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

    getCategoryBreakdown(){
      let map = new Map();
      this.categoryBreakdownArr = [];
      this.searchExpenseResp.filter(c => {
        if(map.has(c.categoryName)){
          map.set(c.categoryName, map.get(c.categoryName) + c.amount)
        }else{
          map.set(c.categoryName,c.amount);
        }
      })
      const sortedCategoryMap =  new Map([...map.entries()].sort((a, b) => b[1] - a[1]));

      sortedCategoryMap.forEach((v,k) => {
        this.categoryBreakdownArr.push({categoryName:k, amount:v})
      });
      return sortedCategoryMap;
    }

  },

  created () {
    this.tableHead.push('');
    this.tableHead.push('Date');
    this.tableHead.push('Account');
    this.tableHead.push('Category');
    this.tableHead.push('Type');
    this.tableHead.push('Amount');
    this.tableHead.push('');

    this.getCurrentMonth();
    this.getCurrentYear();
    this.searchExpense();

  },

  computed: {
    getAllMonths(){
      return this.$moment.months();
    },
    computeTotalExpense(){
      let totalExpense = 0;
      this.searchExpenseResp.filter(r => {
        totalExpense = totalExpense + r.amount
      });
      return totalExpense;
    },
    computeMostUsedCategory(){
      const mapSort = this.getCategoryBreakdown();
      return {categoryName: mapSort.keys().next().value, amount: mapSort.values().next().value}
    },

  }
}
</script>

<style scoped>

</style>
