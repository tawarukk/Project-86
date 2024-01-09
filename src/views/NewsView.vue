<template>
    <div class="news">
    <nav-bar/>
    <BoxNews/>

    </div>
</template>
    
<script>
    import  NavBar  from '@/components/Box_SubComponent/NavMain'
    import  BoxNews from '@/components/BoxNews.vue'

    export default {
    name: 'NewsView',
    components: {
        NavBar,
        BoxNews
    }
    }
</script>