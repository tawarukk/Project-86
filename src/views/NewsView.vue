<template>
    <div class="news">
    <nav-bar/>
    <BoxNews/>
    <FooterMain/>
    </div>
</template>
    
<script>
    import  NavBar  from '@/components/Box_SubComponent/NavMain'
    import  BoxNews from '@/components/BoxNews.vue'
    import  FooterMain from '@/components/Box_SubComponent/FooterMain'

    export default {
    name: 'NewsView',
    components: {
        NavBar,
        BoxNews,
        FooterMain
    }
    }
</script>