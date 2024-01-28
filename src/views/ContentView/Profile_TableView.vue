<template>
    <div class="Profile_T">
        <NavBarMain/>
        <TableProfileBox/>
        
    </div>
</template>

<script>
import NavBarMain from "@/components/Box_SubComponent/NavSup.vue"
import TableProfileBox from "@/components/Box_Content/BoxT_Profile.vue"



export default {
    name: 'NewsTopic_TView',
    components: {
        NavBarMain,
        TableProfileBox,
        
        }
}
</script>

<style scoped>
.Profile_T {
  width: 100%;
    min-height: 100vh;
    background: linear-gradient(
      to right,
      #E2E3DE 0%,  
      #E2E3DE 30%, 
      #FF9999 30.1%, 
      #FF9999 35%,
      #27292a 35.1%, 
      #27292a 100% 
    );
}
</style>