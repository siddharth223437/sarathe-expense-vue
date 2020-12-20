<template>
<div>
  <transition enter-active-class="transition transition-opacity-50"
              leave-active-class="transition transition-opacity-50"
              enter-class="opacity-0"
              leave-to-class="opacity-0">
    <div class="flex justify-center my-32 " v-if="errorMsg">
      <div class="bg-white py-4  w-full md:w-1/2 xl:w-1/3 shadow-lg border-l-4 border-red-500  text-gray-800 flex justify-start rounded-lg">
       <span class="md:text-lg text-sm font-semibold md:tracking-widest"><i class="fas fa-exclamation-triangle px-4 text-red-600"></i>{{errorMsg}} {{disableErrorMessage}}</span>
      </div>
    </div>
  </transition>
  <div class="flex justify-center my-32 flex-row">
    <div class="absolute z-10 ">
      <img class="rounded-full w-28 opacity-80 transform hover:scale-125 transition ease-in-out duration-500" src="~/assets/images/razi1.jpg" alt="razi1">
    </div>
    <div class="bg-white px-8 py-4 top-8 rounded-lg w-full md:w-1/2 xl:w-1/3 shadow-lg relative">
      <form @submit.prevent="onLogin">
        <div class="w-full flex flex-wrap mt-20">
          <label for="username" class="block mb-1 tracking-wide text-sm">Username</label>
          <input type="text" id="username" class=" form-text w-full" v-model="username">
        </div>
        <div class="w-full flex flex-wrap mt-4">
          <label for="password" class="block mb-1 tracking-wide text-sm">Password</label>
          <input type="password" id="password" class=" form-text w-full" v-model="password">
        </div>
        <div class="mt-8 mb-2 flex flex-col">
          <div>
            <input type="submit" class="btn  btn-indigo uppercase tracking-widest px-4" value="Login">
          </div>
          <div class="text-sm tracking-wide pt-2 px-1">
            <span> Are you one of sarathe's  ?</span> <a href="#" class="font-semibold text-red-500 hover:text-indigo-500 transition ease-in-out duration-500 ">Register</a>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
</template>

<script>
import header from '~/components/header'
import AuthUtil from '~/util/AuthUtil'

export default {
  data:()=>({
    username: '',
    password: '',
    errorMsg: ''
  }),
  methods: {
    async onLogin () {
      this.errorMsg = false;
      const token = btoa(this.username + ':' + this.password);
      console.log(token)
      const response = await this.$axios.$get('/login',{
        headers: {
          Authorization: 'Basic ' + token
        }
      }).catch(error => {
        const code = parseInt(error.response && error.response.status)
        if(code === 401){
          this.errorMsg = error.response.data;
        }
      });

      if(response !== undefined){
        sessionStorage.setItem('_token', token);
        sessionStorage.setItem('_user', this.username);
        this.$store.commit('user/setUsername', this.username);

        await this.$router.push('/expense')
      }

      // response.data.map(resp => {
      //   console.log(resp)
      // })
      // this.$router.push('/expense')
    }
  },
  computed: {
    disableErrorMessage(){
      setInterval(() => {
        this.errorMsg = ''
      }, 20000)
    }
  },
  created () {
    if(!AuthUtil.isUserLoggedIn()){
      this.$store.commit('user/setUsername', null);
    }
  }
}
</script>

<style scoped>

</style>
