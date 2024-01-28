<template>
<div class="Selec_M">  
<NavBar/>
<SeMod/>
<FooterMain/>
</div>
</template>

<script>
import  SeMod from '@/components/Box_Selec/SelecModule.vue'
import  NavBar  from '@/components/Box_SubComponent/NavMain'
import  FooterMain from '@/components/Box_SubComponent/FooterMain'

export default {
    components: {
        SeMod,
        NavBar,
        FooterMain
    }
}
</script>

<style scoped>
.Selec_M {
    width: 100%;
    height: 100vh;
    background: linear-gradient(
      to right top,
      #1f2122 0%,  
      #1f2122 74%, 
      #FF9999 74.1%, 
      #FF9999 100% 
    );
  }
</style>
