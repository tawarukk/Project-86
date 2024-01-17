<template>
    <div class="Management">
        <NavBarMain/>
        <Profile/>
        <WorkMain/>
    </div>
</template>

<script>
import NavBarMain from "@/components/Box_SubComponent/NavSup.vue"
import Profile from "@/components/BoxProfile.vue"
import WorkMain from "@/components/Box_SubComponent/WorkMain.vue"


export default {
    name: 'ManagementView',
    components: {
        NavBarMain,
        Profile,
        WorkMain
        }
}
</script>

<style>
.Management {
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