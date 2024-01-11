<template>
    <div class="creator">
    <NavBar/>
    <!-- <MongodbAdd/> -->
    <BoxCreator/>
    <FooterMain/>
    </div>
</template>
    
<script>
    import NavBar  from '@/components/Box_SubComponent/NavMain'
    import BoxCreator from '@/components/BoxCreator.vue'
    import FooterMain from '@/components/Box_SubComponent/FooterMain'
    //import  TestP from '@/components/TestPagination.vue'
    // import  MongodbAdd from '@/components/Box_SubComponent/MongoDB'

    export default {
    name: 'CreatorView',
    components: {
        NavBar,
        BoxCreator,
        FooterMain
        // TestP
        // MongodbAdd
    }
    }
</script>