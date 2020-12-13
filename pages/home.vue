<template>
  <div class="mt-28">
    <button class="block h-10 w-10 rounded-full overflow-hidden focus:outline-none border-2 border-gray-400 focus:border-white">
      <img  src="~/assets/images/razi1.jpg" alt="razi1" class="h-full w-full object-cover">
    </button>
    <div class="bg-white rounded-lg py-2 w-64 mt-2 shadow-lg">
      <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">Login</a>
      <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">Register</a>
      <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">About</a>
      <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">Contact</a>
    </div>
  </div>
</template>

<script>
export default {
name: "home",
  middleware: 'auth'
}
</script>

<style scoped>

</style>
