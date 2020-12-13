<template>
  <div>
    <div class="flex flex-col justify-center items-center my-32">
      <div class="bg-white px-8 py-4 rounded-lg w-full md:w-1/2 shadow-lg">
        <div class="py-4 mb-4 tracking-wide flex justify-center flex-wrap">
          <h4 class="font-bold text-2xl">{{computeSubmitButton}}</h4>
        </div>
        <form @submit.prevent="addUpdateCategory">
          <div class="w-full flex flex-wrap mt-5">
            <label for="categoryName" class="block mb-1">Enter Category Name</label>
            <input type="text" id="categoryName" class="form-control" v-model="categoryName">
          </div>
          <div class="mt-5">
            <button type="submit" class="btn btn-indigo transition ease-in duration-500">{{computeSubmitButton}}</button>
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
          <tr v-for="category in allCategories" :key="category.categoryId">
            <td class="xl:px-6 px-1  py-4 border-b border-gray-500 text-sm uppercase">{{category.categoryName}}</td>
            <td class="xl:px-6 px-1  py-4 border-b border-gray-500 ">
              <i class="fas fa-edit text-green-500 cursor-pointer hover:text-green-400 transform hover:scale-150 transition ease-in-out duration-300" @click="editCategory(category.categoryId)"></i>
            </td>
            <td class="xl:px-6 px-1  py-4 border-b border-gray-500 ">
              <i class="fas fa-times text-red-500 cursor-pointer hover:text-red-400 transform hover:scale-150 transition ease-out duration-300" @click="deleteCategory(category.categoryId)"></i>
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
  name: "category",
  data:()=>({
    tableHead: [],
    categoryName: null,
    allCategories: [],
    deleteMessage: null,
    isUpdate: false,
    categoryId: null
  }),
  methods:{
    async addUpdateCategory(){
      const obj = {
        categoryId: this.categoryId,
        categoryName: this.categoryName
      }
      let resp = await this.$axios.post('/category',obj);

      if(resp !== undefined){
        if(resp.data.resp === 'success'){
          await this.getAllCategories();
        }
      }
    },
    async getAllCategories(){
      let resp = await this.$axios.$get('/category');
      if(resp !== undefined){
        this.allCategories = resp;
        this.resetFrm();
      }
    },

    editCategory(id){
      this.allCategories.filter(c => {
        if(c.categoryId === id){
          this.categoryName = c.categoryName;
          this.categoryId = id;
          this.isUpdate = true;
        }
      })
      return null;
    },

    async deleteCategory(categoryId){
      let resp = await this.$axios.$delete(`/category/${categoryId}`);
      if(resp !== undefined){
        if(resp.resp === 'error'){
          this.deleteMessage = 'Error in deleting category !!'
        }else{
          await  this.getAllCategories();
        }
      }
    },

    resetFrm(){
      this.categoryId = null;
      this.categoryName = null;
      this.isUpdate = false;
    }
  },
  created () {
    this.tableHead.push('Name');
    this.tableHead.push('');
    this.tableHead.push('');
    this.getAllCategories();
  },
  computed:{
    computeSubmitButton(){
      if(this.isUpdate){
        return 'Update Category';
      }else{
        return 'Add Category';
      }
    }
  }
}
</script>

<style scoped>

</style>
