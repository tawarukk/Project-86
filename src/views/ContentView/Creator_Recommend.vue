<template>
    <div class="Creator_R">
        <NavBarMain/>
        <RecCreatorBox/>
    </div>
</template>

<script>
import NavBarMain from "@/components/Box_SubComponent/NavMain.vue"
import RecCreatorBox from "@/components/Box_Content/ฺBoxR_Creator.vue"

export default {
    name: 'Creator_CView',
    components: {
        NavBarMain,
        RecCreatorBox,
        }
}
</script>

<style scoped>
.Creator_R {
  width: 100%;
    min-height: 100vh;
    background: linear-gradient(
      to right,
      #E2E3DE 0%,  
      #E2E3DE 30%, 
      #27292a 30.1%, 
      #27292a 35%,
      #e8bd4b 35.1%, 
      #e8bd4b 100% 
    );
}
</style>