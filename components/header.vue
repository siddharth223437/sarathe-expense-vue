<template>
  <header class="bg-gray-800 px-4">
    <div class="flex items-center justify-between text-white px-2  xl:px-32 " :class="{'py-2': userInfo == null}">
      <a class="font-bold text-2xl lg:text-4xl animate-wiggle hover:animate-none" href="#">
        SARATHE'S
      </a>
      <div class="py-3">
        <div v-if="computeIfUserLoggedIn">
          <ul class="sm:inline-flex items-center  md:hidden">
            <li v-if="computeIfUserLoggedIn">
              <button class="block focus:outline-none text-gray-400 hover:text-white" @click="openMenu = !openMenu">
                <svg v-if="!openMenu" class="h-6 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">-->
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />-->
                </svg>
                <svg v-if="openMenu" class="h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </li>
          </ul>

            <ul class="md:inline-flex items-center  hidden" v-if="userInfo != null">
              <li><nuxt-link to="/expense" class="px-4 hover:bg-white hover:text-black transition ease-in duration-500 hover:text-bold py-2 rounded uppercase tracking-wide" >Home</nuxt-link></li>
             <div class="relative">
                <li>
                  <button @mouseover="expenseMenu = true" :class="{'bg-white text-black': expenseMenu}"  class="px-4 focus:outline-none  hover:bg-white hover:text-black transition ease-in duration-500 hover:text-bold py-2 rounded uppercase tracking-wide" >
                    Expense
                  </button>
                </li>
               <button @click="expenseMenu = false" v-if="expenseMenu" class="fixed inset-0 w-full h-full  overflow-hidden opacity-30 focus:outline-none"></button>
               <transition enter-class="opacity-0"
                           enter-active-class="transition transition-opacity-50"
                           leave-active-class="transition transition-opacity-50"
                           leave-class="opacity-0"
               >
                 <div @mouseleave="expenseMenu = false"  class="absolute z-30 w-56 flex flex-col top-12 right-0  shadow-lg rounded bg-white py-2" v-if="expenseMenu">
                   <nuxt-link v-for="(expense,index) in expenseHeaderArr" :key="index"  :to="expense.link" class="px-3 text-gray-800 py-2 hover:bg-indigo-500 hover:text-white">{{expense.label}}</nuxt-link>
                   <a @click.prevent="initiatePlaidFlow" class="px-3 text-gray-800 py-2 hover:bg-indigo-500 hover:text-white cursor-pointer">Link Account via Plaid</a>
                 </div>
               </transition>
             </div>

              <li><a class="px-4 hover:bg-white hover:text-black transition ease-in duration-500 hover:text-bold py-2 rounded uppercase tracking-wide" href="#">{{userInfo.username}}</a></li>
              <li class="px-4 relative" >
                <button  class="block z-10 relative h-10 w-10 rounded-full overflow-hidden focus:outline-none border-2 border-gray-400 focus:border-white" @click="showDropdown = !showDropdown">
                  <img :src="userInfo.imageUrl" alt="user_profile_img" class="h-full w-full object-cover">
                </button>
                <button tabindex="-1" v-if="showDropdown" @click="showDropdown = false"  class="fixed outline-none inset-0 bg-transparent opacity-50 cursor-default h-full w-full"></button>
                <transition enter-class="opacity-0"
                            enter-active-class="transition transition-opacity-50"
                            leave-active-class="transition transition-opacity-50"
                            leave-class="opacity-0"
                >
                  <div v-if="showDropdown" class="absolute right-6 bg-white rounded-lg py-2 w-64 mt-2 shadow-lg ">
                    <a href="#" class="block px-4 py-2 text-gray-800 transition ease-in duration-300 hover:bg-indigo-500 hover:text-white">Profile</a>
                    <a class="block px-4 py-2 cursor-pointer text-gray-800 transition ease-in duration-300 hover:bg-indigo-500 hover:text-white " @click="logout">Logout</a>
                  </div>
                </transition>
              </li>
            </ul>
        </div>
      </div>
    </div>
    <div class="text-white md:hidden" v-if="openMenu">
      <div class="flex">
        <div>
          <h1 class="py-2 px-2 font-bold underline text-red-200">{{userInfo.username}}</h1>
          <button v-for="userHead in userHeaderArr" @click="routeAndCloseMenu(userHead)" class="block py-2 hover:bg-white hover:text-bold hover:text-black rounded px-2">{{userHead.label}}</button>
<!--          <a href="#" class="block py-2 hover:bg-white hover:text-bold hover:text-black rounded px-2">Profile</a>-->
          <button class="block py-2 hover:bg-white hover:text-bold hover:text-black rounded px-2" @click="logout">Logout</button>
        </div>
        <div class="ml-4">
          <h1 class="py-2 px-2 font-bold underline text-red-200">Manage Expenses</h1>
            <button v-for="(expense,index) in expenseHeaderArr" :key="index" @click="routeAndCloseMenu(expense)" class="block py-2 hover:bg-white hover:text-bold hover:text-black rounded px-2">{{expense.label}}</button>
<!--            <nuxt-link to="/expense/category" class="block py-2 hover:bg-white hover:text-bold hover:text-black rounded px-2">Add Category</nuxt-link>-->
<!--            <nuxt-link to="/expense/account" class="block py-2 hover:bg-white hover:text-bold hover:text-black rounded px-2">Add Account</nuxt-link>-->
        </div>
      </div>

<!--      <div>-->

<!--        <a href="#" class="block py-2 hover:bg-white hover:text-bold hover:text-black rounded px-2">Login</a>-->
<!--        <a href="#" class="block py-2 hover:bg-white hover:text-bold hover:text-black rounded px-2">Register</a>-->
<!--      </div>-->
<!--      <div>-->
<!--        <a href="#" class="block py-2 hover:bg-white hover:text-bold hover:text-black rounded px-2">About</a>-->
<!--        <a href="#" class="block py-2 hover:bg-white hover:text-bold hover:text-black rounded px-2">Contact</a>-->
<!--      </div>-->
    </div>
  </header>
            <!--  <div>-->
<!--  <header class="bg-gray-800 flex text-white px-4 md:px-32 py-2 items-center justify-between">-->
<!--    <div class="mb-2">-->
<!--      <h1 class="text-4xl">-->
<!--        Sarathe's-->
<!--      </h1>-->
<!--    </div>-->
<!--    <div class="md:flex space-x-8 ">-->
<!--      <div class="w-8 md:hidden">-->
<!--        <a href="#">-->
<!--        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">-->
<!--          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />-->
<!--        </svg></a>-->
<!--      </div>-->
<!--      <div>-->
<!--        <a class="border-b-4 border-gray-800 hover:border-white" href="">Home</a>-->
<!--      </div>-->
<!--      <div>-->
<!--        <a href="">Login</a>-->
<!--      </div>-->
<!--      <div>-->
<!--        <a href="">Register</a>-->
<!--      </div>-->
<!--      <div class="relative">-->
<!--        <button class="block h-10 w-10 rounded-full overflow-hidden focus:outline-none border-2 border-gray-400 focus:border-white" @click="showDropdown = !showDropdown">-->
<!--          <img src="~/assets/images/razi1.jpg" alt="razi1" class="h-full w-full object-cover">-->
<!--        </button>-->
<!--        <div v-if="showDropdown" class="absolute right-0 bg-white rounded-lg py-2 w-64 mt-2 shadow-lg">-->
<!--          <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">Login</a>-->
<!--          <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">Register</a>-->
<!--          <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">About</a>-->
<!--          <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">Contact</a>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </header>-->
<!--&lt;!&ndash;    <div class="bg-red-200 w-2">&ndash;&gt;-->
<!--&lt;!&ndash;      <Sidebar/>&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--  </div>-->
</template>

<script>
import Sidebar from '~/components/sidebar'
import AuthUtil from '~/util/AuthUtil'
import AsyncComputed from 'vue-async-computed'
import Vue from 'vue';
Vue.use(AsyncComputed);
export default {

  name: 'header.vue',
  components: { Sidebar },
  data:() => ({
    showDropdown: false,
    openMenu: false,
    expenseMenu: false,
    expenseHeaderArr: [],
    userHeaderArr: [],
  }),
  methods: {
    logout(){
      this.openMenu = false;
      AuthUtil.removeAuthToken();
      AuthUtil.removeUser();
      this.showDropdown = false;
      this.$store.commit('user/setUsername', 'logout');
      this.$router.push('/');
    },
    async getUserInfo(){
      let i = this.$store.getters['user/getUsername'];
      if(i === 'logout') return null;
      if(!AuthUtil.isUserLoggedIn()) return null;
      let resp =  await this.$axios.$get('/user').catch(error => {
        const code = parseInt(error.response && error.response.status)
        if(code === 401){
          return null
        }
      })

      if(resp !== undefined){
        return resp;
      }else{
        return null;
      }
    },
    routeAndCloseMenu(obj){
      this.openMenu = false
      this.$router.push(obj.link)
    },
    async getPlaidLinkToken(){
      const obj = {
        appName: 'Sarathe-expense',
        products: ['transactions']
      }
      let response = await this.$axios.$post('/plaid/link/token',obj);
      if(response) {
        let resp = response['resp'];
        this.linkToken =  resp.link_token;
      }
    },

    async initiatePlaidFlow(){
      await this.getPlaidLinkToken();
      let handler = await Plaid.create({
        token: this.linkToken,
        env: 'development',
        onLoad: function() {
          // Optional, called when Link loads
        },
        async onSuccess(public_token, metadata) {
          const accounts = []
          metadata.accounts.filter(a => {
            accounts.push({name:a.name, type:a.type,subtype:a.subtype});
          })

          const credentials = {
            publicLinkToken: public_token
          }

          const institution = {
            plaidInstitutionId: metadata.institution.institution_id,
            institutionName: metadata.institution.name
          }
          const plaid = {
            credentials,
            institution,
            accounts
          }
          console.log(plaid)
          // Send the public_token to your app server.
          // The metadata object contains info about the institution the
          // user selected and the account ID or IDs, if the
          // Select Account view is enabled.

          $.ajax({
            url: 'http://localhost:5000/expense/api/v1/plaid/account/add',
            type: 'post',
            data: {
              plaid: JSON.stringify(plaid)
            },
            headers: {
              authorization: 'Basic '+AuthUtil.getAuthToken()
            },
            dataType:'json',
            success: function (data) {
              console.info(data);
            }
          })
           // $.post('http://localhost:5000/expense/api/v1/plaid/account/add', plaid,{
           //   headers: {
           //     Authorization: AuthUtil.getAuthToken()
           //   }
           // });
        },
      })
      handler.open();
    }

  },
  asyncComputed: {
    async userInfo(){
      return await this.getUserInfo();
    },
  },
  computed: {
    computeIfUserLoggedIn(){
      let i = this.$store.getters['user/getUsername'];
      // above line is required
      if(AuthUtil.isUserLoggedIn()){
        return true;
      }else{
        return false;
      }
    }
  },
  created () {
    this.expenseHeaderArr.push({link:'/expense/add',label:'Add Expense'});
    this.expenseHeaderArr.push({link:'/expense/category',label:'Add Category'});
    this.expenseHeaderArr.push({link:'/expense/account',label:'Add Account'});


    this.userHeaderArr.push({link:'/expense',label:'Home'});
    this.userHeaderArr.push({link:'/expense',label:'Profile'});
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
