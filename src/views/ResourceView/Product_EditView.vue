<template>
    <div class="Produte_E">
        <NavBarMain/>
        <PicProductBox/>
        <EditProductBox/>
    </div>
</template>

<script>
import NavBarMain from "@/components/Box_SubComponent/NavSup.vue"
import PicProductBox from "@/components/Box_Resource/BoxP_Product.vue"
import EditProductBox from "@/components/Box_Resource/BoxE_Product.vue"


export default {
    name: 'Produte_EView',
    components: {
        NavBarMain,
        PicProductBox,
        EditProductBox
        }
}
</script>

<style scoped>
.Produte_E {
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