<template>
    <div class="Profile">
        <NavBar/>
        <BoxProfile/>
        <FooterMain/>
    </div>
</template>

<script>
import  NavBar  from '@/components/Box_SubComponent/NavMain'
import  BoxProfile from'@/components/BoxProfile.vue'
import  FooterMain from '@/components/Box_SubComponent/FooterMain'

export default {
    name: 'ProfileView',
        components: {
        NavBar,
        BoxProfile,
        FooterMain,
        }
}
</script>


<style>
.Profile {
  width: 100%;
    min-height: 100vh;
    background: linear-gradient(
      to right,
      #E2E3DE 0%,  
      #E2E3DE 40%, 
      #e8bd4b 40.1%, 
      #e8bd4b 100% 
    );
  }

</style>