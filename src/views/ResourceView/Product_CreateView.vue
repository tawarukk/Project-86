<template>
    <div class="Produte_C">
        <NavBarMain/>
        <AddProductBox/>
    </div>
</template>

<script>
import NavBarMain from "@/components/Box_SubComponent/NavSup.vue"
import AddProductBox from "@/components/Box_Resource/BoxC_Product.vue"

export default {
    name: 'Produte_CView',
    components: {
        NavBarMain,
        AddProductBox,
        }
}
</script>

<style scoped>
.Produte_C {
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