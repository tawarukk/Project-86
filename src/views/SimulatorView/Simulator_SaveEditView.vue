<template>
    <div class="Edit_Save">
        <NavBar/>
        <SaveE/>
        <FooterMain/>
    </div>
</template>

<script>
import  NavBar  from '@/components/Box_SubComponent/NavMain'
import  SaveE from '@/components/Box_SubComponent/BoxE_SaveSlot.vue'
import  FooterMain from '@/components/Box_SubComponent/FooterMain'


export default {
    name: 'Edit_SaveView',
        components: {
        NavBar,
        FooterMain,
        SaveE
        }
}
</script>


<style scoped>
.Edit_Save {
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