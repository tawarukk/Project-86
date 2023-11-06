<template>
  <div class="Module">
  <!-- <div class="Module" :style="{ backgroundImage: 'url(' + rule + ')' }"> -->
    <NavBar/>
    <BoxModule/>
  </div>
</template>
  
<script>
import  NavBar  from '@/components/Box_SubComponent/NavMain'
//import  MongodbAdd from '@/components/MongoDB.vue'
import  BoxModule from '@/components/BoxModule.vue'


export default {
  name: 'MolduleView',
  components: {
    NavBar,
    //MongodbAdd
    BoxModule
  },
  data() {
    return {

  }
  },
}
</script>

<style >
    /* .Module {
    width: 100%;
    height: 100vh;
    background: linear-gradient(
      to right top,
      #1f2122 0%,  
      #1f2122 74%, 
      #4b9ce8 74.1%, 
      #4b9ce8 100% 
    );
  } */
</style>