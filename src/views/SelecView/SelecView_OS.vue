<template>
<div class="Selec_OS">
<NavBar/>
<SeOperskill/>
</div>  
</template>

<script>
import SeOperskill from'@/components/Box_Selec/SelecOperatorSimulator.vue'
import  NavBar  from '@/components/Box_SubComponent/NavMain'
export default {
    components: {
        SeOperskill,
        NavBar 
    }
}
</script>

<style>

</style>