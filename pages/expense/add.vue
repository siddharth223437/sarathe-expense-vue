<template>
  <div>

    <div class="flex justify-center mt-14 " v-if="isSuccess">
      <alert message="Expense saved to database" :success="true" :disable-alert-box="20000"  class="w-full"/>
    </div>
    <div class="flex justify-center mt-14" v-if="isError">
      <alert message="Error in saving expense" :danger="true" :disable-alert-box="20000"  class="w-full"/>
    </div>
  <div class="flex justify-center items-center mb-32 mt-14">
    <div class="bg-white px-8 py-4 rounded-lg w-full md:w-1/2 shadow-lg">
      <div class="py-4 mb-4 tracking-wide flex justify-center flex-wrap">
        <h4 class="font-bold text-2xl">{{computeHeaderAndButton}}</h4>
      </div>
      <form @submit.prevent="addUpdateExpense">
        <div class="w-full flex flex-wrap">
          <label  class="block mb-1">Expense Date</label>
          <datepicker class="w-full" @selectedDate="getSelectedDate" :set-date="this.expense.date"/>
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
          <input type="submit" :value="computeHeaderAndButton" class="btn btn-indigo">
        </div>

      </form>
    </div>

  </div>
  </div>

</template>

<script>
import Datepicker from '@/components/datepicker'
import Index from '@/pages/index'
import Select from '@/components/tw-dropdown'
import TwSelect from '@/components/tw-dropdown'
import TwDropdown from '@/components/tw-dropdown'
import Alert from '@/components/alert'
export default {
  components: { Alert, TwDropdown, TwSelect, Select, Index, Datepicker },
  middleware: 'auth',
  name: "add",
  props: {
    expenseToEdit: {
      type: Object,
      default: null
    }
  },
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
    allCategories: [],
    isError: false,
    isSuccess: false
  }),
  methods: {
    async addUpdateExpense(){
      this.isError = false;
      this.isSuccess = false;
      let response = await this.$axios.post('/expense',this.expense).catch(err => this.isError = true)
      if(response !== undefined){
        if(response.data.resp === 'success'){
          this.isSuccess = true;
        }else{
          this.isError = true;
        }
        this.resetForm();
      }
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
    resetForm(){
      this.expense.expenseId = null;
      this.expense.type = null;
      this.expense.amount = null;
      this.expense.categoryId = null;
      this.expense.accountId = null;
      this.expense.date = null;
      this.expense.notes = null;
    }
  },
  created () {
    this.getAllAccounts();
    this.getAllCategories();
  },
  computed: {
    computeHeaderAndButton(){
      if(this.expenseToEdit === null){
        return 'Add Expense';
      }else{
        return 'Update Expense';
      }
    }
  },
  watch: {
    expenseToEdit: {
      immediate: true,
      handler(newVal){
        if(newVal !== null){
          this.expense = newVal;
        }

      }
    }
  }
}
</script>

<style scoped>

</style>
