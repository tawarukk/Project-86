<template>
    <div class="Operator_T">
        <NavBarMain/>
        <TableOperatorBox/>
    </div>
</template>

<script>
import NavBarMain from "@/components/Box_SubComponent/NavSup.vue"
import TableOperatorBox from "@/components/Box_Resource/BoxT_Operator.vue"


export default {
    name: 'Operator_TView',
    components: {
        NavBarMain,
        TableOperatorBox,
        }
}
</script>

<style scoped>
.Operator_T {
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