<template>
    <div class="NewsTopic_P">
        <NavBarMain/>
        <PicNewsTopicBox/>
    </div>
</template>

<script>
import NavBarMain from "@/components/Box_SubComponent/NavSup.vue"
import PicNewsTopicBox from "@/components/Box_Content/BoxP_NewsTopic.vue"


export default {
    name: 'NewsTopic_PView',
    components: {
        NavBarMain,
        PicNewsTopicBox
        }
}
</script>

<style scoped>
.NewsTopic_P {
  width: 100%;
    min-height: 100vh;
    background: linear-gradient(
      to right,
      #E2E3DE 0%,  
      #E2E3DE 30%, 
      #4b9ce8 30.1%, 
      #4b9ce8 35%,
      #27292a 35.1%, 
      #27292a 100% 
    );
}

</style>