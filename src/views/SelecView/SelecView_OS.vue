<template>
<div class="Selec_OS">
<NavBar/>
<SeOperskill/>
<FooterMain/>
</div>  
</template>

<script>
import SeOperskill from'@/components/Box_Selec/SelecOperatorSimulator.vue'
import  NavBar  from '@/components/Box_SubComponent/NavMain'
import  FooterMain from '@/components/Box_SubComponent/FooterMain'

export default {
    components: {
        SeOperskill,
        NavBar ,
        FooterMain
    }
}
</script>

<style>

</style>