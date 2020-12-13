<template>
  <div>
    <div class="flex flex-col justify-center items-center my-32">
      <div class="bg-white px-8 py-4 rounded-lg w-full md:w-1/2 shadow-lg">
        <div class="py-4 mb-4 tracking-wide flex justify-center flex-wrap">
          <h4 class="font-bold text-2xl">{{computeSubmitButton}}</h4>
        </div>
        <form @submit.prevent="addUpdateAccount">
          <div class="w-full flex flex-wrap mt-5">
            <label for="accountName" class="block mb-1">Enter Account Name</label>
            <input type="text" id="accountName" class="form-control" v-model="accountName">
          </div>
          <div class="mt-5">
            <label></label>
            <button type="submit" class="btn btn-indigo">{{computeSubmitButton}}</button>
            <transition enter-active-class="transition transition-opacity-50"
                        leave-active-class="transition transition-opacity-50"
                        enter-class="opacity-0"
                        leave-to-class="opacity-0">
              <button v-if="isUpdate" type="button" class="btn btn-danger transition ease-in duration-500" @click="resetFrm">Cancel</button>
            </transition>
          </div>
        </form>

        <table class="bg-white px-8 py-4 rounded-lg w-full table-auto mt-14">
          <thead >
          <tr>
            <th v-for="header in tableHead" class="xl:px-6 px-1 py-3 border-b-2 border-gray-400 text-left leading-4 text-blue-800 tracking-wider">{{header}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="account in allAccounts">
            <td class="xl:px-6 px-1  py-4 border-b border-gray-500 text-sm">{{account.accountName}}</td>
            <td class="xl:px-6 px-1  py-4 border-b border-gray-500 ">
              <i class="fas fa-edit text-green-500 cursor-pointer hover:text-green-400 transform hover:scale-150 transition ease-in-out duration-300" @click="editAccount(account.accountId)"></i>
            </td>
            <td class="xl:px-6 px-1  py-4 border-b border-gray-500 ">
              <i class="fas fa-times text-red-500 cursor-pointer hover:text-red-400 transform hover:scale-150 transition ease-out duration-300" @click="deleteAccount(account.accountId)"></i>
            </td>
          </tr>
          <tr>
            <td class="px-6 py-6"></td>
          </tr>
          </tbody>
        </table>

      </div>

    </div>



  </div>
</template>

<script>
export default {
  name: "account",
  data:()=>({
    tableHead: [],
    allAccounts: [],
    accountId: null,
    accountName: null,
    isUpdate: false
  }),
  methods: {

    async addUpdateAccount(){
      let obj = {
        accountId: this.accountId,
        accountName: this.accountName
      }
      let response = await this.$axios.post('/account',obj)
      await this.getAllAccounts();
      this.resetFrm();

    },

    async getAllAccounts(){
      let response = await this.$axios.get("/account");
      if(response !== undefined){
        this.allAccounts = response.data;
        console.log(this.allAccounts)
      }
    },

    editAccount(id){
      this.allAccounts.filter(a => {
        if(a.accountId === id){
          this.accountId = id;
          this.accountName = a.accountName;
          this.isUpdate = true;
        }
      })
    },

    async deleteAccount(id){
      let resp = await this.$axios.delete(`/account/${id}`).catch(error => alert(error));
     if(resp !== undefined){
       await this.getAllAccounts();
     }
    },
    resetFrm(){
      this.accountId = null;
      this.accountName = null;
      this.isUpdate = false;
    },

  },

  computed:{
    computeSubmitButton(){
      if(this.isUpdate){
        return 'Update Account';
      }else{
        return 'Add Account';
      }
    }
  },

  mounted () {
    this.tableHead.push('Name');
    this.tableHead.push('');
    this.tableHead.push('');
    this.getAllAccounts();
  }
}
</script>

<style scoped>

</style>
