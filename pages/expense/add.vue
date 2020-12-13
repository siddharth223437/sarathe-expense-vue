<template>
  <div>
    <div class="flex justify-center mt-14">
      <alert message="Success" :success="true" class="w-full"/>
    </div>
  <div class="flex justify-center items-center mb-32 mt-6 ">
    <div class="bg-white px-8 py-4 rounded-lg w-full md:w-1/2 shadow-lg">
      <div class="py-4 mb-4 tracking-wide flex justify-center flex-wrap">
        <h4 class="font-bold text-2xl">Add/Update Expense</h4>
      </div>
      <form @submit.prevent="addUpdateExpense">
        <div class="w-full flex flex-wrap">
          <label  class="block mb-1">Expense Date</label>
          <datepicker class="w-full" @selectedDate="getSelectedDate"/>
        </div>

        <div class="w-full mt-5 flex flex-wrap ">
          <label for="account" class="block mt-1 mb-1">Select Account</label>
          <select id="account" class="form-control bg-gray-100" v-model="expense.accountId">
            <option value="null" disabled hidden>Select Account</option>
            <option v-for="account in allAccounts" :value="account.accountId" :key="account.accountId">
              {{account.accountName}}
            </option>
          </select>
          <div>
            <nuxt-link to="/expense/account" class="text-xs px-1 text-red-700 tracking-wide hover:text-red-400 transition ease-in duration-200">Add new account</nuxt-link>
          </div>
        </div>

        <div class="w-full mt-4 flex flex-wrap ">
          <label for="category" class="block mt-1 mb-1">Select Category</label>
          <select id="category" class="form-control" v-model="expense.categoryId">
            <option value="null" disabled hidden>Select Category</option>
            <option v-for="category in allCategories" :value="category.categoryId" :key="category.categoryId">{{category.categoryName}}</option>
          </select>
          <div>
            <nuxt-link to="/expense/category" class="text-xs px-1 text-red-700 tracking-wide hover:text-red-400 transition ease-in duration-200">Add new category</nuxt-link>
          </div>
        </div>

        <div class="w-full flex flex-wrap mt-5">
          <label for="type" class="block mb-1">Enter type (ex: Trader Joe's)</label>
          <input type="text" id="type" class="form-control" v-model="expense.type">
        </div>

        <div class="w-full flex flex-wrap mt-5">
          <label for="amount" class="block mb-1">Enter Expense Amount</label>
          <input type="text" id="amount" class="form-control" v-model="expense.amount">
        </div>

        <div class="mt-5">
          <label></label>
          <input type="submit" value="Add/Update Expense" class="btn btn-indigo">
        </div>

      </form>
    </div>

  </div>
  </div>

</template>

<script>
import Datepicker from '~/components/datepicker'
import Index from '~/pages/index'
import Select from '~/components/tw-dropdown'
import TwSelect from '~/components/tw-dropdown'
import TwDropdown from '~/components/tw-dropdown'
import Alert from '~/components/alert'
export default {
  components: { Alert, TwDropdown, TwSelect, Select, Index, Datepicker },
  middleware: 'auth',
  name: "add",
  data:()=>({
    isOpen: false,
    expense: {
      expenseId: null,
      date: null,
      accountId: null,
      categoryId: null,
      type: null,
      amount: null,
      notes: null
    },
    allAccounts: [],
    allCategories: []
  }),
  methods: {
    async addUpdateExpense(){
      let response = await this.$axios.post('/expense',this.expense)
      console.log(response.data.resp)
    },
    getSelectedDate(e){
      this.expense.date = e;
    },
    async getAllAccounts(){
      let response = await this.$axios.get("/account");
      if(response !== undefined){
        this.allAccounts = response.data;
      }
    },
    async getAllCategories(){
      let resp = await this.$axios.$get('/category');
      if(resp !== undefined){
        this.allCategories = resp;
      }
    },
  },
  created () {
    this.getAllAccounts();
    this.getAllCategories();
  }
}
</script>

<style scoped>

</style>
