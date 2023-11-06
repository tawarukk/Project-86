<template>
    <div class="creator">
    <NavBar/>
    <MongodbAdd/>
    </div>
</template>
    
<script>
    import  NavBar  from '@/components/Box_SubComponent/NavMain'
    //import  TestP from '@/components/TestPagination.vue'
    import  MongodbAdd from '@/components/Box_SubComponent/MongoDB'

    export default {
    name: 'CreatorView',
    components: {
        NavBar,
        // TestP
        MongodbAdd
    }
    }
</script>