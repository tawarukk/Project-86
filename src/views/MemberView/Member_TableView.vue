<template>
    <div class="Member_T">
        <NavBarMain/>
        <TableMemberBox/>
    </div>
</template>

<script>
import NavBarMain from "@/components/Box_SubComponent/NavSup.vue"
import TableMemberBox from "@/components/Box_Member/BoxT_Member.vue"

export default {
    name: 'NewsTopic_TView',
    components: {
        NavBarMain,
        TableMemberBox,
        }
}
</script>

<style scoped>
.Member_T {
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