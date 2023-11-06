<template>
    <div class="Skill_E">
        <NavBarMain/>
        <EditSkillBox/>
    </div>
</template>

<script>
import NavBarMain from "@/components/Box_SubComponent/NavSup.vue"
import EditSkillBox from "@/components/Box_Resource/BoxE_Skill.vue"


export default {
    name: 'Produte_EView',
    components: {
        NavBarMain,
        EditSkillBox
        }
}
</script>

<style scoped>
.Skill_E {
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