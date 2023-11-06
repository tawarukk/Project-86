<template>
    <div class="Operator_C">
        <NavBarMain/>
        <AddOperatorBox/>
    </div>
</template>

<script>
import NavBarMain from "@/components/Box_SubComponent/NavSup.vue"
import AddOperatorBox from "@/components/Box_Resource/BoxC_Operator.vue"


export default {
    name: 'Operator_CView',
    components: {
        NavBarMain,
        AddOperatorBox,
        }
}
</script>

<style scoped>
.Operator_C {
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