<template>
  <div class="px-16 float-left bg-white shadow rounded min-h-screen ">
    <div class="my-4 flex flex-col">
      <h2 class="my-4 mx-4 text-2xl uppercase  tracking-widest">My Menu</h2>
      <div class="py-2 flex flex-col">
        <div v-for="item in computeSideBar" v-if="item.show" class="bg-gray-200 mt-4 hover:bg-gray-800 hover:text-white font-medium tracking-widest uppercase py-2 rounded  flex justify-around transition duration-500 ease-out transform hover:-translate-y-1 hover:scale-110">
          <a href="#">{{item.value}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sidebar',
  props: {
    sideBarArr: Array,
  },
  data:() => ({
  }),

  computed: {
    computeSideBar(){
      const arr = [];
       this.sideBarArr.filter(f => {
        if(f.value.length > 15){
          arr.push({value:f.substring(0,12) + '...',show:f.show});
        }else{
          arr.push(f)
        }
      })
      return arr;
    }
  }
}
</script>

<style scoped>

</style>
