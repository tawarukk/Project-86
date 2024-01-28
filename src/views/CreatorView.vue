<template>
    <div class="creator">
    <NavBar/>
    <BoxCreator/>
    <FooterMain/>
    </div>
</template>
    
<script>
    import NavBar  from '@/components/Box_SubComponent/NavMain'
    import BoxCreator from '@/components/BoxCreator.vue'
    import FooterMain from '@/components/Box_SubComponent/FooterMain'

    export default {
    name: 'CreatorView',
    components: {
        NavBar,
        BoxCreator,
        FooterMain
    }
    }
</script>