<template>
  <div class="Module">
    <NavBar/>
    <BoxModule/>
    <FooterMain/>
  </div>
</template>
  
<script>
import  NavBar  from '@/components/Box_SubComponent/NavMain'
import  BoxModule from '@/components/BoxModule.vue'
import  FooterMain from '@/components/Box_SubComponent/FooterMain'




export default {
  name: 'MolduleView',
  components: {
    NavBar,
    FooterMain,
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