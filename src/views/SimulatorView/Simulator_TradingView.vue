<template>
        <div class="Trading">
        <nav-bar/>
        <BoxTrading/> 
        <FooterMain/>
        </div>
</template>
        
<script>
        import  NavBar  from '@/components/Box_SubComponent/NavMain'
        import  BoxTrading  from '@/components/Box_Simulator/BoxSimulator_Trading.vue'
        import  FooterMain from '@/components/Box_SubComponent/FooterMain'

        export default {
        name: 'TradingView',
        components: {
        NavBar,
        BoxTrading,
        FooterMain 
        }
        }
</script>


<style scoped>
.Trading {
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