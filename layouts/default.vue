<template>
  <div>
    <div>
      <Header />
    </div>
    <div class="px-4 xl:px-40 ">
      <Nuxt />
    </div>
<!--    <div class="flex">-->
<!--      <div :class="{'hidden':isSidebarHidden, 'md:block':true }">-->
<!--        <Sidebar :sideBarArr="sideBarArr"/>-->
<!--      </div>-->
<!--      <div class="px-4 md:px-36">-->
<!--        <Nuxt />-->
<!--      </div>-->
<!--    </div>-->

  </div>
</template>

<script>
import Header from '../components/header';
export default {
  name: 'default.vue',
  components: { Header },
  data:() => ({
    sideBarArr: [],
    isSidebarHidden: true
  }),
  created () {
    this.sideBarArr = [
      {value: 'Home', show: true},
      {value: 'Expense', show: true},
      {value: 'Login', show: true},
      {value: 'Register', show: true}
    ]
  }
}
</script>

<style scoped>

</style>
