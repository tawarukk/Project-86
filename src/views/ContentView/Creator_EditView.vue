<template>
    <div class="Creator_E">
        <NavBarMain/>
        <EditCreatorBox/>
    </div>
</template>

<script>
import NavBarMain from "@/components/Box_SubComponent/NavSup.vue"
import EditCreatorBox from "@/components/Box_Content/BoxE_Creator.vue"

export default {
    name: 'Creator_EView',
    components: {
        NavBarMain,
        EditCreatorBox
        }
}
</script>

<style scoped>
.Creator_E {
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