<template>
  <div class="mt-4">
    <button class="btn btn-danger" @click="showModal=true">Delete</button>

    <transition name="modal">
    <div class="bg-black bg-opacity-50 absolute inset-0 z-40  justify-center items-center" :class="{'flex':showModal,'hidden':!showModal}">
      <div class="bg-gray-200 max-w-sm">
        <div class="flex items-center justify-between">
          <h4 class="text-lg font-bold">Confirm Delete?</h4>
          <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <div>
          <p>Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum</p>
        </div>
        <div>
          <button class="btn btn-danger" @click="showModal=false">Close</button>
        </div>
      </div>
    </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'modal',
  data:()=>({
    showModal: false
  }),
  methods: {
    openModal() {
      this.showModal = true
    }
  }
}
</script>

<style scoped>
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
