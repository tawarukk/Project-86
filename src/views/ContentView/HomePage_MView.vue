<template>
    <div class="HomePage_M">
        <NavBarMain/>
        <TableHomePageBox/>
    </div>
</template>

<script>
import NavBarMain from "@/components/Box_SubComponent/NavSup.vue"
import TableHomePageBox from "@/components/Box_Content/BoxM_HomePage.vue"

export default {
    name: 'HomePage_MView',
    components: {
        NavBarMain,
        TableHomePageBox,
        }
}
</script>

<style scoped>
.HomePage_M {
  width: 100%;
    min-height: 100vh;
    background: linear-gradient(
      to right,
      #E2E3DE 0%,  
      #E2E3DE 30%, 
      #e8bd4b 30.1%, 
      #e8bd4b 35%,
      #1f2122 35.1%, 
      #1f2122 100% 
    );
}
</style>