<template>
    <div class="ProfileMember_E">
        <NavBarMain/>
        <EdirProfileMember/>
    </div>
</template>

<script>
import NavBarMain from "@/components/Box_SubComponent/NavMain.vue"
import EdirProfileMember from "@/components/Box_Member/BoxE_ProfileMember.vue"


export default {
    name: 'NewsTopic_TView',
    components: {
        NavBarMain,
        EdirProfileMember
        }
}
</script>

<style scoped>
.ProfileMember_E {
  width: 100%;
    min-height: 100vh;
    background: linear-gradient(
      to right,
      #E2E3DE 0%,  
      #E2E3DE 40%, 
      #FF9999  40.1%, 
      #FF9999  100% 
    );
}
</style>