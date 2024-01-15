<template>
    <div class="news">
    <nav-bar/>
    <BoxNewsRead/>
    <CommentAdd/>
    <CommentList/>
    <FooterMain/>
    </div>
</template>
    
<script>
    import  NavBar  from '@/components/Box_SubComponent/NavMain'
    import  BoxNewsRead from '@/components/BoxNewsRead.vue'
    import  CommentAdd from '@/components/Box_SubComponent/CommentMain.vue';
    import  CommentList from '@/components/Box_SubComponent/CommentList.vue';
    import  FooterMain from '@/components/Box_SubComponent/FooterMain'

    export default {
    name: 'NewsView',
    components: {
        NavBar,
        BoxNewsRead,
        CommentAdd,
        CommentList,
        FooterMain
    }
    }
</script>