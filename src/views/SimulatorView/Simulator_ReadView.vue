<template>
    <div class="ReceptionRead">
    <nav-bar/>
    <BoxReceptionRead/> 
    <CommentAdd/>
    <CommentList/>
    <FooterMain/>
    </div>
</template>
    
<script>
    import  NavBar  from '@/components/Box_SubComponent/NavMain'
    import  BoxReceptionRead  from '@/components/Box_Simulator/BoxSimulator_Read.vue'
    import  FooterMain from '@/components/Box_SubComponent/FooterMain'
    import  CommentAdd from '@/components/Box_SubComponent/CommentMain.vue';
    import  CommentList from '@/components/Box_SubComponent/CommentList.vue';

    export default {
    name: 'ReceptionReadView',
    components: {
    NavBar,
    BoxReceptionRead,
    FooterMain ,
    CommentList,
    CommentAdd 
    }
    }
</script>


<style scoped>
.ReceptionRead {
width: 100%;
height: 100vh;
background: linear-gradient(
  to right top,
  #1f2122 0%,  
  #1f2122 74%, 
  #FF9999 74.1%, 
  #FF9999 100% 
);
}
</style>