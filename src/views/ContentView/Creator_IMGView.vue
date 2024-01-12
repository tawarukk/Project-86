<template>
    <div class="Creator_IMGView">
        <NavBarMain/>
        <PicCreatorBox/>
    </div>
</template>

<script>
import NavBarMain from "@/components/Box_SubComponent/NavSup.vue"
import PicCreatorBox from "@/components/Box_Content/BoxP_Creator.vue"


export default {
    name: 'Creator_IMGView',
    components: {
        NavBarMain,
        PicCreatorBox,
        }
}
</script>

<style scoped>
.Creator_IMGView {
  width: 100%;
    min-height: 100vh;
    background: linear-gradient(
      to right,
      #E2E3DE 0%,  
      #E2E3DE 30%, 
      #e8bd4b 30.1%, 
      #e8bd4b 35%,
      #27292a 35.1%, 
      #27292a 100% 
    );
}
</style>