<template>
    <div class="HomePage_E">
        <NavBarMain/>
        <EditHomePageBox/>
    </div>
</template>

<script>
import NavBarMain from "@/components/Box_SubComponent/NavSup.vue"
import EditHomePageBox from "@/components/Box_Content/BoxE_HomePage.vue"

export default {
    name: 'HomePage_EView',
    components: {
        NavBarMain,
        EditHomePageBox,
        }
}
</script>

<style scoped>
.HomePage_E {
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