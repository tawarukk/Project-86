<template>
    <div class="NewsParagraphs_C">
        <NavBarMain/>
        <AddParagraphsBox/>
    </div>
</template>

<script>
import NavBarMain from "@/components/Box_SubComponent/NavSup.vue"
import AddParagraphsBox from "@/components/Box_Content/BoxC_NewsParagraphs.vue"


export default {
    name: 'NewsParagraphs_CView',
    components: {
        NavBarMain,
        AddParagraphsBox
        }
}
</script>

<style scoped>
.NewsParagraphs_C {
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