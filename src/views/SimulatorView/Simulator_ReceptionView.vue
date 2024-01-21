<template>
    <div class="Reception">
    <nav-bar/>
    <BoxReception/> 
    <FooterMain/>
    </div>
</template>
    
<script>
    import  NavBar  from '@/components/Box_SubComponent/NavMain'
    import  BoxReception  from '@/components/Box_Simulator/BoxSimulator_Share.vue'
    import  FooterMain from '@/components/Box_SubComponent/FooterMain'

    export default {
    name: 'TradingView',
    components: {
    NavBar,
    BoxReception,
    FooterMain 
    }
    }
</script>


<style scoped>
.Reception {
width: 100%;
height: 100vh;
background: linear-gradient(
  to right top,
  #1f2122 0%,  
  #1f2122 74%, 
  #4b9ce8 74.1%, 
  #4b9ce8 100% 
);
}
</style>