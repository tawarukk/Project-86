<template>
    <div class="Produte_T">
        <NavBarMain/>
        <TableProductBox/>
    </div>
</template>

<script>
import NavBarMain from "@/components/Box_SubComponent/NavSup.vue"
import TableProductBox from "@/components/Box_Resource/BoxT_Product.vue"


export default {
    name: 'Produte_TView',
    components: {
        NavBarMain,
        TableProductBox,
        }
}
</script>

<style scoped>
.Produte_T {
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