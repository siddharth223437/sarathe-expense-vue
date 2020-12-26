<template>
  <div>
  <div class="my-8">
    <h1 class="animate__animated animate__swing">An animated element</h1>
  </div>
  <button type="button" @click="bounce= !bounce" class="btn btn-indigo">Bounce</button>
  </div>
</template>

<script>


export default {
  name: 'demo',
  data:()=>({
    testArr: ['siddharth','Saurabh','Bobby','Chibba'],
    num: 0,
    bounce: false,
    show_modal: true,
    selectedWrestler: "The Ultimate Warrior",
    wrestlers: [
      {key: 1, value:'Siddharth'},
      {key: 2, value:'Saurabh'},
      {key: 3, value:'Bobby'},
      {key: 4, value:'Chibba'},
    ],
    tdArr: ['key','value'],
    desc: false
  }),

  methods:{

    learnMeth(){
      let i = this.testArr.map(t => {
        return t*20;
      })
      console.log(i)
    }

  },

  created () {
    this.learnMeth();
  }
}
</script>

<style scoped>

.dropdown:hover .dropdown-menu {
  display: block;
}

.modal-body{
  max-height: 500px;
}
.bg-gray-800-opacity{
  background-color: #2D374850;
}
@media screen and (max-width: 768px){
  .modal-body {
    max-height: 400px;
  }
}

/* animation for vue transition tag */

.fade-up-down-enter-active {
  transition: all 0.3s ease;
}
.fade-up-down-leave-active {
  transition: all 0.3s ease;
}
.fade-up-down-enter {
  transform: translateY(10%);
  opacity: 0;
}
.fade-up-down-leave-to {
  transform: translateY(10%);
  opacity: 0;
}

.fade-enter-active{
  -webkit-transition: opacity 2s;
  transition: opacity .3s;

}
.fade-leave-active {
  transition: opacity .3s;
}

.fade-enter,
.fade-leave-to{
  opacity: 0;
}


</style>
