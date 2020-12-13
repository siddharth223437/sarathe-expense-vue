<template>
  <div class="flex flex-col">
    <Login/>
  </div>
</template>

<script>
import Login from '../components/login';
import AuthUtil from '~/util/AuthUtil'
export default {
  // middleware: 'guest',
  components: {Login},
  data:()=>({

  }),
  created () {
    if(AuthUtil.isUserLoggedIn()){
      this.$router.push('/expense')
    }
  }
}
</script>

<style>

</style>
