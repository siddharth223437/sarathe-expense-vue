<template>
  <div>

    <modal/>

<!--    <div id="app" class="h-full w-full flex items-center justify-center">-->
<!--      <transition name="fade">-->

<!--        <div v-show="show_modal" class="fixed inset-0 z-30">-->

<!--          &lt;!&ndash;       background &ndash;&gt;-->
<!--          <div v-show="show_modal" @click="showModal()" class="bg-filter bg-white opacity-25 fixed inset-0 w-full h-full z-20">-->
<!--          </div>-->
<!--          &lt;!&ndash;          &ndash;&gt;-->
<!--          <main class="flex flex-col items-center justify-center h-1/2 w-full">-->
<!--            <transition name="fade-up-down">-->
<!--              <div v-show="show_modal" class="modal-wrapper inline-block flex items-center z-30">-->
<!--                <div class="modal max-w-md mx-auto xl:max-w-5xl lg:max-w-5xl md:max-w-2xl bg-white max-h-screen shadow-lg flex-row rounded relative">-->

<!--                  <div class="modal-header p-5 bg-gray-900 text-gray-900 rounded-t">-->
<!--                    <h5 class="text-white text-2xl uppercase">this is header</h5>-->
<!--                  </div>-->
<!--                  <div class="modal-body p-5 w-full h-full overflow-y-auto ">-->
<!--                    <p class="text-justify">-->
<!--                      ;lmm lkxnqnxqx qklnxqwnx lkqwnxinqwlx klqwnxqw xlkqwnix qwm nxonqw lkx qkwn xlkqw ipxn qwlk xioqw xlkqw nx ;lmm lkxnqnxqx qklnxqwnx lkqwnxinqwlx klqwnxqw xlkqwnix qwm nxonqw lkx qkwn xlkqw ipxn qwlk xioqw xlkqw nx-->
<!--                    </p>-->
<!--                  </div>-->
<!--                  <div class="modal-footer py-3 px-5 border0-t text-right">-->
<!--                    <button class="bg-green-500 px-5 py-2 text-white" @click="showModal()">OK</button>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </transition>-->


<!--          </main>-->
<!--        </div>-->
<!--      </transition>-->
<!--      <div>-->
<!--        <span class="text-gray-300 font-bold">lorem text</span><br>-->

<!--      </div>-->
<!--    </div>-->

  </div>
</template>

<script>
import Datepicker from '~/components/datepicker'
import Alert from '~/components/alert'
import Modal from '@/components/modal'
export default {
  name: 'demo',
  components: { Modal, Alert, Datepicker },
  data:()=>({
    num: 0,
    show_modal: true,
  }),

  methods:{
    showModal(){
      if(this.show_modal){
        //stop screen scrolling
        document.getElementsByTagName("html")[0].classList.remove('overflow-y-hidden');
        this.show_modal = false;
      }else{
        document.getElementsByTagName("html")[0].classList.add('overflow-y-hidden');
        this.show_modal = true;
      }
    }
  },

  created () {

  }
}
</script>

<style scoped>
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
