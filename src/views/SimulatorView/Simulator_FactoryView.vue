<template>
        <div class="Simulator">
        <nav-bar/>
        <BoxSimulator/> 
        <FooterMain/>
        </div>
</template>
        
<script>
        import  NavBar  from '@/components/Box_SubComponent/NavMain'
        import  BoxSimulator  from '@/components/Box_Simulator/BoxSimulator.vue'
        import  FooterMain from '@/components/Box_SubComponent/FooterMain'


        export default {
        name: 'SimulatorView',
        components: {
        NavBar,
        BoxSimulator,
        FooterMain
        }
        }
</script>
        
<style>

</style>