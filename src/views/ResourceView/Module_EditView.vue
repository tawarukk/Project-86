<template>
    <div class="Module_E">
        <NavBarMain/>
        <PicModuleBox/>
        <EditModuleBox/>
    </div>
</template>

<script>
import NavBarMain from "@/components/Box_SubComponent/NavSup.vue"
import EditModuleBox from "@/components/Box_Resource/BoxE_Module.vue"
import PicModuleBox from "@/components/Box_Resource/BoxP_Module.vue"

export default {
    name: 'Module_EView',
    components: {
        NavBarMain,
        PicModuleBox,
        EditModuleBox
        }
}
</script>

<style scoped>
.Module_E {
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