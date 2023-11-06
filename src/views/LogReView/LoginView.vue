<template>
    <div class="Login">
        <NavBar/>
        <!-- <BoxBox/> -->
        <LoginBox/>
        <FooterMain/>
    </div>
</template>

<script>
import NavBar  from '@/components/Box_SubComponent/NavMain'
import LoginBox from'@/components/Box_LogRe/BoxLogin.vue'
import FooterMain from '@/components/Box_SubComponent/FooterMain'


export default {
    name: 'ProfileView',
        components: {
        NavBar,
        LoginBox,
        FooterMain
        }
}
</script>


<style scoped>
.Login {
    width: 100%;
    height: 115vh;
    background: linear-gradient(
      to right,
      #27292a 0%,  
      #27292a 40%, 
      #e8bd4b 40.1%, 
      #e8bd4b 100% 
    );
  }
</style>