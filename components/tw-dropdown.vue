<template>
  <div class="relative">
    <input type="text" class="form-control focus:ring-0" @click="isDropdownClicked = !isDropdownClicked" @keydown.esc="isDropdownClicked = false">
    <div class="absolute top-0 right-0 px-3 py-2">
      <svg class="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>

    <button v-if="isDropdownClicked" @click.prevent="isDropdownClicked = false" class="fixed outline-none inset-0 bg-transparent opacity-50 cursor-default h-full w-full"></button>

    <ul v-if="isDropdownClicked" class="bg-white  rounded-lg absolute top-0 shadow-2xl p-2 top-0 left-0 w-full transition duration-1000 ease-in transform scale-100">
      <li class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white cursor-pointer">Login</li>
      <li class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">Register</li>
      <li class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">About</li>
      <li class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">Contact</li>
    </ul>

<!--    <button class="transition duration-500 ease-in-out bg-blue-600 hover:bg-red-600 transform hover:-translate-y-1 hover:scale-110 ">-->
<!--      Hover me-->
<!--    </button>-->

  </div>
</template>

<script>
export default {
  name: "tw-dropdown",
  data:()=>({
    isDropdownClicked: false
  }),

}
</script>

<style scoped>

</style>
