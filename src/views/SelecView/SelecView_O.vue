<template>
<div class="Selec_O">
<NavBar/>
<SeOper/>
<FooterMain/>
</div>  
</template>

<script>
import  SeOper from '@/components/Box_Selec/SelecOperator.vue'
import  NavBar  from '@/components/Box_SubComponent/NavMain'
import  FooterMain from '@/components/Box_SubComponent/FooterMain'

export default {
    components: {
        SeOper,
        NavBar,
        FooterMain
    }
}
</script>

<style>

</style>