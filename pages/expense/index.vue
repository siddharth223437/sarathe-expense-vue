<template>
  <div class="my-12">
    <div class="flex flex-col xl:flex-row item-start xl:items-center justify-between xl:space-y-0 space-y-4">
      <div class="bg-white py-6 px-6 rounded-lg xl:w-1/3 shadow">
        <div class=" flex rounded-lg justify-start space-x-4 items-start">
          <div class="bg-yellow-100 px-5 py-3 rounded-lg">
            <i class="fas fa-dollar-sign text-yellow-400 text-3xl"></i>
          </div>
          <div class="font-bold">
            December Expense
            <div class="font-semibold">
              1,642
            </div>
          </div>
        </div>
        <div class="h-2 bg-gray-300 overflow-hidden flex rounded mt-4 mb-4 text-xs w-full ">
          <div :style="{'width':`${width}%`}" class="shadow-none text-center whitespace-nowrap text-white  justify-center bg-yellow-500"></div>
        </div>
        <div>
          <i class="fas fa-arrow-down text-red-600 text-lg"></i>
          <span class="text-sm text-red-600 font-bold tracking-normal">1.15%</span>
          <span class="text-gray-500 font-bold text-sm">since last month</span>
        </div>
      </div>

      <div class="bg-white  py-6 px-6 rounded-lg xl:w-1/3 shadow">
        <div class=" flex rounded-lg justify-start space-x-4 items-start">
          <div class="bg-blue-100 px-4 py-3 rounded-lg">
            <i class="fas fa-comments-dollar text-blue-400 text-3xl"></i>
          </div>
          <div class="font-bold">
            December Expense
            <div class="font-semibold">
              1,642
            </div>
          </div>
        </div>
        <div class="h-2 bg-gray-300 overflow-hidden flex rounded mt-4 mb-4 text-xs w-full ">
          <div :style="{'width':`${width}%`}" class="shadow-none text-center whitespace-nowrap text-white  justify-center bg-blue-500"></div>
        </div>
        <div>
          <i class="fas fa-arrow-down text-red-600 text-lg"></i>
          <span class="text-sm text-red-600 font-bold tracking-normal">1.15%</span>
          <span class="text-gray-500 font-bold text-sm">since last week</span>
        </div>
      </div>
    </div>

    <div class="bg-indigo-400 h-1 rounded-full my-6"/>

    <div>
      <h1 class="font-bold tracking-widest mb-6 underline">December 2020 expenses</h1>

      <div>
        <nuxt-link to="/expense/add" class="btn  btn-indigo uppercase tracking-widest px-4">Add Expense</nuxt-link>
      </div>


      <div class="overflow-x-auto">
      <table class=" w-full bg-white rounded shadow ">
        <thead >
        <tr>
          <th v-for="header in tableHead" class="xl:px-6 px-1 py-3 border-b-2 border-gray-400 text-left leading-4 text-blue-800 tracking-wider">{{header}}</th>
        </tr>
        </thead>
        <tbody>
        <tr >
          <td class="xl:px-6 px-1  py-4 border-b border-gray-500 text-sm">Dec 02, 2020</td>
          <td class="xl:px-6 px-1  py-4 border-b border-gray-500 text-sm">Amex Gold</td>
          <td class="xl:px-6 px-1  py-4 border-b border-gray-500 text-sm">Grocesay</td>
          <td class="xl:px-6 px-1  py-4 border-b border-gray-500 text-sm">Trader Joe</td>
          <td class="xl:px-6 px-1  py-4 border-b border-gray-500 text-sm">$ 20.89</td>
          <td class="xl:px-6 px-1  py-4 border-b border-gray-500 ">
            <i class="fas fa-edit text-green-500 cursor-pointer hover:text-green-400 transform hover:scale-150 transition ease-in-out duration-300"></i>
          </td>
          <td class="xl:px-6 px-1  py-4 border-b border-gray-500 ">
            <i class="fas fa-times text-red-500 cursor-pointer hover:text-red-400 transform hover:scale-150 transition ease-out duration-300"></i>
          </td>
        </tr>
        <tr >
          <td class="xl:px-6 px-1  py-4 border-b border-gray-500 text-sm">Dec 02, 2020</td>
          <td class="xl:px-6 px-1  py-4 border-b border-gray-500 text-sm">Amex Gold</td>
          <td class="xl:px-6 px-1  py-4 border-b border-gray-500 text-sm">Grocesay</td>
          <td class="xl:px-6 px-1  py-4 border-b border-gray-500 text-sm">Trader Joe</td>
          <td class="xl:px-6 px-1  py-4 border-b border-gray-500 text-sm">$ 20.89</td>
          <td class="xl:px-6 px-1  py-4 border-b border-gray-500 ">
            <i class="fas fa-edit text-green-500 cursor-pointer hover:text-green-400 transform hover:scale-150 transition ease-in-out duration-300"></i>
          </td>
          <td class="xl:px-6 px-1  py-4 border-b border-gray-500 ">
            <i class="fas fa-times text-red-500 cursor-pointer hover:text-red-400 transform hover:scale-150 transition ease-out duration-300"></i>
          </td>
        </tr>
        <tr>
          <td class="px-6 py-6"></td>
        </tr>
        </tbody>
      </table>
      </div>

      <div class="py-4 flex justify-end">
        <nav class="block">
          <ul class="flex pl-0 rounded list-none flex-wrap">
            <li>
              <a href="#pablo" class="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-indigo-200 text-white bg-indigo-200">
                <i class="fas fa-chevron-left -ml-px"></i>
                <i class="fas fa-chevron-left -ml-px"></i>
              </a>
            </li>
            <li>
              <a href="#pablo" class="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-indigo-200 text-white bg-indigo-200">
                <i class="fas fa-chevron-left -ml-px"></i>
              </a>
            </li>
            <li>
              <a href="#pablo" class="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-indigo-500 text-white bg-indigo-500">
                1
              </a>
            </li>
            <li>
              <a href="#pablo" class="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-indigo-200 text-white bg-indigo-200">
                2
              </a>
            </li>
            <li>
              <a href="#pablo" class="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-indigo-500 bg-white text-indigo-500">
                3
              </a>
            </li>
            <li>
              <a href="#pablo" class="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-indigo-500 bg-white text-indigo-500">
                4
              </a>
            </li>
            <li>
              <a href="#pablo" class="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-indigo-500 bg-white text-indigo-500">
                5
              </a>
            </li>
            <li>
              <a href="#pablo" class="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-indigo-500 bg-white text-indigo-500">
                <i class="fas fa-chevron-right -mr-px"></i>
              </a>
            </li>
            <li>
              <a href="#pablo" class="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-indigo-500 bg-white text-indigo-500">
                <i class="fas fa-chevron-right -mr-px"></i>
                <i class="fas fa-chevron-right -mr-px"></i>
              </a>
            </li>
          </ul>
        </nav>
      </div>

    </div>



  </div>
</template>

<script>
export default {
  middleware: 'auth',
  name: 'index',
  data:()=>({
    width: '60',
    tableHead: [],
    tableRow: []
  }),

  created () {
    this.tableHead.push('Date');
    this.tableHead.push('Account');
    this.tableHead.push('Category');
    this.tableHead.push('Type');
    this.tableHead.push('Amount');
    this.tableHead.push('');
    this.tableHead.push('');

  }
}
</script>

<style scoped>

</style>
