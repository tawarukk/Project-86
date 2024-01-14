<template>
    <div class="news">
    <nav-bar/>
    <BoxNewsRead/>
    </div>
</template>
    
<script>
    import  NavBar  from '@/components/Box_SubComponent/NavMain'
    import  BoxNewsRead from '@/components/BoxNewsRead.vue'

    export default {
    name: 'NewsView',
    components: {
        NavBar,
        BoxNewsRead
    }
    }
</script>