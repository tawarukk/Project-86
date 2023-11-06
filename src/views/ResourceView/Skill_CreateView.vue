<template>
    <div class="Skill_C">
        <NavBarMain/>
        <AddSkillBox/>
    </div>
</template>

<script>
import NavBarMain from "@/components/Box_SubComponent/NavSup.vue"
import AddSkillBox from "@/components/Box_Resource/BoxC_Skill.vue"


export default {
    name: 'Produte_CView',
    components: {
        NavBarMain,
        AddSkillBox
        }
}
</script>

<style scoped>
.Skill_C {
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