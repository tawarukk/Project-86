<template>
    <div class="Create_Save">
        <NavBar/>
        <SaveC/>
        <FooterMain/>
    </div>
</template>

<script>
import  NavBar  from '@/components/Box_SubComponent/NavMain'
import  SaveC from '@/components/Box_SubComponent/BoxC_SaveSlot.vue'
import  FooterMain from '@/components/Box_SubComponent/FooterMain'


export default {
    name: 'Create_SaveView',
        components: {
        NavBar,
        FooterMain,
        SaveC
        }
}
</script>


<style scoped>
.Create_Save {
  width: 100%;
    min-height: 100vh;
    background: linear-gradient(
      to right,
      #E2E3DE 0%,  
      #E2E3DE 40%, 
      #FF9999 40.1%, 
      #FF9999 100% 
    );
  }

</style>