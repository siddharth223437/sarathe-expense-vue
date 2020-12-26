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
    <div class="flex flex-col xl:flex-row item-start xl:items-center xl:space-x-12 xl:space-y-0 space-y-4 mt-6">
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
            <div class="font-semibold flex items-end space-x-2">
              {{computeMostUsedCategory.categoryName}} <button @click="showModal=true" class="text-xs text-blue-500 hover:text-blue-300 focus:outline-none pl-1">see breakdown</button>
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

    </div>

    <div class="bg-indigo-400 h-1 rounded-full my-6"/>

    <div class="mb-6">
      <div class="bg-white px-4 py-4 w-full rounded shadow">
        <form>
          <div class="md:flex md:space-x-16 md:items-end">

            <div>
              <label class="block text-lg pl-1 pb-2 tracking-wide">Select Month</label>
              <div class="flex relative justify-between">
                  <select v-model="currentMonth" id="selectMonth" class="w-full py-1 pl-2 pr-16 focus:outline-none shadow focus:ring-1 ring-gray-400 tracking-wide">
                    <option v-for="month in getAllMonths" :key="month" :value="month">
                      {{month}}
                    </option>
                  </select>
                <div class="absolute right-2 flex flex-col">
                  <i class="fas fa-chevron-up opacity-60"></i>
                  <i class="fas fa-chevron-down opacity-60"></i>
                </div>
              </div>
            </div>

            <div>
              <label class="block text-lg pl-1 pb-2 tracking-wide">Select year</label>
              <div class="flex relative justify-between">
                <select v-model="currentYear" id="selectYear" class="w-full py-1 pl-2 pr-16 focus:outline-none shadow focus:ring-1 ring-gray-400 tracking-wide">
                  <option>2019</option>
                  <option>2020</option>
                  <option>2021</option>
                </select>
                <div class="absolute right-2 flex flex-col">
                  <i class="fas fa-chevron-up opacity-60"></i>
                  <i class="fas fa-chevron-down opacity-60"></i>
                </div>
              </div>
            </div>

            <div>
              <label class="block text-lg pl-1 pb-2 tracking-wide">Select Account</label>
              <div class="flex relative justify-between">
                <select v-model="selectedAccount" id="selectAccount" class="w-full py-1 pl-2 focus:outline-none shadow focus:ring-1 ring-gray-400 tracking-wide ">
                  <option v-for="account in plaidAllAccountsResp" :key="account.plaidAccountId" :value="account.plaidAccountId">
                    {{account.officialName}}
                  </option>
                </select>
                <div class="absolute right-2 flex flex-col">
                  <i class="fas fa-chevron-up opacity-60"></i>
                  <i class="fas fa-chevron-down opacity-60"></i>
                </div>
              </div>
            </div>

          </div>
          <div class="mt-4">
            <button class="btn btn-success" @click.prevent="searchExpense">Search</button>
          </div>

        </form>

      </div>
    </div>

    <div>

      <div class="mb-6 bg-white pb-8 pt-2 ">
        <div class="mx-2 mb-2">
          <label class="text-lg tracking-wide">Select Category to filter transaction</label>
        </div>
        <div class="flex flex-wrap">
          <div @click="buildTransactionBasedOnCategory(category)" v-for="category in allDistinctCategoryArr"
                class="text-xs  mx-2 my-1 bg-indigo-300   hover:bg-indigo-500 text-white tracking-tight px-2 py-2 rounded-full uppercase shadow-lg cursor-pointer"
              :class="{'bg-indigo-500':isCategoryClicked(category)}"
          >
            {{category}}
          </div>
        </div>
      </div>

      <div class="overflow-x-auto shadow">
      <table class=" w-full bg-white rounded shadow ">
        <thead >
        <tr>
          <th v-for="header in tableHead"
              class="xl:px-6 px-1 py-3 border-b-2 border-gray-400 text-left leading-4 text-blue-800 tracking-wider">
            <div class="flex items-center space-x-2 ">
              <div @click="sortByCategory(header.key,true)" class="cursor-pointer">
                {{header.label}}
              </div>
              <div>
                <div class="flex flex-col cursor-pointer" @click="sortByCategory(header.key,true)">
                  <i class="fas fa-chevron-up opacity-60 text-xs m-0 p-0"></i>
                  <i class="fas fa-chevron-down opacity-60 text-xs m-0 p-0"></i>
                </div>
              </div>
            </div>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="expense in paginateSearchResultArr" class=" even:bg-gray-100 hover:bg-gray-200">
          <td class="xl:px-6 px-1  py-4 border-b border-gray-500 text-sm">{{$moment(expense.date).format('MMM DD, yyyy')}}</td>
          <td class="xl:px-6 px-1  py-4 border-b border-gray-500 text-sm">{{expense.categoryName}}</td>
          <td class="xl:px-6 px-1  py-4 border-b border-gray-500 text-sm">{{expense.type}}</td>
          <td class="xl:px-6 px-1  py-4 border-b border-gray-500 text-sm">$ {{expense.amount}}</td>
        </tr>
        <tr>
          <td class="px-6 py-6"></td>
        </tr>
        </tbody>
      </table>
      </div>

      <div class="py-4 flex justify-end">
        <pagination :obj-arr="computedTransactions" @paginate="getPaginateResp" :max-rows="maxPageResults"/>
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
            <div v-for="category in categoryBreakdownArr" class="flex justify-between px-4 space-x-24 items-center">
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
import Alert from '@/components/alert'
import List from '@/components/list'
export default {
  components: { List, Alert, Pagination, Add, Login, Datepicker },
  middleware: 'auth',
  name: 'index',
  mixins: [Vue2Filters.mixin],
  data:()=>({
    width: '60',
    tableHead: [],
    tableRow: [],
    selectedAccount: null,
    currentMonth: null,
    currentYear: null,
    expenseSearch: {
      fromDate: null,
      toDate: null,
      plaidAccountId: null
    },
    searchExpenseResp: [],
    computedTransactions:[],
    expenseToEdit: null,
    showMainPage: true,
    showHeaderMonth: null,
    paginateSearchResultArr: [],
    categoryBreakdownArr: [],
    showModal: false,
    plaidAllAccountsResp: [],
    allDistinctCategoryArr: [],
    toggleCategoryArr: [],
    maxPageResults: 10,
    desc: false
  }),

  methods: {
    getPaginateResp(e){
      this.paginateSearchResultArr = e;
    },

    async searchExpense(){
      const currentDate = this.currentYear+'-'+this.currentMonth;
      this.expenseSearch.fromDate = this.$moment(currentDate,'yyyy-MMMM').startOf('month').format('yyyy-MM-DD');
      this.expenseSearch.toDate = this.$moment(currentDate,'yyyy-MMMM').endOf('month').format('yyyy-MM-DD');
      this.expenseSearch.plaidAccountId = this.selectedAccount;
      let resp = await this.$axios.$post('/expense/search',this.expenseSearch);
      if(resp !== undefined){
        this.searchExpenseResp = [];
        this.allDistinctCategoryArr = [];
        this.toggleCategoryArr = []
        resp.filter(r => {
          if(r.expenseSearch.plaidAccountId === this.selectedAccount){
            this.searchExpenseResp.push(r);
          }
        });
        let mySet = new Set();
        this.searchExpenseResp.filter(r => mySet.add(r.categoryName))
        this.allDistinctCategoryArr = Array.from(mySet);
        //build computed/manipulate array, searchExpenseResp is the original array, for computed array remove transfer category

        this.computedTransactions = this.searchExpenseResp.filter(r => r.categoryName !== 'Transfer');
        this.toggleCategoryArr = this.allDistinctCategoryArr.filter(a => a !== 'Transfer')

        this.sortByCategory('date',false);
        this.showHeaderMonth = this.currentMonth
        // this.getCategoryBreakdown();

      }
    },
    // buildTransactionResp(){
    //   // this.computedTransactions = [];
    //   this.toggleCategoryArr.filter(c => {
    //     this.searchExpenseResp.filter(e => {
    //       if(c === e.categoryName){
    //         this.computedTransactions.push(e)
    //       }
    //     })
    //   })
    //   // return  this.computedTransactions;
    // },
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

    getCategoryBreakdown(){
      let map = new Map();
      this.categoryBreakdownArr = [];
      this.computedTransactions.filter(c => {
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
    },

    async getAllPlaidAccounts(){
      let resp = await this.$axios.$get('/plaid/account');
      if(resp){
        this.plaidAllAccountsResp = resp;
        if(this.plaidAllAccountsResp.length > 0){
          this.selectedAccount = this.plaidAllAccountsResp[0].plaidAccountId;
          await this.searchExpense();
        }
      }
    },

    buildTransactionBasedOnCategory(category){
      //determine weather to add or remove
      let isCategoryInArr = this.toggleCategoryArr.find(c => c === category);
      if(!isCategoryInArr){
        this.toggleCategoryArr.push(category)
        this.addRemoveCategoryInComputedArr(category,'add')
      }else{
        //find index of category in toggleCategoryArr
        const index = this.toggleCategoryArr.indexOf(category);
        this.toggleCategoryArr.splice(index,1)
        this.addRemoveCategoryInComputedArr(category,'remove');
      }
    },

    addRemoveCategoryInComputedArr(category, type){
      if(type === 'add'){
        this.searchExpenseResp.forEach(o => {
          if(o.categoryName === category){
            this.computedTransactions.push(o)
          }
        })
      }
      if(type === 'remove'){
        this.searchExpenseResp.forEach(o => {
          if(o.categoryName === category){
            const index = this.computedTransactions.indexOf(o);
            this.computedTransactions.splice(index,1)
          }
        })
      }
      this.sortByCategory('date',false);
    },

    isCategoryClicked(category){
      return this.toggleCategoryArr.find(c => c === category)
    },

    sortByCategory(category, toggle){
      this.computedTransactions.sort((a,b) => {
        let first = a[category];
        let second = b[category];
        if(first > second) return -1;
        if(first < second) return 1;
        return 0;
      });
      if(toggle) {
        if (this.desc) this.computedTransactions.reverse();
        this.desc = !this.desc;
      }
    },

    // sortByDate(){
    //   this.computedTransactions.sort((a,b) => {
    //     let first = a['date'];
    //     let second = b['date'];
    //     if(first < second) return -1;
    //     if(first > second) return 1;
    //     return 0;
    //   });
    //   // if(this.desc) this.computedTransactions.reverse();
    //   this.desc = !this.desc;
    // }



  },

  created () {
    // this.tableHead.push('');
    this.tableHead.push({key:'date',label:'Date'});
    // this.tableHead.push('Account');
    this.tableHead.push({key:'categoryName',label:'Category'});
    this.tableHead.push({key:'type',label:'Description'});
    this.tableHead.push({key:'amount',label:'Amount'});
    // this.tableHead.push('');

    this.getAllPlaidAccounts();
    this.getCurrentMonth();
    this.getCurrentYear();

  },

  computed: {
    getAllMonths(){
      return this.$moment.months();
    },
    computeTotalExpense(){
      let totalExpense = 0;
      this.computedTransactions.filter(r => {
        totalExpense = totalExpense + r.amount
      });
      return totalExpense;
    },
    computeMostUsedCategory(){
      const mapSort = this.getCategoryBreakdown();
      return {categoryName: mapSort.keys().next().value, amount: mapSort.values().next().value}
    },

  },
}
</script>

<style scoped>

</style>
