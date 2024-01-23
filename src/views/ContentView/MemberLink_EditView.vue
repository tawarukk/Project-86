<template>
    <div class="ManualLink_E">
        <NavBarMain/>
        <ManualLink_EBox/>
    </div>
</template>

<script>
import NavBarMain from "@/components/Box_SubComponent/NavSup.vue"
import ManualLink_EBox from "@/components/Box_Content/BoxE_ManualLink.vue"


export default {
    name: 'ManualLink_CView',
    components: {
        NavBarMain,
        ManualLink_EBox
        }
}
</script>

<style scoped>
.ManualLink_E {
  width: 100%;
    min-height: 100vh;
    background: linear-gradient(
      to right,
      #E2E3DE 0%,  
      #E2E3DE 30%, 
      #4b9ce8 30.1%, 
      #4b9ce8 35%,
      #27292a 35.1%, 
      #27292a 100% 
    );
}
</style>