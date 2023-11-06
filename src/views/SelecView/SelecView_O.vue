<template>
<div class="Selec_O">
<NavBar/>
<SeOper/>
</div>  
</template>

<script>
import  SeOper from '@/components/Box_Selec/SelecOperator.vue'
import  NavBar  from '@/components/Box_SubComponent/NavMain'
export default {
    components: {
        SeOper,
        NavBar 
    }
}
</script>

<style>

</style>