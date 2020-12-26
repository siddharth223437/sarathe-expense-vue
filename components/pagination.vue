<template>
  <div>
    <nav class="block">
      <ul class="flex pl-0 rounded list-none flex-wrap">
        <li v-if="showFirst">
<!--          <button @click="goToFirstPage"  type="button" :disabled="disableFirst" class="paginate-nav" :class="{'border-indigo-200  bg-indigo-200 text-white cursor-not-allowed':disableFirst, 'border-indigo-500 bg-white  text-indigo-500 hover:scale-105 hover:bg-indigo-500 hover:text-white':!disableFirst,'rounded-full':pageType==='circle','rounded-none':pageType==='square', 'mx-0':!showSpace}">-->
          <button @click="goToFirstPage"  type="button" :disabled="disableFirst" :class="computeDisableFirstAndPrevious + computePageType + computeShowSpace">
            <i class="fas fa-chevron-left -ml-px"></i>
            <i class="fas fa-chevron-left -ml-px"></i>
          </button>
        </li>
        <li v-if="showPrevious">
<!--          <button @click="gotToPreviousPage" :disabled="disablePrevious" type="button" class="paginate-nav" :class="{'border-indigo-200  bg-indigo-200 text-white cursor-not-allowed':disablePrevious, 'border-indigo-500 bg-white  text-indigo-500 hover:scale-105 hover:bg-indigo-500 hover:text-white':!disablePrevious, 'rounded-full':pageType==='circle','rounded-none':pageType==='square','mx-0':!showSpace}">-->
          <button @click="gotToPreviousPage" :disabled="disablePrevious" type="button" :class="computeDisableFirstAndPrevious + computePageType + computeShowSpace" >
            <i class="fas fa-chevron-left -ml-px"></i>
          </button>
        </li>
        <li v-for="(page,index) in computeTotalPages">
<!--          <button type="button" @click.prevent="onPageNumClick(page)"  class="paginate-main" :class="{'border-indigo-500 bg-indigo-500 text-white':activePage-1===index, 'rounded-full':pageType==='circle','rounded-none':pageType==='square','mx-0':!showSpace}">-->
          <button type="button" @click.prevent="onPageNumClick(page)"  class="paginate-main" :class="computeMainActivePage(index) + computeMainPagesHover + computePageType + computeShowSpace">
            {{page}}
          </button>
        </li>

        <li v-if="showNext">
<!--          <button @click.prevent="gotToNextPage" type="button" class="paginate-nav " :class="{'border-indigo-200  bg-indigo-200 text-white cursor-not-allowed':disableNext, 'border-indigo-500 bg-white  text-indigo-500 hover:scale-105 hover:bg-indigo-500 hover:text-white':!disableNext, 'rounded-full':pageType==='circle','rounded-none':pageType==='square','mx-0':!showSpace}">-->
          <button @click.prevent="gotToNextPage" :disabled="disableNext" type="button" :class="computeDisableLastAndNext + computePageType + computeShowSpace ">
            <i class="fas fa-chevron-right -mr-px"></i>
          </button>
        </li>
        <li v-if="showLast">
          <button @click="goToLastPage" :disabled="disableLast" :class="computeDisableLastAndNext + computePageType + computeShowSpace">
            <i class="fas fa-chevron-right -mr-px"></i>
            <i class="fas fa-chevron-right -mr-px"></i>
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "pagination",
  props:{
    objArr: {
      type: Array,
      required: true
    },
    maxRows: {
      type: Number,
      default: 10
    },
    showNext: {
      type: Boolean,
      default: true,
    },
    showLast: {
      type: Boolean,
      default: true
    },
    showPrevious:{
      type: Boolean,
      default: true
    },
    showFirst:{
      type: Boolean,
      default: true
    },
    pageType:{
      type: String,
      default: 'square'
    },
    showSpace: {
      type: Boolean,
      default: true,
    },
    pageColor:{
      type: String,
      default: 'blue'
    }

  },
  data:()=>({
    respDataArr: [],
    activePage: 1,
    disableFirst: false,
    disablePrevious: false,
    disableLast: false,
    disableNext: false,
  }),
  methods: {
    /*
    * (5 * 1)-5 = 0 (1) 0  ---- (5-1)
    * (5*2) - 5 = 5 (2)
    * */
    onPageNumClick(pageNum){
      this.activePage = pageNum;
      let respArr = [];
      let pageStartIndex = 0;
      let pageEndIndex = 0;
      this.objArr.filter((o,index) => {
        if(this.activePage === 1){
          if(index <= this.maxRows-1){
            respArr.push(o);
            //disable first and previous
            this.disableFirst = true;
            this.disablePrevious = true
            this.disableLast = false
            this.disableNext=false
          }
        }else{
          pageStartIndex = ((this.maxRows * this.activePage) - this.maxRows) ;
          // pageEndIndex = (pageStartIndex * 2) - 1;
          pageEndIndex = pageStartIndex + (this.maxRows -1);
          if(pageEndIndex > this.objArr.length){
            pageEndIndex = this.objArr.length - 1;
          }

        }
      })

      // console.log(pageStartIndex + ' ----- ' + pageEndIndex  + ' --------- ' + this.activePage + ' ------' +this.findTotalPage())

      if(this.activePage > 1) {
        this.disableFirst = false;
        this.disablePrevious = false
        this.disableLast = false
        this.disableNext=false
        this.objArr.filter((o, index) => {
          if (index >= pageStartIndex && index <= pageEndIndex) {
            respArr.push(o);
          }
          if(this.activePage === this.findTotalPage()){
            //we are at last page, disable next and last button
            this.disableFirst = false;
            this.disablePrevious = false
            this.disableLast = true
            this.disableNext=true
          }
        })
      }

      //check if there is only 1 page or object array is empty
      if(this.findTotalPage() === 1 || this.objArr.length === 0){
        this.disableFirst = true;
        this.disablePrevious = true
        this.disableLast = true
        this.disableNext=true
      }


      this.$emit('paginate',respArr);
    },

    findTotalPage(){
      let i = this.objArr.length/this.maxRows;
      return Math.ceil(i);
    },
    goToFirstPage(){
      this.onPageNumClick(1);
    },
    gotToPreviousPage(){
      this.activePage = this.activePage - 1
      this.onPageNumClick(this.activePage);
    },
    gotToNextPage(){
      this.activePage = this.activePage + 1
      this.onPageNumClick(this.activePage);
    },
    goToLastPage(){
      this.onPageNumClick(this.findTotalPage());
    },
    buildPageColor(){
      return 'paginate-nav border-'+this.pageColor+'-200 '
    },
    computeMainActivePage(index){
      if(this.activePage-1 === index){
        return ' border-'+this.pageColor+'-500 bg-'+this.pageColor+'-500 text-white '
      }
    }
  },
  computed: {
    computeTotalPages(){
      return this.findTotalPage();
    },
    computeDisableFirstAndPrevious(){
      if(this.disableFirst || this.disablePrevious){
        return this.buildPageColor() + 'bg-'+this.pageColor+'-200 text-white cursor-not-allowed ';
      }
      if(!this.disableFirst || !this.disablePrevious){
        return  this.buildPageColor()+ 'bg-white   hover:scale-105  hover:bg-'+this.pageColor+'-500 hover:text-white text-'+this.pageColor+'-500 ';
      }
    },
    computeDisableLastAndNext(){
      if(this.disableLast || this.disableNext){
        return this.buildPageColor() + 'bg-'+this.pageColor+'-200 text-white cursor-not-allowed ';
      }
      if(!this.disableLast || !this.disableNext){
        return  this.buildPageColor()+ 'bg-white   hover:scale-105  hover:bg-'+this.pageColor+'-500 hover:text-white text-'+this.pageColor+'-500 ';
      }
    },
    computePageType(){
      if(this.pageType === 'circle'){
        return 'rounded-full'
      }
      if(this.pageType === 'square'){
        return 'rounded-none'
      }
    },
    computeShowSpace(){
      if(this.showSpace){
        return ' mx-1 ';
      }else{
        return ' mx-0 ';
      }
    },
    computeMainPagesHover(){
      return ' border-'+this.pageColor+'-500 hover:bg-'+this.pageColor+'-500 hover:text-white ';
    },

  },
  watch:{
    objArr: {
      immediate: true,
      handler(){
        this.onPageNumClick(1)
      }
    },
  }

}
</script>

<style scoped>

</style>
