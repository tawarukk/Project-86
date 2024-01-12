<template>
    <div class="Creator_T">
        <NavBarMain/>
        <TableCreatorBox/>
    </div>
</template>

<script>
import NavBarMain from "@/components/Box_SubComponent/NavSup.vue"
import TableCreatorBox from "@/components/Box_Content/BoxT_Creator.vue"

export default {
    name: 'Creator_CView',
    components: {
        NavBarMain,
        TableCreatorBox,
        }
}
</script>

<style scoped>
.Creator_T {
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