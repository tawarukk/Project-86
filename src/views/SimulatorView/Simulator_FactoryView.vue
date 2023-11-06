<template>
        <div class="Simulator">
        <nav-bar/>
        <BoxSimulator/> 
        </div>
</template>
        
<script>
        import  NavBar  from '@/components/Box_SubComponent/NavMain'
        import  BoxSimulator  from '@/components/Box_Simulator/BoxSimulator.vue'

        export default {
        name: 'SimulatorView',
        components: {
        NavBar,
        BoxSimulator
        }
        }
</script>
        
<style>

</style>