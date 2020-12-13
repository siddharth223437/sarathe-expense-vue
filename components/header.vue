<template>
  <header class="bg-gray-800 px-4">
    <div class="flex items-center justify-between text-white px-2  xl:px-32 " :class="{'py-2': userInfo == null}">
      <a class="font-bold text-2xl lg:text-4xl" href="#">
        SARATHE'S
      </a>
      <div class="py-3">
        <ul class="sm:inline-flex items-center  md:hidden">
          <li>
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
            <li><a class="px-4 hover:bg-white hover:text-black transition ease-in duration-500 hover:text-bold py-2 rounded uppercase tracking-wide" href="/">Home</a></li>
            <li><a class="px-4 hover:bg-white hover:text-black transition ease-in duration-500 hover:text-bold py-2 rounded uppercase tracking-wide" href="#">About</a></li>
            <li><a class="px-4 hover:bg-white hover:text-black transition ease-in duration-500 hover:text-bold py-2 rounded uppercase tracking-wide" href="#">Contact</a></li>
            <li><a class="px-4 hover:bg-white hover:text-black transition ease-in duration-500 hover:text-bold py-2 rounded uppercase tracking-wide" href="#">{{userInfo.username}}</a></li>
            <li class="px-4 relative" >
              <button  class="block z-10 relative h-10 w-10 rounded-full overflow-hidden focus:outline-none border-2 border-gray-400 focus:border-white" @click="showDropdown = !showDropdown">
<!--                <img src="~/assets/images/razi1.jpg" alt="razi1" class="h-full w-full object-cover">-->
                <img :src="userInfo.imageUrl" alt="user_profile_img" class="h-full w-full object-cover">
              </button>
              <button tabindex="-1" v-if="showDropdown" @click="showDropdown = false"  class="fixed outline-none inset-0 bg-transparent opacity-50 cursor-default h-full w-full"></button>
              <transition enter-class="opacity-0"
                          enter-active-class="transition transition-opacity-50"
                          leave-active-class="transition transition-opacity-50"
                          leave-class="opacity-0"
              >
                <div v-if="showDropdown" class="absolute right-6 bg-white rounded-lg py-2 w-64 mt-2 shadow-lg ">
                  <a href="#" class="block px-4 py-2 text-gray-800 transition ease-in duration-300 hover:bg-indigo-500 hover:text-white">Login</a>
                  <a href="#" class="block px-4 py-2 text-gray-800 transition ease-in duration-300 hover:bg-indigo-500 hover:text-white">Register</a>
                  <a href="#" class="block px-4 py-2 text-gray-800 transition ease-in duration-300 hover:bg-indigo-500 hover:text-white">About</a>
                  <a href="#" class="block px-4 py-2 text-gray-800 transition ease-in duration-300 hover:bg-indigo-500 hover:text-white" @click="logout">Logout</a>
                </div>
              </transition>
            </li>
          </ul>
      </div>
    </div>
    <div class="text-white" v-if="openMenu">
      <div class="flex">
        <div>
          <h1 class="py-2 px-2 font-bold underline text-red-200">Razi Sarathe</h1>
          <a href="#" class="block py-2 hover:bg-white hover:text-bold hover:text-black rounded px-2">Login</a>
          <a href="#" class="block py-2 hover:bg-white hover:text-bold hover:text-black rounded px-2" @click="logout">Logout</a>
        </div>
        <div class="ml-4">
          <h1 class="py-2 px-2 font-bold underline text-red-200">Expense</h1>
          <a href="#" class="block py-2 hover:bg-white hover:text-bold hover:text-black rounded px-2">Add</a>
          <a href="#" class="block py-2 hover:bg-white hover:text-bold hover:text-black rounded px-2">Register</a>
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
  }),
  methods: {
    logout(){
      AuthUtil.removeAuthToken();
      AuthUtil.removeUser();
      this.showDropdown = false;
      this.$store.commit('user/setUsername', 'logout');
      this.$router.push('/');
    },
    async getUserInfo(){
      let i = this.$store.getters['user/getUsername'];
      console.log('i is ' + i)
      if(i === 'logout') return null;
      if(!AuthUtil.isUserLoggedIn()) return null;
      let resp =  await this.$axios.$get('/user').catch(error => {
        const code = parseInt(error.response && error.response.status)
        if(code === 401){
          return null
        }
      })

      if(resp !== undefined){
        console.log(resp);
        return resp;
      }else{
        return null;
      }
    }
  },
  asyncComputed: {
    async userInfo(){
      return await this.getUserInfo();
    }
  },
  // created () {
  //   this.getUserInfo();
  // }
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
