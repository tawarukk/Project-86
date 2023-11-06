<template>
    <div class="Skill_T">
        <NavBarMain/>
        <TableSkillBox/>
    </div>
</template>

<script>
import NavBarMain from "@/components/Box_SubComponent/NavSup.vue"
import TableSkillBox from "@/components/Box_Resource/BoxT_Skill.vue"


export default {
    name: 'Produte_TView',
    components: {
        NavBarMain,
        TableSkillBox
        }
}
</script>

<style scoped>
.Skill_T {
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