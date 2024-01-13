<template>
    <div class="NewsParagraphs_T">
        <NavBarMain/>
        <TableParagraphsBox/>
    </div>
</template>

<script>
import NavBarMain from "@/components/Box_SubComponent/NavSup.vue"
import TableParagraphsBox from "@/components/Box_Content/BoxT_NewsParagraphs.vue"


export default {
    name: 'NewsParagraphs_TView',
    components: {
        NavBarMain,
        TableParagraphsBox
        }
}
</script>

<style scoped>
.NewsParagraphs_T {
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