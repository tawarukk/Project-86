<template>
    <div class="NewsTopic_T">
        <NavBarMain/>
        <TableNewsBox/>
    </div>
</template>

<script>
import NavBarMain from "@/components/Box_SubComponent/NavSup.vue"
import TableNewsBox from "@/components/Box_Content/BoxT_NewsTopic.vue"


export default {
    name: 'NewsTopic_TView',
    components: {
        NavBarMain,
        TableNewsBox
        }
}
</script>

<style scoped>
.NewsTopic_T {
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