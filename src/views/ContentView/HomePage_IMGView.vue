<template>
    <div class="HomePage_P">
        <NavBarMain/>
        <PicHomePageBox/>
    </div>
</template>

<script>
import NavBarMain from "@/components/Box_SubComponent/NavSup.vue"
import PicHomePageBox from "@/components/Box_Content/BoxP_Homepage.vue"

export default {
    name: 'HomePage_EView',
    components: {
        NavBarMain,
        PicHomePageBox,
        }
}
</script>

<style scoped>
.HomePage_P {
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