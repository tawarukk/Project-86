<template>
    <div class="Registor">
        <NavBar/>
        <!-- <BoxBox/> -->
        <RegistorBox/>
        <FooterMain/>
    </div>
</template>

<script>
import  NavBar  from '@/components/Box_SubComponent/NavMain'
import RegistorBox from'@/components/Box_LogRe/BoxRegistor.vue'
import  FooterMain from '@/components/Box_SubComponent/FooterMain'

export default {
    name: 'ProfileView',
        components: {
        NavBar,
        RegistorBox,
        FooterMain
        }
}
</script>


<style scoped>
.Registor {
    width: 100%;
    height: 115vh;
    background: linear-gradient(
      to right,
      #27292a 0%,  
      #27292a 40%, 
      #FF9999 40.1%, 
      #FF9999 100% 
    );
  }

</style>