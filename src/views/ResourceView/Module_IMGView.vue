<template>
    <div class="Module_IMGView">
        <NavBarMain/>
        <PicModuleBox/>
    </div>
</template>

<script>
import NavBarMain from "@/components/Box_SubComponent/NavSup.vue"
import PicModuleBox from "@/components/Box_Resource/BoxP_Module.vue"


export default {
    name: 'Module_IMGView',
    components: {
        NavBarMain,
        PicModuleBox,
        }
}
</script>

<style scoped>
.Module_IMGView {
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